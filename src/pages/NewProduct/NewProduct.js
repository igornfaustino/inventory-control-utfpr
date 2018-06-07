import React from 'react';
import { Prompt } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import './NewProduct.css';
import axios from 'axios';

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

			formErrors: {siorg: '', buyer: '', requester: '', description: '', origin: '', type: '', quantity: '', state: ''},
			
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
	}1


	render() {
		return (
			<div>
				<Header></Header>
				<SubHeader title="Cadastro de item"></SubHeader>
				<div className="margin-left">
					<Form>
						<FormGroup row>
							<Label for="siorgCode" sm={2}>Código do SIORG:</Label>
							<Col sm={2}>
								<Input type="text" name="siorg" id="siorgCode" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="buyerArea" sm={2}>Comprador:</Label>
							<Col sm={4}>
								<Input type="text" name="buyer" id="buyerArea" placeholder="Pessoa que comprou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="requesterArea" sm={2}>Solicitante:</Label>
							<Col sm={4}>
								<Input type="text" name="requester" id="requesterArea" placeholder="Pessoa que solicitou o produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="descriptionArea" sm={2}>Descrição:</Label>
							<Col sm={7}>
								<Input type="textarea" name="description" id="descriptionArea" placeholder="Descrição detalhada do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="originArea" sm={2}>Origem:</Label>
							<Col sm={3}>
								<Input type="text" name="origin" id="originArea" placeholder="Origem do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="typeArea" sm={2}>Tipo:</Label>
							<Col sm={3}>
								<Input type="text" name="type" id="typeArea" placeholder="Tipo do produto" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="quantityArea" sm={2}>Quantidade:</Label>
							<Col sm={1}>
								<Input type="number" name="quantity" id="quantityArea" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="stateArea" sm={2}>Estado:</Label>
							<Col sm={2}>
								<Input type="text" name="state" id="stateArea" placeholder="Estado do produto" />
							</Col>
						</FormGroup>
					</Form>
					<div align="right" className="margin-right">
						<Button color="success">Cadastrar Produto</Button>
					</div>
				</div>
			</div>
		);

	}
}