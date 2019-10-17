import React, { Component } from 'react';
import ItemContext from '../ItemContext';
import ItemsApiService from '../services/items-api-service';

export default class AddItem extends Component {
  static contextType = ItemContext;

  state = {
    item_name: {
      value: '',
      touched: false,
    },
    quantity: {
      value: '',
      touched: false,
    },
    unit_type: {
      value: '',
      touched: false,
    },
    expiration_date: {
      value: '',
      touched: false,
    },
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        touched: true,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item_name: this.state.item_name.value,
      quantity: this.state.quantity.value,
      max_quantity: this.state.quantity.value,
      unit_type: this.state.unit_type.value,
      expiration_date: this.state.expiration_date.value,
    };
    this.handleCreateItem(newItem);
  };

  handleCreateItem = (item) => {
    ItemsApiService.createItemRequest(item)
      .then((item) => {
        this.context.addItem(item);
        this.props.history.goBack();
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  render() {
    return (
      <section className="AddItem">
        <h1>Add Item</h1>
        <form className="AddItem__form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="item_name">Item Name</label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              step="any"
              name="quantity"
              id="quantity"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="unit_type">Unit Type</label>
            <input
              type="text"
              name="unit_type"
              id="unit_type"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expiration_date">Expiration Date</label>
            <input
              type="date"
              name="expiration_date"
              id="expiration_date"
              onChange={this.handleChange}
            />
          </div>
          <div className="AddItem__form__buttons">
            <button type="button" onClick={this.props.history.goBack}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}
