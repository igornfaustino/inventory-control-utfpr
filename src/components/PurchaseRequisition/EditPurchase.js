import React from 'react';
import '../../pages/Pages.css';
import {SubHeader} from '../../components/SubHeader/SubHeader';

import {addRequest,loadPurchaseRequisition} from './connectAPI';

import PurchaseForm from './PurchaseForm';

export default class EditPurchase extends React.Component {
    constructor(props) {
		super(props);
        this.savePurchase = this.savePurchase.bind(this);
        this.updatePurchaseState = this.updatePurchaseState.bind(this);
        this.ChangeRequest= this.ChangeRequest.bind(this)

        this.state = {
            match: props.match,
            data: {
                purchase: {}
            }
        };
        this.componentDidMount=this.componentDidMount.bind(this)        
    };
    componentDidMount(){
        const data=this.state.data
        data.purchase=loadPurchaseRequisition(this.state.match.params.id)
        this.setState({
            data:data
        })
    }


    updatePurchaseState(event) {
        const field = event.target.name;
        const data = this.state.data;
        data.purchase[field] = event.target.value;
        return this.setState({data: data});
    }
    savePurchase(event) {
        event.preventDefault();
        addRequest(this.state.data.purchase)
    }
    ChangeRequest(requestlist) {
        const data = this.state.data;
        data.purchase.requisitionItems=requestlist
        this.setState({data: data});
    }

    render() {
        return (
            <div>
                <SubHeader title="Editar de Requisição"></SubHeader>
                <PurchaseForm
                    purchase={this.state.data.purchase} 
                    
                    onSave={this.savePurchase}
                    onChange={this.updatePurchaseState}
        
                    edit={true}
                    onChangeRequest={this.ChangeRequest}
                />
            </div >
        );
    }
}