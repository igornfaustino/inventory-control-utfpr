import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';

import SubHeader from '../../components/SubHeader/SubHeader';
import {toast} from 'react-toastify';

import FormTemplate from './Form';
import {ALMOXARIFADO_ALL, ALMOXARIFADO_CREATE} from "./index";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipment: {},
            toastID: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.history.location.state);
    }

    async onSubmit() {
        this.setState({
            toastID: toast('Verificando a validade da Compra!')
        });
        let success = true;

        for (let i = 0; i < this.state.equipment.quantity; i++) {
            let response = await axios.post('/equipment/', this.state.equipment);

            if (!response.data.success) {
                success = false;
                console.warn('Falhou!')
            }
        }
        if (success) {
            toast.update(this.state.toastID, {
                render: 'Produtos adicionado!',
                type: toast.TYPE.SUCCESS,
                autoClose: 2000
            });
            toast('Redirecionamento da página em 5 segundos!', {
                onClose: () => {
                    this.props.history.push({
                        pathname: ALMOXARIFADO_ALL.url
                    })
                },
                autoClose: 5000
            });
        }
    }

    render() {
        return (
            <Container>
                <SubHeader {...this}
                           back={ALMOXARIFADO_ALL}
                           title={ALMOXARIFADO_CREATE.page}
                />
                <FormTemplate
                    onSubmit={this.onSubmit}
                    equipment={this.state.equipment}>
                    Adicionar Equipamento
                </FormTemplate>
            </Container>
        );
    }
}


export default Create;