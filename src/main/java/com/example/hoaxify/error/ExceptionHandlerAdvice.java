package com.example.hoaxify.error;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
// this is a custom error handling layer
// which only handle MethodArgumentNotValidException
// Spring allows us to handle exceptions
// in one place for all controllers
@RestControllerAdvice
public class ExceptionHandlerAdvice {
    // This is the Spring Validation Layer on top  spring boot appliction layer

    // will return 400 bad request
    // with all the validation exceptions for the requested resource
    // for eg field validation for the requests
    // field type validation
    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest req) {
        ApiError error = new ApiError(400, "VAlidation Error!!", req.getServletPath());
        // status 400 bad request
        BindingResult bindingResult = ex.getBindingResult();
        Map<String, String> map = new HashMap<>();

        for (FieldError fe : bindingResult.getFieldErrors()) {
            map.put(fe.getField(), fe.getDefaultMessage());
        }

        error.setValidationErrors(map);
        return error;
    }
}
