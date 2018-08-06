import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';

import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {ALMOXARIFADO_VIEW} from "./index";

class Table extends React.Component {
    filter() {
        return this.props.data.filter(item => {
            let ok = true;

            this.props.select.forEach(x => {
                ok = item._id === x._id ? false : ok;
            });

            return ok
        });

    }

    render() {
        return (
            <BootstrapTable
                ref='table'
                {...this.props.options}
                data={this.props.select ? this.filter() : this.props.data}
            >
                <TableHeaderColumn dataField='_id'
                                   tdStyle={{width: '0%'}} thStyle={{width: '0%'}}
                                   dataSort={false}
                                   isKey>
                    key
                </TableHeaderColumn>
                <TableHeaderColumn dataField={'description'} dataSort>
                    Descrição
                </TableHeaderColumn>

                <TableHeaderColumn dataField={'equipmentType'} dataSort>
                    Tipo
                </TableHeaderColumn>

                <TableHeaderColumn dataField={'solicitor'} dataSort dataFormat={item => item.name}>
                    Solicitado por
                </TableHeaderColumn>

                <TableHeaderColumn dataField={'locationHistory'} dataSort
                                   dataFormat={(x) => x[0] ? x[0].location : 'Em Estoque'}>
                    Localização atual
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