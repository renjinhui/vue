#!/bin/bash
copyjs=$1
branch=$2
commit=$3
desc=$4
distDir="/Users/liuxuewen/project/soeasy-static-files/www/js/bundle"
jsname="$1.js"
bundleDir="/Users/liuxuewen/project/soeasy-pc-static"
bundle="$bundleDir/dist/$jsname"

cd $distDir
git add .
git commit -m 'auto update: local save'
git fetch origin
git checkout $branch
git merge origin/$branch

cd $bundleDir
npm run build
gulp build
echo $distDir
echo $bundle
cp $bundle $distDir

cd $distDir
git add .
git commit -m "bundle commit->$jsname : $commit"
git push origin $branch