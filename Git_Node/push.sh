#!/bin/bash


# Input string
input_string="$1"


# Use 'cut' to split the string by ',' and assign to variables
branchName=$(echo "$input_string" | cut -d ',' -f 1)

message=$(echo "$input_string" | cut -d ',' -f 2)

serverName=$(echo "$input_string" | cut -d ',' -f 3)
cd /opt/wm/git/$serverName
git switch $branchName

git add --all

git status

git commit -m "$message"

git push --set-upstream origin $branchName