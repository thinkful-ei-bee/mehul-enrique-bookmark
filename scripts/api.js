'use strict';

/* global store */

const api = (function () {
  
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/mehul/bookmarks';

  function getItems() {
    return listApiFetch(`${baseUrl}`);
  }

  function deleteItem(id) {
    return listApiFetch(`${baseUrl}/${id}`,{
      method: 'DELETE',    
    });
  }

  function createItem(createData) {
    return listApiFetch(`${baseUrl}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(createData) });
  }

  function updateItem(id, updateData) {
    return listApiFetch(`${baseUrl}/${id}`,{
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
          error = {code: res.status};
        
        }
        return res.json();
      })
  
      .then(data => {
      
        
        if (error) { 
          error.message=data.message;
          return Promise.reject(error);
        }
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