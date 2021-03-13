package com.example.hoaxify.user;

import com.example.hoaxify.error.NotFoundException;
import com.example.hoaxify.file.FileService;
import com.example.hoaxify.shared.CurrentUser;
import com.example.hoaxify.user.vm.UserUpdateVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {

    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    FileService fileService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public Page<User> getUsers(@CurrentUser User loggedIn, Pageable pageable) {
        if (loggedIn != null) {
            return userRepository.findByUsernameNot(loggedIn.getUsername(), pageable);
        }
        return userRepository.findAll(pageable);

    }

    public User getByUsername(String username) {
        User byUsername = userRepository.findByUsername(username);
        if (byUsername == null) {
            throw new NotFoundException("unknown-user");
        }
        return byUsername;
    }

    public User updateUser(long id, UserUpdateVm userUpdateVm) {
        User one = userRepository.getOne(id);
        one.setDisplayName(userUpdateVm.getDisplayName());
        String savedImageName = null;
        try {
            //storing the image in byte[] which is decoded from a base64 string in file system
            savedImageName = fileService.saveProfilePicture(userUpdateVm.getImage());
            // removing the previous uuid.png file
            fileService.deleteProfileImage(one.getImage());
            // storing the uuid name of the uuid.png stored in the file system to db
            one.setImage(savedImageName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userRepository.save(one);

    }
}
