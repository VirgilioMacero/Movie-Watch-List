const getState = ({ getStore, getActions, setStore }) => {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmVlMGI4ZGRjODZkNmFkYjAyNmJhYjAwZTQ3Mzg4OCIsInN1YiI6IjY2MzJjMzcxNjY1NjVhMDEyMzEzNjU1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHo74_E1RoidGVwt8z_lSP-jaz0Ju7FG2ea9Q4jRnQg'
    }
  };

  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white"
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white"
        }
      ],
      isSeriesActive: false, // Add isSeriesActive property to track the toggle state
      films: [],
      film: {},
      filmCredits: [],
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
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(seriesName)}&include_adult=false&language=en-US&page=1`,
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
      getMovieCredits: async (movieId) => {
        const credits = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
      }
    }
  };
};

export default getState;
