import React from 'react';
import {Container} from 'reactstrap';
import {FormLoginUser} from '.';
import {toast} from 'react-toastify';
import './user.css';
import axios from 'axios';

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: {},
            toastID: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    onSubmit() {
        this.setState({
            toastID: toast('Verificando a validade da Solicitação!')
        });
        console.log(this.state)
        axios.post('authenticate', this.state.user).then(response => {
            if (response.data.success) {
                localStorage.setItem("admin", response.data.user.admin);
                localStorage.setItem("user", response.data.user.name);
                localStorage.setItem("user_id", response.data.user.id);
                localStorage.setItem("token", response.data.token);
                axios.defaults.headers = {
                    "Authorization": response.data.token
                };

                toast.update(this.state.toastID, {
                    render: (
                        <center>
                            <p>Usuario encontrado:</p>
                            <p>Logado como {response.data.user.admin ? 'Administrador' : 'Usuario'}</p>
                        </center>
                    ),
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
                toast('Redirecionamento da página em 1 segundos!', {
                    onClose: () => {
                        this.props.history.push({
                            pathname: '/',
                            state: {
                                user: response.data.user
                            }
                        })
                    },
                    autoClose: 1000
                });
            }
            else {
                toast.update(this.state.toastID, {
                    render: <center><p>{response.data.msg}</p></center>,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        return (
            <Container>
                <div className="text-center body">
                    <FormLoginUser
                        {...this.props}
                        onSubmit={this.onSubmit}
                        header={'Login'}
                        user={this.state.user}>
                        Entrar
                    </FormLoginUser>
                </div>
            </Container>
        );
    }
}


export default Login;