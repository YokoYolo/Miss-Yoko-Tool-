import React from 'react';
import { Link, } from 'react-router-dom';



class Home extends React.Component {

    componentDidMount() {
        console.log('home did mount')
    }
    componentWillReceiveProps(props, nextProps) {
        console.log('props,nextProps', props, nextProps)
    }
    render() {
        return (
            <div>
                    {console.log('hello')} 

                    Please
          <Link exact to='/login' activeClassName="selected">  Login </Link>
          or     
          <Link exact to='/signup' activeClassName="selected">  Sign Up </Link>
                    {/* {this.state.name ? <Login {this.state.name} /> : null  }  */}
                      </div>
        )
    }
}


// Need to add Context for User!

export default Home;