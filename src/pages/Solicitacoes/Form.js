import React from 'react';
import {Button, Collapse, ButtonGroup, Container, Form, Table, Col,Row} from 'reactstrap';
import '../../components/FormatedInput/FormatedInput';
import FormatedInput from "../../components/FormatedInput/FormatedInput";

import PropTypes from 'prop-types';
import axios from 'axios'

import {toast} from 'react-toastify';
import Quotacao from './Quotacao';
import {getUser} from '../../utils/userLogin';
import MyModal from "./Modal";


class FormTemplate extends React.Component {
    valid = () => {
        let ok = true;
        /*Campos para validação*/
        let list = ['description', 'qtd', 'justification'];
        if (!!this.state.requisition._id) {
            list.push('itemType');
            list.push('changeJustification');
        }

        list.forEach(item => {
            if (!this.state.valid[item]) {
                ok = false
            }
        });
        return ok;
    };
    //Function to get item itemType
    getType = () => {
        axios.get('/type').then(response => {
            if (response.status === 200) {
                let type = response.data.type.map((_type) => _type.type);

                this.setState({
                    typeList: type
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            quotation: {
                requisitionType: '',
                arquivo: '',
                reference: '',
                price: ''
            },
            changed: null,
            collapseQuotation: false,
            requisition: {
                qtd: 0,
                siorg: '',
                description: '',
                quotation: [],
                status: '',
                justification: '',
            },
            tableHeader: {backgroundColor: '#515053', color: 'white'},
            disableSubmit: false,
            validate: false,
            valid: {}
        };
        this.onChange = this.onChange.bind(this);
        this.render = this.render.bind(this);
        this.onChangeQuotation = this.onChangeQuotation.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        this.onClickQuotationClear = this.onClickQuotationClear.bind(this);
        this.onClickQuotationConfirm = this.onClickQuotationConfirm.bind(this);

        this.submit = this.submit.bind(this);
        this.notNullValidate = this.notNullValidate.bind(this);
        this.collapseQuotation = this.collapseQuotation.bind(this);
    }

    collapseQuotation() {
        this.setState({
            collapseQuotation: !this.state.collapseQuotation
        })
    }

    submit() {
        this.setState({
            validate: true,
            disableSubmit: true
        });
        setTimeout(() => {
            this.setState({
                disableSubmit: false
            });
            if (this.valid()) {
                this.props.onSubmit();
            } else {
                toast.error('Resolva os campos inválidos!')
            }
        }, 500);

    }

    onChange(event) {
        let requisition = this.state.requisition;
        requisition[event.target.name] = event.target.value;
        this.setState({
            requisition: requisition, changed: true
        });
        this.notNullValidate(event);
    }

    onUploadFile(event) {
        let quotation = this.state.quotation;
        quotation.arquivo = event.target.value;
        this.setState({quotation: quotation});

        let formData = new FormData();
        formData.append('file', event.target.files[0]);

        axios.post('/file/', formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            if (response.status === 201) {
                quotation.reference = response.data.file.filename;
                this.setState({quotation: quotation})
            }
        });

    }

    onClickQuotationConfirm() {
        let requisicao = this.state.requisition;
        requisicao.quotation = requisicao.quotation ? requisicao.quotation : [];
        let quotation = this.state.quotation;

        delete quotation.arquivo;

        requisicao.quotation.unshift(quotation);

        this.setState({
            requisition: requisicao
        });
        this.onClickQuotationClear()
    }

    onClickQuotationClear() {
        this.setState({
            quotation: {
                requisitionType: '',
                arquivo: '',
                reference: '',
                price: ''
            }
        })
    }

    onChangeQuotation(event) {
        let quotation = this.state.quotation;

        quotation[event.target.name] = event.target.value;
        /* Inserir automaticamente requisitionType para URL caso o usuario preencha o reference */
        if (event.target.name === 'reference')
            quotation['requisitionType'] = 'URL';

        this.setState({
            quotation: quotation
        });
    }

    componentDidMount() {
        let requisition = this.state.requisition;
        requisition.requesterId = getUser();
        this.setState({requisition})
    }

    componentWillMount() {

        if (this.props.requisition) {
            this.setState({
                requisition: this.props.requisition,
                valid: {
                    description: true,
                    qtd: true,
                    justification: true,
                    itemType: this.props.requisition.itemType
                }
            });

            this.getType();
        }
    }

    notNullValidate(event) {
        let invalid = !this.state.requisition[event.target.name];
        let valid = this.state.valid;
        valid[event.target.name] = !invalid;
        this.setState({
            valid: valid
        });
    };
    CustomButtons = props => {
        return (
            <ButtonGroup>
                <MyModal
                    size={'md'}
                    header={'Adicionar Quotação'}
                    body={
                    <Form onSubmit={this.onClickQuotationConfirm}>
                        <FormatedInput
                            label={'Tipo'}
                            labelSize={4}
                            valueName={'requisitionType'}
                            valueType={'select'}
                            valuesOfSelect={['URL', 'PDF']}
                            invalid={false}
                            value={this.state.quotation.requisitionType}
                            onChange={this.onChangeQuotation}/>


                        {
                            /* Exibe Apenas quando o requisitionType da quotação for PDF for PDF */
                            this.state.quotation.requisitionType === 'PDF' ?
                                (<FormatedInput
                                        label={'Upload'}
                                        labelSize={4}
                                        valueName={'arquivo'}
                                        valueType={'file'}
                                        invalid={false}
                                        value={this.state.quotation.arquivo}
                                        onChange={this.onUploadFile}/>
                                ) :
                                (
                                    /* Não Exibe nada caso não for PDF */
                                    ''
                                )
                        }
                        <FormatedInput
                            placeholder='Referencia da cotação'
                            label={'Referência'}
                            labelSize={4}
                            valueName={'reference'}
                            valueType={'text'}
                            required={true}
                            disabled={this.state.quotation.requisitionType === 'PDF'}
                            invalid={false}
                            value={this.state.quotation.reference}
                            onChange={this.onChangeQuotation}/>

                        <FormatedInput
                            placeholder='R$:'
                            label={'Preço'}
                            labelSize={4}
                            valueName={'price'}
                            valueType={'number'}
                            required={true}
                            invalid={false}
                            value={this.state.quotation.price}
                            onChange={this.onChangeQuotation}/>

                        <Row>
                            <Col>
                            <Button color={'danger'} size={'md'} block
                                    onClick={this.onClickQuotationClear}>Limpar</Button>
                            </Col>
                            <Col>
                            <Button color={'success'} size={'md'} block
                                    type={'submit'}
                                    disabled={
                                        !this.state.quotation.price ||
                                        !this.state.quotation.reference
                                    }
                                    onClick={this.onClickQuotationConfirm}>Adicionar</Button>
                            </Col>
                        </Row>
                    </Form>
                }>
                    Adicionar nova quotação
                </MyModal>
            </ButtonGroup>
        );
    };

    render() {
        return (
            <Form onSubmit={this.submit}>
                <br/>

                {/*Nescessario em caso de editar Solicitaão*/}
                <FormatedInput
                    label={'Chave de Acesso'}
                    labelSize={3}
                    valueName={'_id'}
                    valueType={'text'}
                    required={false}
                    disabled={true}
                    invalid={false}
                    value={this.state.requisition._id}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder={'Digite o numero do Siorg caso possua!'}
                    label={'Siorg'}
                    labelSize={3}
                    valueName={'siorg'}
                    valueType={'text'}
                    required={false}
                    invalid={false}
                    value={this.state.requisition.siorg}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder={'Descrição detalhada sobre o material a ser solicitado!'}
                    label={'Descrição'}
                    labelSize={3}
                    valueName={'description'}
                    valueType={'textarea'}
                    required={true}
                    invalid={!this.state.valid.description && this.state.validate}
                    feedback={'Descreva os detalhes do produto desejado'}
                    value={this.state.requisition.description}
                    onChange={this.onChange}/>

                <FormatedInput
                    label={'Quantidade'}
                    labelSize={7}
                    inputSize={2}
                    valueName={'qtd'}
                    valueType={'number'}
                    required={true}
                    invalid={!this.state.valid.qtd && this.state.validate}
                    feedback={'É necessario pelo menos um item'}
                    value={this.state.requisition.qtd}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder={'Explique para qual finalidade ou porque é necessario esta solicitação!'}
                    label={'Justificativa'}
                    labelSize={3}
                    valueName={'justification'}
                    valueType={'textarea'}
                    required={true}
                    invalid={!this.state.valid.justification && this.state.validate}
                    feedback={'Explicação invalida!'}
                    value={this.state.requisition.justification}
                    onChange={this.onChange}/>

                <FormatedInput
                    label={'Tipo do Item'}
                    labelSize={6}
                    inputSize={3}
                    valueName={'itemType'}
                    valueType={'select'}
                    valuesOfSelect={this.state.typeList}
                    valueDefault={'Selecione'}
                    hidden={!this.state.requisition._id}
                    required={true}
                    invalid={!this.state.valid.itemType && this.state.validate}
                    feedback={'Escolha uma das opções!'}
                    value={this.state.requisition.itemType}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder='Justificativa para tal modificação'
                    label={'Motivo da Modificação'}
                    labelSize={3}
                    valueName={'changeJustification'}
                    valueType={'textarea'}
                    hidden={!this.state.requisition._id}
                    required={true}
                    invalid={!this.state.valid.changeJustification && this.state.validate}
                    feedback={'Descreva qual a finalidade da alteração'}
                    value={this.state.requisition.changeJustification}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder='Nenhum'
                    label={'Status'}
                    labelSize={3}
                    valueName={'status'}
                    valueType={'text'}
                    required={false}
                    disabled={true}
                    invalid={false}
                    value={this.state.requisition.status}
                    onChange={this.onChange}/>

                    <FormatedInput
                        placeholder='Justificativa de cotação'
                        label='Justificativa de cotação'
                        labelSize={3}
                        valueName={'priceJustification'}
                        valueType={'textarea'}
                        required={false}
                        disabled={false}
                        invalid={false}
                        value={this.state.requisition.priceJustification}
                        onChange={this.onChange}/>

                    <Quotacao quotation={this.state.requisition.quotation} CustomButtons={this.CustomButtons}/>

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
    requisition: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormTemplate;