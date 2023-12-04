package com.likelion.totree.security.exception;

public class NoTicketError extends RuntimeException{
    public NoTicketError(){
        super("티켓이 부족합니다");
    }
}
