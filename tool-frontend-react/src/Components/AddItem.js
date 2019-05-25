import React, { Component } from 'react';
// import axios from 'axios'
// axios.defaults.withCredentials = true; 

 class AddItem extends Component {
  state = {
      title:'',
      quantity: Number(''),
      description: '',
      shortdescription: '',
    }
  
    componentDidMount() {
      
        console.log('component did mount')
    }

    // handleInputChange = (event) => {
    //     this.setState({
    //       [event.target.state]: event.target.value
    //     })
    //   }

    //   saveProject = (e) => {
    //       e.preventDefault()
    //       console.log(e.target.elements)
    //         let project = this.state
    //       console.log(this.state.name)
    //       axios.post('http://localhost:5000/projects/create', project.name, project.description, project.shortdescription)
    //          .then(responseFromTHeServer=>{
    //              console.log(responseFromTHeServer)
    //       }).catch(err=>console.error(err))
    //   }
  
    // ={this.saveItem}
  
      render() {
          return (
              <div>
                  <div>Add new Item</div>
                  <form onSubmit>
                      <input type="text" name="title"></input>
                      <input type="text" name="description"></input>
                      <input type="text" name="shortdescription"></input>
                      <input type="number" name="quantity"></input>
                      <button type="submit">Save</button>
                  </form>
              </div>
          );
      }
  }
  
  export default AddItem;