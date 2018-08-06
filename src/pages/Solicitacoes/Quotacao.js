import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';
import {Form, Table} from 'reactstrap';
import '../../components/FormatedInput/FormatedInput';

import PropTypes from 'prop-types';


class Quotacao extends React.Component {


    getQuotation() {
        let min = 0, med = 0, max = 0;
        this.props.quotation.forEach((item) => {
            med += (item.price / this.props.quotation.length);
        });

        min = med * 0.8;
        max = med * 1.3;
        return {min: min, med: med, max: max}
    }

    calcOfQuotation() {
        let price = this.getQuotation();

        return (
            <tr>
                <td>R$ {price.min.toFixed(2)}</td>
                <td>R$ {price.med.toFixed(2)}</td>
                <td>R$ {price.max.toFixed(2)}</td>
            </tr>
        )
    }

    render() {
        return (
            <Form>
                <BootstrapTable
                    ref='table'
                    selectRow={{
                        mode: 'radio',
                        clickToSelect: true,
                    }}
                    options={{
                        btnGroup: this.props.CustomButtons,
                        noDataText: "Não há quotações!"
                    }}
                    data={this.props.quotation}
                >
                    <TableHeaderColumn dataField={'_id'}
                                       tdStyle={{width: '0%'}} thStyle={{width: '0%'}}
                                       dataSort={false} isKey>key</TableHeaderColumn>

                    <TableHeaderColumn dataField='reference'
                                       dataSort={true}>Referência</TableHeaderColumn>

                    <TableHeaderColumn dataField='price'
                                       dataSort={true}
                                       dataFormat={(item) => {
                                           return 'R$ ' + Number(item).toFixed(2) + ''
                                       }}
                    >Preço</TableHeaderColumn>
                </BootstrapTable>
               <br/>
                <Table bordered responsive row>
                    <thead>
                    <tr>
                        <td><strong>Preço mínimo</strong></td>
                        <td><strong>Preço médio</strong></td>
                        <td><strong>Preço máximo</strong></td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        (this.props.quotation && this.props.quotation.length) ?
                            (
                                this.calcOfQuotation()
                            ) :
                            (
                                <tr style={{textAlign: 'center'}}>
                                    <td colSpan={6}>Não há cotações para base de cálculo</td>
                                </tr>
                            )
                    }
                    </tbody>
                </Table>
            </Form>
        )
            ;
    }
}

Quotacao.PropTypes = {
    quotation: PropTypes.object.isRequired,
    CustomButtons: PropTypes.any,
};

export default Quotacao;