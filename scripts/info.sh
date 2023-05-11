#!/bin/bash
CODESPACE_PATH="https://$CODESPACE_NAME-3000.preview.app.github.dev/"
LOCAL_PATH=http://localhost:3000
if [[ -n $CODESPACE_NAME ]]; then
  LOAD_PATH=$CODESPACE_PATH
else
  LOAD_PATH=$LOCAL_PATH
fi
echo "Open https://jadujoel.github.io/template-game/?ecas-load-path=https://$CODESPACE_NAME-3000.preview.app.github.dev/ in your browser"
