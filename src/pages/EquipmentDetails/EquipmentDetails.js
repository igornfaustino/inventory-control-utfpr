import React from 'react';
import { Button, Table } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { Container } from 'reactstrap'

import '../Pages.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment';

export default class EquipmentDetails extends React.Component {
	constructor(props) {
		super(props);
		// this.handleClick = this.handleClick.bind(this);
		this.state = {
			siorg: '',
			buyer: '',
			solicitor: '',
			description: '',
			origin: '',
			equipmentType: '',
			quantity: '',
			equipmentState: '',
			locationHistory: [
				// 	{
				// 	date: '',
				// 	justification: '',
				// 	locationType: '',
				// 	location: '',
				// }
			],
		};
		this.componentWillMount = this.componentWillMount.bind(this)
		// justification: String,
		// locationType: String,
		// 2location: String, */}
	}
	componentWillMount() {
		this.setState({ ...this.props.equipment })
	}
	/*componentWillMount() {
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
						input:(<Button color="success" onClick={() => {
							this.handleClick(item)
						}} type="submit">Solicitar</Button>),

						edit: (<Link to={`editarsolicitacoes/${item._id}`}>
						Editar
					  </Link>)
					})
				})
				// items = items.filter(item => {
				// 	return item.status === 'aprovado'
				// });
				
				this.setState({
					items,
					loading: false
				})
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

	onChange = (event) => {
		this.setState({ term: event.target.value });
	}*/
	// 								{/* date: 1Date,
	// justification: String,
	// locationType: String,
	// 2location: String, */}
	historyItems() {
		let historyItems = []
		this.state.locationHistory.forEach((item, index) => {
			historyItems.push(
				<tr>
					{/* <td>{index + 1}</td> */}
					<td>{item.date}</td>
					<td>{item.location}</td>
					<td>{item.locationType}</td>
					<td>{item.justification}</td>
				</tr>)
		})
		return historyItems
	}

	render() {

		return (
			<div>
				<Header></Header>
				<SubHeader title="Almoxarifado > Detalhes do Equipamento"></SubHeader>
				<Container>
					<Table bordered condensed hover>
						<tbody>
							<tr>
								<td colSpan="3" class="font-weight-bold">SIORG:</td>
								<td colSpan="3">{this.state.siorg ? this.state.siorg : "SIORG não definido."}</td>
								<td colSpan="3" class="font-weight-bold">Comprador:</td>
								<td colSpan="3">{this.state.buyer ? this.state.buyer : "Comprador não informado."}</td>
							</tr>
							<tr>
								<td colSpan="3" class="font-weight-bold">Solicitante:</td>
								<td colSpan="3">{this.state.solicitor ? this.state.solicitor : "Solicitante não definido."}</td>
								<td colSpan="3" class="font-weight-bold">Origem:</td>
								<td colSpan="3">{this.state.origin}</td>
							</tr>
							<tr>
								<td colSpan="2" class="font-weight-bold">Quantidade:</td>
								<td colSpan="2">{this.state.quantity}</td>
								<td colSpan="2" class="font-weight-bold">Tipo do Equipamento:</td>
								<td colSpan="2">{this.state.equipmentType}</td>
								<td colSpan="2" class="font-weight-bold">Estado do Equipamento:</td>
								<td colSpan="2">{this.state.equipmentState}</td>
							</tr>
							<tr>
								<td colSpan="2" class="font-weight-bold">Descrição:</td>
								<td colSpan="10">
									{this.state.description}
								</td>
							</tr>

						</tbody>

					</Table>
					<Table bordered condensed hover>
						<thead>
							<tr>
								<td colSpan="4" class="font-weight-bold text-center">Histórico do Equipamento</td>
							</tr>
							<tr>

								<td colSpan="1" class="font-weight-bold">Data</td>
								<td colSpan="1" class="font-weight-bold">Local</td>
								<td colSpan="1" class="font-weight-bold">Tipo do Local</td>
								<td colSpan="1" class="font-weight-bold">Justificativa</td>
							</tr>
						</thead>
						<tbody>
							{this.historyItems()}
						</tbody>
					</Table>
				</Container>
			</div >
		);
	}
}

EquipmentDetails.propTypes = {
	equipments: PropTypes.object.isRequired,
};

export default EquipmentDetails;