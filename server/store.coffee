shareDbMongo = require 'sharedb-mongo'
coffeeify = require 'coffeeify'

module.exports = (derby, publicDir) ->
  db = shareDbMongo process.env.MONGO_URL + '?auto_reconnect=true', {safe: true}
  derby.use require 'racer-bundle'


  store = derby.createBackend {db}

  store.on 'bundle', (browserify) ->

    browserify.transform {global: true}, coffeeify

    pack = browserify.pack

    browserify.pack = (opts) ->
      detectTransform = opts.globalTransform.shift()
      opts.globalTransform.push detectTransform
      pack.apply this, arguments

  store

