const path = require('path');
const YAML = require('yamljs');

// Load the OpenAPI spec from the YAML file and export it as a JS object
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

module.exports = swaggerDocument;
