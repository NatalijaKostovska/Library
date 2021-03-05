package com.example.library.Repository;

import com.example.library.Model.Book;
import com.example.library.Model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
