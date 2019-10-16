import config from '../config';
import TokenService from './token-service';

const ItemsApiService = {
  getAllItemsRequest() {
    return fetch(`${config.API_ENDPOINT}/items`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        // this.context.clearError();
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  },
  getItemRequest(item_id) {
    return fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        // this.context.clearError();
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  },
  createItemRequest(item) {
    return fetch(`${config.API_ENDPOINT}/items`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(item),
    }).then((res) => {
      if (!res.ok) {
        // this.context.clearError();
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  },
  updateItemRequest(item_id, updateFields) {
    return fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updateFields),
    }).then((res) => {
      if (!res.ok) {
        // this.context.clearError();
        return res.json().then((e) => Promise.reject(e));
      }
    });
  },
  deleteItemRequest(item_id) {
    return fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        // this.context.clearError();
        return res.json().then((e) => Promise.reject(e));
      }
      return;
    });
  },
};

export default ItemsApiService;
