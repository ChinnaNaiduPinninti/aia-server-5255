#!/bin/bash
input_string="$1"
# Define the source and destination directories
packageName=$(echo "$input_string" | cut -d ',' -f 1)
serverName=$(echo "$input_string" | cut -d ',' -f 2)
# Input string

SOURCE="/opt/wm/is1015/IntegrationServer/instances/esb_5255/packages/"
DESTINATION="/opt/wm/git/$serverName/IS/packages/"
mkdir $DESTINATION/$packageName
cp -r "$SOURCE/$packageName/"* "$DESTINATION/$packageName/"