export default fetchCountries;

function fetchCountries(seachQuery) {
    const BASE_URL = 'https://restcountries.com/v3/name';
    return fetch(`${BASE_URL}/${seachQuery}`).then(response => {
        if (response.status === 200) {
            return response.json()
        } else { throw Error(response.status) }
    })
} 