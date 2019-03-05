'use strict';

/* global store */

const api = (function () {
  
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/enrique-joel';

  function getItems() {
    return listApiFetch(`${baseUrl}/items`);
  }

  function deleteItem(id) {
    return listApiFetch(`${baseUrl}/items/${id}`,{
      method: 'DELETE',    
    });
  }

  function createItem(name) {
    return listApiFetch(`${baseUrl}/items`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ name }) });
  }

  function updateItem(id, updateData) {
    return listApiFetch(`${baseUrl}/items/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
  }

  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          //took away the extra return statements and reassigned error to use it 
          //as a boolean in the next chain
          error = {code: res.status};
          store.errorKeys.push(error);
        
        }
        return res.json();
      })
  
      .then(data => {
      
        
        if (error) { // if error is true, then this happens
          error.message=data.message;
          return Promise.reject(error);
        }
        
        // Otherwise give back the data as resolved Promise
        
        return data;
      });
  }

  return{
    getItems,
    deleteItem,
    createItem,
    updateItem,
  };

})();