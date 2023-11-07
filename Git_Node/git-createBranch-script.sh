#!/bin/bash

# Input string
input_string="$1"

# Use 'cut' to split the string by ',' and assign to variables
branchName=$(echo "$input_string" | cut -d ',' -f 1)
gitDirectory=$(echo "$input_string" | cut -d ',' -f 2)
branchType=$(echo "$input_string" | cut -d ',' -f 3)
branchCategory=$(echo "$input_string" | cut -d ',' -f 4)
ProjectName=$(echo "$input_string" | cut -d ',' -f 5)

fullDirectory="opt/wm/git/${gitDirectory}"_"${branchName}/${gitDirectory}"

cd "$fullDirectory"
git switch "$branchCategory"
if [ ""$branchType"" = ""other"" ]; then
    git branch "$branchName" # Code to execute if the condition is true
    git switch "$branchName"
else
	git branch "$branchType""$branchName"
     git switch "$branchType""$branchName"

fi


