import React, { Component } from 'react';

const DemoContext = React.createContext({});
export default DemoContext;

export class DemoContextProvider extends Component {
  state = {
    items: [],
    sortBy: 'expiration_date',
  };

  setSortBy = (sortBy) => {
    this.setState({ sortBy });
  };

  resetSortBy = () => {
    this.setState({ sortBy: 'expiration_date' });
  };

  addItem = (item) => {
    this.setState({
      items: [...this.state.items, item],
    });
  };

  getItem = (item_id) => {
    return this.state.items.find((item) => item.item_id === Number(item_id));
  };

  updateItem = (item_id, updateFields) => {
    Object.assign(this.getItem(item_id), updateFields);
  };

  deleteItem = (item_id) => {
    this.setState({
      items: this.state.items.filter((item) => item.item_id !== item_id),
    });
  };

  render() {
    const contextValue = {
      items: this.state.items,
      sortBy: this.state.sortBy,
      setSortBy: this.setSortBy,
      resetSortBy: this.resetSortBy,
      addItem: this.addItem,
      getItem: this.getItem,
      updateItem: this.updateItem,
      deleteItem: this.deleteItem,
    };
    return (
      <DemoContext.Provider value={contextValue}>
        {this.props.children}
      </DemoContext.Provider>
    );
  }
}
