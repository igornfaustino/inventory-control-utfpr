import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';
import {PropTypes} from 'prop-types';
import moment from "moment/moment";

class Table extends React.Component {

    render() {
        return (
            <BootstrapTable
                ref='table'
                {...this.props.options}
                data={this.props.data}
            >
                <TableHeaderColumn dataField={'_id'}
                                   tdStyle={{width: '0%'}} thStyle={{width: '0%'}}
                                   dataSort={false} isKey>key</TableHeaderColumn>


                <TableHeaderColumn dataField='requester' dataSort={false} dataFormat={(user) => user.name}>
                    Requisitante
                </TableHeaderColumn>

                <TableHeaderColumn dataField='requisitionDate' dataSort={false}
                                   dataFormat={(item) => moment(item).format("DD/MM/YYYY")}>
                    Data
                </TableHeaderColumn>

                <TableHeaderColumn dataField='requisitionItems' dataSort={false}
                                   dataFormat={(item) =>
                                       item.map((x) => x.item? x.item.qtd: 0).reduce((a, b) => a + b, 0)
                                   }>
                    Total de Itens
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