import React from 'react';
import { connect } from 'react-redux';

class Storage extends React.Component{
    render(){
        if(this.props.storage != null){
            return(
                <div className="ui grid container">
                    <h1 className="page-title" >Pokemon List</h1>
                    <div className="ui six doubling cards">
                        {
                            this.props.storage.map((poke)=>{
                                return(
                                    <div className="card" style={{"textAlign":"center"}} key={poke.id}>
                                        <div className="image">
                                            <img src={poke.detail.sprite}/>
                                        </div>
                                        <div className="header">
                                            <h2>{poke.nickname}</h2>
                                        </div>
                                        <div className="meta">
                                            <h2>{poke.detail.name}</h2>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

export default connect(mapStateToProps, undefined)(Storage);