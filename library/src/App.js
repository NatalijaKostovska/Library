import logo from './logo.svg';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ListBooks from "./components/ListBooks.js";
import List from "./components/List";
import Author from "./components/Author";
import Publisher from "./components/Publisher"

function App(){

    return (

        <Router>
            <Switch>
                <Route path="/booksList" component={ListBooks}/>
                <Route path="/book" component={List}/>
                <Route path="/author" component={Author}/>
                <Route path="/publisher" component={Publisher}/>

            </Switch>
        </Router>

);
}

export default App;
