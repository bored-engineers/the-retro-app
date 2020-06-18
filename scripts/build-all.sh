yarn lerna run build &&
rm -rf dist &&
cp -r packages/services/dist dist &&
cp -r packages/webapp/dist dist/public