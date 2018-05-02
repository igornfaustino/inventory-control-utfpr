import React from 'react';
import { Table, Container, Button } from 'reactstrap';

import '../Pages.css';

import List from '../../components/List/List';
import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

export default class ApprovedRequests extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			term: 'teste',
			isDisabled: true,
			checkedCount: 0,
			items: [
				{
					id: 'id123',
					siorg: "1234",
					description: "description",
					date: "10/10/10" ,
					checked: false,
					change: this.handleClick
				},
				{
					id: 'id124',
					siorg: "1234",
					description: "description",
					date: "10/10/10" ,
					checked: false,
					change: this.handleClick
				},
				{
					id: 'id125',
					siorg: "1234",
					description: "description",
					date: "10/10/10" ,
					checked: false,
					change: this.handleClick
				}
			]
		};
	}

	componentDidUpdate() {

	}

	//Comentar depois: controla adição dos itens - habilita botao quando um item está marcado
	handleClick(e){
		let updatedItems = this.state.items;
		let count = this.state.checkedCount
		updatedItems.forEach((value, index, Array) => {
			if(value.id === e){
				value.checked = !value.checked
				if(value.checked){
					count += 1;
				} else if (count > 0) {
					count -= 1;
				}
			}
		});
		let isDisabled = true;
		if (count > 0) {
			isDisabled = false;
		}
		this.setState({
			items: updatedItems,
			checkedCount: count,
			isDisabled: isDisabled
		});
	}

	onChange = (event) => {
		this.setState({term: event.target.value});
	}

	render() {
		return (
			<div>
				<SubHeader title="Solicitações já aprovadas"></SubHeader>
				
				<header align='left' className="font-header font header">
					<Button outline color="success" disabled>&#x2713;</Button> 
					&emsp;Selecione os produtos que deseja solicitar
				</header>
	
				<TableList header={['SIORG', 'Descrição', 'Aprovado em', ' ']} items={this.state.items} />	

				<Container className="float-right">
					<Button color="success" disabled={this.state.isDisabled} className="float-right" type="submit">Solicitar</Button> 
				</Container>

			</div >
		);
	}
}