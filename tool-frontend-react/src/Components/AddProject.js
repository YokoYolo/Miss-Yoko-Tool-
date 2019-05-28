import React, { Component } from 'react';
import axios from 'axios'
axios.defaults.withCredentials = true; 

 export default class AddProject extends Component {
  state = {
        name:'',
        description: '',
        shortdescription: '',
    }
  
    handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      handleClick = (e) => {
        e.preventDefault()
        console.log(this.state)
        let project = this.state; 
       
        axios.post('http://localhost:5000/projects/create', project).then(result => {
            console.log('SUCCESS!')
            this.props.history.push("/projects") // Redirect to the home page
          })
        }
    

  
      render() {
          return (
              <div>
                  <div>Add new Item</div>
                  <form>
                        <div> Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/></div>
                        <div>Description: <input type="text" name="description"value={this.state.description} onChange={this.handleInputChange}/></div>
                        <div>Shortdescription: <input type="text" name="shortdescription"value={this.state.shortdescription} onChange={this.handleInputChange}/></div>
                        <button onClick={(e) => this.handleClick(e)}>Save</button>
                  </form>
                {this.state.message && <div className="info">
                    {this.state.message}</div>
                }
                </div>
        )
  }

  }