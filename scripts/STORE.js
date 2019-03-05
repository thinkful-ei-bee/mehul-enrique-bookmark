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
    


    return {
        store_bookmarks:[],
        currentView,
        addBookmark,
    };

}() );
