import React from 'react';
import { loadAllPurchaseRequisition } from "./connectAPI";

// Import React Table
import Table from 'rc-table';
import "react-table/react-table.css";
import {SubHeader} from '../SubHeader/SubHeader';
import {Link} from 'react-router-dom';

export default class PurchaseListPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          match: props.match,
          purchaselist: []
        };
        this.RenderViewAction=this.RenderViewAction.bind(this)
        this.RenderEditAction=this.RenderEditAction.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
    }

    componentDidMount(){
        this.setState({
            purchaselist:loadAllPurchaseRequisition()
        })
    }
    RenderEditAction= (o, row, index) => {
        const id=this.state.purchaselist[index].purchaseId
        return (
          <Link to={`${this.state.match.url}/editar/${id}`}>
            Editar
          </Link>
        );
      }
      RenderViewAction= (o, row, index) => {
        const id=this.state.purchaselist[index].purchaseId
        return (
          <Link to={`${this.state.match.url}/visualizar/${id}`}>
            Visualizar
          </Link>
        );
      }
    render(){
        const columns=
            [
                { 
                    title: 'ID', 
                    dataIndex: 'purchaseId', 
                    key: 'purchaseId',
                    width: '10%', 
                },
                { 
                    title: 'Gestão', 
                    dataIndex: 'management', 
                    key: 'management',
                    width: '10%', 
                },
                { 
                    title: 'Requisitante', 
                    dataIndex: 'requester', 
                    key: 'requester',
                    width: '10%', 
                },
                { 
                    title: '', 
                    dataIndex: 'purchaseId', 
                    key: 'purchaseId', 
                    width: '10%', 
                    render: this.RenderEditAction 
                },
                { 
                    title: '', 
                    dataIndex: '', 
                    key: 'x', 
                    width: '10%', 
                    render: this.RenderViewAction 
                }
            ]
        return(
        <div>
            <SubHeader title="Listagem de Requisição"></SubHeader>
            <Table
                columns={columns}
                data={this.state.purchaselist}
            />
        </div>
        )
    }
}