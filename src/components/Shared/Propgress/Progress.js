import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MDCLinearProgress} from '@material/linear-progress';

class Progress extends Component {
  _node;
  _mdcComponent;

  componentDidMount() {
    this._mdcComponent = new MDCLinearProgress(this._node);
  }

  componentWillUnmount() {
    this._mdcComponent.destroy();
  }

  render() {
    if (this.props.disabled) {
      return false;
    }

    return (
      <div 
        role="progressbar" 
        className="mdc-linear-progress mdc-linear-progress--indeterminate" 
        aria-label="Progress Bar" 
        aria-valuemin="0" 
        aria-valuemax="1" 
        aria-valuenow="0"
        ref={(c) => this._node = c}
      >
        <div className="mdc-linear-progress__buffering-dots"></div>
        <div className="mdc-linear-progress__buffer"></div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  disabled: PropTypes.bool,
};

export default Progress;
