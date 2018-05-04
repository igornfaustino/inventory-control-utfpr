import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup,Col,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';

const TextInput = ({name, size ,label, onChange, placeholder, value, error,help, type="text"}) => {
  let wrapperClass = '';
  if (error && error.length > 0) {
    wrapperClass = 'warning';
  }

  return (
  <Col horizontal
    md={size}
  >
    <FormGroup  
      controlId={name} 
      validationState={wrapperClass}
    >
      <Col 
        componentClass={ControlLabel} 
        sm={4}
      >
        {label}
      </Col>
      <Col>
        <FormControl 
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <FormControl.Feedback />
      </Col>
        <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  </Col>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.number,
  help: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
