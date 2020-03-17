const key = 'AIzaSyC8F-Vb3TOUgzstqyKRFmNnz4qq65jNf1A';
const searchURL = 'https://www.youtube.com/';

const bibleKey = 'ccbf0a4b9f501f9c1e71052941583c219e9c85ce';
const API_URL = 'https://api.esv.org/v3/passage/text/';

// Authorization: Token ccbf0a4b9f501f9c1e71052941583c219e9c85ce

const STORE ={

  1:['oZcEY6qPV84','oZcEY6qPV84','oZcEY6qPV84'],
  2:['Ej0WNwYGKHg','Ej0WNwYGKHg','Ej0WNwYGKHg'],
  3:['Ej0WNwYGKHg','oZcEY6qPV84','oZcEY6qPV84'],
  4:['oZcEY6qPV84','Ej0WNwYGKHg','Ej0WNwYGKHg'],

}

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
  console.log(resJson);
  $('#bible-verses').empty();
  // for(let i = 0; i< resJson.length; i++){
  $('#bible-verses').append(
    `<li><h3>${resJson.canonical}</h3>
      <p>${resJson.passages[0]}</p></li>`
      
  );
  
  // }
    
  $('#scripture').removeClass('hidden');
}

function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();
  for(let i = 0; i< responseJson.length; i++){
    $('#results-list').append(
      `<li><h3>By ${responseJson[i].items[0].snippet.channelTitle}</h3>
      <p>${responseJson[i].items[0].snippet.description}</p>
      <iframe id="thumbnail"
    title="${responseJson[i].items[0].snippet.title}"
    width="480"
    height="380"
    src="https://www.youtube.com/embed/${responseJson[i].items[0].id}" frameborder="0" controls>
</iframe>
      </li>`
    );}
  $('#results').removeClass('hidden');
}

function getVideo(lesson){
  // GET `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoDefinition=high&key=[YOUR_API_KEY]`

  // Authorization: Bearer [YOUR_ACCESS_TOKEN]
  // Accept: application/json
  Promise.all(STORE[lesson].map(id => {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=snippet,contentDetails,statistics,status`)
    .then(response => { 
      
      return response.json();
    })
    .then(responseJson => responseJson)
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
  })).then(responseJson => {
    console.log(responseJson);
    return displayResults(responseJson);});
  
}

function watchForm(){
  let lessonSelect;
  let youTubeId;
  $('#lesson-select').change(event => {
    event.preventDefault();
    // const searchTerm = $('').val();
    youTubeId = $('#lesson-select option:selected').attr('ytid');
    lessonSelect = $('#lesson-select option:selected').val();
    getVerses(lessonSelect);
    getVideo(youTubeId);
  });
  
  
}

$(watchForm);