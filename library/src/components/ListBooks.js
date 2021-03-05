import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, Table, Image, ButtonGroup, Button, Nav} from 'react-bootstrap';



class ListBooks extends Component{
    constructor() {
        super();
        this.state = {
            books: []
        }
    }
    componentDidMount() {
        this.findAllBooks();
    }

    findAllBooks(){
        axios.get('http://localhost:8080/api/books')
            .then(response => response.data)
            .then((data)=>{
                this.setState({books:data});
            })
    }
    deleteBook = (idBook) => {
        axios.delete("http://localhost:8080/api/delete-book/{id}"+idBook)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        book: this.state.book.filter(book => book.book_id !== idBook)
                    });
                }
            });
    };

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> List books</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant={"dark"}>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Total pages</th>
                            <th>Rating</th>
                            <th>Publisher List</th>
                            <th>Author</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map((book)=>(
                            <tr key={book.book_id}>
                                <td>{book.title}</td>
                                <td>{book.total_pages}</td>
                                <td>{book.rating}</td>
                                <td>{book.publisherList}</td>
                                <td>{book.author}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this,book.idBook)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }

}

export default ListBooks;
