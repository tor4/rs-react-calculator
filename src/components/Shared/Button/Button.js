import React, {Component} from 'react';
import {MDCRipple} from '@material/ripple';
import PropTypes from 'prop-types';

class Button extends Component {
  componentDidMount() {
    new MDCRipple(document.querySelector('.mdc-button'));
  }

  render() {
    const className =
      `mdc-button ${this.props.raised ? 'mdc-button--raised' : ''}`;
    return (
      <button type="button"
        className={className}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <div className="mdc-button__ripple"></div>
        <span className="mdc-button__label">
          {this.props.label}
        </span>
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
