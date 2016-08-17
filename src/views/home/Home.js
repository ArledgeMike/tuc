import React, {Component, PropTypes} from 'react';
import {connectToStores} from 'fluxible-addons-react';

import Header from '../shared/Header';
import ScreenShots from '../shared/ScreenShots';

import HomeActions from './HomeActions';

class Home extends Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    static propTypes = {
        content:PropTypes.array
    }

    constructor(...args) {
        super(...args);

        this.state = {
            content:[],
            numSelected:0
        };
    }

    componentDidMount() {
        this.context.executeAction(HomeActions.loadContent);
    }

    componentWillReceiveProps(props) {
        this.state.content = props.content;
        this.state.numSelected = props.numSelected;
    }

    render() {
        console.log(this.state);

                return (
     <div id="page-content-wrapper">
            <div className="container-fluid">
                            <Header numberSelected={this.state.numSelected}/>

                <div className="row content_row">
                    <div className="col-lg-12">
                        
                       {this.buildContent()}

                    </div>
                </div>
            </div>
        </div>
     );
    }
    buildContent(){
        console.log(this.state.content.length);
        if(this.state.content.length > 0){
           const shots =  this.state.content.map((result) => {
                return <ScreenShots key={result.title} clickSelect={this.checkSelected.bind(this)} title={result.title} uploadedTime={result.uploadedTime} image={result.image} />;
            });
            console.log(shots);
            return shots;
        }
    }

    checkSelected(clicked){
        console.log(clicked);
        console.log('we clicked this guy');
        this.context.executeAction(HomeActions.incrementCount, clicked);

    }

}

export default connectToStores(
    Home,
    ['HomeStore'],
    (context) => context.getStore('HomeStore').getState()
);
