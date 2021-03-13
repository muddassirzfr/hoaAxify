package com.example.hoaxify.hoax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaxService {
    @Autowired
    HoaxRepository hoaxRepository;

    public Hoax createHoax(Hoax hoax) {
        return hoaxRepository.save(hoax);
    }
}
