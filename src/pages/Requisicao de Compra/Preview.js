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
import moment from 'moment';

import {isAdmin} from '../../utils/userLogin';
import {REQUISICAO_UPDATE, REQUISICAO_VIEW} from "./index";


class Preview extends React.Component {
    remove = () => {
        axios.delete('/purchase/' + this.state.purchase._id).then(response => {
            this.toggle();
            if (response.status === 204) {
                toast.success('Compra Deletada, redirecionando página', {
                    onClose: () => {
                        this.props.history.push('/requisicao/')
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
            purchase: {},
            modal: false,
            confirmInput: 'remover compra',
            confirm: ''
        };
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }


    prepareCustoDosItem(itemList) {
        let itens = [];
        let category = [];
        let find = false;
        if (itemList) {

            itemList.map(item => item.item).forEach((requisition, index) => {
                let valor = requisition.quotation ?
                    requisition.qtd * requisition.quotation.map((item) => item.price).reduce((a, b) => a + b, 0) / requisition.quotation.length :
                    0
                ;

                if (category.includes(requisition.itemType)) {
                    itens[category.indexOf(requisition.itemType)].itens.push(index + 1);
                    itens[category.indexOf(requisition.itemType)].valor += valor;
                    find = true
                }
                if (!find) {
                    category.push(requisition.itemType);
                    let item = {catedory: requisition.itemType, itens: [index + 1], valor: valor};
                    itens.push(item)
                }
            });
        }

        return itens.map((item, index) => {

            return (
                <tr key={index}>
                    <td>{item.catedory ? item.catedory : "Não há"}</td>
                    <td>{item.itens}</td>
                    <td>R$ {item.valor.toFixed(2)}</td>
                </tr>
            )
        })
    }

    componentDidUpdate() {
        if (!this.state.purchase || this.state.purchase !== this.props.purchase) {
            console.log(this.props.purchase)
            this.setState({purchase: this.props.purchase});
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
                                        pathname: REQUISICAO_VIEW.url,
                                        state: {
                                            purchase: this.state.purchase
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
                                            pathname: REQUISICAO_UPDATE.url,
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
                                        {this.state.purchase._id}
                                    </strong>
                                </p>
                                <p>
                                    Data:
                                    <strong>
                                        {moment(this.state.purchase.requisitionDate).format('DD-MM-YYYY')}
                                    </strong>
                                </p>
                                <p>
                                    Iniciado por:
                                    <strong>
                                        {this.state.purchase.requester ? this.state.purchase.requester.name : ' '}
                                    </strong>
                                </p>
                            </Col>
                            <Col sm={12} md={6}>

                                {this.state.purchase.requisitionItems ? this.state.purchase.requisitionItems.map((element, index) => {
                                        return <p>
                                            <strong>Item {index + 1} [x{element.item ? element.item.qtd : 0}]</strong> {element.item ? element.item.description : 'APAGADO?'}
                                        </p>

                                    }
                                ) : ''}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default Preview;