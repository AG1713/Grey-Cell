package com.project.grey_cell.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity(name = "messages")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private Timestamp timestamp;
    private String author;

    @ManyToOne
    @JoinColumn(name = "discussion_id")
    @JsonIgnore
    private Discussion discussion;

}
