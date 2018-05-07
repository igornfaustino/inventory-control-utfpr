import React from 'react';
import { Prompt } from 'react-router'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SubHeader from '../../components/SubHeader/SubHeader';

import './NewRequest.css';
import axios from 'axios'

export default class FormRequest extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			description: '',
			quantity: '',
			justify: '',
			quotation:
				[
					{
						requisitionType: 'URL',
						reference: '',
						price: '',
						rawFile: null,
						file: ''
					}
				],
			formErrors: { description: '', quantity: '', justify: '', },
			descriptionValid: false,
			quantityValid: false,
			justifyValid: false,
			formValid: false,
			edit: false
		};
	}

	onChangeFile = (idx) => (evt) => {
		let quotation = this.state.quotation;
		quotation[idx].rawFile = evt.target.files[0]
		this.setState({
			quotation
		});
	}

	componentWillMount() {
		console.log(this.props)
		if (this.props.requisition) {
			this.setState({
				description: this.props.requisition.description,
				quantity: this.props.requisition.qtd,
				justify: this.props.requisition.justification,
				quotation: this.props.requisition.quotation,
				edit: true,
				_id: this.props.requisition._id,
				descriptionValid: true,
				quantityValid: true,
				justifyValid: true,
				formValid: true,
			}
			)
		}
		if (this.props.location.state && this.props.location.state.product) {
			this.setState({
				description: this.props.location.state.product.description,
				descriptionValid: true
			});
		}
	}

	handleQuotationChange = (idx) => (evt) => {
		const quotation = this.state.quotation.map((quotation, sidx) => {
			if (idx !== sidx) return quotation;
			if (evt.target.name === 'requisitionType'){
				return{...quotation, 'requisitionType': evt.target.value, 'reference': ''}
			} else {
				return { ...quotation, [evt.target.name]: evt.target.value };
			}
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
					requisitionType: 'URL',
					reference: '',
					price: '',
					rawFile: null,
					file: ''
				}])
		});
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({ [name]: value }, () => { this.validateField(name, value) });

	}
	saveRequest = async () => {
		this.setState({
			descriptionValid: false,
			quantityValid: false,
			justifyValid: false,
			formValid: false,
		});

		axios.put('/requisition/' + this.state._id, {
			description: this.state.description,
			justification: this.state.justify,
			qtd: this.state.quantity,
			quotation: await this.preparePriceEdit()
		}).then(res => {
			console.log(res)
			if (res.status === 200) {
				alert("Atualizado com sucesso")
			} else {
				alert("Opss.. algo saiu errado");
				this.setState({
					descriptionValid: true,
					quantityValid: true,
					justifyValid: true,
					formValid: true,
				});
			}
		}).catch(err => {
			console.log(err)
			alert("Opss.. algo saiu errado");
			this.setState({
				descriptionValid: true,
				quantityValid: true,
				justifyValid: true,
				formValid: true,
			});
		});
	}

	async preparePrice() {
		console.log(this.state.quotation)
		let prices = this.state.quotation
		for (let i = 0; i < prices.length; i++) {
			if (prices[i].requisitionType.toLocaleUpperCase() === 'PDF') {
				let formData = new FormData();
				formData.append('file', prices[i].rawFile)
				const file = await axios.post('/file/', formData);
				prices[i].reference = file.data.fileId
			}
			delete prices[i].file
			delete prices[i].rawFile
		}
		prices = prices.filter((price) => {
			return (price.reference !== '')
		})
		console.log(prices)
		return prices
	}

	async preparePriceEdit() {
		console.log(this.state.quotation)
		let prices = this.state.quotation
		for (let i = 0; i < prices.length; i++) {
			delete prices[i].file
			delete prices[i].rawFile
		}
		prices = prices.filter((price) => {
			return (price.reference !== '')
		})
		console.log(prices)
		return prices
	}

	submitRequest = async () => {
		this.setState({
			descriptionValid: false,
			quantityValid: false,
			justifyValid: false,
			formValid: false,
		});

		axios.post('/requisition/', {
			description: this.state.description,
			justification: this.state.justify,
			qtd: this.state.quantity,
			quotation: await this.preparePrice()
		}).then(res => {
			console.log(res)
			if (res.status === 200) {
				alert("Solicitação cadastrada")
				this.setState({
					description: '',
					quantity: '',
					justify: '',
					quotation:
						[
							{
								requisitionType: 'URL',
								reference: '',
								price: '',
								rawFile: null,
								file: ''
							}
						],
					formErrors: { description: '', quantity: '', justify: '' },
				})
			} else {
				alert("Opss.. algo saiu errado");
				this.setState({
					descriptionValid: true,
					quantityValid: true,
					justifyValid: true,
					formValid: true,
				});
			}
		}).catch(err => {
			console.log(err)
			alert("Opss.. algo saiu errado");
			this.setState({
				descriptionValid: true,
				quantityValid: true,
				justifyValid: true,
				formValid: true,
			});
		});
	}

	// TODO: remove from this file
	fileDownload = (file) => () => {
		axios.get('/file/' + file, {
			responseType: 'blob'
		}).then(res => {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', file + '.pdf');
			document.body.appendChild(link);
			link.click();
		})
	}

	// TODO: remove from this file
	fileDelete = (idx) => () => {
		let quotation = this.state.quotation;
		let file = quotation[idx].reference;
		axios.delete('/file/' + file).then(res => {
			if (res.status === 200) {
				quotation[idx].reference = '';
				this.setState({
					quotation
				})
			}
		});
	}

	//--------- Validation functions --------------

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
		const { descriptionValid, quantityValid, justifyValid } = this.state
		return (
			<div>
				<Prompt
					when={descriptionValid || quantityValid || justifyValid}
					message="tem certeza que deseja sair desta página? Todas as suas alterações serão perdidas"
				/>
				<SubHeader title={this.props.title}></SubHeader>
				<Form style={{
					marginTop: 30
				}}>
					<FormGroup row style={marginRight}>
					</FormGroup>
					<div className={`form-group${this.errorClass(this.state.formErrors.description)}`}>
						<FormGroup row style={marginRight}>
							<Label for="descriptionArea" sm={2}>Descrição:</Label>
							<Col sm={7}>
								<Input value={this.state.description} type="textarea" id="descriptionArea" name="description" onChange={(event) => this.handleUserInput(event)}
									placeholder="Descrição detalhada sobre o material a ser solicitado" />
							</Col>
						</FormGroup>
					</div>
					<div className={`form-group
                 ${this.errorClass(this.state.formErrors.quantity)}`}>
						<FormGroup row style={marginRight}>
							<Label for="quantityArea" sm={2}>Quantidade:</Label>
							<Col sm={1}>
								<Input value={this.state.quantity} type="number" id="quantityArea" name="quantity" onChange={(event) => this.handleUserInput(event)} />
							</Col>
						</FormGroup>
					</div>
					<div className={`form-group
                 ${this.errorClass(this.state.formErrors.justify)}`}>
						<FormGroup row style={marginRight}>
							<Label for="justifyArea" sm={2}>Justificativa:</Label>
							<Col sm={7}>
								<Input value={this.state.justify} type="textarea" id="justifyArea" name="justify" onChange={(event) => this.handleUserInput(event)}
									placeholder="Justificativa para tal solicitação" />
							</Col>
						</FormGroup>
					</div>
					<FormGroup row style={marginRight} className="margin-top-medium">
						<Label sm={2}>Adicionar cotação</Label>
						<Col sm={1}>
							<Button color="success" onClick={this.handleAddQuotation}>Adicionar</Button>
						</Col>
					</FormGroup>

					{this.state.quotation.map((quotation, idx) => {
						if (quotation.requisitionType === 'URL') {
							return (
								<div className="panel panel-default margin-left-huge margin-top-medium" key={idx}>
									<FormGroup row style={marginRight}>
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
									<FormGroup row style={marginRight}>
										<Label for="referenceArea" sm={2}>URL:</Label>
										<Col sm={5}>
											<Input type="url" name="reference" id="referenceArea"
												placeholder={'Referência para cotação'}
												value={quotation.reference}
												onChange={this.handleQuotationChange(idx)}
											/>
										</Col>
									</FormGroup>
									<FormGroup row style={marginRight}>
										<Label for="priceArea" sm={2}>Preço:</Label>
										<Col sm={2}>
											<Input type="text" name="price" id="priceArea"
												placeholder={'R$'}
												value={quotation.price}
												onChange={this.handleQuotationChange(idx)}
											/>
										</Col>
									</FormGroup>

								</div>
							)
						} else {
							let file
							if (quotation.reference === '') {
								file = (<FormGroup className="margin-left-small">
									<Input type="file" label="upload" accept=".pdf" name="file" id="fileButton" onChange={this.onChangeFile(idx)} />
								</FormGroup>)
							} else {
								file = (
									<div className="margin-left-small text-left">
										<p>Arquivo enviado com sucesso</p>
										<FormGroup row style={marginRight} className="padding">
											<Button type="button" color="primary" className="my-btn-download" onClick={this.fileDownload(quotation.reference)}>Download</Button>
											<Button type="button" color="danger" className="my-btn-excluir" onClick={this.fileDelete(idx)}>Excluir</Button>
										</FormGroup>
									</div>
								)
							}
							return (
								<div className="panel panel-default margin-left-huge margin-top-medium" key={idx}>
									<FormGroup row style={marginRight}>
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
									<FormGroup row style={marginRight}>
										<Label for="priceArea" sm={2}>Preço:</Label>
										<Col sm={2}>
											<Input type="text" name="price" id="priceArea"
												placeholder={'R$'}
												value={quotation.price}
												onChange={this.handleQuotationChange(idx)}
											/>
										</Col>
									</FormGroup>

									{file}

								</div>
							)
						}

					})}

				</Form>

				<div align="right" className={'margin'}>
					<Button type="submit" color="secondary" className="btn btn-primary"
						disabled={!this.state.formValid} onClick={this.state.edit ? this.saveRequest : this.submitRequest}>
						{this.state.edit ?'Salvar Alterações':'Enviar Solicitação'}
       				</Button>
				</div>
			</div>
		);
	}
}

const marginRight = {
	marginRight: 0
}