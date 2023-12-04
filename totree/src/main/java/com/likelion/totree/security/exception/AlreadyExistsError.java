package com.likelion.totree.security.exception;

public class AlreadyExistsError extends RuntimeException{
    public AlreadyExistsError(){
        super("이미 작성했습니다");
    }

}
