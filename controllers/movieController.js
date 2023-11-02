const filesystem = require("fs").promises;
const path = require("path");

const movieFilePath = path.join(__dirname, "../data/movies.json");

const getMovies = () => {
  return filesystem
    .readFile(movieFilePath, "utf-8")
    .then((moviesData) => JSON.parse(moviesData))
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo de filmes!");
    });
};

const getMovieById = (movieId) => {
  return getMovies()
    .then((allMovies) =>
      allMovies.find((movie) => movie.id === parseInt(movieId))
    )
    .catch((error) => {
      throw new Error("Não foi possível encontrar o filme");
    });
};

const searchMovieByName = (movieName) => {
  return getMovies()
    .then((moviesData) => {
      const filteredMovies = moviesData.filter((movie) =>
        movie.Title.toLowerCase().includes(movieName.toLowerCase())
      );

      return filteredMovies;
    })
    .catch((error) => {
      throw new Error("Não foi possível encontrar o filme pelo nome");
    });
};

const updateMovie = (movieId, updatedData) => {
  return getMovies()
    .then((moviesData) => {
      const movieIndex = moviesData.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );

      if (movieIndex != -1) {
        const existingMovie = moviesData[movieIndex];

        if (updatedData.Genre != undefined) {
          existingMovie.Genre = updatedData.Genre;
        }
        if (updatedData.Metascore != undefined) {
          existingMovie.Metascore = updatedData.Metascore;
        }

        moviesData[movieIndex] = existingMovie;

        return filesystem
          .writeFile(
            movieFilePath,
            JSON.stringify(moviesData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingMovie;
          })
          .error((error) => {
            throw new Error("Não foi possível atualizar o filme!");
          });
      } else {
        throw new Error("Não foi encontrado filme com esse id!");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler os filmes!");
    });
};

const deleteMovie = (movieId) => {
  return getMovies()
    .then((moviesData) => {
      const movieIndex = moviesData.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );

      if (movieIndex != -1) {
        const updatedMoviesData = moviesData.filter(
          (movie) => movie.id !== parseInt(movieId)
        );

        const deletedMovie = moviesData[movieIndex];

        return filesystem
          .writeFile(
            movieFilePath,
            JSON.stringify(updatedMoviesData, null, 2),
            "utf-8"
          )
          .then(() => {
            return deletedMovie;
          })
          .catch((error) => {
            throw new Error("Não foi possível excluir o filme!");
          });
      } else {
        throw new Error("Filme não encontrado!");
      }
    })
    .catch((error) => {
      throw new Error(
        "Não possível ler os filmes para posteriormente apagar um deles!"
      );
    });
};

const addMovie = (newMovieData) => {
  return getMovies()
    .then((moviesData) => {
      let maxMovieId = -1;
      moviesData.forEach((movie) => {
        if (movie.id > maxMovieId) maxMovieId = movie.id;
      });

      const newMovieId = ++maxMovieId;
      const newMovieWithId = Object.assign({ id: newMovieId }, newMovieData);

      moviesData.push(newMovieWithId);
      return filesystem
        .writeFile(movieFilePath, JSON.stringify(moviesData, null, 2), "utf-8")
        .then(() => {
          return newMovieWithId;
        })
        .catch((error) => {
          throw new Error("Não possível adicionar o filme!");
        });
    })
    .catch((error) => {
      throw new Error("Não possível ler o arquivo dos filmes!");
    });
};

const updatePlot = (movieId, newPlot) => {
  return getMovies()
    .then((moviesData) => {
      const movieIndex = moviesData.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );

      if (movieIndex !== -1) {
        const existingMovie = moviesData[movieIndex];

        existingMovie.Plot = newPlot;

        moviesData[movieIndex] = existingMovie;

        console.log(moviesData[movieIndex]);

        return new Promise((resolve, reject) => {
          filesystem.writeFile(
            movieFilePath,
            JSON.stringify(moviesData, null, 2),
            "utf-8",
            (err) => {
              if (err) {
                reject(
                  new Error("Não foi possível atualizar o enredo do filme")
                );
              } else {
                resolve(existingMovie);
              }
            }
          );
        });
      } else {
        throw new Error("Filme não encontrado");
      }
    })
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo de filmes");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  searchMovieByName,
  updateMovie,
  deleteMovie,
  addMovie,
  updatePlot,
};
