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
		let historyItems = [];
		this.state.locationHistory.forEach((item, index) => {
			historyItems.push(
				<tr>
					<td>{moment(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
					<td>{item.location}</td>
					<td>{item.locationType}</td>
					<td>{item.justification}</td>
				</tr>)
		});
		return historyItems
	}

	render() {
		return (
			<div>
				<Container>
					<Table bordered condensed="true" hover>
						<tbody>
							<tr>
								<td className="font-weight-bold">SIORG:</td>
								<td>{this.state.siorg ? this.state.siorg : "SIORG não definido."}</td>
								<td className="font-weight-bold">Comprador:</td>
								<td>{this.state.buyer ? this.state.buyer : "Comprador não informado."}</td>
							</tr>
							<tr>
								<td className="font-weight-bold">Solicitante:</td>
								<td>{this.state.solicitor ? this.state.solicitor : "Solicitante não definido."}</td>
								<td className="font-weight-bold">Origem:</td>
								<td>{this.state.origin}</td>
							</tr>
							<tr>
								<td className="font-weight-bold">Tipo do Equipamento:</td>
								<td>{this.state.equipmentType}</td>
								<td className="font-weight-bold">Estado do Equipamento:</td>
								<td>{this.state.equipmentState}</td>
							</tr>
							<tr>
								<td className="font-weight-bold">Descrição:</td>
								<td colSpan="3">
									{this.state.description}
								</td>
							</tr>
						</tbody>
					</Table>
					{/* <Table bordered condensed hover>
						<thead>
							<tr>
								<td colSpan="4" className="font-weight-bold text-center">Informações do Fornecedor</td>
							</tr>
							<tr>
								<td colSpan="1" className="font-weight-bold">CNPJ</td>
								<td colSpan="1" className="font-weight-bold">Nome</td>
								<td colSpan="1" className="font-weight-bold">Telefone</td>
								<td colSpan="1" className="font-weight-bold">Endereço</td>
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
					<Table bordered condensed="true" hover>
						<thead>
							<tr>
								<td colSpan="4" className="font-weight-bold text-center">Histórico do Equipamento</td>
							</tr>
							<tr>
								<td className="font-weight-bold">Data</td>
								<td className="font-weight-bold">Local</td>
								<td className="font-weight-bold">Tipo do Local</td>
								<td className="font-weight-bold">Justificativa</td>
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