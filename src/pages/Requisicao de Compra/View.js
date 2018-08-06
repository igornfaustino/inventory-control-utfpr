import React from 'react';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import SubHeader from '../../components/SubHeader/SubHeader';
import moment from 'moment';

import {isAdmin} from '../../utils/userLogin';
import {REQUISICAO_ALL, REQUISICAO_UPDATE, REQUISICAO_VIEW} from "./index";


class View extends React.Component {
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
            requisition: {},
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

    render() {
        return (
            <Container>
                <SubHeader {...this}
                           back={REQUISICAO_ALL}
                           title={REQUISICAO_VIEW.page}
                />

                <br/>
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
                {
                    (isAdmin()) ? (
                        <Container>
                            <Button
                                color={'primary'}
                                size={'sm'}

                                onClick={() => {
                                    this.props.history.push({
                                        pathname: REQUISICAO_UPDATE.url,
                                        state: this.state
                                    })
                                }}
                            >
                                Editar
                            </Button>
                            {' '}
                            <Button
                                color={'danger'}
                                size={'sm'}
                                onClick={this.toggle}>
                                Remover
                            </Button>
                        </Container>
                    ) : ''
                }

                <br/>
                <Table responsive bordered>
                    <thead>
                    <tr>
                        <td colSpan={2} className={'text-center'}><strong>Detalhes da compra</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><strong>Requisição: </strong>{this.state.purchase.number}</td>
                        <td><strong>Data: </strong>{moment(this.state.purchase.requisitionDate).format('DD-MM-YYYY')}
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Requisitante: </strong> {this.state.purchase.requester.name}</td>
                        <td><strong>UGR: </strong> {this.state.purchase.UGR}</td>
                    </tr>
                    <tr>
                        <td><strong>Setor: </strong> {this.state.purchase.sector}</td>
                        <td><strong>Gestão: </strong> {this.state.purchase.management}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <td colSpan={2} className={'text-center'}><strong>Justificativa da necessidade dos itens de
                            compra</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={2}>
                            {this.state.purchase.requisitionItems.map((element, index) =>
                                <p><strong>Item {index + 1}:</strong> {element.item.justification}</p>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Table bordered condensed responsive hover>
                    <thead>
                    <tr>
                        <td colSpan={6} className={'text-center'}><strong>Detalhes dos itens da compra</strong></td>
                    </tr>
                    <tr>
                        <td colSpan={1}><strong>Item</strong></td>
                        <td colSpan={3}><strong>Descrição</strong></td>
                        <td colSpan={1}><strong>Quantidade</strong></td>
                        <td colSpan={1}><strong>Custo médio por unidade</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.purchase.requisitionItems.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td colSpan={3}>{item.item.description}</td>
                                <td> {item.item.qtd}</td>
                                <td>R$ {
                                    (item.item.quotation ?
                                        item.item.quotation.map((item) => item.price).reduce((a, b) => a + b, 0) / item.item.quotation.length :
                                        0).toFixed(2)
                                }
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <Table bordered condensed responsive hover>
                    <thead>
                    <tr>
                        <td colSpan={3} className={'text-center'}><strong>Preparação de custo estimado</strong></td>
                    </tr>
                    <tr className={'text-center'}>
                        <td><strong>Elemento de despesa</strong></td>
                        <td><strong>Itens da Requisição</strong></td>
                        <td><strong>Custo estimado com base na média</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.prepareCustoDosItem(this.state.purchase.requisitionItems)
                    }
                    </tbody>
                </Table>
            </Container>
        );
    }
}


export default View;