'use strict';
/* global api, bookmark_handlers, $, STORE */
$(document).ready(function(){

  bookmark_handlers.bindEventListeners();
  bookmark_handlers.render();

  api.getItems() 
    .then(items => {
      items.forEach((item) => 
      {
        item.expanded = false;
        item.filtered = false;
        STORE.addBookmark(item);
      });
      bookmark_handlers.render();
    });

  


});
