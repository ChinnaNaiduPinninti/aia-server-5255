#!/bin/bash
input_string="$1"
# Define the source and destination directories
source_dir=$(echo "$input_string" | cut -d ',' -f 1)
destination_dir=$(echo "$input_string" | cut -d ',' -f 2)
echo "$source_dir"
echo "$destination_dir"

# Check if the destination directory exists, and if not, create it
if [ ! -d "$destination_dir" ]; then
    mkdir -p "$destination_dir"
    echo "Destination directory created: $destination_dir"
fi

# Copy files from source to destination
cp -r "$source_dir"* "$destination_dir"
echo "Files copied from $source_dir to $destination_dir"
