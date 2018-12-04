module.exports = {
    'globDirectory': './www/',
    'globPatterns': [
        'index.html',
        'manifest.json',
        '**/*.js',
        '**/*.css',
        '**/*.{ttf,woff,woff2}',
        '**/*.{jpg,png,gif}'
    ],
    'swDest': 'www/service-worker.js',
    'clientsClaim': true,
    'skipWaiting': true
};