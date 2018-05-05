import React from 'react';
import '../../pages/Pages.css';
import {SubHeader} from '../../components/SubHeader/SubHeader';

import {addRequest,loadPurchaseRequisition} from './connectAPI';

import PurchaseForm from './PurchaseForm';

export default class ViewPurchase extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
    render() {
        
        return (
            <div>
                <SubHeader title="Visualizar Requisição"></SubHeader>
                >
                <PurchaseForm
                    purchase={this.state.data.purchase} 
                    disabled={true}
                />
            </div >
        );
    }
}