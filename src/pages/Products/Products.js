import React from 'react';
import '../Pages.css';
import Line from '../../components/Line/Line';

export default class Products extends React.Component {
	render() {
		return (
			<div align='left' className='margin-title'>
				<h2 className='font'>Histórico de pedidos</h2>
				<Line></Line>
			</div >
		);
	}
}