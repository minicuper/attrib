#########################################################
# Comp2
#########################################################

_ = require 'lodash'

module.exports = class Comp2
  view: __dirname

  init: ->

  create: ->
    @model.start 'exp2', 'exp', (exp) ->
      exp + 1
