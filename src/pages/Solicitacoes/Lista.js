import React from 'react';
import {Button, ButtonGroup, Container} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import {TableSolicitacao, PreviewSolicitacao} from '.'

import SubHeader from '../../components/SubHeader/SubHeader';

import 'react-toastify/dist/ReactToastify.css';

import Recized from '../../components/Resized/Recized';

class ListaSolicitacao extends React.Component {
    CustomButtons = props => {
        return (
            <ButtonGroup>
                <Button
                    color={'success'}
                    size={'sm'}
                    onClick={() => {
                        this.props.history.push('/solicitacao/nova')
                    }}>
                    Adicionar
                </Button>
            </ButtonGroup>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            requisitions: [],
            requisition: {requesterId: {}},
            isSelect: false,
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
            axios.get('/requisitions').then(response => {
                if (response.status === 201) {
                    toast.update(this.state.toastID, {
                        render: 'Solicitações Carregadas',
                        type: toast.TYPE.SUCCESS,
                        autoClose: 1000
                    });
                    this.setState({
                        requisitions: response.data.requisitions
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

    componentDidMount() {
        this.load();
    }

    onSelect(item, isSelect) {
        this.setState({
            requisition: item,
            isSelect
        })
    }

    render() {
        let bottom = <PreviewSolicitacao {...this.props} requisition={this.state.requisition}/>
        return (
            <Recized
                isSelect={this.state.isSelect}
                bottom={
                    bottom
                }>
                <Container>
                    <SubHeader {...this}
                               title={'Lista de Solicitações'}
                    />
                    <br/>
                    <TableSolicitacao data={this.state.requisitions} options={{
                        search: true,
                        pagination: true,
                        selectRow: {
                            mode: 'radio',
                            clickToSelect: true,
                            onSelect: this.onSelect,
                        },
                        searchPlaceholder:'Buscar',
                        options: {
                            btnGroup: this.CustomButtons,
                            noDataText: "Não há solicitações!"
                        }
                    }}/>
                    <br/>
                </Container>
            </Recized>
        )
    }
}

export default ListaSolicitacao;
