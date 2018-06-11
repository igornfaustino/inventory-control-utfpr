import React from 'react';
import '../../pages/Pages.css';

import { ClipLoader } from 'react-spinners';

import EquipmentDetails from './EquipmentDetails'
import axios from 'axios';
import Header from '../../components/Header/Header';

import SubHeader from '../../components/SubHeader/SubHeader';

export default class EquipmentDetailsView extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            match: props.match,
            loading: true,
            data: {
                equipment: {}
            }
        };
        this.componentWillMount = this.componentWillMount.bind(this)
    };

    componentWillMount() {
        try {
            const data = this.state.data;
            loadEquipmentDetails(this.state.match.params.id).then((value) => {
                data.equipment = value.equipment;
                this.setState(
                    {
                        data: data,
                        loading: value.loading
                    }
                )
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        let data = (
            <div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
                <ClipLoader
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        );
        if (this.state.loading === false) {
            data =
                (<EquipmentDetails equipment={this.state.data.equipment}
                />)
        }
        return (
            <div>
                <Header></Header>
                <SubHeader title="Almoxarifado >> Detalhes do Equipamento"></SubHeader>
                {data}
            </div>
        );
    }
}

export async function loadEquipmentDetails(id) {
    return await axios.get('/equipment/' + id).then(response => {
        if (response.status === 200) {
            return ({
                equipment: response.data.equipment,
                loading: false
            })
        }
    }).catch(ex => {
        console.error(ex, ex.response);
    })
}