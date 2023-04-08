#!/bin/bash

PROJECT_NAME="$1"

CLONE_BRANCH="main"

if [ -z "$PROJECT_NAME" ]; then
    echo "Please provide a project name"
    exit 1
fi

if [ -d "$PROJECT_NAME" ]; then
    echo "Project directory already exists"
    exit 1
fi

mkdir "$PROJECT_NAME"

git clone --branch "$CLONE_BRANCH" --single-branch https://github.com/shakedown-street/node-template.git $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git
rm startproject.sh

find . -type f -print0 | xargs -0 sed -i "s/PROJECT_NAME/$PROJECT_NAME/g"
npm install




