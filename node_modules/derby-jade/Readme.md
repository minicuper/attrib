# Derby-Jade

- Jade compiler for Derby
- Derby 0.6 version is the only supported (for previous Derby use 0.5 branch)
- Supports derby-specific tags that ends with `:` and makes `if, else, else if, unless, with, each` compile into derby View-variables
- Colons after derby-specific tags are optional
- process.env.DEBUG = 'derby-jade'; enables debug info
- Coffeescript support

## Known Issues
- Line numbers in Jade errors can be wrong, because we compile file by parts
- If you on Coffescript, use this.contextfield or @.contextfield to access context and @fieldname to access component fields as in original Derby syntax

### Installation
```
npm install derby-jade
```
### Setting
```js
app.serverUse(module, 'derby-jade');
// before app.loadViews();
```

### Coffeescript

If you want to use Coffeescript instead of Javascript in templates:

```js
app.serverUse(module, 'derby-jade', {coffee: true});
```
Then you can do something like this:
```html
if a and b
  p 
    a(on-click="console.log c or 'log'") {{d or 'Click Me'}}
  script.
    here = canbe + coffee and script
```

### Usage

## Derby.js-specific syntax

### Conditionals, `each`, `with`

```jade
if _session.loggedIn
  h1 Hello, {{_session.username}}
else
  a(href='/login') Login
```
compiles to
```html
{{if _session.loggedIn}}
    <h1>Hello, {{_session.username}}</h1>
{{else}}
    <a href="/login">Login</a>
{{/}}
```

Another example:
```jade
if _page.flash as #flash
  if #flash.error
    ul.alert.alert-error
      each #flash.error
        li {{this.error}}
  if #flash.info
    ul.alert.alert-success
      each #flash.info as #info
        li {{#info}}
else
  p No notifications
```
 compiles to
```html
{{if _page.flash as #flash}}
    {{if #flash.error}}
        <ul class="alert alert-error">
            {{each #flash.error}}
                <li>{{this.error}}</li>
            {{/}}
        </ul>
    {{/}}
    {{if #flash.info}}
        <ul class="alert alert-success">
            {{each #flash.info as #info}}
                <li>{{#info}}</li>
            {{/}}
        </ul>
    {{/}}
{{else}}
    <p>No notifications</p>
{{/}}
```

### `import:` and template declarations

```jade
import:(src='./auth', ns='')
import(src='./games')

Title:
  | My cool app

Body
  view(name='welcome', title='Welcome {{_session.username}}')
    p We are glad to see you!

Footer:
  view(name='copyright')

welcome
  h1 {{@title}}
  | {{@content}}

copyright:
  p Use it however you want {{_session.username}}!
```


## Jade + Js
```jade
import(src='./home', ns='home')
import:(src='./about')

Body:
  each _page.users as #user
    if #user && #user.id
      a(on-click='click(#user && #user.id)') {{#user && #user.name}}
    else if #user || #user.id
      p {{#user.id}}
    else
      p nothing
    view(name='{{#user.id || #user.name}}')
    p {{unescaped #user.name}}

  p
    script.
      window.scrollTo(0 || 1, 0 && 1)
    //script.
      window.location = window.location
    p
      script.
        history.go(-2)
      // p bla-bla
  script history.go(2)
  script(src='/script.js')
  script.
    history.go(1)

component
  p {{@name}}
  if _page.name || @name && this.field
    div {{show(@name)}}
  script.
    history.go(0)

input
  p a

index:
  layout:body
    view(name="matches-you-liked")

matches-you-liked:
  h1 Matches you liked
```

## Jade + Coffee
```jade
import(src='./home', ns='home')
import:(src='./about')

Body:
  each _page.users as #user
    if #user and #user.id
      a(on-click='click #user and #user.id') {{#user and #user.name}}
    else if #user or #user.id
      p {{#user.id}}
    else
      p nothing
    view(name='{{#user.id or #user.name}}')
    p {{unescaped #user.name}}

  p
    script.
      window.scrollTo 0 or 1, 0 and 1
    //script.
      window.location = window.location
    p
      script.
        history.go -2
      // p bla-bla
  script history.go 2
  script(src='/script.js')
  script.
    history.go 1

component
  p {{@name}}
  if _page.name or @name and @.field
    div {{show @name}}
  script.
    history.go 0

input
  p a

index:
  layout:body
    view(name="matches-you-liked")

matches-you-liked:
  h1 Matches you liked
```

## Result
```html
<import: src="./home" ns="home">
<import: src="./about">
<Body:>
  {{each _page.users as #user}}
    {{if #user && #user.id}}<a on-click="click(#user && #user.id)">{{#user && #user.name}}</a>    {{else if #user || #user.id}}
      <p>{{#user.id}}</p>
    {{else}}
      <p>nothing</p>
    {{/}}
    <view name="{{#user.id || #user.name}}"></view>
    <p>{{unescaped #user.name}}</p>
  {{/}}
  <p>
    <script>
      window.scrollTo(0 || 1, 0 && 1)
    </script>
    <p>
      <script>
        history.go(-2)
      </script>
    </p>
  </p>
  <script>history.go(2)</script>
  <script src="/script.js"></script>
  <script>
    history.go(1)
  </script>
<component:>
  <p>{{@name}}</p>
  {{if _page.name || @name && this.field}}
    <div>{{show(@name)}}</div>
  {{/}}
  <script>
    history.go(0)
  </script>
<input:>
  <p>a</p>
<index:>
  <layout:body>
    <view name="matches-you-liked"></view>
  </layout:body>
<matches-you-liked:>
  <h1>Matches you liked</h1>
```
