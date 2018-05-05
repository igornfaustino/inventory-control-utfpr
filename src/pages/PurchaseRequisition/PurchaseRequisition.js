import React from 'react';
import '../Home/Home.css';
import { NewPurchasePage }  from '../../components/PurchaseRequisition/newPurchase'
import  PurchaseListPage  from '../../components/PurchaseRequisition/PurchaseListPage'
import EditPurchase from "../../components/PurchaseRequisition/EditPurchase";
import ViewPurchase from "../../components/PurchaseRequisition/ViewPurchase"
// Import Routes
import {
    Route,
    Switch
  } from 'react-router-dom';

export default class PurchaseRequisition extends React.Component {
    constructor({match}){
        super(match)
        this.state={
            match: match
        }
    }
    render() {
		return (
			<div align="left" className={'margin'}>
            <Switch>
			    <Route exact path={`/requisicoesdecompra`} component={PurchaseListPage} />
			    <Route exact path={`/requisicoesdecompra/novo`} component={NewPurchasePage} />
			    <Route exact path={`/requisicoesdecompra/editar/:id(\\d+)`} component={EditPurchase} />
			    <Route exact path={`/requisicoesdecompra/visualizar/:id(\\d+)`} component={ViewPurchase} />
            </Switch>
            </div >
        )
	}
}