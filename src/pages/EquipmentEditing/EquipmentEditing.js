import React from 'react';
import { Prompt } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import SubHeader from '../../components/SubHeader/SubHeader';
import axios from 'axios';

export default class EquipmentsEdit extends React.Component {
    constructor(props) {
		super(props);
        
        this.state = {
            equipment: {
                siorg: 123,
                buyer: "test Buyer",
                solicitor: "test Solicitor",
                description: "descriçãsdsad",
                origin: "origem",
                equipmentType: "Tecnológico",
                quantity: 32,
                equipmentState: "Em uso",
            }
        };
    };
    componentDidMount = ()=>{
        let id = this.props.match.params.id
        try{
            await axios.get('/equipment/' + id).then(response => {
                if (response.status === 200) {
                    this.setState({
                        equipment: response.data.equipment,
                        loading: false
                    })
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            })
        }
        catch(err){
            console.error(er)
        }
    }

    onChange = (event) =>{
        let field = event.target.name;
        let equipment = this.state.equipment;
        equipment[field] = event.target.value;
        return this.setState({equipment: equipment});
    }
    
    render() {
		return (
			<div className="margin-left">
				<Form>
					<FormGroup row>
						<Label for="siorg" sm={2}>Código do SIORG:</Label>
						<Col sm={2}>
                            <Input  type="text" 
                                    name="siorg" 
                                    id="siorg"
                                    value={this.state.equipment.siorg}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="buyer" sm={2}>Comprador:</Label>
						<Col sm={4}>
                            <Input  type="text" 
                                    name="buyer" 
                                    id="buyer" 
                                    placeholder="Pessoa que comprou o produto"
                                    value={this.state.equipment.buyer}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="solicitor" sm={2}>Solicitante:</Label>
						<Col sm={4}>
                            <Input  type="text" 
                                    name="solicitor" 
                                    id="solicitor" 
                                    placeholder="Pessoa que solicitou o produto"
                                    value={this.state.equipment.solicitor}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="description" sm={2}>Descrição:</Label>
						<Col sm={7}>
                            <Input  type="textarea" 
                                    name="description" 
                                    id="description" 
                                    placeholder="Descrição detalhada do produto"
                                    value={this.state.equipment.description}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="origin" sm={2}>Origem:</Label>
						<Col sm={3}>
                            <Input  type="text" 
                                    name="origin" 
                                    id="origin" 
                                    placeholder="Origem do produto"
                                    value={this.state.equipment.origin}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="equipmentType" sm={2}>Tipo:</Label>
						<Col sm={3}>
                            <Input  type="text" 
                                    name="equipmentType"
                                    id="equipmentType" 
                                    placeholder="Tipo do produto"
                                    value={this.state.equipment.equipmentType}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="quantity" sm={2}>Quantidade:</Label>
						<Col sm={1}>
                            <Input  type="number" 
                                    name="quantity" 
                                    id="quantity"
                                    value={this.state.equipment.quantity}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="equipmentState" sm={2}>Estado:</Label>
						<Col sm={2}>
                            <Input  type="text" 
                                    name="equipmentState"
                                    id="equipmentState" 
                                    placeholder="Estado do produto"
                                    value={this.state.equipment.equipmentState}
                                    onChange={this.onChange} />
						</Col>
					</FormGroup>
				</Form>
				<div align="right"  className="margin-right">
					<Button color="success">Salvar Alterações</Button>
				</div>
			</div>
		);

	}
}