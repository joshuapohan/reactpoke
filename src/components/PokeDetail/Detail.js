import React from 'react';
import { connect } from 'react-redux';

import {
    fetchPokemonDetail,
    capturePokemon
} from '../../actions';

import "./Detail.css";

class Details extends React.Component{

    getNbOfCaptured = (id) => {
        let count = 0;
        this.props.storage.forEach(currentPoke => {
            if(currentPoke.id === id){
                count++;
            }
        });
        return count;
    }

    tryCapturePokemon = () => {
        let isSuccessful = Math.floor(Math.random() * 100) > 50;
        if(isSuccessful){
            let nickname = window.prompt("Successful! Enter nickname","pokeymanz");
            if(nickname){
                this.props.capturePokemon(this.props.pokemonDetail.id, nickname, this.props.pokemonDetail);
            }
        } else{
            window.alert("Failed, please try again");
        }
    }
    
    componentDidMount(){
        const { match: { params } } = this.props;

        this.props.fetchPokemonDetail(params.id)
    }

    render(){
        if(this.props.pokemonDetail){
            let pokemon = this.props.pokemonDetail;
            let capturedNb = this.getNbOfCaptured(pokemon.id);
            return(
                <div>
                    <div className="ui grid container">                    
                        <h1 className="page-title">Pokemon Detail</h1>
                        <div className="row">
                            <div className="five wide computer two wide tablet two wide mobile column">
                            </div>
                            <div className="six wide computer twelve wide tablet twelve wide mobile column">
                                <div className="ui centered card">
                                    <div className="image pokeball-bg">
                                        <img src={pokemon.sprite}/>
                                    </div>
                                    <div className="content">
                                        <div className="header">{pokemon.name}</div>
                                        <div className="meta">
                                            Types:
                                        </div>
                                        <div className="description">
                                            <div className="ui celled list">
                                                {Object.keys(this.props.pokemonDetail.types).map(key => {
                                                    let curType = this.props.pokemonDetail.types[key];
                                                    return(
                                                        <div className="item" key={key}>
                                                            <div className="content">
                                                                <div className="header">{curType.type.name}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <button className="ui red button" onClick={this.tryCapturePokemon}>Catch</button>
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <i className="desktop icon"></i>
                                        { capturedNb > 0 ? "Captured : " + capturedNb : "Not captured"}  
                                    </div>
                                </div>
                                <table className="ui celled table">
                                    <thead>
                                        <tr>
                                            <th >No.</th>
                                            <th >Moves</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(this.props.pokemonDetail.moves).map(key => {
                                            let curMove = this.props.pokemonDetail.moves[key];
                                            return(
                                                <tr key={key}>
                                                    <td className="header">{key}</td>
                                                    <td className="header">{curMove.move.name}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="five wide computer two wide tablet two wide mobile column">
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <h1>Loading</h1>
            );    
        }
    }
}

const mapStateToProps = state => {
    return {
        pokemonDetail: state.detail,
        storage: state.storage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonDetail: id => dispatch(fetchPokemonDetail(id)),
        capturePokemon: (id, nickname, detail) => dispatch(capturePokemon(id, nickname, detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);