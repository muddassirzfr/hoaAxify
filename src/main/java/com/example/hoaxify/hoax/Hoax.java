package com.example.hoaxify.hoax;

import com.example.hoaxify.user.User;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Hoax {
    @GeneratedValue
    @Id
    private long id;

    @NotNull
    @Size(min = 10, max = 5000) // api validation while deserialization
    @Column(length = 500) // db validation
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne
    private User user;
}
