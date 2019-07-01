import React from 'react';
import ReactDOM from 'react-dom';
// On veut utiliser le composant App mais comme il n'est pas dans ce fichier, on doit l'importer.
import App from './containers/app'

const API_KEY = "844132b4db1beb141b6a86d0d727445a"


ReactDOM.render(<App/>, document.querySelector('.container'));


