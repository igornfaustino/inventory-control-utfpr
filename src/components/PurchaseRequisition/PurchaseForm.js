import React from 'react';
import PropTypes from 'prop-types';
import {Form,Col } from 'react-bootstrap';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Container} from 'reactstrap'
import moment from 'moment'
import { ClipLoader } from 'react-spinners';
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
        loading:true,
        data:
        {
          requisitions:[]
        }
      }
      this.toggleOut= this.toggleOut.bind(this)
      this.toggleIn= this.toggleIn.bind(this)
      this.removeRequest= this.removeRequest.bind(this)
      this.AddRequest= this.AddRequest.bind(this)
    }

    componentWillMount(){
      const state=this.state
      state.data.requisitions
      try{
        loadAllRequisition().then((value)=>{
          let data=this.state.data
          data.requisitions= value.requisition
          this.setState(
            {
              data:data,
              loading : value.loading
            }
          )
        })
      }
      catch(error){
        console.log(error)
      }
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
      this.setState({
        modal: true
      });
    }
    toggleOut() {
      this.setState({
        modal: false
      });
    }
    ButtonAddRequest=()=>{
      if(!this.props.disabled){
        return(
          <Container className="float-right">
            <Button 
              outline 
              onClick={this.toggleIn} 
              className="float-right"
              >
              Adiciona Solicitações
            </Button> 
          </Container>
        )
      }
      else{
        return ( "")
      }
    }
    isDisabled=()=>{
      return (
        this.props.purchase.requester.length>0 &&
        this.props.purchase.management.length>0 &&
        this.props.purchase.UGR.length>0 &&
        this.props.purchase.sector.length>0 &&
        this.props.purchase.requester.length>0 
      ) ? false:true
    }
    ButtonFinishRequest=()=>{
      if(!this.props.disabled){
        return(
          <Container className="float-right">
                <Button 
                  color="success" 
                  className="float-right" 
                  disabled={this.isDisabled() }
                  onClick={this.props.onSave}
                  value={this.props.edit? 'Salvar Alterações': 'Salvar'}
                >
                  Salvar Alterações
                </Button> 
          </Container>
        )
      }
      else{
        return ( "")
      }
    }

  render() {
    let ColumnRemove= [
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
    let ColumnAdd =[
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
    ]
    if(!this.props.disabled){
      ColumnAdd.push({ 
        title: 'Operação', 
        dataIndex: '', 
        key: 'x', 
        width: '10%',
        render: this.renderDeleteAction 
      })
    }
    let mytable=(
        <div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
          <ClipLoader
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>)
    if(this.state.loading === false){
      mytable=<Table 
                columns={ ColumnRemove}
                data={this.state.data.requisitions} 
                className="table" 
                rowKey={record => record._id} />
    }
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
            disabled={this.props.disabled}
            value={moment(this.props.purchase.requisitionDate).format("YYYY-MM-DD")}
            onChange={this.props.onChange}/>

          <TextInput
            name="management"
            label="Gestão"
            disabled={this.props.disabled}
            size='4'
            value={this.props.purchase.management}
            onChange={this.props.onChange}/>

          <TextInput
            name="requester"
            label="Requisitante"
            disabled={this.props.disabled}
            size='4'
            value={this.props.purchase.requester}
            onChange={this.props.onChange}/>
         
          <TextInput
            name="sector"
            label="Setor"
            disabled={this.props.disabled}
            size='4'
            value={this.props.purchase.sector}
            onChange={this.props.onChange}/>

          <TextInput
            name="UGR"
            label="UGR"
            size='4'
            disabled={this.props.disabled}
            value={this.props.purchase.UGR}
            onChange={this.props.onChange}/>
          
        <Col sm={12}>
        
        <this.ButtonAddRequest/>
        <Table 
          columns={ ColumnAdd}
          data={this.props.purchase.requisitionItems} 
          className="table" 
          rowKey={record => record._id} />
        
          <this.ButtonFinishRequest/>
        </Col>
          
        </Form>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggleOut} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Solicitações Disponíveis</ModalHeader>
          <ModalBody>
            {mytable}
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
  disabled: PropTypes.bool,
  
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,

  onChangeRequest: PropTypes.func.isRequired,

  saving: PropTypes.bool
};

export default PurchaseForm;