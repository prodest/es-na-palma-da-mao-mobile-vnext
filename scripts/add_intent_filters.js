#!/usr/bin/env node

var parser = require('xml2json');
var format = require('xml-formatter');
var fs = require('fs');

// check if exists android platform path
var hasAndroid = fs.existsSync('./platforms') &&
  fs.existsSync('./platforms/android');

if (hasAndroid) {
  var manifestPath = './platforms/android/app/src/main/AndroidManifest.xml';
  var manifest = fs.readFileSync(manifestPath);
  var jsonManifest = parser.toJson(manifest, { object: true });

  // add intent in "MainActivity"
  // this intent is to add ESPM to the android share list
  jsonManifest.manifest.application.activity[0]["intent-filter"].push({
    "action": {
      "android:name": "android.intent.action.SEND"
    },
    "category": {
      "android:name": "android.intent.category.DEFAULT"
    },
    "data": {
      "android:mimeType": "application/pdf"
    }
  });

  fs.writeFileSync(manifestPath, format(parser.toXml(jsonManifest)));

}
