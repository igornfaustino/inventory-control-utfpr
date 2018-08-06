import React from 'react';
import {Button, ButtonGroup, Container} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

import SubHeader from '../../components/SubHeader/SubHeader';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js.map';

import 'react-toastify/dist/ReactToastify.css';
import {PreviewRequisicao, REQUISICAO_CREATE, TableRequisicao} from ".";
import Recized from '../../components/Resized/Recized';

class Lista extends React.Component {
    CustomButtons = props => {
        return (
            <ButtonGroup>
                <Button
                    color={'success'}
                    size={'sm'}
                    onClick={() => {
                        this.props.history.push(REQUISICAO_CREATE.url)
                    }}>
                    Adicionar
                </Button>
            </ButtonGroup>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            purchases: [],
            purchase: {},
            toastID: null
        };
        this.onSelect = this.onSelect.bind(this);
    }

    load() {
        try {
            this.setState({
                toastID: toast.warn('Carregando Solicitações!', {
                    autoClose: 3000
                })
            });
            axios.get('/purchase/').then(response => {
                if (response.data.success) {
                    toast.update(this.state.toastID, {
                        render: 'Solicitações Carregadas',
                        type: toast.TYPE.SUCCESS,
                        autoClose: 1000
                    });

                    this.setState({
                        purchases: response.data.purchases
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
    onSelect(item, isSelect) {
        this.setState({
            purchase: item,
            isSelect
        })
    }

    render() {
        let bottom = <PreviewRequisicao {...this.props} purchase={this.state.purchase}/>

        return (
            <Recized
                isSelect={this.state.isSelect}
                bottom={
                    bottom
                }>
                <Container>
                    <SubHeader {...this}
                               title={'Lista de Compras'}
                    />
                    <br/>
                    <TableRequisicao
                        data={this.state.purchases}
                        options={{
                            search: true,
                            pagination: true,
                            selectRow: {
                                mode: 'radio',
                                clickToSelect: true,
                                onSelect: this.onSelect,
                            },
                            searchPlaceholder: 'Buscar',
                            options: {
                                btnGroup: this.CustomButtons,
                                noDataText: "Não há compras!"
                            }
                        }}
                    />
                </Container>
            </Recized>

        );
    }
}

export default Lista;