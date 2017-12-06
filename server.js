var _methods = {
  data: {
    now: 0,
    sum: 0,
    log: ''
  },
  _nodeInit: function (mkDir) { /*初始化*/
    this._nodeSum(mkDir)
    this._nodeFor(mkDir)
  },
  _nodeFor: function (mkDir, path) { /*无限子节点异步回调创建目录结构*/
    var self = this
    for (var i = 0; i < mkDir.length; i++) {
      var name = mkDir[i].name
      var child = mkDir[i].child
      var path_block = path ? (path + '/' + name) : name /*这里不可path = do something... 会受异步传参path的污染 --- (踩坑★)*/
      if (name.lastIndexOf('.') === -1) { /*判断文件or文件夹 --- 文件夹*/
        (function (path, child, name) { /*匿名函数封装防止异步回调后变量被污染  --- (踩坑★★★★)*/
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
  },
  _nodeSum: function (arr) { /*计算总执行次数*/
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
  },
  _nodeTree: function (now, path, name) { /*异步过程界面化*/

//  path = path.split('/')
    console.log('[' + now + '/' + this.data.sum + ']\x1B[90m ' + name + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m' + 'at ' + path)
    if (now === this.data.sum) {
      console.log('\x1B[32m' + 'All package installed ' + this.data.sum + ' project installed from ' + __dirname + '\x1B[39m')
      console.log('\x1B[35m' + 'Project catalogue:' + '\x1B[39m')
      console.log(this.data.log + '------------------------------------')
      console.log(",'''╭⌒╮⌒╮.',''',,',.'',,','',.\n" +
      " ╱◥██◣''o',''',,',.''.'',,',.\n" +
      "｜田｜田田│ '',,',.',''',,',.''\n" +
      "╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬" + '\n------------------------------------')
      console.log('\x1B[35m' + 'MAKE：o︻そ╆OVE▅▅▅▆▇◤　BLOG：http://blog.csdn.net/mcky_love' + '\x1B[39m')
    }
//  console.log(path[path.length - 1])
//  for (var i = 0; i < path.length; i++) {
////    console.log('|' + '\n' + '|' + '\n')
//    var line = ''
//    for (var j = 0; j < i * 2; j++) {
//      line += '-'
//    }
//    console.log(line + path[path.length - 1])
//  }
  }
}




//var express = require('express');
//var app = express();
var fs = require("fs")
var mkDir = ['css', 'fonts', 'img', 'module']


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
        val: 'body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;font-family:"微软雅黑"}h1,h2,h3,h4,h5,h6{font-size:100%}address,cite,dfn,em,var{font-style:normal}code,kbd,pre,samp{font-family:couriernew,courier,monospace}small{font-size:12px}ul,ol{list-style:none}a{text-decoration:none}sup{vertical-align:text-top}sub{vertical-align:text-bottom}legend{color:#000}fieldset,img{border:0}button,input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}html,body{height:100%;overflow:hidden;line-height:.24rem}'
      }, {
        name: 'publicccc',
        child: [
          {
            name: 'asd'
          }
        ]
      }, {
        name: 'logiccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }, {
    name: 'csssssssQQQ',
    child: [
      {
        name: 'public.css',
        val: 'body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;font-family:"微软雅黑"}h1,h2,h3,h4,h5,h6{font-size:100%}address,cite,dfn,em,var{font-style:normal}code,kbd,pre,samp{font-family:couriernew,courier,monospace}small{font-size:12px}ul,ol{list-style:none}a{text-decoration:none}sup{vertical-align:text-top}sub{vertical-align:text-bottom}legend{color:#000}fieldset,img{border:0}button,input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}html,body{height:100%;overflow:hidden;line-height:.24rem}'
      }, {
        name: 'publicccc',
        child: [
          {
            name: 'asd'
          }
        ]
      }, {
        name: 'logiccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }, {
    name: 'csssssss',
    child: [
      {
        name: 'public.css',
        val: 'body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;font-family:"微软雅黑"}h1,h2,h3,h4,h5,h6{font-size:100%}address,cite,dfn,em,var{font-style:normal}code,kbd,pre,samp{font-family:couriernew,courier,monospace}small{font-size:12px}ul,ol{list-style:none}a{text-decoration:none}sup{vertical-align:text-top}sub{vertical-align:text-bottom}legend{color:#000}fieldset,img{border:0}button,input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}html,body{height:100%;overflow:hidden;line-height:.24rem}'
      }, {
        name: 'publicccc',
        child: [
          {
            name: 'asd'
          }
        ]
      }, {
        name: 'logiccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'logicccccc',
        child: [
          {
            name: 'asdwww'
          }, {
            name: 'asdddd.css'
          }, {
            name: 'asdddddd'
          }, {
            name: 'asdddddddd',
            child: [
              {
                name: 'asdasdasdasd'
              }, {
                name: 'asdasdasdasdqq',
                child: [
                  {
                    name: 'qqqqq.html'
                  }, {
                    name: 'ppppp.html'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
//app.get('/', function (req, res) {
//res.sendFile(__dirname + '/index.html');
//});
//var server = app.listen(3000, function () {
//var host = server.address().address;
//var port = server.address().port;
//console.log('Example app listening at http://%s:%s \n', host, port);
//});
_methods._nodeInit(mkDir)