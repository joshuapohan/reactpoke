import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { fetchPokemonList } from '../../actions';

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
                <div>
                    <h1>Pokemon List</h1>
                    {
                        Object.keys(this.props.pokes).map((key)=>{
                            let currentPoke = this.props.pokes[key];
                            return(
                                <div key={key}>
                                    <img src={currentPoke.sprite}/>
                                    <h2>{currentPoke.name}</h2>
                                    <Link to={"detail/" + currentPoke.id}>View</Link>
                                </div>
                            )
                        })
                    }
                    <button onClick={()=>this.props.loadPage(this.props.curPage - 1)} className="button primary">Previous</button>
                    <button onClick={()=>this.props.loadPage(this.props.curPage + 1)} className="button primary">Next</button>
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
    return {pokes: state.pokes, curPage: state.cacheIndex.curIndex}
}

const mapDispatchToProps = dispatch => {
    return {
        loadPage: page => dispatch(fetchPokemonList(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);