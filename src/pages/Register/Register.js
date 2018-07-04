import React from 'react';
import { Form, Button, Input } from "reactstrap";
import axios from 'axios';

import HeaderLogin from '../../components/HeaderLogin/HeaderLogin';
import '../Login/Login.css';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		};
	}

	validateForm() {
		return this.state.name.length > 3 && this.state.email.length > 0 && this.state.password.length > 0 && (this.state.password === this.state.confirmPassword);
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post("/register", {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(res => {
			if(res.status === 200){
				console.log(res)
				alert('Cadastro efetuado com sucesso!');
				this.props.history.push('/');
			} else {
				alert('Opss.. algo saiu errado!')
			}
		}).catch(ex => {
			console.error(ex)
			alert('Opss.. algo saiu errado!')
		})
	};

	handleClick = () => {
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				<HeaderLogin></HeaderLogin>
				<div className="text-center body">
					<Form onSubmit={this.handleSubmit} className="form-signin form">
						<h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>
						<Input
							id="name"
							type="text"
							placeholder="Nome"
							onChange={this.handleChange}
							value={this.state.name}
							required
						/>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							onChange={this.handleChange}
							value={this.state.email}
							required
						/>
						<Input
							id="password"
							type="password"
							placeholder="Senha"
							onChange={this.handleChange}
							value={this.state.password}
							required
							style = {{
								marginBottom:0
							}}
						/>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="Confirmar Senha"
							onChange={this.handleChange}
							value={this.state.confirmPassword}
							required
						/>
						<Button className="btn btn-success btn-color" type="Submit" block size="lg" disabled={!this.validateForm()}>Cadastrar</Button>
						<Button onClick={() => { this.handleClick() }} className="btn btn-secondary" block size="lg" style={{ fontSize: "1em" }}>Voltar</Button>
						<p className="mt-5 mb-3 text-muted">&copy; 2018</p>
					</Form>
				</div>
			</div>
		);
	}
}