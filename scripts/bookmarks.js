'use strict';

const bookmark_handlers = (function(){

  //event handler functions
  // render functions

  function handleDeleteItem(){

  }

  function handleAddItem(){

  }

  function handleDetailedView(){

  }

  function handleFilter(){

  }

  function generateBookMarkHtml(bookmark){
    console.log(bookmark);
    return ` <li class="js-item-element" data-item-id=${bookmark.id}>
    <p> ${bookmark.title} </p>
    <p> ${bookmark.url}</p>
      <button class="book-mark-detail-toggle ">
        <span class="button-label">See more details</span>
      </button>
      <button class="book-mark-delete">
        <span class="button-label">delete</span>
      </button>
  </li>`;
  }
  function generateBookMarkString(bookmarks){
    const updatedBookmarks = bookmarks.map(i => generateBookMarkHtml(i));
    return updatedBookmarks.join('');
  }

  function render(){
    let store_bookmarks = STORE.store_bookmarks;
    const bookmarkItems = generateBookMarkString(store_bookmarks);
    $('.book-mark-list').html(bookmarkItems);
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function listenDelete(){
    $('.book-mark-list').on('click','.book-mark-delete', event => {
      console.log("here");
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id)
        .then(STORE.deleteBookmark(id));
      render();

    });


  }

  function bindEventListeners(){
    // generateBookMarkHtml();
    listenDelete();
  }
  return{
    render,
    bindEventListeners:bindEventListeners,
  };

}() );
