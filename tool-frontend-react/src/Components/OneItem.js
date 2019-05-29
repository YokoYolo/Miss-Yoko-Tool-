import React, { Fragment } from 'react';
import axios from 'axios';

class OneItem extends React.Component {
    
    state = { 
        item: {},
        projectstoadd:[],
        quant: Number(""),
    }
    
    componentDidMount () {
        axios.get('http://localhost:5000/projects')
        .then (list=> {
            this.setState({projectstoadd: list.data})
            
        })   
        axios.get('http://localhost:5000/inventory/'+this.props.match.params.id)
        .then (thisItem=> {
                this.setState({item: thisItem.data})
                
            }) 
    }

    // saveQuant = (num) => {
    //     console.log(num)
    //     this.setState({
    //     quant: num
    //     })
    //   }
    
    showProject = () => {
        
        return this.state.projectstoadd.map((eachProject)=>{ 
          
          return (
        <div class="projectlist">
            <li> 
                <button onClick={() => this.addToProject(eachProject._id)}>
                    {eachProject.name} 
                 </button>
            </li>
        </div>
      
          )
        })
      }


    addToProject = (id) => {
        let projId = id;
        let itemId = this.props.match.params.id;
        let usedQ = this.state.quant;
        console.log(projId)
        console.log(this.props.match.params.id)
        console.log(usedQ)
        console.log(this.state.item)

        axios.post('http://localhost:5000/inventory/addtoproject', {itemId: itemId, projId: projId, usedQ:usedQ, newitem : this.state.item})
        .then (
            // this.props.history.push('/inventory')
        )
    
    }

    handleChange(event) {
        this.setState({quant: event.target.value})
    }


    render (){

        return (
                <Fragment>
                <div className="container">
                    <div className="oneitem">
                            
                                <h1>{this.state.item.title}</h1>
                                <h3>{this.state.item.quantity}</h3>
                                <h3>{this.state.item.description}</h3>
                                <h3>{this.state.item.shortdescription}</h3>
                               
                        
                                {console.log(this.state.quant)}

                    </div>
                </div>

                <div>You can add item to a project:
                    
                <input type="number"  name="quant" 
                    value={this.state.quant} 
                    onChange={this.handleChange.bind(this)} 
                    max={this.state.item.quantity} min='1' />

                    <div>{this.showProject()}</div>
                    
                </div> 
                </Fragment>
            )
    }
}


export default OneItem;
