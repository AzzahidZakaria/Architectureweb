const Exercice = require("../Models/Exercice");

let Test = "Zakaria";
let entrainementList = [];
let connection = require("../db");
let exerciceList = [];

// CE CONTROLLEUR CONTIENT TOUTES LES FONCTIONS LIES AUX EXERCICES

// renvoi la liste des exercices

exports.exerciceList = function (request, response) {
  connection.query(
    "select * from exercice join categorie on exercice.categorie_ID = categorie.idCategorie ORDER BY idexercice ",
    function (error, resultSQL) {
      if (error) {
        response.status(400).json({ error: error });
      } else {
        exerciceList = resultSQL;
        console.log(exerciceList);
        response.status(200).json(resultSQL);
      }
    }
  );
};


// attention ici, j'envoi au body categorie, et non idcategorie et categorienom !!!
// voici un requête postman correct :
//{
// "idexercice": 52,
// "nomExercice": "test6",
// "difficulty": "test6",
// "reps": 10,
// "description": "test6",
// "categorie": 1,
// "idCategorie": 1

// }
exports.exerciceListNew = function (request, response) {
  let exercice = new Exercice(
    request.body.nomExercice,
    request.body.difficulty,
    request.body.reps,
    request.body.description,
    request.body.categorie
  );

  connection.query(
    "INSERT INTO exercice set ?",
    exercice,
    function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      } else {
        console.log(request.body.categorie);
        response.status(201).json([{ message: "success" }]);
      }
    }
  );
};


// Appuyer sur sauver pour UPDATE et modifier un champ de la liste

exports.exerciceListUpdate = function (request, response) {
  let idexercice = request.params.idexercice;
  let exercice = new Exercice(
    request.body.nomExercice,
    request.body.difficulty,
    request.body.reps,
    request.body.description,
    request.body.categorie_ID
  );

  connection.query(
    "UPDATE exercice set ? WHERE idexercice =?",
    [exercice, idexercice],
    function (error, resultSQL) {
      if (error) {
        response.status(400).json({ error: error });
      } else {
        console.log(exerciceList);
        response.status(201).json([{ message: "success" }]);
      }
    }
  );
};

//Supprimer un élément

exports.exerciceListRemove = function (request, response) {
  let idexercice = request.params.idexercice;
  let nomExercice = request.body.nomExercice;

  connection.query(
    "DELETE from exercice WHERE idexercice =?",
    idexercice,
    function (error, resultSQL) {
      if (error) {
        response.status(400).json({ error: error });
      } else {
        console.log(exerciceList);
        response.status(201).json([{ message: "success" }]);
      }
    }
  );
};
