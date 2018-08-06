import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {PropTypes} from 'prop-types';
import {toast} from "react-toastify/index";

class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    submit(){
        if (this.valid()) {
            this.onSubmit();
        } else {
            toast.error('Resolva os campos inválidos!')
        }
    }

    render() {
        return (
            <div>
                <Button color="success" size={'sm'} className={'float-right'} onClick={this.toggle}>
                    {this.props.children}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
                    <ModalBody onSubmit={this.submit}>
                        {this.props.body}
                    </ModalBody>
                    <ModalFooter onClick={this.submit}>
                        {this.props.footer}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default MyModal;