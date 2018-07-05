import React from 'react';
import '../../pages/Pages.css';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
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

        this.setState({...props,
            isPermanent: false,
            patrimonyNumber: '',
            buyer: '',
            solicitor: '',
            equipmentState: '',
            origin: "Compra",
            equipmentType: props.itemType,
            quantity: props.qtdReceivedMax,});
    }

    onChange = (event) => {
        let data = this.state.data;

        data[event.target.name] = event.target.value;

        if(event.target.name === "quantity"){
            console.log(data.qtdReceivedMax)
            if(event.target.value > data.qtdReceivedMax){
                data[event.target.name] = data.qtdReceivedMax
            }
            if(event.target.value < 1){
                data[event.target.name] = 1
            }
        }
        this.setState({data: data});
    };

    renderItem = () => {


        let item = this.state.data
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
                        <Input value={item.quantity} type="number"
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

    onConfirm = async (item) => {

        await this.moveWareHouse(item);

        this.props.onMove(item._id,item.quantity)

    };
    moveWareHouse = async (item) => {

        let x = {
            isPermanent: false,
            siorg: item.siorg,
            patrimonyNumber: !item.patrimonyNumber ? '' : item.patrimonyNumber,
            buyer: item.buyer,
            solicitor: item.solicitor,
            equipmentState: item.equipmentState,
            description: item.description,
            origin: "Compra",
            equipmentType: item.itemType,
        };

        for( let i=0; i< item.quantity;i++){

            let res = axios.post('/equipment/', x).then((req) => {
                    console.log(req)
                }
            ).catch(err => {
                    console.error(err)
                }
            )
        }
    };


    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
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