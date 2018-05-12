import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Table } from 'react-bootstrap';
import {Container} from 'reactstrap'
export class PurchasePrintView extends React.Component {

    constructor(props) {
      super(props)

      this.state={
        requisitionNumber: null,
        management: '',
        requisitionDate: "",
        UGR: '',
        sector: '',
        requester: '',
        requisitionItems: [],
      }
      this.componentWillMount=this.componentWillMount.bind(this)
      this.prepareJustify=this.prepareJustify.bind(this)
    }

    componentWillMount(){
      this.setState( {...this.props.purchase})
    }
    prepareJustify(){
        let justification=""
        this.state.requisitionItems.forEach((element,index) => {
            justification+= "O item "+(index+1)+" é "+element.justification+". "
        })
        return justification
    }
    prepareItem(){
        let items=[]
         this.state.requisitionItems.forEach( (item,index)=>{
            items.push(
            <tr>
                <td>{index+1}</td>
                <td>{item.description}</td>
                <td>{item.qtd}</td>
                <td>{item.quotation.map( (item)=> item.price)/item.quotation.length}</td>
            </tr>)
        })
        return items
    }

    render(){
        return(
        <Container>
            <Table bordered condensed hover>
                <tbody>
                <tr>
                    <td>Requisição:</td>
                    <td>{this.state.requisitionNumber?this.state.requisitionNumber: "Não definido"}</td>
                    <td>Setor:</td>
                    <td>{this.state.sector}</td>
                </tr>
                <tr>
                    <td>Data:</td>
                    <td>{moment(this.state.requisitionDate).format("DD/MM/YYYY")}</td>
                    <td>Gestão:</td>
                    <td>{this.state.management}</td>
                </tr>
                <tr>
                    <td>Requisitante:</td>
                    <td>{this.state.requester}</td>
                    <td>UGR:</td>
                    <td>{this.state.UGR}</td>
                </tr>
                <tr>
                    <td>Justificativa:</td>
                    <td colSpan="3">
                        {this.prepareJustify()}
                    </td>
                </tr>
                </tbody>
            </Table>
            <Table bordered condensed hover>
                <thead>
                <tr>
                   <td colSpan="4">Itens Inseridos</td>
                </tr>
                <tr>
                   <td>Item</td>
                   <td>Descrição</td>
                   <td>Quantidade</td>
                   <td>Valor Unitario</td>
                </tr>
                </thead>
                <tbody>
                {this.prepareItem()}
                </tbody>
            </Table>
        </Container>
        )
    }
    
}

PurchasePrintView.propTypes = {
  purchase: PropTypes.object.isRequired,
};

export default PurchasePrintView;