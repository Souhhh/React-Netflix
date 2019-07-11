import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Souflix from './souflix'

function Test(){
    return(    
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/souflix" component={Souflix}/>  
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
    handleEmail(text){
        this.setState({email:text.target.value})
    }
    handlePassword(text){
        this.setState({email:text.target.value})
    }
    login(){
        console.log('all state');
    }
    render() {
        return(
            <div className="bg-home">
                <header className="home-header">
                    <a href="./souflix">S'identifier</a>
                    <div className="logoPage">SOUFLIX</div>
                    <h1>See what's next.</h1>
                    <h4>où que vous soyez. sans engagement</h4>
                    <button className="btn">profitez d'un mois gratuit ></button>
                </header>
                {/* <Link to="/souflix">
                    
                </Link> */}


                {/* <input type="text" placeholder="Entrez notre email" onChange={(text) => {this.handleEmail(text)}}/> 
                <br/>            
                <input type="password" placeholder="Entrez votre mot de passe" onChange={(text) => {this.handlePassword(text)}}/>
                <br/> */}
                {/* <button onClick={() => {this.login()}}>Login</button> */}
            </div>
            );
        }
}


export default Test;