import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ItemContext from '../ItemContext';
import ItemsApiService from '../services/items-api-service';
import Item from './Item';

export default class Inventory extends Component {
  static contextType = ItemContext;

  handleGetAllItems = () => {
    ItemsApiService.getAllItemsRequest()
      .then((items) => {
        this.context.populateInventory(items);
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  componentDidMount = () => {
    this.handleGetAllItems();
  };

  render() {
    const { items } = this.context;
    return (
      <section className="Inventory">
        <h1>Inventory</h1>
        {/* <Link to="/add-item">Add Item</Link> */}
        <button onClick={() => this.props.history.push('/add-item')}>Add Item</button>
        <ul className="Inventory__List">
          {items
            .sort((itemA, itemB) => {
              return new Date(itemA.expiration_date) - new Date(itemB.expiration_date);
            })
            .map((item) => {
              return <Item key={item.id} item={item} />;
            })}
        </ul>
      </section>
    );
  }
}
