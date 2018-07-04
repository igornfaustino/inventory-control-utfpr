import React from 'react';
import { Prompt } from 'react-router'
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';

import axios from 'axios';
import { validateCNPJ } from '../../utils/validadeCNPJ';

export default class NewSupplier extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cnpj: '',
            phone: '',
            number: '',
            street: '',
            city: '',
            state: '',
            country: '',


            formErrors: {
                name: '',
                cnpj: '',
                phone: '',
                number: '',
                street: '',
                city: '',
                state: '',
                country: '',

            },

            nameValid: false,
            cnpjValid: false,
            phoneValid: false,
            numberValid: false,
            streetValid: false,
            cityValid: false,
            stateValid: false,
            countryValid: false,
            formValid: false,
        }
    }

    //Funções para validação de dados
    //Todos os dados devem ser preenchidos e o cnpj validado pela função em utils/validadeCNJP.js 
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let cnpjValid = this.state.cnpjValid;
        let phoneValid = this.state.phoneValid;
        let numberValid = this.state.numberValid;
        let streetValid = this.state.streetValid;
        let cityValid = this.state.cityValid;
        let stateValid = this.state.stateValid;
        let countryValid = this.state.countryValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 0;
                fieldValidationErrors.name = nameValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'cnpj':
                var cnpjAux = validateCNPJ(value);
                cnpjValid = value.length >= 0 && cnpjAux;
                fieldValidationErrors.cnpj = cnpjValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'phone':
                phoneValid = value.length >= 0;
                fieldValidationErrors.phone = phoneValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'number':
                numberValid = value.length >= 0;
                fieldValidationErrors.number = numberValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'street':
                streetValid = value.length >= 0;
                fieldValidationErrors.street = streetValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'city':
                cityValid = value.length >= 0;
                fieldValidationErrors.city = cityValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'state':
                stateValid = value.length >= 0;
                fieldValidationErrors.state = stateValid ? '' : 'Campo deve ser preenchido!';
                break;
            case 'country':
                countryValid = value.length >= 0;
                fieldValidationErrors.country = countryValid ? '' : 'Campo deve ser preenchido!';
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            cnpjValid: cnpjValid,
            phoneValid: phoneValid,
            numberValid: numberValid,
            streetValid: streetValid,
            cityValid: cityValid,
            stateValid: stateValid,
            countryValid: countryValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.nameValid && this.state.cnpjValid && this.state.phoneValid && this.state.numberValid
                && this.state.streetValid && this.state.cityValid && this.state.stateValid && this.state.countryValid
        });
    }

    //função para pegar os dados digitados pelo usuário e passar para a função de validação
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        });

    }

    //Function to connect with the database and save a new equipment
    submitRequest = async () => {
        if (!this.state.nameValid || !this.state.cnpjValid || !this.state.phoneValid || !this.state.numberValid
            || !this.state.streetValid || !this.state.cityValid || !this.state.stateValid || !this.state.countryValid) {
            alert("Preencha todos os campos");
            return;
        }

        this.setState({
            nameValid: false,
            cnpjValid: false,
            phoneValid: false,
            numberValid: false,
            streetValid: false,
            cityValid: false,
            stateValid: false,
            countryValid: false,
            formValid: false,
        });

        // console.log(this.state)
        try {

            let res = await axios.post('/supplier/', {
                name: this.state.name,
                cnpj: this.state.cnpj,
                phone: this.state.phone,
                address: {
                    number: this.state.number,
                    street: this.state.street,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country
                }
            })
            if (res.status !== 201) {
                alert("Opss.. algo saiu errado");
                this.setState({
                    nameValid: true,
                    cnpjValid: true,
                    phoneValid: true,
                    numberValid: true,
                    streetValid: true,
                    cityValid: true,
                    stateValid: true,
                    countryValid: true,
                    formValid: true,
                });
            }

            this.setState({
                name: '',
                cnpj: '',
                phone: '',
                number: '',
                street: '',
                city: '',
                state: '',
                country: '',

                formErrors: { name: '', cnpj: '', phone: '', number: '', street: '', city: '', state: '', country: '' },

            });
            alert("Vendedor cadastrado")
        }
        catch (ex) {
            console.error(ex)
            alert("Opss.. algo saiu errado");
            this.setState({
                nameValid: true,
                cnpjValid: true,
                phoneValid: true,
                numberValid: true,
                streetValid: true,
                cityValid: true,
                stateValid: true,
                countryValid: true,
                formValid: true,
            });
        }
    }

    render() {

        const { nameValid, cnpjValid, phoneValid, numberValid, streetValid, cityValid, stateValid, countryValid } = this.state
        return (
            <Form style={{ marginLeft: '2%' }}>
                <FormGroup row>
                    <Label for="nameArea" sm={1}>Nome: </Label>
                    <Col sm={3}>
                        <Input value={this.state.name} type="textarea" name="name" id="nameArea" onChange={(event) => this.handleUserInput(event)} placeholder="Nome do Vendedor: " />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="cnpjArea" sm={1}>CNJP: </Label>
                    <Col sm={2}>
                        <Input value={this.state.cnpj} type="text" name="cnpj" id="cnpjArea" onChange={(event) => this.handleUserInput(event)} placeholder="CNPJ do Vendedor: " />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="phoneArea" sm={1}>Telefone: </Label>
                    <Col sm={2}>
                        <Input value={this.state.phone} type="text" name="phone" id="phoneArea" onChange={(event) => this.handleUserInput(event)} placeholder="Telefone do Vendedor: " />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="cityArea" sm={1}>Cidade: </Label>
                    <Col sm={3}>
                        <Input value={this.state.city} type="text" name="city" id="cityArea" onChange={(event) => this.handleUserInput(event)} placeholder="Cidade: " />
                    </Col>
                    <Label for="streetArea" sm={0}>Rua: </Label>
                    <Col sm={3}>
                        <Input value={this.state.street} type="text" name="street" id="streetArea" onChange={(event) => this.handleUserInput(event)} placeholder="Rua: " />
                    </Col>
                    <Label for="numberArea" sm={0}>Número: </Label>
                    <Col sm={1}>
                        <Input value={this.state.number} type="number" name="number" id="numberArea" onChange={(event) => this.handleUserInput(event)} placeholder="Nº: " />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="stateArea" sm={1}>Estado: </Label>
                    <Col sm={3}>
                        <Input value={this.state.state} type="text" name="state" id="stateArea" onChange={(event) => this.handleUserInput(event)} placeholder="Estado: " />
                    </Col>
                    <Label for="countryArea" sm={0}>País: </Label>
                    <Col sm={2}>
                        <Input value={this.state.country} type="text" name="country" id="contryArea" onChange={(event) => this.handleUserInput(event)} placeholder="País: " />
                    </Col>
                </FormGroup>
                <FormGroup row style={{ marginLeft: '61%', marginTop: '2%' }}>
                    <Button type="submit" color="success" disabled={!this.state.formValid} onClick={this.submitRequest}>
                        Cadastrar Produto
					</Button>
                </FormGroup>
            </Form>
        );
    }

}