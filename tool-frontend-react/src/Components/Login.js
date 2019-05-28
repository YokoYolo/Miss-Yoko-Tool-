import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
// import Nav from './Nav';
import { Link, } from 'react-router-dom';
axios.defaults.withCredentials = true;


// import Home from './Home'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state ={
  username:'',
  password:'',
  message: null
  }
  this.handleInputChange = this.handleInputChange.bind(this)
}
 
handleInputChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  })
}


handleClick(e) {
  e.preventDefault()
  var info ={
    "username":this.state.username,
    "password":this.state.password
    }
  axios.post('http://localhost:5000/login', info, {withCredentials:true})
    .then(result => {
      console.log('SUCCESS!')
      this.props.setUser(result.data)
      this.props.history.push("/") // Redirect to the home page
    })
    .catch(err => this.setState({ message: err.toString() }))
}

render() {
  return (

  
      <div>
        <MuiThemeProvider>
                <div>
                <h1>Login</h1>
                
                <TextField
                    hintText="Enter your username"
                    floatingLabelText="username"
                    value={this.state.username} 
                    name="username" onChange={this.handleInputChange}/>
                <br/>

                    <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    value={this.state.password} 
                    name="password" onChange={this.handleInputChange} />

                    <br/>

                    <RaisedButton label="Submit" primary={true} onClick={(e) => this.handleClick(e)}/>
                </div>

        </MuiThemeProvider>

         {this.state.message && <div className="info info-danger">
        {this.state.message}</div>}
  

         <h3> If you don't have an account please 
          <Link exact to='/signup' activeClassName="selected">  Sign Up </Link></h3>

      </div>


  );
}



}