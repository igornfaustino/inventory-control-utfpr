import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {HOME} from "../Main";
import Table from './Table';
import Lista from "./Lista";
import Create from "./Create";
import FormTemplate from "./Form";
import FormTemplateLogin from "./FormLogin";
import Login from "./Login";

const USUARIO_ALL = '/usuario/';
const USUARIO_CREATE = '/usuario/novo';
const USUARIO_LOGIN = '/usuario/login';
const USUARIO_LOGOUT = '/usuario/logout';

class Usuario extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path={USUARIO_ALL} component={Lista}/>
                    <Route exact path={USUARIO_CREATE} component={Create}/>
                    <Route exact path={USUARIO_LOGIN} component={Login}/>
                    {/*<Route exact path={REQUISICAO_UPDATE} component={Update}/>*/}
                    {/*<Route exact path={REQUISICAO_VIEW} component={View}/>*/}
                    <Redirect from='*' to={HOME}/>
                </Switch>
            </main>
        );
    }
}

export {
    USUARIO_ALL,
    USUARIO_CREATE,
    USUARIO_LOGIN,
    USUARIO_LOGOUT,
    FormTemplate as FormUser,
    FormTemplateLogin as FormLoginUser,
    Table as TableUser
}

export default Usuario;
