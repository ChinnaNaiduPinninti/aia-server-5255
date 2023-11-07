#!/bin/bash

# Input string
input_string="$1"

# Use 'cut' to split the string by ',' and assign to variables
branchName=$(echo "$input_string" | cut -d ',' -f 1)
gitDirectory=$(echo "$input_string" | cut -d ',' -f 2)




cd /opt/wm/git/"$gitDirectory"
git switch master
git branch "$branchName"
git switch "$branchName"


