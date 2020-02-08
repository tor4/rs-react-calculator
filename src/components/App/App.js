import React, {Component, Fragment} from 'react';
import Button from '/src/components/Shared/Button/Button.js';
import TextField from '/src/components/Shared/TextField/TextField.js';
import Select from '/src/components/Shared/Select/Select.js';

import './App.css';

class App extends Component {
  render() {
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
                <div className="mdc-tab-bar" role="tablist">
                  <div className="mdc-tab-scroller">
                    <div className="mdc-tab-scroller__scroll-area">
                      <div className="mdc-tab-scroller__scroll-content">
                        <button className="mdc-tab mdc-tab--active mdc-tab--stacked" role="tab" aria-selected="true" tabIndex="0">
                          <span className="mdc-tab__content">
                            <span className="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
                            <span className="mdc-tab__text-label">Loan</span>
                          </span>
                          <span className="mdc-tab-indicator mdc-tab-indicator--active">
                            <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                          </span>
                          <span className="mdc-tab__ripple"></span>
                        </button>
                        <button className="mdc-tab mdc-tab--stacked" role="tab" aria-selected="true" tabIndex="0">
                          <span className="mdc-tab__content">
                            <span className="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
                            <span className="mdc-tab__text-label">Lease</span>
                          </span>
                          <span className="mdc-tab-indicator mdc-tab-indicator--active">
                            <span className="mdc-tab-indicator__content"></span>
                          </span>
                          <span className="mdc-tab__ripple"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <div className="mdc-layout-grid">
                    <TextField label="Down Payment"></TextField>
                    <TextField label="Trade-In"></TextField>
                    <TextField label="APR"></TextField>
                    <TextField label="Post Code"></TextField>
                    <div>
                      <h3 className="mdc-typography--subtitle1">Term (Month)</h3>
                      <Button label="12" outlined></Button>
                      <Button label="24" outlined raised></Button>
                      <Button label="36" outlined></Button>
                      <Button label="48" outlined></Button>
                      <Button label="60" outlined></Button>
                      <Button label="72" outlined></Button>
                      <Button label="84" outlined></Button>
                    </div>
                    <div>
                      <h3 className="mdc-typography--subtitle1">Credit Score</h3>
                      <Button label="600" outlined></Button>
                      <Button label="650" outlined></Button>
                      <Button label="700" outlined></Button>
                      <Button label="750" outlined raised></Button>
                      <Button label="800" outlined></Button>
                      <Button label="850" outlined></Button>
                      <Button label="900" outlined></Button>
                    </div>
                  </div>
                </div> */}

                <div>
                  <div className="mdc-layout-grid">
                    <div className="">
                      <div className="">
                        <TextField label="Down Payment"></TextField>
                      </div>
                      <div className="">
                        <TextField label="Trade-In"></TextField>
                      </div>
                      <div className="">
                        <TextField label="Post Code"></TextField>
                      </div>
                      <div className="">
                        <Select label="Terms" items={[
                          {text: 1, value: 1},
                          {text: 2, value: 2},
                        ]}></Select>
                      </div>
                      <div className="">
                        <Select label="Mileages"></Select>
                      </div>
                      <div className="">
                        <Select label="Credit Score"></Select>
                      </div>
                    </div>
                    
                    
                    
                    
                    
                  </div>
                </div>
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
