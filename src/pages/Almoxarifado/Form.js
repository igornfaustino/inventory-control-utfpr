import React from 'react';
import {Button, Col, Container, Form, Label, Row} from 'reactstrap';
import '../../components/FormatedInput/FormatedInput';
import FormatedInput from "../../components/FormatedInput/FormatedInput";
import PropTypes from 'prop-types';
import axios from 'axios'
import {SearchField} from 'react-bootstrap-table';

import {toast} from 'react-toastify';
import {getUser} from '../../utils/userLogin';
import MyModal from "./Modal";
import {TableAlmoxarifado} from "./index";

class FormTemplate extends React.Component {
    valid = () => {
        let ok = true;
        /*Campos para validação*/
        let list = [
            'siorg',
            'description',
            'origin',
            'equipmentType',
            'equipmentState'
        ];
        if (!this.state.equipment._id) {
            list.push('quantity');
        }

        list.forEach(item => {
            if (!this.state.valid[item]) {
                ok = false
            }
        });
        return ok;
    };
    onRowSelectToDelete = (item, isSelect) => {
        if (!isSelect) {
            this.setState({
                toastID: toast('Removendo componente do produto', {
                    onOpen: () => {
                        let equipment = this.state.equipment;
                        equipment.components = equipment.components.filter((x) => x._id !== item._id);
                        this.setState({
                            equipment: equipment
                        })
                    }
                })
            });
            this.props.onMove({
                component: item,
                location: {
                    justification: 'removendo equipamento!',
                    locationType: 'Componente de item',
                    location: 'Em Estoque'
                },
                callback: () => {
                    this.props.onSubmit({
                        autoSave: true, callback: () => {
                            toast.update(this.state.toastID, {
                                render: 'Componente removido!',
                                type: toast.TYPE.SUCCESS,
                                autoClose: 1000
                            })
                        }
                    })
                }
            })
            this.props.onSubmit({
                autoSave: true, callback: () => {
                    toast.update(this.state.toastID, {
                        render: 'Componente Removido!',
                        type: toast.TYPE.SUCCESS,
                        autoClose: 1000
                    })
                }
            })
        }
    };
    onRowSelect = (item, isSelect) => {
        if (!isSelect) {
            this.setState({
                toastID: toast('Adicionando componente ao produto', {
                    onOpen: () => {
                        let equipment = this.state.equipment;
                        equipment.components.push(item);
                        this.setState({
                            equipment: equipment
                        })
                    }
                })
            });
            this.props.onMove({
                component: item,
                location: {
                    justification: 'Adicionando equipamento ao produto',
                    locationType: 'Componente de item',
                    location: this.state.equipment._id
                },
                callback: () => {
                    this.props.onSubmit({
                        autoSave: true, callback: () => {
                            toast.update(this.state.toastID, {
                                render: 'Componente adicionado!',
                                type: toast.TYPE.SUCCESS,
                                autoClose: 1000
                            })
                        }
                    })
                }
            })
        }
    }
    getEquipments = () => {
        axios.get('/equipments').then(response => {
            if (response.data.success) {
                let equipments = response.data.equipments;

                this.setState({
                    availableComponents: equipments,
                });
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        });
    }
    //Function to get item status
    getStatus = () => {
        axios.get('/status').then(response => {
            if (response.status === 200) {
                let status = response.data.status.map(x => x.status);
                this.setState({
                    stateList: status
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    };

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            equipment: {},
            tableHeader: {backgroundColor: '#515053', color: 'white'},
            disableSubmit: false,
            validate: false,
            toastID: null,
            valid: {}
        };
        this.onChange = this.onChange.bind(this);

        this.submit = this.submit.bind(this);
        this.notNullValidate = this.notNullValidate.bind(this);
    }

    submit() {
        this.setState({
            validate: true,
            disableSubmit: true
        });
        setTimeout(() => {
            this.setState({
                disableSubmit: false
            });
            if (this.valid()) {
                this.props.onSubmit({autoSave: false});
            } else {
                toast.error('Resolva os campos inválidos!')
            }
        }, 500);

    }

    onChange(event) {
        let equipment = this.state.equipment;
        equipment[event.target.name] = event.target.value;
        this.setState({
            equipment, changed: true
        });
        this.notNullValidate(event);
    }

    componentWillMount() {
        let equipment = this.props.equipment;
        this.setState({equipment})
    }

    componentDidMount() {
        let equipment = this.state.equipment;
        equipment.buyer = getUser();
        equipment.solicitor = getUser();

        this.setState({
            equipment
        });
        let value = !!this.state.equipment._id
        this.setState({
            valid: {
                siorg: value,
                description: value,
                origin: value,
                equipmentType: value,
                equipmentState: value,
            }
        });
        this.getStatus();
        this.getEquipments();
    }

    notNullValidate(event) {
        let invalid = !this.state.equipment[event.target.name];
        let valid = this.state.valid;
        valid[event.target.name] = !invalid;
        this.setState({
            valid: valid
        });
    };

    render() {
        return (
            <Form onSubmit={this.submit}>
                <br/>
                <Row>
                    <FormatedInput
                        label={'Chave de Acesso'}
                        labelSize={3}
                        valueName={'_id'}
                        valueType={'text'}
                        required={false}
                        hidden
                        disabled={true}
                        invalid={false}
                        value={this.state.equipment._id}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Código do SIORG'}
                        labelSize={2}
                        valueName={'siorg'}
                        valueType={'text'}
                        invalid={!this.state.valid.siorg && this.state.validate}
                        required={true}
                        value={this.state.equipment.siorg}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Descrição'}
                        labelSize={2}
                        valueName={'description'}
                        valueType={'textarea'}
                        invalid={!this.state.valid.description && this.state.validate}
                        required={true}
                        value={this.state.equipment.description}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Origem'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'origin'}
                        valueType={'text'}
                        invalid={!this.state.valid.origin && this.state.validate}
                        required={true}
                        value={this.state.equipment.origin}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Tipo'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'equipmentType'}
                        valueType={'text'}
                        invalid={!this.state.valid.equipmentType && this.state.validate}
                        required={true}
                        value={this.state.equipment.equipmentType}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Quantidade'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'quantity'}
                        valueType={'number'}
                        invalid={!this.state.valid.quantity && this.state.validate}
                        required={!this.state.equipment._id}
                        disabled={this.state.equipment._id}
                        value={this.state.equipment.quantity}
                        onChange={this.onChange}/>

                    <FormatedInput
                        label={'Estado:'}
                        labelSize={3}
                        inputSize={3}
                        valueName={'equipmentState'}
                        valueType={'select'}
                        valuesOfSelect={this.state.stateList}
                        valueDefault={'Selecione'}
                        invalid={!this.state.valid.equipmentState && this.state.validate}
                        required={true}
                        value={this.state.equipment.equipmentState}
                        onChange={this.onChange}/>

                    {
                        this.state.equipment._id ?
                            <Container>
                                <Row>
                                    <Label for="components" md={2} lg={2}>Componentes do Equipamento:</Label>
                                    <Col md={3} xs={6} sm={6} lg={2}>
                                        {/* {Modal to Add Comonents to Equipment} */}
                                        <MyModal color={'primary'}
                                                 header={<h3>Adicionar Componentes ao Equipamento</h3>}
                                                 footer={<span>De dois click para adicionar componente ao equipamento atual!</span>}
                                                 body={
                                                     <TableAlmoxarifado
                                                         options={{
                                                             search: true,
                                                             pagination: true,
                                                             selectRow: {
                                                                 mode: 'radio',
                                                                 clickToSelect: true,
                                                                 onSelect: this.onRowSelect,
                                                             },
                                                             options: {
                                                                 searchField: (props) =>
                                                                     <SearchField
                                                                         defaultValue={props.defaultSearch}
                                                                         placeholder={"Buscar"}/>

                                                                 ,
                                                                 noDataText: "Componentes não disponíveis."
                                                             }
                                                         }}
                                                         select={this.state.equipment.components}
                                                         data={this.state.availableComponents}/>
                                                 }
                                        >Adicionar Componentes</MyModal>
                                        {' '}
                                        {/* {Modal for components Visualization and Deletion} */}
                                    </Col>
                                    <Col md={3} xs={6} sm={6} lg={2}>

                                        <MyModal color={'secondary'}
                                                 header={<h3>Componentes do Equipamento</h3>}
                                                 footer={<span>De dois click para remover componente ao equipamento atual!</span>}
                                                 body={<TableAlmoxarifado
                                                     options={{
                                                         search: true,
                                                         pagination: true,
                                                         selectRow: {
                                                             mode: 'radio',
                                                             clickToSelect: true,
                                                             onSelect: this.onRowSelectToDelete,
                                                         },
                                                         options: {
                                                             searchField: (props) =>
                                                                 <SearchField
                                                                     defaultValue={props.defaultSearch}
                                                                     placeholder={"Buscar"}/>

                                                             ,
                                                             noDataText: "Componentes não disponíveis."
                                                         }
                                                     }}
                                                     data={this.state.equipment.components}
                                                 />}

                                        >Visualizar
                                            Componentes</MyModal>
                                    </Col>
                                </Row>
                            </Container>

                            : ''
                    }
                </Row>

                <div>
                    <Button className="btn btn-success btn-color" type="Submit"
                            onClick={this.submit}
                            disabled={this.state.disableSubmit}
                            block size="lg">{this.props.children}</Button>
                </div>
            </Form>
        )
            ;
    }
}

FormTemplate.PropTypes = {
    purchase: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
};

export default FormTemplate;