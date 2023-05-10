/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');

const localWebpack = require('../webpack.config.js');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    ...localWebpack,
    entry: [
        path.resolve(__dirname, 'assets/scripts/index.js'),
        path.resolve(__dirname, 'assets/styles/index.css')
    ],
    output: {
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
};
