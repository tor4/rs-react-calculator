import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './InfoCard.css';

class InfoCard extends Component {
  currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(props) {
    super(props);

    this.state = {
      monthlyPayment: props.monthlyPayment,
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.monthlyPayment !== prevState.monthlyPayment) {
      return {
        monthlyPayment: newProps.monthlyPayment,
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
    const {msrp, name, monthlyPayment, taxes, dealer, imgSrc} = this.props;
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
          <img src={imgSrc} alt={name}></img>
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
              {taxes === 0 ? '-' : taxes?.join('.')}
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
  monthlyPayment: PropTypes.string,
  msrp: PropTypes.number,
  name: PropTypes.string,
  taxes: PropTypes.array,
  dealer: PropTypes.object,
  imgSrc: PropTypes.string,
};

export default InfoCard;
