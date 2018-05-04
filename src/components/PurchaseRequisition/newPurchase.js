import React from 'react';  

import {addRequest,loadAllRequisition} from './connectAPI';


import PurchaseForm from './PurchaseForm';


export class NewPurchasePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {
        purchaseId: '', 
        management: '', 
        requisitionDate: '', 
        UGR: '', 
        originOfCost: '',
        sector: '',
        requester: '',
        requisitionItems: [],
      },
      saving: false
    };
    this.savePurchase = this.savePurchase.bind(this);
    this.updatePurchaseState = this.updatePurchaseState.bind(this);
  }

  RemoveRequest(event) {
    const purchase = this.state.purchase;
    const RequisitionItemsId = event.target.value;
    
    
    const RequisitionItems = purchase.requisitionItems.filter( (requisition)=> {return requisition.requesterId !== RequisitionItemsId }   )
   
    purchase.requisitionItems=RequisitionItems

    this.setState({purchase: purchase});
  }
  AddRequest(event) {
    const purchase = this.state.purchase;

    const requests=loadAllRequisition()


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
    addRequest(this.purchase)
  }
  

  render() {
    return (
      <div>
        <h1>Nova Requisição de Compra</h1>
        <PurchaseForm 
          purchase={this.state.purchase} 
          onRequisitionItems={this.updateRequisitionItems}
          onSave={this.savePurchase}
          onChange={this.updatePurchaseState}

          onRemoveRequest={this.RemoveRequest}
          onAddRequest={this.AddRequest}
        />
      </div>
    );
  }
}


export default NewPurchasePage