import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import {Dropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faSave,faUndo, faPlusSquare, faEdit} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class Publisher extends React.Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.onPublisherChange=this.onPublisherChange.bind(this);
        this.submitPublisher = this.submitPublisher.bind(this);
    }
    initialState ={
        publisher_id:'', name:'', book:''
    };
    componentDidMount() {
        const publisher_id = +this.props.match.params.publisher_id;
        if(publisher_id){
            this.findPublisherById(publisher_id);
        }
    }
    findPublisherById = (publisher_id) => {

        axios.get("http://localhost:8080/api/publisher/"+publisher_id)
            .then(response=>{
                if(response.date!=null){
                    this.setState({
                        book_id: response.data.publisher_id,
                        title: response.data.name,
                        total_pages: response.data.book
                    });
                }
            }).catch((error)=>{
            console.error("Error - "+error);
        });
    };
    BookList = () =>{
        return this.props.history.push("/booksList");
    };
    resetPublisher = () => {
        this.setState(() => this.initialState);
    };
    submitPublisher = event =>{
        event.preventDefault();
        const publisher={
            name: this.state.name,
            book:this.state.book
        };

        axios.post("http://localhost:8080/api/save/publisher", publisher)
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

    onPublisherChange = event =>{
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
                        <FontAwesomeIcon icon={this.state.book_id ? faEdit : faPlusSquare} /> {this.state.publisher_id ? "Update author" : "Add New author"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitPublisher} id="publisher_id">

                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formpublisher_id">
                                    <Form.Label>Publisher Name</Form.Label>
                                    <Form.Control required
                                                  type="text" name="name"
                                                  value={this.name}
                                                  onChange={this.onPublisherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Publisher name"

                                    />
                                    <Form.Label>Book</Form.Label>
                                    <Form.Control required
                                                  type="text" name="book"
                                                  value={this.book}
                                                  onChange={this.onPublisherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter book name"

                                    />
                                </Form.Group>
                            </Form.Row>


                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.publisher_id ? "Update" : "Save"}
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
export default Publisher;