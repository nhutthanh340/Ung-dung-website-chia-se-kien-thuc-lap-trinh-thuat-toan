# share-facebook [![Build Status](https://travis-ci.org/bukinoshita/share-facebook.svg?branch=master)](https://travis-ci.org/bukinoshita/share-facebook)

> Create a Facebook share url with ease


## Install

```bash
$ yarn add share-facebook
```


## Usage

```js
const shareFacebook = require('share-facebook')

shareFacebook({
  quote: 'Check this library to help you create share facebook url',
  url: 'https://bukinoshita.io',
  redirect_uri: 'https://bukinoshita.io',
  app_id: 'APP_ID'
})
// https://www.facebook.com/dialog/share?app_id=APP_ID&redirect_uri=https://bukinoshita.io&display=page&quote=Check%20this%20library%20to%20help%20you%20create%20share%20facebook%20url
```

_When add the `url` to a `<a/>` tag it should work like [this](https://www.facebook.com/dialog/share?app_id=145634995501895&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer&display=page&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&quote=Sharing%20with%20FB&quote=Sharing%20with%20FB)_


## Examples

Check the [examples](https://github.com/bukinoshita/share-facebook/blob/master/examples)


## API

### shareFacebook([options])

Returns a `string`

#### app_id

Type: `string`<br/>
Example: `APP_ID`<br/>
Required

Your app's unique identifier.

#### redirect_uri

Type: `string`<br/>
Example: `https://bukinoshita.io`<br/>
Required

The URL to redirect to after a person clicks a button on the dialog. Required when using URL redirection.

#### display

Type: `string`<br/>
Default: `page`<br/>
Example: `page`

Determines how the dialog is rendered.

- If you are using the URL redirect dialog implementation, then this will be a full page display, shown within Facebook.com. This display type is called `page`.
- If you are using one of our iOS or Android SDKs to invoke the dialog, this is automatically specified and chooses an appropriate display type for the device.
- If you are using the Facebook SDK for JavaScript, this will default to a modal `iframe` type for people logged into your app or `async` when using within a game on Facebook.com, and a `popup` window for everyone else. You can also force the `popup` type when when you use the Facebook SDK for JavaScript, if necessary.
- Mobile web apps will always default to the `touch` display type.


#### href

Type: `string`<br/>
Example: `https://bukinoshita.io`

The link attached to this post. Required when using method `share`. Include open graph meta tags in the page at this URL to customize the story that is shared.

#### hashtag

Type: `string`<br/>
Example: `#facebook`

A hashtag specified by the developer to be added to the shared content. People will still have the opportunity to remove this hashtag in the dialog. The hashtag should include the hash symbol.

#### quote

Type: `string`<br/>
Example: `share with FB`

A quote to be shared along with the link, either highlighted by the user or predefined by the developer, as in a pull quote on an article.

#### mobile_iframe

Type: `boolean`<br/>
Default: `false`<br/>
Example: `true`

If set to true the share button will open the share dialog in an iframe on top of your website (For more information see Mobile Web Share Dialog. This option is only available for mobile, not desktop.


## Related

- [share-twitter](https://github.com/bukinoshita/share-twitter) — Create a Twitter share url with ease


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
