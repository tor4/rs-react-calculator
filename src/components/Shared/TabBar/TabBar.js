import React, {Component} from 'react';
import {MDCTabBar} from '@material/tab-bar';
import PropTypes from 'prop-types';

class TabBar extends Component {
  _node;
  _mdcComponent;

  constructor(props) {
    super(props),

    this.onActiveTabChangedHandler = this.onActiveTabChangedHandler.bind(this);
  }

  componentDidMount() {
    this._mdcComponent = new MDCTabBar(this._node);
    this._mdcComponent.listen('MDCTabBar:activated', this.onActiveTabChangedHandler);
  }

  componentWillUnmount() {
    this._mdcComponent.unlisten('MDCTabBar:activated', this.onActiveTabChangedHandler);
    this._mdcComponent.destroy();
  }

  onActiveTabChangedHandler({detail: {index}}) {
    this.props.onActiveChanged(index);
  }

  render() {
    const {active} = this.props;
    const tabs = this.props.tabs?.map((tab, i) => {
      const isActive = tab.name === active || i === active;
      return (
        <button 
          className={`mdc-tab ${isActive ? 'mdc-tab--active' : ''}`} 
          key={i}
          role="tab" 
          aria-selected="true" 
          tabIndex="0"
        >
          <span className="mdc-tab__content">
            <span className="mdc-tab__text-label">{tab.name}</span>
          </span>
          <span
            className={`mdc-tab-indicator ${isActive ? 'mdc-tab-indicator--active' : ''}`}
          >
            <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span className="mdc-tab__ripple"></span>
        </button>
      );
    });

    return (
      <div className="mdc-tab-bar" role="tablist"
        ref={(c) => this._node = c}
      >
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area">
            <div className="mdc-tab-scroller__scroll-content">
              {tabs}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

TabBar.propTypes = {
  active: PropTypes.string || PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.object),
  onActiveChanged: PropTypes.func,
};

TabBar.defaultProps = {
  tabs: [],
  onActiveChanged: () => {}
}

export default TabBar;
