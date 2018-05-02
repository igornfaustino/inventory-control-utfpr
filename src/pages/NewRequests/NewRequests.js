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
			quotation:
				[
					{
						requisitionType: '',
						reference: '',
					}
				],
			formErrors: { description: '', quantity: '', justify: '' },
			descriptionValid: false,
			quantityValid: false,
			justifyValid: false,
			formValid: false,
		};
	}

	handleQuotationChange = (idx) => (evt) => {
		const quotation = this.state.quotation.map((quotation, sidx) => {
			if (idx !== sidx) return quotation;
			return { ...quotation, [evt.target.name]: evt.target.value };
		});

		this.setState({ quotation: quotation });
	}

	handleRemoveQuotation = (idx) => () => {
		this.setState({
			quotation: this.state.quotation.filter((s, sidx) => idx !== sidx)
		});
	}

	handleAddQuotation = () => {
		this.setState({
			quotation: this.state.quotation.concat(
				[{
					requisitionType: '',
					reference: ''
				}])
		});
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({ [name]: value }, () => { this.validateField(name, value) });

	}


	//Validation functions

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let descriptionValid = this.state.descriptionValid;
		let quantityValid = this.state.quantityValid;
		let justifyValid = this.state.justifyValid;

		switch (fieldName) {
			case 'description':
				descriptionValid = value.length >= 0;
				fieldValidationErrors.description = descriptionValid ? '' : ' Campo deve ser preenchido!';
				break;
			case 'quantity':
				quantityValid = value > 0;
				fieldValidationErrors.quantity = quantityValid ? '' : ' is invalid';
				break;
			case 'justify':
				justifyValid = value.length >= 0;
				fieldValidationErrors.justify = justifyValid ? '' : ' is invalid';
				break;


			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			descriptionValid: descriptionValid,
			quantityValid: quantityValid,
			justifyValid: justifyValid,
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.descriptionValid && this.state.quantityValid
				&& this.state.justifyValid

		});
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error');
	}

	render() {
		return (
			<div>

				<Form>
					<FormGroup row>
					</FormGroup>
					<div className={`form-group${this.errorClass(this.state.formErrors.description)}`}>
						<FormGroup row>
							<Label for="descriptionArea" sm={2}>Descrição:</Label>
							<Col sm={7}>
								<Input value={this.state.description} type="textarea" id="descriptionArea" name="description" onChange={(event) => this.handleUserInput(event)}
									placeholder="Descrição detalhada sobre o material a ser solicitado" />
							</Col>
						</FormGroup>
					</div>
					<div className={`form-group
                 ${this.errorClass(this.state.formErrors.quantity)}`}>
						<FormGroup row>
							<Label for="quantityArea" sm={2}>Quantidade:</Label>
							<Col sm={1}>
								<Input value={this.state.quantity} type="number" id="quantityArea" name="quantity" onChange={(event) => this.handleUserInput(event)} />
							</Col>
						</FormGroup>
					</div>
					<div className={`form-group
                 ${this.errorClass(this.state.formErrors.justify)}`}>
						<FormGroup row>
							<Label for="justifyArea" sm={2}>Justificativa:</Label>
							<Col sm={7}>
								<Input value={this.state.justify} type="textarea" id="justifyArea" name="justify" onChange={(event) => this.handleUserInput(event)}
									placeholder="Justificativa para tal solicitação" />
							</Col>
						</FormGroup>
					</div>
					<FormGroup row className="margin-top-medium">
						<Label sm={2}>Adicionar cotação</Label>
						<Col sm={1}>
							<Button color="success" onClick={this.handleAddQuotation}>Adicionar</Button>
						</Col>
					</FormGroup>

					{this.state.quotation.map((quotation, idx) => (
						<div className="panel panel-default margin-left-huge margin-top-medium">
							<FormGroup row>
								<Label for="typeArea" sm={2}>Tipo:</Label>
								<Col sm={2}>
									<Input type="select" name="requisitionType" id="typeArea"
										value={quotation.requisitionType}
										onChange={this.handleQuotationChange(idx)}>
										<option>URL</option>
										<option>PDF</option>
									</Input>
								</Col>
								<Button color="danger" type="button" onClick={this.handleRemoveQuotation(idx)}>Remover</Button>
							</FormGroup>
							<FormGroup row>
								<Label for="referenceArea" sm={2}>URL:</Label>
								<Col sm={5}>
									<Input type="text" name="reference" id="referenceArea"
										placeholder={'Referência para cotação'}
										value={quotation.reference}
										onChange={this.handleQuotationChange(idx)}
									/>
								</Col>
							</FormGroup>
							<FormGroup className="margin-left-small">
								<Input type="file" name="file" id="fileButton" />
							</FormGroup>

							<div align="left" className="margin-left-small">
								<FormText color="muted">
									Apenas selecione um arquivo, se não for possível enviar uma URL
          						</FormText>
							</div>

						</div>
					))}

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