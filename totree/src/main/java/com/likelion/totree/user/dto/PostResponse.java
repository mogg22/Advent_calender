package com.likelion.totree.user.dto;

import com.likelion.totree.user.entity.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class PostResponse {

    private Long id;
    private String content;
    private String nickname;
    private int date;

    public static PostResponse of(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setContent(post.getContent());
        response.setNickname(post.getUser().getNickname());
        response.setDate(post.getDate());

        return response;
    }


}
