import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class SideNavigationLinks extends Component {

    render() {

        return (
            <li>
                <Link  to={this.props.href} activeClassName="active" ><i className={this.props.iconClass} aria-hidden="true"></i>{this.props.linkName}</Link>
            </li>
     );
    }
}

export default SideNavigationLinks;