'use strict';
const STORE = (function(){



  const filter_num = null;
  const error_msg = '';
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

  
    expand_obj[0].expanded = !expand_obj[0].expanded;
  };

  const toggleFilter= function(num){
    this.filter_num = num;
    this.store_bookmarks.forEach(i=> i.filtered=false);
    let filteredBookMarks = this.store_bookmarks.filter(i => i.rating < num );
    filteredBookMarks.forEach(i=> i.filtered=true);
   
  
  }




  return {
    store_bookmarks:[],
    showFilteredItems: false,
    addBookmark,
    deleteBookmark,
    expandBookmark,
    toggleFilter,
    error_msg,
    filter_num
  };

}() );
