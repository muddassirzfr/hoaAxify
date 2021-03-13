package com.example.hoaxify.error;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;
// update: apart from security layer this will handle any other exception
// thrown by the application
// So basically the error handling layer
// the spring security layer in top of spring boot appliction layer
// handles the security so we customize the internal error handling
@RestController
public class ErrorHandler implements ErrorController {
    @Autowired
    private ErrorAttributes errorAttributes;


    // this will return not authorised exception with any validation errors
    // 401 or 403
    // authentication fail cases
    @RequestMapping("/error")
    ApiError handleError(WebRequest webRequest) {
        //fetch data from webrequest
        Map<String, Object> attributes = errorAttributes.getErrorAttributes(webRequest, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE));

        String message = (String) attributes.get("message");
        String url = (String) attributes.get("path");
        int status = (Integer) attributes.get("status");
        return new ApiError(status, message, url);

    }

    //
    @Override
    public String getErrorPath() {
        return "/error"; // spring security will route all the authentication/authorization failure to this
        // end point
    }
}
