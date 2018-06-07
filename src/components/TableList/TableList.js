import React from 'react';
import {
	Table,
	Input,
	Container,
	FormGroup,
	Col
} from 'reactstrap';
import { Icon } from 'react-icons-kit'
import { minus, chevronUp, chevronDown } from 'react-icons-kit/fa/'

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
			desc: false,
			validHeaders: [],
		};
	}

	componentDidMount() {
		let validHeaders = this.state.headerItems.map((header, index) => {
			if (header !== "" && header !== " ") {
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
		const HeaderItems = this.state.headerItems.map((item, index) => {
			let onClick = () => {
				if (this.state.filter !== index) {
					this.setState({
						filter: index,
						desc: false
					})
				} else if (!this.state.desc) {
					this.setState({
						desc: true
					})
				} else {
					this.setState({
						filter: null,
						desc: false
					})
				}
			}

			if (this.state.filter == index && !this.state.desc) {
				return <th key={index} onClick={onClick
				} >{item}<span style={{
					margin: 10,
					padding: 'auto',
					fontWeight: 'normal'
				}}><Icon icon={chevronDown} /></span></th>
			} else if (this.state.filter == index && this.state.desc) {
				return <th key={index} onClick={onClick
				} >{item}<span style={{
					margin: 10,
					padding: 'auto',
					fontWeight: 'normal'
				}}><Icon icon={chevronUp} /></span></th>
			} else if (item != '' && item != ' ') {
				return <th key={index} onClick={onClick
				} >{item}<span style={{
					margin: 10,
					padding: 'auto',
					fontWeight: 'normal'
				}}><Icon icon={minus} /></span></th>
			} else {
				return <th key={index} onClick={onClick
				} >{item}</th>
			}
		});

		// Show table itens
		let TableItems = this.state.tableItems.filter((item) => {
			// Filter table
			let valid = false;
			Object.keys(item).map((key, index) => {
				if (key.charAt(0) !== '_')
					valid = valid || item[key].toString().toLowerCase().includes(this.state.filterStr.toLowerCase())
				return key
			});
			return valid;
		});

		if (this.state.filter != null) {
			console.log(TableItems.sort((x, y) => {
				delete x._id
				delete y._id
				let keyX = Object.keys(x)
				let keyY = Object.keys(y)

				if (this.state.desc) {
					return x[keyX[this.state.filter]] < y[keyY[this.state.filter]]
				}
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
				<Container fluid>
					<FormGroup row style={{ marginBottom: '0px' }}>
						<Col md="8"></Col>
						<Col md="4">
							<Input style={{
								marginTop: '5px',
							}} type="text" placeholder="Busca..." value={this.state.filterStr} onChange={(e) => this.setState({ filterStr: e.target.value })} />
						</Col>
					</FormGroup>
					<Table hover style={{
						marginTop: '5px',
					}}>
						<thead>
							<tr>
								{HeaderItems}
							</tr>
						</thead>
						<tbody>
							{TableItems}
						</tbody>
					</Table>
				</Container>
			</div>
		);
	}
}