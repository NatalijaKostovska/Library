package com.example.library.Service;

import com.example.library.Model.Author;
import com.example.library.Model.Book;

import java.io.IOException;
import java.util.List;

public interface AuthorService {
    Author findById(Long id);
    List<Author> findAll();
    Author save(Author author);
    void deleteById(Long id);
}
