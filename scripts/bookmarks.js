'use strict';

const bookmark_handlers = (function(){

  
  //**************************RENDER AND TEMPLATE GENERATING FUNCTIONS ******************************* */
  function generateBookMarkHtml(bookmark){
    if(bookmark.expanded === false)
    {
      return ` <li class="js-item-element" data-item-id=${bookmark.id}>
    <p> Title: ${bookmark.title} </p>
    <p> Rating: ${bookmark.rating === null ? 'Not rated': bookmark.rating}</p>
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
    <p> Description: ${bookmark.desc === null ? 'No description': bookmark.desc}</p>
    <p> Rating: ${bookmark.rating === null ? 'Not rated': bookmark.rating }</p>
    <input type="button" value="Visit Site" onclick="window.open('${bookmark.url}','_blank')" />  
    <button class="book-mark-detail-toggle">
        <span class="button-label">See less details</span>
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
    if(STORE.error_msg === '')
    {
      let store_bookmarks = STORE.store_bookmarks;
      $('.error-message').html('');

      if(STORE.showFilteredItems){
        store_bookmarks = store_bookmarks.filter(i => !i.filtered);
        
      }
      const bookmarkItems = generateBookMarkString(store_bookmarks);
      $('.book-mark-list').html(bookmarkItems);
      $('.js-book-mark-url').val('');
      $('.js-book-mark-title').val('');
      $('.js-book-mark-description').val('');
      $('.book-mark-rating option:selected').prop('selected', function() { return this.defaultSelected; });
     
    }
    else
    {
      renderError();
    }
  }

    
  

  function generateErrorHTML(error_msg)
  { 
    return ` 
    <p> ${error_msg} </p>`;


  }

  function renderError()
  {

    const error_html = generateErrorHTML(STORE.error_msg);
    $('.error-message').html(error_html);


    
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
        .then(STORE.deleteBookmark(id))
        .then(render())
        .catch(err => { 
          STORE.error_msg = err.message;
          render();
          setTimeout(function(){
            STORE.error_msg = '';
            render();
          },5000);
        });

    });
  }

  function handleAddItem(){
    $('#add-book-mark-form').on('submit', event => {
      event.preventDefault();
      const newItemUrl= $('.js-book-mark-url').val();
      const newItemTitle = $('.js-book-mark-title').val();
      let newItemDesc = $('.js-book-mark-description').val();
      let newItemRating = $('.book-mark-rating option:selected' ).text();

      if(newItemDesc === ''){
        newItemDesc = null;
      }
      if (newItemRating === ''){
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
          if(STORE.showFilteredItems === true && STORE.filter_num !== null && STORE.filter_num <= newItemRating)
          {data.filtered = false;
          }
          else
          {
            data.filtered = true;
          }
         
          STORE.store_bookmarks.push(data);
          render();
        })
        .catch(err => { 
          STORE.error_msg = err.message;
          render();
          setTimeout(function(){
            STORE.error_msg = '';
            render();
          },5000);
        });
    });

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
      const filterNumber = $('.book-mark-rating-filter option:selected' ).val();
      STORE.toggleFilter(filterNumber);
      render();
    });
  }

  function handleClearFilter(){
    $('.filter-drop-down').on('click','#filter-clear-toggle', event => {
      event.preventDefault();
      STORE.filter_num = null;
      STORE.showFilteredItems = false;
      
      render();
    
      $('.book-mark-rating-filter option:selected').prop('selected', function() { return this.defaultSelected; });

    });
  }


 
  function bindEventListeners(){
 
    listenDelete();
    handleAddItem();
    handleExpanded();
    handleFilter();
    handleClearFilter();
  }
  return{
    render:render,
    bindEventListeners:bindEventListeners,
  };

}() );
