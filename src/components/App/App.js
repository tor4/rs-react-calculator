import React, {Component, Fragment} from 'react';
import TabBar from '/src/components/Shared/TabBar/TabBar.js';
import Loan from '/src/components/Loan/Loan.js';
import Lease from '/src/components/Lease/Lease.js';

import './App.css';

class App extends Component {
  state = {
    activeTab: 'Loan',
  };

  tabs = [
    {name: 'Loan'},
    {name: 'Lease'},
  ];

  constructor(props) {
    super(props);

    this.onActiveTabChanged = this.onActiveTabChanged.bind(this);
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
              <div className="mdc-layout-grid__cell--span-8">
                <TabBar 
                  active={this.state.activeTab}
                  tabs={this.tabs}
                  onActiveChanged={this.onActiveTabChanged}
                ></TabBar>
                {tabContent}
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
