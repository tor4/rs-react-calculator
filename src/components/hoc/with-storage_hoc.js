import React, {Component} from 'react';

export function withStorage(OriginalComponent) {
  const name = OriginalComponent.displayName ||
    OriginalComponent.constructor.displayName ||
    OriginalComponent.constructor.name;

  const store = {
    getData() {
      return JSON.parse(localStorage.getItem(name));
    },
    saveData(data) {
      localStorage.setItem(name, JSON.stringify(data));
    },
  };

  return class StorageComponent extends Component {
    render() {
      return (
        <OriginalComponent store={store} {...this.props}></OriginalComponent>
      );
    };
  };
};
