# Template Sounds
Serves Template Sounds

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

copy url the server gives you (http://localhost:3000 by default) and add after the ? below
open: https://jadujoel.github.io/template-game/?my_url
for example: https://jadujoel.github.io/template-game/?ecas-load-path=http:localhost:3000

Make changes to your config / sounds.
Reload page to test them.

When you're happy.
Git commit and push.
The changes will become available publicly after a minute or so.
