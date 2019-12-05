import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './Header'
import PokeDetail from './PokeDetail';
import PokeStorage from './PokeStorage';
import PokeList from './PokeList';

class App extends React.Component{
    render(){
        return(
            <HashRouter>
                <Header/>
                <Switch>
                    <Route path="/" exact component={PokeList}/>
                    <Route path="/detail/:id" exact component={PokeDetail}/>
                    <Route path="/storage" exact component={PokeStorage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;