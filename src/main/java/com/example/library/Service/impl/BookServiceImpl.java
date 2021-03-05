package com.example.library.Service.impl;

import com.example.library.Model.Book;
import com.example.library.Repository.BookRepository;
import com.example.library.Service.BookService;
import com.example.library.exceptions.ExceptionBookNotFound;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book findById(Long id) {
        return this.bookRepository.findById(id).orElseThrow(()-> new ExceptionBookNotFound(id));
    }

    @Override
    public List<Book> findAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Book save(Book book) {
        return this.bookRepository.save(book);
    }

    @Override
    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

//    @Override
//    public Book updateProduct(Long id, Book book) throws IOException {
//        return null;
//    }
}
