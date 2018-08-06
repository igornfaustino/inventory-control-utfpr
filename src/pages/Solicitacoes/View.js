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
import Quotacao from './Quotacao'
import axios from 'axios';
import {toast} from 'react-toastify';
import SubHeader from '../../components/SubHeader/SubHeader';
import PropTypes from 'prop-types'

import {isAdmin} from '../../utils/userLogin';
import {SOLICITACOES_ALL, SOLICITACOES_UPDATE} from "./index";


class View extends React.Component {
    remove = () => {
        axios.delete('/requisition/' + this.state.requisition._id).then(response => {
            this.toggle();
            if (response.status === 204) {
                toast.success('Requisição Deletada, redirecionando página', {
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

    componentWillUpdate() {

        if (this.props.requisition) {
        this.setState({requisition: this.props.requisition});
        }

    }
    componentWillMount(){
            this.setState(this.props.history.location.state);
    }

    render() {
        return (
            <Container>
                {this.props.requisition ? '' :
                    <SubHeader {...this}
                               back={SOLICITACOES_ALL}
                               title={'Visualizar Solicitação'}
                    />
                }
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
                                        pathname: SOLICITACOES_UPDATE.url,
                                        state: {
                                            requisition: this.state.requisition
                                        }
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
                <Table responsive>
                    <thead>
                    <tr>
                        <td colSpan={2}><strong>Requisitado por: </strong>{this.state.requisition.requesterId.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Siorg: </strong>{this.state.requisition.siorg}</td>
                        <td><strong>Status: </strong>{this.state.requisition.status}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <strong>Descrição: </strong>
                            {this.state.requisition.description}
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Quantidade: </strong>{this.state.requisition.qtd} itens</td>
                        <td><strong>Tipo de item: </strong>{this.state.requisition.itemType}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <strong>Justificativa para compra: </strong>
                            {this.state.requisition.justification}
                        </td>
                    </tr>
                    </thead>
                </Table>
                <Quotacao quotation={this.state.requisition.quotation}/>
            </Container>
        );
    }
}

View.PropTypes = {
    requisition: PropTypes.object
}

export default View;