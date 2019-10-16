import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className="Item">
        <div className="Item__container">
          <Link to={`/item/${item.id}`}>
            {item.item_name}
            <ProgressBar
              now={Math.round((item.quantity / item.max_quantity) * 100)}
              label={`${item.quantity} / ${item.max_quantity} ${item.unit_type}`}
            />
          </Link>
        </div>
      </li>
    );
  }
}
