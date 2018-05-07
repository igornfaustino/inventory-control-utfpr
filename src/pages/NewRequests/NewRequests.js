import React from 'react';
import '../Home/Home.css';
import FormRequest from "../NewRequests/FormRequest";
import { loadRequisition } from "../../components/PurchaseRequisition/connectAPI";
import { ClipLoader } from 'react-spinners';

import { Prompt } from 'react-router'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader';

import './NewRequest.css';
import axios from 'axios'

export default class NewRequest extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			requisition: {}
		}
		this.componentWillMount = this.componentWillMount.bind(this)
	}
	componentWillMount() {
		if (this.props.match.params.id) {
			try {
				loadRequisition(this.props.match.params.id).then((value) => {
					this.setState(
						{
							requisition: value.requisition,
							loading: value.loading
						}
					)
					console.log(value)
				})
			}
			catch (error) {
				console.log(error)
			}
		}
		else {
			this.setState(
				{ loading: false }
			)
		}
	}
	render() {
		let data = (<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
			<ClipLoader
				color={'#123abc'}
				loading={this.state.loading}
			/>
		</div>)
		if (this.state.loading === false) {
			data = <FormRequest
				location={this.props.location}
				requisition={this.state.requisition}
				title={"Cadastro de material"} />
		}
		return (
			<div>
				<Header></Header>
				{data}
			</div>
		)
	}
}