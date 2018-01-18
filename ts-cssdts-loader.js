const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const beforeNamePattern = 'import\\s+.*\\s+from\\s+[\'"]';
const importPattern = '[^\'"]*\\.css[\'"]';

const importRegex = new RegExp(`${beforeNamePattern}${importPattern}`, 'ig');
const replaceRegex = new RegExp(`${beforeNamePattern}\|['"]`, 'ig');
const replaceExtRegex = /\.css/gi;

module.exports = function(source) {

    const matches = source.match(importRegex);
    if (matches) {
        matches.forEach(str => {
            const dirname = path.dirname(this.resourcePath);
            const styleFilename = str.replace(replaceRegex, '');
            const styleName = styleFilename.replace(replaceExtRegex, '');
            const filepath = path.join(dirname, `${styleName}.css.d.ts`);
            if (!fs.existsSync(filepath)) {
                fs.writeFileSync(filepath, 'export const d: any;\nexport default d;');
            }
            
            console.log('style name', styleName);
        });
    }

    return source;

};
