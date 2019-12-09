import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { fetchPokemonList } from '../../actions';

import './List.css';

class List extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        let page = this.props.curPage ? this.props.curPage : 0;
        this.props.loadPage(page);
    }

    render(){
        if(this.props.pokes != null){
            return(
                <div className="ui grid container">
                    <h1 className="page-title" >Pokemon List</h1>
                    <div className="ui six doubling cards">
                        {
                            Object.keys(this.props.pokes).map((key)=>{
                                let currentPoke = this.props.pokes[key];
                                return(
                                    <div className="card" style={{"textAlign":"center"}} key={key}>
                                        <div className="image pokeball-bg">
                                            <img className="poke" src={currentPoke.sprite}/>
                                        </div>
                                        <div className="header">
                                            <h2>{currentPoke.name}</h2>
                                        </div>
                                        <div className="meta">
                                            <Link to={"detail/" + currentPoke.id}>View</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="ui left labeled icon button" onClick={()=>this.props.loadPage(this.props.curPage - 1)}>
                        <i className="left arrow icon"></i>
                        Previous   
                    </button>
                    <button className="ui right labeled icon button" onClick={()=>this.props.loadPage(this.props.curPage + 1)}>
                        <i className="right arrow icon"></i>
                        Next
                    </button>
                </div>
            );
        } else{
            return(
                <h1>List</h1>
            );    
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {pokes: state.pokes, curPage: state.pokeCache.curIndex}
}

const mapDispatchToProps = dispatch => {
    return {
        loadPage: page => dispatch(fetchPokemonList(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);