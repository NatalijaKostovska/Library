package com.example.library.Repository;

import com.example.library.Model.Author;
import com.example.library.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
