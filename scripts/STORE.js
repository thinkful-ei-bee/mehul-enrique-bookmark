'use strict';
const STORE = (function(){

  /*  const bookMarks = [
        { title:"", rating:"", description: "", urlLink: "",},
        { title:"", rating:"", description: "", urlLink: "",}
    ];
*/
  const currentView = 'condensed';//condensed (default) / detailed / is adding / filtered/ error

  const addBookmark = function(item) {
    
    this.store_bookmarks.push(item);
  };
    
  const deleteBookmark = function(id)
  {
    this.store_bookmarks = this.store_bookmarks.filter(bookmark => bookmark.id !== id);

  };


  return {
    store_bookmarks:[],
    currentView,
    addBookmark,
    deleteBookmark,
  };

}() );
