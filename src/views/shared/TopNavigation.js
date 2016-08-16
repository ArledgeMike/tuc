import React, {Component} from 'react';
import {Link} from 'react-router';
class TopNavigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-inverse" id="top_nav">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="collapsed navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="#" className="navbar-brand"><img src="./images/droplr.png"/></a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                                            <div className="user_image pull-right"><i className="fa fa-user" aria-hidden="true"> </i></div><span className="badge">4</span>
                        <form className="navbar-form navbar-left pull-right search_form">
                            <div className="form-group">
                                <input className="form-control" placeholder="Search" /> 
                            </div>
                            <button type="submit" className="btn btn-default search_btn"><i className="fa fa-search" aria-hidden="true"></i></button> 
                        </form>
 
                    </div>
                </div>
            </nav>
     );
    }
}

export default TopNavigation;
