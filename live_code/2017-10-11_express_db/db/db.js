const pgp = require('pg-promise')()

// const connection = { host: 'localhost', port: 5432, db: 'pets' }
const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///pets_test'
  : 'postgres:///pets'
const db = pgp(connection)

/**
 * Gets pets and species from db
 * @return {Promise} - resolves to array of objects, each with keys 'name' and 'species_name'
 */
const getPetsAndSpecies = () => {
  const query = `SELECT p.name, s.species_name
                  FROM pets AS p
                  JOIN species AS s
                    ON s.species_id = p.species_id
                `
  return db.any(query)
}

module.exports = {
  db,
  getPetsAndSpecies,
}
