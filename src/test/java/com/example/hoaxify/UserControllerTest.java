package com.example.hoaxify;

import com.example.hoaxify.user.ResponseObject;
import com.example.hoaxify.user.User;
import com.example.hoaxify.user.UserRepository;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {
    private static final String API_1_0_USERS = "/api/1.0/users";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        User user = createValidUser();

        ResponseEntity<Object> response = postSignup(user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDB() {
        User user = createValidUser();

        postSignup(user, Object.class);

        assertThat(userRepository.count()).isEqualTo(1);

    }

    @Test
    public void postUser_whenUserIsValid_receiveResponseObj() {
        User user = createValidUser();

        ResponseEntity<ResponseObject> res = postSignup(user, ResponseObject.class);

        assertThat(res.getBody().getMessage()).isNotNull();

    }

    @Test
    public void postUser_whenUserIsValid_passwordHashedInDB() {
        User user = createValidUser();

        postSignup(user, Object.class);
        List<User> users = userRepository.findAll();
        assertThat(users.get(0).getPassword()).isNotEqualTo(user.getPassword());

    }
    private User createValidUser() {
        User user = new User();

        // when user is valid
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4assword");
        return user;
    }

    private <T> ResponseEntity<T> postSignup(Object reqObj, Class<T> resObj) {
        return testRestTemplate.postForEntity(API_1_0_USERS, reqObj, resObj);
    }
}
