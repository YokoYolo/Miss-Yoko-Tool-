import React, { Component } from 'react';
import axios from 'axios'
axios.defaults.withCredentials = true; 

 export default class AddItem extends Component {
  state = {
      title:'',
      quantity: Number(''),
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
        let item = this.state; 
       
        axios.post('http://localhost:5000/inventory/additem', item).then(result => {
            console.log('SUCCESS!')
            this.props.history.push("/inventory") // Redirect to the home page
          })
        }
    

  
      render() {
          return (
              <div>
                  <div>Add new Item</div>
                  <form>
                        <div> Name: <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/></div>
                        <div>Description: <input type="text" name="description"value={this.state.description} onChange={this.handleInputChange}/></div>
                        <div>Shortdescription: <input type="text" name="shortdescription"value={this.state.shortdescription} onChange={this.handleInputChange}/></div>
                        <div> Quantitu: <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleInputChange}/></div>
                        <button onClick={(e) => this.handleClick(e)}>Save</button>
                  </form>
                {this.state.message && <div className="info">
                    {this.state.message}</div>
                }
                </div>
        )
  }

  }