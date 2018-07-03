import React from 'react';
import { Prompt } from 'react-router'
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
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
			isPermanent: false,
			patrimonyNumber: '',
			siorg: '',
			buyer: '',
			requester: '',
			description: '',
			origin: '',
			type: '',
			typeList: [],
			quantity: '',
			state: '',
			stateList: [],

			formErrors: {
				siorg: '',
				buyer: '',
				requester: '',
				description: '',
				origin: '',
				type: '',
				typeList: [],
				quantity: '',
				state: '',
				stateList: []
			},

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

	componentWillMount(){
		this.getStatus();
		this.getType();
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
				for (let i in value) {
					aux = parseInt(value[i], 10);
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

		this.setState({ [name]: value }, () => {
			this.validateField(name, value)
		});

	}

	//Function to get item status
	getStatus = () => {
		axios.get('/status').then(response => {
			if (response.status === 200) {
				let resStatus = response.data.status;
				let status = [];
				resStatus.forEach((_status) => {
					console.log(_status)
					status.push(_status.status)
				});

				console.log(status)
				this.setState({
					stateList: status
				})
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	};

	//Function to get item type
	getType = () => {
		axios.get('/type').then(response => {
			if (response.status === 200) {
				let typeItem = response.data.type;
				let type = [];
				typeItem.forEach((_type) => {
					//console.log(_status)
					type.push(_type.type)
				});

				//console.log(status)
				this.setState({
					typeList: type
				})
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	};

	//Function to connect with the database and save a new equipment
	submitRequest = async () => {
		if (!this.state.siorgValid || !this.state.buyerValid || !this.state.requesterValid || !this.state.descriptionValid
			|| !this.state.originValid || !this.state.typeValid || !this.state.quantityValid || !this.state.stateValid) {
			alert("Preencha todos os campos");
			return;
		}

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

		// console.log(this.state)
		try {

			for (var i = 0; i < this.state.quantity; i++) {

				let res = await axios.post('/equipment/', {
					isPermanent: this.state.isPermanent,
					patrimonyNumber: this.state.isPermanent ? this.state.patrimonyNumber : '',
					siorg: this.state.siorg,
					buyer: this.state.buyer,
					solicitor: this.state.requester,
					description: this.state.description,
					origin: this.state.origin,
					equipmentType: this.state.type,
					equipmentState: this.state.state,
				})
				// let resState = await axios.post('/status/', {
				// 	equipmentState: this.state.state,
				// })

				if (res.status !== 201) {
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
			}

			this.setState({
				siorg: '',
				buyer: '',
				requester: '',
				description: '',
				origin: '',
				type: '',
				quantity: '',
				state: '',
				isPermanent: false,
				patrimonyNumber: '',

				formErrors: { siorg: '', buyer: '', requester: '', description: '', origin: '', type: '', quantity: '', state: '' },

			});
			alert("Solicitação cadastrada")
		}
		catch (ex) {
			console.error(ex)
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
	}

	render() {
		let data;
		console.log(this.state.stateList)
		data = this.state.stateList.map((item, index) =>
			<option value={item} key={index}>{item}</option>
		);

		let dataType;
		dataType = this.state.typeList.map((item, index) =>
			<option value={item} key={index}>{item}</option>
		);

		const { siorgValid, buyerValid, requesterValid, descriptionValid, originValid, typeValid, quantityValid, stateValid } = this.state
		// console.log(this.state)

		let patrimonyfield = null
		if (this.state.isPermanent) {
			patrimonyfield = (<FormGroup row>
				<Label style={{ marginLeft: "7px" }} for="patrimony" sm={2}>Número de patrimônio:</Label>
				<Col sm={2}>
					<Input value={this.state.patrimonyNumber} type="text" name="patrimonyNumber" id="patrimony" onChange={(event) => this.handleUserInput(event)} placeholder="Número de patrimônio" />
				</Col>
			</FormGroup>)
		}

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
							<Label sm={2} check style={{ marginTop: "10px", marginLeft: "7px" }}>
								<Input type="checkbox" checked={this.state.isPermanent} name="isPermanent" onChange={() => this.setState({ isPermanent: !this.state.isPermanent })} />{' '}
								Item permanente
          					</Label>
						</FormGroup>
						{patrimonyfield}
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="siorgCode" sm={2}>Código do SIORG:</Label>
							<Col sm={2}>
								<Input value={this.state.siorg} type="text" name="siorg" id="siorgCode" onChange={(event) => this.handleUserInput(event)} placeholder="Número Siorg" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>

							<Label for="buyerArea" sm={2}>Comprador:</Label>
							<Col sm={4}>
								<Input value={this.state.buyer} type="text" name="buyer" id="buyerArea" onChange={(event) => this.handleUserInput(event)} placeholder="Pessoa que comprou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="requesterArea" sm={2}>Solicitante:</Label>
							<Col sm={4}>
								<Input value={this.state.requester} type="text" name="requester" id="requesterArea" onChange={(event) => this.handleUserInput(event)} placeholder="Pessoa que solicitou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="descriptionArea" sm={2}>Descrição:</Label>
							<Col sm={7}>
								<Input value={this.state.description} type="textarea" name="description" id="descriptionArea" onChange={(event) => this.handleUserInput(event)} placeholder="Descrição detalhada do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>

							<Label for="originArea" sm={2}>Origem:</Label>
							<Col sm={3}>
								<Input value={this.state.origin} type="text" name="origin" id="originArea" onChange={(event) => this.handleUserInput(event)} placeholder="Origem do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="typeArea" sm={2}>Tipo:</Label>
							<Col sm={3}>
								<Input type="select" name="type" id="typeArea" onChange={(event) => this.handleUserInput(event)} value={this.state.typeArea}>
									{dataType}
								</Input>
								{/* <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status do produto" /> */}
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="quantityArea" sm={2}>Quantidade:</Label>
							<Col sm={1}>
								<Input value={this.state.quantity} type="number" name="quantity" onChange={(event) => this.handleUserInput(event)} id="quantityArea" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<p style={{ marginTop: "10px", color: "red" }}>*</p>
							<Label for="stateArea" sm={2}>Status:</Label>
							<Col sm={3}>
								<Input type="select" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} value={this.state.stateArea}>
									{data}
								</Input>
								{/* <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status do produto" /> */}
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