package com.likelion.totree.user.dto;

import com.likelion.totree.user.entity.User;
import com.likelion.totree.user.entity.UserRoleEnum;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class SignUpRequest {

    private final String nickname;

    private final String password;

    private final String password2;

    @NotBlank
    private final String receiver;

    @Builder
    public SignUpRequest(String nickname, String password, String password2, String receiver) {
        this.nickname = nickname;
        this.password = password;
        this.password2 = password2;
        this.receiver = receiver;
    }

    public User toEntity(UserRoleEnum role, String encodedPassword) {
        return User.builder()
                .nickname(nickname)
                .password(encodedPassword)
                .receiver(receiver)
                .role(role)
                .ticket(0)
                .build();
    }
}
