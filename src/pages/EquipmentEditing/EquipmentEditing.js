import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

export default class EquipmentsEdit extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id
        try {
            axios.get('/equipment/' + id).then(response => {
                if (response.status === 200) {
                    this.setState({
                        equipment: response.data.equipment,
                        loading: false
                    })
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            })
        }
        catch (err) {
            console.error(er)
        }
    }

    onChange(event) {
        let field = event.target.name;
        let equipment = this.state.equipment;
        equipment[field] = event.target.value;
        return this.setState({equipment: equipment});
    }

    constructor(props) {
        super(props);

        this.state = {
            equipment: {
                siorg: 123,
                buyer: 'test Buyer',
                solicitor: 'test Solicitor',
                description: 'descrição',
                origin: 'origem',
                equipmentType: 'tecnológico',
                quantity: 32,
                equipmentState: 'dasd',
                locationHistory: ''
            },
            modal: false
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.savebutton = this.savebutton.bind(this)
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    savebutton() {
        event.preventDefault();

        try {
            axios.put('/purchase/' + this.state.equipment._id, this.state.equipment).then(response => {
                    if (response.status === 200) {
                        alert("Atualizado com sucesso!")
                    }
                })
                .catch(ex => {
                    alert("Não Foi possivel conectar ao servidor")
                    console.error(ex, ex.response);
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="margin-left">
                <Form>
                    <FormGroup row>
                        <Label for="siorg" sm={2}>Código do SIORG:</Label>
                        <Col sm={2}>
                            <Input type="text"
                                   name="siorg"
                                   id="siorg"
                                   value={this.state.equipment.siorg}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="buyer" sm={2}>Comprador:</Label>
                        <Col sm={4}>
                            <Input type="text"
                                   name="buyer"
                                   id="buyer"
                                   placeholder="Pessoa que comprou o produto"
                                   value={this.state.equipment.buyer}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="solicitor" sm={2}>Solicitante:</Label>
                        <Col sm={4}>
                            <Input type="text"
                                   name="solicitor"
                                   id="solicitor"
                                   placeholder="Pessoa que solicitou o produto"
                                   value={this.state.equipment.solicitor}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="description" sm={2}>Descrição:</Label>
                        <Col sm={7}>
                            <Input type="textarea"
                                   name="description"
                                   id="description"
                                   placeholder="Descrição detalhada do produto"
                                   value={this.state.equipment.description}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="origin" sm={2}>Origem:</Label>
                        <Col sm={3}>
                            <Input type="text"
                                   name="origin"
                                   id="origin"
                                   placeholder="Origem do produto"
                                   value={this.state.equipment.origin}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="equipmentType" sm={2}>Tipo:</Label>
                        <Col sm={3}>
                            <Input type="text"
                                   name="equipmentType"
                                   id="equipmentType"
                                   placeholder="Tipo do produto"
                                   value={this.state.equipment.equipmentType}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="quantity" sm={2}>Quantidade:</Label>
                        <Col sm={1}>
                            <Input type="number"
                                   name="quantity"
                                   id="quantity"
                                   value={this.state.equipment.quantity}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="equipmentState" sm={2}>Estado:</Label>
                        <Col sm={2}>
                            <Input type="text"
                                   name="equipmentState"
                                   id="equipmentState"
                                   placeholder="Estado do produto"
                                   value={this.state.equipment.equipmentState}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                </Form>
                <div align="right" className="margin-right">
                    <Button color="success" onClick={this.savebutton}>Salvar Alterações</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Movimentar equipamentos</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="locationHistory" sm={2}>Movimentar Equipamentos:</Label>
                            <Col sm={2}>
                                <Input type="text"
                                       name="locationHistory"
                                       id="locationHistory"
                                       placeholder="Local de movimentação"
                                       value={this.state.equipment.locationHistory}
                                       onChange={this.onChange}/>
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="" onClick={this.toggle}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}