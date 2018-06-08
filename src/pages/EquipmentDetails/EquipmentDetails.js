import React from 'react';
import { Table } from 'reactstrap';
import { Container } from 'reactstrap'
import '../Pages.css';
import moment from 'moment';

export default class EquipmentDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			siorg: '',
			buyer: '',
			solicitor: '',
			description: '',
			origin: '',
			equipmentType: '',
			quantity: '',
			equipmentState: '',
			// supplier: {},
			locationHistory: [],
		};
		this.componentWillMount = this.componentWillMount.bind(this)
	}

	componentWillMount() {
		this.setState({ ...this.props.equipment })
	}

	historyItems() {
		let historyItems = []
		this.state.locationHistory.forEach((item, index) => {
			historyItems.push(
				<tr>
					<td>{moment(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
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
					{/* <Table bordered condensed hover>
						<thead>
							<tr>
								<td colSpan="4" class="font-weight-bold text-center">Informações do Fornecedor</td>
							</tr>
							<tr>
								<td colSpan="1" class="font-weight-bold">CNPJ</td>
								<td colSpan="1" class="font-weight-bold">Nome</td>
								<td colSpan="1" class="font-weight-bold">Telefone</td>
								<td colSpan="1" class="font-weight-bold">Endereço</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{this.state.supplier.cnpj}</td>
								<td>{this.state.supplier.name}</td>
								<td>{this.state.supplier.phone}</td>
								<td>{this.state.supplier.address.street + ", " + this.state.supplier.address.number + ", " + this.state.supplier.address.city + ", " + this.state.supplier.address.state + ", " + this.state.supplier.address.country}</td>
							</tr>
						</tbody>
					</Table> */}
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