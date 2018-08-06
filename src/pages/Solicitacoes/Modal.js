import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {PropTypes} from 'prop-types';

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

    render() {
        return (
            <div>
                <Button color="success" size={'sm'} className={'float-right'} onClick={this.toggle}>
                    {this.props.children}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size={this.props.size? this.props.size: 'lg'}>
                    <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
                    <ModalBody>
                        {this.props.body}
                    </ModalBody>
                    <ModalFooter>
                        <Button color={'secondary'} size={'sm'} onClick={this.toggle}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

MyModal.PropTypes = {
    header: PropTypes.any,
    body: PropTypes.any
};
export default MyModal;