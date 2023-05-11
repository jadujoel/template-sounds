#!/bin/bash
# Description: Forward ports for the current codespace
if [[ -n $CODESPACE_NAME ]]; then
  gh codespace ports visibility 3000:public -c $CODESPACE_NAME
fi
