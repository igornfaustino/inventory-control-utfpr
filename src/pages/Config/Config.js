import React from 'react';
import SubHeader from '../../components/SubHeader/SubHeader';

import {Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
import axios from "axios";

export default class Config extends React.Component {
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    submit = (e) => {
        e.preventDefault()
        let local = e.target.name

        let data = this.state[local]
        if (data === "") {
            return alert("Preencha o campo antes de adicionar!")
        }
        axios.post("/" + local, {
            [local]: data
        }).then(res => {
            alert("adicionado com sucesso!")
            this.setState({
                [local]: "",
            })
        }).catch(ex => {
            alert("Ops.. Algo saiu errado")
        })
    }
    getAll = (e) => {
        let local = e.target.name
        axios.get("/" + local).then(res => {
            this.setState({
                local: local,
                list: res.data[local],
            })
            this.toggle()
        })
    }
    deleteItem = (e) => {
        axios.delete("/" + this.state.local + "/" + e).then(res => {
            if (res.status === 204) {
                this.setState({
                    list: this.state.list.filter(val => val._id !== e)
                })
            }
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            admin: '',
            status: '',
            itemType: '',
            management: '',
            ugr: '',
            sector: '',
            list: [],
            modal: false,
            local: ''
        }
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    render() {
        // if (!isAdmin()) {
        // 	this.props.history.push('/home');
        // }

        let listItem = this.state.list.map((value, index) => (
            <div key={index}>
                <Row>
                    <Col md={10}>
						<span style={{
                            fontWeight: "bold"
                        }}>{value[this.state.local]}</span>
                    </Col>
                    <Col md={1}>
                        <Button type="submit" color="danger" onClick={() => this.deleteItem(value._id)}>
                            X
                        </Button>
                    </Col>
                </Row>
                <hr/>
            </div>
        ))

        return (
            <Container>
                <Container>
                <SubHeader {...this} title="Configurações"/>
                    <h2>Administrador</h2>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="adminArea" sm={2}>Novo Administrador:</Label>
                            <Col sm={4}>
                                <Input value={this.state.admin} type="text" name="admin" id="adminArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="admin"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="admin"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="admin"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar Admin
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
                <Container>
                    <h2>Geral</h2>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="statusArea" sm={2}>Novo Status:</Label>
                            <Col sm={4}>
                                <Input value={this.state.status} type="text" name="status" id="statusArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="Status"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="status"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="status"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar Status
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <hr/>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="typeArea" sm={2}>Novo Tipo de Item:</Label>
                            <Col sm={4}>
                                <Input value={this.state.itemType} type="text" name="type" id="typeArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="Tipo"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="type"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="type"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar Tipo
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <hr/>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="managementArea" sm={2}>Nova Gestão:</Label>
                            <Col sm={4}>
                                <Input value={this.state.management} type="text" name="management" id="managementArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="Gestão"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="management"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="management"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar Gestão
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <hr/>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="ugrArea" sm={2}>Novo UGR:</Label>
                            <Col sm={4}>
                                <Input value={this.state.ugr} type="text" name="ugr" id="ugrArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="UGR"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="ugr"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="ugr"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar UGR
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <hr/>
                    <Form>
                        <FormGroup row style={marginForm}>
                            <Label for="sectorArea" sm={2}>Novo Setor:</Label>
                            <Col sm={4}>
                                <Input value={this.state.sector} type="text" name="sector" id="sectorArea"
                                       onChange={(event) => this.handleUserInput(event)} placeholder="Setor"/>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                                <Button block color="primary" name="sector"
                                        onClick={(event) => this.getAll(event)}>Gerenciar</Button>
                            </Col>
                            <Col md={2}>
                                <Button block type="submit" color="success" name="sector"
                                        onClick={(event) => this.submit(event)}>
                                    Adicionar Setor
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <hr/>
                </Container>


                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Gerenciador</ModalHeader>
                    <ModalBody>
                        {listItem}
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

const marginForm = {
    marginTop: 50,
    marginBottom: 50
}