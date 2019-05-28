import React, { Fragment } from 'react';
import axios from 'axios';


export default class OneProject extends React.Component {
    state = { 
        project: {},
       

    }

    componentDidMount () {
        axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
            .then (thisProject=> {
                this.setState({project:thisProject.data})
            }) 
    }
    

    // deleteOneProject = () => {
    //     let id = this.props.match.params.id 
    //     axios.post ('http://localhost:5000/projects/'+id+'/delete').then(

    //         )
        
    //     }



    render (){

        return (
            <Fragment >
                    {console.log(this.state.project.name)}
                    <div className="oneproject">
                    
                                <h1>{this.state.project.name}</h1>
                                <h3>{this.state.project.description}</h3>
                                <h3>{this.state.project.shortdescription}</h3>
                                {/* <td><button style={{backgroundColor:this.state.color}} 
                                onClick = { () => this.deleteOneProject(this.state.project._id)}>Delete</button></td> */}
  
                    </div>
            </Fragment>
            )
    }
}

