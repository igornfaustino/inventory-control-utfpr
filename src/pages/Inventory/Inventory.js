import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import {BootstrapTable, TableHeaderColumn,SearchField} from 'react-bootstrap-table';

import '../Pages.css';
// import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment'


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

	getEquipments = () => {
		axios.get('/equipments').then(response => {
			console.log(response)
			if (response.status === 200) {
				let equipments = response.data.equipments;
				let items = []
				equipments.forEach((item) => {
					items.push({
						siorg: item.siorg,
						solicitor: item.solicitor,
						description: item.description,
						origin: item.origin,
						type: item.equipmentType,
						qtd: item.quantity,
						state: item.equipmentState,
						location: item.locationHistory[0].location,
						edit:<Button color="primary" onClick={ ()=>{
							this.props.history.push({
								pathname: `editarequipamento/${item._id}`,
								id:item._id
								})
						} } type="submit">Editar</Button> ,

						view:<Button color="secondary" onClick={ ()=>{
							this.props.history.push({
								pathname: `detalhesequipamento/${item._id}`,
								id:item._id
								})
						} } type="submit">Visualizar</Button> ,
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
		}).catch(ex => {
			console.error(ex, ex.response);
		})
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
		let data
		if (this.state.loading === false) {
			data = <TableList header={['SIORG', 'Solicitante', 'Descrição', 'Origem', 'Tipo', 'Quantidade', 'Estado', 'Localização','', '', '']} items={this.state.items} />
		
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
				
				<Button style={{marginTop: '1%', marginLeft: '1%'}} color="success" onClick={() => { this.handleClick(null)}} type="submit">Cadastrar Item</Button>
				
				{data}
				

			</div >
		);
	}
}