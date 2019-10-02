
targetFile=./platforms/android/phonegap-plugin-barcodescanner/espm-barcodescanner.gradle

echo '' >> $targetFile
echo 'configurations {' >> $targetFile
echo "    compile.exclude group: 'com.google.zxing'" >> $targetFile
echo '}' >> $targetFile
