package com.example.library.Service.impl;

import com.example.library.Model.Publisher;
import com.example.library.Repository.AuthorRepository;
import com.example.library.Repository.PublisherRepository;
import com.example.library.Service.PublisherService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PublisherServiceImpl implements PublisherService {
    private final PublisherRepository publisherRepository;

    public PublisherServiceImpl(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }
    @Override
    public Publisher findById(Long id) {
        return this.findById(id);
    }

    @Override
    public List<Publisher> findAll() {
        return this.publisherRepository.findAll();
    }

    @Override
    public Publisher save(Publisher publisher) {
        return this.publisherRepository.save(publisher);
    }

    @Override
    public void deleteById(Long id) {
        this.publisherRepository.deleteById(id);
    }

    @Override
    public Publisher updateName(Long id, String name) {
        Publisher p = this.findById(id);
        p.setName(name);
        return this.publisherRepository.save(p);
    }
}
