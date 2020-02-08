import React, {Component, Fragment} from 'react';
import {MDCTextField} from '@material/textfield';
import PropTypes from 'prop-types';

import './TextField.css';

class TextField extends Component {
  _node;

  componentDidMount() {
    new MDCTextField(this._node);
  }

  render() {
    return (
      <Fragment>
        <label className="mdc-text-field mdc-text-field--with-leading-icon rs-text-field"
          ref={(c) => this._node = c}
        >
          <div className="mdc-text-field__ripple"></div>
          <i className="material-icons mdc-text-field__icon">favorite</i>
          <input className="mdc-text-field__input" type="text" aria-labelledby="my-label-id" required></input>
          <span className="mdc-floating-label" id="my-label-id">{this.props.label}</span>
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
  hint: PropTypes.string,
};

export default TextField;
