package com.example.library.Controller;

import com.example.library.Model.Author;
import com.example.library.Model.Book;
import com.example.library.Model.Publisher;
import com.example.library.Service.AuthorService;
import com.example.library.Service.BookService;
import com.example.library.Service.PublisherService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookRestController {

    private final BookService bookService;
    private final PublisherService publisherService;
    private final AuthorService authorService;

    public BookRestController(BookService bookService, PublisherService publisherService, AuthorService authorService) {
        this.bookService = bookService;
        this.publisherService = publisherService;
        this.authorService = authorService;
    }

    @GetMapping("/books")
    public List<Book> findAll(){
        return this.bookService.findAll();
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable Long id){
        return this.bookService.findById(id);
    }

    @PostMapping("/save/book")
    public Book save(@RequestBody @Valid Book book){
        return this.bookService.save(book);
    }

//    @PutMapping("/{id}")
//    public Book update(@PathVariable Long id, @Valid Book book) throws IOException {
//        return this.bookService.updateProduct(id,book);
//
//    }
    @DeleteMapping("/delete-book/{id}")
    public void delete(@PathVariable Long id){
        this.bookService.deleteById(id);
    }
    @PatchMapping("/{id}")
    public Publisher updateName(@PathVariable Long id, @RequestParam String name){
        return this.publisherService.updateName(id,name);
    }

    @GetMapping("/publishers")
    public List<Publisher> findAllPublishers(){
        return this.publisherService.findAll();
    }

    @GetMapping("/auhtor/{id}")
    public Publisher findAuthorById(@PathVariable Long id){
        return this.publisherService.findById(id);
    }

    @PostMapping("/save/publisher")
    public Publisher save(@RequestBody @Valid Publisher publisher){
        return this.publisherService.save(publisher);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id){
        this.publisherService.deleteById(id);
    }

    @PostMapping("/save/author")
    public Author save(@RequestBody @Valid Author author){
        return this.authorService.save(author);
    }



}
