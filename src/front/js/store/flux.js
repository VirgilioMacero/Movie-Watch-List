const getState = ({ getStore, getActions, setStore }) => {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      isSeriesActive: false,
      setShowLoginModal: false,
      films: [],
      film: {},
      filmCredits: [],
      isLoged: false,
      favoriteFilms: [],
      recentlyWatchedFilms: [],
      selectedGenre: "", // Add selectedGenre to the store
    },
    actions: {
      setShowLoginModal: (value) => {
        setStore({ setShowLoginModal: value });
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMoviesByName: async (name) => {
        const movies = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            name
          )}&include_adult=false&language=en-US&page=1`,
          config
        );

        const jsonMovies = await movies.json();

        setStore({ films: jsonMovies.results });
      },
      getSeriesByName: async (seriesName) => {
        const series = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
            seriesName
          )}&include_adult=false&language=en-US&page=1`,
          config
        );

        const jsonSeries = await series.json();

        setStore({ films: jsonSeries.results });
      },
      getSingleMovie: async (movieId) => {
        const movie = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          config
        );
        const jsonMovie = await movie.json();

        setStore({ film: jsonMovie });
      },
      getSingleTvShow: async (showId) => {
        const tvShow = await fetch(
          `https://api.themoviedb.org/3/tv/${showId}`,
          config
        );
        const jsonTvShow = await tvShow.json();

        setStore({ film: jsonTvShow });
      },
      getMovieCredits: async (movieId) => {
        const credits = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          config
        );
        const jsonCredits = await credits.json();

        setStore({ filmCredits: jsonCredits });
      },
      getSeriesCredits: async (serieId) => {
        const credits = await fetch(
          `https://api.themoviedb.org/3/tv/${serieId}/credits`,
          config
        );
        const jsonCredits = await credits.json();

        setStore({ filmCredits: jsonCredits });
      },
      getMoviesByGenre: async (genre) => {
        const genresResponse = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=en',
          config
        );
        const genresData = await genresResponse.json();
        const genreObject = genresData.genres.find((g) => g.name.toLowerCase() === genre.toLowerCase());
        
        if (!genreObject) {
          console.error('Genre not found');
          return;
        }

        const genreId = genreObject.id;
        const movies = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&include_adult=false&language=en`,
          config
        );

        const jsonMovies = await movies.json();

        setStore({ films: jsonMovies.results });
      },
      getSeriesByGenre: async (genreSeries) => {
        const genresResponse = await fetch(
          'https://api.themoviedb.org/3/genre/tv/list?language=en',
          config
        );
        const genresData = await genresResponse.json();
        const genreObject = genresData.genres.find((g) => g.name.toLowerCase() === genreSeries.toLowerCase());
        
        if (!genreObject) {
          console.error('Genre not found');
          return;
        }

        const genreId = genreObject.id;
        const seriesGenre = await fetch(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&include_adult=false&language=en`,
          config
        );

        const jsonSeries = await seriesGenre.json();

        setStore({ films: jsonSeries.results });
      },
      setSelectedGenre: (genre) => {
        setStore({ selectedGenre: genre });
      },
      setFilteredFilms: (films) => {
        setStore({ films });
      },
      toggleSeries: () => {
        const store = getStore();
        setStore({ isSeriesActive: !store.isSeriesActive });
      },
      login: async (email, password) => {
        const login = await fetch(process.env.BACKEND_URL + "api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email, password }),
        });
        if (login.status === 200) {
          const data = await login.json();
          setStore({ isLoged: true });
          localStorage.setItem("token", data.token);
          getActions().loadFavorites();
          getActions().loadRecently();
        } else {
          return login.statusText;
        }
      },
      register: async (name, lastname, email, password) => {
        const register = await fetch(process.env.BACKEND_URL + "api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, lastName: lastname, email, password }),
        });

        if (!register.ok) {
          throw Error("There was a problem in the login request");
        } else {
          return register.statusText;
        }
      },
      validatLoged: () => {
        if (localStorage.getItem("token")) {
          setStore({ isLoged: true });
        } else {
          setStore({ isLoged: false });
        }
      },
      logOut: () => {
        localStorage.removeItem("token");
        getActions().validatLoged();
      },
      loadRecently: async () => {
        const token = localStorage.getItem("token");
        const recently_watched = await fetch(
          process.env.BACKEND_URL + "api/recently_watched",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const jsonRecently = await recently_watched.json();
        setStore({ recentlyWatchedFilms: jsonRecently.Recently_Watched });
      },
      setRecently: async (film_id, film_name, film_image, is_movie) => {
        const token = localStorage.getItem("token");

        const recently_watched = await fetch(
          process.env.BACKEND_URL + "api/recently_watched",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ film_id, film_name, film_image, is_movie }),
          }
        );

        if (recently_watched.ok) {
          getActions().loadRecently();
        }
      },
      deleteRecently: async (recently_id) => {
        const token = localStorage.getItem("token");
        const recentlyToDelete = await fetch(
          process.env.BACKEND_URL + "api/recently_watched",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ recently_id: recently_id }),
          }
        );
        if (recentlyToDelete.ok) {
          getActions().loadRecently();
        }
        console.log(recentlyToDelete.text());
      },
      getRecentlySeriesByName: (Search) => {
        const store = getStore();
        const value = Search.toLowerCase();
        const filteredValue = store.recentlyWatchedFilms.filter(
          (film) =>
            film.film_name.toLowerCase().includes(value) && !film.is_movie
        );

        setStore({ recentlyWatchedFilms: filteredValue });
      },
      getRecentlyMoviesByName: (Search) => {
        const store = getStore();
        const value = Search.toLowerCase();
        const filteredValue = store.recentlyWatchedFilms.filter(
          (film) =>
            film.film_name.toLowerCase().includes(value) && film.is_movie
        );
        setStore({ recentlyWatchedFilms: filteredValue });
      },
      loadFavorites: async () => {
        const token = localStorage.getItem("token");
        const favorites = await fetch(
          process.env.BACKEND_URL + "api/favorites",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const jsonFavorites = await favorites.json();
        setStore({ favoriteFilms: jsonFavorites.Favorites });
      },
      setFavorite: async (film_id, film_name, film_image, is_movie) => {
        const token = localStorage.getItem("token");

        const favorite = await fetch(
          process.env.BACKEND_URL + "api/favorites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ film_id, film_name, film_image, is_movie }),
          }
        );

        if (favorite.ok) {
          getActions().loadFavorites();
        }
      },
      deleteFavorite: async (favorite_id) => {
        const token = localStorage.getItem("token");
        const favoriteToDelete = await fetch(
          process.env.BACKEND_URL + "api/favorites",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ favorite_id: favorite_id }),
          }
        );
        if (favoriteToDelete.ok) {
          getActions().loadFavorites();
        }
        console.log(favoriteToDelete.text());
      },
      getFavoriteSeriesByName: (Search) => {
        const store = getStore();
        const value = Search.toLowerCase();
        const filteredValue = store.favoriteFilms.filter(
          (film) =>
            film.film_name.toLowerCase().includes(value) && !film.is_movie
        );

        setStore({ favoriteFilms: filteredValue });
      },
      getFavoriteMoviesByName: (Search) => {
        const store = getStore();
        const value = Search.toLowerCase();
        const filteredValue = store.favoriteFilms.filter(
          (film) =>
            film.film_name.toLowerCase().includes(value) && film.is_movie
        );
        setStore({ favoriteFilms: filteredValue });
      },
    },
  };
};

export default getState;