const config = require('@ionic/app-scripts/config/sass.config')

config.excludeFiles = [ /\.(wp).(scss)$/i ]

config.includePaths = [...config.includePaths, 'node_modules/font-awesome/scss']

// ref: https://julienrenaux.fr/2017/07/20/optimized-ionic-angular-css-bundle-for-pwas/
module.exports = config