import React from 'react';
import '../../pages/Pages.css';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {updatePurchaseRequisition} from "./connectAPI";
import axios from "axios/index";

export default class PurchaseSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isPermanent: false,
            stateList: [],
            buyer: {}
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillMount() {
        let props = this.props
        this.getStatus();
        if (props.data.purchase.requisitionItems) {

            props.data.purchase.requisitionItems = props.data.purchase.requisitionItems.map((item) => {
                return {
                    ...item,
                    isPermanent: false,
                    siorg: item.siorg,
                    patrimonyNumber: '',
                    buyer: '',
                    solicitor: '',
                    equipmentState: '',
                    description: item.description,
                    origin: "Compra",
                    equipmentType: item.itemType,
                    quantity: item.qtd,
                }
            })
        }
        this.setState({...props});
    }

    onChange = (event) => {
        let data = this.state.data;
        let i = data.purchase.requisitionItems.map((x) => x._id).indexOf(event.target.id);

        data.purchase.requisitionItems[i][event.target.name] = event.target.value;
        this.setState({data: data});
    };

    renderItem = () => {


        if (this.state.data.purchase.requisitionItems) {

            return this.state.data.purchase.requisitionItems.map((item) => {

                let data;
                data = this.state.stateList.map((item, index) =>
                    <option value={item} key={index}>{item}</option>
                );
                data.unshift(<option value={'Escolha'} key={-1}>Escolha</option>)

                let patrimonyfield = null;

                if (item.isPermanent) {
                    patrimonyfield = (<FormGroup row>
                        <Label style={{marginLeft: "7px"}} for="patrimony" sm={2}>Número de patrimônio:</Label>
                        <Col sm={2}>
                            <Input value={item.patrimonyNumber} type="text" name="patrimonyNumber"
                                   id={item._id} onChange={this.onChange}
                                   placeholder="Número de patrimônio"/>
                        </Col>
                    </FormGroup>)
                }

                return (
                    <div>
                        <FormGroup row>
                            <Label sm={2} check style={{marginTop: "10px", marginLeft: "7px"}}>
                                <Input type="checkbox" checked={item.isPermanent} name="isPermanent" id={item._id}
                                       onChange={this.onChange}/>{' '}
                                Item permanente
                            </Label>
                        </FormGroup>

                        {patrimonyfield}

                        <FormGroup row>
                            <p style={{marginTop: "10px", color: "red"}}>*</p>

                            <Label for="buyerArea" sm={2}>Comprador:</Label>
                            <Col sm={4}>
                                <Input value={item.buyer} type="text" name="buyer" id={item._id}
                                       onChange={this.onChange}
                                       placeholder="Pessoa que comprou o produto"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <p style={{marginTop: "10px", color: "red"}}>*</p>
                            <Label for="requesterArea" sm={2}>Solicitante:</Label>
                            <Col sm={4}>
                                <Input value={item.solicitor} type="text" name="solicitor" id={item._id}
                                       onChange={this.onChange}
                                       placeholder="Pessoa que solicitou o produto"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <p style={{marginTop: "10px", color: "red"}}>*</p>
                            <Label for="stateArea" sm={2}>Status:</Label>
                            <Col sm={3}>
                                <Input type="select" name="equipmentState" id={item._id}
                                       onChange={this.onChange} value={item.equipmentState}>
                                    {data}
                                </Input>
                                {/* <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Status do produto" /> */}
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for={item._id} sm={6}>{item.description}</Label>
                            <Col sm={4}>
                                <Input value={item.qtd - (!item.qtdReceived ? 0 : item.qtdReceived)} type="number"
                                       name={'quantity'} id={item._id}
                                       onChange={this.onChange} placeholder="Quantidade de itens recebidos"/>
                            </Col>
                            <Col sm={2}>
                                <Button color="success" size={"sm"} onClick={() => this.onConfirm(item)}>Mover</Button>
                            </Col>
                        </FormGroup>
                        <hr/>
                    </div>
                )
            })
        }
    };
    //Function to get item status
    getStatus = () => {
        axios.get('/status').then(response => {
            if (response.status === 200) {
                let resStatus = response.data.status;
                let status = [];
                resStatus.forEach((_status) => {
                    console.log(_status)
                    status.push(_status.status)
                });

                console.log(status)
                this.setState({
                    stateList: status
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    onConfirm = (item) => {
        this.saveItens(item);

        this.moveWareHouse(item);
    };
    saveItens = (item) => {
        let status = "Em Estoque";
        if (item.qtd > item.qtdReceived) {
            status = 'Parcial em Estoque';
        }
        axios.put('/requisition/' + item._id, {
            siorg: item.siorg,
            description: item.description,
            justification: item.justification,
            qtd: item.qtd,
            qtdReceived: item.qtdReceived,
            status: status,
            changeJustification: "Estoque",
            priceJustification: "Estoque",
            itemType: "None",
            quotation: item.quotation
        }).then(res => {
            console.log(res)
        }).catch(err => {
        });
    };

    moveWareHouse = (item) => {
        let x = {
            isPermanent: false,
            siorg: item.siorg,
            patrimonyNumber: !item.patrimonyNumber? '':item.patrimonyNumber,
            buyer: item.buyer,
            solicitor: item.solicitor,
            equipmentState: item.equipmentState,
            description: item.description,
            origin: "Compra",
            equipmentType: item.itemType,
            quantity: item.qtd
        };


            let res = axios.post('/equipment/', x).then((req) => {
                console.log(req)
            }
        ).catch(err => {
                console.error(err)
            }
        )
    };


    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} size={'lg'} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Mover itens da compra</ModalHeader>
                    <ModalBody>
                        {this.renderItem()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" size={'sm'} onClick={this.toggle}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}