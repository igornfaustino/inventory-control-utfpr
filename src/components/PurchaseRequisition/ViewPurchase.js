import React from 'react';
import '../../pages/Pages.css';
import SubHeader from '../SubHeader/SubHeader';

import {addRequest,loadPurchaseRequisition} from './connectAPI';

import PurchaseForm from './PurchaseForm';
import { ClipLoader } from 'react-spinners';

export default class ViewPurchase extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            match: props.match,
            loading: true,
            data: {
                purchase: {}
            }
        };
        this.componentDidMount=this.componentDidMount.bind(this)        
    };
    componentDidMount(){
        try{
            const data=this.state.data
            loadPurchaseRequisition(this.state.match.params.id).then((value)=>{
                console.log(value)
              data.purchase=value.purchases
              this.setState(
                {
                  data: data,
                  loading : value.loading
                }
              )
            })
          }
          catch(error){
            console.log(error)
          }
    }
    render() {
        let data=(<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <ClipLoader
            color={'#123abc'}
            loading={this.state.loading}
        />
    </div>)
		if (this.state.loading === false) {
			data = <div>
                        
                        >
                        <PurchaseForm
                            purchase={this.state.data.purchase} 
                            disabled={true}
                        />
                    </div >
		} else {
			data = (<div className='sweet-loading' style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
				<ClipLoader
					color={'#123abc'}
					loading={this.state.loading}
				/>
			</div>)
		}
        return (
            <div>
                <SubHeader title="Visualizar Requisição"></SubHeader>
                {data}
            </div >
        );
    }
}