import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';

import SubHeader from '../../components/SubHeader/SubHeader';
import {toast} from 'react-toastify';

import FormTemplate from './Form';
import {ALMOXARIFADO_ALL, ALMOXARIFADO_UPDATE, ALMOXARIFADO_VIEW} from "./index";

class Update extends React.Component {
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

    onMove({component, location, callback}) {
        axios.post('/equipments/' + component._id + '/move', location).then(response => {
            if (response.data.success) {
                callback();
            }
        }).catch(ex => {
            alert("Opss.. Algo saiu errado");
            console.error(ex, ex.response);
        })
    }

    onSubmit({autoSave, callback}) {
        if (!autoSave) {
            this.setState({
                toastID: toast('Verificando a validade da Compra!')
            });
        }

        axios.put('/equipment/', this.state.equipment).then(response => {

            if (!response.data.success) {
                console.warn('Falhou!')
            }
            else {
                if (!autoSave) {
                    toast.update(this.state.toastID, {
                        render: 'Equipamento atualizado!',
                        type: toast.TYPE.SUCCESS,
                        autoClose: 2000
                    });
                    toast('Redirecionamento da página em 5 segundos!', {
                        onClose: () => {
                            this.props.history.push({
                                pathname: ALMOXARIFADO_VIEW.url
                            })
                        },
                        autoClose: 5000
                    });
                }
                else {
                    callback();
                }
            }
        });

    }


    render() {
        return (
            <Container>
                <SubHeader {...this}
                           back={ALMOXARIFADO_ALL}
                           title={ALMOXARIFADO_UPDATE.page}
                />
                <FormTemplate
                    onSubmit={this.onSubmit}
                    onMove={this.onMove}
                    equipment={this.state.equipment}>
                    Atualizar Equipamento
                </FormTemplate>
            </Container>
        );
    }
}


export default Update;