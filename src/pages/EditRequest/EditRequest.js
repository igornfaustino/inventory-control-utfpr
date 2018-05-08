import React from 'react';
import '../Home/Home.css';
import FormRequest from "../NewRequests/FormRequest";
import { loadRequisition } from "../../components/PurchaseRequisition/connectAPI";

import { ClipLoader } from 'react-spinners';
import Header from '../../components/Header/Header';

export default class EditRequest extends React.Component {

	constructor(props) {
        super(props);

        this.state={
            loading:true,
            requisition:{}
        }
        this.componentWillMount=this.componentWillMount.bind(this)
    }
    componentWillMount() {
        try{
            loadRequisition(this.props.match.params.id).then((value)=>{
                this.setState(
                {
                  requisition:value.requisition,
                  loading : value.loading
                }
              )
            })
          }
          catch(error){
            console.log(error)
          }
    }
    render(){
        let data=(<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <ClipLoader
            color={'#123abc'}
            loading={this.state.loading}
        />
    </div>)
        if(this.state.loading===false){
            data=<FormRequest 
                location={this.props.location} 
                requisition={this.state.requisition} 
                title={"Editar Solicitação"}/>
        }
        return(
            <div>
                <Header></Header>
                {data}
            </div>
        )
    }
}