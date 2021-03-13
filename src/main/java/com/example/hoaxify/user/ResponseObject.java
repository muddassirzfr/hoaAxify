package com.example.hoaxify.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseObject {
    private String message;

    public ResponseObject(String message){
        this.message = message;
    }
}
