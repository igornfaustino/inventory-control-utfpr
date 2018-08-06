import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';

import SubHeader from '../../components/SubHeader/SubHeader';
import {toast} from 'react-toastify';

import FormTemplate from './Form';
import {REQUISICAO_ALL, REQUISICAO_VIEW} from "./index";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: {},
            toastID: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    onSubmit(purchase) {
        this.setState({
            toastID: toast('Verificando a validade da Compra!')
        });
        axios.post('/purchase', purchase).then(response => {
            if (response.data.success) {
                toast.update(this.state.toastID, {
                    render: 'Compra cadastrada!',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
                toast('Redirecionamento da página em 5 segundos!', {
                    onClose: () => {
                        this.props.history.push({
                            pathname: REQUISICAO_VIEW,
                            state: {
                                purchase: response.data.purchase
                            }
                        })
                    },
                    autoClose: 5000
                });

                this.setState({
                    purchase: response.data.purchase
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
                           back={{page: 'Lista de compras', url: REQUISICAO_ALL}}
                           title={'Novo pedido de compra'}
                />
                <FormTemplate
                    onSubmit={this.onSubmit}>
                    Adicionar Compra
                </FormTemplate>
            </Container>
        );
    }
}


export default Create;