package com.example.hoaxify.file;

import com.example.hoaxify.configuration.AppConfiguration;
import org.apache.commons.io.FileUtils;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {
    AppConfiguration appConfiguration;

    Tika tika;

    public FileService(AppConfiguration appConfiguration) {
        super();
        this.appConfiguration = appConfiguration;
        tika = new Tika();
    }

    // Imahge is first converted from base64 to byte array(in O's and 1's)
    // then put into upload file system
    public String saveProfilePicture(String base64Image) throws IOException {
        String imageName = UUID.randomUUID().toString().replaceAll("-", "");

        byte[] decodedBytes = Base64.getDecoder().decode(base64Image);
        File target = new File(appConfiguration.getFullProfileImagesPath() + "/" + imageName);
        FileUtils.writeByteArrayToFile(target, decodedBytes); ///
        return imageName;
    }

    public String detectType(byte[] fileArr) {
        return tika.detect(fileArr);
    }

    public void deleteProfileImage(String image) {
        try {
            Files.deleteIfExists(Paths.get(appConfiguration.getFullProfileImagesPath() + "/" + image));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
