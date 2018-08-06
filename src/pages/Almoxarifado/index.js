import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Lista from './Lista';
import Create from './Create';
import Table from './Table'
import View from './View'
import Preview from './Preview'
import Update from "./Update";

const ALMOXARIFADO_ALL ={ url:  '/almoxarifado/', page: 'Lista de itens do estoque'};
const ALMOXARIFADO_CREATE = {url:'/almoxarifado/nova' , page:'Cadastrar novo item'};
const ALMOXARIFADO_UPDATE = {url: '/almoxarifado/editar', page:'Editar item'};
const ALMOXARIFADO_VIEW = {url: '/almoxarifado/visualizar', page:'Visualizar item'};

class Almoxarifado extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path={ALMOXARIFADO_ALL.url} component={Lista}/>
                    <Route exact path={ALMOXARIFADO_CREATE.url} component={Create}/>
                    <Route exact path={ALMOXARIFADO_UPDATE.url} component={Update}/>
                    <Route exact path={ALMOXARIFADO_VIEW.url} component={View}/>
                    <Redirect from='*' to='/home'/>
                </Switch>
            </main>
        );
    }
}

export {
    Table as TableAlmoxarifado,
    Create as CreateAlmoxarifado,
    View as ViewAlmoxarifado,
    Preview as PreviewAlmoxarifado,
    Lista as ListaAlmoxarifado,
    ALMOXARIFADO_UPDATE,
    ALMOXARIFADO_CREATE,
    ALMOXARIFADO_VIEW,
    ALMOXARIFADO_ALL,
}

export default Almoxarifado;
