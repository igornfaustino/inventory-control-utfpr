import React from 'react';
import {Prompt} from 'react-router'
import {
    Button,
    Col,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import {ClipLoader} from 'react-spinners';
import moment from 'moment';

import SubHeader from '../SubHeader/SubHeader';

import './FormRequest.css';
import axios from 'axios'

export default class FormRequest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // edit fields
            status: 'Pendente',
            changeJustification: '',
            itemType: 'Eletronico',
            priceJustification: '',

            // Normal fields
            siorg: '',
            description: '',
            quantity: '',
            justify: '',
            quotation: [],

            // Validate fields
            formErrors: {description: '', quantity: '', justify: '',},
            descriptionValid: false,
            quantityValid: false,
            justifyValid: false,
            formValid: false,
            edit: false,
            changeJustificationValid: false,
            // Validate Price
            validPrice: {
                min: 0.6,
                max: 1.3,
                average: 0
            },

            // Modal
            modal: false,
            loadingHistory: true,
            history: []
        };
    }


    componentWillMount() {
        if (this.props.requisition) {
            let price = this.state.validPrice;

            let quotation = this.props.requisition.quotation;

            price.average = quotation.map((x) => parseFloat(x.price)).reduce((a, b) => a + b, 0) / quotation.length;
            // console.log( this.props.requisition)
            this.setState({
                    siorg: this.props.requisition.siorg,
                    description: this.props.requisition.description,
                    quantity: this.props.requisition.qtd,
                    justify: this.props.requisition.justification,
                    quotation: this.props.requisition.quotation,
                    status: this.props.requisition.status,
                    itemType: this.props.requisition.itemType,
                    priceJustification: this.props.requisition.priceJustification,
                    edit: true,
                    _id: this.props.requisition._id,
                    descriptionValid: true,
                    quantityValid: true,
                    justifyValid: true,
                    formValid: true,
                    validPrice: price,
                }
            )
        }
        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                siorg: this.props.location.state.product.siorg,
                description: this.props.location.state.product.description,
                quantity: this.props.location.state.product.qtd,
                descriptionValid: true,
                quantityValid: true,

            });
        }
    }

    handleQuotationChange = (idx) => (evt) => {
        const quotation = this.state.quotation.map((quotation, sidx) => {
            if (idx !== sidx) return quotation;
            if (evt.target.name === 'requisitionType') {
                return {...quotation, 'requisitionType': evt.target.value, 'reference': ''}
            } else {
                return {...quotation, [evt.target.name]: evt.target.value};
            }
        });
        let price = this.state.validPrice;

        price.average = quotation.map((x) => parseFloat(x.price)).reduce((a, b) => a + b, 0) / quotation.length;

        this.setState({
            quotation: quotation,
            validPrice: price
        });
    };

    handleRemoveQuotation = (idx) => () => {
        let quotation = this.state.quotation.filter((s, sidx) => idx !== sidx);

        let price = this.state.validPrice;

        price.average = quotation.map((x) => parseFloat(x.price)).reduce((a, b) => a + b, 0) / quotation.length;

        this.setState({
            quotation: quotation,
            validPrice: price
        });
    };

    handleAddQuotation = () => {
        this.setState({
            quotation: this.state.quotation.concat(
                [{
                    requisitionType: 'URL',
                    reference: '',
                    price: '',
                    rawFile: null,
                    file: ''
                }])
        });
    };

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value)
        });

    }

    saveRequest = async () => {
        if (!this.state.changeJustificationValid || !this.state.changeJustificationValid || !this.state.descriptionValid || !this.state.quantityValid || !this.state.justifyValid) {
            alert("Preencha todos os campos");
            return;
        }

        this.setState({
            descriptionValid: false,
            quantityValid: false,
            justifyValid: false,
            formValid: false,
            changeJustificationValid: false,
        });


        axios.put('/requisition/' + this.state._id, {
            siorg: this.state.siorg,
            description: this.state.description,
            justification: this.state.justify,
            qtd: this.state.quantity,
            status: this.state.status,
            changeJustification: this.state.changeJustification,
            priceJustification: this.state.priceJustification,
            itemType: this.state.itemType,
            quotation: await this.preparePriceEdit()
        }).then(res => {
            if (res.status === 200) {
                alert("Atualizado com sucesso");
                this.setState({
                    changeJustification: ''
                });
            } else {
                alert("Opss.. algo saiu errado");
                this.setState({
                    descriptionValid: true,
                    quantityValid: true,
                    justifyValid: true,
                    formValid: true,
                    changeJustificationValid: true,
                });
            }
        }).catch(err => {
            // console.log(err);
            alert("Opss.. algo saiu errado");
            this.setState({
                descriptionValid: true,
                quantityValid: true,
                justifyValid: true,
                formValid: true,
                changeJustificationValid: true,
            });
        });
    };
    validateQuotation = (quotation) => {
        let price = this.state.validPrice;
        if (!quotation.price)
            return 'Preço requerido';
        if (price.average * price.min > quotation.price)
            return 'Preço muito abaixo da média';
        else if (price.average * price.max < quotation.price)
            return 'Preço muito acima da média';
        else
            return ''
    };

    async preparePrice() {
        let prices = this.state.quotation;
        for (let i = 0; i < prices.length; i++) {
            if (prices[i].requisitionType.toLocaleUpperCase() === 'PDF') {
                let formData = new FormData();
                formData.append('file', prices[i].rawFile);
                const file = await axios.post('/file/', formData);
                prices[i].reference = file.data.fileId
            }
            delete prices[i].file;
            delete prices[i].rawFile
        }
        prices = prices.filter((price) => {
            return (price.reference !== '')
        });
        return prices
    }

    async preparePriceEdit() {
        let prices = this.state.quotation;
        for (let i = 0; i < prices.length; i++) {
            if (prices[i].rawFile) {
                let formData = new FormData();
                formData.append('file', prices[i].rawFile);
                const file = await axios.post('/file/', formData);
                prices[i].reference = file.data.fileId
            }
            delete prices[i].file;
            delete prices[i].rawFile
        }
        prices = prices.filter((price) => {
            return (price.reference !== '')
        });
        return prices
    }

    submitRequest = async () => {
        if (!this.state.descriptionValid || !this.state.quantityValid || !this.state.justifyValid) {
            alert("Preencha todos os campos");
            return;
        }

        this.setState({
            descriptionValid: false,
            quantityValid: false,
            justifyValid: false,
            formValid: false,
        });

        axios.post('/requisition/', {
            siorg: this.state.siorg,
            description: this.state.description,
            justification: this.state.justify,
            qtd: this.state.quantity,
            quotation: await this.preparePrice()
        }).then(res => {
            if (res.status === 200) {
                alert("Solicitação cadastrada");
                this.setState({
                    siorg: '',
                    description: '',
                    quantity: '',
                    justify: '',
                    quotation: [],
                    formErrors: {description: '', quantity: '', justify: ''},
                })
            } else {
                alert("Opss.. algo saiu errado");
                this.setState({
                    descriptionValid: true,
                    quantityValid: true,
                    justifyValid: true,
                    formValid: true,
                });
            }
        }).catch(err => {
            // console.log(err);
            alert("Opss.. algo saiu errado");
            this.setState({
                descriptionValid: true,
                quantityValid: true,
                justifyValid: true,
                formValid: true,
            });
        });
    };

    // File Functions
    onChangeFile = (idx) => (evt) => {
        let quotation = this.state.quotation;
        quotation[idx].rawFile = evt.target.files[0];
        this.setState({
            quotation
        });
    };

    fileDownload = (file) => () => {
        axios.get('/file/' + file, {
            responseType: 'blob'
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file + '.pdf');
            document.body.appendChild(link);
            link.click();
        })
    };

    fileDelete = (idx) => () => {
        let quotation = this.state.quotation;
        let file = quotation[idx].reference;
        axios.delete('/file/' + file).then(res => {
            if (res.status === 200) {
                quotation[idx].reference = '';
                this.setState({
                    quotation
                })
            }
        });
    };

    //--------- Validation functions --------------

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let descriptionValid = this.state.descriptionValid;
        let quantityValid = this.state.quantityValid;
        let justifyValid = this.state.justifyValid;
        let changeJustificationValid = this.state.changeJustificationValid;

        switch (fieldName) {
            case 'description':
                descriptionValid = value.length >= 0;
                fieldValidationErrors.description = descriptionValid ? '' : ' Campo deve ser preenchido!';
                break;
            case 'quantity':
                quantityValid = value > 0;
                fieldValidationErrors.quantity = quantityValid ? '' : ' is invalid';
                break;
            case 'justify':
                justifyValid = value.length >= 0;
                fieldValidationErrors.justify = justifyValid ? '' : ' is invalid';
                break;
            case 'changeJustification':
                changeJustificationValid = value.length >= 0;
                fieldValidationErrors.justify = changeJustificationValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            descriptionValid: descriptionValid,
            quantityValid: quantityValid,
            justifyValid: justifyValid,
            changeJustificationValid: changeJustificationValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.descriptionValid && this.state.quantityValid
            && this.state.justifyValid

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


    // Modal functions
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    getHistory = () => {
        this.toggle();
        this.setState({
            loadingHistory: true
        });
        axios.get('/requisition/' + this.props.requisition._id).then((res) => {
            this.setState({
                history: res.data.requisition.history,
                loadingHistory: false
            })
        })
    };

    render() {
        const {descriptionValid, quantityValid, justifyValid} = this.state;

        // Only shows if in edit screen
        const edit = this.state.edit ? (
            <div>
                <FormGroup row style={marginRight}>
                    <Label for="descriptionArea" sm={2}>Status:</Label>
                    <Col sm={7}>
                        <Input type="select" name="status" id="status" onChange={(event) => this.handleUserInput(event)}
                               value={this.state.status}>
                            <option value="Pendente">Pendente</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Em estoque">Em estoque</option>
                            {/* <option>5</option> */}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row style={marginRight}>
                    <Label for="descriptionArea" sm={2}>Tipo do Item:</Label>
                    <Col sm={7}>
                        <Input type="select" name="itemType" id="status"
                               onChange={(event) => this.handleUserInput(event)} value={this.state.itemType}>
                            <option value="Eletronico">Eletronico</option>
                            <option value="Escolar">Escolar</option>
                            {/* <option>5</option> */}
                        </Input>
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row style={marginRight}>
                    <Label for="justifyArea" sm={2}>Justificativa para a cotação:</Label>
                    <Col sm={7}>
                        <Input value={this.state.priceJustification} type="textarea" id="justifyArea"
                               name="priceJustification" onChange={(event) => this.handleUserInput(event)}
                               placeholder="Adicione uma justificativa caso necessario.."/>
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row style={marginRight}>
                <p style={{ marginTop: "10px", color: "red" }}>*</p>
                    <Label for="justifyArea" sm={2}>Motivo da Modificação:</Label>
                    <Col sm={7}>
                        <Input value={this.state.changeJustification} type="textarea" id="justifyArea"
                               name="changeJustification" onChange={(event) => this.handleUserInput(event)}
                               placeholder="Justificativa para tal modificação"/>
                    </Col>
                </FormGroup>
            </div>
        ) : null;

        const historyBtn = this.state.edit ? (
            <Button style={{marginBottom: '5px', marginRight: '7px'}} onClick={this.getHistory} color="primary"
                    className="btn btn-primary">Historico de Alterações</Button>
        ) : null;


        // History (Modal)
        let history;
        if (this.state.loadingHistory) {
            history = (<div className='sweet-loading' style={{display: 'flex', justifyContent: 'center', margin: 100}}>
                <ClipLoader
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>)
        } else {
            history = this.state.history.map((value) => {
                return (
                    <div key={value._id}>
                        <p><span
                            style={{fontWeight: 'bold'}}>Justificativa da Alteração:</span> {value.changeJustification}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Data de Alteração:</span> {moment(value.date).format("DD/MM/YYYY")}
                        </p>
                        <hr/>
                        <p><span
                            style={{fontWeight: 'bold'}}>Siorg:</span> {(value.siorg && value.siorg !== '') ? value.siorg : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Descrição:</span> {(value.description && value.description !== '') ? value.description : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Justificativa:</span> {(value.justification && value.justification !== '') ? value.justification : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Quantidade:</span> {(value.qtd && value.qtd !== '') ? value.qtd : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Status:</span> {(value.status && value.status !== '') ? value.status : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Tipo do Item:</span> {(value.itemType && value.itemType !== '') ? value.itemType : ' - '}
                        </p>
                        <p><span
                            style={{fontWeight: 'bold'}}>Justificativa da Cotação:</span> {(value.priceJustification && value.priceJustification !== '') ? value.priceJustification : ' - '}
                        </p>
                        <hr style={{border: '0', height: '1px', background: '#333'}}/>
                    </div>
                )
            })
        }


        // Render Page
        return (
            <div>
                <SubHeader
                    title={this.props.title}>
                </SubHeader>

                <Container>

                    <Prompt
                        when={descriptionValid || quantityValid || justifyValid}
                        message="tem certeza que deseja sair desta página? Todas as suas alterações serão perdidas"
                    />


                    {/* Start Form */}
                    <Form style={{
                        marginTop: 30
                    }}>
                        <FormGroup row style={marginRight}>
                        </FormGroup>
                        <div className={`form-group${this.errorClass(this.state.formErrors.description)}`}>
                            <FormGroup row style={marginRight}>
                                <Label sm={2}>Siorg:</Label>
                                <Col sm={7}>
                                    <Input value={this.state.siorg} type="text" name="siorg"
                                           onChange={(event) => this.handleUserInput(event)}
                                           placeholder="Numero do SIORG"/>
                                </Col>
                            </FormGroup>
                        </div>
                        <div className={`form-group${this.errorClass(this.state.formErrors.description)}`}>
                            <FormGroup row style={marginRight}>
                            <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                <Label for="descriptionArea" sm={2}>Descrição:</Label>
                                <Col sm={7}>
                                    <Input value={this.state.description} type="textarea" id="descriptionArea"
                                           name="description" onChange={(event) => this.handleUserInput(event)}
                                           placeholder="Descrição detalhada sobre o material a ser solicitado"/>
                                </Col>
                            </FormGroup>
                        </div>
                        <div className={`form-group
                 ${this.errorClass(this.state.formErrors.quantity)}`}>
                            <FormGroup row style={marginRight}>
                            <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                <Label for="quantityArea" sm={2}>Quantidade:</Label>
                                <Col sm={1}>
                                    <Input value={this.state.quantity} type="number" id="quantityArea" name="quantity"
                                           onChange={(event) => this.handleUserInput(event)}/>
                                </Col>
                            </FormGroup>
                        </div>
                        <div className={`form-group
                 ${this.errorClass(this.state.formErrors.justify)}`}>
                            <FormGroup row style={marginRight}>
                            <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                <Label for="justifyArea" sm={2}>Justificativa:</Label>
                                <Col sm={7}>
                                    <Input value={this.state.justify} type="textarea" id="justifyArea" name="justify"
                                           onChange={(event) => this.handleUserInput(event)}
                                           placeholder="Justificativa para tal solicitação"/>
                                </Col>
                            </FormGroup>
                        </div>

                        {/* Edit Fields */}
                        {edit}

                        <FormGroup row style={marginRight} className="margin-top-medium">
                            <Label sm={2}>Adicionar cotação</Label>
                            <Col sm={1}>
                                <Button color="success" onClick={this.handleAddQuotation}>Adicionar</Button>
                            </Col>
                        </FormGroup>

                        {/* Quotation */}
                        <Container className="margin-top-medium">
                            {this.state.quotation.map((quotation, idx) => {
                                if (quotation.requisitionType === 'URL') {
                                    return (
                                        <Container className="panel panel-default margin-left-huge" key={idx}>
                                            <hr/>
                                            <Row className="margin-top-small">
                                                <Col md="8">

                                                    <FormGroup row style={marginRight}>
                                                        <Label for="typeArea" sm={2}>Tipo:</Label>
                                                        <Col sm={2}>
                                                            <Input type="select" name="requisitionType" id="typeArea"
                                                                   value={quotation.requisitionType}
                                                                   onChange={this.handleQuotationChange(idx)}>
                                                                <option>URL</option>
                                                                <option>PDF</option>
                                                            </Input>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row style={marginRight}>
                                                        <Label for="referenceArea" sm={2}>URL:</Label>
                                                        <Col sm={5}>
                                                            <Input type="url" name="reference" id="referenceArea"
                                                                   placeholder={'Referência para cotação'}
                                                                   value={quotation.reference}
                                                                   onChange={this.handleQuotationChange(idx)}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row style={marginRight}>
                                                        <Label for="priceArea" sm={2}>Preço:</Label>
                                                        <Col sm={6}>
                                                            <Input type="text" name="price" id="priceArea" size={2}
                                                                   bsSize="sm"
                                                                   placeholder={'R$'}
                                                                   value={quotation.price}
                                                                   invalid={!!this.validateQuotation(quotation)}
                                                                   valid={!this.validateQuotation(quotation)}
                                                                   onChange={this.handleQuotationChange(idx)}
                                                            />
                                                            <FormFeedback>
                                                                {this.validateQuotation(quotation)}
                                                            </FormFeedback>
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    <Container>
                                                        <Button style={{
                                                            marginTop: '18%'
                                                        }} color="danger" type="button"
                                                                onClick={this.handleRemoveQuotation(idx)}>Remover</Button>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        </Container>
                                    )
                                } else {
                                    let file;
                                    if (quotation.reference === '') {
                                        file = (<FormGroup className="margin-left-small">
                                            <Input type="file" label="upload" accept=".pdf" name="file" id="fileButton"
                                                   onChange={this.onChangeFile(idx)}/>
                                        </FormGroup>)
                                    } else {
                                        file = (
                                            <div className="margin-left-small text-left">
                                                <p>Arquivo enviado com sucesso</p>
                                                <FormGroup row style={marginRight} className="padding">
                                                    <Button type="button" color="primary" className="my-btn-download"
                                                            onClick={this.fileDownload(quotation.reference)}>Download</Button>
                                                    <Button type="button" color="danger" className="my-btn-excluir"
                                                            onClick={this.fileDelete(idx)}>Excluir</Button>
                                                </FormGroup>
                                            </div>
                                        )
                                    }
                                    return (
                                        <Container className="panel margin-left-huge" key={idx}>
                                            <hr/>
                                            <Row className="margin-top-small">
                                                <Col md="8">
                                                    <FormGroup row style={marginRight}>
                                                        <Label for="typeArea" sm={2}>Tipo:</Label>
                                                        <Col sm={2}>
                                                            <Input type="select" name="requisitionType" id="typeArea"
                                                                   value={quotation.requisitionType}
                                                                   onChange={this.handleQuotationChange(idx)}>
                                                                <option>URL</option>
                                                                <option>PDF</option>
                                                            </Input>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row style={marginRight}>
                                                        <Label for="priceArea" sm={2}>Preço:</Label>
                                                        <Col sm={2}>
                                                            <Input type="text" name="price" id="priceArea"
                                                                   placeholder={'R$'}
                                                                   value={quotation.price}
                                                                   onChange={this.handleQuotationChange(idx)}
                                                            />
                                                        </Col>
                                                    </FormGroup>

                                                    {file}
                                                </Col>
                                                <Col md="4">
                                                    <Container>
                                                        <Button style={{
                                                            marginTop: '15%'
                                                        }} color="danger" type="button"
                                                                onClick={this.handleRemoveQuotation(idx)}>Remover</Button>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        </Container>
                                    )
                                }

                            })}
                        </Container>
                        {/* End Quotation */}
                    </Form>

                    <div align="right" className={'margin'}>
                        {historyBtn}
                        <Button type="submit" style={{marginBottom: '5px'}} color="secondary"
                                className="btn btn-primary"
                                disabled={!this.state.formValid}
                                onClick={this.state.edit ? this.saveRequest : this.submitRequest}>
                            {this.state.edit ? 'Salvar Alterações' : 'Enviar Solicitação'}
                        </Button>
                    </div>


                    {/* MODAL */}
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Historico de alterações</ModalHeader>
                        <ModalBody>
                            <div style={{
                                overflowY: 'auto',
                                height: '500px',
                            }}>
                                {history}
                            </div>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        );
    }
}

const marginRight = {
    marginRight: 0
};