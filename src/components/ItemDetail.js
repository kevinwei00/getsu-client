import React, { Component } from 'react';
import GetsuContext from '../GetsuContext';
import ItemsApiService from '../services/items-api-service';
import ExpirationsService from '../services/expirations-service';
import NumericInput from 'react-numeric-input';
import ProgressBar from './ProgressBar';
import DocumentUtils from '../utils/document-utils';
import TimeUtils from '../utils/time-utils';
import Switch from './Switch';

export default class ItemDetail extends Component {
  static contextType = GetsuContext;

  state = {
    hasServerResponse: false,
    toggle_expiration_date: false,
    toggle_edit_max_quantity: false,
    toggle_edit_item_name: false,
    currentItem: null,
  };

  handleGetItem = (item_id) => {
    ItemsApiService.getItemRequest(item_id)
      .then((item) => {
        this.setState({
          hasServerResponse: true,
          toggle_expiration_date: !!item.expiration_date,
          currentItem: item,
        });
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleUpdateItem = (item_id) => {
    if (this.context.hasAuthToken()) {
      ItemsApiService.updateItemRequest(item_id, this.state.currentItem).catch(
        (error) => {
          this.context.setError(error);
        }
      );
    }
  };

  handleDeleteItem = (item_id) => {
    ItemsApiService.deleteItemRequest(item_id)
      .then(() => {
        this.context.deleteItem(item_id);
        this.props.history.push('/', null);
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleChange = (e, numericInputName) => {
    let updateCurrentItem = !!numericInputName
      ? { ...this.state.currentItem, [numericInputName]: e }
      : { ...this.state.currentItem, [e.target.name]: e.target.value };

    if (updateCurrentItem.max_quantity < updateCurrentItem.quantity) {
      updateCurrentItem.quantity = updateCurrentItem.max_quantity;
    }

    updateCurrentItem.expiration_date = TimeUtils.convertDateToTimestamp(
      updateCurrentItem.expiration_date
    );

    this.setState({ currentItem: updateCurrentItem }, () =>
      this.handleUpdateItem(this.props.match.params.item_id)
    );
  };

  handleToggleExpirationDate = (e) => {
    this.setState(
      {
        toggle_expiration_date: e.target.checked,
        currentItem: {
          ...this.state.currentItem,
          expiration_date: e.target.checked
            ? this.state.currentItem.expiration_date
              ? this.state.currentItem.expiration_date
              : null
            : null,
        },
      },
      () => this.handleUpdateItem(this.props.match.params.item_id)
    );
  };

  handleToggleEditMaxQuantity = () => {
    this.setState({
      toggle_edit_max_quantity: !this.state.toggle_edit_max_quantity,
    });
  };

  handleToggleEditItemName = () => {
    this.setState(
      {
        toggle_edit_item_name: !this.state.toggle_edit_item_name,
      },
      () => {
        const item_name_field = document.getElementById('item_name');
        if (item_name_field) {
          item_name_field.focus();
        }
      }
    );
  };

  handlePressEnter = (e) => {
    if (e.keyCode === 13) {
      document.querySelector('.custom-form').submit();
    }
  };

  handleWindowClose = (e) => {
    e.preventDefault();
    return (e.returnValue = this.handleUpdateItem(this.props.match.params.item_id));
  };

  componentDidMount = () => {
    // window.addEventListener('beforeunload', this.handleWindowClose);
    window.addEventListener('keypress', this.handlePressEnter);
    this.handleGetItem(this.props.match.params.item_id);
    DocumentUtils.scrollToTop();
  };

  componentWillUnmount = () => {
    // window.removeEventListener('beforeunload', this.handleWindowClose);
    window.removeEventListener('keypress', this.handlePressEnter);
  };

  render() {
    if (!this.state.hasServerResponse) {
      return (
        <div className="loading-display">
          <div className="loading-display__spinner"></div>
          Loading...
        </div>
      );
    }

    const { error } = this.context;
    let content;
    let expiration_date_string;
    let numericInputStyle = {
      input: {
        height: '3rem',
      },
      'input:not(.form-control)': {
        borderRadius: '0.25rem',
        padding: '0.35rem 0.7rem',
      },
      btn: {
        background: 'rgb(226, 226, 226)',
        width: '2rem',
      },
      'btnUp.mobile': {
        width: '4rem',
        borderRadius: '0.25rem',
      },
      'btnDown.mobile': {
        width: '4rem',
        borderRadius: '0.25rem',
      },
    };

    if (error) {
      content = (
        <div className="error-display" role="alert">
          {error.message ? 'Internal Server Error' : error.error.message}
        </div>
      );
    } else {
      if (this.state.currentItem.expiration_date) {
        expiration_date_string = ExpirationsService.toISOStringNoTime(
          this.state.currentItem.expiration_date
        );
      }
      content = (
        <section className="ItemDetail">
          <header>
            <h1>
              {this.state.toggle_edit_item_name ? (
                <input
                  className="custom-form__input"
                  type="text"
                  name="item_name"
                  id="item_name"
                  defaultValue={this.state.currentItem.item_name}
                  onChange={this.handleChange}
                  onBlur={this.handleToggleEditItemName}
                />
              ) : (
                <button
                  type="button"
                  className="custom-form__button--edit-text"
                  onClick={this.handleToggleEditItemName}
                  aria-label="Edit Item Name"
                >
                  {this.state.currentItem.item_name}
                </button>
              )}
            </h1>
          </header>
          <form className="custom-form">
            <div className="custom-form__input-container">
              <ProgressBar
                expiration_date={`${this.state.currentItem.expiration_date}`}
                now={Math.round(
                  (this.state.currentItem.quantity /
                    this.state.currentItem.max_quantity) *
                    100
                )}
                label={`${this.state.currentItem.quantity} / ${this.state.currentItem.max_quantity} ${this.state.currentItem.unit_type}`}
              />
            </div>
            <div className="custom-form__input-container">
              <div>Quantity</div>
              <div>
                <NumericInput
                  className="custom-form__input"
                  strict
                  min={0}
                  max={this.state.currentItem.max_quantity}
                  precision={2}
                  value={this.state.currentItem.quantity}
                  onChange={(val) => this.handleChange(val, 'quantity')}
                  style={numericInputStyle}
                />
              </div>
            </div>
            <div className="custom-form__input-container">
              <button
                type="button"
                className="custom-form__button--edit-toggle"
                onClick={this.handleToggleEditMaxQuantity}
                aria-label="Edit Max Quantity"
              >
                Max Quantity
              </button>
              {this.state.toggle_edit_max_quantity && (
                <div>
                  <NumericInput
                    className="custom-form__input"
                    strict
                    min={0}
                    precision={2}
                    defaultValue={this.state.currentItem.max_quantity}
                    onChange={(val) => this.handleChange(val, 'max_quantity')}
                    style={numericInputStyle}
                  />
                </div>
              )}
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
                  min={ExpirationsService.toISOStringNoTime(new Date())}
                  defaultValue={expiration_date_string}
                  onChange={this.handleChange}
                />
              </div>
            )}
            <div className="custom-form__buttons-container">
              <button
                type="button"
                className="call-to-action--gray"
                onClick={() =>
                  this.props.history.push('/', {
                    item_id: this.state.currentItem.item_id,
                  })
                }
                aria-label="Go Back"
              >
                <i className="fas fa-angle-double-left"></i> Back
              </button>
              <button
                type="button"
                className="call-to-action--red"
                onClick={() => this.handleDeleteItem(this.state.currentItem.item_id)}
                aria-label="Delete Item"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </form>
        </section>
      );
    }
    return <>{content}</>;
  }
}
