import React from 'react';
import {Button} from 'reactstrap';
import {ClipLoader} from 'react-spinners';

import '../Pages.css';

import TableList from '../../components/TableList/TableList';
import SubHeader from '../../components/SubHeader/SubHeader';

import Header from '../../components/Header/Header';

import axios from 'axios';
import moment from 'moment'

import { sleep } from '../../utils/sleep'

export default class ApprovedRequests extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            term: 'teste',
            isDisabled: true,
            checkedCount: 0,
            items: [],

            // Validate Price
            validPrice: {
                min: 0.6,
                max: 1.3,
                average: 0
            },
        };
    }

    componentWillMount() {
        this.getRequistions();
    }

    validQuotation = (quotation) => {
        let price = this.state.validPrice;
        // if (quotation.length)
        //     price.average = quotation.map((x) => x.price).reduce((a, b) => a + b, 0) / quotation.length;
        let error = 0;
        // console.log(quotation)
        quotation.forEach((item, index) => {
            // console.log(item)
            if (!item.price || price.average * price.min > item.price || price.average * price.max < item.price)
                error++
        });
        return error
    };

    // TODO: change filter
    getRequistions = () => {
        try{
        axios.get('/requisitions').then(response => {
            if (response.status === 200) {
                let requisitions = response.data.requisitions;
                let items = [];
                requisitions.forEach((item) => {
                    let price = this.state.validPrice;
                    if (item.quotation)
                        price.average = item.quotation.map((x) => x.price).reduce((a, b) => a + b, 0) / item.quotation.length;

                    price.average = price.average? price.average : 0;
                    items.push({
                        _id: item._id,
                        siorg: item.siorg,
                        description: item.description,
                        qtd: item.qtd,
                        min: "R$ " + (price.average * price.min).toFixed(2).toString(),
                        average: "R$ " + price.average.toFixed(2).toString(),
                        max: "R$ " + (price.average * price.max).toFixed(2).toString(),
                        qtdItens: item.quotation.length.toString(),
                        invalid: this.validQuotation(item.quotation),
                        date: moment(item.history[item.history.length - 1].date).locale('pt-br').format('DD/MM/YYYY'),
                        stauts: item.status,

                        edit: <Button color="primary" onClick={() => {
                            this.props.history.push({
                                pathname: `/editarsolicitacoes/${item._id}`,
                                id: item._id
                            })
                        }} type="submit">Editar</Button>
                    })
                });
                // items = items.filter(item => {
                // 	return item.status === 'aprovado'
                // });

                this.setState({
                    items,
                    loading: false
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    } catch (ex) {
        console.error(ex, ex.response);
        sleep(2000)
        this.getRequistions()
    }
    };

    handleClick(e) {
        this.props.history.push({
            pathname: '/novasolicitacoes',
            state: {product: e}
        })
    }

    onChange = (event) => {
        this.setState({term: event.target.value});
    };

    render() {
        let data = (this.state.loading === false) ?
            <TableList header={['SIORG', 'Descrição', 'Qtd','60%','Média','130%','Cotações Cadastradas', 'Nº de Cotações inválidas', 'Data', 'Status', '']} items={this.state.items}/> :
            <div className='sweet-loading' style={{display: 'flex', justifyContent: 'center', margin: 100}}>
                <ClipLoader
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>;
        return (
            <div>
                <Header/>
                <SubHeader title="Solicitações"/>
                {data}
            </div>
        );
    }
}