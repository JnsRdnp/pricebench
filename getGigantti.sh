#!/bin/bash

# Load .env file if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

USER_AGENT='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'

mkdir -p ./raws

wget --user-agent="$USER_AGENT" "$URL1" -O ./raws/giganttikoneet1.html
wget --user-agent="$USER_AGENT" "$URL2" -O ./raws/giganttikoneet2.html
wget --user-agent="$USER_AGENT" "$URL3" -O ./raws/giganttikoneet3.html
wget --user-agent="$USER_AGENT" "$URL4" -O ./raws/giganttikoneet4.html