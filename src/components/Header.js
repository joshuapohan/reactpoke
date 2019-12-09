import React from 'react';
import { Link } from 'react-router-dom';

import './main.css';

class Header extends React.Component{
    render(){
        return(
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">Home</Link>
                <Link to="/storage" className="item">Storage</Link>
            </div>
        );
    }
}

export default Header;