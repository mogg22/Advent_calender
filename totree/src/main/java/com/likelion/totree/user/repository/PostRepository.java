package com.likelion.totree.user.repository;

import com.likelion.totree.user.entity.Post;
import com.likelion.totree.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserNickname(String nickname);
}
