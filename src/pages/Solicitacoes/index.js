import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ListaSolicitacao from './Lista';
import {HOME} from '../Main';
import FormTemplate from './Form';

import Create from './Create';
import Update from './Update';
import View from './View';
import Preview from './Preview';
import Table from './Table';

const SOLICITACOES_ALL = {page: 'Listagem das Solicitações', url: '/solicitacao/'};
const SOLICITACOES_VIEW = {page: 'Visualizar Solicitação', url: '/solicitacao/visualizar'};
const SOLICITACOES_CREATE = {page: 'Realizar pedido de nova Solicitação', url: '/solicitacao/nova'};
const SOLICITACOES_UPDATE = {page: 'Realizar pedido de nova Solicitação', url: '/solicitacao/editar'};


class Solicitacoes extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path={SOLICITACOES_ALL.url} component={ListaSolicitacao}/>
                    <Route exact path={SOLICITACOES_CREATE.url} component={Create}/>
                    <Route exact path={SOLICITACOES_UPDATE.url} component={Update}/>
                    <Route exact path={SOLICITACOES_VIEW.url} component={View}/>
                    <Redirect from='*' to={HOME}/>
                </Switch>
            </main>
        );
    }
}


export default Solicitacoes;
export {
    Create as CreateSolicitacao,
    Table as TableSolicitacao,
    Update as UpdateSolicitacao,
    View as ViewSolicitacao,
    Preview as PreviewSolicitacao,
    FormTemplate as FormSolicitacao,
    SOLICITACOES_VIEW,
    SOLICITACOES_UPDATE,
    SOLICITACOES_CREATE,
    SOLICITACOES_ALL
};