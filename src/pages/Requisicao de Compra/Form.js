import React from 'react';
import {Button, ButtonGroup, Form, Row} from 'reactstrap';
import '../../components/FormatedInput/FormatedInput';
import FormatedInput from "../../components/FormatedInput/FormatedInput";

import PropTypes from 'prop-types';
import axios from 'axios'
import {TableSolicitacao} from "../Solicitacoes";
import MyModal from './Modal';

import {toast} from 'react-toastify';
import {getUser} from '../../utils/userLogin';
import moment from 'moment'

class FormTemplate extends React.Component {
    valid = () => {
        let ok = true;
        /*Campos para validação*/
        let list = ['management', 'requisitionDate', 'sector', 'UGR'];

        list.forEach(item => {
            if (!this.state.valid[item]) {
                ok = false
            }
        });
        return ok;
    };
    //Function to get Management
    getManagement = () => {
        axios.get('/management').then(response => {
            if (response.status === 200) {
                let management = response.data.management.map(item => item.management);
                this.setState({
                    managementList: management
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };
    //Function to get UGR
    getUGR = () => {
        axios.get('/ugr').then(response => {
            if (response.status === 200) {
                let UGR = response.data.ugr.map(item => item.ugr);

                this.setState({
                    UGRList: UGR
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };
    //Function to get sector
    getSector = () => {
        axios.get('/sector').then(response => {
            if (response.status === 200) {
                let sector = response.data.sector.map(item => item.sector);

                this.setState({
                    sectorList: sector
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };
    CustomButtons = props => {
        return (
            <ButtonGroup>
                <MyModal
                    header={
                        <span>Adicionar pedido a Compra</span>
                    }
                    body={
                        <TableSolicitacao
                            data={this.state.requisitions}
                            select={this.state.purchase.requisitionItems.map(item => item.item)}
                            options={{
                                search: true,
                                pagination: true,
                                hover: true,
                                selectRow: {
                                    mode: 'radio',
                                    clickToSelect: true,
                                    onSelect: this.onSelect,
                                },
                                searchPlaceholder: 'Buscar',
                                options: {
                                    noDataText: "Não há requisição!"
                                }
                            }}/>
                    }
                >
                    Incluir um novo pedido
                </MyModal>
            </ButtonGroup>
        );
    };
    now = () => {
        this.setState({
            purchase: {...this.state.purchase, requisitionDate: moment(Date()).format('YYYY-MM-DD')},
            valid: {...this.state.valid, requisitionDate: true}
        })
    };

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            purchase: {},
            tableHeader: {backgroundColor: '#515053', color: 'white'},
            disableSubmit: false,
            validate: false,
            valid: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectToRemove = this.onSelectToRemove.bind(this);

        this.submit = this.submit.bind(this);
        this.notNullValidate = this.notNullValidate.bind(this);
    }

    load() {
        if (this.state.purchase._id) {
            this.setState({
                valid: {management: true, requisitionDate: true, sector: true, UGR: true}
            })
        }

        axios.get('/requisitions').then(response => {
            if (response.data.success) {
                this.setState({
                    ...response.data
                })
            }
        })
    }

    submit() {
        this.setState({
            validate: true,
            disableSubmit: true
        });

        if (this.valid()) {
            this.props.onSubmit(this.state.purchase);
        } else {
            toast.error('Resolva os campos inválidos!')
        }

    }

    onChange(event) {
        let purchase = this.state.purchase;
        purchase[event.target.name] = event.target.value;
        this.setState({
            purchase: purchase, changed: true
        });
        this.notNullValidate(event);
    }

    componentWillMount() {
        let purchase = this.props.purchase;
        if (purchase) {
            this.setState({
                purchase,
                valid: {management: false, requisitionDate: false, sector: false, UGR: false}
            });
        }
        else {
            this.setState({
                purchase: {requisitionItems: []}
            })

        }
        this.getSector();
        this.getUGR();
        this.getManagement();
    }

    componentDidMount() {
        let purchase = this.state.purchase;
        purchase.requester = getUser();
        this.load();
    }

    notNullValidate(event) {
        let invalid = !this.state.purchase[event.target.name];
        let valid = this.state.valid;
        valid[event.target.name] = !invalid;
        this.setState({
            valid: valid
        });
    };

    onSelect(item, isSelect) {
        if (!isSelect) {
            let purchase = this.state.purchase;

            purchase.requisitionItems.push({
                item: item,
                itemSupplier: null,
                qtdReceived: 0
            });
            this.setState({
                purchase
            })
        }
    }

    onSelectToRemove(item, isSelect) {
        if (!isSelect) {
            let purchase = this.state.purchase;

            purchase.requisitionItems = purchase.requisitionItems.filter(req => {
                return req.item._id !== item._id
            });

            this.setState({
                purchase
            })
        }
    }


    render() {
        return (
            <Form onSubmit={this.submit}>
                <br/>
                <Row>
                    <FormatedInput
                        label={'Chave de Acesso'}
                        labelSize={3}
                        valueName={'_id'}
                        valueType={'text'}
                        required={false}
                        hidden
                        disabled={true}
                        invalid={false}
                        value={this.state.purchase._id}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Requisitante'}
                        labelSize={3}
                        valueName={'requester'}
                        valueType={'text'}
                        required={false}
                        disabled={true}
                        hidden
                        invalid={false}
                        value={this.state.purchase.requester}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Número do pedido'}
                        labelSize={2}
                        valueName={'number'}
                        valueType={'text'}
                        required={false}
                        invalid={false}
                        disabled={!!this.state.purchase._id}
                        value={this.state.purchase.number}
                        onChange={this.onChange}/>


                    <FormatedInput
                        label={'Data do pedido'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'requisitionDate'}
                        valueType={'date'}
                        invalid={!this.state.valid.requisitionDate && this.state.validate}
                        required={true}
                        feedback={'Descreva os detalhes do produto desejado'}
                        value={this.state.purchase._id?moment(this.state.purchase.requisitionDate).format('YYYY-MM-DD'): this.state.purchase.requisitionDate}
                        option={
                            <Button size={'sm'} block color={'info'} style={{marginTop: '5px'}}
                                    onClick={this.now}>Hoje</Button>
                        }
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Gestão'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'management'}
                        valueType={'select'}
                        valuesOfSelect={this.state.managementList}
                        valueDefault={'Selecione'}
                        required={true}
                        invalid={!this.state.valid.management && this.state.validate}
                        feedback={'Escolha uma das opções!'}
                        value={this.state.purchase.management}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Setor'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'sector'}
                        valueType={'select'}
                        valuesOfSelect={this.state.sectorList}
                        valueDefault={'Selecione'}
                        required={true}
                        invalid={!this.state.valid.sector && this.state.validate}
                        feedback={'Escolha uma das opções!'}
                        value={this.state.purchase.sector}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'UGR'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'UGR'}
                        valueType={'select'}
                        valuesOfSelect={this.state.sectorList}
                        valueDefault={'Selecione'}
                        required={true}
                        invalid={!this.state.valid.UGR && this.state.validate}
                        feedback={'Escolha uma das opções!'}
                        value={this.state.purchase.UGR}
                        onChange={this.onChange}/>

                </Row>


                <TableSolicitacao
                    data={this.state.purchase.requisitionItems.map(item => item.item)}
                    options={{
                        hover: true,
                        selectRow: {
                            mode: 'radio',
                            clickToSelect: true,
                            onSelect: this.onSelectToRemove,
                        },
                        options: {
                            btnGroup: this.CustomButtons,
                            noDataText: "Não há pedidos para esta compra!"
                        }
                    }}/>

                <br/>
                <div>
                    <Button className="btn btn-success btn-color" type="Submit"
                            onClick={this.submit}
                            disabled={this.state.disableSubmit}
                            block size="lg">{this.props.children}</Button>
                </div>
            </Form>
        )
            ;
    }
}

FormTemplate.PropTypes = {
    purchase: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormTemplate;