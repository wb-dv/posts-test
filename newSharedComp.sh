#!/bin/bash

echo 'name of component?'
read component_name

# get and format templates
cd ./src/templates/component
tmpForReplace='COMPONENT_NAME'
tsx=$(sed "s/$tmpForReplace/$component_name/" $tmpForReplace.tsx)
scss=$(sed "s/$tmpForReplace/$component_name/" $tmpForReplace.module.scss)

# copy to target dir
cd ../../shared/ui

mkdir $component_name

cd ./$component_name
echo $tsx > "$component_name.tsx"
echo $scss > "$component_name.module.scss"