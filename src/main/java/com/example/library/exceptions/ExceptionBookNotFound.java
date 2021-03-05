package com.example.library.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ExceptionBookNotFound  extends RuntimeException{
    public ExceptionBookNotFound(Long id) {
        super(String.format("Book with %d was not found!", id));
    }

}