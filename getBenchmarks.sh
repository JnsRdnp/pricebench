#!/bin/bash

# Load .env variables if the file exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

USER_AGENT='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'

mkdir -p ./raws

# Download CPU Single Threaded benchmark pages
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_1" -O ./raws/cpuSingle1.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_2" -O ./raws/cpuSingle2.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_3" -O ./raws/cpuSingle3.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_4" -O ./raws/cpuSingle4.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_5" -O ./raws/cpuSingle5.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_6" -O ./raws/cpuSingle6.html
wget --user-agent="$USER_AGENT" "$CPU_SINGLE_7" -O ./raws/cpuSingle7.html

# Download CPU Multi Threaded benchmark pages
wget --user-agent="$USER_AGENT" "$CPU_MULTI_1" -O ./raws/cpuMulti1.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_2" -O ./raws/cpuMulti2.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_3" -O ./raws/cpuMulti3.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_4" -O ./raws/cpuMulti4.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_5" -O ./raws/cpuMulti5.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_6" -O ./raws/cpuMulti6.html
wget --user-agent="$USER_AGENT" "$CPU_MULTI_7" -O ./raws/cpuMulti7.html

# Download GPU benchmark page
wget --user-agent="$USER_AGENT" "$GPU_BENCH" -O ./raws/gpubench.html