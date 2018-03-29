import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BlogNew from './blogs/BlogNew';
import BlogShow from './blogs/BlogShow';
import { Footer } from "./Footer";

import '../styles/App.css';


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="application-container">
                    <Header/>
                    <div className="main main uk-margin-medium-left uk-margin-medium-right uk-padding">
                        <Switch>
                            <Route path="/blogs/new" component={BlogNew}/>
                            <Route exact path="/blogs/:_id" component={BlogShow}/>
                            <Route path="/blogs" component={Dashboard}/>
                            <Route path="/" component={Landing}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}


export default connect(null, actions)(App);
