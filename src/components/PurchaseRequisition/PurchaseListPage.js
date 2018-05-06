import React from 'react';
import { loadAllPurchaseRequisition } from "./connectAPI";

// Import React Table
import Table from 'rc-table';
import "react-table/react-table.css";
import SubHeader from '../SubHeader/SubHeader';
import {Link} from 'react-router-dom';
import { Container,Button} from 'reactstrap'
import TableList from '../TableList/TableList';
import moment from 'moment'
import { ClipLoader } from 'react-spinners';

export default class PurchaseListPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          loading:true,
          match: props.match,
          purchaselist: []
        };
        this.RenderViewAction=this.RenderViewAction.bind(this)
        this.RenderEditAction=this.RenderEditAction.bind(this)
        this.componentWillMount=this.componentWillMount.bind(this)
    }
    componentWillMount(){
        try{
          loadAllPurchaseRequisition().then((value)=>{
            
            this.setState(
              {
                purchaselist: value.purchases,
                loading : value.loading
              }
            )
          })
        }
        catch(error){
          console.log(error)
        }
      }

    RenderEditAction= (index) => {
        const id=this.state.purchaselist[index]._id
        return (
          <Link to={`${this.state.match.url}/editar/${id}`}>
            Editar
          </Link>
        );
      }
      RenderViewAction= (index) => {
        const id=this.state.purchaselist[index]._id
        return (
          <Link to={`${this.state.match.url}/visualizar/${id}`}>
            Visualizar
          </Link>
        );
      }
    render(){
        
            let items=[]
            this.state.purchaselist.map((item,index)=>{
                let price=0
                item.requisitionItems.map( (requisition)=>{
                    let pricequotation=0
                    if(requisition.quotation){
                        requisition.quotation.map( qt=>{
                            pricequotation=pricequotation+qt.price
                        })
                        price=price+requisition.qtd*(pricequotation/requisition.quotation.length)
                    }
                })
                items.push({
                    management:item.management,
                    requester: item.requester,
                    requisitionDate:moment(item.requisitionDate).format("DD/MM/YYYY"),
                    price: "R$ "+price,  
                    renderEditAction:this.RenderEditAction(index),
                    renderViewAction:this.RenderViewAction(index),
                })
            })
            let data=(<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
                        <ClipLoader
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>)
            if(this.state.loading === false){
                data=(
                    <div>
                        <TableList header={['Gestão', 'Requisitante', 'Data','Custo', '','']} items={items} />
                        <Container className="float-right">
                            <Button 
                            color="success" 
                            href={`${this.state.match.url}/novo`}
                            className="float-right" 
                            >
                            Nova Requisição
                            </Button> 
                        </Container>
                    </div>
                )
            }
        return(
        <div>
            <SubHeader title="Listagem de Requisição"></SubHeader>
            {data}
        </div>
        )
    }
}