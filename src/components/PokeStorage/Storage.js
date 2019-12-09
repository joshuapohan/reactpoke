import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { releasePokemon } from '../../actions';

import './Storage.css'

class Storage extends React.Component{
    render(){
        if(this.props.storage != null){
            return(
                <div className="ui grid container">        
                    <h1 className="page-title">My Pokemon List</h1>
                    <div className="row">
                        <div className="five wide computer two wide tablet two wide mobile column">
                        </div>
                        <div className="six wide computer twelve wide tablet twelve wide mobile column">
                            <div className="ui large list">
                            {
                                this.props.storage.map((currentPoke, index)=>{
                                    return(
                                        <div className="item" style={{"textAlign":"center"}} key={currentPoke.id}>
                                            <img className="ui avatar image thumb" src={currentPoke.detail.sprite}/>
                                            <div className="middle aligned content">
                                                <div className="header">
                                                    {currentPoke.nickname}
                                                </div>
                                                    {currentPoke.detail.name}
                                            </div>
                                            <div className="middle aligned content">
                                                <div className="ui button">
                                                    <Link to={"detail/" + currentPoke.id}>View</Link>                                        
                                                </div>
                                                <div className="ui negative button" onClick={()=>this.props.releasePokemon(index)}>Release</div>   
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                        <div className="five wide computer two wide tablet two wide mobile column">
                        </div>
                    </div>
                </div>
            );
        } else{
            return(
                <h1>Storage</h1>
            );    
        }
    }
}

const mapStateToProps = state => {
    return {
        storage: state.storage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        releasePokemon: index => dispatch(releasePokemon(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Storage);