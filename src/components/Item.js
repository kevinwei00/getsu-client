import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className="Item">
        <div className="Item__container">
          <Link to={`/item/${item.item_id}`}>
            {item.item_name}
            <ProgressBar
              expiration_date={`${item.expiration_date}`}
              now={Math.round((item.quantity / item.max_quantity) * 100)}
              label={`${item.quantity} / ${item.max_quantity} ${item.unit_type}`}
            />
          </Link>
        </div>
      </li>
    );
  }
}
