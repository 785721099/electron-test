# electron-test
通过学习electron 做了个音效器

安装nconf模块，操作快捷键配置文件
npm install --save-dev nconf

打包源代码
asar pack 路径 app.asar


安装打包工具

npm install  -g asar


//  "packager": "electron-packager ./ 声效器 --platform=win32 --out out/ --version 1.4.13 --overwrite --icon=./app/img/app-icon.ico"
//  "packager": "electron-packager ./ 声效器 --all --out ./OutApp --version 1.4.13 --overwrite --icon=./app/img/app-icon.ico"


安装打包工具
npm install --save-dev electron-packager

将npm升级为最新
npm install npm@latest -g
修改镜像源
npm config set registry https://registry.npm.taobao.org
查看镜像源
npm config get registry