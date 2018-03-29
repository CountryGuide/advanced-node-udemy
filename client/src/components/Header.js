import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href={'/auth/google'}>Login With Google</a>
                    </li>
                );
            default:
                return [
                    <li key="3">
                        <Link to="/blogs">My Blogs</Link>
                    </li>,
                    <li key="1">
                        <span className="uk-navbar-item">{this.props.auth.displayName || 'User'}</span>
                    </li>,
                    <li key="2">
                        <a href={'/auth/logout'}>Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav className="uk-navbar uk-light uk-background-secondary header" data-uk-navbar>
                <div className="uk-navbar-left">
                    <Link
                        to={this.props.auth ? '/blogs' : '/'}
                        className="uk-navbar-item uk-logo"
                    >
                        Blogster
                    </Link>

                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
