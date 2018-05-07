import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import {Link} from 'react-router-dom';

import '../Pages.css';
import './Products.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment';


export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			canUpload: false,
			loading: true,
			items: [],
			csv: null
		};
	}

	componentWillMount() {
		this.getRequistions();
	}

	getRequistions = () => {
		axios.get('/requisitions').then(response => {
			if (response.status === 200) {
				let requisitions = response.data.requisitions;
				let items = []
				requisitions.forEach((item) => {
					items.push({
						_id: item._id,
						// siorg: item.siorg,
						description: item.description,
						date: moment(item.date).locale('pt-br').format('DD/MM/YYYY'),
						input: (<Button color="success" onClick={() => {
							this.handleClick(item)
						}} type="submit">Solicitar</Button>)
					})
				});

				this.setState({
					items,
					loading: false
				});
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	}

	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes',
			state: { product: e }
		})
	}

	handleForce = data => {
		let body = data.slice(0); // make copy
		body.splice(0, 1);
		let header = data[0]
		header.forEach((value, id) => {
			if (value.toLocaleLowerCase() === 'descrição' || value.toLocaleLowerCase() === 'descricao' || value.toLocaleLowerCase() === 'description') {
				header[id] = 'description'
			} else if (value.toLocaleLowerCase() === 'qtd' || value.toLocaleLowerCase() === 'quantidade') {
				header[id] = 'qtd'
			} else if (value.toLocaleLowerCase() === 'siorg') {
				header[id] = 'siorg'
			} else if (value.toLocaleLowerCase() === 'date' || value.toLocaleLowerCase() === 'data') {
				header[id] = 'date'
			} else if (value.toLocaleLowerCase() === 'status' || value.toLocaleLowerCase() === 'situação') {
				header[id] = 'status'
			}else {
				header[id] = ''
			}
		});

		let csv = []
		body.forEach((value, id) => {
			let object = {}
			if (value !== '' && value.length !== 1) {
				value.forEach((value, id) => {
					if (header[id] !== '')
						object[header[id]] = value
				})
				csv.push(object)
			}
		});

		this.setState({
			csv,
			canUpload: true
		});
	};

	submitSheet = async () => {
		this.setState({
			canUpload: false
		});
		let { csv } = this.state;
		let error = []
		for (let i = 0; i < csv.length; i++) {
			try {
				let res = await axios.post('/requisition', csv[i])
				if (res.status !== 200) {
					error.push(i + 1)
				}
			}
			catch (ex) {
				error.push(i + 1)
			}
		}

		if (error.length === 0) {
			alert('Planilha importada com sucesso')
			window.location.reload();
		} else {
			alert('As segintes linhas não foram inseridas com sucesso' + error.toString())
		}
	}

	render() {
		let data
		if (this.state.loading === false) {
			data = <TableList header={['Descrição', 'Data', ' ']} items={this.state.items} />
		} else {
			data = (<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
				<ClipLoader
					color={'#123abc'}
					loading={this.state.loading}
				/>
			</div>)
		}
		return (
			<div>
				<Header></Header>
				<SubHeader title="Histórico de pedidos"></SubHeader>
				<div>
					{data}
					<div align="left" className="margin-left">
						<div className="margin-left-small">
							<p>Importe os dados da solicitação de uma planilha CSV</p>
						</div>

						<CSVReader
							cssClass="react-csv-input"
							onFileLoaded={this.handleForce}
						/>

						<Button disabled={!this.state.canUpload} type="button" color="primary" className="btn btn-primary margin-top" onClick={() => {
							this.submitSheet()
						}}>
							Enviar planilha
       					</Button>

					</div>
				</div>
			</div >
		);
	}
}