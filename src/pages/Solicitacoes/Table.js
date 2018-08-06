import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';
import {PropTypes} from 'prop-types';

class Table extends React.Component {

    getQuotation(quotation) {
        let min = 0, med = 0, max = 0;
        quotation.forEach((item) => {
            med += (item.price / quotation.length);
        });

        min = med * 0.8;
        max = med * 1.3;
        return {min: min, med: med, max: max}
    }

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
                <TableHeaderColumn dataField={'_id'}
                                   tdStyle={{width: '0%'}} thStyle={{width: '0%'}}
                                   dataSort={false} isKey>key</TableHeaderColumn>

                <TableHeaderColumn dataField='siorg'
                                   dataSort={true}>SIORG</TableHeaderColumn>

                <TableHeaderColumn dataField='description'
                                   dataSort={true}>Descrição</TableHeaderColumn>

                <TableHeaderColumn dataField='status'
                                   dataSort={true}>Status</TableHeaderColumn>

                <TableHeaderColumn dataField='quotation'
                                   dataFormat={(item) => {
                                       let price = this.getQuotation(item);
                                       let er = 0;
                                       item.forEach(x => {
                                           er += price.max > x.price && x.price > price.min ? 0 : 1;
                                       });
                                       if (!er && item.length >= 3) {
                                           return <div style={{color: 'green'}}>{item.length}</div>
                                       }
                                       return <div style={{color: 'red'}}>{er}/{item.length}</div>
                                   }}
                                   dataSort={true}>Quotações</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

Table.PropTypes = {
    data: PropTypes.array.object,
    select: PropTypes.array.object, /* Lista de objetos já selecionados */
    options: PropTypes.object,
};

export default Table;