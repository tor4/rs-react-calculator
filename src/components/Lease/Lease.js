import React, {Component} from 'react';
import TextField from '/src/components/Shared/TextField/TextField.js';
import Select from '/src/components/Shared/Select/Select.js';

class Lease extends Component {
  render() {
    return (
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
    );
  }
}

export default Lease;
