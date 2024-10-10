const { createApp, ref} = Vue
createApp({

    setup() {
        const peliculas = ref([]);
        let paginas = ref(1);

        return {
            peliculas,
            paginas
        };
    },

    methods: {
        async obtener_peliculas() {
            const url = "https://api.themoviedb.org/3/movie/popular?api_key=81897c6294319bfc06c39ba740a6bfab&page=" + this.paginas;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                this.peliculas = []; //Vaciar las películas de la página anterior
                json.results.forEach(pelicula => {
                    let rating_porcentaje = Math.round(pelicula.vote_average * 10) / 10;
                    pelicula.vote_average = rating_porcentaje * 10;
                    this.peliculas.push(pelicula);
                });
            } catch (error) {
                console.error(error);
            }
        },

        async obtener_lista() {
            const url = "https://api.themoviedb.org/3/movie/popular?api_key=81897c6294319bfc06c39ba740a6bfab&page=" + this.paginas;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                json.results.forEach(pelicula => {
                    let rating_porcentaje = Math.round(pelicula.vote_average * 10) / 10;
                    pelicula.vote_average = rating_porcentaje * 10;
                    this.peliculas.push(pelicula);
                });
            } catch (error) {
                console.error(error);
            }
        },


        siguiente_pagina() {
            this.paginas++;
            this.obtener_peliculas();
        },

        mostrar_mas() {
            this.paginas++;
            this.obtener_lista();
        },

        guardarDatos(pelicula) {
            localStorage.setItem('peliculaSeleccionada', JSON.stringify(pelicula));
            window.location.href = '/movie.html';
        }

        /*var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTg5N2M2Mjk0MzE5YmZjMDZjMzliYTc0MGE2YmZhYiIsIm5iZiI6MTcyODQ1ODU4OS41MzMyMzIsInN1YiI6IjY2ZjNmOTk3M2E5NWE1YmNkYTIyZmExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U8aPg3YgoPNGzJpYxgpJXqRzyRtGFDsLoB29tByC_mU");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTg5N2M2Mjk0MzE5YmZjMDZjMzliYTc0MGE2YmZhYiIsIm5iZiI6MTcyODQ1ODU4OS41MzMyMzIsInN1YiI6IjY2ZjNmOTk3M2E5NWE1YmNkYTIyZmExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U8aPg3YgoPNGzJpYxgpJXqRzyRtGFDsLoB29tByC_mU");
myHeaders.append("Content-Type", "application/json;charset=utf-8");

var raw = "{\n    \"value\": 8.5\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.themoviedb.org/3/movie/115/rating?session_id=2675693207a25ee228c0697e836e96af81797536", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/
    },

    async mounted() {
        this.obtener_peliculas();
    }

}).mount('#main-popular');