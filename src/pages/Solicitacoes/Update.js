import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import {FormSolicitacao} from '.';

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
        let requisition = this.state.requisition;
        requisition.status= 'Em verificação pelo administrador';

        axios.put('/requisition/', requisition).then(response => {
            if (response.data.success) {
                toast.update(this.state.toastID, {
                    render: 'Solicitação atualizada com sucesso!',
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
                <SubHeader {...this}
                           back={{page: 'Solicitação', url: '/solicitacao/'}}
                           title={'Atualizar Solicitação'}
                />
                <FormSolicitacao
                    onSubmit={this.onSubmit}
                    requisition={this.state.requisition}>
                    Atualizar Solicitação
                </FormSolicitacao>
            </Container>
        );
    }
}


export default Create;