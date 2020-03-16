const key = 'AIzaSyC8F-Vb3TOUgzstqyKRFmNnz4qq65jNf1A';
const searchURL = 'https://www.youtube.com/';

function getVideo(){
  // GET `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoDefinition=high&key=[YOUR_API_KEY]`

  // Authorization: Bearer [YOUR_ACCESS_TOKEN]
  // Accept: application/json

  fetch(`https://www.googleapis.com/youtube/v3/videos?id=oZcEY6qPV84&key=${key}
  &part=snippet,contentDetails,statistics,status`)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('').val();
   
    getVideo();
  });
  getVideo();
}

$(watchForm);