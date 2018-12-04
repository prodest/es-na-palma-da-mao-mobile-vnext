const config = require('@ionic/app-scripts/config/copy.config')

// https://medium.com/@pliniopjn/como-usar-o-font-awesome-no-ionic-3-x-em-5-passos-simples-a97f82bee171
config.copyFonts.src = [...config.copyFonts.src, '{{ROOT}}/node_modules/font-awesome/fonts/**/*']

// ref: https://julienrenaux.fr/2017/07/20/optimized-ionic-angular-css-bundle-for-pwas/
module.exports = config