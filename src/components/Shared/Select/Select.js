import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MDCSelect} from '@material/select';

import './Select.css';

class Select extends Component {
  _node;
  _mdcComponent;

  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this._mdcComponent = new MDCSelect(this._node);
    this._mdcComponent.listen('MDCSelect:change', this.onChange);
  }

  componentWillUnmount() {
    this._mdcComponent.unlisten('MDCSelect:change', this.onChange);
    this._mdcComponent.destroy();
  }

  onChange({detail: {value}}) {
    this.props.onChange(value);
  }

  render() {
    const {value: selected} = this.props;

    const items = this.props.items?.map((item, i) => {
      return (
        <li
          className={`mdc-list-item 
            ${item.value === selected ? 'mdc-list-item--selected' : ''}`}
          aria-selected={item.value === selected ? 'true' : ''}
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
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

Select.defaultProps = {
  label: '',
  items: [],
  onChange: () => {},
}

export default Select;
