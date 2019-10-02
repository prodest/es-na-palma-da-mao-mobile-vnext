# https://forum.ionicframework.com/t/barcodescanner-facebook4-plugins-not-compatible/127680/3

targetFile=./platforms/android/phonegap-plugin-barcodescanner/espm-barcodescanner.gradle

echo '' >> $targetFile
echo 'configurations {' >> $targetFile
echo "    compile.exclude group: 'com.google.zxing'" >> $targetFile
echo '}' >> $targetFile
