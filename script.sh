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

# files=$(ls -- **/slide.html)
# npx marp $files --theme theme.css --allow-local-files true --html true

for f in $(find ./slides/ -name slide.html); do
    title=$(basename -- $(dirname "$f"))
    echo "    <li><a href=\"$f\">$title</a></li>"
done

cat << EOS
  </body>
</html>
EOS
