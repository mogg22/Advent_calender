package com.likelion.totree.security.exception;

public class DifferentDateError extends RuntimeException{
    public DifferentDateError(){
        super("현재 날짜와 달라 열 수 없습니다.");
    }
}
