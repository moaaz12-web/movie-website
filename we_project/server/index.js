// !This is the file without sessions/cookies


const mysql = require('mysql2')
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:"root", host:"localhost", password:"password", database: "moviedatabase",multipleStatements: true
})





app.post("/watchlater", (request, response)=>{
    const user = request.body.user;
    // console.log(user);


    // SELECT m.name, w.users_username FROM movie m INNER JOIN watchLater w ON m.movieID = w.movie_movieID WHERE w.users_username = 'joe';

    
    db.query("SELECT m.name, m.movieID FROM movie m INNER JOIN watchLater w ON m.movieID = w.movie_movieID WHERE w.users_username = ?", [user], (err,res)=>{
        if(err){
            console.log(err)
        } else{
            // console.log(res)
            response.send(res)

        }
    })
});


app.post("/favorites", (request, response)=>{
    const user = request.body.user;
    // console.log(user);

    db.query("SELECT m.name, m.movieID FROM movie m INNER JOIN favorites f ON m.movieID = f.movie_movieID WHERE f.users_username = ?", [user], (err,res)=>{
        if(err){
            console.log(err)
        } else{
            // console.log(res)
            response.send(res)

        }
    })
});



app.post("/dislike", (request, response)=>{
    const user = request.body.user;
    // console.log(user);

    db.query("SELECT m.name, m.movieID FROM movie m INNER JOIN dislike d ON m.movieID = d.movie_movieID WHERE d.users_username = ?", [user], (err,res)=>{
        if(err){
            console.log(err)
        } else{
            // console.log(res)
            response.send(res)

        }
    })
});





// DELETE FROM movie WHERE movieID = '10193'; DELETE FROM watchlater WHERE movie_movieID = '343'; 
// DELETE FROM favorites WHERE movie_movieID = '343'; 
// DELETE FROM dislike WHERE movie_movieID = '343'; 


// app.post("/remove", (request, response)=>{
//     const item = request.body.id;
//     const user = request.body.user;
//     console.log(item);

//     // db.query("DELETE FROM watchlater WHERE movie_movieID = ? AND users_username = ?;", [item, item, item], (err,res)=>{
//     //     if(err){
//     //         console.log(err)
//     //     } else{
//     //         // console.log(res)
//     //         response.send(res)

//     //     }
//     // })
// });




























app.post('/moviesinsertinDISLIKE', (req, response)=>{
    const name = req.body.name;
    const id = req.body.id;
    const rating = req.body.rating
    const overview = req.body.overview
    const username = req.body.username
    const description = req.body.description

    db.query("INSERT IGNORE INTO movie (movieID, name, rating, overview) VALUES (?,?,?,?); INSERT INTO dislike (users_username, movie_movieID, description) VALUES (?,?,?)",
    [id, name, rating, overview, username, id, description], (err,res)=>{
        // console.log(err)
        if (err){
            console.log(err)
        }else{
            response.send(res)
        }
    })
})

app.post('/moviesinsertinFAV', (req, response)=>{
    const name = req.body.name;
    const id = req.body.id;
    const rating = req.body.rating
    const overview = req.body.overview
    const username = req.body.username
    const description = req.body.description

    db.query("INSERT IGNORE INTO movie (movieID, name, rating, overview) VALUES (?,?,?,?); INSERT INTO Favorites (users_username, movie_movieID, description) VALUES (?,?,?)",
    [id, name, rating, overview, username, id, description], (err,res)=>{
        // console.log(err)
        if (err){
            console.log(err)
        }else{
            response.send(res)
        }
    })
})



app.post('/moviesinsertinLATER', (req, response)=>{
    const name = req.body.name;
    const id = req.body.id;
    const rating = req.body.rating
    const overview = req.body.overview
    const username = req.body.username
    const description = req.body.description

    db.query("INSERT IGNORE INTO movie (movieID, name, rating, overview) VALUES (?,?,?,?); INSERT INTO watchlater (users_username, movie_movieID, description) VALUES (?,?,?)",
    [id, name, rating, overview, username, id, description], (err,res)=>{
        // console.log(err)
        if (err){
            console.log(err)
        }else{
            response.send(res)
        }
    })
})



app.post('/register', (req, response)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(err){
            response.send(err)
        }
        db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)",
        [username, email, hash], (err,res)=>{
            // console.log(err)
            if (err){
                console.log(err)
            }else{
               response.send(res)
            }
        })
    })
})



app.post('/login', (require, response)=>{

    const username = require.body.username;
    const password = require.body.password;
    

    db.query("SELECT * FROM users WHERE username = ?",
    [username], (err, result)=>{
        // console.log(err)
        if (err){
            // console.log(err)
            response.send({err:err})
        }
        if (result.length>0){
            // response.send(result)
            bcrypt.compare(password, result[0].password, (error, response2)=>{
                if (response2){
                    response.send(result)
                } else {
                    response.send({message:"Wrong username and password combination"})
                }
            })
        } else {
            response.send({message:"User does not exit"})
        }  
    })
})



app.listen(5000, ()=>{
    console.log("Connected to server")
})






// ! Some nonsense i wrote
// db.query("SELECT movieID FROM movie", (err,res)=>{
//     if(err){console.log(err)}
//     res.forEach(val => {
//         if(val['movieID'] == id){
//             db.query("INSERT INTO Favorites (users_username, movie_movieID, description) VALUES (?,?,?)",
//             [username, id, description], (err,res)=>{
//                 if (err){
//                     console.log(err)
//                 }else{
//                     response.send(res)
//                 }
//             })      
//         }
//         else{
//             db.query("INSERT IGNORE INTO movie (movieID, name, rating, overview) VALUES (?,?,?,?); INSERT INTO Favorites (users_username, movie_movieID, description) VALUES (?,?,?)",
//             [id, name, rating, overview, username, id, description], (err,res)=>{
//                 if (err){
//                     console.log(err)
//                 }else{
//                     response.send(res)
//                 }
//             })
//         }
//     });
// })
// ! nonsense ends here