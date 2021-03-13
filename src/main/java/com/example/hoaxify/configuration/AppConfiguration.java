package com.example.hoaxify.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
// this file can read from application.properties
// with props with prefix hoaxify
@ConfigurationProperties(prefix = "hoaxify")
@Data
public class AppConfiguration {
    // root folder for file system of profile pictures and post attachments
    String uploadPath; // comes from application.yml (upload-path converts to camel case)
    String profileImagesFolder = "profile"; // subfolder for profile pictures;
    String attachmentsFolder = "attachments";

    public String getFullProfileImagesPath() {
        return String.format("%s/%s", this.uploadPath, this.profileImagesFolder);
    }

    public String getFullAttachmentsPath() {
        return String.format("%s/%s", this.uploadPath, this.attachmentsFolder);
    }
}
