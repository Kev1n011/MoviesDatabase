const { createApp: app_pelicula_rating, ref: ref_rating } = Vue;

app_pelicula_rating({
    setup() {
        const peliculas = ref_rating([]);
        let paginas = ref_rating(1);

        return {
            peliculas,
            paginas
        };
    },

    methods: {
        async obtener_peliculas() {
            //https://api.themoviedb.org/3/account/:account_id/rated/movies?session_id=4653236c5d8039ea5293a9b56e7f89275623127c&api_key=81897c6294319bfc06c39ba740a6bfab
            let guest_session = localStorage.getItem('session_id')
            const url = "https://api.themoviedb.org/3/account/:account_id/rated/movies?session_id="+ guest_session +"&api_key=81897c6294319bfc06c39ba740a6bfab";
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
            let guest_session = localStorage.getItem('session_id')
            const url = "https://api.themoviedb.org/3/account/:account_id/rated/movies?session_id="+ guest_session +"&api_key=81897c6294319bfc06c39ba740a6bfab";
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
    },

    async mounted() {
        this.obtener_peliculas();
    }

}).mount('#main-rated');
