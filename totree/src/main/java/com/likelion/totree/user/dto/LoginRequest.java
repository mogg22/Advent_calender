package com.likelion.totree.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class LoginRequest {

    private final String nickname;
    private final String password;

    public LoginRequest(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }
}
