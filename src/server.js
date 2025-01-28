import Fastify from 'fastify';
import handlebars from '@fastify/view';
import path from 'path';
import { getData } from './api.js';

const fastify = Fastify({ logger: true });

fastify.register(handlebars, {
    engine: {
        handlebars: require('handlebars')
    },
    root: path.join(__dirname, '../templates'),
    layout: 'layout.hbs',
    options: {
        partials: {
            header: 'header.hbs',
            footer: 'footer.hbs'
        }
    }
});

fastify.get('/', async (request, reply) => {
    try {
        const url = 'https://gateway.marvel.com/v1/public/characters';
        const data = await getData(url);

        // Filtrer les personnages avec des images valides
        const characters = data.data.results
            .filter(character => character.thumbnail && !character.thumbnail.path.includes('image_not_available'))
            .map(character => ({
                name: character.name,
                description: character.description || 'Pas de description disponible',
                imageUrl: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`
            }));

        // Rendre les données dans le template
        return reply.view('index.hbs', { characters });
    } catch (error) {
        reply.code(500).send('Erreur lors de la récupération des personnages');
    }
});

// Lancer le serveur
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Serveur démarré sur http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
