import React, { Component } from 'react';
import axios from 'axios'
// axios.defaults.withCredentials = true; 

 class AddProject extends Component {
  state = {
      name:'',
      description: '',
      shortdescription: '',
    }
  
    handleInputChange = (event) => {
        this.setState({
          [event.target.state]: event.target.value
        })
      }

      saveProject = (e) => {
          e.preventDefault()
          console.log(e.target.elements)
            let project = this.state
          console.log(this.state.name)
          axios.post('http://localhost:5000/projects/create', project.name, project.description, project.shortdescription)
             .then(responseFromTHeServer=>{
                 console.log(responseFromTHeServer)
          }).catch(err=>console.error(err))
      }
  
  
      render() {
          return (
              <div>
                  <div>Add new Project</div>
                  <form onSubmit={this.saveProject}>
                      <input type="text" name="name"></input>
                      <input type="text" name="description"></input>
                      <input type="text" name="shortdescription"></input>
                      <button type="submit">Save</button>
                  </form>
              </div>
          );
      }
  }
  
  export default AddProject;