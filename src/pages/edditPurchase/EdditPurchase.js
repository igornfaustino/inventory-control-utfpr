import React from 'react';
import '../Home/Home.css';
import { NewPurchasePage }  from '../../components/PurchaseRequisition/newPurchase'
import { EditPurchase }  from '../../components/PurchaseRequisition/EditPurchase'

export default class EditPurchasePage extends React.Component {
	render() {
		return (
			<div align="left" className={'margin'}>
				<EditPurchase/>
			</div >
		);
	}
}