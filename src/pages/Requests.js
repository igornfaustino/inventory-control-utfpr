import React from 'react';
import './Pages.css';
import SubHeader from '../components/SubHeader/SubHeader';

export default class Request extends React.Component {
	render() {
		return (
			<div>
				<SubHeader title="Suas solicitações"></SubHeader>
			</div >
		);
	}
}