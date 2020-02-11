import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Progress from '/src/components/Shared/Propgress/Progress.js';

import './InfoCard.css';

class InfoCard extends Component {
  currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(props) {
    super(props);

    this.state = {
      monthlyPayment: props.info?.monthlyPayment,
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.info?.monthlyPayment !== prevState.monthlyPayment) {
      return {
        monthlyPayment: newProps.info.monthlyPayment,
        animate: true,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.animate) {
      setTimeout(() => {
        this.setState({
          animate: false,
        });
      }, 500);
    }
  }

  render() {
    if (!this.props.info) return false;

    if (this.props.info.fetching) {
      return (
        <div className="mdc-card">
          <Progress></Progress>
        </div>
      );
    }

    const {msrp, name, monthlyPayment, taxes, dealer} = this.props.info;
    return (
      <div className="mdc-card">
        <div className="mdc-list mdc-list--non-interactive">
          <div className="mdc-list-item rs-msrp">
            <span className="mdc-list-item__text">MSRP</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              {this.currencyFormat.format(msrp)}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">{name}</span>
          </div>
          <div className="mdc-list-item rs-monthly">
            <span className="mdc-list-item__text">Monthly payment</span>
            <span
              className={`mdc-list-item__meta ${this.state.animate ? 'rs-animate' : ''}`}
              aria-hidden="true"
            >
              {monthlyPayment && this.currencyFormat.format(monthlyPayment)}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">Taxes</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              {taxes === 0 ? '-' : taxes.join('.')}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">{dealer.name}</span>
          </div>
          <div className="mdc-list-item">
            <i className="mdc-list-item__graphic material-icons">phone</i>
            <span className="mdc-list-item__text">
              {dealer.phone}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">Dealer rating</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              {dealer.rating}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

InfoCard.propTypes = {
  info: PropTypes.object,
};

export default InfoCard;
