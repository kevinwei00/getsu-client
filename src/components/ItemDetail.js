import React, { Component } from 'react';
import ItemContext from '../ItemContext';
import ItemsApiService from '../services/items-api-service';
import NumericInput from 'react-numeric-input';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class ItemDetail extends Component {
  static contextType = ItemContext;

  state = {
    currentItem: null,
    local_quantity: 0,
    local_max_quantity: 0,
    percent: 0,
  };

  handleGetItem = (item_id) => {
    ItemsApiService.getItemRequest(item_id)
      .then((item) => {
        this.setState({
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
    // if-statement here to check context if item exists

    ItemsApiService.updateItemRequest(item_id, {
      quantity: this.state.local_quantity,
      max_quantity: this.state.local_max_quantity,
    })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleDeleteItem = (item_id) => {
    ItemsApiService.deleteItemRequest(item_id)
      .then(() => {
        this.context.deleteItem(item_id);
        this.props.history.goBack();
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleChange = (val) => {
    // console.log(val);
    this.setState({ local_quantity: val });
    if (val >= this.state.currentItem.max_quantity) {
      this.setState({
        local_max_quantity: val,
        percent: 100,
      });
    } else if (val < this.state.currentItem.max_quantity) {
      this.setState({
        local_max_quantity: this.state.currentItem.max_quantity,
        percent: (val / this.state.currentItem.max_quantity) * 100,
      });
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
    this.handleUpdateItem(this.props.match.params.item_id);
  };

  render() {
    const { error } = this.context;
    let content;
    if (error) {
      content = (
        <div>{error.message ? 'Internal Server Error' : error.error.message}</div>
      );
    } else if (!this.state.currentItem) {
      content = <div>Loading...</div>;
    } else {
      const d = new Date(this.state.currentItem.expiration_date);
      const expiration_date = `
        ${d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)}
         / ${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}
         / ${d.getFullYear()}`;
      content = (
        <section className="ItemDetail">
          <h1>{this.state.currentItem.item_name}</h1>
          <ProgressBar
            now={Math.round(this.state.percent)}
            label={`${this.state.local_quantity} / ${this.state.local_max_quantity} ${this.state.currentItem.unit_type}`}
          />
          <div>
            <b>Quantity</b>
            <div>
              <NumericInput
                placeholder="Quantity"
                strict
                min={0}
                defaultValue={this.state.local_quantity}
                onChange={this.handleChange}
                style={{
                  wrap: {
                    fontSize: '1.4em',
                  },
                  input: {
                    height: '64px',
                    width: '128px',
                    fontWeight: 100,
                  },
                  btn: {
                    width: '32px',
                  },
                }}
              />
            </div>
            {/* out of {this.state.local_max_quantity} {this.state.currentItem.unit_type} */}
          </div>
          <p />
          <div>
            <b>Expires</b>
            <div>{expiration_date}</div>
          </div>
          <p />
          <button onClick={this.props.history.goBack}>Go Back</button>
          <button onClick={() => this.handleDeleteItem(this.state.currentItem.id)}>
            Delete Item
          </button>
        </section>
      );
    }
    return <>{content}</>;
  }
}
