package com.likelion.totree.user.dto;

import com.likelion.totree.user.entity.User;
import com.likelion.totree.user.entity.UserRoleEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(force = true)
public class UserResponse {

    private final String nickname;
    private final String receiver;
    private final UserRoleEnum role;

    /**
     *  유저 생성자를 private로 외부에서 생성 할수 없도록 함
     * @param user
     */
    private UserResponse(User user) {
        this.nickname = user.getNickname();
        this.receiver = user.getReceiver();
        this.role = user.getRole();
    }

    /**
     *  유저 생성자를 private로 외부에서 생성 할수 없도록 함으로써
     *  of 메서드를 통해
     *  유저 객체를 DTO에 담아 반환
     * @param user
     * @return
     */
    public static UserResponse of(User user) {
        return new UserResponse(user);
    }
}
