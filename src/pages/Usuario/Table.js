import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';
import {PropTypes} from 'prop-types';

class Table extends React.Component {

    render() {
        return (
            <BootstrapTable
                ref='table'
                {...this.props.options}
                data={this.props.data}
            >
                <TableHeaderColumn
                    tdStyle={{width: '0%'}} thStyle={{width: '0%'}}
                    dataField='_id' dataSort={false} isKey>
                    key
                </TableHeaderColumn>

                <TableHeaderColumn dataField='name' dataSort={false}>
                    Nome
                </TableHeaderColumn>

                <TableHeaderColumn dataField='email' dataSort={false}>
                    Email
                </TableHeaderColumn>

                <TableHeaderColumn dataField='admin' dataSort={false}>
                    isAdmin
                </TableHeaderColumn>

            </BootstrapTable>
        )
    }
}

Table.PropTypes = {
    data: PropTypes.array.object,
    options: PropTypes.object,
};

export default Table;