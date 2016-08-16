import React, {Component, PropTypes} from 'react';
import {connectToStores} from 'fluxible-addons-react';

import HomeActions from './HomeActions';

class Home extends Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    static propTypes = {

    }

    constructor(...args) {
        super(...args);

        this.state = {};
    }

    componentDidMount() {
        this.context.executeAction(HomeActions.loadProfile);
    }

    componentWillReceiveProps({profile}) {
        this.state.profile = profile;
    }

    render() {

        return (

     <div id="page-content-wrapper">
            <div className="container-fluid">
            <header>
                <div className="row">
                    <div className="col-md-12 title_row">
                        <h1>Overview</h1>
                    </div>
                </div>
                <div className="row filter_row">
                    <div className="col-md-6">
                        <ul className="overview_filter">
                            <li><a href="#"><i className="fa fa-plus" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-print" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-lock" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                            <li>2 selected items</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="nav nav-pills pull-right">
                            <li role="presentation" className="active"><a href="#">Name</a></li>
                            <li role="presentation"><a href="#">Size</a></li>
                            <li role="presentation"><a href="#">View</a></li>
                            <li role="presentation"><a href="#">Uploaded</a></li>
                        </ul>
                    </div>
                </div>
                </header>
                <div className="row content_row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="inner">
                                <div className="image"><img src="images/puppy.jpg"/></div>
                                <h5>This is a title</h5>
                                <p><small>41 minutes ago</small></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
     );
    }



}

export default connectToStores(
    Home,
    ['HomeStore'],
    (context) => context.getStore('HomeStore').getState()
);
