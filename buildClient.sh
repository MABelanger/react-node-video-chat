CURREND_DIR=$(pwd)

# build main module
cd $CURREND_DIR
cd react/packages/main
yarn build
echo 'build main module done...'
