#!/bin/bash

# Get the git clone command from the argument
command="$1"

# Define the directory where you want to clone the Git repository
base_directory="/opt/wm/git/"

# Extract serverName and projectName from the clone command (adjust this based on your clone command structure)
serverName="$2"  # Extract serverName from the command
projectName="$3"  # Extract projectName from the command

# Create a directory path based on serverName and projectName
target_directory="$base_directory$serverName"_"$projectName"

# Change to the target directory
mkdir -p "$target_directory" && cd "$target_directory" || exit 1

# Execute the git clone command
eval "$command"