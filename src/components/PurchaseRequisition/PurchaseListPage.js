import React from 'react';
import {loadAllPurchaseRequisition} from "./connectAPI";
// Import React Table
import "react-table/react-table.css";
import SubHeader from '../SubHeader/SubHeader';
import {Button} from 'reactstrap'
import TableList from '../TableList/TableList';
import moment from 'moment'
import {ClipLoader} from 'react-spinners';
import PurchaseSave from './PurchaseSave';

import {sleep} from '../../utils/sleep'

export default class PurchaseListPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            match: props.match,
            purchaselist: [],

            // Validate Price
            validPrice: {
                min: 0.6,
                max: 1.3,
                average: 0
            },
        };
        this.RenderViewAction = this.RenderViewAction.bind(this);
        this.RenderEditAction = this.RenderEditAction.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount() {
        this.getRequistions()
    }

    getRequistions = async () => {
        try {
            const value = await loadAllPurchaseRequisition()

            this.setState(
                {
                    purchaselist: value.purchases,
                    loading: value.loading
                }
            )
        }
        catch (error) {
            // console.log(error)
            await sleep(2000)
            this.getRequistions()
        }
    }

    RenderEditAction = (index) => {
        const id = this.state.purchaselist[index]._id;
        return (
            <Button color="primary" onClick={() => {
                this.props.history.push({
                    pathname: `${this.state.match.url}/editar/${id}`,
                })
            }} type="submit">Editar</Button>
        );
    };
    RenderViewAction = (index) => {
        const id = this.state.purchaselist[index]._id;
        return (
            <Button color="secondary" onClick={() => {
                this.props.history.push({
                    pathname: `${this.state.match.url}/visualizar/${id}`,
                })
            }} type="submit">Visualizar</Button>

        );
    };
    RenderMoveAction = (index) => {
        const id = this.state.purchaselist[index]._id;
        let data = {purchase:this.state.purchaselist[index]}
        return (
            <PurchaseSave data={data} buttonLabel={"Mover"} />
        );
    };

    render() {

        let items = [];
        this.state.purchaselist.forEach((item, index) => {
            // console.log(item)
            let pricelist = []

            for (let i = 0; i < item.requisitionItems.length; i++) {
                let price = 0;

                let requisition = item.requisitionItems[i]

                if (requisition.quotation)
                    price = requisition.quotation.map((x) => x.price * requisition.qtd).reduce((a, b) => a + b, 0) / requisition.quotation.length;

                pricelist.push(price)
            }
            // console.log(pricelist);
            let price = this.state.validPrice
            price.average = pricelist.reduce((a, b) => a + b, 0)
            items.push({
                management: item.management,
                requester: item.requester,
                requisitionDate: moment(item.requisitionDate).format("DD/MM/YYYY"),
                priceSize: pricelist.length,
                min: "R$ " + (price.average * price.min).toFixed(2),
                price: "R$ " + (price.average).toFixed(2),
                max: "R$ " + (price.average * price.max).toFixed(2),
                renderEditAction: this.RenderEditAction(index),
                renderViewAction: this.RenderViewAction(index),
                // renderMoveAction: this.RenderMoveAction(index),

            })
        });
        let data = (<div className='sweet-loading' style={{display: 'flex', justifyContent: 'center', margin: 100}}>
            <ClipLoader
                color={'#123abc'}
                loading={this.state.loading}
            />
        </div>);
        if (this.state.loading === false) {
            data = (
                <div>
                    <Button color="success" href={`${this.state.match.url}/novo`}
                            style={{marginTop: '1%', marginLeft: '1%'}}>
                        Nova Compra
                    </Button>
                    <TableList
                        header={['Gestão', 'Requisitante', 'Data', 'N° de itens', 'Custo Mínimo', 'Custo Médio', 'Custo Máximo', '']}
                        items={items}/>
                </div>
            )
        }
        return (
            <div>
                <SubHeader title="Listagem de Compras" />
                {data}

            </div>
        )
    }
}