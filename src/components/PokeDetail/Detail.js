import React from 'react';
import { connect } from 'react-redux';

import { 
    fetchPokemonDetail,
    capturePokemon
} from '../../actions';

class Details extends React.Component{

    tryCapturePokemon = () => {
        let nickname = window.prompt("Enter nickname","pokeymanz");
        this.props.capturePokemon(this.props.pokemonDetail.id, nickname, this.props.pokemonDetail);
    }
    
    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.fetchPokemonDetail(params.id)
    }

    render(){
        if(this.props.pokemonDetail){
            let pokemon = this.props.pokemonDetail
            return(
                <div>
                    <img src={pokemon.sprite}/>
                    <h2>{pokemon.name}</h2>
                    <button onClick={this.tryCapturePokemon}>Catch</button>
                    <ul>
                        {Object.keys(this.props.pokemonDetail.types).map(key => {
                            let curType = this.props.pokemonDetail.types[key];
                            return(
                                <li>{curType.type.name}</li>
                            )
                        })}
                    </ul>
                    <ul>
                        {Object.keys(this.props.pokemonDetail.moves).map(key => {
                            let curMove = this.props.pokemonDetail.moves[key];
                            return(
                                <li>{curMove.move.name}</li>
                            )
                        })}
                    </ul>
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonDetail: id => dispatch(fetchPokemonDetail(id)),
        capturePokemon: (id, nickname, detail) => dispatch(capturePokemon(id, nickname, detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);