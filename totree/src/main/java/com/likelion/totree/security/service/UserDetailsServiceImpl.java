package com.likelion.totree.security.service;

import com.likelion.totree.user.entity.User;
import com.likelion.totree.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * uid를 통해 유저 정보를 담은 UserDetails를 반환하는 서비스
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        User user = findByNickname(nickname);
        return new UserDetailsImpl(user, user.getNickname());
    }

    private User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(
                () -> new RuntimeException("사용자를 찾을 수 없음")
        );
    }
}
