import React from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

import SubHeader from '../../components/SubHeader/SubHeader';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';

import 'react-toastify/dist/ReactToastify.css';
import {TableUser} from ".";

class Lista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            toastID: null
        };
    }

    load() {
        try {
            this.setState({
                toastID: toast.warn('Carregando usuarios!', {
                    autoClose: 3000
                })
            });
            axios.get('/user/').then(response => {
                if (response.data.success) {
                    toast.update(this.state.toastID, {
                        render: 'Usuarios Carregados',
                        type: toast.TYPE.SUCCESS,
                        autoClose: 1000
                    });

                    this.setState({
                        ...response.data
                    });
                }
                else {
                    toast.update(this.state.toastID, {
                        render: (
                            <center>
                                <h5>Falha ao se comunicar com o Banco de dados</h5>
                                <p>Código de erro {response.status}</p>
                                <p>Tentando Novamente em 5 segundos</p>
                            </center>),
                        type: toast.TYPE.ERROR,
                        onClose: () => {
                            this.load()
                        },
                        autoClose: 5000
                    });

                }
            });
        } catch (e) {
            console.error(e)
        }

    }

    componentWillMount() {
        this.load();
    }


    render() {
        return (
                <Container>
                    <SubHeader {...this}
                               title={'Todos os usuarios'}
                    />
                    <br/>
                    <TableUser
                        data={this.state.users}
                        options={{
                            search: true,
                            pagination: true,
                            options: {
                                noDataText: "Não há solicitações!"
                            }
                        }}
                    />
                </Container>
        );
    }
}

export default Lista;