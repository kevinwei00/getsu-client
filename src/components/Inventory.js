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

  handleChange = (e) => {
    this.context.setSortBy(e.target.value);
  };

  handleSort = (items) => {
    const maxFutureDate = '5874897-12-30T00:00:00.000Z';
    if (this.context.sortBy === 'expiration_date') {
      return items.sort(
        (itemA, itemB) =>
          // sort by expiration date (expired first, non-perishable last)
          new Date(itemA.expiration_date || maxFutureDate) -
            new Date(itemB.expiration_date || maxFutureDate) ||
          // then by quantity (lowest quantity first)
          itemA.quantity - itemB.quantity ||
          // then by max_quantity (lowest max_quantity first)
          itemA.max_quantity - itemB.max_quantity
      );
    } else if (this.context.sortBy === 'quantity') {
      return items.sort(
        (itemA, itemB) =>
          // sort by quantity (lowest quantity first)
          itemA.quantity - itemB.quantity ||
          // then by max_quantity (lowest max_quantity first)
          itemA.max_quantity - itemB.max_quantity ||
          // then by expiration date (expired first, non-perishable last)
          new Date(itemA.expiration_date || maxFutureDate) -
            new Date(itemB.expiration_date || maxFutureDate)
      );
    }
  };

  componentDidMount = () => {
    this.handleGetAllItems();
  };

  render() {
    const sortedItems = this.handleSort([...this.context.items]);
    return (
      <section className="Inventory">
        <h1>Inventory</h1>
        {/* <Link to="/add-item">Add Item</Link> */}
        <button onClick={() => this.props.history.push('/add-item')}>Add Item</button>
        <div className="Inventory__sortby">
          <label htmlFor="">Sort By</label>
          <select
            name="sortby_options"
            id="sortby_options"
            onChange={this.handleChange}
            defaultValue={this.context.sortBy}
          >
            <option value={'expiration_date'}>Expiration Date</option>
            <option value={'quantity'}>Quantity</option>
          </select>
        </div>
        <ul className="Inventory__list">
          {sortedItems.map((item) => (
            <Item key={item.item_id} item={item} />
          ))}
        </ul>
      </section>
    );
  }
}
