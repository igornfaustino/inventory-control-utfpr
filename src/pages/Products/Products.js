import React from 'react';
//import { Table } from 'reactstrap';

import '../Pages.css';
import './Products.css';

import Line from '../../components/Line/Line';
import List from '../../components/List/List';
import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

export default class Products extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			term: 'teste',
			items: [
				{
					id: 'id123',
					siorg: "1234",
					description: "description",
					date: "10/10/10" ,
					check: 'check',
					change: this.test
				}
			]
		};
	}

	test = (e) => {
		console.log(e);
	}

	onChange = (event) => {
		this.setState({term: event.target.value});
	}

	render() {
		return (
			<div>
				<SubHeader title="Histórico de pedidos"></SubHeader>
				<TableList header={['SIORG', 'Descrição', 'Data', ' ']} items={this.state.items} />	
			</div >
		);
	}
}