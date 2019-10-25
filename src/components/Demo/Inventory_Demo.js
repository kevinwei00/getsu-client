import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DemoContext from './DemoContext';
import ExpirationsService from '../../services/expirations-service';
import ItemDemo from './Item_Demo';
import ScrollToTopButton from '../ScrollToTopButton';
import DocumentUtils from '../../utils/document-utils';
import '../Inventory.css';

class Inventory_Demo extends Component {
  static contextType = DemoContext;

  state = {
    hasScrolledOutOfView: false,
  };

  handleChange = (e) => {
    this.context.setSortBy(e.target.value);
  };

  handleSort = (items) => {
    const maxDate = '9999-12-31T00:00:00.000Z';

    // first sort items into buckets (empty items at the bottom)
    // sort by expiration date (expired first, non-perishable last)
    // then by percentage (lowest percentage first)
    // then by max quantity (lowest max_quantity first)
    if (this.context.sortBy === 'expiration_date') {
      const buckets = {};
      ['expired', 'danger', 'warning', 'fresh', 'nonperishable', 'empty'].forEach(
        (key) => {
          buckets[key] = [];
        }
      );
      items
        .sort(
          (itemA, itemB) =>
            new Date(itemA.expiration_date || maxDate) -
            new Date(itemB.expiration_date || maxDate)
        )
        .forEach((item) => {
          if (item.quantity === 0) {
            buckets['empty'].push(item);
          } else {
            buckets[ExpirationsService.getExpirationString(item.expiration_date)].push(
              item
            );
          }
        });
      const bucketsArray = [];
      for (let key of Object.keys(buckets)) {
        buckets[key].sort(
          (itemA, itemB) =>
            itemA.quantity / itemA.max_quantity - itemB.quantity / itemB.max_quantity ||
            itemA.max_quantity - itemB.max_quantity
        );
        bucketsArray.push(buckets[key]);
      }
      return [].concat(...bucketsArray);
    }

    // sort by percentage (lowest percentage first)
    // then by max quantity (lowest max_quantity first)
    // then by expiration date (expired first, non-perishable last)
    else if (this.context.sortBy === 'quantity') {
      return items.sort(
        (itemA, itemB) =>
          itemA.quantity / itemA.max_quantity - itemB.quantity / itemB.max_quantity ||
          itemA.max_quantity - itemB.max_quantity ||
          new Date(itemA.expiration_date || maxDate) -
            new Date(itemB.expiration_date || maxDate)
      );
    }

    // sort by name -> percentage -> max quantity -> expiration date
    else if (this.context.sortBy === 'item_name') {
      return items.sort(
        (itemA, itemB) =>
          itemA.item_name.localeCompare(itemB.item_name) ||
          itemA.quantity / itemA.max_quantity - itemB.quantity / itemB.max_quantity ||
          itemA.max_quantity - itemB.max_quantity ||
          new Date(itemA.expiration_date || maxDate) -
            new Date(itemB.expiration_date || maxDate)
      );
    }
  };

  handleScroll = (e) => {
    this.setState({
      hasScrolledOutOfView: e.srcElement.scrollingElement.scrollTop >= 400 ? true : false,
    });
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    DocumentUtils.scrollToTop();
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    let content;

    if (this.context.items.length === 0) {
      content = <div className="Inventory__empty">Nothing to display.</div>;
    } else {
      const sortedItems = this.handleSort([...this.context.items]);
      content = (
        <>
          <div className="custom-select-wrapper">
            <div className="custom-select-wrapper__arrow">
              <label htmlFor="sortby_options">Sort By</label>
              <select
                name="sortby_options"
                id="sortby_options"
                onChange={this.handleChange}
                defaultValue={this.context.sortBy}
              >
                <option value={'expiration_date'}>Expiration Date</option>
                <option value={'item_name'}>Name</option>
                <option value={'quantity'}>Quantity</option>
              </select>
            </div>
          </div>
          <ul className="Inventory__list">
            {sortedItems.map((item) => (
              <ItemDemo key={item.item_id} item={item} />
            ))}
          </ul>
        </>
      );
    }

    return (
      <section className="Inventory">
        <header className="Inventory__header">
          <h1>Inventory</h1>
          <button
            type="button"
            className="Inventory__add-button call-to-action--themed"
            onClick={() => this.props.history.push('/demo/add-item')}
            aria-label="Add Item"
          >
            <i className="fas fa-plus"></i>
          </button>
        </header>
        {content}
        {this.state.hasScrolledOutOfView ? <ScrollToTopButton /> : <></>}
      </section>
    );
  }
}

export default withRouter(Inventory_Demo);
