import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';


const Dashboard = () => {
    return (
        <div>
            <BlogList/>
            <div className="uk-position-fixed uk-position-large uk-position-bottom-right uk-overlay">
                <Link to="/blogs/new" className="uk-background-primary uk-light uk-padding uk-border-circle">
                    <span>add</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
