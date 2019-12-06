import React from 'react';
import { connect } from 'react-redux';

class Details extends React.Component{
    
    componentDidMount(){
        const { match: { params } } = this.props;
        let pokeId = params.id;
    }

    render(){
        return(
            <h1>Details</h1>
        );

    }
}

const mapStateToProps = state => {
    return {
        cachedList: state.cacheIndex.cachedList
    }
};

export default connect(mapStateToProps, undefined)(Details);