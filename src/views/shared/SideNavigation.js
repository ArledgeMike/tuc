import React, {Component} from 'react';
import {Link} from 'react-router';
class SideNavigation extends Component {

    render() {
        return (

        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="dropper">
                    <div><i className="fa fa-upload" aria-hidden="true"></i></div>
                </li>
                <li className="divider">
                    <a href="#">MAIN</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-check-circle-o" aria-hidden="true"></i>
 Overview</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-map-o" aria-hidden="true"></i>
 Activity</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i>
 Dearest</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-folder-open-o" aria-hidden="true"></i>
 Folders</a>
                </li>
                <li className="divider">
                    <a href="#">FILTER</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-file-image-o" aria-hidden="true"></i>
 Images</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-volume-up" aria-hidden="true"></i>
 Audio</a><span className="badge">8</span>
                </li>
                <li>
                    <a href="#"><i className="fa fa-file-video-o" aria-hidden="true"></i>
 Video</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-sticky-note-o" aria-hidden="true"></i>
 Notes</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-link" aria-hidden="true"></i>
 Links</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-files-o" aria-hidden="true"></i>
 Files</a>
                </li>
            </ul>
        </div>
     );
    }
}

export default SideNavigation;
