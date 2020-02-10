import React, {Component, Fragment} from 'react';
import {MDCTextField} from '@material/textfield';
import PropTypes from 'prop-types';

import './TextField.css';

class TextField extends Component {
  _node;
  _mdcComponent;

  state = {
    value: this.props.value,
  };

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
    const valid = this._mdcComponent.valid;

    this.setState({
      value,
    });

    if (valid) {
      this.props.onChange(value);
    }
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
    const {label, type, min, max, regex, leadingIcon, trailingIcon, hint} = this.props;

    let helpText; 
    if (hint) {
      helpText = (
        <div className="mdc-text-field-helper-line">
          <div className="mdc-text-field-helper-text" id="my-helper-id" aria-hidden="true">{hint}</div>
        </div>
      );
    }

    let lIcon;
    if (leadingIcon) {
      lIcon = (
        <i 
          className={`material-icons mdc-text-field__icon mdc-text-field__icon--leading ${leadingIcon}`}
          tabindex="0"
          role="button"
        >i</i>
      )
    }

    let tIcon;
    if (trailingIcon) {
      tIcon = (
        <i className={`material-icons mdc-text-field__icon mdc-text-field__icon--trailing ${trailingIcon}`}
          tabindex="0" 
          role="button"
        >i</i>
      )
    }

    return (
      <Fragment>
        <label className={`mdc-text-field rs-text-field
          ${leadingIcon ? 'mdc-text-field--with-leading-icon' : ''}
          ${trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}`
          }
          ref={(c) => this._node = c}
        >
          <div className="mdc-text-field__ripple"></div>
          {lIcon}
          <input 
            className="mdc-text-field__input"
            type={type || 'text'}
            aria-labelledby="my-label-id"
            value={this.valueToString(this.state.value)}
            onChange={this.onChange}
            min={min}
            max={max}
            step={type === 'number' ? '0.01' : undefined}
            pattern={regex}
          ></input>
          {tIcon}
          <span className="mdc-floating-label" id="my-label-id">{label}</span>
          <div className="mdc-line-ripple"></div>
        </label>
        {helpText}
      </Fragment>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  regex: PropTypes.string,
  leadingIcon: PropTypes.string,
  trailingIcon: PropTypes.string,
  hint: PropTypes.string,
};

export default TextField;
