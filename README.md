# 打造属于自己的cnpm/npm安装，生成自定义项目架构

-------------------
### 一些废话（直接看代码的可跳过）
现在前端圈子框架繁多，不乏一些自主研发或合作开发的公司内部框架，模块/组件化、框架设计理念、架构分析、底层封装等去搭建高楼大厦的骨架，为的就是“维护、复用、二次开发、高效”等理念，浓缩就是两字**好用**（toulan）

公司内部研发的框架体系一般都会趋向于**图形化、可视化**，不过大多数都会做到最后一步，那就是模块化的选择了该结构，该样式（皮肤）然后想去一键生成这个项目的时候，啊？没这个功能，实现不了，npm/cnpm的一堆依赖结构不是我想要的！那这篇文章就是来解救你了，让我们来打造**属于自己的项目结构文件依赖**（是时候解放你的双手了）。


-------------------

### 技术实现

以下技术实现是基于js、node以及自带的fs模块

### 想要达到的目的

 1. 只用**一句命令行，一个文件**来搞定项目结构的创建
 2. 执行过程可视化，在cmd命令指示符中显示文件创建的进度
 ![loading](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4bf7fb171?w=518&h=195&f=png&s=13522)
 3. 需要有生成项目目录的树状图
![tree](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4c55cb363?w=247&h=189&f=png&s=3752)
 4. 项目结构任意化
 5. 代码可二次开发性

-------------------
### 需要的工具
- **node**
- **cmd（命令指示符）**

-------------------

## 打造一个极简的项目结构创建（试水篇）


### 步骤一：进入你想要一键生成的文件目录

1、win+r输入cmd回车
2、cd进入到该项目目录（想一建生成目录的地方）
3、node如何安装自行百度

-------------------

### 步骤二：创建server.js
打开你善用的编辑器直接复制以下代码
``` js
var fs = require("fs")

var mkDir = ['css', 'fonts', 'img', 'module']
/* 创建目录 */
for (var i = 0; i < mkDir.length; i++) {
  fs.mkdir(mkDir[i], function (err) {
    if (err) {
      return console.error(err);
    }
  })
}
```
ctrl+s保存，在cmd中输入
> node server

回头看一下你的项目结构吧。
如果不出意外的话，项目结构已经变成了这样

![tree](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4b763dd18?w=183&h=123&f=png&s=3166)


这里不得不佩服fs的强大，以下附上node fs API地址。

 http://nodejs.cn/api/fs.html
 
 -------------------

### 步骤三：还没完，还有读取文件以及生成文件

上面已经出现了我们想要的项目结构，不过这需求对我们来说还远远不足，我们还需要创建js文件以及html文件之类呢。
#### 1）在该目录下创建index.html
  里面写书写以下代码：
``` js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>

```
#### 2）server.js
``` js
var fs = require("fs")

/* 读取index.html文件创建indexx.html文件 */
fs.readFile('index.html', 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    fs.appendFile('indexx.html', data, 'utf8', function (err) {
      if (err) {
        return console.error(err);
      }
    });
});

```
cmd执行
>node server

回头看下项目目录，是否多了个indexx.html的文件，如果多了就说明成功了，以上的操作是读取了index.html内的所有文本内容，然后创建了indexx.html的超文本，当然对fs来说，只是修改了后缀名而已。
![这里写图片描述](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4b9202ce9?w=162&h=84&f=png&s=2996)


 -------------------

## 打造一个自定义并包含完善的Catalog、Tree、color、Path的项目结构（进阶篇）

  Tips：以下步骤会分步介绍各个阶段的执行过程（最下方含有完整的github项目地址）

### 解析一：构建server.js代码过程化



``` js
var _methods = {
  data: { /*数据存放位置*/
  now: 0, /*当前进程计数*/
  sum: 0, /*一共进程次数*/
  log: '' /*输出的tree*/
  },
  _nodeInit: function (mkDir) { /*初始化*/
    this._nodeSum(mkDir) /*先得出一共需要的执行次数，以便去判断异步回来的当前次数*/
    this._nodeFor(mkDir) /*进入下个流程 --- 创建*/
  },
  _nodeFor: function (mkDir) { /*创建*/
  /*这儿是执行目录结构创建的地方
    并且每次异步回调后执行
    this._nodeTree(++now)
    以便去显示当前创建进度*/
  },
  _nodeSum: function () { /*计算一共的创建次数*/
  /*为什么要先获取总共的创建次数，
  因为fs的函数创建是异步的，
  过程中很难判断全部异步是否已经完成
  并且tree的创建也是在这执行的
  输出给this.tree以及this.sum*/
  },
  _nodeTree: function () { /*当前进度判断*/
  /*如果当前进度===总进度时
  则执行之前就已经创建好了的
  去console.log(this.tree)出来*/
  }
}

var fs = require("fs") /*引入fs*/
var mkDir = [ /*项目结构树一览*/
  {
    name: 'csss', /*文件夹名称*/
    child: [
      {
        name: 'public.css', /*文件名称*/
        val: '' /*文件内容*/
      }, {
      name: 'asd',
      child: [
      {
        name: 'asd'
      }
    ]
      }
    ]
  }
]
_methods._nodeInit(mkDir)
```
#### 大致流程如上，这儿有一些技术栈：

  1、_nodeSum: 多线程异步的情况下，没能很好得知是否全部执行完成，所以采用了该方式(定时器不可取)

  2、_nodeTree: 树结构console.log并不是很完美
 -------------------

### 解析二：_nodeFor：无限子节点异步回调创建目录结构（核心代码）

```
_nodeFor: function (mkDir, path) {
    var self = this
    for (var i = 0; i < mkDir.length; i++) {
      var name = mkDir[i].name
      var child = mkDir[i].child
      var path_block = path ? (path + '/' + name) : name 
      if (name.lastIndexOf('.') === -1) { /*判断文件or文件夹 --- 文件夹*/
        (function (path, child, name) { /*防止异步回调后变量被污染*/
          fs.mkdir(path, function (err) {
            if (err) {
              return console.error(err)
            }
            self._nodeTree(++self.data.now, path, name) /*加载loading*/
            if (child) {
              self._nodeFor(child, path) /*递归*/
            }
          })
        })(path_block, child, name)
      } else { /*文件*/
        (function (path, val, name) {
          fs.appendFile(path_block, val ? val : '', 'utf8', function (err) {
            if (err) {
              return console.error(err)
            }
            self._nodeTree(++self.data.now, path, name) /*加载loading*/
          })
        })(path_block, mkDir[i].val, name)
      }
    }
  }
```

#### 技术栈：
这段代码并不是很难理解，但调试起来确实是费劲，毕竟含有递归+异步的40行复杂代码谁也不能保证一次就能写成功，在node下，无论是debugger还是console.log()在cmd中调试都很难受，这儿推荐个强大的node-debug调试环境，让你在喜欢的**谷歌下调试**

#### 技术学习or推荐

  node-inspector

调试工具（基于npm安装）：**node-inspector**

执行流程：

1、安装 node-inspector

>npm install node-inspector -g

2、监听端口（执行）

>node-inspector

![run](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4be982a2f?w=476&h=72&f=png&s=6479)

3、cmd到你的目录下执行node debug模式

>node --debug-brk server.js

![run](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4b51fbaa7?w=373&h=54&f=png&s=5926)

4、打开谷歌浏览器，在地址栏输入以上显示的地址：http://127.0.0.1:8080/debug?port=5858 就可以进行调试了，成功后会到以下页面，按F8即可执行到你打断点处，如果没打则直接结束。（如果不行请刷新下）

![Debug](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4c0e6ed3c?w=873&h=734&f=png&s=146716)

 -------------------

### 解析三：_nodeSum：计算总执行次数

```
    console.log('\x1B[90m' + 'Downloading Current JS to ' + __dirname + '\x1B[39m')
    var self = this
    function count (mkDir, j) { /*i为次数, j为层级*/
      for (var i = 0; i < mkDir.length; i++) {
        (function (mkDir, i, j) {
          var log = log_j(j)
          var name = mkDir[i].name.lastIndexOf('.') === -1 ? mkDir[i].name : ('\x1B[90m' + mkDir[i].name + '\x1B[39m')
          self.data.log += log + '--' + name + '\n'
          if (mkDir[i].child) {
            count(mkDir[i].child, ++j)
          }
          self.data.sum++
        })(mkDir, i, j ? j : 0)
      }
    }
    function log_j (val) {
      var log = ''
      if (val === 0) return '|'
      for (var i = 0; i < val; i++) {
        log += '　' + '|'
      }
      return '|' + log
    }
    count(arr)
    console.log('\x1B[90m' + 'Altogether contains ' + this.data.sum + 'second Execution process' + '\x1B[90m')
```
#### 简述：

这儿是在异步执行_nodeFor之前就先预解析完了树结构以及总共的执行次数，因为是同步递归思想，只要注意作用域以及避免变量污染即可。

#### 技术栈：
那就是之前提过的，没有一个好的方法可以监听到多线程异步的回调是否全部执行完成，如果有的话请在下方评论并且没有很好看的输出树结构，仍然有些瑕疵。

#### 技术学习or推荐

  让你的console.log色彩缤纷

这儿有两种，一种是node上的写法，一种是平常网页调试的写法（两者不同）

1、node写法

  console.log('\x1B[90m' + 'Hello, Do you think my color has changed?'  + '\x1B[39m')

```
/* 颜色参考值 */

'bold'          : ['\x1B[1m',  '\x1B[22m'],  

'italic'        : ['\x1B[3m',  '\x1B[23m'],  

'underline'     : ['\x1B[4m',  '\x1B[24m'],  

'inverse'       : ['\x1B[7m',  '\x1B[27m'],  

'strikethrough' : ['\x1B[9m',  '\x1B[29m'],  

'white'         : ['\x1B[37m', '\x1B[39m'],  

'grey'          : ['\x1B[90m', '\x1B[39m'],  

'black'         : ['\x1B[30m', '\x1B[39m'],  

'blue'          : ['\x1B[34m', '\x1B[39m'],  

'cyan'          : ['\x1B[36m', '\x1B[39m'],  

'green'         : ['\x1B[32m', '\x1B[39m'],  

'magenta'       : ['\x1B[35m', '\x1B[39m'],  

'red'           : ['\x1B[31m', '\x1B[39m'],  

'yellow'        : ['\x1B[33m', '\x1B[39m'],  

'whiteBG'       : ['\x1B[47m', '\x1B[49m'],  

'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],  

'blackBG'       : ['\x1B[40m', '\x1B[49m'],  

'blueBG'        : ['\x1B[44m', '\x1B[49m'],  

'cyanBG'        : ['\x1B[46m', '\x1B[49m'],  

'greenBG'       : ['\x1B[42m', '\x1B[49m'],  

'magentaBG'     : ['\x1B[45m', '\x1B[49m'],  

'redBG'         : ['\x1B[41m', '\x1B[49m'],  

'yellowBG'      : ['\x1B[43m', '\x1B[49m']  
```

2、Web端调试写法

  console.log("%cHello, Do you think my color has changed?", "color: green")

这个一看就懂了。

 -------------------


### 解析四：_nodeTree：当前值与sum的比较输出打造犹如cnpm的实时进度

```
  _nodeTree: function (now, path, name) { /*异步过程界面化*/
    console.log('[' + now + '/' + this.data.sum + ']\x1B[90m ' + name + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m' + 'at ' + path)
    if (now === this.data.sum) { /*当当前进度 === sum时*/
      console.log('\x1B[32m' + 'All package installed ' + this.data.sum + ' project installed from ' + __dirname + '\x1B[39m')
      console.log('\x1B[35m' + 'Project catalogue:' + '\x1B[39m')
      console.log(this.data.log + '------------------------------------')
      console.log(",'''╭⌒╮⌒╮.',''',,',.'',,','',.\n" +
      " ╱◥██◣''o',''',,',.''.'',,',.\n" +
      "｜田｜田田│ '',,',.',''',,',.''\n" +
      "╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬" + '\n------------------------------------')
      console.log('\x1B[35m' + 'MAKE：o︻そ╆OVE▅▅▅▆▇◤\nBLOG：http://blog.csdn.net/mcky_love\nGITHUB：https://github.com/gs3170981' + '\x1B[39m')
    }
  }
```

#### 简述：

  这儿执行的就是实时显示当前进度以及全部执行完成后的tree与我个人的信息(#^.^#)

实时当前进度：
![loading](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4bdc355cf?w=668&h=455&f=png&s=57706)

结束后的tree
![tree](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4b91ec2af?w=677&h=458&f=png&s=59661)

与个人信息
![info](https://user-gold-cdn.xitu.io/2017/12/7/1602eea4faacc3ed?w=677&h=458&f=png&s=58942)

 -------------------

### 解析五：mkDir：调参的数组写法

```
/*------------------------注意事项------------------------
1、文件夹名称不可相同、文件名称相同的情况下后缀名不可相同
2、文件夹内方可创建child子项目目录，文件下创建child对象不执行
3、文件夹名称不可包含'.'字符
----------------------------END--------------------------*/

var mkDir = [
  {
    name: 'csss',
    child: [
      {
        name: 'public.css',
        val: 'body{font-size: 12px;}'
      }, {
        name: 'publicccc',
        child: [
          {
            name: 'asd'
          }
        ]
      }
    ]
  }, {
    // ......
  }
]
```

#### 简述：
  
通俗易懂的格式，不过如注意事项所说，这儿并没有对‘.’下创建文件夹与不执行的地方进行try提示，需要的朋友可自行git修改。

 -------------------
 
## 一个完整的DEMO

github：https://github.com/gs3170981/cnpmDIY（好用的话记得加星哦！）


-------------------

## 关于

make：o︻そ╆OVE▅▅▅▆▇◤（清一色天空）

blog：http://blog.csdn.net/mcky_love

-------------------


## 结束语


自定义项目结构与自定义的框架完美契合，适用于可视化开发，模块化合作开发，单人项目开发，多人维护等，这儿就不科普具体用处了，**fs帮我们解决了大多数问题，剩下的用途仅限制于你的脑洞！**