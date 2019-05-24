import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { Link, } from 'react-router-dom';
axios.defaults.withCredentials = true;


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      lastname:'',
      email:'',
      password:'',
      error: '',
    }
  }


  handleClick(event){
   
    // console.log("values",this.state.name,this.state.lastname,this.state.email,this.state.password);
    var self = this;
    var payload={
    "name": this.state.name,
    "lastname":this.state.lastname,
    "email":this.state.email,
    "password":this.state.password
    }
    axios.post('http://localhost:5000/signup', payload, {withCredentials:true})
   .then(function (response) {
     console.log(response);
    this.setState({error:response.data.message})

     if(response.data.code === 200){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }
   })

   
   .catch(function (error) {
     console.log(error);
   });
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <h1>Register</h1>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({lastname:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>

         <h3> If you have an account please 
          <Link exact to='/login' activeClassName="selected">  Login </Link></h3>
      
       

      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;