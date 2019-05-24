import React, { Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {browserHistory} from 'browser-history';


class OneProject extends React.Component {
    state = { 
        project: {},
        redirect: false

    }

    componentDidMount () {
        axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
            .then (thisProject=> {
                this.setState({project: thisProject.data})
            }) 
    }
    


      renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='http://localhost:3000/projects' />
            }
          }
        

    deleteOneProject = () => {
        let id = this.props.match.params.id 
        axios.post ('http://localhost:5000/projects/'+id+'/delete').then(
            // this.renderRedirect()
            // browserHistory.push({pathname: '/'})
            )
        
        }

    setRedirect = () => {
            this.setState({
              redirect: true
            })
          }


    render (){

        return (
            <Fragment >
                <div className="container">
                {this.renderRedirect()}
                    <div className="oneproject">
                    
                                <h1>{this.state.project.name}</h1>
                                <h3>{this.state.project.description}</h3>
                                <h3>{this.state.project.shortdescription}</h3>
                                <td><button style={{backgroundColor:this.state.color}} onClick = { () => this.deleteOneProject(this.state.project._id)}>Delete</button></td>
  
                    </div>
                </div>
            </Fragment>
            )
    }
}

export default OneProject;
