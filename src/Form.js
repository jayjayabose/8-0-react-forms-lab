import React from "react";
import "./Form.css";

/**
 * end point: mode function
 */

class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      values: '',
      operation: '',
      result: null,
    };
  }

  handleValues = (event) => {
    //console.log('test');
    let {name, value} = event.target;
    //value = value.split(',').map(element => Number(element));
    console.log(`handleValues: typeof(values): ${typeof(value)}`);

    this.setState({
      [name]: value,  
    })
    
  }

  handleOperation = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]:value
    });
  }

  handleCalculate = (event) => {
    event.preventDefault();
    let {values, operation} = this.state;
    //const {values, operation} = event;  //can set values from state or event
    values = values.split(',').map(element => Number(element)).sort((a,b)=>{return a-b});
    console.log(`handleCalculate: values: ${values}`);
    console.log(`handleCalculate: operation: ${operation}`);
    
    //hardcoding sum for initial test
    
    this.setState({
      result: this.calculate(operation, values)
    });


    //sum:  sum = arr.reduce(function (a, b) {return a + b;}, 0);.
    //average: divide by length
    //mode
    
  }

  calculate = (operation, values) => {
    //let sum = values.reduce((a,b)=>{return a+b});
    return (operation === 'sum') ? values.reduce((a,b)=>{return a+b}) :
           (operation === 'average') ? values.reduce((a,b)=>{return a+b})/values.length : this.findMode(values);
    
  }

  findMode = (values) => {
    let counts = {};
    values.forEach( e => {
      if(counts[e] === undefined) {
        counts[e] = 0
      }
      counts[e] += 1
    })

    let arr = Object.values(counts);    
    let max = Math.max(...arr);    
    return Object.keys(counts).filter( k => counts[k] === max).join(',');
    
    //console.log(`findMode: mode: ${mode}`);
    //return mode.join(',');
    //https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
  }

  render() {
    const {values, operation} = this.state;
    console.log(`render: values: ${this.state.values}`);
    console.log(`render: operation: ${this.state.operation}`);
    console.log(`render: result: ${this.state.result}`);

    let resultText = (this.state.result === null) ? '' : this.state.result;
    
    return (
      <form onSubmit={this.handleCalculate}>
        <input id="values" name="values" value={values} type="text" onChange={this.handleValues}/>
        <select id="operation" name="operation" value={operation} onChange={this.handleOperation}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
        <h2>{resultText}</h2>
      </form>
      
    );
  }
}

export default Form;

/**
 Question: why create handlers for form elements? Can't we simply read all form element values on submit?  Is the reason so that we can create user interaction (e.g. error messages) upon interaction with form elements? 
 */  