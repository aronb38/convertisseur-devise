const axios = require('axios');

async function convertirDevises(montant, deviseSource, deviseCible) {
    const url = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${deviseSource}`;
    try {
        const response = await axios.get(url);
        const taux = response.data.conversion_rates[deviseCible];
        if (!taux) throw new Error(`Conversion impossible entre ${deviseSource} et ${deviseCible}`);
        const montantConverti = montant * taux;
        return montantConverti;
    } catch (error) {
        console.error('Erreur lors de la conversion :', error.message);
        throw error;
    }
}

// Exemple d'exécution
(async () => {
    const montant = 100;
    const deviseSource = 'USD';
    const deviseCible = 'EUR';
    const result = await convertirDevises(montant, deviseSource, deviseCible);
    console.log(`${montant} ${deviseSource} est égal à ${result} ${deviseCible}`);
})();

module.exports = convertirDevises;
