import React, { Fragment } from 'react';
import axios from 'axios';

class OneItem extends React.Component {
    state = { item: {}}

    componentDidMount () {
        axios.get('http://localhost:5000/inventory/'+this.props.match.params.id)
            .then (thisItem=> {
                this.setState({item: thisItem.data})
            }) 
    }



    
    render (){

        return (
            <Fragment >
                <div className="container">
                    <div className="oneitem">
                            {console.log()}
                                <h1>{this.state.item.title}</h1>
                                <h3>{this.state.item.quantity}</h3>
                                <h3>{this.state.item.description}</h3>
                                <h3>{this.state.item.shortdescription}</h3>
                               
                    </div>
                </div>
            </Fragment>
            )
    }
}

export default OneItem;
