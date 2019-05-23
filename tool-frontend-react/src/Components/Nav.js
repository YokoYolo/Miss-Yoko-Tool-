import React from 'react';
import { Link, } from 'react-router-dom';



class Nav extends React.Component {

    componentDidMount() {
        console.log('home did mount')
    }
    componentWillReceiveProps(props, nextProps) {
        console.log('props,nextProps', props, nextProps)
    }
    render() {
        return (
            <div>


                

                <div><Link exact to='/inventory' activeClassName="selected">  <div>Inventory</div>  </Link></div>
                <div><Link exact to='/projects' activeClassName="selected"> <div>Projects</div></Link></div>
                <div><Link exact to='/user/update' activeClassName="selected"><div> Update Account Info</div></Link></div>
            </div>

        )
    }
}


// Need to add Context for User!

export default Nav;