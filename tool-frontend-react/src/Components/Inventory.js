import React from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
// let time;


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

   
    sortByName = (e) =>{
    

      let arr = [...this.state.allItems].sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
      this.setState({allitems: arr})
    }
  


    deleteItem = (id, j) => {
  
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
                    <td key="{eachItem._id}"><NavLink exact to={`/inventory/item/${eachItem._id}`}> {eachItem.title}</NavLink></td>
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


  // searchInventory = (e) => {
  //   let query = e.target.value
  //   clearTimeout(time)
  //   time = setTimeout(()=>{
  //       axios.get(`http://localhost:5000/inventory/${query}`)
  //       .then(result=>{
  //           this.setState({
  //               allItems:result.data
  //           })
  //       })
  //   },1000) 
  // }


  // filterMovies = (e) => {
  //   let filteredMovies = this.state.movies.filter((film)=>{
  //     return film.title.includes(e.target.value)
  //   })
  //   this.setState({
  //     filteredMovies
  //   })
  // }


  render() {
    
    return (
        <div className="container">
            <div><Link to='/inventory/additem' activeClassName="selected">  add item </Link></div>
            {/* <input type="text" onChange={this.searchInventory} placeholder="search....."/> */}
            <div><button style={{backgroundColor:this.state.color}} onClick={this.sortByName}>Sort By Name</button></div>
            <div>{this.showInventory()}</div>
            
           
        </div>
    );
  }
}

export default Inventory;
