import React, {Component} from 'react';
import {Link} from 'react-router';


class Header extends Component {

    render() {
        return ( 
                <header>
                <div className="row">
                    <div className="col-md-12 title_row">
                        <h1>Overview</h1>
                    </div>
                </div>
                <div className="row filter_row">
                    <div className="col-xs-12 col-md-6">
                        <ul className="overview_filter">
                            <li className="active"><a href="#"><i className="fa fa-plus" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-print" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-lock" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                            <li>{this.props.numberSelected} selected items</li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <ul className="nav nav-pills pull-right">
                            <li role="presentation" className="active"><a href="#">Name</a></li>
                            <li role="presentation"><a href="#">Size</a></li>
                            <li role="presentation"><a href="#">View</a></li>
                            <li role="presentation"><a href="#">Uploaded</a></li>
                        </ul>
                    </div>
                </div>
                </header>



          );
    }
}

export default Header;
