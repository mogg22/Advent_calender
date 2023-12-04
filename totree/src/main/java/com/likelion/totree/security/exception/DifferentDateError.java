package com.likelion.totree.security.exception;

public class DifferentDateError extends RuntimeException{
    public DifferentDateError(String msg){
        super(msg);
    }
}