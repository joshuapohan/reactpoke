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