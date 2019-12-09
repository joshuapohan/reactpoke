import React from 'react';
import { Link } from 'react-router-dom';

import './main.css';

class Header extends React.Component{
    render(){
        return(
            <div className="ui secondary pointing menu">
                <div className="header item white-text">
                    PokeReact
                </div>
                <Link to="/" className="item white-text">Pokemon List</Link>
                <Link to="/storage" className="item white-text">My Pokemon List</Link>
            </div>
        );
    }
}

export default Header;