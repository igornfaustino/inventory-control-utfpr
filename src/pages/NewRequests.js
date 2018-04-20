import React from 'react';
import './Pages.css';
import SubHeader from '../components/SubHeader/SubHeader';

export default class NewRequest extends React.Component {
	render() {
		return (
			<div>
				<SubHeader title="Novas solicitações"></SubHeader>
			</div >
		);
	}
}