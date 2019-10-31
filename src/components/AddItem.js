import React, { Component } from 'react';
import GetsuContext from '../GetsuContext';
import ItemsApiService from '../services/items-api-service';
import RequiredField from './RequiredField';
import Switch from './Switch';
import DocumentUtils from '../utils/document-utils';
import TimeUtils from '../utils/time-utils';
import Error from './Error';

export default class AddItem extends Component {
  static contextType = GetsuContext;

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
        value: e.target.checked ? this.state.expiration_date.value : null,
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
    newItem.expiration_date = TimeUtils.dateToTimestamp(newItem.expiration_date);
    this.handleCreateItem(newItem);
  };

  handleCreateItem = (item) => {
    ItemsApiService.createItemRequest(item)
      .then((item) => {
        this.context.addItem(item);
        this.props.history.push('/', { item_id: item.id });
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  componentDidMount = () => {
    DocumentUtils.scrollToTop();
  };

  componentWillUnmount = () => {
    if (this.context.error) {
      this.context.clearError();
    }
  };

  render() {
    const { error } = this.context;
    if (error) {
      return <Error error={error} />;
    } else {
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
                className="custom-form__input"
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
                className="custom-form__input"
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
                className="custom-form__input"
                type="text"
                name="unit_type"
                id="unit_type"
                onChange={this.handleChange}
                placeholder="e.g. units, cups, lbs, kg"
              />
            </div>
            <div className="custom-form__input-container">
              <div>Has Expiration Date</div>
              <Switch
                additionalClass="custom-form__input"
                identifier={`toggle_expiration_date`}
                isOn={this.state.toggle_expiration_date}
                onColor="#06D6A0"
                handleToggle={this.handleToggleExpirationDate}
              />
            </div>
            {this.state.toggle_expiration_date && (
              <div className="custom-form__input-container">
                <label htmlFor="expiration_date">Expiration Date</label>
                <input
                  className="custom-form__input--expiration-date"
                  type="date"
                  name="expiration_date"
                  id="expiration_date"
                  onChange={this.handleChange}
                />
              </div>
            )}
            <div className="custom-form__buttons-container">
              <button
                type="button"
                className="call-to-action--gray"
                onClick={() => this.props.history.push('/', null)}
                aria-label="Go Back"
              >
                <i className="fas fa-angle-double-left"></i> Back
              </button>
              <button type="submit" className="call-to-action--green" aria-label="Save">
                <i className="fas fa-save"></i> Save
              </button>
            </div>
          </form>
        </section>
      );
    }
  }
}
