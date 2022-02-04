document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // Get form values
    const siteName =document.getElementById('siteName').value;
    const siteUrl =document.getElementById('siteUrl').value;
  
    if(!validateForm(siteName, siteUrl)){
      return false;
    }
  
    const bookmark = {
      name: siteName,
      url: siteUrl
    }
  
    /*
      // Local Storage Test
      localStorage.setItem('test', 'Hello World');
      console.log(localStorage.getItem('test'));
      localStorage.removeItem('test');
      console.log(localStorage.getItem('test'));
    */
  
    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
      // Init array
      const bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      // Get bookmarks from localStorage
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  
    // Clear form
    document.getElementById('myForm').reset();
  
    // Re-fetch bookmarks
    fetchBookmarks();
  
    // Prevent form from submitting
    e.preventDefault();
}

// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    const bookmarksResults = document.getElementById('bookmarksResults');
  
    // Build output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;
  
      bookmarksResults.innerHTML += '<div class="well">'+
                                    `<h3>${name}</h3>`+
                                    `<div>`+
                                    ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</div>'+
                                    '</div>';
    }
}
// Delete bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(let i = 0; i < bookmarks.length;i++){
      if(bookmarks[i].url == url){
        // Remove from array
        bookmarks.splice(i, 1);
      }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    // Re-fetch bookmarks
    fetchBookmarks();
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}