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
import {ALMOXARIFADO_ALL, ALMOXARIFADO_UPDATE, ALMOXARIFADO_VIEW} from "./index";


class View extends React.Component {
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
            equipment: {
                siorg: '',
                buyer: '',
                solicitor: '',
                description: '',
                origin: '',
                equipmentType: '',
                equipmentState: '',
                // supplier: {},
                locationHistory: [],
                components: [],

            },
            modal: false,
            confirmInput: 'remover equipamento',
            confirm: ''
        };
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    prepareComponents() {
        let components = [];
        this.state.equipment.components.forEach((item, index) => {
            components.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.siorg}</td>
                    <td>{item.description}</td>
                    <td>{item.equipmentState}</td>
                </tr>)
        });
        return components
    }

    historyItems() {
        let historyItems = [];
        this.state.equipment.locationHistory.forEach((item, index) => {
            historyItems.push(
                <tr key={index}>
                    <td>{moment(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
                    <td>{item.location}</td>
                    <td>{item.locationType}</td>
                    <td>{item.justification}</td>
                </tr>)
        });
        return historyItems
    }

    render() {
        return (
            <Container>
                <SubHeader {...this}
                           back={ALMOXARIFADO_ALL}
                           title={ALMOXARIFADO_VIEW.page}
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
                                        pathname: ALMOXARIFADO_UPDATE.url,
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

                <Table bordered condensed>
                    <tbody>
                    <tr>
                        <td><strong>SIORG: </strong> {this.state.equipment.siorg}</td>
                        <td><strong>Pedido Confirmado por: </strong> {this.state.equipment.buyer.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Pedido realizado por: </strong> {this.state.equipment.solicitor.name}</td>
                        <td><strong>Origem: </strong> {this.state.equipment.origin}</td>
                    </tr>
                    <tr>
                        <td><strong>Tipo do Equipamento: </strong> {this.state.equipment.equipmentType}</td>
                        <td><strong>Estado do Equipamento: </strong> {this.state.equipment.equipmentState}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>Descrição:</strong>
                            {this.state.equipment.description}
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Table bordered condensed hover>
                    <thead>
                    <tr>
                        <td colSpan="4" className="font-weight-bold text-center">Componentes do Equipamento</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Item</td>
                        <td className="font-weight-bold">SIORG</td>
                        <td className="font-weight-bold">Descrição</td>
                        <td className="font-weight-bold">Estado</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.prepareComponents()}
                    </tbody>
                </Table>
                <Table bordered condensed="true" hover>
                    <thead>
                    <tr>
                        <td colSpan="4" className="font-weight-bold text-center">Histórico do Equipamento</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Data</td>
                        <td className="font-weight-bold">Local</td>
                        <td className="font-weight-bold">Tipo do Local</td>
                        <td className="font-weight-bold">Justificativa</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.historyItems()}
                    </tbody>
                </Table>
            </Container>

        );
    }

}


export default View;