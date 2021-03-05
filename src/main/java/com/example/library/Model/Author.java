package com.example.library.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
@Entity
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long author_id;
    private String name;
    private String lastname;
    @JsonIgnore
    @OneToMany(
            mappedBy = "author", cascade = {
            CascadeType.ALL
    }
    )
    private List<Book> books;
}
