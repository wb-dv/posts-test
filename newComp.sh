#!/bin/bash
echo 'layer?'
echo ''
select layer in app pages widgets features entities
do
  break
done

cd ./src/$layer

echo ''
echo 'slice?'
echo ''
slices=$(ls -d */)
select slice in $slices
do
  break
done

echo 'name of component?'
read component_name

# get and format templates
cd ../templates/component
tmpForReplace='COMPONENT_NAME'
tsx=$(sed "s/$tmpForReplace/$component_name/" $tmpForReplace.tsx)
scss=$(sed "s/$tmpForReplace/$component_name/" $tmpForReplace.module.scss)

# copy to target dir
cd ../../../src/$layer/$slice'ui'

mkdir $component_name

cd ./$component_name
echo $tsx > "$component_name.tsx"
echo $scss > "$component_name.module.scss"