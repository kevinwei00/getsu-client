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

    hasAuthToken: false,
  };
////////////////////////////////////////////////////
  handleClickLogin = () => {
    this.setState({
      hasAuthToken: true,
    });
  };

  handleClickLogout = () => {
    this.setState({
      hasAuthToken: false,
    });
  };
////////////////////////////////////////////////////
  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

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
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      populateInventory: this.populateInventory,
      addItem: this.addItem,
      deleteItem: this.deleteItem,

      hasAuthToken: this.state.hasAuthToken,
      handleClickLogin: this.handleClickLogin,
      handleClickLogout: this.handleClickLogout,
    };
    return (
      <ItemContext.Provider value={contextValue}>
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
