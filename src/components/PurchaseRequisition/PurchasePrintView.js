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
        let itens=[]
         this.state.requisitionItems.forEach( (item,index)=>{
            itens.push(
            <tr>
                <td>{index+1}</td>
                <td>{item.description}</td>
                <td>{item.qtd}</td>
                <td>R$ {item.quotation.map( (item)=> item.price)/item.quotation.length},00</td>
            </tr>)
        })
        return itens
    }
    prepareCustoDosItem(){
        let itens=[]
        let category=[]
        let find=false
        this.state.requisitionItems.forEach( (requisition,index)=>{
            let valor=requisition.qtd*requisition.quotation.map( (item)=> item.price)/requisition.quotation.length
            if(category.includes(requisition.catedory)){
                itens[category.indexOf(requisition.catedory)].itens.push(index+1)
                itens[category.indexOf(requisition.catedory)].valor+=valor
                find=true
            }
            if(!find){
                category.push(requisition.catedory)
                let item={catedory:requisition.catedory,itens:[index+1],valor:valor}
                itens.push(item)
            }
        })

        return itens.map( (item)=>{
            let itens_requisicao=""
            console.log(item.itens)
            item.itens.forEach( (item)=>{
                itens_requisicao= itens_requisicao+item+", "
            })
            return (
                <tr>
                <td>{item.catedory? item.catedory: "Não definido"}</td>
                <td>{itens_requisicao}</td>
                <td>R$ {item.valor},00</td>
                </tr>
            )
        })
    }

    render(){
        return(
        <Container>
            <Table bordered condensed hover>
                <tbody>
                <tr>
                    <td class="font-weight-bold">Requisição:</td>
                    <td>{this.state.requisitionNumber?this.state.requisitionNumber: "Não definido"}</td>
                    <td class="font-weight-bold">Setor:</td>
                    <td>{this.state.sector}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">Data:</td>
                    <td>{moment(this.state.requisitionDate).format("DD/MM/YYYY")}</td>
                    <td class="font-weight-bold">Gestão:</td>
                    <td>{this.state.management}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold"    >Requisitante:</td>
                    <td>{this.state.requester}</td>
                    <td class="font-weight-bold">UGR:</td>
                    <td>{this.state.UGR}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">Justificativa:</td>
                    <td colSpan="3">
                        {this.prepareJustify()}
                    </td>
                </tr>
                </tbody>
            </Table>
            <Table bordered condensed hover>
                <thead>
                <tr>
                   <td colSpan="4" class="font-weight-bold">Itens Inseridos</td>
                </tr>
                <tr>
                   <td class="font-weight-bold">Item</td>
                   <td class="font-weight-bold">Descrição</td>
                   <td class="font-weight-bold">Quantidade</td>
                   <td class="font-weight-bold">Valor Unitario</td>
                </tr>
                </thead>
                <tbody>
                {this.prepareItem()}
                </tbody>
            </Table>
            <Table bordered condensed hover>
                <thead>
                <tr>
                   <td colSpan="3" class="font-weight-bold">Custo Estimado</td>
                </tr>
                <tr>
                   <td class="font-weight-bold">Elemento de despesa</td>
                   <td class="font-weight-bold">Itens da Requisição</td>
                   <td class="font-weight-bold">Valor</td>
                </tr>
                </thead>
                <tbody>
                {this.prepareCustoDosItem()}
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