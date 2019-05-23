import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { Link, } from 'react-router-dom';

// import Home from './Home'


class Login extends Component {
  state={
  username:'',
  password:''
  }
 

  handleClick(){
    var apiBaseUrl = "http://localhost:5000";
    var self = this;
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'/login', payload)
    .then(function (response) {
    console.log(response);
    if(response.data.code === 200){
    console.log("Login successfull");
    var uploadScreen=[];
    uploadScreen.push(<Nav />)
    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
    else if(response.data.code === 204){
    console.log("Username or password do not match");
    alert("Username or password do not match")
    }
    else{
    console.log("Username does not exists");
    alert("Username does not exist");
    }
    })
    .catch(function (err) {
    console.log(err);
    });
    }


render() {
    return (
      <div>

        <MuiThemeProvider>
          <div>
          <h1>Login</h1>
          
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}/>
           <br/>

             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}/>

             <br/>

             <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)}/>
         </div>

         </MuiThemeProvider>

         <h3> If you don't have an account please 
          <Link exact to='/signup' activeClassName="selected">  Sign Up </Link></h3>

      </div>
    )
}
}


export default Login;