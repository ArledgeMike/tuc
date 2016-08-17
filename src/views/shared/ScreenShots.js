import React, {Component, PropTypes} from 'react';

class ScreenShots extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
           selectedClass:'card'
        };
    }
    
    render() {
    console.log(this.state);

        return (
            <div className={this.state.selectedClass} onClick={this.handleClick.bind(this)} >
                <div className="inner">
                    <div className="image">
                        <img src={this.props.image}/>
                    </div>
                    <h5>{this.props.title}</h5>
                    <p><small>{this.props.uploadedTime}</small></p>
                </div>
            </div>
     );
    }
    handleClick(){
         if (this.state.selectedClass == 'card selected'){
            this.setState({selectedClass: 'card'});
        } else {
            this.setState({selectedClass: 'card selected'});
        }
        this.props.clickSelect(this.state.selectedClass);
    }
}

export default ScreenShots;