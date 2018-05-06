import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import '../Pages.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment'


export default class PurchasesHistory extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			loading: true,
			term: 'teste',
			isDisabled: true,
			checkedCount: 0,
			items: [
				{
					id: 'id123',
					siorg: "1234",
                    description: "description",
                    price: "5.78",
					date: "10/10/10",
					checked: false,
					change: this.handleClick
				},
				{
					id: 'id124',
					siorg: "1234",
                    description: "description",
                    price: "5.78",
					date: "10/10/10",
					checked: false,
					change: this.handleClick
				},
				{
					id: 'id125',
					siorg: "1234",
                    description: "description",
                    price: "5.78",
					date: "10/10/10",
					input: 'btn',
					change: this.handleClick
				}
			]
		};
	}

	componentWillMount() {
		this.getPurchases();
	}

	getPurchases = () => {
		axios.get('/purchase').then(response => {
			if (response.status === 200) {
				let purchases = response.data.purchases;
				let items = []
				purchases.forEach((item) => {
					items.push({
						_id: item._id,
						// siorg: item.siorg,
                        description: item.description,
                        price: 'R$ '+item.price,
						date: moment(item.date).locale('pt-br').format('DD/MM/YYYY'),
						input: (<Button color="success" onClick={() => {
							this.handleClick(item)
						}} type="submit">Editar</Button>)
					})
				});
				
				this.setState({
					items,
					loading: false
				});
			}
		}).catch(ex => {
			console.error(ex, ex.response);
		})
	}

	//Aqui tem que mudar para a página de edição de compras!!!!
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
			data = <TableList header={['Descrição', 'Custo', 'Data', ' ']} items={this.state.items} />
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
				<SubHeader title="Histórico de compras"></SubHeader>
				<header align='left' className="font-header font header">
					<Button outline color="success" disabled>&#x2713;</Button>
					&emsp;Selecione a compra que deseja editar
				</header>

				{data}

			</div >
		);
	}
}