import React from 'react';
import '../../pages/Pages.css';
import SubHeader from '../../components/SubHeader/SubHeader';
import PurchaseSave from './PurchaseSave';

import { updatePurchaseRequisition, loadPurchaseRequisition } from './connectAPI';
import { ClipLoader } from 'react-spinners';
import PurchaseForm from './PurchaseForm';
import axios from 'axios';

import { sleep } from '../../utils/sleep'


export default class EditPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.savePurchase = this.savePurchase.bind(this);
        this.updatePurchaseState = this.updatePurchaseState.bind(this);
        this.ChangeRequest = this.ChangeRequest.bind(this);

        this.state = {
            match: props.match,
            loading: true,
            data: {
                purchase: {}
            },
            requisition: {},
            // requisitionUpdate: {}
        };
        this.componentDidMount = this.componentDidMount.bind(this)
    };
    componentDidMount() {
        this.initComponent()
    }

    initComponent = async () => {
        try {
            const data = this.state.data;
            const value = await loadPurchaseRequisition(this.state.match.params.id)
            //   console.log(value);
            data.purchase = value.purchases;
            this.setState(
                {
                    data: data,
                    loading: value.loading,
                    requisition: data.purchase.requisitionItems
                }
            )
        }
        catch (error) {
            // console.log(error)
            await sleep(2000);
            this.initComponent();
        }
    }

    updatePurchaseState(event) {
        const field = event.target.name;
        const data = this.state.data;
        data.purchase[field] = event.target.value;
        return this.setState({ data: data });
    }

    async savePurchase(event) {
        event.preventDefault();
        try {
            const axiosRes = updatePurchaseRequisition(this.state.data.purchase)
            axiosRes.then(res => {
                if (res.status === 200) {
                    alert("Compra Atualizada!")
                    let notifyEmail = this.state.data.purchase.requisitionItems.filter((value) => {
                        for (let requisition of this.state.requisition) {
                            if (requisition._id === value.item)
                                return false
                        }
                        return true
                    });
                    for (let notify of notifyEmail) {
                        axios.post('email/send/' + notify.item, {
                            subject: "Item adicionado a uma compra",
                            text: "Seu pedido foi adicionado a um pedido de compra."
                        }).then(res => {
                            console.log(res)
                        })
                    }
                    window.location.reload();
                }
            })
        }
        catch (error) {
            // console.log(error)
        }
    }

    ChangeRequest(requestlist) {
        const data = this.state.data;
        data.purchase.requisitionItems = requestlist;
        console.log(data.purchase.requisitionItems)
        this.setState({
            data: data,
        });
    }

    render() {
        let data = (<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
            <ClipLoader
                color={'#123abc'}
                loading={this.state.loading}
            />
        </div>);
        if (this.state.loading === false) {
            data = <PurchaseForm
                purchase={this.state.data.purchase}

                onSave={this.savePurchase}
                onChange={this.updatePurchaseState}

                edit={true}
                onChangeRequest={this.ChangeRequest}
            />
        }
        return (
            <div>
                <SubHeader title="Editar Requisição"></SubHeader>
                {data}
            </div >
        );
    }
}