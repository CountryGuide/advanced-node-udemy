import React, { Component } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';

function trimBlogContent (content) {
    if (content.length > 300) {
        return content.slice(0, 297) + '...';
    }

    return content;
}

class BlogList extends Component {
    componentDidMount () {
        this.props.fetchBlogs();
    }

    renderBlogs () {
        return map(this.props.blogs, blog => {
            return (
                <div className="uk-card uk-card-default uk-margin" key={blog._id}>
                    <div className="uk-card-header">
                        <h2 className="uk-card-title">{blog.title}</h2>
                    </div>
                    <div className="uk-card-body">
                        <p>{trimBlogContent(blog.content)}</p>
                    </div>
                    <div className="uk-card-footer">
                        <Link to={`/blogs/${blog._id}`} className="uk-button uk-button-text">Read</Link>
                    </div>
                </div>
            );
        });
    }

    render () {
        return <div>{this.renderBlogs()}</div>;
    }
}


function mapStateToProps ({ blogs }) {
    return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
