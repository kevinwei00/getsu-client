import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from '../components/ProgressBar';
import ExpirationsService from '../services/expirations-service';

describe('<ProgressBar />', () => {
  const testItem = {
    item_id: '00000000-0000-0000-0000-000000000000',
    item_name: 'Test Item #1',
    max_quantity: 10,
    quantity: 10,
    unit_type: 'units',
    expiration_date: '2019-01-01T00:00:00.000Z',
    is_deleted: false,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ProgressBar
        expiration_date={`${testItem.expiration_date}`}
        now={Math.round((testItem.quantity / testItem.max_quantity) * 100)}
        label={`${testItem.quantity} / ${testItem.max_quantity} ${testItem.unit_type}`}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
