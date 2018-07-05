import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Table } from 'react-bootstrap';
import { Container } from 'reactstrap'
export class PurchasePrintView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            management: '',
            number: '',
            requisitionDate: "",
            UGR: '',
            sector: '',
            requester: '',
            requisitionItems: [],
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.prepareJustify = this.prepareJustify.bind(this)
    }

    componentWillMount() {
        this.setState({ ...this.props.purchase })
        //   console.log(this.props.purchase)
    }

    prepareJustify() {
        let justification = "";
        this.state.requisitionItems.forEach((element, index) => {
            justification += "O item " + (index + 1) + " é " + element.justification + ". "
        });
        return justification
    }
    // href={`/editarsolicitacoes/${id}`}
    // RenderViewAction = (index) => {
    //     const id = this.state.requisitionItems[index]._id;
    //     return (
    //         <Button color="secondary" onClick={() => {
    //             this.props.history.push({
    //                 pathname: `/editarsolicitacoes/${id}`,
    //             })
    //         }} type="submit">Visualizar</Button>
    //     );
    // };

    prepareItem() {
        let itens = [];
        this.state.requisitionItems.forEach((item, index) => {
            itens.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.siorg}</td>
                    <td>{item.description}</td>
                    <td>{item.qtd}</td>
                    <td>R$ {item.quotation.map((item) => item.price).reduce((a, b) => a + b, 0) / item.quotation.length},00</td>
                    {/* <td>{this.RenderViewAction(index)}</td> */}
                </tr>)
        });
        return itens
    }

    prepareCustoDosItem() {
        let itens = [];
        let category = [];
        let find = false;
        this.state.requisitionItems.forEach((requisition, index) => {
            let valor = requisition.qtd * requisition.quotation.map((item) => item.price).reduce((a, b) => a + b, 0) / requisition.quotation.length;

            if (category.includes(requisition.itemType)) {
                itens[category.indexOf(requisition.itemType)].itens.push(index + 1);
                itens[category.indexOf(requisition.itemType)].valor += valor;
                find = true
            }
            if (!find) {
                category.push(requisition.itemType);
                let item = { catedory: requisition.itemType, itens: [index + 1], valor: valor };
                itens.push(item)
            }
        });

        return itens.map((item, index) => {
            let itens_requisicao = "";
            item.itens.forEach((item) => {
                itens_requisicao = itens_requisicao + item + ", "
            });
            return (
                <tr key={index}>
                    <td>{item.catedory ? item.catedory : "Não definido"}</td>
                    <td>{itens_requisicao}</td>
                    <td>R$ {item.valor},00</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Container>
                <Table bordered condensed hover>
                    <tbody>
                        <tr>
                            <td class="font-weight-bold">Requisição:</td>
                            <td>{this.state.number ? this.state.number : "Não definido"}</td>
                            <td class="font-weight-bold">Setor:</td>
                            <td>{this.state.sector}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Data:</td>
                            <td>{moment(this.state.requisitionDate).format("DD/MM/YYYY")}</td>
                            <td class="font-weight-bold">Gestão:</td>
                            <td>{this.state.management}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold"    >Requisitante:</td>
                            <td>{this.state.requester}</td>
                            <td class="font-weight-bold">UGR:</td>
                            <td>{this.state.UGR}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Justificativa:</td>
                            <td colSpan="3">
                                {this.prepareJustify()}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table bordered condensed hover>
                    <thead>
                        <tr>
                            <td colSpan="5" class="font-weight-bold text-center">Itens Inseridos</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Item</td>
                            <td class="font-weight-bold">SIORG</td>
                            <td class="font-weight-bold">Descrição</td>
                            <td class="font-weight-bold">Quantidade</td>
                            <td class="font-weight-bold">Valor Unitario</td>
                            {/* <td class="font-weight-bold"> </td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.prepareItem()}
                    </tbody>
                </Table>
                <Table bordered condensed hover>
                    <thead>
                        <tr>
                            <td colSpan="3" class="font-weight-bold text-center">Custo Estimado</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Elemento de despesa</td>
                            <td class="font-weight-bold">Itens da Requisição</td>
                            <td class="font-weight-bold">Valor</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.prepareCustoDosItem()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

PurchasePrintView.propTypes = {
    purchase: PropTypes.object.isRequired,
};

export default PurchasePrintView;