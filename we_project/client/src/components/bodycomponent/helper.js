const xx = {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}


for (let i=0; i< xx['genres'].length; i++){
    console.log(xx['genres'][i])  //!Here, we are just extracting the genre ids
}

//! If we go to below url, it will give us the response shown at the top.
//! url = 'https://api.themoviedb.org/3/genre/movie/list?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd&language=en-US'


// ! Therefore, the genre ids we want are as follows:

genres = [{"id":"28", "name":"Action"}, {"id":"12", "name":"Animation"}]


// { id: 12, name: 'Adventure' }
// { id: 16, name: 'Animation' }
// { id: 35, name: 'Comedy' }
// { id: 80, name: 'Crime' }
// { id: 99, name: 'Documentary' }
// { id: 18, name: 'Drama' }
// { id: 10751, name: 'Family' }
// { id: 14, name: 'Fantasy' }
// { id: 36, name: 'History' }
// { id: 27, name: 'Horror' }
// { id: 10402, name: 'Music' }
// { id: 9648, name: 'Mystery' }
// { id: 10749, name: 'Romance' }
// { id: 878, name: 'Science Fiction' }
// { id: 10770, name: 'TV Movie' }
// { id: 53, name: 'Thriller' }