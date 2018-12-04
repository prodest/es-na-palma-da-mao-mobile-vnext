const { google } = require('googleapis');
const androidpublisher = google.androidpublisher('v2');
const fs = require('fs');

const key = require('./../espm-ci-41e8b3c55e9a.json');

const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/androidpublisher']
});

let currentEdit = undefined;
let apkPath = undefined;
let track = undefined;
let packageName = undefined;
let newVersionCode = undefined;

const saveEditInfo = (response) => {
    console.log('Save APK Info');

    currentEdit = response.data;

    console.log(currentEdit);
    return currentEdit;
}

const uploadApk = (edit) => {
    console.log('Upload APK');

    const apk = fs.readFileSync(apkPath);

    return androidpublisher.edits.apks
        .upload({
            editId: currentEdit.id,
            packageName: packageName,
            media: {
                mimeType: 'application/vnd.android.package-archive',
                body: apk
            },
            auth: jwtClient
        });
};

const updateTrack = (response) => {
    console.log(response.data);
    console.log('Update Track');

    newVersionCode = response.data.versionCode;

    return androidpublisher.edits.tracks
        .update({
            editId: currentEdit.id,
            packageName: packageName,
            track: track,
            resource: {
                track: track,
                versionCodes: [newVersionCode],
            },
            auth: jwtClient
        });
}

const updateApkListing = (response) => {
    console.log(response.data);
    console.log('Update APK Listing');

    return androidpublisher.edits.apklistings
        .update({
            apkVersionCode: newVersionCode,
            editId: currentEdit.id,
            packageName: packageName,
            language: 'pt-BR',
            resource: {
                language: 'pt-BR',
                recentChanges: 'Recent changes API auto',
            },
            auth: jwtClient
        });
}

const commit = (response) => {
    console.log(response.data);
    console.log('Commit');

    return androidpublisher.edits
        .commit({
            editId: currentEdit.id,
            packageName: packageName,
            auth: jwtClient
        });
};

const main = (arg1, arg2, arg3) => {
    console.log('Upload APK Script Start with parameters:');
    console.log({ arg1, arg2, arg3 });
    apkPath = arg1;
    track = arg2;
    packageName = arg3;

    // './beebee-dev-debug-v1.0.0-5.apk'
    const edit = androidpublisher.edits
        .insert({
            packageName: packageName,
            auth: jwtClient
        })
        .then(saveEditInfo)
        .then(uploadApk)
        .then(updateTrack)
        .then(updateApkListing)
        .then(commit)
        .then(response => console.log(response.data))
        .catch(error => {
            console.log(error);
            process.exit(1);
        });
};

if (process.argv.length != 5) {
    console.log('Parameter count invalid');
    process.exit(1);
}

main(process.argv[2], process.argv[3], process.argv[4]);
