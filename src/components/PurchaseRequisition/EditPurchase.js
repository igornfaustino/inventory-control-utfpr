import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import '../../pages/Pages.css';
import List from '../../components/List/List';
import SubHeader from '../../components/SubHeader/SubHeader';
import TableList from '../../components/TableList/TableList';

import {addRequest} from './connectAPI';

import PurchaseForm from './PurchaseForm';
//import './EditPurchase.css';


/*const Purchasechema = mongoose.Schema({
    management: String,
    requisitionDate: String,
    UGR: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        siorg: String,
        description: { type: String, require: true },
        justification: { type: String, require: true },
        prices: [
            {
                type: { type: String, require: true },
                priceRef: String,
                value: Number
            }
        ],
        priceJustification: String,
        qtd: { type: Number, require: true },
        itemSupplier: {
            name: String,
            cnpj: String,
            phone: String,
            address: {
                number: Number,
                street: String,
                city: String,
                state: String,
                country: String,
            }
        },
    }],
});*/

export class EditPurchase extends React.Component {
    constructor(props) {
		super(props);

        this.savePurchase = this.savePurchase.bind(this);
        this.updatePurchaseState = this.updatePurchaseState.bind(this);
        this.ChangeRequest= this.ChangeRequest.bind(this)


        this.state = {
            estado: 1,
            modal: false,
            term: 'teste',
			isDisabled: true,
            checkedCount: 0,
            requisitionItems: [{
                id: 'id123',
                siorg: '12312',
                description: 'descricao...............',
                checked: false,
                change: this.handleClick
            }],
            data: {
                purchase: {
                    term: 'teste',
                    isDisabled: true,
                    management: 'utfpr',
                    requisitionDate: '2010-20-10',
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
                }
            }
        };
        
        /*onExpand = (expanded, record) => {
            console.log('onExpand', expanded, record);
        };
        
          onExpandedRowsChange = rows => {
            this.setState({
              expandedRowKeys: rows,
            });
          };
        
          onExpandIconAsCellChange = e => {
            this.setState({
              expandIconAsCell: e.target.checked,
            });
          };
        
          onExpandRowByClickChange = e => {
            this.setState({
              expandRowByClick: e.target.checked,
            });
          };*/
    };



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