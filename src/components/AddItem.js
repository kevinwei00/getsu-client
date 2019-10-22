import React, { Component } from 'react';
import ItemContext from '../ItemContext';
import ItemsApiService from '../services/items-api-service';
import RequiredField from './RequiredField';

export default class AddItem extends Component {
  static contextType = ItemContext;

  state = {
    toggle_expiration_date: false,
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

  handleToggleExpirationDate = (e) => {
    this.setState({
      toggle_expiration_date: e.target.checked,
      expiration_date: {
        value: e.target.value ? e.target.checked : null,
        touched: !e.target.checked,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item_name: this.state.item_name.value,
      quantity: this.state.quantity.value,
      max_quantity: this.state.quantity.value,
      unit_type: this.state.unit_type.value ? this.state.unit_type.value : 'units',
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
        <header>
          <h1>Add Item</h1>
        </header>
        <form className="custom-form" onSubmit={this.handleSubmit}>
          <div className="custom-form__input-container">
            <label htmlFor="item_name">
              Name <RequiredField />
            </label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="custom-form__input-container">
            <label htmlFor="quantity">
              Quantity <RequiredField />
            </label>
            <input
              type="number"
              step="any"
              name="quantity"
              id="quantity"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="custom-form__input-container">
            <label htmlFor="unit_type">Unit Type</label>
            <input
              type="text"
              name="unit_type"
              id="unit_type"
              onChange={this.handleChange}
              placeholder="e.g. units, cups, lbs, kg"
            />
          </div>
          <div className="custom-form__input-container">
            <label htmlFor="toggle_expiration_date">Has Expiration Date</label>
            <input
              type="checkbox"
              name="toggle_expiration_date"
              id="toggle_expiration_date"
              onChange={this.handleToggleExpirationDate}
            />
          </div>
          {this.state.toggle_expiration_date && (
            <div className="custom-form__input-container">
              <label htmlFor="expiration_date">Expiration Date</label>
              <input
                type="date"
                name="expiration_date"
                id="expiration_date"
                onChange={this.handleChange}
              />
            </div>
          )}
          <div className="custom-form__buttons-container">
            <button onClick={this.props.history.goBack} aria-label="Go Back">
              <i class="fas fa-angle-double-left"></i> Back
            </button>
            <button type="submit" aria-label="Save">
              <i class="fas fa-save"></i> Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}
