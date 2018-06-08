import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import NewRequests from './NewRequests/NewRequests';
import Requests from './Requests/Requests';
import Products from './Products/Products';
import ApprovedRequests from './approvedRequests/ApprovedRequests';
import PurchasesHistory from './PurchasesHistory/PurchasesHistory';
import PurchaseRequisition from './PurchaseRequisition/PurchaseRequisition';
import EditRequest from './EditRequest/EditRequest';
import Inventory from './Inventory/Inventory';
import EquipmentsEdit from './EquipmentEditing/EquipmentEditing';
import EquipmentDetailsView from './EquipmentDetails/EquipmentDetailsView'
//import NewProduct from './NewProduct/NewProduct';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route path='/home' component={Home} />
			<Route path='/novasolicitacoes' component={NewRequests} />
			<Route path='/editarsolicitacoes/:id' component={EditRequest} />
			<Route path='/solicitacoes' component={Requests} />
			<Route path='/produtos' component={Products} />
			<Route path='/aprovados' component={ApprovedRequests} />
			<Route path='/requisicao' component={PurchaseRequisition} />
			<Route path='/compras' component={PurchasesHistory} />
			<Route path='/almoxarifado' component={Inventory} />
			<Route path='/editarequipamento/:id' component={EquipmentsEdit} />
			<Route path='/detalhesequipamento/:id' component={EquipmentDetailsView} />
			{/* <Route path='/novoproduto' component={NewProduct} /> CLÁUDIA AQUI */}
		</Switch>
	</main>
);

export default Main;