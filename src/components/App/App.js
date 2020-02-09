import React, {Component, Fragment} from 'react';
import TabBar from '/src/components/Shared/TabBar/TabBar.js';
import Loan from '/src/components/Loan/Loan.js';
import Lease from '/src/components/Lease/Lease.js';
import InfoCard from '/src/components/InfoCard/InfoCard.js';

import MockInfoData from '/src/data/info.js';
import './App.css';

class App extends Component {
  state = {
    activeTab: 'Loan',
    calculator: {
      downPayment: 0,
      tradeIn: 0,
      creditScore: 750,
      loan: {
        apr: 0,
        postCode: '220100',
        terms: 24,
      },
      lease: {
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
  }

  async componentDidMount() {
    this.setState({
      info: {
        fetching: true,
      },
    });
    const infoData = await new Promise((resolve) => {
      setTimeout(() => resolve(MockInfoData), 3000);
    });

    this.setState({
      info: {
        ...infoData,
        fetching: false,
      },
    });
  }

  onActiveTabChanged(index) {
    this.setState({
      activeTab: this.tabs[index].name,
    });
  }

  render() {
    const {activeTab} = this.state;
    let tabContent;
    if (activeTab === 'Loan') {
      tabContent = (<Loan></Loan>)
    } else if (activeTab === 'Lease') {
      tabContent = (<Lease></Lease>)
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
