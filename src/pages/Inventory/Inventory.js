import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import '../Pages.css';
import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';
import axios from 'axios';
// import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import { sleep } from '../../utils/sleep'
import { isAdmin } from '../../utils/userLogin';


export default class Inventory extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			loading: true,
			term: 'teste',
			isDisabled: true,
			checkedCount: 0,
			items: []
		};
	}

	componentWillMount() {
		this.getEquipments();
	}

	getEquipments = async () => {
		try {
			let response = await axios.get('/equipments')
			if (response.status === 200) {
				let equipments = response.data.equipments;
				let items = []
				equipments.forEach((item) => {
					items.push({
						patrimonyNumber: item.patrimonyNumber ? item.patrimonyNumber : '-',
						siorg: item.siorg,
						description: item.description,
						origin: item.origin,
						type: item.equipmentType,
						state: item.equipmentState,
						location: item.locationHistory[0] ? item.locationHistory[0].location : 'Em Estoque',
						edit: <Button color="primary" onClick={() => {
							this.props.history.push({
								pathname: `editarequipamento/${item._id}`,
								id: item._id
							})
						}} type="submit">Editar</Button>,

						view: <Button color="secondary" onClick={() => {
							this.props.history.push({
								pathname: `detalhesequipamento/${item._id}`,
								id: item._id
							})
						}} type="submit">Visualizar</Button>,
					})
				})

				console.log(equipments);
				// items = items.filter(item => {
				// 	return item._status === 'aprovado'
				// });

				this.setState({
					items,
					loading: false
				})
			}
		}
		catch (ex) {
			console.error(ex, ex.response);
			await sleep(2000)
			this.getEquipments();
		}
	}

	handleClick(e) {
		this.props.history.push({
			pathname: '/novoproduto',
			state: { product: e }
		})
	}

	onChange = (event) => {
		this.setState({ term: event.target.value });
	}

	render() {
		if (!isAdmin()) {
			this.props.history.push('/home');
		}

		let data
		if (this.state.loading === false) {
			data = <TableList header={['Nº de Patrimônio', 'SIORG', 'Descrição', 'Origem', 'Tipo', 'Estado', 'Localização', '', '', '']} items={this.state.items} />

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
				<SubHeader title="Almoxarifado"></SubHeader>

				<Button style={{ marginTop: '1%', marginLeft: '1%' }} color="success" onClick={() => { this.handleClick(null) }} type="submit">Cadastrar Item</Button>

				{data}


			</div >
		);
	}
}