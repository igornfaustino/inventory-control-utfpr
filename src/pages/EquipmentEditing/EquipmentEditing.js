import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Container } from 'reactstrap';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader'

export default class EquipmentsEdit extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        try {
            axios.get('/equipment/' + id).then(response => {

                if (response.status === 200) {
                    if (response.data.equipment.locationHistory.length) {
                        this.setState({
                            locationHistory: response.data.equipment.locationHistory[0]
                        });

                    }
                    this.setState({
                        equipment: response.data.equipment,
                        loading: false
                    });
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    onChange(event) {
        let field = event.target.name;
        let equipment = this.state.equipment;
        equipment[field] = event.target.value;
        return this.setState({
            changed: true,
            equipment: equipment
        });
    }

    onChangeLocation(event) {
        let field = event.target.name;
        let location = this.state.locationHistory;
        location[field] = event.target.value;
        return this.setState({
            changed: true,
            locationHistory: location
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            equipment: {
                siorg: '',
                buyer: '',
                solicitor: 'test ',
                description: '',
                origin: '',
                equipmentType: '',
                // quantity: 1,
                equipmentState: '',
                patrimonyNumber: '',
            },
            locationHistory: {
                justification: '',
                locationType: '',
                location: ''
            },
            changed: false,
            modal: false,
            disabled: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.toggle = this.toggle.bind(this);
        this.savebutton = this.savebutton.bind(this)
    }

    moveEquipment = () => {
        if (this.state.locationHistory.justification === '' || this.state.locationHistory.locationType === '' || this.state.locationHistory.location === '') {
            alert("Preencha todos os campos!")
            return
        }
        this.setState({
            disabled: true
        })
        axios.post('/equipments/' + this.state.equipment._id + '/move', this.state.locationHistory).then(response => {
            if (response.status === 200) {
                // console.log(response);
                this.setState({
                    disabled: false,
                    locationHistory: {
                        justification: '',
                        locationType: '',
                        location: ''
                    }
                })
                alert("Equipamento movimentado com sucesso!")
                this.toggle()
            }

        }).catch(ex => {
            alert("Opss.. Algo saiu errado");
            console.error(ex, ex.response);
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    savebutton(event) {
        event.preventDefault();

        try {
            axios.put('/equipment/' + this.state.equipment._id, this.state.equipment).then(response => {
                if (response.status === 200) {
                    alert("Equipamento atualizado com sucesso!")
                }
            })
                .catch(ex => {
                    alert("Não Foi possivel conectar ao servidor");
                    console.error(ex, ex.response);
                })
        }
        catch (error) {
            // console.log(error)
        }
    }

    render() {
        return (
            <div>
                <Header></Header>

                <SubHeader title='Almoxarifado >> Editar Equipamento'></SubHeader>
                <div className="margin-left" style={{ marginRight: "20px" }}>
                    <Form>
                        <FormGroup row>
                            <Label for="siorg" sm={2}>Código do SIORG:</Label>
                            <Col sm={2}>
                                <Input type="text"
                                    name="siorg"
                                    id="siorg"
                                    value={this.state.equipment.siorg}
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
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
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <Button color="primary" onClick={this.toggle}>Movimentar</Button>
                        <div align="right">
                            <Button color="secondary" onClick={this.savebutton} disabled={!this.state.changed}>Salvar
                                Alterações</Button>
                        </div>
                    </Form>
                    <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Movimentar equipamentos</ModalHeader>
                        <ModalBody>
                            <Container>
                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="justification" sm={3}>Justificativa:</Label>
                                    <Col sm={6}>
                                        <Input type="textarea"
                                            name="justification"
                                            id="justification"
                                            placeholder="Justificar do local"
                                            value={this.state.locationHistory.justification}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="locationType" sm={3}>Tipo de localização:</Label>
                                    <Col sm={4}>
                                        <Input type="text"
                                            name="locationType"
                                            id="locationType"
                                            placeholder="Sala de aula, projeto, etc.."
                                            value={this.state.locationHistory.locationType}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="location" sm={3}>Localização:</Label>
                                    <Col sm={4}>
                                        <Input type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Sala D003"
                                            value={this.state.locationHistory.location}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.moveEquipment} disabled={this.state.locationHistory.justification === '' || this.state.locationHistory.locationType === '' || this.state.locationHistory.location === '' || this.state.disabled}>Movimentar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );

    }
}