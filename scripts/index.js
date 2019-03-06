'use strict';

$(document).ready(function(){

  // call api to get bookmarks
  //bind event listeners
  //render dom
  bookmark_handlers.bindEventListeners();
  bookmark_handlers.render();

  api.getItems() 
    .then(items => {
      items.forEach((item) => 
      {
        item.expanded = false;
        item.filtered = false;
       // console.log(item.expanded);
        STORE.addBookmark(item);
      });
      bookmark_handlers.render();
    });

  


});
