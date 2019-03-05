'use strict';

const bookMarks = (function(){

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
    
    return 
   ` <li class="js-item-element" id=${bookmark.id}>
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
    let bookmarks = [...STORE.bookMarks]

    const bookMarkItems = generateBookMarkString(bookmarks);
    $('.book-mark-list').html(bookMarkItems);
}

function bindEventListeners(){
    generateBookMarkHtml
}
return{
    render,
    bindEventListeners,
}

}() );
