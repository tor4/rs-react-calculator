import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as debounce from 'lodash.debounce';
import Button from '/src/components/Shared/Button/Button.js';
import TextField from '/src/components/Shared/TextField/TextField.js';

class Loan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downPayment: this.props.initial?.downPayment || 0,
      tradeIn: this.props.initial?.tradeIn || 0,
      creditScore: this.props.initial?.creditScore || 750,
      apr: this.props.initial?.apr || 0,
      postCode: this.props.initial?.postCode || '220100',
      terms: this.props.initial?.terms || 24,
    };

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

    const terms = [12, 24, 36, 48, 60, 72, 84].map((term, i) => {
      return (
        <Button
          key={i}
          label={term}
          outlined
          raised={state.terms === term}
          onClick={() => this.onChange('terms', term)}
        ></Button>
      );
    });

    const creditScore = [600, 650, 700, 750, 800, 850, 900].map((score, i) => {
      return (
        <Button
          key={i}
          label={score}
          outlined
          raised={state.creditScore === score}
          onClick={() => this.onChange('creditScore', score)}
        ></Button>
      );
    });

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
              leadingIcon='currency-usd'
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
              leadingIcon='currency-usd'
              onChange={(value) => this.onChange('tradeIn', +value)}
            ></TextField>
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <TextField
              type='number'
              label="APR"
              min={0}
              value={state.apr}
              trailingIcon='percent'
              onChange={(value) => this.onChange('apr', +value)}
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
            <h3 className="mdc-typography--subtitle1">Term (Month)</h3>
            {terms}
          </div>
          <div className="mdc-layout-grid__cell--span-12">
            <h3 className="mdc-typography--subtitle1">Credit Score</h3>
            {creditScore}
          </div>
        </div>
      </div>
    );
  }
}

Loan.propTypes = {
  msrp: PropTypes.number,
  initial: PropTypes.object,
  onChange: PropTypes.func,
};

export default Loan;
