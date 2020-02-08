import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MDCSelect} from '@material/select';

import './Select.css';

class Select extends Component {
  _node;

  componentDidMount() {
    const select = new MDCSelect(this._node);

    select.listen('MDCSelect:change', () => {
      console.error(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    });
  }

  render() {
    const items = this.props.items?.map((item, i) => {
      return (
        <li className="mdc-list-item" 
          data-value={item.value}
          key={i}
        >
          {item.text}
        </li>
      )
    });

    return (
      <div className="mdc-select rs-select--fullwidth"
        ref={(c) => this._node = c}
      >
        <div className="mdc-select__anchor demo-width-class">
          <i className="mdc-select__dropdown-icon"></i>
          <div className="mdc-select__selected-text"></div>
          <span className="mdc-floating-label">{this.props.label}</span>
          <div className="mdc-line-ripple"></div>
        </div>

        <div className="mdc-select__menu mdc-menu mdc-menu-surface">
          <ul className="mdc-list">
            <li className="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true"></li>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Select;
