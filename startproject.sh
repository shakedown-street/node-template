#!/bin/bash

PROJECT_NAME="$1"

CLONE_BRANCH="main"

if [[ -z "${PROJECT_NAME// }" ]]; then
    echo "You must give a project name."
    exit 1
fi

# Check for directory collision
if [ -d $PWD/$PROJECT_NAME ]; then
    echo "$PROJECT_NAME already exists in this directory."
    exit 1
fi


mkdir $PROJECT_NAME

git clone -b $CLONE_BRANCH --single-branch https://github.com/shakedown-street/node-template.git $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git
rm startproject.sh

find . -type f -print0 | xargs -0 sed -i "s/PROJECT_NAME/$PROJECT_NAME/g"
npm install
