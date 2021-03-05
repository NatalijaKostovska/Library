import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import {Dropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faSave,faUndo, faPlusSquare, faEdit} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class List extends React.Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.onBookChange=this.onBookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
}
    initialState ={
        book_id:'', title:'', total_pages:0, rating:0, publisherList:[],author:''
    };
    componentDidMount() {
        const book_id = +this.props.match.params.book_id;
        if(book_id){
            this.findBookById(book_id);
        }
    }
    findBookById = (book_id) => {

        axios.get("http://localhost:8080/api/"+book_id)
            .then(response=>{
                if(response.date!=null){
                    this.setState({
                        book_id: response.data.book_id,
                        title: response.data.title,
                        total_pages: response.data.total_pages,
                        rating: response.data.rating,
                        publisherList: response.data.publisherList,
                        author: response.data.author

                    });
                }
            }).catch((error)=>{
            console.error("Error - "+error);
        });
    };
    BookList = () =>{
        return this.props.history.push("/booksList");
    };
    resetBook = () => {
        this.setState(() => this.initialState);
    };
    submitBook = event =>{
        event.preventDefault();
        const book={
            title: this.state.title,
            total_pages: this.state.total_pages,
            rating: this.state.rating,
            publisherList: this.state.publisherList
        };

        axios.post("http://localhost:8080/api/save/book", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);

    };

    onBookChange = event =>{
        this.setState({
            [event.target.title]:event.target.value,
            [event.target.rating]:event.target.value,
            [event.target.publisherList]:event.target.value,
            [event.target.total_pages]:event.target.value
        })
    };
    render() {
        const {title,rating,publisherList,author,total_pages} = this.state;

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.book_id ? faEdit : faPlusSquare} /> {this.state.book_id ? "Update book" : "Add New book"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitBook} id="book_id">

                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formbook_id">
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control required
                                                  type="text" name="title"
                                                  value={this.title}
                                                  onChange={this.onBookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book name"

                                    />
                                    <Form.Label>Book rating</Form.Label>
                                    <Form.Control required
                                                  type="number" name="rating"
                                                  value={this.rating}
                                                  onChange={this.onBookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter rating for the book"

                                    />
                                    <Form.Label>Book total pages</Form.Label>
                                    <Form.Control required
                                                  type="text" name="total_pages"
                                                  value={this.total_pages}
                                                  onChange={this.onBookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter total pages for the book"

                                    />
                                    <Form.Label>Publisher list</Form.Label>
                                    <Dropdown isOpen={this.state.publisherList} toggle={this.toggle}>
                                        <DropdownToggle caret id="size-dropdown">
                                            Publisher
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {publisherList.map(size => (
                                                <DropdownItem>{size}</DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required
                                                  type="text" name="total_pages"
                                                  value={this.author}
                                                  onChange={this.onBookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter author for the book"

                                    />


                                </Form.Group>
                            </Form.Row>


                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.book_id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.BookList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>

            </div>

        );
    }
}
export default List;