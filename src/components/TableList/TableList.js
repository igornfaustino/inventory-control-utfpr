import React from 'react';
import {
	Table
} from 'reactstrap';

import '../../pages/Pages.css';
import './TableList.css';


export default class TableList extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			headerItems: props.header,
			tableItems: [].concat(props.items)
		};
	}
	
	
	render() {
		const HeaderItems = this.state.headerItems.map((item, index) => <th key={index}>{item}</th>);
		const TableItems = this.state.tableItems.map((item, index) => {
			if (item !== null && item !== undefined){
				let lineItens = Object.keys(item).map((key, index) => {
					if (key.charAt(0) !== '_')
						return <td key={index}>{item[key]}</td>;
					return null
				});
				let line = (<tr key={index}>
					{lineItens}
				</tr>);
				return line;
			}
			return null
		});
		
		return (
			<div>
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