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

	getRequistions = () => {
		axios.get('/requisitions').then(response => {
			if (response.status === 200) {
				let requisitions = response.data.requisitions;
				let items = [];
				requisitions.forEach((item) => {
					items.push({
						_id: item._id,
						// siorg: item.siorg,
						_status: item.status,
						description: item.description,
						date: moment(item.date).locale('pt-br').format('DD/MM/YYYY'),
						input: (<Button color="success" onClick={() => {
							this.handleClick(item)
						}} type="submit">Solicitar</Button>)
					})
				});
				
				// console.log(requisitions);
				items = items.filter(item => {
					return item._status === 'aprovado'
				});
				
				this.setState({
					items,
					loading: false
				})
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	};

	//Comentar depois: controla adição dos itens - habilita botao quando um item está marcado
	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes',
			state: { product: e }
		})
	}

	onChange = (event) => {
		this.setState({ term: event.target.value });
	};

	render() {
		let data;
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
				<Header></Header>
				<SubHeader title="Solicitações aprovadas"></SubHeader>

				{data}

			</div >
		);
	}
}