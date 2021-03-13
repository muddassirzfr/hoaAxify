package com.example.hoaxify.hoax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {
    @Autowired
    HoaxService hoaxService;

    @PostMapping("/hoaxes")
    public void createHoax(@Valid @RequestBody Hoax hoax) {
        hoax.setTimestamp(new Date());
        hoaxService.createHoax(hoax);
    }
}
