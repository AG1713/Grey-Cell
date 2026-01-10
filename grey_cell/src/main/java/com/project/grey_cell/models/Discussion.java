package com.project.grey_cell.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "discussions")
@Data
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Message> messages;

}
