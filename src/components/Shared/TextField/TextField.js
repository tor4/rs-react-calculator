import React, {Component, Fragment} from 'react';
import {MDCTextField} from '@material/textfield';
import PropTypes from 'prop-types';

import './TextField.css';

class TextField extends Component {
  _node;
  _mdcComponent;

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this._mdcComponent = new MDCTextField(this._node);
  }

  componentWillUnmount() {
    this._mdcComponent.destroy();
  }

  onChange() {
    const value = this._mdcComponent.value;
    this.props.onChange(value);

    return value;
  }

  valueToString(value) {
    let str;
    if (typeof value === 'object') {
      str = value.join('');
    } else if (typeof value === 'number') {
      str = value.toString();
    } else {
      str = value ? value : '';
    }
    return str;
  }

  render() {
    const {label, type, value, leadingIcon} = this.props;

    return (
      <Fragment>
        <label className={`mdc-text-field rs-text-field
          ${leadingIcon ? 'tmdc-text-field--with-leading-icon' : ''}`}
          ref={(c) => this._node = c}
        >
          <div className="mdc-text-field__ripple"></div>
          {leadingIcon && <i className="material-icons mdc-text-field__icon">{leadingIcon}</i>}
          <input 
            className="mdc-text-field__input"
            type={type || 'text'}
            aria-labelledby="my-label-id"
            value={this.valueToString(value)}
            onChange={this.onChange}
          ></input>
          <span className="mdc-floating-label" id="my-label-id">{label}</span>
          <div className="mdc-line-ripple"></div>
        </label>
        <div className="mdc-text-field-helper-line">
          <div className="mdc-text-field-helper-text" id="my-helper-id" aria-hidden="true">helper text</div>
        </div>
      </Fragment>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  leadingIcon: PropTypes.string,
  hint: PropTypes.string,
};

export default TextField;
