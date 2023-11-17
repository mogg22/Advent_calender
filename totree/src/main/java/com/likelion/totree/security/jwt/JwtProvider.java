package com.likelion.totree.security.jwt;

import com.likelion.totree.redis.RedisDao;
import com.likelion.totree.security.dto.TokenResponse;
import com.likelion.totree.user.entity.UserRoleEnum;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    // Header KEY 값
    public static final String AUTHORIZATION_HEADER = "Authorization";

    // 사용자 권한 값의 KEY
    public static final String AUTHORIZATION_KEY = "auth";

    // Token 식별자
    public static final String BEARER_PREFIX = "Bearer";

    private static final long ACCESS_TOKEN_TIME =
            1000 * 60 * 30L;  // 30 분 1000ms(=1s) *60=(1min)*30 =(30min)
    private static final long REFRESH_TOKEN_TIME = 1000 * 60 * 60 * 24 * 7L;  // 7일

    @Value("${jwt.secret.key}")
    private String secretKey;

    //HMAC-SHA 키를 생성
    private Key key;
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    private final UserDetailsService userDetailsService;
    private final RedisDao redisDao;

    // 이 코드는 HMAC-SHA 키를 생성하는 데 사용되는 Base64 인코딩된 문자열을 디코딩하여 키를 초기화하는 용도로 사용
//    @PostConstruct //의존성 주입이 이루어진 후 초기화를 수행하는 어노테이션
//    public void init() {
//        byte[] bytes = Base64.getDecoder()
//                .decode(secretKey);// Base64로 인코딩된 값을 시크릿키 변수에 저장한 값을 디코딩하여 바이트 배열로 변환
//        //* Base64 (64진법) : 바이너리(2진) 데이터를 문자 코드에 영향을 받지 않는 공통 ASCII문자로 표현하기 위해 만들어진 인코딩
//        key = Keys.hmacShaKeyFor(
//                bytes);//디코팅된 바이트 배열을 기반으로 HMAC-SHA 알고르즘을 사용해서 Key객체로 반환 , 이를 key 변수에 대입
//    }

    @PostConstruct
    public void init() {
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(bytes);
    }

    /**
     * Header 에서 토큰 가져오기
     *
     * @param request
     * @return
     */
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * 토큰 생성 메서드 username 대신 nickname
     *
     * @param role
     * @param tokenExpireTime
     * @return Token
     */
    private String createToken(String nickname, UserRoleEnum role, Long tokenExpireTime) {
        Date date = new Date();
        String token = Jwts.builder()
                .claim(AUTHORIZATION_KEY, role) // JWT에 사용자 역할 정보를 클레임(claim)으로 추가
                .setSubject(nickname)  //JWT의 주제(subject)를 사용자 이름으로 설정
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenExpireTime))
                .signWith(key, SignatureAlgorithm.HS256) // key는 서명에 사용되는 비밀 키이며, JWT에 서명을 추가
                .compact();
        return BEARER_PREFIX + " " + token;
    }

    /**
     * 유저 로그인 후 토큰 발행 username 대신 nickname
     *
     * @param role
     * @return 에세스토큰과 리프레쉬토큰을 담은 DTO 반환
     */
    public TokenResponse createTokenByLogin(String nickname, UserRoleEnum role) {
        String accessToken = createToken(nickname, role, ACCESS_TOKEN_TIME);
        String refreshToken = createToken(nickname, role, REFRESH_TOKEN_TIME);
        redisDao.setRefreshToken(nickname, refreshToken, REFRESH_TOKEN_TIME);
        return new TokenResponse(accessToken, refreshToken);
    }

    //AccessToken 재발행 + refreshToken 함께 발행
    public TokenResponse reissueAtk(String nickname, UserRoleEnum role, String reToken) {
        if (!redisDao.getRefreshToken(nickname).equals(reToken)) {
            throw new RuntimeException();
        }
        String accessToken = createToken(nickname, role, ACCESS_TOKEN_TIME);
        String refreshToken = createToken(nickname, role, REFRESH_TOKEN_TIME);
        redisDao.setRefreshToken(nickname, refreshToken, REFRESH_TOKEN_TIME);
        return new TokenResponse(accessToken, refreshToken);
    }

    /**
     *  토큰으로 유저정보 가져오기
     * @param token
     * @return
     */
    public Claims getUserInfoFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    /**  Header에서 가져온 토큰 검증하는 메소드
     *
     * @param token
     * @return
     */
    public boolean validateToken(String token) {
        try {
            // parser : parsing을 하는 도구. parsing : token에 내재된 자료 구조를 빌드하고 문법을 검사한다.
            // Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)는
            // 주어진 토큰을 파싱하기 위해 JWT 파서를 설정하고, 서명 키를 설정한 뒤, 토큰을 파싱하여 JWT 서명 검사를 수행합니다.
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;  // 유효하면 true
        } catch (SecurityException | MalformedJwtException | UnsupportedJwtException e) {  // 전: 권한 없다면 발생 , 후: JWT가 올바르게 구성되지 않았다면 발생
            log.info("Invalid JWT token, 만료된 jwt 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT claims is empty, 잘못된 jwt 토큰입니다.");
        }
        return false;
    }

    /**
     * 남은 에세스토큰의 만료시간 조회
     * @param accessToken
     * @return
     */
    public Long getExpiration(String accessToken) {
        // accessToken 만료시간
        Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        long now = new Date().getTime();
        return (expiration.getTime()-now);
    }

    /**
     * 일반 유저 인증 객체 생성
     * @param nickname
     * @return
     */
    public Authentication createUserAuthentication(String nickname) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(nickname);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
