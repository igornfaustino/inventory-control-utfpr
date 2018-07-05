import React from 'react';
import { Table } from 'reactstrap';
import { Container } from 'reactstrap'
import '../Pages.css';
import moment from 'moment';

import { isAdmin } from '../../utils/userLogin';

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
			components: [],
		};
		this.componentWillMount = this.componentWillMount.bind(this)
	}

	componentWillMount() {
		this.setState({ ...this.props.equipment })
	}

	prepareComponents() {
		let components = [];
		this.state.components.forEach((item, index) => {
			components.push(
				<tr key={index}>
					<td>{index+1}</td>
					<td>{item.siorg}</td>
					<td>{item.description}</td>
					<td>{item.equipmentState}</td>
				</tr>)
		});
		return components
	}

	historyItems() {
		let historyItems = [];
		this.state.locationHistory.forEach((item, index) => {
			historyItems.push(
				<tr key={index}>
					<td>{moment(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
					<td>{item.location}</td>
					<td>{item.locationType}</td>
					<td>{item.justification}</td>
				</tr>)
		});
		return historyItems
	}

	render() {
		if (!isAdmin()) {
			this.props.history.push('/home');
		}

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
					<Table bordered condensed hover>
						<thead>
							<tr>
								<td colSpan="4" className="font-weight-bold text-center">Componentes do Equipamento</td>
							</tr>
							<tr>
								<td className="font-weight-bold">Item</td>
								<td className="font-weight-bold">SIORG</td>
								<td className="font-weight-bold">Descrição</td>
								<td className="font-weight-bold">Estado</td>
							</tr>
						</thead>
						<tbody>
							{this.prepareComponents()}
						</tbody>
					</Table>
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