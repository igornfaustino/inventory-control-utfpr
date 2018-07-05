import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Container } from 'reactstrap';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import { isAdmin } from '../../utils/userLogin';

export default class EquipmentsEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            equipment: {
                isPermanent: false,
                patrimonyNumber: '',
                siorg: '',
                buyer: '',
                solicitor: 'test ',
                description: '',
                origin: '',
                equipmentType: '',
                // quantity: 1,
                equipmentState: '',
                components: [], //componentes a serem colocados na tabela
            },
            locationHistory: {
                justification: '',
                locationType: '',
                location: ''
            },
            //equipamentos armazenados no estoque (colocado no Modal)
            availableComponents: [{
                isSelected: false,
                isPermanent: false,
                _id: '',
                patrimonyNumber: '',
                siorg: '',
                buyer: '',
                solicitor: '',
                description: '',
                origin: '',
                equipmentType: '',
                // quantity: 1,
                equipmentState: '',
                components: [],
            },],
            isSubjacentBy: false,
            changed: false,
            modal: false,
            disabled: false,
            addDisabled: true,
            modalComponent: false,
            modalVisual: false,
            disabledSubjacency: false,
            disabledSendStorage: false,
            selected: 0,
        };
        this.moveEquipmentToStorage = this.moveEquipmentToStorage.bind(this);
        this.componentTableCreator = this.componentTableCreator.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleComponent = this.toggleComponent.bind(this);
        this.toggleVisual = this.toggleVisual.bind(this);
        this.savebutton = this.savebutton.bind(this);
        this.addComponent = this.addComponent.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        try {
            axios.get('/equipment/' + id).then(response => {
                if (response.status === 200) {
                    if (response.data.equipment.locationHistory.length) {
                        this.setState({
                            locationHistory: response.data.equipment.locationHistory[0]
                        });
                    }
                    this.setState({
                        isSubjacentBy: false,
                        equipment: response.data.equipment,
                    });
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            });
            axios.get('/equipments').then(response => {
                if (response.status === 200) {
                    let equipments = response.data.equipments;
                    let items = [];
                    let setOfSubjacentEquipments = [];
                    let isSubjacent = false;
                    let boolSubjacent = false;
                    equipments.forEach((item) => {
                        items.push({
                            isSelected: false,
                            _id: item._id,
                            siorg: item.siorg,
                            patrimonyNumber: item.patrimonyNumber,
                            buyer: item.buyer,
                            solicitor: item.solicitor,
                            description: item.description,
                            origin: item.origin,
                            equipmentType: item.equipmentType,
                            equipmentState: item.equipmentState,
                            components: item.components,
                            isPermanent: item.isPermanent,
                        })
                        if(item.components) {
                            item.components.forEach((element) => {
                                setOfSubjacentEquipments.push(element);
                                if(element._id == id) {
                                    setOfSubjacentEquipments.push(item);
                                    isSubjacent = item._id;
                                    boolSubjacent = true;
                                }
                            })
                        }
                    });
                    setOfSubjacentEquipments.push({_id: id}); //fix this
                    let availableEquipments = this.compareLists(items, setOfSubjacentEquipments);
                    console.log(isSubjacent)
                    this.setState({
                        availableComponents: availableEquipments,
                        loading: false,
                        isSubjacentBy: isSubjacent,
                        disabledSubjacency: boolSubjacent,
                    });
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            });
        }
        catch (err) {
            console.error(err)
        }
    }

    compareLists(list1, list2) {
        let difference = [];
        let count;
        list1.forEach((element) => {
            count = true;
            list2.forEach((item) => {
                if(item._id === element._id) {
                    count = false;
                }
            })
            if(count === true) {
                difference.push(element);
            }
        })
        return difference;
    }

    onChange(event) {
        let field = event.target.name;
        let equipment = this.state.equipment;
        equipment[field] = event.target.value;
        return this.setState({
            changed: true,
            equipment: equipment
        });
    }

    onChangeLocation(event) {
        let field = event.target.name;
        let location = this.state.locationHistory;
        location[field] = event.target.value;
        return this.setState({
            changed: true,
            locationHistory: location
        });
    }

    CustomModalSearch = props => {
        return (
            <SearchField
                defaultValue={props.defaultSearch}
                placeholder={"Buscar"} />
        );
    };

    onRowSelect = (item, isSelect, e) => {
        let selected = this.state.selected;
        let addDisabled;
        isSelect? selected++ : selected--;
        selected? addDisabled = false : addDisabled = true;
        let availableComponents = this.state.availableComponents
        let index = availableComponents.indexOf(item)
        availableComponents[index] = { ...availableComponents[index], isSelected: isSelect }
        this.setState({
            availableComponents: availableComponents,
            selected: selected,
            addDisabled: addDisabled,
        })
        console.log(availableComponents);
    }

    buttonFormatter(cell, row, rowIndex){
        return (
            <Button color="danger" onClick={() => this.handleDeleteRow(row)}>Remover</Button>
        );
    }

    componentTableCreator() {
        return (
            <BootstrapTable 
                search
                data={this.state.equipment.components}
                // remote={true}
                // deleteRow={true}
                options={{
                    searchField: this.CustomModalSearch,
                    noDataText: "Componentes não disponíveis.",
                    // onDeleteRow: this.handleDeleteRow
                }}
            >
                <TableHeaderColumn dataField='_id'
                    tdStyle={{ width: '0%' }}
                    thStyle={{ width: '0%' }} dataSort={false} isKey>Key</TableHeaderColumn>
                <TableHeaderColumn dataField='siorg' dataSort={true}>SIORG</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataSort={true}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='equipmentState' dataSort={true}>Estado</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}></TableHeaderColumn>
            </BootstrapTable>
        );
    }

    handleDeleteRow(cell, row, rowIndex) {
        let state = this.state;
        let afterDeletionComponents = [];
        let deletedComponent;
        state.equipment.components.forEach((value) => {
            if(value._id !== cell._id) {
                afterDeletionComponents.push(value);
            } else {
                deletedComponent = value;
            }
        });
        state.equipment.components = afterDeletionComponents;
        state.availableComponents.push(deletedComponent);
        this.setState({
            availableComponents: state.availableComponents,
            equipment: state.equipment,
            changed: true,
        });
        console.log(this.state.equipment.components);
    }

    addComponent() {
        this.setState({ modalComponent: false })
        let equipment = this.state.equipment;
        let availableComponents = this.state.availableComponents;
        let updatedAvailableComponents = [];
        availableComponents.forEach((value) => {
            if(value.isSelected) {
                if(equipment.components.filter(item => item._id === value._id).length === 0) {
                    equipment.components.push(value);
                }
            } else {
                updatedAvailableComponents.push(value);
            }
        });
        console.log(equipment.components);
        this.setState({
            equipment: equipment,
            availableComponents: updatedAvailableComponents,
            changed: true,
        })
    }

    moveEquipmentToStorage = async () =>  {
        let locationHistory = this.state.locationHistory;
        let location = {
            justification: ' ',
            locationType: ' ',
            location: 'Em Estoque',
        }
        locationHistory = location;
        await this.setState({ locationHistory: locationHistory }, () => {
            console.log(this.state.locationHistory, 'It works now :)');
        }); 
        this.moveEquipment();
    }

    moveEquipment = () => {
        if (this.state.locationHistory.justification === '' || this.state.locationHistory.locationType === '' || this.state.locationHistory.location === '') {
            alert("Preencha todos os campos!")
            return
        }
        this.setState({
            disabled: true,
            disabledSendStorage: true
        })
        axios.post('/equipments/' + this.state.equipment._id + '/move', this.state.locationHistory).then(response => {
            if (response.status === 201) {
                // console.log(response);
                // this.setState({
                //     disabled: false,
                //     locationHistory: {
                //         justification: '',
                //         locationType: '',
                //         location: ''
                //     }
                // })
                // alert("Equipamento movimentado com sucesso!")
                this.toggle()
            }
        }).catch(ex => {
            alert("Opss.. Algo saiu errado");
            console.error(ex, ex.response);
        })
        this.moveComponents();
    }

    moveComponents = () => {
        let locationHistory = this.state.locationHistory;
        this.state.equipment.components.forEach((component) => {
            axios.post('/equipments/' + component._id + '/move', locationHistory).then(response => {
                if (response.status === 201) {
                    // console.log(response);
                    this.setState({
                        disabled: false,
                        locationHistory: {
                            justification: '',
                            locationType: '',
                            location: ''
                        }
                    })
                    // alert("Equipamento movimentado com sucesso!")
                }
            }).catch(ex => {
                alert("Opss.. Algo saiu errado");
                console.error(ex, ex.response);
            })
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleComponent() {
        let availableComponents = this.state.availableComponents;
        availableComponents.forEach((value) => {
            value.isSelected = false;
        });
        this.setState({
            selected: 0,
            addDisabled: true,
            modalComponent: !this.state.modalComponent,
            availableComponents: availableComponents,
        });
    }

    toggleVisual() {
        this.setState({
            modalVisual: !this.state.modalVisual,
        });
    }

    savebutton(event) {
        event.preventDefault();
        try {
            let equipment = this.state.equipment;
            if(!equipment.isPermanent){
                equipment.patrimonyNumber = ''
            }
            axios.put('/equipment/' + equipment._id, equipment).then(response => {
                if (response.status === 200) {
                    alert("Equipamento atualizado com sucesso!")
                }
            })
                .catch(ex => {
                    alert("Não Foi possivel conectar ao servidor");
                    console.error(ex, ex.response);
                })
        }
        catch (error) {
            // console.log(error)
        }
    }

    render() {
        if (!isAdmin()) {
			this.props.history.push('/home');
		}

        let patrimonyfield = null
        if (this.state.equipment.isPermanent) {
            patrimonyfield = (<FormGroup row>
                <Label for="patrimony" sm={2}>Número de patrimonio:</Label>
                <Col sm={2}>
                    <Input value={this.state.equipment.patrimonyNumber} type="text" name="patrimonyNumber" id="patrimony" onChange={this.onChange} placeholder="Número Siorg" />
                </Col>
            </FormGroup>)
        }

        return (
            <div>
                <Header></Header>

                <SubHeader title='Almoxarifado >> Editar Equipamento'></SubHeader>
                <div className="margin-left" style={{ marginRight: "20px" }}>
                    <Form>
                        <FormGroup row>
                            <Label check>
                                <Input type="checkbox" checked={this.state.equipment.isPermanent} name="isPermanent" onChange={() => {
                                    let equipment = this.state.equipment
                                    //make changes to ingredients
                                    equipment.isPermanent = !equipment.isPermanent
                                    this.setState({
                                        changed: true,
                                        equipment: equipment
                                    })
                                }} />{' '}
                                Item permanente
          					</Label>
                        </FormGroup>
                        {patrimonyfield}
                        <FormGroup row>
                            <Label for="siorg" sm={2}>Código do SIORG:</Label>
                            <Col sm={2}>
                                <Input type="text"
                                    name="siorg"
                                    id="siorg"
                                    value={this.state.equipment.siorg}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="buyer" sm={2}>Comprador:</Label>
                            <Col sm={4}>
                                <Input type="text"
                                    name="buyer"
                                    id="buyer"
                                    placeholder="Pessoa que comprou o produto"
                                    value={this.state.equipment.buyer}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>

                            <Label for="solicitor" sm={2}>Solicitante:</Label>
                            <Col sm={4}>
                                <Input type="text"
                                    name="solicitor"
                                    id="solicitor"
                                    placeholder="Pessoa que solicitou o produto"
                                    value={this.state.equipment.solicitor}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" sm={2}>Descrição:</Label>
                            <Col sm={7}>
                                <Input type="textarea"
                                    name="description"
                                    id="description"
                                    placeholder="Descrição detalhada do produto"
                                    value={this.state.equipment.description}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="origin" sm={2}>Origem:</Label>
                            <Col sm={3}>
                                <Input type="text"
                                    name="origin"
                                    id="origin"
                                    placeholder="Origem do produto"
                                    value={this.state.equipment.origin}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="equipmentType" sm={2}>Tipo:</Label>
                            <Col sm={3}>
                                <Input type="text"
                                    name="equipmentType"
                                    id="equipmentType"
                                    placeholder="Tipo do produto"
                                    value={this.state.equipment.equipmentType}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="equipmentState" sm={2}>Estado:</Label>
                            <Col sm={2}>
                                <Input type="text"
                                    name="equipmentState"
                                    id="equipmentState"
                                    placeholder="Estado do produto"
                                    value={this.state.equipment.equipmentState}
                                    onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="components" sm={2}>Componentes do Equipamento:</Label>
                            <Col sm={2}>
                                <Button color="primary" onClick={this.toggleComponent} disabled={this.state.disabledSubjacency}>Adicionar Componentes</Button>
                            </Col>
                            <Col sm={2}>
                                <Button color="secondary" onClick={this.toggleVisual} disabled={this.state.disabledSubjacency}>Visualizar Componentes</Button>
                            </Col>
                        </FormGroup>
                        <Button color="primary" onClick={this.toggle} disabled={this.state.disabledSubjacency}>Movimentar</Button>
                        <div align="right">
                            <Button color="secondary" onClick={this.savebutton} disabled={!this.state.changed}>Salvar
                                Alterações</Button>
                        </div>
                    </Form>
                    <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Movimentar equipamentos</ModalHeader>
                        <ModalBody>
                            <Container>
                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="justification" sm={3}>Justificativa:</Label>
                                    <Col sm={6}>
                                        <Input type="textarea"
                                            name="justification"
                                            id="justification"
                                            placeholder="Justificar do local"
                                            value={this.state.locationHistory.justification}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="locationType" sm={3}>Tipo de localização:</Label>
                                    <Col sm={4}>
                                        <Input type="text"
                                            name="locationType"
                                            id="locationType"
                                            placeholder="Sala de aula, projeto, etc.."
                                            value={this.state.locationHistory.locationType}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <p style={{ marginTop: "10px", color: "red" }}>*</p>
                                    <Label for="location" sm={3}>Localização:</Label>
                                    <Col sm={4}>
                                        <Input type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Sala D003"
                                            value={this.state.locationHistory.location}
                                            onChange={this.onChangeLocation} />
                                    </Col>
                                </FormGroup>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.moveEquipmentToStorage} disabled={this.state.disabledSendStorage}>Devolver ao Estoque</Button>
                            <Button color="secondary" onClick={this.moveEquipment} disabled={this.state.locationHistory.justification === '' || this.state.locationHistory.locationType === '' || this.state.locationHistory.location === '' || this.state.disabled}>Movimentar</Button>
                        </ModalFooter>
                    </Modal>
                    {/* {Modal to Add Comonents to Equipment} */}
                    <Modal isOpen={this.state.modalComponent} toggle={this.toggleComponent} size="lg">
                        <ModalHeader toggle={this.toggleComponent}>Adicionar Componentes ao Equipamento</ModalHeader>
                        <ModalBody>
                            <BootstrapTable 
                                search
                                data={this.state.availableComponents}
                                selectRow={{
                                    mode: 'checkbox',
                                    clickToSelect: true,
                                    onSelect: this.onRowSelect,
                                }}
                                options={{
                                    searchField: this.CustomModalSearch,
                                    noDataText: "Componentes não disponíveis."
                                }}
                            >
                                <TableHeaderColumn dataField='_id'
                                    tdStyle={{ width: '0%' }}
                                    thStyle={{ width: '0%' }} dataSort={false} isKey>Key</TableHeaderColumn>
                                <TableHeaderColumn dataField='siorg' dataSort={true}>SIORG</TableHeaderColumn>
                                <TableHeaderColumn dataField='description' dataSort={true}>Descrição</TableHeaderColumn>
                                <TableHeaderColumn dataField='equipmentState' dataSort={true}>Estado</TableHeaderColumn>
                            </BootstrapTable>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.addComponent} disabled={this.state.addDisabled}>Adicionar</Button>
                        </ModalFooter>
                    </Modal>
                    {/* {Modal for components Visualization and Deletion} */}
                    <Modal isOpen={this.state.modalVisual} toggle={this.toggleVisual}>
                        <ModalHeader toggle={this.toggleVisual}>Componentes do Equipamento</ModalHeader>
                        <ModalBody>
                            {/* <div style={{
                                overflowY: 'auto',
                                height: '500px',
                            }}> */}
                                {this.componentTableCreator()}
                            {/* </div> */}
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}