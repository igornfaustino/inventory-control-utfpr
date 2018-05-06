import React from 'react';
import '../Home/Home.css';
import { NewPurchasePage }  from '../../components/PurchaseRequisition/newPurchase'
import PurchaseListPage  from '../../components/PurchaseRequisition/PurchaseListPage'
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
			<div>
            <Switch>
			    <Route exact path={`${this.state.match.url}`} component={PurchaseListPage} />
			    <Route exact path={`${this.state.match.url}/novo`} component={NewPurchasePage} />
			    <Route exact path={`${this.state.match.url}/editar/:id`} component={EditPurchase} />
			    <Route exact path={`${this.state.match.url}/visualizar/:id`} component={ViewPurchase} />
            </Switch>
            </div >
        )
	}
}