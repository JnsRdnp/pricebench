#!/bin/bash

# Run your data population scripts
echo "Running database population scripts..."
npm run buildBenchmarks
npm run buildGigantti

# Start the server
echo "Starting the Node.js app..."
exec node app.js