// NOTE: material-uiのバンドルサイズ最適化
// 参照: https://material-ui.com/guides/minimizing-bundle-size/
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
