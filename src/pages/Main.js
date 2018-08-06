import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Config from './Config/Config';
import Header from '../components/Header/Header';
import {isLoggedIn} from '../utils/userLogin';

import {ToastContainer} from 'react-toastify';
import Requisicao from './Requisicao de Compra';
import Solicitacoes from './Solicitacoes';
import Almoxarifado from "./Almoxarifado";
import Usuario from "./Usuario";

const SUCCESS_MSG = 201;
const HOME = '/';

class Main extends React.Component {


    isAutentic(props, Component) {
        if (!isLoggedIn()) {
            return <Redirect to={'/usuario/login'}/>
        }
        return <Component {...props}/>
    }

    render() {
        return (
            <main>
                <ToastContainer autoClose={2000}/>
                <Header/>
                <div style={{
                    backgroundColor: 'gray',
                    textAlign: 'center'
                }}>
                    {/*{this.state.show}*/}
                </div>
                <Switch>
                    <Route path='/solicitacao/*' render={(props) => this.isAutentic(props, Solicitacoes)}/>
                    <Route path='/requisicao/*' render={(props) => this.isAutentic(props, Requisicao)}/>
                    <Route path='/almoxarifado/*' render={(props) => this.isAutentic(props, Almoxarifado)}/>
                    <Route path='/usuario/*' component={Usuario}/>

                    <Route path='/configuracoes' render={(props) => this.isAutentic(props, Config)}/>
                    <Route path='*' render={(props) => this.isAutentic(props, Home)}/>
                </Switch>
            </main>
        );
    }
}


export default Main;
export {
    HOME,
    SUCCESS_MSG
};