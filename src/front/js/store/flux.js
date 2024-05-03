const getState = ({ getStore, getActions, setStore }) => {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRjZjRkNWRkOWE1MjY5OTkzZmYzMDZjMTFiZWUwNiIsInN1YiI6IjY2MzJjNDllODEzY2I2MDEyNzg2OGVhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pEBxlVVlyO-l9XVSehVob973yrYU1poFbu1jwvUgau4`,
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
      movies: [],
      movie: {},
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMoviesByName: async (name) => {
        const movies = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            name
          )}&include_adult=true&language=en-US&page=1`,
          config
        );

        const jsonMovies = await movies.json();

        setStore({ movies: jsonMovies.results });
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
