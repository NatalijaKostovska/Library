package com.example.library.Service.impl;

import com.example.library.Model.Author;
import com.example.library.Repository.AuthorRepository;
import com.example.library.Service.AuthorService;
import com.example.library.exceptions.ExceptionBookNotFound;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Author findById(Long id) {
        return this.authorRepository.findById(id).orElseThrow(()-> new ExceptionBookNotFound(id));
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }

    @Override
    public Author save(Author author) {
        return this.authorRepository.save(author);
    }

    @Override
    public void deleteById(Long id) {
        this.deleteById(id);
    }
}
