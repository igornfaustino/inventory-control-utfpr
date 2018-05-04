import React from 'react';
import PropTypes from 'prop-types';
import {Form,Grid,Col,Button,Glyphicon,Modal } from 'react-bootstrap';

import {loadRequisition} from './connectAPI';

import TextInput from '../common/TextInput';



export class PurchaseForm extends React.Component {

    constructor(props) {
        super(props);

    }

    CustomComponent({ children }) {
      
      const requisition= loadRequisition(children.itemId)
      
      return (
          
        <li key={requisition.requestId } className="list-group-item">
            {requisition.description}
            <Button onClick={this.props.onRemoveRequest}>
                <Glyphicon glyph="trash" />
            </Button>
        </li>
        );
    }

    makeItems() {
        
        return this.props.purchase.requisitionItems.map(Item => {
            return <this.CustomComponent>{Item}</this.CustomComponent>
        }) 
    }

  render() {
    const requests = this.makeItems();
    return (
      <Grid>
        <Form inline>

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
        
          <h4>Itens da requisição</h4>
            {requests}
        </Col>
          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </Form>
        
      </Grid>
  );
  }
}

PurchaseForm.propTypes = {
  purchase: PropTypes.object.isRequired,
  requisitionItems: PropTypes.array.string,
  
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,

  onRemoveRequest: PropTypes.func.isRequired,
  onAddRequest: PropTypes.func.isRequired,

  saving: PropTypes.bool
};

export default PurchaseForm;