import React from 'react';
import PropTypes from 'prop-types';
import {Form,Grid,Col,Glyphicon } from 'react-bootstrap';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Container,FormGroup} from 'reactstrap'

import {loadAllRequisition} from './connectAPI';

import TextInput from '../common/TextInput';
// Import React Table
import Table from 'rc-table';
import "react-table/react-table.css";

const CheckBox = ({ id }) => (
  <label>
    <input type="checkbox" />
    {id}
  </label>
);

CheckBox.propTypes = {
  id: PropTypes.string,
};

export class PurchaseForm extends React.Component {

    constructor(props) {
      super(props)

      this.state={
        modal: false,
        data:
        {
          requisitions:[]
        }
      }
      this.toggleOut= this.toggleOut.bind(this)
      this.toggleIn= this.toggleIn.bind(this)
      this.removeRequest= this.removeRequest.bind(this)
      this.AddRequest= this.AddRequest.bind(this)
      this.loadRequisitionFromApi=this.loadRequisitionFromApi.bind(this)
    }

    loadRequisitionFromApi(){
      const state=this.state
      state.data.requisitions=loadAllRequisition()
      this.setState(
        {
          state : state
        }
      )
    }
    AddRequest(index){
      const rows = this.props.purchase.requisitionItems;
      const requisitions= this.state.data.requisitions
      if(!rows.includes(requisitions[index])){
        console.log("Item adicionado a lista com sucesso!")
        rows.push(requisitions[index])
        this.props.onChangeRequest(rows)
      }
      else{
        console.warn("Item já esta contido!")
      }
    }

    handleRemoveClick = index => () => {
      this.removeRequest(index);
    };
    handleAddClick = index => () => {
      this.AddRequest(index);
    };
  
    renderDeleteAction = (o, row, index) => {
      return (
        <a href='#' onClick={this.handleRemoveClick(index)}>
          Remover
        </a>
      );
    }
    renderAddAction = (o, row, index) => {
      return (
        <a href='#' onClick={this.handleAddClick(index)}>
          Adicionar
        </a>
      );
    }
    removeRequest(index) {
      const rows = this.props.purchase.requisitionItems;
      rows.splice(index, 1);
      this.props.onChangeRequest(rows)
    }
    toggleIn() {
      this.loadRequisitionFromApi()
      this.setState({
        modal: true
      });
    }
    toggleOut() {
      this.setState({
        modal: false
      });
    }

  render() {
    return (
      <div>
        <Form 
          style={{marginTop: 30}}
        >

          <TextInput
            name="requisitionDate"
            label="Data"
            type='date'
            size='4'
            value={this.props.purchase.requisitionDate}
            onChange={this.props.onChange}/>

          <TextInput
            name="management"
            label="Gestão"
            size='4'
            value={this.props.purchase.management}
            onChange={this.props.onChange}/>

          <TextInput
            name="requester"
            label="Requisitante"
            size='4'
            value={this.props.purchase.requester}
            onChange={this.props.onChange}/>
         
          <TextInput
            name="sector"
            label="Setor"
            size='4'
            value={this.props.purchase.sector}
            onChange={this.props.onChange}/>

          <TextInput
            name="UGR"
            label="UGR"
            size='4'
            value={this.props.purchase.UGR}
            onChange={this.props.onChange}/>
          
          <TextInput
            name="originOfCost"
            label="Centro de custo"
            size='4'
            value={this.props.purchase.originOfCost}
            onChange={this.props.onChange}/>
        <Col sm={12}>
        <Container className="float-right">
          <Button 
            outline 
            onClick={this.toggleIn} 
            className="float-right"
          >
            Adiciona Solicitações
          </Button> 
				</Container>
        <Table 
          columns={
            [
              { 
                title: 'Siorg',
                dataIndex: 'siorg', 
                key: 'siorg', 
                width: '10%' 
              },,
              { 
                title: 'Descrição',
                dataIndex: 'description', 
                key: 'description', 
                width: '80%'
              },
              { 
                title: 'Operação', 
                dataIndex: '', 
                key: 'x', 
                width: '10%',
                render: this.renderDeleteAction 
              },
            ]
          }
          data={this.props.purchase.requisitionItems} 
          className="table" 
          rowKey={record => record.id} />
        
          <Container className="float-right">
                <Button 
                  color="success" 
                  disabled={this.props.saving}
                  className="float-right" 
                  onClick={this.props.onSave}
                  value={this.props.edit? 'Salvar Alterações': 'Salvar'}
                >
                  Salvar Alterações
                </Button> 
          </Container>
        </Col>
          
        </Form>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggleOut} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Solicitações Disponíveis</ModalHeader>
          <ModalBody>
            <Table 
            columns={
              [
                { 
                  title: 'Siorg',
                  dataIndex: 'siorg', 
                  key: 'siorg', 
                  width: '10%' 
                },
                { 
                  title: 'Descrição',
                  dataIndex: 'description', 
                  key: 'description', 
                  width: '80%'
                },
                { 
                  title: 'Operação', 
                  dataIndex: '', 
                  key: 'x', 
                  width: '10%',
                  render: this.renderAddAction 
                },
              ]
            }
            data={this.state.data.requisitions} 
            className="table" 
            rowKey={record => record.id} />
          </ModalBody>
          <ModalFooter>
              <Button color="secondary" onClick={this.toggleOut}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
  );
  }
}

PurchaseForm.propTypes = {
  purchase: PropTypes.object.isRequired,

  edit: PropTypes.bool,
  
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,

  onChangeRequest: PropTypes.func.isRequired,

  saving: PropTypes.bool
};

export default PurchaseForm;