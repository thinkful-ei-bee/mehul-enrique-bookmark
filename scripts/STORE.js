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

  const expandBookmark = function(id)
  {
    let expand_obj = this.store_bookmarks.filter(obj => 
       obj.id === id
    );

    console.log(expand_obj);
    expand_obj[0].expanded = !expand_obj[0].expanded;
  };

  const toggleFilter= function(num){
    console.log('got here');
    let filteredBookMarks = this.store_bookmarks.filter(i => i.rating >= num );
    filteredBookMarks.forEach(i => i.showFilteredItems === !i.showFilteredItems); 
    // showOnlyFilteredItems(filteredBookMarks);
  }




  return {
    store_bookmarks:[],
    currentView,
    showFilteredItems = false,
    addBookmark,
    deleteBookmark,
    expandBookmark,
    toggleFilter,
  };

}() );
