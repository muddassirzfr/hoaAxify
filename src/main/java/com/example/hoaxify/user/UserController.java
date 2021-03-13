package com.example.hoaxify.user;

import com.example.hoaxify.error.ApiError;
import com.example.hoaxify.shared.CurrentUser;
import com.example.hoaxify.user.vm.UserUpdateVm;
import com.example.hoaxify.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/users")
    ResponseObject createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new ResponseObject("User saved successfully!");
    }

    // Pageable is important to return paged response (declarative)
    @GetMapping("/users")
    Page<UserVM> getUsers(@CurrentUser User loggedIn, Pageable pageable) {
        //return usserService.getUsers().map(UserVM::new);
        return userService.getUsers(loggedIn, pageable).map((user -> new UserVM(user)));
    }

    @GetMapping("/users/{username}")
    UserVM getUser(@PathVariable String username) {
        //return userService.getUsers().map(UserVM::new);
        User byUsername = userService.getByUsername(username);
        return new UserVM(byUsername);
    }

    // pre authorizing condition (declarative)
    @PutMapping("/user/{id:[0-9]+}")
    @PreAuthorize("#id == principal.id")
    UserVM updateUser(@PathVariable long id, @Valid @RequestBody(required = false) UserUpdateVm userUpdateVm) {
        User updatedUser = userService.updateUser(id, userUpdateVm);
        return new UserVM(updatedUser);
    }


}
