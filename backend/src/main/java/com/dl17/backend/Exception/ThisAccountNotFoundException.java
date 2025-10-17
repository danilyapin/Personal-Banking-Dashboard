package com.dl17.backend.Exception;

public class ThisAccountNotFoundException extends RuntimeException {
    public ThisAccountNotFoundException(String message) {
        super(message);
    }
}
