import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { releasePokemon } from '../../actions';

class Storage extends React.Component{
    render(){
        if(this.props.storage != null){
            return(
                <div className="ui massive celled list">
                    {
                        this.props.storage.map((currentPoke, index)=>{
                            return(
                                <div className="item" style={{"textAlign":"center"}} key={currentPoke.id}>
                                    <img className="ui avatar image" src={currentPoke.detail.sprite}/>
                                    <div className="content">
                                        <div className="header">
                                            {currentPoke.nickname}
                                        </div>
                                            {currentPoke.detail.name}
                                    </div>
                                    <div className="right floated content">
                                        <div className="ui button">
                                            <Link to={"detail/" + currentPoke.id}>View</Link>                                           
                                        </div>
                                    </div>
                                    <div className="right floated content">
                                        <div className="ui button" onClick={()=>this.props.releasePokemon(index)}>Release</div>
                                    </div>
                                </div>
                            )
                        })
                    }
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