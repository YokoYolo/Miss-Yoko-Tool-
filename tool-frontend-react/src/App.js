import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import Login from "./Components/Login";
import Register from './Components/Register';
import Inventory from './Components/Inventory';
import OneItem from './Components/OneItem';
import AddItem from './Components/AddItem';
import Nav from './Components/Nav';
import Projects from './Components/Projects';
import OneProject from './Components/OneProject';
import AddProject from './Components/AddProject';
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;


class App extends React.Component {
state = {
    data: null,
    user: null
  };

  componentDidMount () {
    axios.get('http://localhost:5000/loggedin')
    .then (user=> {
        this.setState({user: user.data})
        
    }) 
  }



  render() {
    return (
      <div className="App">
       <div>
         <img className="Logo" src='https://res.cloudinary.com/miss-yoko-beading/image/upload/v1558970830/Logo.png' alt="logo" ></img>
                  <div>

                      { this.state.user ? 
                      <div>Hi, {this.state.user.username} <br/> <Nav /> </div>
                      : 
                      <div>
                      Please
                      <Link exact to='/login' activeClassName="selected">  Login </Link>
                          or     
                      <Link exact to='/signup' activeClassName="selected">  Sign Up </Link>
                      </div>
                      } 
                  {console.log(this.user,111,this.state.user,2222)}
                  </div>
        
       </div>
            <Switch>
                
                  <Route exact path='/inventory' component={Inventory}/>
                  <Route path='/inventory/item/:id' component={OneItem}/> 
                  <Route path='/inventory/additem' component={AddItem}/>
                  <Route exact path='/projects' component={Projects}/>
                  <Route path='/projects/project/:id' component={OneProject}/>
                  <Route path='/projects/addproject' component={AddProject}/>
                  <Route exact path='/login' component={(props) => < Login {...props} setUser={this.setUser}/>}/>
                  <Route exact path='/signup' component={Register}/>
                  
                  
               
                  {/* <Route path='' component={}/>
                  <Route exact path='' component={}/>
                  <Route exact path='' component={}/>
                  <Route exact path='' component={}/> */}
          </Switch>
       
           
        
                
      </div>
    );
  }
}

export default App;


  