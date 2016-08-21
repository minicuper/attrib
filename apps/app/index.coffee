_ = require 'lodash'
derby = require 'derby'

app = module.exports = derby.createApp 'app', __filename

require 'derby-parsing'
app.use require 'derby-router'
app.use require 'derby-debug'
app.serverUse module, 'derby-jade'
app.serverUse module, 'derby-stylus'


app.loadViews __dirname + '/views'
app.loadStyles __dirname + '/styles'

#app.use require 'dm-form'

app.component require './components/comp'
app.component require './components/comp2'

derbyTemplates = require 'derby-templates'
templates = derbyTemplates.templates
expressions = derbyTemplates.expressions
{View, Views} = templates
views = new Views()

app.on 'model', (model) ->
  model.fn 'attrs', (attrs) ->
    _.zipObject attrs

app.get 'home', '/', ->
  @model.set '_page.attrs', [
    ['style', 'color:red'],
    ['title', 'derby magic']
  ]

  @model.start '_page.attrsObj', '_page.attrs', 'attrs'

  @render()
  
app.get 'second', ->
  @model.set '_page.a', 5
  @model.set '_page.b', 5
#  @model.set '_page.exp', '_page.a + 10'
  
  @render()  


app.proto.addAttr = ->
  @model.push '_page.attrs', []

app.proto.removeAttr = (index)->
  @model.remove '_page.attrs', index

deserialize = (string) =>
  eval(string)
  
#app.proto.getExpression = (str) ->
#  view = new View(views, 'name', '{{'+str+'}}', {} )
#  view.parse()
#
#  dynamicText = view?.template?.content[0]
#  expression = dynamicText?.expression
#
#  expression2 = deserialize(expression.serialize())
#
#  parentWrapper = new templates.ParentWrapper(
#        new templates.DynamicText(expression), expression2)
#
#  console.log 'parentWrapper', parentWrapper.serialize()
#  parentWrapper