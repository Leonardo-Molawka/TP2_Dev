/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
import crypto from 'crypto';
import fetch from 'node-fetch';

export const getData = async (url) => {
    const publicKey = "4fd8a1bi98eb8e6f1486edd1ead66e7f";
    const privateKey = "843eceddabf7aa1152a6dcdd1020578b2234f4ca";
    const timestamp = Date.now().toString();

    try {
        const hash = await getHash(publicKey, privateKey, timestamp);

        const fullUrl = `${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error;
    }
};

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<string>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    try {
        const data = timestamp + privateKey + publicKey;
        return crypto.createHash('md5').update(data).digest('hex');
    } catch (error) {
        console.error("Erreur lors du calcul du hash:", error);
        throw error;
    }
};
