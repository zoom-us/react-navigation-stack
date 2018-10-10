/* eslint-disable import/no-commonjs */

const path = require('path');
const glob = require('glob-to-regexp');
const blacklist = require('metro-config/src/defaults/blacklist');
const pak = require('../package.json');
const pak2 = require('./package.json');

const dependencies = Object.keys(pak.dependencies);
const localDependencies = Object.keys(pak2.dependencies);
const peerDependencies = Object.keys(pak.peerDependencies);

module.exports = {
  resolver: {
    blacklistRE: blacklist([glob(`${path.resolve(__dirname, '..')}/node_modules/*`)]),
    // providesModuleNodeModules: ['react-native', 'react', 'fbjs', 'react-native-vector-icons'],
    providesModuleNodeModules: [...dependencies, ...localDependencies, ...peerDependencies],
  },
  watchFolders: [__dirname, path.resolve(__dirname, '..')],
};
