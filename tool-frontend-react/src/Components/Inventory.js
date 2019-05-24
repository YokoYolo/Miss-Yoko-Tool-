import React from 'react';
import axios from 'axios';
import { NavLink, } from 'react-router-dom';
let time;


class Inventory extends React.Component {

  state={
    allItems:[],
    }
  
  async componentDidMount(){

    let allItems = await axios.get('http://localhost:5000/inventory')
        this.setState({
            allItems: allItems.data,
            loading:false,
           
        })


    }

    // ANOTHER WAY 
    // async componentDidMount(){
    // axios.get('http://localhost:5000/inventory').then(allItems=>{

    //   this.setState({
    //     allItems: allItems.data,
    //     loading:false })
    // }).catch(err=> console.log(err))
    // }

   
    deleteItem= (id, j) => {
  
      axios.post ('http://localhost:5000/inventory/'+id+'/delete').then(responseFromServer=>{
        
        let allInventory= [...this.state.allItems]
        allInventory.splice(j,1)
        this.setState({allItems: allInventory})
        console.log('http://localhost:5000/inventory/'+id+'/delete')

      })
      }


  showInventory = () => {
    return this.state.allItems.map((eachItem, j)=>{ 

     

        return (
        <div className="itemscss" key="itemlist">
            
            
            <table>
            <tbody key="tbody">
                 <tr>
                    <td key="{eachItem._id}"><NavLink exact to={`/inventory/${eachItem._id}`}> {eachItem.title}</NavLink></td>
                    {/* <tr>{eachItem.description}</tr>
                    <tr>{eachItem.quantity}</tr>
                    <tr>{eachItem.shortdescription}</tr> */}
                </tr>  
            </tbody>
            </table>
            <div><button style={{backgroundColor:this.state.color}} onClick = { (e) => this.deleteItem(eachItem._id, j)} >Delete</button></div>
  
           
        </div> 
        )
        
    })
  }


  searchInventory = (e) => {
    let query = e.target.value
    clearTimeout(time)
    time = setTimeout(()=>{
        axios.get(`http://localhost:000/inventory/${query}`)
        .then(result=>{
            this.setState({
                allItems:result.data
            })
        })
    },1000) 
  }

  render() {
    
    return (
        <div className="container">
           <input type="text" onChange={this.searchInventory} placeholder="search....."/>
            {this.showInventory()}
            
        </div>
    );
  }
}

export default Inventory;
