# Template Sounds
Serves Template Sounds
Sounds will be hosted at: https://jadujoel.github.io/template-sounds/
To see end result open:  https://jadujoel.github.io/template-game/

## Using Github Codespaces
Ask for Collaborator access.
Then click ```https://codespaces.new/jadujoel/template-sounds```
After the codespace has started, in the terminal, run:
```bash
npm run dev
```
Then click the provided url.
And run this command in the terminal:
```bash
# forward the codespace server to be public so that template-game can access
npm run proxy
```
Reload the game in the tab you opened previously, it should now be loading your config/index.ts.

When you are done, commit and push.
The github action will build and deploy your latest config / sounds to the be accessible at https://jadujoel.github.io/template-game/
---

## Using Local Machine
First you'll need acces to @netent-tech organization on github.
Then you need to create token and edit your .npmrc file to be able to access the artifactory locally.

Then:
```
npm install
npm run dev
```
Make changes to your config / sounds.
Reload page to test them.

When you're happy.
Git commit and push.
The changes will become available at https://jadujoel.github.io/template-game/ after minute or so without needing to use the load-path in the url..

To kill the server / ecas-encoder watcher that is running in the background.
```
npm run kill
```

## Info
Logs from server and watch command is stored to .serve.log and .watch.log repectively.
