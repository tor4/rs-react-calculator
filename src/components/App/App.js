import React, {Component, Fragment} from 'react';
import TabBar from '/src/components/Shared/TabBar/TabBar.js';
import Loan from '/src/components/Loan/Loan.js';
import Lease from '/src/components/Lease/Lease.js';
import InfoCard from '/src/components/InfoCard/InfoCard.js';
import DelayedPromise from '/src/utils/DelayedPromise.js';
import {withStorage} from '/src/components/hoc/with-storage_hoc.js';
import {calculateLoan, calculateLease} from '/src/utils/calculator_utils.js';
import {getPostCode} from '/src/services/ip-info_service.js';
import PropTypes from 'prop-types';

import MockInfoData from '/src/data/info.js';
import './App.css';

class App extends Component {
  state = {
    activeTab: 'Loan',
    calculator: {
      loan: {
        downPayment: 0,
        tradeIn: 0,
        creditScore: 750,
        apr: 0,
        postCode: '220100',
        terms: 24,
      },
      lease: {
        downPayment: 0,
        tradeIn: 0,
        creditScore: 750,
        postCode: '220100',
        terms: 36,
        mileages: 12000,
      },
    },
    info: null,
  };

  tabs = [
    {name: 'Loan'},
    {name: 'Lease'},
  ];

  constructor(props) {
    super(props);

    this.onActiveTabChanged = this.onActiveTabChanged.bind(this);
    this.calculateLoan = this.calculateLoan.bind(this);
    this.calculateLease = this.calculateLease.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    await this.restoreData();
    await this.loadInfo();

    this.calculate();

    window.addEventListener('beforeunload', this.saveData);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveData);
  }

  calculate() {
    if (this.state.activeTab === 'Loan') {
      this.calculateLoan();
    } else {
      this.calculateLease();
    }
  }

  saveData() {
    this.props.store.saveData({
      activeTab: this.state.activeTab,
      calculator: this.state.calculator,
    });
  }

  async restoreData() {
    const data = this.props.store.getData();

    if (data) {
      this.setState({
        initialized: true,
        ...data,
      });

      return;
    }

    const postCode = await getPostCode();

    this.setState({
      initialized: true,
      calculator: {
        lease: {
          ...this.state.calculator.lease,
          postCode: postCode,
        },
        loan: {
          ...this.state.calculator.loan,
          postCode: postCode,
        },
      },
    });
  }

  async loadInfo() {
    this.setState({
      info: {fetching: true},
    });

    const infoData = await new DelayedPromise((resolve) => {
      resolve(MockInfoData);
    });

    this.setState({
      info: {
        ...infoData,
      },
    });
  }

  onActiveTabChanged(index) {
    this.setState({
      activeTab: this.tabs[index].name,
    });

    this.calculate();
  }

  async calculateLoan(data) {
    if (data) {
      this.setState({
        calculator: {
          loan: data,
          lease: {
            ...this.state.calculator.lease,
            downPayment: data.downPayment,
            tradeIn: data.tradeIn,
            creditScore: data.creditScore,
          },
        },
      });
    }

    const {monthlyPayment, taxes} = await calculateLoan({
      ...(data || this.state.calculator.loan),
      msrp: this.state.info.msrp,
    }, 1000);

    this.setState({
      info: {
        ...this.state.info,
        monthlyPayment,
        taxes,
      },
    });
  }

  async calculateLease(data) {
    if (data) {
      this.setState({
        calculator: {
          lease: data,
          loan: {
            ...this.state.calculator.loan,
            downPayment: data.downPayment,
            tradeIn: data.tradeIn,
            creditScore: data.creditScore,
          },
        },
      });
    }

    const {monthlyPayment, taxes} = await calculateLease({
      ...(data || this.state.calculator.lease),
      msrp: this.state.info.msrp,
    }, 1000);

    this.setState({
      info: {
        ...this.state.info,
        monthlyPayment,
        taxes,
      },
    });
  }

  render() {
    const {activeTab} = this.state;
    let tabContent;
    if (activeTab === 'Loan') {
      tabContent = (
        <Loan
          key={this.state.initialized}
          msrp={this.state.info?.msrp}
          initial={this.state.calculator.loan}
          onChange={this.calculateLoan}
        ></Loan>
      );
    } else if (activeTab === 'Lease') {
      tabContent = (
        <Lease
          key={this.state.initialized}
          msrp={this.state.info?.msrp}
          initial={this.state.calculator.lease}
          onChange={this.calculateLease}
        ></Lease>
      );
    }

    return (
      <Fragment>
        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <h1>
                <i className="material-icons mdc-top-app-bar__navigation-icon">account_balance</i>
                <span className="mdc-top-app-bar__title">RS React Calculator</span>
              </h1>
            </section>
          </div>
        </header>
        <main className="main">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__inner">
              <div className="mdc-layout-grid__cell--span-2"></div>
              <div className="mdc-layout-grid__cell--span-5">
                <TabBar
                  active={this.state.activeTab}
                  tabs={this.tabs}
                  onActiveChanged={this.onActiveTabChanged}
                ></TabBar>
                {tabContent}
              </div>
              <div className="mdc-layout-grid__cell--span-3">
                <InfoCard
                  info={this.state.info}
                ></InfoCard>
              </div>
              <div className="mdc-layout-grid__cell--span-2"></div>
            </div>
          </div>
        </main>
        <footer>

        </footer>
      </Fragment>
    );
  }
}

App.propTypes = {
  store: PropTypes.object,
};

export default withStorage(App);
