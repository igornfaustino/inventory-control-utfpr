import React from 'react';
import PropTypes from 'prop-types';

class Recized extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            margin: '3',
            width: '100',
            height: '35',
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    overflowY: 'auto',
                    position: 'absolute',
                    float: 'left',
                    width: '100%',
                    marginTop: 0,
                    marginLeft: 0,
                    maxHeight: this.props.isSelect? (100 - this.state.height).toString() + '%': '100%',
                }}>
                    {this.props.children}
                </div>
                <div>
                    <div className={'line'}/>
                    <div style={{
                        overflowY: 'auto',
                        position: 'absolute',
                        width: '100%',
                        zIndex:1,
                        backgroundColor: 'white',
                        bottom: 0,
                        left: 0,
                        maxHeight:this.props.isSelect? (this.state.height).toString() + '%':'0%',
                    }}>
                        <div className='line'/>
                        {this.props.bottom}
                    </div>
                </div>
            </div>
        )
    }
}

Recized.PropTypes = {
    bottom: PropTypes.any
}

export default Recized