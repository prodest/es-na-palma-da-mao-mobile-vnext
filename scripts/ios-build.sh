# update npm packages
npm i

# ionic build
npm run build:prod:ios

# adiciona platform ios caso diretorio platforms/ios não exista
[ ! -d "platforms/ios" ] && cordova platform add ios

# pod install
cd platforms/ios
pod install
cd ../..

# cordova build
cordova build ios --buildConfig=ios-build.json --release --device
