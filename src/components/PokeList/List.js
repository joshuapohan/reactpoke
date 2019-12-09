import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { fetchPokemonList } from '../../actions';
import { cMaxPage } from '../../config';

import './List.css';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            targetPage: this.props.curPage
        };
    }


    getNbOfCaptured = (id) => {
        let count = 0;
        this.props.storage.forEach(currentPoke => {
            if(currentPoke.id === id){
                count++;
            }
        });
        return count;
    }

    goToTargetPage = () => {
        this.props.loadPage(this.state.targetPage);
    }

    goToNextPage = () => {
        this.setState( prevState  => {
            return {
                targetPage: parseInt(prevState.targetPage) + 1
            }
        }, this.goToTargetPage);
    }

    goToPreviousPage = () => {
        this.setState( prevState  => {
            return {
                targetPage: parseInt(prevState.targetPage) - 1
            }
        }, this.goToTargetPage);     
    }

    componentDidMount = () => {
        let page = this.props.curPage ? this.props.curPage : 0;
        this.props.loadPage(page);
    }

    onPageInputChange = (e) => {
        this.setState({
            targetPage: e.target.value
        })   
    }

    render(){
        if(this.props.pokes != null){
            return(
                <div>
                    <div className="ui grid container">
                        <h1 className="page-title" >Pokemon List</h1>
                        <div className="ui six doubling cards">
                            {
                                Object.keys(this.props.pokes).map((key)=>{
                                    let currentPoke = this.props.pokes[key];
                                    let capturedNb = this.getNbOfCaptured(currentPoke.id);
                                    return(
                                        <div className="card" style={{"textAlign":"center"}} key={key}>
                                            <div className="image pokeball-bg">
                                                <img className="poke" src={currentPoke.sprite}/>
                                            </div>
                                            <div className="header">
                                                <h2>{currentPoke.name}</h2>
                                            </div>
                                            <div className="content">
                                                { capturedNb > 0 ? "Captured : " + capturedNb : "Not captured"}    
                                            </div>
                                            <div className="meta">
                                                <Link to={"detail/" + currentPoke.id}>View</Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="ui grid container">
                        <div className="row">
                            <div className="seven wide computer five wide tablet five wide mobile column">
                                <button className={ this.props.curPage > 0?"ui right floated  icon button":"ui right floated icon button disabled"} onClick={this.goToPreviousPage}>
                                    <i className="left arrow icon"></i>                                       
                                </button>
                            </div>
                            <div className="two wide computer six wide tablet six wide mobile column">
                                <div className="ui action input page-input">
                                    <input  id="pageNb" type="text" placeholder="Page" onChange={this.onPageInputChange} value={this.state.targetPage}/>
                                    <button className="ui button" onClick={this.goToTargetPage}>Go</button>
                                </div>
                            </div>
                            <div className="seven wide computer five wide tablet five wide mobile column">
                                <button className={ this.props.curPage <= cMaxPage ? "ui left floated  icon button":"ui left floated icon button disabled"} onClick={this.goToNextPage}>
                                 
                                    <i className="right arrow icon"></i>                                        
                                </button>
                            </div>
                        </div>
                    </div>
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
    return {
        pokes: state.pokes,
        curPage: state.pokeCache.curIndex,
        storage: state.storage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPage: page => dispatch(fetchPokemonList(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);