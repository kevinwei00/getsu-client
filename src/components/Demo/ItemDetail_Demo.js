import React, { Component } from 'react';
import DemoContext from './DemoContext';
import NumericInput from 'react-numeric-input';
import ProgressBar from '../ProgressBar';
import DocumentUtils from '../../utils/document-utils';
export default class ItemDetail_Demo extends Component {
  static contextType = DemoContext;

  state = {
    gotContextItem: false,
    currentItem: null,
    local_quantity: 0,
    local_max_quantity: 0,
    percent: 0,
  };

  handleGetItem = (item_id) => {
    const item = this.context.getItem(item_id);
    if (!item) {
      return;
    }
    this.setState({
      gotContextItem: true,
      currentItem: item,
      local_quantity: item.quantity,
      local_max_quantity: item.max_quantity,
      percent: (item.quantity / item.max_quantity) * 100,
    });
  };

  handleUpdateItem = (item_id) => {
    this.context.updateItem(item_id, {
      quantity: this.state.local_quantity,
      max_quantity: this.state.local_max_quantity,
    });
  };

  handleDeleteItem = (item_id) => {
    this.context.deleteItem(item_id);
    this.props.history.push('/demo', null);
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
    DocumentUtils.scrollToTop();
  };

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.handleWindowClose);
  };

  render() {
    if (!this.state.gotContextItem) {
      return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          Item does not exist.
          <br />
          (All data is refreshed in the demo)
        </div>
      );
    }

    let expiration_display;

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

    return (
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
                className="custom-form__input"
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
                this.props.history.push('/demo', {
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
}