package com.dl17.backend.Exception;

public class UserWithThisUsernameAlreadyExistException extends RuntimeException {
    public UserWithThisUsernameAlreadyExistException(String message) {
        super(message);
    }
}
