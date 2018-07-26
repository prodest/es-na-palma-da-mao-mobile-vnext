const fs = require( 'fs' );

const packageJson = require( './../package.json' );
const configPath = './config.xml';

const updateAndroidVersionCode = ( config ) => {
  const currentVersion = config.match( /android-versionCode="(\d*)"/ )[ 1 ];
  const newVersion = parseInt( currentVersion ) + 1;

  console.log( 'Current Android VersionCode' );
  console.log( currentVersion );
  console.log( 'New Android VersionCode' );
  console.log( newVersion );

  return config.replace( `android-versionCode="${currentVersion}"`, `android-versionCode="${newVersion}"` );
}

const updateCordovaVersionCode = ( version ) => {
  let config = fs.readFileSync( configPath ).toString();

  config = config.replace( /version="[0-9.-]*"/, `version="${version}"` );
  config = updateAndroidVersionCode( config );

  fs.writeFileSync( configPath, config );
}

updateCordovaVersionCode( packageJson.version );
