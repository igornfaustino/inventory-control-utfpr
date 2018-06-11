import React from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Form} from 'react-bootstrap';
import {Button, Container, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import moment from 'moment'
import {loadAllRequisition} from './connectAPI';

import {BootstrapTable, SearchField, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import TextInput from '../common/TextInput';


export class PurchaseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            loading: true,
            data:
                {
                    requisitions: []
                },

            // Validate Price
            validPrice: {
                min: 0.6,
                max: 1.3,
                average: 0
            },

            requisitionItens: []
        };
        this.toggleOut = this.toggleOut.bind(this);
        this.toggleIn = this.toggleIn.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
        this.AddRequest = this.AddRequest.bind(this)

    }

    componentWillMount() {
        let data = this.props.purchase.requisitionItems;
        let newdata = [];
        data.forEach((requisition, index) => {
            let price = requisition.quotation.reduce((x, y) => x + y.price, 0) / requisition.quotation.length;
            newdata.push({
                ...data[index],
                price: price,
                selected: false
            })
        });
        this.setState(
            {
                requisitionItens: newdata
            }
        );

        try {
            loadAllRequisition().then((value) => {
                let data = this.state.data;
                data.requisitions = value.requisition;
                data.requisitions.forEach((requisition, index) => {
                    let price = requisition.quotation.reduce((x, y) => x + y.price, 0) / requisition.quotation.length;
                    data.requisitions[index] = {...data.requisitions[index], price: price, selected: false}
                });
                this.setState(
                    {
                        data: data,
                        loading: value.loading
                    }
                )
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    AddRequest() {
        this.toggleOut();
        let data = this.state.data;
        let rows = this.state.requisitionItens;

        data.requisitions.forEach((value, index) => {
            if (value.selected) {
                if (rows.filter(item => item.description === value.description).length === 0) {
                    rows.push(value);
                    data.requisitions[index].selected = false;
                }
            }
        });
        this.props.onChangeRequest(rows);

        this.setState({
            data: data,
            requisitionItens: rows
        })
    }


    renderDeleteAction = () => {
        return (
            <Button color="danger" size='sm' onClick={this.removeRequest}>
                Remover Selecionados
            </Button>
        );
    };

    removeRequest() {
        let rows = this.state.requisitionItens;
        let n = [];
        for(let i=0;i<rows.length;i++){
            if (!rows[i].selected) {
                n.push(rows[i])
            }
        }
        console.log(n);
        this.setState({
            requisitionItens: n
        });

        this.props.onChangeRequest(n)
    }

    toggleIn() {
        let date = this.state.data.requisitions;
        date = date.map((item) => {
            let N_item = item;
            N_item.selected = false;
            return N_item
        });
        this.setState({
            data: {...this.state.data, requisitions: date},
            modal: true
        })
    }

    toggleOut() {
        this.setState({
            modal: false
        })
    }

    ButtonAddRequest = () => {
        if (!this.props.disabled) {
            return (
                <Button
                    color="success"
                    size="sm"
                    onClick={this.toggleIn}
                    className="float-right"
                >
                    Adicionar Solicitações
                </Button>
            )
        }
        else {
            return (
                ""
            )
        }
    };
    isDisabled = () => {
        return (
            this.props.purchase.requester.length > 0 &&
            this.props.purchase.management.length > 0 &&
            this.props.purchase.UGR.length > 0 &&
            this.props.purchase.sector.length > 0 &&
            this.props.purchase.requester.length > 0
        ) ? false : true
    };
    CustonModalSearch = props => {
        return (
            <SearchField
                defaultValue={props.defaultSearch}
                placeholder={"Buscar"}/>
        );
    };
    ButtonFinishRequest = () => {
        if (!this.props.disabled) {
            return (
                <Container className="float-right" style={{margin: '10px'}}>
                    <Button
                        color="secondary"
                        className="float-right"
                        size="sm"
                        disabled={this.isDisabled()}
                        onClick={this.props.onSave}
                        value={this.props.edit ? 'Salvar Alterações' : 'Salvar'}
                    >
                        Salvar Alterações
                    </Button>
                </Container>
            )
        }
        else {
            return ("")
        }
    };
    onRowSelect = (item, isSelect, e) => {
        let requisitionItens = this.state.requisitionItens;
        let index = requisitionItens.indexOf(item);
        requisitionItens[index].selected = isSelect;

        this.setState({
            requisitionItems: requisitionItens
        });
        console.log(this.state.requisitionItens)
    };

    onRowModalSelect = (item, isSelect, e) => {
        let data = this.state.data;
        let index = data.requisitions.indexOf(item);
        data.requisitions[index] = {...data.requisitions[index], selected: isSelect};
        this.setState({
            requisitionItems: data
        })
    };

    CustomButtonGroupModal = props => {
        return (
            <ButtonGroup>
                <Button type='button'
                        size="sm"
                        className={`btn btn-success`}
                        onClick={() => {
                            this.AddRequest()
                        }}>
                    Adicionar Selecionados
                </Button>
            </ButtonGroup>
        );
    };


    priceFormatter(cell, row) {
        return `R$ ${cell.toFixed(2)}`;
    }

    render() {
        return (
            <Container>
                <Form
                    style={{marginTop: 30}}
                >

                    <TextInput
                        name="number"
                        label="Numero da Requisição:"
                        type='string'
                        size='4'
                        disabled={!this.props.edit}
                        value={this.props.purchase.number}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="requisitionDate"
                        label="Data:"
                        type='date'
                        size='4'
                        disabled={this.props.disabled}
                        value={moment(this.props.purchase.requisitionDate).format("YYYY-MM-DD")}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="management"
                        label="Gestão:"
                        disabled={this.props.disabled}
                        size='4'
                        value={this.props.purchase.management}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="requester"
                        label="Requisitante:"
                        disabled={this.props.disabled}
                        size='4'
                        value={this.props.purchase.requester}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="sector"
                        label="Setor:"
                        disabled={this.props.disabled}
                        size='4'
                        value={this.props.purchase.sector}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="UGR"
                        label="UGR:"
                        size='4'
                        disabled={this.props.disabled}
                        value={this.props.purchase.UGR}
                        onChange={this.props.onChange}/>


                    <this.ButtonAddRequest/>
                    <BootstrapTable
                        ref='table'
                        data={this.state.requisitionItens}
                        options={{deleteBtn: this.renderDeleteAction, noDataText: "Não há solicitação adicionada"}}
                        selectRow={{
                            mode: 'checkbox',
                            clickToSelect: true,
                            onSelect: this.onRowSelect,
                            bgColor: '#e4ecf5'
                        }}
                        deleteRow>
                        <TableHeaderColumn dataField='description' dataSort={true} isKey>Descrição</TableHeaderColumn>
                        <TableHeaderColumn dataField='qtd'
                                           tdStyle={{width: '15%'}}
                                           thStyle={{width: '15%'}}
                                           dataSort={true}>Quantidade</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'
                                           dataFormat={this.priceFormatter}
                                           tdStyle={{width: '15%'}}
                                           thStyle={{width: '15%'}}
                                           dataSort={true}>Preço</TableHeaderColumn>
                        <TableHeaderColumn tdStyle={{width: '14%'}} thStyle={{width: '14%'}} dataField='status'
                                           dataSort={true}>Status</TableHeaderColumn>
                    </BootstrapTable>

                    <this.ButtonFinishRequest/>


                </Form>
                <Modal isOpen={this.state.modal} toggle={this.toggleOut} size="lg"

                >
                    <ModalHeader toggle={this.toggle}>Solicitações Disponíveis</ModalHeader>
                    <ModalBody>
                        <BootstrapTable
                            ref='table'
                            search
                            pagination
                            data={this.state.data.requisitions}
                            options={{
                                btnGroup: this.CustomButtonGroupModal,
                                searchField: this.CustonModalSearch,
                                noDataText: "Não há solicitação adicionada"
                            }}
                            selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                onSelect: this.onRowModalSelect,
                                bgColor: '#e4ecf5'
                            }}
                        >
                            <TableHeaderColumn dataField='description' dataSort={true}
                                               isKey>Descrição</TableHeaderColumn>
                            <TableHeaderColumn tdStyle={{width: '16%'}} thStyle={{width: '16%'}} dataField='qtd'
                                               dataSort={true}>Quantidade</TableHeaderColumn>
                            <TableHeaderColumn
                                dataFormat={this.priceFormatter}
                                tdStyle={{width: '15%'}}
                                thStyle={{width: '15%'}}
                                dataField='price'
                                dataSort={true}>Preço</TableHeaderColumn>
                            <TableHeaderColumn tdStyle={{width: '14%'}} thStyle={{width: '14%'}} dataField='status'
                                               dataSort={true}>Status</TableHeaderColumn>
                        </BootstrapTable>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleOut}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

PurchaseForm.propTypes = {
    purchase: PropTypes.object.isRequired,

    edit: PropTypes.bool,
    disabled: PropTypes.bool,

    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,

    onChangeRequest: PropTypes.func.isRequired,

    saving: PropTypes.bool
};

export default PurchaseForm;