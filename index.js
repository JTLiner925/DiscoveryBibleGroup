const key = 'AIzaSyC8F-Vb3TOUgzstqyKRFmNnz4qq65jNf1A';
const searchURL = 'https://www.youtube.com/';
STORE ={

}

function displayResults(responseJson){
  $('#results-list').empty();
  for(let i = 0; i< responseJson.items.length; i++){
    $('#results-list').append(
      `<li><h3>By ${responseJson.items[i].snippet.channelTitle}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <iframe id="thumbnail"
    title="${responseJson.items[i].snippet.title}"
    width="480"
    height="360"
    src="https://www.youtube.com/embed/${responseJson.items[i].id}" frameborder="0" controls>
</iframe>
      </li>`
    );}
  $('#results').removeClass('hidden');
}

/* <p>${responseJson.articles[i].description}</p>
      <h4><a href="${responseJson.items[i].thumbnails.url}">${responseJson.items[i].title}</a></h4>
<img src='${responseJson.articles[i].urlToImage}'> */
function getLesson(){
  
}
function getVideo(){
  // GET `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoDefinition=high&key=[YOUR_API_KEY]`

  // Authorization: Bearer [YOUR_ACCESS_TOKEN]
  // Accept: application/json

  fetch(`https://www.googleapis.com/youtube/v3/videos?id=oZcEY6qPV84&key=${key}&part=snippet,contentDetails,statistics,status`)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('').val();
   
    // getVideo();
  });
  getVideo();
  // getLesson();
}

$(watchForm);