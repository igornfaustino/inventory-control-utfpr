import React from 'react';
import {Button, Container, Form} from 'reactstrap';
import FormatedInput from "../../components/FormatedInput/FormatedInput";
import PropTypes from 'prop-types';
import './user.css';
import {toast} from 'react-toastify';


class FormTemplateLogin extends React.Component {
    valid = () => {
        let ok = true;
        /*Campos para validação*/
        let list = ['email', 'password'];

        list.forEach(item => {
            if (!this.state.valid[item]) {
                ok = false
            }
        });
        return ok;
    };
    register = () => {
        this.props.history.push({
            pathname: '/usuario/novo'
        });
    };

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            user: {},
            disableSubmit: false,
            validate: false,
            valid: {},
            hidden: true
        };
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.notNullValidate = this.notNullValidate.bind(this);
    }

    componentWillMount() {

        if (this.props.user) {
            this.setState({
                user: this.props.user,
            });

        }
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
        }, 100);

    }

    onChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({
            user: user
        });
        this.notNullValidate(event);
    }

    notNullValidate(event) {
        let invalid = !this.state.user[event.target.name];
        if (!invalid) {
            switch (event.target.name) {
                case ('password'): {
                    invalid = this.state.user.password.length < 6;
                    break;
                }
                case ('email'): {
                    let a = this.state.user.email.indexOf('@');
                    let b = this.state.user.email.indexOf('.', a);
                    invalid = (a === -1 || b === -1 || this.state.user.email.length === b + 1);
                    break;
                }
                default:{

                }
            }
        }
        let valid = this.state.valid;
        valid[event.target.name] = !invalid;
        this.setState({
            valid: valid
        });
    };

    render() {
        return (
            <Form onSubmit={this.submit} className="form-signin form">
                <h1 className="h3 mb-3 font-weight-normal">{this.props.header}</h1>
                <br/>
                <FormatedInput
                    placeholder={'Email'}
                    valueName={'email'}
                    valueType={'email'}
                    notLabel
                    invalid={!this.state.valid.email && this.state.validate}
                    feedback={'Email deve possuir ____@__._!'}
                    value={this.state.user.email}
                    onChange={this.onChange}/>

                <FormatedInput
                    placeholder={'Senha'}
                    valueName={'password'}
                    notLabel
                    valueType={this.state.hidden ? 'password' : 'text'}
                    invalid={!this.state.valid.password && this.state.validate}
                    feedback={[
                        {
                            msg: 'A senha deve possuir no minimo 6 caracteres',
                            valid: (this.state.password && this.state.password.length >= 6)
                        },
                    ]}
                    value={this.state.user.password}
                    onChange={this.onChange}/>

                <Container>
                    <Button className="btn btn-info btn-color"
                            onClick={this.submit}
                            type={'submit'}
                            disabled={this.state.disableSubmit}
                            block size="lg">{this.props.children}</Button>
                    <br/>
                    <Button onClick={this.register}
                            color="link">Não Tem Cadastro? Cadastre-se.</Button>

                </Container>
                <p className="mt-3 mb-1 text-muted">&copy; 2018</p>
            </Form>
        );
    }
}

FormTemplateLogin.PropTypes = {
    user: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormTemplateLogin;