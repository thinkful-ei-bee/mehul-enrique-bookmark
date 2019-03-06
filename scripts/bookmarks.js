'use strict';

const bookmark_handlers = (function(){

  
//**************************RENDER AND TEMPLATE GENERATING FUNCTIONS ******************************* */
  function generateBookMarkHtml(bookmark){
    if(bookmark.expanded === false)
    {
    return ` <li class="js-item-element" data-item-id=${bookmark.id}>
    <p> Title: ${bookmark.title} </p>
    <p> URL: ${bookmark.url}</p>
      <button class="book-mark-detail-toggle">
        <span class="button-label">See more details</span>
      </button>
      <button class="book-mark-delete">
        <span class="button-label">delete</span>
      </button>
  </li>`;}
  else{
    return ` <li class="js-item-element" data-item-id=${bookmark.id}>
    <p> Title: ${bookmark.title} </p>
    <p> URL: ${bookmark.url}</p>
    <p> Description: ${bookmark.desc === null ? 'No description': bookmark.desc}</p>
    <p> Rating: ${bookmark.rating === null ? 'Not rated': bookmark.rating }</p>
      <button class="book-mark-detail-toggle">
        <span class="button-label">See more details</span>
      </button>
      <button class="book-mark-delete">
        <span class="button-label">delete</span>
      </button>
  </li>`;}

  }

  function generateBookMarkString(bookmarks){
    const updatedBookmarks = bookmarks.map(i => generateBookMarkHtml(i));
    return updatedBookmarks.join('');
  }

  function render(){
    let store_bookmarks = STORE.store_bookmarks;

    if(STORE.showFilteredItems){
      store_bookmarks = store_bookmarks.filter(i => !i.filtered)
    }
    const bookmarkItems = generateBookMarkString(store_bookmarks);
    $('.book-mark-list').html(bookmarkItems);
  }





//**************************UTILITY FUNCTIONS********************************* */
  

function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }


  //**************************EVENT HANDLER FUNCTIONS********************************* */

  function listenDelete(){
    $('.book-mark-list').on('click','.book-mark-delete', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id)
        .then(STORE.deleteBookmark(id));
      render();

    });
  }

  function handleAddItem(){
    $('#add-book-mark-form').on('submit', event => {
      console.log('got here');
      event.preventDefault();
      const newItemUrl= $('.js-book-mark-url').val();
      const newItemTitle = $(".js-book-mark-title").val();
      let newItemDesc = $(".js-book-mark-description").val();
      let newItemRating = $(".book-mark-rating option:selected" ).text();

      if(newItemDesc === ""){
        newItemDesc = null;
      }
      if (newItemRating === ""){
        newItemRating = null;
      }

      api.createItem({
        title: newItemTitle,
        url: newItemUrl,
        desc: newItemDesc,
        rating: newItemRating,
      })
        .then((data) => {
          data.expanded = false;
          //// added .filtered for filter function
          data.filtered = false;

          console.log(data.expanded);
                        STORE.store_bookmarks.push(data);
                        render();
                      });
    })

  }

  function handleExpanded() {
    $('.book-mark-list').on('click','.book-mark-detail-toggle', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      STORE.expandBookmark(id);
      render();

    });

  }

  function handleFilter(){
    $('.filter-drop-down').on('click','#filter-toggle', event => {
      event.preventDefault();
      STORE.showFilteredItems = true;
      const filterNumber = $(".book-mark-rating-filter option:selected" ).val();
      STORE.toggleFilter(filterNumber);
      render();
    })
  }

  function bindEventListeners(){
 
    listenDelete();
    handleAddItem();
    handleExpanded();
    handleFilter();
  }
  return{
    render:render,
    bindEventListeners:bindEventListeners,
  };

}() );
