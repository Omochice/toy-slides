#!/usr/bin/env bash

set -ue

cat << EOS
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Slides</title>
    <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
  </head>
  <body>
  <h1>My slides</h1>
EOS

for f in $(find ./dist -name slide.html); do
    pathto=$(realpath $f --relative-to=./dist)
    title=$(dirname "$pathto")
    echo "    <li><a href=\"$pathto\">$title</a></li>"
done

cat << EOS
  </body>
</html>
EOS
