import React from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Form} from 'react-bootstrap';
import {Button, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import moment from 'moment'
import {loadAllRequisition} from './connectAPI';

import {BootstrapTable, SearchField, TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


import TextInput from '../common/TextInput';
import axios from 'axios';
import NewSupplier from "./NewSupplier";

import PurchaseSave from './PurchaseSave';

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

            requisitionItens: [],
            sectorList: [],
            UGRList: [],
            managementList: []
        };
        this.toggleOut = this.toggleOut.bind(this);
        this.toggleIn = this.toggleIn.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
        this.AddRequest = this.AddRequest.bind(this);
        this.onSeller = this.onSeller.bind(this);

    }

    componentWillMount() {
        this.getSector();
        this.getUGR();
        this.getManagement();

        let data = this.props.purchase.requisitionItems;
        console.log(data)
        let newdata = [];
        data.forEach((requisition, index) => {
            let price = 0;

            if (requisition.quotation)
                price = requisition.quotation.map((x) => x.price * requisition.qtd).reduce((a, b) => a + b, 0) / requisition.quotation.length;

            newdata.push({
                ...data[index],
                price: price,
                min: price * this.state.validPrice.min,
                max: price * this.state.validPrice.max,
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
                    data.requisitions[index] = {
                        ...data.requisitions[index],
                        price: price ? price : 0,
                        maxprice: (price * this.state.validPrice.max) ? price * this.state.validPrice.max : 0,
                        minprice: (price * this.state.validPrice.min) ? price * this.state.validPrice.min : 0,
                        selected: false
                    }
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
            // console.log(error)
        }
    }

    //Function to get sector
    getSector = () => {
        axios.get('/sector').then(response => {
            if (response.status === 200) {
                //console.log(response);
                let sectorPurchase = response.data.sector;
                let sector = [];
                sectorPurchase.forEach((_sector) => {
                    //console.log(_status)
                    sector.push(_sector.sector)
                });

                //console.log(sector)
                this.setState({
                    sectorList: sector
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    //Function to get UGR
    getUGR = () => {
        axios.get('/ugr').then(response => {
            if (response.status === 200) {
                //console.log(response);
                let UGRPurchase = response.data.ugr;
                let UGR = [];
                UGRPurchase.forEach((_UGR) => {
                    //console.log(_UGR)
                    UGR.push(_UGR.ugr)
                });

                //console.log(sector)
                this.setState({
                    UGRList: UGR
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    //Function to get Management
    getManagement = () => {
        axios.get('/management').then(response => {
            if (response.status === 200) {
                //console.log(response);
                let managementPurchase = response.data.management;
                let management = [];
                managementPurchase.forEach((_management) => {
                    //console.log(_management)
                    management.push(_management.management)
                });

                console.log(management)
                this.setState({
                    managementList: management
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    AddRequest() {
        this.toggleOut();
        let data = this.state.data;
        let rows = this.state.requisitionItens;

        data.requisitions.forEach((value, index) => {
            if (value.selected) {
                if (rows.filter(item => item.description === value.description).length === 0) {
                    let y = value;

                    if (y.quotation) {
                        y['price'] = value.quotation.map((x) => x.price).reduce((a, b) => a + b, 0) / y.quotation.length;
                        y.min = y.price * this.state.validPrice.min;
                        y.max = y.price * this.state.validPrice.max;
                    }

                    rows.push(y);
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
        for (let i = 0; i < rows.length; i++) {
            if (!rows[i].selected) {
                n.push(rows[i])
            }
        }
        // console.log(n);
        this.setState({
            requisitionItens: n
        });

        this.props.onChangeRequest(n)
    };

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
    };

    toggleOut() {
        this.setState({
            modal: false
        })
    };

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
        return (!this.props.purchase.requester && !this.props.purchase.sector && !this.props.purchase.UGR && !this.props.purchase.management)
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
                // <Container className="float-right" style={{margin: '10px'}}>
                <Button
                    style={{marginTop: '10px'}}
                    color="secondary"
                    className="float-right"
                    size="sm"
                    disabled={this.isDisabled()}
                    onClick={this.props.onSave}
                    value={this.props.edit ? 'Salvar Alterações' : 'Salvar'}
                >
                    Salvar Alterações
                </Button>
                // </Container>
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
        // console.log(this.state.requisitionItens)
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
    };

    onRowSelect = (item, isSelect, e) => {
        let requisitionItens = this.state.requisitionItens
        let index = requisitionItens.indexOf(item)
        requisitionItens[index] = {...requisitionItens[index], selected: isSelect}
        this.setState({
            requisitionItems: requisitionItens
        })
        // console.log(this.state.requisitionItens)
    }

    onRowModalSelect = (item, isSelect, e) => {
        let data = this.state.data
        let index = data.requisitions.indexOf(item)
        data.requisitions[index] = {...data.requisitions[index], selected: isSelect}
        this.setState({
            requisitionItems: data
        })
    }

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
    }

    priceFormatter = (cell, row) => {
        return `R$ ${cell.toFixed(2)}`;
    }

    newSeller(row) {
        console.log(row);
        this.setState({seller: row, activeSeller: true})
    }

    seller = (cell, row, enumObject, index) => {
        if (!row.itemSupplier)
            return <a onClick={() => this.newSeller(row)}> Adicionar Vendedor</a>
        else
            return row.itemSupplier.name
    }
    moveWareHouse = (cell, row, enumObject, index) => {

        let max = this.state.requisitionItens[index].qtdReceived
        console.log(max)
        let item = {
            ...row,
            qtdReceivedMax: row.qtd - max,
            qtdReceived: 0,
        }
        if(item.qtdReceivedMax === 0){
            return "Em Estoque"
        }

        return (
            <PurchaseSave data={item} buttonLabel={"Mover"} onMove={this.onMove}/>
        );

    };

    onMove = (item_id, qtd) => {
        let i = this.state.requisitionItens.map((item) => item._id).indexOf(item_id);

        let req = this.state.requisitionItens;
        req[i].qtdReceived = qtd;

        this.props.onChangeRequest(req);
    };

    onSeller(seller) {
        let i = this.state.requisitionItens.map((item) => item._id).indexOf(this.state.seller._id)
        this.sellerToggle()
        let req = this.state.requisitionItens
        req[i].itemSupplier = seller;

        // console.log(this.state.requisitionItens[i])

        this.props.onChangeRequest(req);

        // this.setState({requisitionItens: req})

    }

    sellerToggle = () => {
        this.setState({activeSeller: !this.state.activeSeller})
    }

    render() {
        // console.log(this.props.purchase.requisitionDate)
        let dataSector;
        dataSector = this.state.sectorList.map((item, index) =>
            <option value={item} key={index}>{item}</option>
        );
        dataSector.unshift(<option value='Escolha' key={-1}>Escolha</option>)

        let dataUGR;
        dataUGR = this.state.UGRList.map((item, index) =>
            <option value={item} key={index}>{item}</option>
        );
        dataUGR.unshift(<option value='Escolha' key={-1}>Escolha</option>)

        let dataManagement;
        dataManagement = this.state.managementList.map((item, index) =>
            <option value={item} key={index}>{item}</option>
        );
        dataManagement.unshift(<option value='Escolha' key={-1}>Escolha</option>)

        return (
            <Container>
                <Form
                    style={{marginTop: 30}}
                >
                    <TextInput
                        name="number"
                        label="Número da Requisição:"
                        // type='text'
                        // size='4'
                        disabled={!this.props.edit}
                        value={this.props.purchase.number}
                        onChange={this.props.onChange}/>

                    <TextInput
                        name="requisitionDate"
                        label="Data:"
                        type='date'
                        // size='4'
                        disabled={this.props.disabled}
                        value={moment(this.props.purchase.requisitionDate).format("YYYY-MM-DD")}
                        onChange={this.props.onChange}/>

                    <FormGroup row>
                        <p style={{marginTop: "10px", color: "red"}}>*</p>
                        <Label for="managementArea" sm={2}>Gestão:</Label>
                        <Col sm={3} style={{marginLeft: "90px"}}>
                            <Input type="select" name="management" id="managementArea"
                                   onChange={this.props.onChange} value={this.props.purchase.management}>
                                {dataManagement}
                            </Input>
                        </Col>
                    </FormGroup>

                    <TextInput
                        name="requester"
                        label="Requisitante:"
                        disabled={this.props.disabled}
                        // size='4'
                        value={this.props.purchase.requester}
                        onChange={this.props.onChange}/>

                    <FormGroup row>
                        <p style={{marginTop: "10px", color: "red"}}>*</p>
                        <Label for="typeArea" sm={2}>Setor:</Label>
                        <Col sm={3} style={{marginLeft: "90px"}}>
                            <Input type="select" name="sector" id="sectorArea" onChange={this.props.onChange}
                                   value={this.props.purchase.sector}>
                                {dataSector}
                            </Input>
                            {/* <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status do produto" /> */}
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <p style={{marginTop: "10px", color: "red"}}>*</p>
                        <Label for="typeArea" sm={2}>UGR:</Label>
                        <Col sm={3} style={{marginLeft: "90px"}}>
                            <Input type="select" name="UGR" id="ugrArea" onChange={this.props.onChange}
                                   value={this.props.purchase.UGR}>
                                {dataUGR}
                            </Input>
                            {/* <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status do produto" /> */}
                        </Col>
                    </FormGroup>


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
                        <TableHeaderColumn dataField='_id'
                                           tdStyle={{width: '0%'}}
                                           thStyle={{width: '0%'}} dataSort={false} isKey>key</TableHeaderColumn>

                        <TableHeaderColumn dataField='description' dataSort={true}>Descrição</TableHeaderColumn>

                        <TableHeaderColumn dataField='qtd'
                                           tdStyle={{width: '15%'}}
                                           thStyle={{width: '15%'}}
                                           dataSort={true}>Quantidade</TableHeaderColumn>

                        <TableHeaderColumn dataField='min'
                                           dataFormat={this.priceFormatter}
                                           tdStyle={{width: '15%'}}
                                           thStyle={{width: '15%'}}
                                           dataSort={true}>Preço Mínimo</TableHeaderColumn>

                        <TableHeaderColumn dataField='price'
                                           dataFormat={this.priceFormatter}
                                           tdStyle={{width: '15%'}}
                                           thStyle={{width: '15%'}}
                                           dataSort={true}>Preço Médio</TableHeaderColumn>


                        <TableHeaderColumn tdStyle={{width: '14%'}} thStyle={{width: '14%'}} dataField='status'
                                           dataSort={true}>Status</TableHeaderColumn>

                        <TableHeaderColumn dataField='seller'
                                           dataFormat={this.seller}
                                           dataSort={true}>Vendedor</TableHeaderColumn>

                        <TableHeaderColumn dataField='move'
                                           dataFormat={this.moveWareHouse}
                                           dataSort={true}>Ação</TableHeaderColumn>
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
                                dataSort={true}>Preço médio</TableHeaderColumn>

                            <TableHeaderColumn tdStyle={{width: '14%'}} thStyle={{width: '14%'}} dataField='status'
                                               dataSort={true}>Status</TableHeaderColumn>
                        </BootstrapTable>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleOut}>Fechar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.activeSeller} toggle={this.sellerToggle} size="lg"

                >
                    <ModalHeader toggle={this.sellerToggle}>Cadastro de Vendedor</ModalHeader>
                    <ModalBody>
                        <NewSupplier seller={this.state.seller} onComplete={this.onSeller}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.sellerToggle}>Fechar</Button>
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