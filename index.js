/*
 * @Author: dyxuan
 * @Date: 2020-03-17 11:41:06
 * @LastEditTime: 2020-03-17 11:41:45
 * @LastEditors: dyxuan
 */
let loaderUtils = require('loader-utils')
const fs = require('fs');

function getHDFile(src) {
    try {
        if(!src) return src;
        let [, dir, file, ext] = src.match(/(.+\/)(.+?)\.(.+)$/);
        let filelist = fs.readdirSync(dir), target = `${file}.${ext}`;
        let reg = new RegExp(`${file}@(\\d?)[xX]\\.${ext}`)
        filelist.forEach((file, i)=>{
            reg.test(file)&&(target = file)
        })
        return `${dir}${target}`
    } catch (error) {
        throw new Error(`hrpng-loader error:${error}`)
    }

}


module.exports = function (source, map){
    try {
        this.cacheable && this.cacheable();
        const options = loaderUtils.getOptions(this);
        console.log(options)
        if(options.hr) {
            let src = getHDFile(this.resourcePath);
            if(this.resourcePath != src) {
                source = fs.readFileSync(src)
            }
        }
        this.callback(null, source, map);
    } catch (error) {
        this.callback(error);
    }
};
