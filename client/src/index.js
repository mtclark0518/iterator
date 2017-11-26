import React from 'react';
import { render } from 'react-dom';
// import { MainRoutes } from './config/routes'
import './styles/main.css';
import registerServiceWorker from './registerServiceWorker';
import Container from './containers/container'
// const Routes = MainRoutes()
const Root = document.getElementById('root')

render(
    <Container />, 
    Root
);
registerServiceWorker();
