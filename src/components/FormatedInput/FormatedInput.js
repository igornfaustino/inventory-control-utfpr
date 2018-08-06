import React from 'react';

import PropTypes from 'prop-types';
import {Col, Container, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap';


class FormatedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            invalid: false,
            default: 'Escolha'
        });
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        if (!!this.props.valueDefault) {
            this.setState({
                default: this.props.valueDefault
            })
        }
    }

    onChange(element) {
        let event = element;
        if (this.props.valuesOfSelect) {
            event.target.value = event.target.value === this.state.default ? null : event.target.value
        }
        this.props.onChange(event);
    }

    render() {
        if (!!this.props.hidden) {
            return '';
        }

        let colLength = 12;
        let valuesOfSelect = [];

        if (this.props.valuesOfSelect) {
            valuesOfSelect.push(<option value={this.state.default} key={0}>{this.state.default}</option>)

            this.props.valuesOfSelect.forEach((item, index) => {
                valuesOfSelect.push(<option value={item} key={index + 1}>{item}</option>)
            });
        }
        let data = this.props.valuesOfSelect ?
            (<Input
                type={this.props.valueType}
                name={this.props.valueName}
                id={'area-' + this.props.valueName}
                disabled={!!this.props.disabled}
                onChange={this.onChange}
                invalid={this.state.invalid || this.props.invalid}
                value={this.props.value}
            >
                {valuesOfSelect}
            </Input>)
            : (<Input
                value={this.props.value}
                id={'area-' + this.props.valueName}
                type={this.props.valueType}
                name={this.props.valueName}
                invalid={this.state.invalid || this.props.invalid}
                disabled={!!this.props.disabled}
                onChange={this.onChange}
                placeholder={this.props.placeholder}/>)
        if (this.props.option) {

            data = <Container>
                <Row>

                    <Col sm={9}>
                        <Row>
                            {data}
                        </Row>
                    </Col>
                    <Col sm={3}>
                        <Row>
                            {this.props.option}
                        </Row>
                    </Col>
                </Row>
            </Container>;
        }

        return (
            <Col md={(this.props.inputSize && this.props.labelSize) ? this.props.inputSize + this.props.labelSize : 12}>
                <FormGroup row style={this.props.formStyle} className={this.props.className}>
                    {
                        (this.props.valueType === 'hidden' || this.props.notLabel) ?
                            (
                                ''
                            )
                            :
                            (
                                <Label sm={4}
                                       for={'area-' + this.props.valueName}
                                       md={(this.props.inputSize && this.props.labelSize) ? 4 : this.props.labelSize}
                                >

                                    <symbol style={{color: 'red'}}>
                                        {this.props.required ? '* ' : '  '}
                                    </symbol>
                                    {this.props.label}
                                </Label>
                            )
                    }

                    <Col {...this.props.notLabel ?
                        {sm: 12, md: 12} :
                        {
                            sm: 8, md: (this.props.inputSize && this.props.labelSize) ?
                                (8) :
                                (this.props.inputSize ?
                                    this.props.inputSize :
                                    colLength - this.props.labelSize)
                        }
                         }>

                        {data}
                        {
                            (this.props.feedback && this.props.feedback.map) ? (
                                this.props.feedback.map(feedback =>
                                    <FormFeedback valid={feedback.valid}>{feedback.msg}</FormFeedback>
                                )
                            ) : (
                                <FormFeedback>{this.props.feedback}</FormFeedback>
                            )
                        }
                    </Col>
                </FormGroup>
            </Col>
        );
    }
}

FormatedInput.PropTypes = {
    formStyle: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelSize: PropTypes.number.isRequired,
    inputSize: PropTypes.number,
    className: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    valuesOfSelect: PropTypes.array.string,
    valueDefault: PropTypes.string,
    value: PropTypes.any,
    valueName: PropTypes.string,
    valueType: PropTypes.string,
    invalid: PropTypes.bool,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    notLabel: PropTypes.bool,
    feedback: PropTypes.string,
    validate: PropTypes.func,
    option: PropTypes.any
};

export default FormatedInput;