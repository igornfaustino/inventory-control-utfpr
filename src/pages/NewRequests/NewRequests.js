import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class NewRequest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			description: '',
			quantity: '',
			justify: '',
			requisitionType:'',
			reference:''
		}
		this.arrayButton = [];
	}

	handleUserInput (e){
		const description = e.target.description;
		const quantity = e.target.quantity;
		const justify = e.target.justify;
		const requisitionType = e.target.requisitionType;
		const reference = e.target.reference;

		this.setState({
			description, quantity, justify, requisitionType, reference
		});
		
	}

	showButton() {
		this.arrayButton.push({
			type: " ",
			reference: " "
		});
		// this.forceUpdate(() => {});
	}

	//Validation functions


	renderQuotation(props) {
		return props.aux.map(print =>
			<div>
				<FormGroup row>
					<Label for="typeArea" sm={2}>Tipo:</Label>
					<Col sm={1}>
						<Input type="select" name="select" id="typeArea">
							<option>Link</option>
							<option>E-mail</option>
							<option>PDF</option>
						</Input>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="referenceArea" sm={2}>Referência:</Label>
					<Col sm={5}>
						<Input type="text" name="reference" id="referenceArea" />
					</Col>
				</FormGroup>
			</div>
		);
	}

	render() {
		return (
			<Form>
				<FormGroup row>
				</FormGroup>
				<FormGroup row>
					<Label for="descriptionArea" sm={2}>Descrição:</Label>
					<Col sm={7}>
						<Input value={this.state.description} type="textarea" id="descriptionArea" name="description" onChange={(event) => this.handleUserInput(event)}
 placeholder="Descrição detalhada sobre os materias a serem solicitados" />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="quantityArea" sm={2}>Quantidade:</Label>
					<Col sm={2}>
						<Input value={this.state.quantity} type="number" onChange={(event) => this.handleUserInput(event)}
 placeholder="Quantidade" />
					</Col> 
				</FormGroup>
				<FormGroup row>
					<Label for="justifyArea" sm={2}>Justificativa:</Label>
					<Col sm={7}>
						<Input value={this.state.justify} type="textarea" onChange={(event) => this.handleUserInput(event)}
 placeholder="Justificativa para tal solicitação" />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Adicionar cotação</Label>
					<Col sm={1}>
						<Button color="secondary">Adicionar</Button>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col>
						<this.renderQuotation aux={this.arrayButton}></this.renderQuotation>
					</Col>
				</FormGroup>

			</Form>
		);
	}
}