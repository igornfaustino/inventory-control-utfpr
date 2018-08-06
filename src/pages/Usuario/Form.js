import React from 'react';
import {Button, Form} from 'reactstrap';
import FormatedInput from "../../components/FormatedInput/FormatedInput";
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import './user.css';


class FormTemplate extends React.Component {
    valid = () => {
        let ok = true;
        /*Campos para validação*/
        let list = ['name', 'email', 'password', 'password2'];

        list.forEach(item => {
            if (!this.state.valid[item]) {
                ok = false
            }
        });
        return ok;
    };
    back = () => {
        this.props.history.goBack();
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

    componentDidMount() {
        console.log(this.props)
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

    componentWillMount() {

        if (this.props.user) {
            this.setState({
                user: this.props.user,
                valid: {
                    name: false,
                    email: false,
                    password: false,
                    password2: false
                }
            });

        }
    }

    notNullValidate(event) {
        let invalid = !this.state.user[event.target.name];
        if (!invalid) {
            switch (event.target.name) {
                case ('password'): {
                    invalid = this.state.user.password.length < 6;
                    break;
                }
                case ('password2'): {
                    invalid = this.state.user.password2.length < 6 ||
                        this.state.user.password !== this.state.user.password2;
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
                    placeholder={'Nome'}
                    notLabel
                    valueName={'name'}
                    valueType={'text'}
                    invalid={!this.state.valid.name && this.state.validate}
                    feedback={'Digite um nome valido!'}
                    value={this.state.user.name}
                    onChange={this.onChange}/>

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

                <FormatedInput
                    placeholder={'Repita a Senha'}
                    valueName={'password2'}
                    notLabel
                    valueType={this.state.hidden ? 'password' : 'text'}
                    invalid={!this.state.valid.password2 && this.state.validate}
                    feedback={[
                        {
                            msg: 'A senha deve possuir no minimo 6 caracteres',
                            valid: (this.state.user.password2 && this.state.user.password2.length >= 6)
                        },
                        {
                            msg: 'As senhas devem ser igual',
                            valid: this.state.password !== this.state.password2
                        },
                    ]}
                    value={this.state.user.password2}
                    onChange={this.onChange}/>
                <br/>
                <div>
                    <Button className="btn btn-success btn-color" type="Submit"
                            onClick={this.submit}
                            disabled={this.state.disableSubmit}
                            block size="lg">{this.props.children}</Button>
                    {this.props.back ?
                        <Button className="btn btn-secondary btn-color"
                                onClick={this.back}
                                block size="lg">Voltar</Button> :
                        ''
                    }

                </div>
                <p className="mt-3 mb-1 text-muted">&copy; 2018</p>
            </Form>
        );
    }
}

FormTemplate.PropTypes = {
    requisition: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    back: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
};

export default FormTemplate;