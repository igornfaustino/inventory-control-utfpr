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

import {isAdmin} from '../../utils/userLogin';
import {ALMOXARIFADO_ALL, ALMOXARIFADO_UPDATE, ALMOXARIFADO_VIEW} from "./index";


class Preview extends React.Component {
    remove = () => {
        axios.delete('/equipment/' + this.state.equipment._id).then(response => {
            this.toggle();
            if (response.status === 204) {
                toast.success('Compra Deletada, redirecionando página', {
                    onClose: () => {
                        this.props.history.push(ALMOXARIFADO_ALL.url)
                    },
                    autoClose: 500
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
            equipment: {},
            modal: false,
            confirmInput: 'remover equipamento',
            confirm: ''
        };
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    componentDidUpdate() {
        if (!this.state.equipment || this.state.equipment !== this.props.equipment) {
            console.log(this.props.equipment)
            this.setState({equipment: this.props.equipment});
        }
    }

    render() {
        return (
            <Container>
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
                                        pathname: ALMOXARIFADO_VIEW.url,
                                        state: this.state
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
                                            pathname: ALMOXARIFADO_UPDATE.url,
                                            state: this.state
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
                                        {this.state.equipment._id}
                                    </strong>
                                </p>

                                <p>
                                    SIORG:
                                    <strong>
                                        {this.state.equipment.siorg}
                                    </strong>
                                </p>
                                <p>
                                    Tipo:
                                    <strong>
                                        {this.state.equipment.equipmentType}
                                    </strong>
                                </p>

                                <p>
                                    Solicitado por:
                                    <strong>
                                        {this.state.equipment.solicitor ? this.state.equipment.solicitor.name : ' '}
                                    </strong>
                                </p>
                            </Col>
                            <Col sm={12} md={6}>
                                <p>
                                    Estado:
                                    <strong>
                                        {this.state.equipment.equipmentState}
                                    </strong>
                                </p>
                                {
                                    this.state.equipment.locationHistory && this.state.equipment.locationHistory.length?
                                <p>
                                    Compoe o produto:
                                    {
                                        this.state.equipment.locationHistory.length>0? <p>{this.state.equipment.locationHistory[0].location}</p>: ''
                                    }
                                </p>: ''
                                }
                                {
                                    this.state.equipment.components && this.state.equipment.components.length?
                                <p>
                                    Componentes:
                                    {
                                        this.state.equipment.components?this.state.equipment.components.map((item, i)=>{
                                            return <p>[{i}] {item.description}</p>
                                        }) : ''
                                    }
                                </p>: ''
                                }

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default Preview;