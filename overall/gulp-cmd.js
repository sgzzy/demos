/*
/!**
 * Created by Administrator on 2016/11/22.
 *!/
Hash(stat): return "stat.size.toString(16)-stat.mtime.getTime().toString(16)";
Async.Iterator(array).next(): return {this.index >= this.array.length, !done? this.array[this.index++]: undefined};
Async.series(array,iterator,done,context): do if(arguments.length>=4)iterator.bind(context) done.bind(context)
if(Iterator(array).next().done) done(); else  iterator(Iterator(array).next().value,callbackself);
Cache.set(vinyl): do caches[vinyl.path] = vinyl;
Cache.get(vinyl): if(caches[vinyl.path] && caches[vinyl.path].hash === vinyl.hash) return cached  else return null
Cache.clean(path): do if参数存在 delete caches[path]; else caches = {};

Util.parsePackage(vinyl,wwwroot): return {name: match[0] || '',(文件目录名)
version: match[1]||''(文件版本号),file: match[2] ? match[2] + '/' + filename: filename(文件名)}
Util.template(format,data): return format.replace("{{a}}/gi", data[a] || '');
Util.parseAlias(id,alias): return is.string(alias[id]) ? alias[id] : id;
Util.parsePaths(id,paths): do id = paths[match[1]] + match[2](当两者都存在时)；return id;
Util.parseVars(id,vars):  do id = id.replace(/{([^{]+)}/g,vars[key] || match)(若id中存在{)
return id;
Util.parseMap(id,map): return ret ; ret必须为string 且为第一个不为id的结果。
ret = rule(id)||ret = id.replace(rule[0],rule[1]) rule = map[i]
Util.normalize(path): return path //规范化path
Util.resolve(relative, vinyl, wwwroot) : return absolute; 若vinyl是相对于wwwroot的，则使用vinyl的base，否则用wwwroot。
Util.addExt(path): 返回有后缀名的path
Util.hideExt(path): 返回无后缀名的path
Util.isRelative(path); Util.isAbsolute(path); Util.isLocal(path)
Util.isOutBoune(path,base); 判断path是不是包含在base的目录中
Util.pathFromCwd(path): 返回基于cwd的相对路径
Util.throwError(): plugin error
Util.wrapModule(id,deps,code): return template(header, {id: id, deps: deps}) + '\n' + code + '\n' + footer; 将所写模块转化为模块的规范写法返回
Util.print(): 输出message
Util.readonlyProperty(object,prop,value):定义一个只读属性

Rename.rename(path, transform)//return path;*/
