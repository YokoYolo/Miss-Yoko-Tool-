import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';


class Projects extends React.Component {

  state={
    allProjects:[],
    }
  
  async componentDidMount(){

    let allProjects= await axios.get('http://localhost:5000/projects')
        this.setState({
            allProjects: allProjects.data,
            loading:false
        })
    }


  showProjects = () => {
    return this.state.allProjects.map(eachProject=>{ 
      
      return (

    <div className="projectlist">
        <Link exact to={`/projects/${eachProject._id}`} activeClassName="selected">
        
        <table>
          <tr> 
            <td> 
                <tr>{eachProject.name}</tr>
                <tr>{eachProject.description}</tr>
                <tr>{eachProject.shortdescription}</tr>
            </td>
         </tr>
         </table>

         </Link>
    </div>
  
      )
    })
  }

  render() {
    return (
        <div className="container">
            {this.showProjects()}
        </div>
    );
  }

}

export default Projects;
