import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";

import '../Pages.css';
import './Products.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

import axios from 'axios';
import moment from 'moment'


export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
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

	//Comentar depois: controla adição dos itens - habilita botao quando um item está marcado
	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes',
			state: { product: e }
		})
	}

	handleForce = data => {
		this.setState({
			csv: data
		});
	};

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
				<SubHeader title="Histórico de pedidos"></SubHeader>

				<div>
					{data}
					<div  align="left" className="container">
						<CSVReader
							cssClass="react-csv-input"
							label="Importe os dados da solicitação de uma planílha CSV"
							onFileLoaded={this.handleForce}
						/>
					</div>
				</div>
			</div >
		);
	}
}