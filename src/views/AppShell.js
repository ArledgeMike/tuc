import React, {Component} from 'react';

import SideNavigation from './shared/SideNavigation';
import TopNavigation from './shared/TopNavigation';


class AppShell extends Component {

    render() {
        return (
            <div id="wrapper">
                <TopNavigation />
                <SideNavigation />
                    {this.props.children}
            </div>
        );
    }
}

export default AppShell;
