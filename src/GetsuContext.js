import React, { Component } from 'react';

const GetsuContext = React.createContext({});

export default GetsuContext;

export class GetsuContextProvider extends Component {
  state = {
    items: [],
    error: null,
    authToken: null,
    sortBy: 'expiration_date',
    isDemo: false,
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

  fillItems = (items) => {
    this.setState({ items });
  };

  clearItems = () => {
    this.setState({ items: [] });
  };

  setSortBy = (sortBy) => {
    this.setState({ sortBy });
  };

  resetSortBy = () => {
    this.setState({ sortBy: 'expiration_date' });
  };

  setIsDemo = (bool) => {
    this.setState({ isDemo: bool });
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
      fillItems: this.fillItems,
      clearItems: this.clearItems,
      sortBy: this.state.sortBy,
      setSortBy: this.setSortBy,
      resetSortBy: this.resetSortBy,
      isDemo: this.state.isDemo,
      setIsDemo: this.setIsDemo,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      getItem: this.getItem,
    };
    return (
      <GetsuContext.Provider value={contextValue}>
        {this.props.children}
      </GetsuContext.Provider>
    );
  }
}
