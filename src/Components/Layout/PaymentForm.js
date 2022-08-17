import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    formData: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="my-4">
              <input
                type="tel"
                name="number"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="my-4">
              <input
                type="text"
                name="name"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
   

              <div class="grid md:grid-cols-4 gap-x-3">
                <div class="mb-4 md:col-span-2">
                    <input
                      type="tel"
                      name="expiry"
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      placeholder="Valid Thru"
                      pattern="\d\d/\d\d"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                </div>

              <div className="mb-4 md:col-span-2">
                  <input
                    type="tel"
                    name="cvc"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
              </div>

            </div>
            {/* <input type="hidden" name="issuer" value={issuer} /> */}
            <div className="form-actions">
              <button className="w-full text-bold px-5 py-2 inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600">PAY</button>
            </div>
          </form>
          {this.state.formData && (
            <div className="App-highlight">
              {this.state.formData.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
      </div>
    );
  }
}