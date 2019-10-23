import React, { Component } from 'react';
import GetsuContext from '../GetsuContext';
import ItemsApiService from '../services/items-api-service';
import NumericInput from 'react-numeric-input';
import ProgressBar from './ProgressBar';

export default class ItemDetail extends Component {
  static contextType = GetsuContext;

  state = {
    hasServerResponse: false,
    currentItem: null,
    local_quantity: 0,
    local_max_quantity: 0,
    percent: 0,
  };

  handleGetItem = (item_id) => {
    ItemsApiService.getItemRequest(item_id)
      .then((item) => {
        this.setState({
          hasServerResponse: true,
          currentItem: item,
          local_quantity: item.quantity,
          local_max_quantity: item.max_quantity,
          percent: (item.quantity / item.max_quantity) * 100,
        });
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleUpdateItem = (item_id) => {
    // if item doesn't exist, early exit
    // if (!this.context.getItem(item_id)) {
    //   return;
    // }

    // if not authorized, early exit
    if (!this.context.hasAuthToken()) {
      return;
    }

    ItemsApiService.updateItemRequest(item_id, {
      quantity: this.state.local_quantity,
      max_quantity: this.state.local_max_quantity,
    }).catch((error) => {
      this.context.setError(error);
    });
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

  handleChange = (val) => {
    if (val >= this.state.currentItem.max_quantity) {
      this.setState(
        {
          local_quantity: val,
          local_max_quantity: val,
          percent: 100,
        },
        () => this.handleUpdateItem(this.props.match.params.item_id)
      );
    } else if (val < this.state.currentItem.max_quantity) {
      this.setState(
        {
          local_quantity: val,
          local_max_quantity: this.state.currentItem.max_quantity,
          percent: (val / this.state.currentItem.max_quantity) * 100,
        },
        () => this.handleUpdateItem(this.props.match.params.item_id)
      );
    }
  };

  handleWindowClose = (e) => {
    e.preventDefault();
    return (e.returnValue = this.handleUpdateItem(this.props.match.params.item_id));
  };

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.handleWindowClose);
    this.handleGetItem(this.props.match.params.item_id);
  };

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.handleWindowClose);
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
    let expiration_display;

    if (error) {
      content = (
        <div className="error-display" role="alert">
          {error.message ? 'Internal Server Error' : error.error.message}
        </div>
      );
    } else {
      if (this.state.currentItem.expiration_date) {
        const d = new Date(this.state.currentItem.expiration_date);
        expiration_display = (
          <div className="custom-form__input-container">
            <div className="custom-form__label">Expires</div>
            <div>
              {`${d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)}
              / ${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}
              / ${d.getFullYear()}`}
            </div>
          </div>
        );
      }
      content = (
        <section className="ItemDetail">
          <header>
            <h1>{this.state.currentItem.item_name}</h1>
          </header>
          <form className="custom-form">
            <div className="custom-form__input-container">
              <ProgressBar
                expiration_date={`${this.state.currentItem.expiration_date}`}
                now={Math.round(this.state.percent)}
                label={`${this.state.local_quantity} / ${this.state.local_max_quantity} ${this.state.currentItem.unit_type}`}
              />
            </div>
            <div className="custom-form__input-container">
              <div className="custom-form__label">Quantity</div>
              <div>
                <NumericInput
                  placeholder="Quantity"
                  strict
                  min={0}
                  precision={2}
                  defaultValue={this.state.local_quantity}
                  onChange={this.handleChange}
                  style={{
                    input: {
                      height: '3rem',
                    },
                    btn: {
                      background: 'rgb(250, 250, 250)',
                      width: '2rem',
                    },
                    'btnUp.mobile': {
                      width: '4rem',
                    },
                    'btnDown.mobile': {
                      width: '4rem',
                    },
                  }}
                />
              </div>
            </div>
            <p />
            {expiration_display}
            <p />
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
