import React from 'react';  

import {addRequest} from './connectAPI';
import {SubHeader} from '../SubHeader/SubHeader';

import PurchaseForm from './PurchaseForm';

export class NewPurchasePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      purchase: {
        term: 'teste',
        isDisabled: true,
        management: 'utfpr',
        requisitionDate: '2016-05-02T00:00:00',
        UGR: 'Laboratorio de Computacao',
        originOfCost: 'materiais de consumo',
        sector: 'DACOM',
        requester: 'Zanoni',
        requisitionItems: [
            {
                id: '1',
                siorg: '1',
                description: 'dasdasdsad',
            },
            {
                id: '2',
                siorg: 'das1',
                description: 'kujadfnalkfdasdasdsad',
            }
        ],
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
    addRequest(this.state.purchase)
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