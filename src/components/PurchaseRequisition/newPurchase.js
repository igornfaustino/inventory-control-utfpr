import React from 'react';  

import {savePurchaseRequisition} from './connectAPI';
import SubHeader from '../SubHeader/SubHeader';

import PurchaseForm from './PurchaseForm';
import moment from 'moment';
export class NewPurchasePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {
        management: '',
        requisitionDate: moment(Date.now()).format("YYYY-MM-DD"),
        UGR: '',
        sector: '',
        requester: '',
        requisitionItems: [],
    },
      saving: false
    };
    this.savePurchase = this.savePurchase.bind(this);
    this.updatePurchaseState = this.updatePurchaseState.bind(this);
    this.ChangeRequest= this.ChangeRequest.bind(this)
  }

  ChangeRequest(requestlist) {
    const purchase = this.state.purchase;
    purchase.requisitionItems=requestlist
    this.setState({purchase: purchase});
  }
  

  updatePurchaseState(event) {
    const field = event.target.name;
    const purchase = this.state.purchase;
    purchase[field] = event.target.value;
    return this.setState({purchase: purchase});
  }

  savePurchase(event) {
    event.preventDefault();
    try{
       savePurchaseRequisition(this.state.purchase).then( (value)=>{
        console.log(value)
      })
    }
    catch(error){
      console.log(error)
    }
  }
  

  render() {
    return (
      <div>
        <SubHeader title="Nova Requisição de Compra"></SubHeader>
        <PurchaseForm 
          purchase={this.state.purchase} 
          onSave={this.savePurchase}
          onChange={this.updatePurchaseState}

          edit={false}
          onChangeRequest={this.ChangeRequest}
        />
      </div>
    );
  }
}


export default NewPurchasePage