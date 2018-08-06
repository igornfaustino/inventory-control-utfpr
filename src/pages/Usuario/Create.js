import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import {FormUser} from '.';
import {toast} from 'react-toastify';

import './user.css';

class Create extends React.Component {
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
        axios.post('/requisition/', this.state.requisition).then(response => {
            if (response.data.success) {
                toast.update(this.state.toastID, {
                    render: 'Solicitação Cadastrada!',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
                toast('Redirecionamento da página em 5 segundos!', {
                    onClose: () => {
                        this.props.history.push({
                            pathname: '/solicitacao/visualizar',
                            state: {
                                requisition: response.data.requisition
                            }
                        })
                    },
                    autoClose: 5000
                });

                this.setState({
                    requisition: response.data.requisition
                });
            }
            else {
                console.warn('Falhou!')
            }
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        return (
            <Container>
                <div className="text-center body">
                    <FormUser
                        {...this.props}
                        back
                        onSubmit={this.onSubmit}
                        header={'Cadastro'}
                        user={this.state.user}>
                        Cadastrar
                    </FormUser>
                </div>
            </Container>
        );
    }
}


export default Create;