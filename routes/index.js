const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imdb-large.sqlite3.db');
const express = require('express')
const router = express.Router()
let actorFname = 'Kevin';
let actorLname = 'Bacon';

// db.serialize(function() {
router.get('/', function(req, res, next) {
  db.all(`select id, first_name, last_name
          from actors
          where first_name = '${actorFname}' and last_name = '${actorLname}'`
      , function(err, rows) {
          console.log("rows in actor foreach",rows)
          // rows.forEach(row => {
            // console.log(row.id, row.first_name, row.last_name);
            var actor = rows;
            console.log("actor", actor)
            db.all(`select m.id, m.name
                    from movies m
                    join roles r on m.id = r.movie_id
                    join actors a on r.actor_id = a.id
                    where a.first_name = '${actorFname}' and a.last_name = '${actorLname}'
                    order by random() limit 1`
                , function(err, rows) {
                rows[0].correct = true
                console.log("rows", rows)
                let inMovies = rows
                // let inMovies = []
                // rows.forEach(row => {
                //   inMovies.push(row.name);
                //   // console.log(row.id + ": " + row.name);
                // })
                console.log("inMovies", inMovies)
                db.all(`select id, name
                        from movies
                        where id NOT IN (select m.id
                        from movies m
                        join roles r on m.id = r.movie_id
                        join actors a on r.actor_id = a.id
                        where a.first_name = 'Kevin' and a.last_name = 'Bacon'
                        ) AND rank > 6
                        GROUP BY id
                        ORDER BY RANDOM()
                        LIMIT 9`
                    , function(err, rows) {
                    let notInMovies = rows
                    console.log("rows", rows)
                    // let notInMovies = []
                    // rows.forEach(row => {
                    //   notInMovies.push(row.name);
                    //   // console.log(row.id + ": " + row.name);
                    // })
                    console.log("notinmovies", notInMovies)
                    var randIdx = Math.floor(Math.random() * notInMovies.length);
                    notInMovies[randIdx] = inMovies[0];
                    let movies = notInMovies;
                    console.log("movies", movies)
                    console.log("movies.correct", movies[randIdx].correct)
                res.render('index', { actorFname: actorFname, actorLname: actorLname, movies: movies, showForm: true })
                // res.render('index', { actor: actor, inMovies: inMovies, notInMovies: notInMovies })
                });
            });
          // })
        }
  )
  // db.close();
})

router.post('/', function(req, res, next) {
    var actor = req.body
    console.log("actor in post", actor)
    let actorFname = actor.fname.charAt(0).toUpperCase() + actor.fname.slice(1).trim();
    let actorLname = actor.lname.charAt(0).toUpperCase() + actor.lname.slice(1).trim();
    console.log("actorFname", actorFname)
    console.log("actorLname", actorLname)
                var errFname = actorFname
                var errLname = actorLname
    db.all(`select id, first_name, last_name
            from actors
            where first_name = '${actorFname}' and last_name = '${actorLname}'`
        , function(err, rows) {
            if (rows.length === 0) {
                console.log("rows", rows)
                var isError = true
                actorFname = 'Kevin'
                actorLname = 'Bacon'
                db.all(`select id, first_name, last_name
                    from actors
                    where first_name = '${actorFname}' and last_name = '${actorLname}'`
                    , function(err, rows) {
                        var actor = rows
                        console.log("actor", actor)
                db.all(`select m.id, m.name
                        from movies m
                        join roles r on m.id = r.movie_id
                        join actors a on r.actor_id = a.id
                        where a.first_name = '${actorFname}' and a.last_name = '${actorLname}'
                        order by random() limit 1`
                    , function(err, rows) {
                    rows[0].correct = true
                    console.log("rows", rows)
                    let inMovies = rows
                    // let inMovies = []
                    // rows.forEach(row => {
                    //   inMovies.push(row.name);
                    //   // console.log(row.id + ": " + row.name);
                    // })
                    console.log("inMovies", inMovies)
                    db.all(`select id, name
                            from movies
                            where id NOT IN (select m.id
                            from movies m
                            join roles r on m.id = r.movie_id
                            join actors a on r.actor_id = a.id
                            where a.first_name = 'Kevin' and a.last_name = 'Bacon'
                            ) AND rank > 6
                            GROUP BY id
                            ORDER BY RANDOM()
                            LIMIT 9`
                        , function(err, rows) {
                        let notInMovies = rows
                        console.log("rows", rows)
                        // let notInMovies = []
                        // rows.forEach(row => {
                        //   notInMovies.push(row.name);
                        //   // console.log(row.id + ": " + row.name);
                        // })
                        console.log("notinmovies", notInMovies)
                        var randIdx = Math.floor(Math.random() * notInMovies.length);
                        notInMovies[randIdx] = inMovies[0];
                        let movies = notInMovies;
                        console.log("movies", movies)
                        console.log("movies.correct", movies[randIdx].correct)
                    res.render('index', { actorFname: actorFname, actorLname: actorLname, movies: movies, showForm: true, errFname: errFname, errLname: errLname, showError: true })
                    });
                });
                    })
            } else {
            console.log("rows in actor foreach",rows)
            // rows.forEach(row => {
                // console.log(row.id, row.first_name, row.last_name);
                var actor = rows;
                console.log("actor", actor)
                db.all(`select m.id, m.name
                        from movies m
                        join roles r on m.id = r.movie_id
                        join actors a on r.actor_id = a.id
                        where a.first_name = '${actorFname}' and a.last_name = '${actorLname}'
                        order by random() limit 1`
                    , function(err, rows) {
                    rows[0].correct = true
                    console.log("rows", rows)
                    let inMovies = rows
                    // let inMovies = []
                    // rows.forEach(row => {
                    //   inMovies.push(row.name);
                    //   // console.log(row.id + ": " + row.name);
                    // })
                    console.log("inMovies", inMovies)
                    db.all(`select id, name
                            from movies
                            where id NOT IN (select m.id
                            from movies m
                            join roles r on m.id = r.movie_id
                            join actors a on r.actor_id = a.id
                            where a.first_name = 'Kevin' and a.last_name = 'Bacon'
                            ) AND rank > 6
                            GROUP BY id
                            ORDER BY RANDOM()
                            LIMIT 9`
                        , function(err, rows) {
                        let notInMovies = rows
                        console.log("rows", rows)
                        // let notInMovies = []
                        // rows.forEach(row => {
                        //   notInMovies.push(row.name);
                        //   // console.log(row.id + ": " + row.name);
                        // })
                        console.log("notinmovies", notInMovies)
                        var randIdx = Math.floor(Math.random() * notInMovies.length);
                        notInMovies[randIdx] = inMovies[0];
                        let movies = notInMovies;
                        console.log("movies", movies)
                        console.log("movies.correct", movies[randIdx].correct)
                    res.render('index', { actorFname: actorFname, actorLname: actorLname, movies: movies, showForm: true })
                    // res.render('index', { actor: actor, inMovies: inMovies, notInMovies: notInMovies })
                    });
                });
            }
        }
    )
  // db.close();
})

router.get('/about', function(req, res, next) {
    res.render('about')
})

// });

module.exports = router

// console.log(notInMovies)
