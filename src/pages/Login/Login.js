import React from 'react';
import { Form, Button, Input} from "reactstrap";

import HeaderLogin from '../../components/HeaderLogin/HeaderLogin';
import './Login.css';

export default class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}
	
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	
	handleChange = event => {
		this.setState({
		  [event.target.id]: event.target.value
		});
	}
	
	handleSubmit = event => {
		event.preventDefault();
		this.props.history.push('/home');
	}

	render() {
		return (
			<div>
				<HeaderLogin></HeaderLogin>
				<div className="text-center body">
					<Form onSubmit={this.handleSubmit} className="form-signin form">
						<h1 className="h3 mb-3 font-weight-normal">Login</h1>
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
						/>
						<Button className="btn btn-info btn-color" type="Submit" block size="lg" disabled={!this.validateForm()}>Entrar</Button>
						<p class="mt-5 mb-3 text-muted">&copy; 2018</p>
					</Form>
				</div>
			</div>
		);
	}
}