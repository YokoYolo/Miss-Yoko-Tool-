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



class App extends React.Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
      console.log('component did mount')
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/tool-backend-express');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
       <div>
         <img className="Logo" src='Logo.png' alt="logo" ></img>
       </div>
            <Switch>
                  <Route exact path='/' render={() => <Home/>} />
                  <Route exact path='/inventory' component={Inventory}/>
                  <Route path='/inventory/:id' component={OneItem}/>
                  <Route exact path='/projects' component={Projects}/>
                  <Route path='/projects.:id' component={OneProject}/>
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


  