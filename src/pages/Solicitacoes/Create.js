import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import {FormSolicitacao, SOLICITACOES_ALL, SOLICITACOES_VIEW} from '.';

import SubHeader from '../../components/SubHeader/SubHeader';
import {toast} from 'react-toastify';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requisition: {},
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
                            pathname: SOLICITACOES_VIEW.url,
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
                <SubHeader {...this}
                           back={SOLICITACOES_ALL}
                           title={'Nova Solicitação'}
                />
                <FormSolicitacao
                    onSubmit={this.onSubmit}
                    requisition={this.state.requisition}>
                    Adicionar Solicitação
                </FormSolicitacao>
            </Container>
        );
    }
}


export default Create;