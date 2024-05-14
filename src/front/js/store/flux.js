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
        const genreIdMap = {
          action: 28,
          adventure: 12,
          animation: 16,
          comedy: 35,
          crime: 80,
          documentary: 99,
          drama: 18,
          family: 10751,
          fantasy: 14,
          history: 36,
          horror: 27,
          music: 10402,
          mystery: 9648,
          romance: 10749,
          thriller: 53,
          war: 10752,
          western: 37,
        };
        
        const genreId = genreIdMap[genre];
        const movies = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&include_adult=false&language=en`,
          config
        );
        
        const jsonMovies = await movies.json();
        
        setStore({ films: jsonMovies.results });
      },
      getSeriesByGenre: async (genreSeries) => {
        const genreSeriesIdMap = {
          action: 28,
          adventure: 12,
          animation: 16,
          comedy: 35,
          crime: 80,
          documentary: 99,
          drama: 18,
          family: 10751,
          fantasy: 14,
          history: 36,
          horror: 27,
          music: 10402,
          mystery: 9648,
          romance: 10749,
          thriller: 53,
          war: 10752,
          western: 37,
        };
        
        const genreSeriesId = genreSeriesIdMap[genreSeries];
        const seriesGenre = await fetch(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&include_adult=false&language=en`,
          config
        );
        
        const jsonSeries = await series.json();

        setStore({ films: jsonSeries.results });
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
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
          getActions().loadRecenlyWatched();
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
      addRecentlyWatched: async (filmId, filmName, isMovie) => {
        console.log("Film ID:", filmId);
        console.log("Film Name:", filmName);
        console.log("Is Movie:", isMovie);

        // Ensure that all required data is provided
        if (!filmId || !filmName || typeof isMovie === "undefined") {
          console.error(
            "Missing required data for adding recently watched film"
          );
          return;
        }

        // Retrieve JWT token from local storage
        const token = localStorage.getItem("token");

        // Check if token exists
        if (!token) {
          console.error("JWT token not found in local storage");
          return;
        }

        // Send request to add recently watched film
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}api/recently_watched`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Include JWT token in the Authorization header
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                film_id: filmId,
                film_name: filmName,
                is_movie: isMovie,
              }),
            }
          );

          if (response.ok) {
            console.log("Film added to recently watched");
          } else {
            console.error("Failed to add film to recently watched");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      loadFavorites: async () => {
        const token = localStorage.getItem("token");

        const favorites = await fetch(
          process.env.BACKEND_URL + "api/favorites",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
      },
    },
  };
};

export default getState;
