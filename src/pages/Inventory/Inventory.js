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
			loading: false,
			term: 'teste',
			isDisabled: true,
			checkedCount: 0,
            items: [{
				_id: 89,
				siorg: 1111,
				solicitor: "item.solicitor",
				description: "item.description",
				origin: "item.origin",
				equipmentType: "item.equipmentType",
				quantity: 2,
				equipmentState: "item.equipmentState",
				locationHistory: "item.locationHistory",
				input: (<Button color="primary" onClick={() => {
					//this.handleClick(item)
				}} type="submit">Editar</Button>)		
			}]
		};
	}

	componentWillMount() {
	//	this.getEquipments();
	}

	getEquipments = () => {
		axios.get('/equipments').then(response => {
			if (response.status === 200) {
				let equipments = response.data.equipments;
				let items = []
				equipments.forEach((item) => {
					item.push({
						...item,
						edit:<Button color="primary" onClick={ ()=>{
							this.props.history.push({
								pathname: `/editarsolicitacoes/${item._id}`, //MUDAR PARA EDITAR EQUIPAMENTOS
								id:item._id
								})
						} } type="submit">Editar</Button> 
					})
				})
				
				console.log(equipments);
				// items = items.filter(item => {
				// 	return item._status === 'aprovado'
				// });
				
				this.setState({
					items,
					// loading: false
				})
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	}

	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes', //MUDAR PARA CADASTRAR ITENS
			state: { product: e }
		})
	}

	onChange = (event) => {
		this.setState({ term: event.target.value });
	}

	render() {
		let data
		if (this.state.loading === false) {
			data = <TableList header={['SIORG', 'Solicitante', 'Descrição', 'Origem', 'Tipo', 'Quantidade', 'Estado', 'Localização',' ']} items={this.state.items} />
		
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