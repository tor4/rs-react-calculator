import React, {Component, Fragment} from 'react';
import TabBar from '/src/components/Shared/TabBar/TabBar.js';
import Loan from '/src/components/Loan/Loan.js';
import Lease from '/src/components/Lease/Lease.js';
import InfoCard from '/src/components/InfoCard/InfoCard.js';
import DelayedPromise from '/src/utils/DelayedPromise.js';
import {calculateLoan, calculateLease} from '/src/utils/calculator_utils.js';

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
      }
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
  }

  async componentDidMount() {
    this.setState({
      info: {
        fetching: true,
      },
    });

    const infoData = await new DelayedPromise((resolve) => {
      resolve(MockInfoData);
    });

    this.setState({
      info: {
        ...infoData,
        fetching: false,
      },
    });

    if (this.state.activeTab === 'Loan') {
      this.calculateLoan();
    }
  }

  onActiveTabChanged(index) {
    this.setState({
      activeTab: this.tabs[index].name,
    });
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

  calculateLease(data) {

  }

  render() {
    const {activeTab} = this.state;
    let tabContent;
    if (activeTab === 'Loan') {
      tabContent = (<Loan 
        initial={this.state.calculator.loan} 
        onChange={this.calculateLoan}
      ></Loan>)
    } else if (activeTab === 'Lease') {
      tabContent = (<Lease 
        initial={this.state.calculator.lease} 
        onChange={this.calculateLease}
      ></Lease>)
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

export default App;
