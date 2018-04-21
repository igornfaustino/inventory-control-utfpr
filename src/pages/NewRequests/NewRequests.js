import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class NewRequest extends React.Component {

	constructor(promps, context) {
		super(promps, context);
		this.arrayButton = [];
	}

	showButton() {
		this.arrayButton.push({
			type: " ",
			reference: " "
		});
		// this.forceUpdate(() => {});
	}

	renderQuotation(props) {
		return props.aux.map(print =>
			<div>
				<FormGroup row>
					<Label for="typeArea" sm={2}>Tipo:</Label>
					<Col sm={1}>
						<Input type="select" name="select" id="typeArea">
							<option>Link</option>
							<option>E-mail</option>
							<option>PDF</option>
						</Input>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="referenceArea" sm={2}>Referência:</Label>
					<Col sm={5}>
						<Input type="text" name="reference" id="referenceArea" />
					</Col>
				</FormGroup>
			</div>
		);
	}

	render() {
		return (
			<Form>
				<FormGroup row>
				</FormGroup>
				<FormGroup row>
					<Label for="descriptionArea" sm={2}>Descriçao</Label>
					<Col sm={7}>
						<Input type="textarea" name="decription" id="descriptionArea" placeholder="Descrição detalhada sobre os materias a serem solicitados" />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="quantityArea" sm={2}>Quantidade</Label>
					<Col sm={2}>
						<Input type="number" name="quantity" id="quantityArea" placeholder="Quantidade" />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="justifyArea" sm={2}>Justificativa</Label>
					<Col sm={7}>
						<Input type="textarea" name="justify" id="justiryArea" placeholder="Justificativa para tal solicitação" />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Adicionar cotação </Label>
					<Col sm={1}>
						<Button color="secondary" onClick={this.showButton()}>Adicionar</Button>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col>
						<this.renderQuotation aux={this.arrayButton}></this.renderQuotation>
					</Col>
				</FormGroup>

			</Form>
		);
	}
}