module.exports =
  {
    "type": "postgres",
    "host":  'localhost',
    "port": 5435,
    "username": 'postgres',
    "password": 'postgres' ,
    "database": 'mm',
    "migrations": ["./dist/migrations/*.{ts,js}"],
    "entities": ["./dist/**/entities/*.{ts,js}"],
    "cli": {
      "migrationsDir": "./src/migrations"
    },

    "logging": false,
    "syncronize": true
  }
