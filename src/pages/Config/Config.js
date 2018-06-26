import React from 'react';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader';

import { Button, Col, Form, FormGroup, Input, Label, Container } from 'reactstrap'
import axios from "axios";

export default class Config extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			status: '',
			type: '',
			management: '',
			ugr: '',
			sector: ''
		}
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({ [name]: value });
	}

	submit = (e) => {
		e.preventDefault()
		let local = e.target.name

		let data = this.state[local]
		if(data === ""){
			return alert("Preencha o campo antes de adicionar!")
		}
		axios.post("/" + local, {
			[local]: data
		}).then(res => {
			alert("adicionado com sucesso!")
			this.setState({
				[local]: ""
			})
		}).catch(ex => {
			alert("Ops.. Algo saiu errado")
		})
	}

	render() {
		return (
			<div>
				<Header></Header>
				<SubHeader title="Configurações"></SubHeader>
				<Container style={{
					marginLeft: "50px"
				}}>
					<Form>
						<FormGroup row style={marginForm}>
							<Label for="statusArea" sm={2}>Novo Status:</Label>
							<Col sm={4}>
								<Input value={this.state.status} type="text" name="status" id="statusArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status" />
							</Col>
							<Col md={4}></Col>
							<Col md={2}>
								<Button block type="submit" color="success" name="status" onClick={(event) => this.submit(event)}>
									Adicionar Status
								</Button>
							</Col>
						</FormGroup>
						<hr />
						<FormGroup row style={marginForm}>
							<Label for="typeArea" sm={2}>Novo Tipo de Item:</Label>
							<Col sm={4}>
								<Input value={this.state.type} type="text" name="type" id="typeArea" onChange={(event) => this.handleUserInput(event)} placeholder="Tipo" />
							</Col>
							<Col md={4}></Col>
							<Col md={2}>
								<Button block type="submit" color="success" name="type" onClick={(event) => this.submit(event)}>
									Adicionar Tipo
								</Button>
							</Col>
						</FormGroup>
						<hr />
						<FormGroup row style={marginForm}>
							<Label for="managementArea" sm={2}>Nova Gestão:</Label>
							<Col sm={4}>
								<Input value={this.state.management} type="text" name="management" id="managementArea" onChange={(event) => this.handleUserInput(event)} placeholder="Gestão" />
							</Col>
							<Col md={4}></Col>
							<Col md={2}>
								<Button block type="submit" color="success" name="management" onClick={(event) => this.submit(event)}>
									Adicionar Gestão
								</Button>
							</Col>
						</FormGroup>
						<hr />
						<FormGroup row style={marginForm}>
							<Label for="ugrArea" sm={2}>Novo UGR:</Label>
							<Col sm={4}>
								<Input value={this.state.ugr} type="text" name="ugr" id="ugrArea" onChange={(event) => this.handleUserInput(event)} placeholder="UGR" />
							</Col>
							<Col md={4}></Col>
							<Col md={2}>
								<Button block type="submit" color="success" name="ugr" onClick={(event) => this.submit(event)}>
									Adicionar UGR
								</Button>
							</Col>
						</FormGroup>
						<hr />
						<FormGroup row style={marginForm}>
							<Label for="sectorArea" sm={2}>Novo Setor:</Label>
							<Col sm={4}>
								<Input value={this.state.sector} type="text" name="sector" id="sectorArea" onChange={(event) => this.handleUserInput(event)} placeholder="Setor" />
							</Col>
							<Col md={4}></Col>
							<Col md={2}>
								<Button block type="submit" color="success" name="sector" onClick={(event) => this.submit(event)}>
									Adicionar Setor
								</Button>
							</Col>
						</FormGroup>
						<hr />
					</Form>
				</Container>
			</div>
		);
	}
}

const marginForm = {
	marginTop: 50,
	marginBottom: 50
}