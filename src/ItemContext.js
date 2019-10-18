import React, { Component } from 'react';

const ItemContext = React.createContext({
  // items: [],
  // populateInventory: () => {},
  // addItem: () => {},
});

export default ItemContext;

export class ItemProvider extends Component {
  state = {
    items: [],
    error: null,
    authToken: null,
    sortBy: 'expiration_date',
  };

  saveAuthToken = (token) => {
    this.setState({ authToken: token });
  };

  clearAuthToken = () => {
    this.setState({ authToken: null });
  };

  hasAuthToken = () => {
    return !!this.state.authToken;
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  populateInventory = (items) => {
    this.setState({ items });
  };

  clearInventory = () => {
    this.setState({ items: [] });
  };

  setSortBy = (sortBy) => {
    this.setState({ sortBy });
  };

  addItem = (item) => {
    this.setState({
      items: [...this.state.items, item],
    });
  };

  deleteItem = (item_id) => {
    this.setState({
      items: this.state.items.filter((item) => item.item_id !== item_id),
    });
  };

  getItem = (item_id) => {
    return this.state.items.find((item) => item.item_id === item_id);
  };

  render() {
    const contextValue = {
      items: this.state.items,
      saveAuthToken: this.saveAuthToken,
      clearAuthToken: this.clearAuthToken,
      hasAuthToken: this.hasAuthToken,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      populateInventory: this.populateInventory,
      clearInventory: this.clearInventory,
      sortBy: this.state.sortBy,
      setSortBy: this.setSortBy,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      getItem: this.getItem,
    };
    return (
      <ItemContext.Provider value={contextValue}>
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
