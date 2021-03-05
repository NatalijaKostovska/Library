import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import {Dropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faSave,faUndo, faPlusSquare, faEdit} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class Author extends React.Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.onAuthorChange=this.onAuthorChange.bind(this);
        this.submitAuthor = this.submitAuthor.bind(this);
    }
    initialState ={
        author_id:'', name:'', lastname:''
    };
    componentDidMount() {
        const author_id = +this.props.match.params.author_id;
        if(author_id){
            this.findAuthorById(author_id);
        }
    }
    findAuthorById = (author_id) => {

        axios.get("http://localhost:8080/api/author/"+author_id)
            .then(response=>{
                if(response.date!=null){
                    this.setState({
                        book_id: response.data.author_id,
                        title: response.data.name,
                        total_pages: response.data.lastname
                    });
                }
            }).catch((error)=>{
            console.error("Error - "+error);
        });
    };
    BookList = () =>{
        return this.props.history.push("/booksList");
    };
    resetAuthor = () => {
        this.setState(() => this.initialState);
    };
    submitAuthor = event =>{
        event.preventDefault();
        const author={
            name: this.state.name,
            lastname: this.state.lastname,
            book:this.state.book
        };

        axios.post("http://localhost:8080/api/save/author", author)
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

    onAuthorChange = event =>{
        this.setState({
            [event.target.name]:event.target.value,
            [event.target.lastname]:event.target.value,
            [event.target.book]:event.target.value
        })
    };

    render() {
        const {name,lastname} = this.state;

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.book_id ? faEdit : faPlusSquare} /> {this.state.author_id ? "Update author" : "Add New author"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitAuthor} id="author_id">

                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formauthor_id">
                                    <Form.Label>Author Name</Form.Label>
                                    <Form.Control required
                                                  type="text" name="name"
                                                  value={this.name}
                                                  onChange={this.onAuthorChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Author name"

                                    />
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control required
                                                  type="text" name="lastname"
                                                  value={this.lastname}
                                                  onChange={this.onAuthorChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter lastname for the book"
                                    />
                                </Form.Group>
                            </Form.Row>


                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.author_id ? "Update" : "Save"}
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
export default Author;