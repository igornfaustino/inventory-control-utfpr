import React from 'react';
import '../../pages/Pages.css';
import SubHeader from '../SubHeader/SubHeader';

import { ClipLoader } from 'react-spinners';
import { loadPurchaseRequisition } from './connectAPI';
import PurchasePrintView from './PurchasePrintView'


export default class ViewPurchase extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
        try {
            const data = this.state.data
            loadPurchaseRequisition(this.state.match.params.id).then((value) => {
                data.purchase = value.purchases
                this.setState(
                    {
                        data: data,
                        loading: value.loading
                    }
                )
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    render() {
        let data=(
        <div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
            <ClipLoader
                color={'#123abc'}
                loading={this.state.loading}
            />
        </div>
        )
        if(this.state.loading === false){
            data=
            (<PurchasePrintView
                purchase={this.state.data.purchase}
            />)
        }
        
        return (
            <div>
                <SubHeader title="Visualizar Requisição"></SubHeader>
                { data}
            </div >
        );
    }
}