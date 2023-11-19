package com.likelion.totree.user.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "POSTS")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int date;

    @Builder
    public Post(String content, User user, int date) {
        this.content = content;
        this.user = user;
        this.date=date;
    }
}
