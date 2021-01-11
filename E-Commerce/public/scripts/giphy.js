window.onload = function() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=lp7wQ6914aPRmDI6HePRPpQeZXyxLFkU&limit=25&rating=G')
    .then(function(respuesta){
        return respuesta.json()
    })
   .then(function(info){
        console.log(info.data);

     for (let i = 0; i < 1; i++){

     let git = "<p>" + "Bienvenido a Sarahs accesorios!!" + '</p>';
    git += '<img src=' + info.data[i].images.original.url + '>';

     document.querySelector('ul.api').innerHTML += "<li>" + git + '</li>'
  //  let name = info.data.title;
   //let url = info.data.url;

//    document.querySelector('h1').innerHTML =  name;
 //   document.querySelector('h1').innerHTML += '<img src=' + url + '>'

 //let git = "<p>" + name + '</p>';
//            git += '<img src=' + url + '>'
 //           document.querySelector('h1').innerHTML =  git
        }}
    )
}
