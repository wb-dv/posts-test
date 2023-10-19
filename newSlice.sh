#!/bin/bash
echo 'layer?'
select layer in app pages widgets features entities shared
do
  break
done

echo 'name of slice?'
read slice

cd ./src/$layer
mkdir $slice

cd ./$slice

mkdir ui

echo '' > 'index.ts'
echo '' > 'model.ts'
# echo '' > 'api.ts'


# fill ui dir
cd ./ui
echo '' > 'index.ts'