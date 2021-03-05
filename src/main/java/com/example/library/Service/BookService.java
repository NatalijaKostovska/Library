package com.example.library.Service;

import com.example.library.Model.Book;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

public interface BookService {
    Book findById(Long id);
    List<Book> findAll();
    Book save(Book book);
    void deleteById(Long id);
//    Book updateProduct(Long id, Book book) throws IOException;
}
