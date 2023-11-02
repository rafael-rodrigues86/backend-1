const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", (req, res) => {
  movieController
    .getMovies()
    .then((moviesData) => res.json(moviesData))
    .catch((error) => res.status(500).send("Erro ao obter filmes"));
});

router.get("/:id", (req, res) => {
  const IdRecebido = req.params.id;
  movieController
    .getMovieById(IdRecebido)
    .then((movieRecebido) => {
      if (movieRecebido) {
        res.status(200).send(movieRecebido);
      } else {
        res.status(404).send("Produto não encontrado");
      }
    })
    .catch((error) => res.status(500).send());
});

router.get("/search/:name", (req, res) => {
  const movieName = req.params.name;
  movieController
    .searchMovieByName(movieName)
    .then((movies) => {
      if (movies) {
        res.status(200).send(movies);
      } else {
        res.status(404).send("Jhon Travoltas time!!!!");
      }
    })
    .catch((error) => res.status(500).send());
});

router.put("/:id", (req, res) => {
  const idRecebido = req.params.id;
  const updatedData = req.body;

  console.log("Id recebido: " + idRecebido);
  console.log("Informações recebidas: " + updatedData.title);

  movieController
    .updateMovie(idRecebido, updatedData)
    .then(() => {
      res.status(200).send("Filme atualizado com sucesso!");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.delete("/:id", (req, res) => {
  const idRecebido = req.params.id;

  movieController
    .deleteMovie(idRecebido)
    .then((deletedMovie) => {
      res.status(200).json(deletedMovie);
    })
    .catch((error) => {
      res.status(404).send("Filme não encontrado");
    });
});

router.post("/", (req, res) => {
  const newMovieData = req.body;
  movieController
    .addMovie(newMovieData)
    .then((movie) => res.status(201).json(movie))
    .catch((error) => {
      res.status(500).send("Erro ao adicionar o filme");
    });
});

router.patch("/:id/plot", (req, res) => {
  const movieId = req.params.id;
  const newPlot = req.body.Plot;

  movieController
    .updatePlot(movieId, newPlot)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar o enredo");
    });
});

module.exports = router;
