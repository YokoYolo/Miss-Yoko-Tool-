import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';


class Projects extends React.Component {

  state={
    allProjects:[],
    }
  
  async componentDidMount(){

    let allProjects= await axios.get('http://localhost:5000/projects')
    console.log(allProjects.data)
        this.setState({
            allProjects: allProjects.data,
            loading:false
        })
    }

   
    deleteProject= (id, i) => {
  
      axios.post ('http://localhost:5000/projects/'+id+'/delete').then(responseFromServer=>{
        
        let allProjects= [...this.state.allProjects]
        allProjects.splice(i,1)
        this.setState({allProjects: allProjects})
        console.log('http://localhost:5000/inventory/'+id+'/delete', i)

      })
      }



  showProjects = () => {
    return this.state.allProjects.map((eachProject, i)=>{ 
      
      return (

    <div class="projectlist">
        
        <table>
          <tr> 
            <td> 
            <Link exact to={`/projects/${eachProject._id}`} activeclass="selected"> <tr>{eachProject.name}</tr>   </Link>
                {/* <tr>{eachProject.description}</tr>
                <tr>{eachProject.shortdescription}</tr> */}
                <td><button style={{backgroundColor:this.state.color}} onClick = { () => this.deleteProject(eachProject._id, i)} >Delete</button></td>

            </td>
         </tr>
         </table>

      
    </div>
  
      )
    })
  }

  render() {
    return (
        <div class="container">
            {this.showProjects()}
        </div>
    );
  }

}

export default Projects;
