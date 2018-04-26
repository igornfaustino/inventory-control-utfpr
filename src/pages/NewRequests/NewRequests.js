import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FormErrors } from './FormErrors';
import './NewRequest.css';

export default class NewRequest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			description: '',
			quantity: '',
			justify: '',
			requisitionType: '',
			reference: '',
			formErrors: { description: '', quantity: '', justify: '', requisitionType: '', reference: '' },
			descriptionValid: false,
			quantityValid: false,
			justifyValid: false,
			requisitionTypeValid: false,
			referenceValid: false,
		}
		this.arrayButton = [];
	}

	handleUserInput(e) {
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

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let descriptionValid = this.state.descriptionValid;
		let quantityValid = this.state.quantityValid;
		let justifyValid = this.state.justifyValid;
		let requisitionTypeValid = this.state.requisitionTypeValid;
		let referenceValid = this.state.referenceValid;

		switch (fieldName) {
			case 'description':
				descriptionValid = value.length >= 0;
				fieldValidationErrors.description = descriptionValid ? '' : ' Campo deve ser preenchido!';
				break;
			case 'quantity':
				fieldValidationErrors.quantity = quantityValid ? '' : ' is invalid';
				break;
			case 'justify':
				justifyValid = value.length >= 0;
				fieldValidationErrors.justify = justifyValid ? '' : ' is invalid';
				break;
			case 'requisitionType':
				requisitionTypeValid = value.length >= 0;
				fieldValidationErrors.requisitionType = requisitionTypeValid ? '' : ' is invalid';
				break;
			case 'reference':
				referenceValid = value.length >= 0;
				fieldValidationErrors.reference = referenceValid ? '' : ' is invalid';
				break;

			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			descriptionValid: descriptionValid,
			quantityValid: quantityValid,
			justifyValid: justifyValid,
			requisitionTypeValid: requisitionTypeValid,
			referenceValid: referenceValid,
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.descriptionValid && this.state.quantityValid
				&& this.state.justifyValid && this.state.requisitionTypeValid && this.state.referenceValid
		});
	}

	renderQuotation(props) {
		return props.aux.map(print =>

			<div className="panel panel-default">
				<FormErrors formErrors={this.state.formErrors} />
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
			<div>

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

				<div align="right" className={'margin'}>
					<Button type="submit" color="secondary" className="btn btn-primary"
						disabled={!this.state.formValid}>
						Enviar Solicitação
       				</Button>
				</div>
			</div>
		);
	}
}