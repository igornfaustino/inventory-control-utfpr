import React from 'react';
import {
	Table,
	Input,
	Container
} from 'reactstrap';

import '../../pages/Pages.css';
import './TableList.css';


export default class TableList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			headerItems: props.header,
			tableItems: [].concat(props.items),
			filterStr: '',
			filter: null,
			validHeaders: [],
		};
	}

	componentDidMount() {
		let validHeaders = this.state.headerItems.map((header, index) => {
			if (header != "" && header != " ") {
				return index
			}
			return -1
		})
		console.log(this.state.headerItems)
		console.log(validHeaders)
		this.setState({
			validHeaders: (validHeaders.length - 1)
		})
	}

	render() {
		const HeaderItems = this.state.headerItems.map((item, index) => <th key={index} onClick={() => {
			if (this.state.filter != index) {
				this.setState({
					filter: index
				})
			} else {
				this.setState({
					filter: null
				})
			}
		}} >{item}</th>);

		// Show table itens
		let TableItems = this.state.tableItems.filter((item) => {
			// Filter table
			let valid = false;
			let filter = Object.keys(item).map((key, index) => {
				if (key.charAt(0) !== '_')
					valid = valid || item[key].toString().toLowerCase().includes(this.state.filterStr.toLowerCase())
			});
			return valid;
		});

		if (this.state.filter != null) {
			console.log(TableItems.sort((x, y) => {
				delete x._id
				delete y._id
				let keyX = Object.keys(x)
				let keyY = Object.keys(y)
				
				console.log(x[keyX[this.state.filter]])
				return x[keyX[this.state.filter]] > y[keyY[this.state.filter]] 
			}))
		}

		TableItems = TableItems.map((item, index) => {
			// check if itens exists
			if (item !== null && item !== undefined) {
				// create a line itens.. vector of td
				let lineItens = Object.keys(item).map((key, index) => {

					// itens starts with '_' are meta itens.. then they are ignored on table's render...
					if (key.charAt(0) !== '_')
						return <td key={index}>{item[key]}</td>;
					return null
				});

				// create line with itens
				let line = (<tr key={index}>
					{lineItens}
				</tr>);

				// return line
				return line;
			}
			return null
		});

		console.log(this.state.filter)
		console.log(this.state.validHeaders)
		return (
			<div>
				<Input type="text" placeholder="Busca..." value={this.state.filterStr} onChange={(e) => this.setState({ filterStr: e.target.value })} />
				<Table responsive>
					<thead>
						<tr>
							{HeaderItems}
						</tr>
					</thead>
					<tbody>
						{TableItems}
					</tbody>
				</Table>
			</div>
		);
	}
}