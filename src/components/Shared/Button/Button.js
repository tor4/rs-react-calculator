import React, {Component} from 'react';
import {MDCRipple} from '@material/ripple';
import PropTypes from 'prop-types';

class Button extends Component {
  _node;
  _mdcComponent;

  componentDidMount() {
    this._mdcComponent = new MDCRipple(this._node);
  }

  componentWillUnmount() {
    this._mdcComponent.destroy();
  }

  render() {
    const className =
      `mdc-button 
      ${this.props.raised ? 'mdc-button--raised' : ''}
      ${this.props.outlined ? 'mdc-button--outlined' : ''}`;
    return (
      <button type="button"
        ref={(c) => this._node = c}
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
  outlined: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
