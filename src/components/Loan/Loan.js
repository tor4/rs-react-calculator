import React, {Component} from 'react';
import Button from '/src/components/Shared/Button/Button.js';
import TextField from '/src/components/Shared/TextField/TextField.js';

class Loan extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Loan;
