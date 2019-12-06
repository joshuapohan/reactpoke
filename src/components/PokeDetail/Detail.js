import React from 'react';
import { connect } from 'react-redux';

import { fetchPokemonDetail } from '../../actions';

class Details extends React.Component{
    
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
        fetchPokemonDetail: id => dispatch(fetchPokemonDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);