import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import {BootstrapTable, TableHeaderColumn,SearchField} from 'react-bootstrap-table';

import '../Pages.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

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
					items.push({
						_id: item._id,
						siorg: item.siorg,
						solicitor: item.solicitor,
						description: item.description,
						origin: item.origin,
						equipmentType: item.equipmentType,
						quantity: item.quantity,
						equipmentState: item.equipmentState,
						locationHistory: item.locationHistory,
						input: (<Button color="primary" onClick={() => {
							this.handleClick(item)
						}} type="submit">Editar</Button>)
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

	//ARRUMAR ESSE MÉTODO, POIS ELE TEM QUE IR PRA TELA DE EDIÇÃO DO ITEM
	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes',
			state: { product: e }
		})
	}

	onChange = (event) => {
		this.setState({ term: event.target.value });
	}

	CustonModalSearch= props=>{
		return (
		  <SearchField
			defaultValue={ props.defaultSearch }
			placeholder={ "Buscar" }
			style={{marginTop: "5px"}}/>
		);
	  }

	render() {
		let data
		// <BootstrapTable 
        //   ref='table' 
        //   data={ this.state.requisitionItens } 
        //   options={ {deleteBtn: this.renderDeleteAction, noDataText:"Não há solicitação adicionada" }} 
        //   selectRow={ {mode: 'checkbox', clickToSelect: true, onSelect: this.onRowSelect,bgColor: '#e4ecf5' }}
        //   deleteRow>
        //       <TableHeaderColumn dataField='description' dataSort={ true } isKey>Descrição</TableHeaderColumn>
        //       <TableHeaderColumn dataField='qtd'
        //         tdStyle={{width:'15%'}} 
        //         thStyle={{width:'15%'}} 
        //         dataSort={ true }>Quantidade</TableHeaderColumn>
        //       <TableHeaderColumn dataField='price'
        //         dataFormat={this.priceFormatter}
        //         tdStyle={{width:'15%'}} 
        //         thStyle={{width:'15%'}} 
        //         dataSort={ true }>Preço</TableHeaderColumn>
        //         <TableHeaderColumn tdStyle={{width:'14%'}} thStyle={{width:'14%'}} dataField='status' dataSort={ true }>Status</TableHeaderColumn>
        //   </BootstrapTable>
		//if (this.state.loading === false) {
			data =(
				<BootstrapTable
					ref='table'
					search
            		//pagination
					data={this.state.items}
					options={{searchField:this.CustonModalSearch, noDataText:"Não há solicitação adicionada" }}
					>
					<TableHeaderColumn dataField='siorg' dataSort={ true }
					tdStyle={{width:'7%'}} 
					thStyle={{width:'7%'}}
					isKey>SIORG</TableHeaderColumn>
					<TableHeaderColumn dataField='solicitor' dataSort={ true }>Solicitante</TableHeaderColumn>
					<TableHeaderColumn dataField='description' dataSort={ true }>Descrição</TableHeaderColumn>
					<TableHeaderColumn dataField='origin' dataSort={ true }>Origem</TableHeaderColumn>
					<TableHeaderColumn dataField='equipmentType' dataSort={ true }>Tipo</TableHeaderColumn>
					<TableHeaderColumn
						tdStyle={{width:'7%'}} 
						thStyle={{width:'7%'}}
						dataField='quantity' dataSort={ true }>QTD.
					</TableHeaderColumn>
					<TableHeaderColumn dataField='equipmentState' dataSort={ true }>Estado</TableHeaderColumn>
					<TableHeaderColumn dataField='locationHistory' dataSort={ true }>Localização</TableHeaderColumn>					
				</BootstrapTable>
			) 
			
			// <TableList header={['SIORG', 'Solicitante', 'Descrição', 'Origem', 'Tipo', 'Quantidade', 'Estado', 'Localização',' ']} items={this.state.items} />
		//} else {
		//	data = (<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
		//		<ClipLoader
		//			color={'#123abc'}
			//		loading={this.state.loading}
		// 		/>
		// 	</div>)
		// }
		return (
			<div>
				<Header></Header>
				<SubHeader title="Almoxarifado"></SubHeader>

				<div style={{position: "relative", marginLeft: "15px", marginRight: "15px"}}>
					{data}
				</div>
				
			</div >
		);
	}
}