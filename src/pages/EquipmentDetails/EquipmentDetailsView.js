import React from 'react';
import '../../pages/Pages.css';

import { ClipLoader } from 'react-spinners';
// import { loadPurchaseRequisition } from './connectAPI';
import EquipmentDetails from './EquipmentDetails'
import axios from 'axios';

export default class EquipmentDetailsView extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            match: props.match,
            loading: true,
            data: {
                equipment: {}
            }
        };
        this.componentDidMount = this.componentDidMount.bind(this)
    };

    componentDidMount() {
        try {
            const data = this.state.data
            this.loadEquipmentDetails(this.state.match.params.id).then((value) => {
                data.equipment = value.equipments
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

    loadEquipmentDetails(id) {
        return await axios.get('/equipment/' + id).then(response => {
            if (response.status === 200) {
                let equipment = response.data.equipment;
                equipment.locationHistory = prepareHistoryItems(equipment.locationHistory)
                return ({
                    equipments: equipment,
                    loading: false
                })
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    }
    // date: Date,
    // justification: String,
    // locationType: String,
    // location: String,
    prepareHistoryItems(historyItems) {
        let newHistoryItems = []
        historyItems.forEach((item) => {
            if (item.item) {
                newHistoryItems.push(
                    {
                        _id: item.item._id,
                        date: item.item.date,
                        justification: item.item.justification,
                        locationType: item.item.locationType,
                        location: item.item.location,
                    }
                )
            }
        })
        return newrequisitionItems
    }

    render() {
        let data = (
            <div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
                <ClipLoader
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )

        if (this.state.loading === false) {
            data =
                (<EquipmentDetails equipment={this.state.data.equipment}
                />)
        }

        return (
            <div>
                {data}
            </div>
        );
    }
}