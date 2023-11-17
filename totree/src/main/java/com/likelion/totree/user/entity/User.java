package com.likelion.totree.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String receiver;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRoleEnum role;

    private Boolean inUser;  // 추후 휴면계정 관리 시 사용

    @Builder
    public User(String nickname, String password, String receiver, UserRoleEnum role) {
        this.nickname = nickname;
        this.password = password;
        this.receiver = receiver;
        this.role = role;
    }
}
