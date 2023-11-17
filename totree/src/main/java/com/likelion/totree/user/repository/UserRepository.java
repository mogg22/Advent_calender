package com.likelion.totree.user.repository;

import com.likelion.totree.redis.CacheNames;
import com.likelion.totree.user.entity.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

//    @Cacheable(cacheNames = CacheNames.USERBYUSERNAME, key = "'login' + #p0", unless = "#result==null")
    Optional<User> findByNickname(String nickname);

}
