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
      isSeriesActive: false, // Add isSeriesActive property to track the toggle state
      films: [],
      film: {},
      filmCredits: [],
      isLoged: false,
      favoriteFilms: [],
      recentlyWatchedFilms: [],
    },
    actions: {
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
        }
      },
    },
  };
};

export default getState;
