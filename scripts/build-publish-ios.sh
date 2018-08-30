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

# copy xcode project and entitlement files already with configurations
cp fastlane/ios-static/project.pbxproj 'platforms/ios/ES na Palma da Mao.xcodeproj/.'
cp 'fastlane/ios-static/ES na Palma da Mao.entitlements' 'platforms/ios/ES na Palma da Mao.xcworkspace/.'

# Compile application, using ios configuration, beta lane
npm run publish:ios # DELIVER_ITMSTRANSPORTER_ADDITIONAL_UPLOAD_PARAMETERS="-t DAV" fastlane ios beta
