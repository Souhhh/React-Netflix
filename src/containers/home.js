import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Souflix from './souflix'
import Login from './login'
import Signup from './signup'

function Test(){
    return(    
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/souflix" component={Souflix}/>  
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                </Switch>                      
            </div>
        </Router>
    );
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state= {

        }
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }
        return(
            <div className="bg-home">
                <header className="home-header">
                    <a href="./login">S'identifier</a>
                    <div className="logoPage">SOUFLIX</div>
                    <h1>See what's next.</h1>
                    <h4>où que vous soyez. sans engagement</h4>
                    <button className="btn">profitez d'un mois gratuit ></button>
                </header>
                {/* <Link to="/souflix">                    
                </Link> */}
            </div>
        );
    }
}
export default Test;