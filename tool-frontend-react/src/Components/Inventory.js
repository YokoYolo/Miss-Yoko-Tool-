import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';


class Inventory extends React.Component {

  state={
    allItems:[],
    }
  
  async componentDidMount(){

    let allItems = await axios.get('http://localhost:5000/inventory')
        this.setState({
            allItems: allItems.data,
            loading:false
        })
    }


  showInventory = () => {
    return this.state.allItems.map(eachItem=>{ 
        return (
        <div className="inventorylist">
            <Link exact to={`/inventory/${eachItem._id}`} activeClassName="selected">
            
            <table>
            <tr>
                <td> 
                    <tr>{eachItem.title}</tr>
                    <tr>{eachItem.description}</tr>
                    <tr>{eachItem.quantity}</tr>
                    <tr>{eachItem.shortdescription}</tr>
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
            {this.showInventory()}
        </div>
    );
  }
}

export default Inventory;
