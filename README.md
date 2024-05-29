# bc-web-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### taobao npm源
```
npm config set registry https://registry.npmmirror.com/

```

### npm打包
    1. 发包的时候，需要把npm源改为： https://registry.npmjs.org/   
    2. 发包之前需要修改package.json 中的version字段
    3. 发包命令如下：

```        
npm run build:lib

npm login

npm publish

```


### 问题
    1.打包的时候，提示 ：Cannot read properties of undefined (reading ‘styles‘) ，需要把vue-loader版本降到15   