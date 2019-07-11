import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {PostData} from '../../services/PostData'
import {Redirect} from 'react-router-dom'

class Signup extends Component{
    constructor(props){
        super(props)
        this.state= {
            username:'',
            name:'',
            email:'',
            password:'',
            redirect: false
        }
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    signup(){
        console.log("signup inside")
        if(this.state.username && this.state.password){
            console.log(this.state.email);
            console.log(this.state.password);
        PostData('signup', this.state).then ((result) => {
            let responseJSON = result;
            console.log(responseJSON);
            if(responseJSON.userData){

                sessionStorage.setItem('userData', responseJSON);  
                this.setState({redirect:true});
            }
            else {error: {text: "Bad request wrong username and password"}
                console.log("signup error")
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
                    <h3>S'inscrire</h3>
                    <p>Créez votre compte</p>

                    <input type="text" name="username" placeholder="Nom et prénom" onChange={this.onChange}/>

                    <input type="text" name="email" placeholder="Email ou numéro de téléphone" onChange={this.onChange}/> 

                    <input type="text" name="name" placeholder="Numéro de téléphone" onChange={this.onChange}/>                               
                    <input type="password" name="password" placeholder="Choisissez un mot de passe" onChange={this.onChange}/>

                    <input type="checkbox" class="" name="emailPreference" id="bxid_emailPreference_true" tabindex="0" data-uia="emailPreference" value="true"></input>

                    <button type="submit" value="signup" onClick={this.signup}><span>S'inscrire</span></button>
                </div>
            </div>
        </div>
    );
  }
}
export default Signup;

                