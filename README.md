# Template Sounds
Serves Template Sounds
Sounds will be hosted at: https://jadujoel.github.io/template-sounds/
To see end result open:  https://jadujoel.github.io/template-game/

To edit with your own sounds:
First you'll need acces to @netent-tech organization on github.
Then you need to create token and edit your .npmrc file to be able to access the artifactory locally.

Then:
```
npm install
npm run serve
```
In a separate terminal
```
npm run watch
```
open: https://jadujoel.github.io/template-game/?ecas-load-path=http:localhost:3000

if the serve command gave you a different url (for example http:localhost:58791) then replace with that.

Make changes to your config / sounds.
Reload page to test them.

When you're happy.
Git commit and push.
The changes will become available publicly after a minute or so.
