import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ItemContext from '../ItemContext';
import ItemsApiService from '../services/items-api-service';
import ExpirationsService from '../services/expirations-service';
import Item from './Item';

export default class Inventory extends Component {
  static contextType = ItemContext;

  handleGetAllItems = () => {
    ItemsApiService.getAllItemsRequest()
      .then((items) => {
        this.context.fillItems(items);
      })
      .catch((error) => {
        this.context.setError(error);
      });
  };

  handleChange = (e) => {
    this.context.setSortBy(e.target.value);
  };

  handleSort = (items) => {
    const maxDate = '9999-12-31T00:00:00.000Z';

    // sort by expiration date (expired first, non-perishable last)
    // then by quantity (lowest quantity first)
    // then by max_quantity (highest max_quantity first)
    if (this.context.sortBy === 'expiration_date') {
      const buckets = {};
      ['expired', 'danger', 'warning', 'fresh', 'nonperishable'].forEach((key) => {
        buckets[key] = [];
      });
      items
        .sort(
          (itemA, itemB) =>
            new Date(itemA.expiration_date || maxDate) -
            new Date(itemB.expiration_date || maxDate)
        )
        .forEach((item) => {
          buckets[ExpirationsService.getExpirationString(item.expiration_date)].push(
            item
          );
        });
      const bucketsArray = [];
      for (let key of Object.keys(buckets)) {
        buckets[key].sort(
          (itemA, itemB) =>
            itemA.quantity - itemB.quantity || itemB.max_quantity - itemA.max_quantity
        );
        bucketsArray.push(buckets[key]);
      }
      return [].concat(...bucketsArray);
    }

    // sort by quantity (lowest quantity first)
    // then by max_quantity (highest max_quantity first)
    // then by expiration date (expired first, non-perishable last)
    else if (this.context.sortBy === 'quantity') {
      return items.sort(
        (itemA, itemB) =>
          itemA.quantity - itemB.quantity ||
          itemB.max_quantity - itemA.max_quantity ||
          new Date(itemA.expiration_date || maxDate) -
            new Date(itemB.expiration_date || maxDate)
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
