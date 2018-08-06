import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Lista from './Lista';
import Create from './Create';
import Table from './Table'
import View from './View'
import Preview from './Preview'
import Update from "./Update";

const REQUISICAO_ALL = {url: '/requisicao/', page:'Todas as compras'};
const REQUISICAO_CREATE = {url: '/requisicao/nova/', page:'Nova compra'};
const REQUISICAO_UPDATE = {url:'/requisicao/editar/', page:'Atualizar compra'};
const REQUISICAO_VIEW = {url:'/requisicao/visualizar/', page:'Visualizar compra'};

class Requisicao extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path={REQUISICAO_ALL.url} component={Lista}/>
                    <Route exact path={REQUISICAO_CREATE.url} component={Create}/>
                    <Route exact path={REQUISICAO_UPDATE.url} component={Update}/>
                    <Route exact path={REQUISICAO_VIEW.url} component={View}/>
                    <Redirect from='*' to='/home'/>
                </Switch>
            </main>
        );
    }
}

export {
    Table as TableRequisicao,
    Create as CreateRequisicao,
    Lista as ListaRequisicao,
    Preview as PreviewRequisicao,
    REQUISICAO_UPDATE,
    REQUISICAO_VIEW,
    REQUISICAO_CREATE,
    REQUISICAO_ALL
}

export default Requisicao;
