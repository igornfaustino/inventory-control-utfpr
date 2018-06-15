import React from 'react';
import '../../pages/Pages.css';
import SubHeader from '../../components/SubHeader/SubHeader';

import { updatePurchaseRequisition, loadPurchaseRequisition } from './connectAPI';
import { ClipLoader } from 'react-spinners';
import PurchaseForm from './PurchaseForm';

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
            }
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
                    loading: value.loading
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

    savePurchase(event) {
        event.preventDefault();
        try {
            updatePurchaseRequisition(this.state.data.purchase).then((value) => {
                // console.log(value)
            })
        }
        catch (error) {
            // console.log(error)
        }
    }

    ChangeRequest(requestlist) {
        const data = this.state.data;
        data.purchase.requisitionItems = requestlist;
        this.setState({ data: data });
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