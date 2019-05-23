import React, { Fragment } from 'react';
import axios from 'axios';

class OneProject extends React.Component {
    state = { project: {}}

    componentDidMount () {
        axios.get(`'http://localhost:5000/projects/${this.props.match.params.id}`)
            .then (thisProject=> {
                this.setState({project: thisProject.data})
            }) 
    }
    
    render (){

        return (
            <Fragment >
                <div className="container">
                    <div className="oneproject">
                    
                                <h1>{this.state.project.name}</h1>
                                <h3>{this.state.project.description}</h3>
                                <h3>{this.state.project.shortdescription}</h3>
                    </div>
                </div>
            </Fragment>
            )
    }
}

export default OneProject;
