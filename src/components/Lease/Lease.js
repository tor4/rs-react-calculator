import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as debounce from 'lodash.debounce';
import TextField from '/src/components/Shared/TextField/TextField.js';
import Select from '/src/components/Shared/Select/Select.js';

class Lease extends Component {
  state = {
    downPayment: this.props.initial?.downPayment || 0,
    tradeIn: this.props.initial?.tradeIn || 0,
    creditScore: this.props.initial?.creditScore || 750,
    mileages: this.props.initial?.mileages || 12000,
    postCode: this.props.initial?.postCode || '220100',
    terms: this.props.initial?.terms || 36,
  }

  terms = [24, 36, 48].map((term) => ({text: term, value: term}));

  mileages = [10000, 12000, 15000]
        .map((mileage) => ({text: mileage, value: mileage}));

  creditScore = [600, 650, 700, 750, 800, 850, 900]
        .map((score) => ({text: score, value: score}))

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.dataChangedDebounced = debounce(() => {
      this.props.onChange({
        ...this.state,
      });
    }, 300);
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
    });

    this.dataChangedDebounced();
  }

  render() {
    const state = this.state;
    const {msrp} = this.props;
    const max = ((msrp || 0)/4).toFixed(2);

    return (
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell--span-6">
            <TextField
              type='number'
              label="Down Payment"
              value={state.downPayment}
              min={0}
              max={max}
              onChange={(value) => this.onChange('downPayment', +value)}
            ></TextField>
          </div>
          <div className="mdc-layout-grid__cell--span-6">
            <TextField
              type='number'
              label="Trade-In"
              value={state.tradeIn}
              min={0}
              max={max}
              onChange={(value) => this.onChange('tradeIn', +value)}
            ></TextField>
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <TextField
              regex='^\d+$'
              label="Post Code"
              value={state.postCode}
              onChange={(value) => this.onChange('postCode', value)}
            ></TextField>
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <Select 
              label="Terms"
              value={state.terms} 
              items={this.terms}
              onChange={(value) => this.onChange('terms', +value)}
            ></Select>
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <Select
              label="Mileages"
              value={state.mileages}
              items={this.mileages}
              onChange={(value) => this.onChange('mileages', +value)}
            ></Select>
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <Select label="Credit Score"
              value={state.creditScore}
              items={this.creditScore}
              onChange={(value) => this.onChange('creditScore', +value)}
            ></Select>
          </div>
        </div>
      </div>
    );
  }
}

Lease.propTypes = {
  msrp: PropTypes.number,
  initial: PropTypes.object,
  onChange: PropTypes.func,
};

export default Lease;
