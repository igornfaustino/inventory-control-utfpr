import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import '../Pages.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment'


export default class ApprovedRequests extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			term: 'teste',
			isDisabled: true,
			checkedCount: 0,
			items: []
		};
	}

	componentWillMount() {
		this.getRequistions();
	}

	// TODO: change filter
	getRequistions = () => {
		axios.get('/requisitions').then(response => {
			if (response.status === 200) {
				let requisitions = response.data.requisitions;
				let items = []
				requisitions.forEach((item) => {
					items.push({
						_id: item._id,
						siorg: item.siorg,
						description: item.description,
						qtd: item.qtd,
						date: moment(item.date).locale('pt-br').format('DD/MM/YYYY'),
						stauts: item.status,

						edit:<Button color="primary" onClick={ ()=>{
							this.props.history.push({
								pathname: `/editarsolicitacoes/${item._id}`,
								id:item._id
								})
						} } type="submit">Editar</Button> 
						
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
	}

	render() {
		let data
		if (this.state.loading === false) {
			data = <TableList header={['SIORG','Descrição', 'Qtd', 'Data', 'Status', '']} items={this.state.items} />
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
				<SubHeader title="Solicitações"></SubHeader>

				{data}

			</div >
		);
	}
}