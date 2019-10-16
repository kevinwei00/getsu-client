import React, { Component } from 'react';
import TokenService from './services/token-service';

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
  };

  saveAuthToken = (token) => {
    this.setState({ authToken: token });
  };

  clearAuthToken = () => {
    this.setState({ authToken: null });
  };

  hasAuthToken = () => {
    return !!this.state.authToken;
  }

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

  addItem = (item) => {
    this.setState({
      items: [...this.state.items, item],
    });
  };

  deleteItem = (item_id) => {
    this.setState({
      items: this.state.items.filter((item) => item.id !== item_id),
    });
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
      addItem: this.addItem,
      deleteItem: this.deleteItem,
    };
    return (
      <ItemContext.Provider value={contextValue}>
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
