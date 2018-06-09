import React from 'react';
import { Prompt } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import './NewProduct.css';
import axios from 'axios';
/*
 - Screen for register a new equipment in the data base
 - All fields are necessary

*/

export default class NewProduct extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			siorg: '',
			buyer: '',
			requester: '',
			description: '',
			origin: '',
			type: '',
			quantity: '',
			state: '',

			formErrors: { siorg: '', buyer: '', requester: '', description: '', origin: '', type: '', quantity: '', state: '' },

			siorgValid: false,
			buyerValid: false,
			requesterValid: false,
			descriptionValid: false,
			originValid: false,
			typeValid: false,
			quantityValid: false,
			stateValid: false,
			formValid: false,

		};
	}


	// Validation Functions
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let siorgValid = this.state.siorgValid;
		let buyerValid = this.state.buyerValid;
		let requesterValid = this.state.requesterValid;
		let descriptionValid = this.state.descriptionValid;
		let originValid = this.state.originValid;
		let typeValid = this.state.typeValid;
		let quantityValid = this.state.quantityValid;
		let stateValid = this.state.stateValid;

		switch (fieldName) {
			case 'siorg':
				let siorgNumber = true;
				let aux;
				for (var i in value) {
					aux = parseInt(value[i]);
					if (isNaN(aux)) {
						siorgNumber = false;
						break;
					}
				}
				siorgValid = value.length >= 0 && siorgNumber;
				fieldValidationErrors.siorg = siorgValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'buyer':
				buyerValid = value.length >= 0;
				fieldValidationErrors.buyer = buyerValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'requester':
				requesterValid = value.length >= 0;
				fieldValidationErrors.requester = requesterValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'description':
				descriptionValid = value.length >= 0;
				fieldValidationErrors.description = descriptionValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'origin':
				originValid = value.length >= 0;
				fieldValidationErrors.origin = originValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'type':
				typeValid = value.length >= 0;
				fieldValidationErrors.type = typeValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'quantity':
				quantityValid = value.length >= 0;
				fieldValidationErrors.quantity = quantityValid ? '' : 'Campo deve ser preenchido!';
				break;
			case 'state':
				stateValid = value.length >= 0;
				fieldValidationErrors.state = stateValid ? '' : 'Campo deve ser preenchido!';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			siorgValid: siorgValid,
			buyerValid: buyerValid,
			requesterValid: requesterValid,
			descriptionValid: descriptionValid,
			originValid: originValid,
			typeValid: typeValid,
			quantityValid: quantityValid,
			stateValid: stateValid
		}, this.validateForm);

	}

	validateForm() {
		this.setState({
			formValid: this.state.siorgValid && this.state.buyerValid && this.state.requesterValid &&
				this.state.descriptionValid && this.state.originValid && this.state.typeValid && this.state.quantityValid
				&& this.state.stateValid
		});
	}
	
	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({ [name]: value }, () => { this.validateField(name, value) });

	}

	//Function to connect with the database and save a new equipment
	submitRequest = () => {
		if (!this.state.siorgValid || !this.state.buyerValid || !this.state.requesterValid || !this.state.descriptionValid
			|| !this.state.originValid || !this.state.typeValid || !this.state.quantityValid || !this.state.stateValid) {
			alert("Preencha todos os campos");
			return;
		}

		// console.log(this.state)

		this.setState({
			siorgValid: false,
			buyerValid: false,
			requesterValid: false,
			descriptionValid: false,
			originValid: false,
			typeValid: false,
			quantityValid: false,
			stateValid: false,
			formValid: false,
		});


		axios.post('/equipment/', {
			siorg: this.state.siorg,
			buyer: this.state.buyer,
			solicitor: this.state.requester,
			description: this.state.description,
			origin: this.state.origin,
			equipmentType: this.state.type,
			quantity: this.state.quantity,
			equipmentState: this.state.state,
		}).then(res => {
			console.log(res)
			if (res.status === 200) {
				alert("Solicitação cadastrada")
				this.setState({
					siorg: '',
					buyer: '',
					requester: '',
					description: '',
					origin: '',
					type: '',
					quantity: '',
					state: '',

					formErrors: { siorg: '', buyer: '', requester: '', description: '', origin: '', type: '', quantity: '', state: '' },

				});
			} else {
				alert("Opss.. algo saiu errado");
				this.setState({
					siorgValid: true,
					buyerValid: true,
					requesterValid: true,
					descriptionValid: true,
					originValid: true,
					typeValid: true,
					quantityValid: true,
					stateValid: true,
					formValid: true,
				});
			}
		}).catch(err => {
			console.log(err)
			alert("Opss.. algo saiu errado");
			this.setState({
				siorgValid: true,
				buyerValid: true,
				requesterValid: true,
				descriptionValid: true,
				originValid: true,
				typeValid: true,
				quantityValid: true,
				stateValid: true,
				formValid: true,
			});
		});
	}

	render() {

		const { siorgValid, buyerValid, requesterValid, descriptionValid, originValid, typeValid, quantityValid, stateValid} = this.state
		// console.log(this.state)
		return (
			<div>
				{/* Alert to show that there are things unsaved */}
				<Prompt
					when={siorgValid || buyerValid || requesterValid || descriptionValid || originValid || typeValid ||
					quantityValid || stateValid}
					message="tem certeza que deseja sair desta página? Todas as suas alterações serão perdidas"
				/>

				<Header></Header>
				<SubHeader title="Cadastro de item"></SubHeader>
				<div className="margin-left">
					<Form>
						<FormGroup row>
							<Label for="siorgCode" sm={2}>Código do SIORG:</Label>
							<Col sm={2}>
								<Input value={this.state.siorg} type="text" name="siorg" id="siorgCode" onChange={(event) => this.handleUserInput(event)} placeholder="Número Siorg" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="buyerArea" sm={2}>Comprador:</Label>
							<Col sm={4}>
								<Input value={this.state.buyer} type="text" name="buyer" id="buyerArea" onChange={(event) => this.handleUserInput(event)} placeholder="Pessoa que comprou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="requesterArea" sm={2}>Solicitante:</Label>
							<Col sm={4}>
								<Input value={this.state.requester} type="text" name="requester" id="requesterArea" onChange={(event) => this.handleUserInput(event)} placeholder="Pessoa que solicitou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="descriptionArea" sm={2}>Descrição:</Label>
							<Col sm={7}>
								<Input value={this.state.description} type="textarea" name="description" id="descriptionArea" onChange={(event) => this.handleUserInput(event)} placeholder="Descrição detalhada do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="originArea" sm={2}>Origem:</Label>
							<Col sm={3}>
								<Input value={this.state.origin} type="text" name="origin" id="originArea" onChange={(event) => this.handleUserInput(event)} placeholder="Origem do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="typeArea" sm={2}>Tipo:</Label>
							<Col sm={3}>
								<Input value={this.state.type} type="text" name="type" id="typeArea" onChange={(event) => this.handleUserInput(event)} placeholder="Tipo do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="quantityArea" sm={2}>Quantidade:</Label>
							<Col sm={1}>
								<Input value={this.state.quantity} type="number" name="quantity" onChange={(event) => this.handleUserInput(event)} id="quantityArea" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="stateArea" sm={2}>Estado:</Label>
							<Col sm={2}>
								<Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Estado do produto" />
							</Col>
						</FormGroup>
					</Form>
					<div align="right" className="margin-right">
						<Button type="submit" color="success" disabled={!this.state.formValid} onClick={this.submitRequest}>
							Cadastrar Produto
						</Button>
					</div>
				</div>
			</div>
		);

	}
}