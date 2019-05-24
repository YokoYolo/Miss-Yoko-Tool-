import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { Link, } from 'react-router-dom';
axios.defaults.withCredentials = true;


// import Home from './Home'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state ={
  email:'',
  password:''
  }
  this.handleInputChange = this.handleInputChange.bind(this)
}
 
handleInputChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  })
}

  handleClick(){
 
    var self = this;
    var info ={
    "email":this.state.email,
    "password":this.state.password
    }
    
    axios.post('http://localhost:5000/login', info, {withCredentials:true})
    .then(function (response) {
    console.log(response);
    if(response.data.code === 200){
    console.log("Login successfull");
    var uploadScreen=[];
    uploadScreen.push(<Nav />)
    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
    else if(response.data.code === 204){
    console.log("Email or password do not match");
    alert("Email or password do not match")
    }
    else{
    console.log("Email does not exists");
    alert("Email does not exist");
    }
    })
    .catch(function (err) {
    console.log(err);
    });
    }


render() {
    return (
      <div>



{console.log(this.state.password)} 

       <MuiThemeProvider>
          <div>
          <h1>Login</h1>
          
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}/>
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