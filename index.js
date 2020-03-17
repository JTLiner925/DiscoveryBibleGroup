const key = 'AIzaSyC8F-Vb3TOUgzstqyKRFmNnz4qq65jNf1A';
const searchURL = 'https://www.youtube.com/';

const bibleKey = 'ccbf0a4b9f501f9c1e71052941583c219e9c85ce';
const API_URL = 'https://api.esv.org/v3/passage/text/';

// Authorization: Token ccbf0a4b9f501f9c1e71052941583c219e9c85ce

// STORE ={

// }

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function getVerses(passage){
  const params = {
    q: passage, 
  };
  const queryString = formatQueryParams(params);
  const url = API_URL + '?' + queryString;
  console.log(url);

  // const headers = {
  //   'Authorization': bibleKey, 
  // };
  const options = {
    headers: new Headers({
      "Authorization": bibleKey})
  };
  fetch(url, options)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(resJson => displayVerses(resJson))
    .catch(err => { $('#js-verse-error-message')
      .text(`Something went wrong: ${err.message}`);
    });

}
function displayVerses(resJson){
  // console.log(resJson);
  $('#bible-verses').empty();
  for(let i = 0; i< resJson.length; i++){
    $('#bible-verses').append(
      `<li><h3>${resJson[i].data.canonical}</h3>
      <p>${resJson[i].data.passages}</p></li>`
      
    );
  
  }
    
  $('#scripture').removeClass('hidden');
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
  $('#lesson-select ').change(event => {
    event.preventDefault();
    // const searchTerm = $('').val();
    const lessonSelect = $('#lesson-select option:selected').text();
    console.log(lessonSelect);
    // getVideo();
    console.log(getVerses(lessonSelect));
    
  });
  getVideo();
  
}

$(watchForm);