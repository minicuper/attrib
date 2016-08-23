#########################################################
# Comp2
#########################################################

_ = require 'lodash'

module.exports = class Comp2
  view: __dirname

  init: ->
    @app.comp2 = this

  create: ->
#    @model.on 'change', 'exp2', ->
#      console.log 'model change', 'exp2', arguments
#    @model.on 'change', 'exp3', ->
#      console.log 'model change', 'exp3', arguments