#!/usr/bin/env bash

set -ue

curl https://raw.githubusercontent.com/Omochice/marp-extended-default-theme/release/extended-default.css --output ./theme.css

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

files=$(ls -- **/slide.md)
npx marp $files --theme theme.css --allow-local-files true --html true

for f in $files; do
    title=$(dirname "$f")
    echo "    <li><a href=\"$f\">$title</a></li>"
done

cat << EOS
  </body>
</html>
EOS
