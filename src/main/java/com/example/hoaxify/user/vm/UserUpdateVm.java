package com.example.hoaxify.user.vm;

import com.example.hoaxify.shared.ProfileImage;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserUpdateVm {
    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @ProfileImage
    private String image; // image is base64 encoded
}
