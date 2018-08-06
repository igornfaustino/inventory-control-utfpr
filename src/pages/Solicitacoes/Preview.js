import React from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types'

import {isAdmin} from '../../utils/userLogin';
import {SOLICITACOES_ALL, SOLICITACOES_UPDATE, SOLICITACOES_VIEW} from "./index";


class Preview extends React.Component {
    remove = () => {
        axios.delete('/requisition/' + this.state.requisition._id).then(response => {
            this.toggle();
            console.log(response)
            if (response.data.success) {
                toast.success('Requisição Deletada, redirecionando página', {
                    onClose: () => {
                        this.props.history.push(SOLICITACOES_ALL.url)
                    },
                    autoClose: 1000
                })
            }
            else{
                toast.error('Não é possivel deletar esta solicitação', {
                    onClose: () => {
                        this.props.history.push(SOLICITACOES_ALL.url)
                    },
                    autoClose: 1000
                })
            }

        })
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };
    onChange = (element) => {
        this.setState({
            confirm: element.target.value
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            requisition: {},
            modal: false,
            confirmInput: 'remover solicitacao',
            confirm: ''
        };
    }

    componentDidUpdate() {
        if (!this.state.requisition || this.state.requisition !== this.props.requisition)
            this.setState({requisition: this.props.requisition});
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    render() {
        return (
            <Container>
                <br/>
                <Row>
                    <Col md={2}>
                        <Row>
                            <Button
                                color={'secondary'}
                                size={'md'}
                                block
                                onClick={() => {
                                    this.props.history.push({
                                        pathname: SOLICITACOES_VIEW.url,
                                        state: {
                                            requisition: this.state.requisition
                                        }
                                    })
                                }}
                            >
                                Visualizar
                            </Button>

                            {isAdmin() ? (
                                <Button
                                    color={'primary'}
                                    size={'md'}
                                    block
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: SOLICITACOES_UPDATE.url,
                                            state: {
                                                requisition: this.state.requisition
                                            }
                                        })
                                    }}
                                >
                                    Editar
                                </Button>
                            ) : ''}
                            {isAdmin() ? (
                                <Button
                                    color={'danger'}
                                    size={'md'}
                                    block
                                    onClick={this.toggle}>
                                    Remover
                                </Button>
                            ) : ''}
                        </Row>

                    </Col>

                    <Col md={10}>
                        <Row>
                            <Col sm={12} md={6}>
                                <p>
                                    Requisição:
                                    <strong>
                                        {this.state.requisition._id}
                                    </strong>
                                </p>
                                <p>
                                    Justificativa para compra:
                                    <strong>
                                        {this.state.requisition.justification}
                                    </strong>
                                </p>
                                <p>
                                    <strong>
                                        {this.state.requisition.qtd? this.state.requisition.qtd : 0}
                                        {this.state.requisition.qtd > 1? ' itens ': ' item '}
                                    </strong>
                                    requisitado por:
                                    <strong>
                                        {' '}{this.state.requisition.requesterId ? this.state.requisition.requesterId.name : 'None'}
                                    </strong>
                                </p>
                            </Col>
                            <Col sm={12} md={6}>
                                <p>
                                    Descrição:
                                    <strong>
                                        {this.state.requisition.description}
                                    </strong>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg"

                >
                    <ModalHeader toggle={this.toggle}>Solicitações Disponíveis</ModalHeader>
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label>Digite: '<strong>{this.state.confirmInput}</strong>' para confirmar</Label>
                                <Input onChange={this.onChange} value={this.state.confirm}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" size={'sm'} disabled={this.state.confirm !== this.state.confirmInput}
                                    onClick={this.remove}>Remover Solicitação</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Container>
        );
    }
}

Preview.PropTypes = {
    requisition: PropTypes.object
}

export default Preview;