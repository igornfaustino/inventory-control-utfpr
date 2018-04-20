import React from 'react';
import {
	Table
} from 'reactstrap';

export default class TableList extends React.Component {
	constructor(props) {
		super(props);
		
		console.log(props.items)
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
					if(key != 'change' && key != 'check' && key != 'id')
						return <td key={index}>{item[key]}</td>;
					if(item[key] == 'check')
						return <td key={index}><input type="checkbox" onChange = {(e) => {
							item.change(item.id)}} /></td>
				});
				let line = (<tr key={index}>
					{lineItens}
				</tr>);
				return line;
			}
		});
		
		return (
			<div className="">
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