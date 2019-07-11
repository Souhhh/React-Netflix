import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {PostData} from '../../services/PostData'
import {Redirect} from 'react-router-dom'
import Signup from './signup'

class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            username:'',
            password:'',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        console.log("login inside")
        if(this.state.username && this.state.password){
            console.log(this.state.email);
            console.log(this.state.password);
        PostData('login', this.state).then ((result) => {
            let responseJSON = result;
            console.log(responseJSON);
            if(responseJSON.userData){

                sessionStorage.setItem('userData', responseJSON);  
                this.setState({redirect:true});
            }
            else {error: {text: "Bad request wrong username and password"}
                console.log("login error")
            }
        })
        }
        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }

render(){
    if(this.state.redirect){
        return (<Redirect to={'/souflix'}/>)
    }
    return (
        <div className="bg-login">
            <h1 className="">Souflix</h1>
            <div className="bg">
                <div className="text">
                    <h3>S'identifier</h3>

                    <input type="text" name="username" placeholder="Email ou numéro de téléphone" onChange={this.onChange}/>                                
                    <input type="password" name="password" placeholder="Mot de passe" onChange={this.onChange}/>

                    <button type="submit" value="login" onClick={this.login}><span>S'identifier</span></button>
                    {/* <button onClick={() => {this.login()}}>Login</button>
                    <button>Inscrivez-vous</button> */}
                    <p>Première visite sur Souflix ? <span><a href="./signup">Inscrivez-vous</a></span></p>
                </div>
            </div>
        </div>
    );
  }
}
export default Login;

                