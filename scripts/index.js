'use strict';

$(document).ready(function(){

  // call api to get bookmarks
  //bind event listeners
  //render dom
  bookmark_handlers.bindEventListeners();
  bookmark_handlers.render();

  api.getItems() 
  .then(items => {
     items.forEach((item) => STORE.addBookmark(item));
     bookmark_handlers.render();
    });

  


});
api.createItem({
  title:'youtube',
  url:'https://youtube.com'
})
.then(resp => console.log(resp));