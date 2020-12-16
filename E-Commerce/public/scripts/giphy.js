window.onload = function() {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=sOmcEh2VACeXiHpvJOIj9RQ1xpnZJQAc&tag=&rating=g')
    .then(function(respuesta){
        return respuesta.json()
    })
   .then(function(info){
        console.log(info.data);

  //      for (let i = 0; i < info.data.length; i++){

  //          let git = "<p>" + info.data[i].title + '</p>';
   //         git += '<img src=' + info.data[i].images.original.url + '>';

  //        document.querySelector('ul').innerHTML += "<li>" + git + '</li>'
    let name = info.data.title;
    let url = info.data.url;

//    document.querySelector('h1').innerHTML =  name;
 //   document.querySelector('h1').innerHTML += '<img src=' + url + '>'

 let git = "<p>" + name + '</p>';
            git += '<img src=' + url + '>'
            document.querySelector('h1').innerHTML =  git
        }
    )
}
