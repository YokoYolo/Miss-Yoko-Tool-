import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from "./Components/Login";
import Register from './Components/Register';
import Inventory from './Components/Inventory';
import OneItem from './Components/OneItem';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Projects from './Components/Projects';
import OneProject from './Components/OneProject';
import './App.css';
import axios from 'axios'
axios.defaults.withCredentials = true;


class App extends React.Component {
state = {
    data: null,
  };

  componentDidMount() {
      
      console.log('component did mount')
  }
  

  render() {
    return (
      <div class="App">
       <div>
         <img class="Logo" src='Logo.png' alt="logo" ></img>
       </div>
            <Switch>
                  <Route exact path='/' render={() => <Home/>} />
                  <Route exact path='/inventory' component={Inventory}/>
                  <Route path='/inventory/:id' component={OneItem}/>
                  <Route exact path='/projects' component={Projects}/>
                  <Route path='/projects/:id' component={OneProject}/>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/signup' component={Register}></Route>
                  <Route exact path='/home' component={Nav}></Route>
                  
               
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


  