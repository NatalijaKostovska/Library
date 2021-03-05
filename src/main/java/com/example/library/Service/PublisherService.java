package com.example.library.Service;

import com.example.library.Model.Book;
import com.example.library.Model.Publisher;

import java.io.IOException;
import java.util.List;

public interface PublisherService {
    Publisher findById(Long id);
    List<Publisher> findAll();
    Publisher save(Publisher publisher);
    void deleteById(Long id);
    Publisher updateName(Long id, String name);

}
