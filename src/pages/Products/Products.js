import React from 'react';
import { Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import '../Pages.css';
import './Products.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment';

import { sleep } from '../../utils/sleep'
import { isLoggedIn } from '../../utils/userLogin'


export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			loading: true,
			items: [],

			// Validate Price
			validPrice: {
				min: 0.6,
				max: 1.3,
				average: 0
			}
		};
	}

	componentWillMount() {
		this.getRequistions();
	}

	getRequistions = async () => {
		try {
			const response = await axios.get('/requisitions')
			if (response.status === 200) {
				let requisitions = response.data.requisitions;

				let items = [];
				// console.log(requisitions);

				requisitions.forEach((item) => {
					let price = this.state.validPrice;
					if (item.quotation)
						price.average = item.quotation.map((x) => x.price).reduce((a, b) => a + b, 0) / item.quotation.length;
					// console.log()
					price.average = price.average ? price.average : 0;
					console.log(item)
					items.push({
						_id: item._id,
						siorg: item.siorg,
						description: item.description,
						qtd: item.qtd,
						// average: "R$ " + price.average.toFixed(2).toString(),
						date: moment(item.history[item.history.length - 1].date).locale('pt-br').format('DD/MM/YYYY'),
						status: item.status,
						input: (<Button color="success" onClick={() => {
							this.handleClick(item)
						}} type="submit">Solicitar</Button>),
					})
				});

				this.setState({
					items,
					loading: false
				});
			}
		} catch (ex) {
			console.error(ex, ex.response);
			await sleep(2000)
			this.getRequistions();
		}
	};

	handleClick(e) {
		this.props.history.push({
			pathname: '/novasolicitacoes',
			state: { product: e }
		})
	}

	render() {
		if (!isLoggedIn()) {
            this.props.history.push('/');
        }

		let data = (!this.state.loading) ?
			<TableList header={['SIORG', 'Descrição', 'Qtd', 'Data', 'Status', '']}
				items={this.state.items} /> :
			<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
				<ClipLoader
					color={'#123abc'}
					loading={this.state.loading}
				/>
			</div>;

		return (
			<div>
				<Header />
				<SubHeader
					title="Histórico de pedidos"
				/>
				<div>
					{data}

				</div>
			</div>
		);
	}
}