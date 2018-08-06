import React from 'react';
import {Col, Container, Row} from 'reactstrap'
import {Link} from 'react-router-dom';
import Line from './Line/Line';
import '../../pages/Pages.css';

export default class SubHeader extends React.Component {
    componentWillMount() {
        if (this.props.back) {
            this.setState({
                back: <Link to={this.props.back.url}>Voltar para '{this.props.back.page}'</Link>,
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="font-sb font-nav margin-title">
                        <Col sm={2} xs={2} md={1}>
                            <a onClick={this.props.props.history.goBack}>
                                <img alt={''} style={{height: '50px'}} src={require('../../images/Voltar.png')}/>
                            </a>
                        </Col>
                        <Col sm={10} xs={10}>
                            <h4>
                                {this.props.title}
                            </h4>
                        </Col>
                        <Col md={10}>
                            {this.props.back?this.state.back:''}
                        </Col>
                    </Row>
                </Container>
                <Line/>
            </div>
        );
    }
}