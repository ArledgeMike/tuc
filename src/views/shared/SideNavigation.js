import React, {Component} from 'react';
import {Link} from 'react-router';

import SideNavigationLinks from './SideNavigation/SideNavigationLinks';

class SideNavigation extends Component {

    render() {

        const mainLinks = [{
                linkName:'Overview',
                href:'/',
                iconClass:'fa fa-check-circle-o'
            },{
                linkName:'Activity',
                href:'/activity',
                iconClass:'fa fa-map-o'
            },{
                linkName:'Dearest',
                href:'/dearest',
                iconClass:'fa fa-heart-o'
            },{
                linkName:'Folder',
                href:'/folder',
                iconClass:'fa fa-folder-open-o'
            }
        ].map(function(result) {
            return <SideNavigationLinks key={result.linkName} href={result.href} iconClass={result.iconClass} linkName={result.linkName} />;
        });

        const filterLinks =[{
                linkName:'Images',
                href:'/images',
                iconClass:'fa fa-file-image-o'
            },{
                linkName:'Audio',
                href:'/audio',
                iconClass:'fa fa-volume-up'
            },{
                linkName:'Video',
                href:'/video',
                iconClass:'fa fa-file-video-o'
            },{
                linkName:'Notes',
                href:'/notes',
                iconClass:'fa fa-sticky-note-o'
            },{
                linkName:'Links',
                href:'/links',
                iconClass:'fa fa-link'
            },{
                linkName:'Files',
                href:'/files',
                iconClass:'fa fa-files-o'
            }
        ].map(function(result) {
            return <SideNavigationLinks key={result.linkName} href={result.href} iconClass={result.iconClass} linkName={result.linkName} />;
        });


        return (
            <div id='sidebar-wrapper'>
                <ul className='sidebar-nav'>
                    <li className='dropper'>
                        <div><i className='fa fa-upload' aria-hidden='true'></i></div>
                    </li>
                    <li className='divider active'>
                        <Link to='#'>MAIN</Link>
                    </li>
                    {mainLinks}
                    <li className='divider'>
                        <Link to='#'>FILTER</Link>
                    </li>
                    {filterLinks}
                </ul>
            </div>
        );
    }
}

export default SideNavigation;
