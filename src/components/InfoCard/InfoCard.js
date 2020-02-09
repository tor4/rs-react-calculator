import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Progress from '/src/components/Shared/Propgress/Progress.js';

import './InfoCard.css';

class InfoCard extends Component {
  render() {
    if (!this.props.info) return false;

    if (this.props.info.fetching) {
      return (
        <div className="mdc-card">
          <Progress></Progress>
        </div>
      );
    }

    const {msrp, name, monthly, taxes, dealer} = this.props.info;
    return (
      <div className="mdc-card">
        <div className="mdc-list mdc-list--non-interactive">
          <div className="mdc-list-item rs-msrp">
            <span className="mdc-list-item__text">MSRP</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              ${msrp}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">{name}</span>
          </div>
          <div className="mdc-list-item rs-monthly">
            <span className="mdc-list-item__text">Monthly payment</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              {monthly === 0 ? '-' : '$' + monthly}
            </span>
          </div>
          <div className="mdc-list-item">
            <span className="mdc-list-item__text">Taxes</span>
            <span className="mdc-list-item__meta" aria-hidden="true">
              {taxes === 0 ? '-' : '$' + taxes}
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
