package com.example.hoaxify.user;

import com.example.hoaxify.shared.CurrentUser;
import com.example.hoaxify.user.vm.UserVM;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/api/1.0/login")
    public UserVM handleLogin(@CurrentUser User loggedIn) {
        // Collections.singletonMap("id", loggedIn.getId());
        return new UserVM(loggedIn);
    }
}
