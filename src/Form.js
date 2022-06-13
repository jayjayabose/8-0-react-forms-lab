import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      values: '',
      operation: '',
      result: null,
      error: false
    };
  }

  handleValues = (event) => {
    const {name, value} = event.target;
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
    let inputProvided = true;
    //const {values, operation} = event;  //can set values from state or event, is either preferable?

    //check that user provided input
    if (operation === '' || values === '') inputProvided = false;
  
    //process and validate the valuess provided
    values = values.split(',').map(element => Number(element)).sort((a,b)=>{return a-b});
    let valuesAreValid = values.every( value => {
      return !Number.isNaN(value); 
    });
    
    if (inputProvided && valuesAreValid){      
      this.setState({
        result: this.calculate(operation, values),
        error: false,
        values: '',
        operation: ''
      });
    }else{
      this.setState({
        error: true
      });
    }
  }

  calculate = (operation, values) => {
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
    //https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
  }

  render() {
    const {result, error, values, operation} = this.state;
    let resultText = (error === true) ? 'Invalid input.' : result;
    let classValue = (error === true) ? 'error' : '';
    
    return (
      <>
      <form onSubmit={this.handleCalculate}>
        <input class={classValue} id="values" name="values" value={values} type="text" onChange={this.handleValues}/>
        <select class={classValue} id="operation" name="operation" value={operation} onChange={this.handleOperation}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>        
      </form>
      <h2>{resultText}</h2>
      </>
    );
  }
}

export default Form;

/**
 Question: why create handlers for form elements? Can't we simply read all form element values on submit?  Is the reason so that we can create user interaction (e.g. error messages) upon interaction with form elements? 
 */  