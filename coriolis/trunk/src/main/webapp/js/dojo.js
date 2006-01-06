/*
	Copyright (c) 2004-2005, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

var dj_global=this;
function dj_undef(_1,_2){
if(!_2){
_2=dj_global;
}
return (typeof _2[_1]=="undefined");
}
if(dj_undef("djConfig")){
var djConfig={};
}
var dojo;
if(dj_undef("dojo")){
dojo={};
}
dojo.version={major:0,minor:2,patch:1,flag:"",revision:Number("$Rev: 2555 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalObjPath=function(_3,_4){
if(typeof _3!="string"){
return dj_global;
}
if(_3.indexOf(".")==-1){
if((dj_undef(_3,dj_global))&&(_4)){
dj_global[_3]={};
}
return dj_global[_3];
}
var _5=_3.split(/\./);
var _6=dj_global;
for(var i=0;i<_5.length;++i){
if(!_4){
_6=_6[_5[i]];
if((typeof _6=="undefined")||(!_6)){
return _6;
}
}else{
if(dj_undef(_5[i],_6)){
_6[_5[i]]={};
}
_6=_6[_5[i]];
}
}
return _6;
};
dojo.errorToString=function(_8){
return ((!dj_undef("message",_8))?_8.message:(dj_undef("description",_8)?_8:_8.description));
};
dojo.raise=function(_9,_a){
if(_a){
_9=_9+": "+dojo.errorToString(_a);
}
var he=dojo.hostenv;
if((!dj_undef("hostenv",dojo))&&(!dj_undef("println",dojo.hostenv))){
dojo.hostenv.println("FATAL: "+_9);
}
throw Error(_9);
};
dj_throw=dj_rethrow=function(m,e){
dojo.deprecated("dj_throw and dj_rethrow deprecated, use dojo.raise instead");
dojo.raise(m,e);
};
dojo.debug=function(){
if(!djConfig.isDebug){
return;
}
var _e=arguments;
if(dj_undef("println",dojo.hostenv)){
dojo.raise("dojo.debug not available (yet?)");
}
var _f=dj_global["jum"]&&!dj_global["jum"].isBrowser;
var s=[(_f?"":"DEBUG: ")];
for(var i=0;i<_e.length;++i){
if(!false&&_e[i] instanceof Error){
var msg="["+_e[i].name+": "+dojo.errorToString(_e[i])+(_e[i].fileName?", file: "+_e[i].fileName:"")+(_e[i].lineNumber?", line: "+_e[i].lineNumber:"")+"]";
}else{
try{
var msg=String(_e[i]);
}
catch(e){
if(dojo.render.html.ie){
var msg="[ActiveXObject]";
}else{
var msg="[unknown]";
}
}
}
s.push(msg);
}
if(_f){
jum.debug(s.join(" "));
}else{
dojo.hostenv.println(s.join(" "));
}
};
dojo.debugShallow=function(obj){
if(!djConfig.isDebug){
return;
}
dojo.debug("------------------------------------------------------------");
dojo.debug("Object: "+obj);
for(i in obj){
dojo.debug(i+": "+obj[i]);
}
dojo.debug("------------------------------------------------------------");
};
var dj_debug=dojo.debug;
function dj_eval(s){
return dj_global.eval?dj_global.eval(s):eval(s);
}
dj_unimplemented=dojo.unimplemented=function(_15,_16){
var _17="'"+_15+"' not implemented";
if((!dj_undef(_16))&&(_16)){
_17+=" "+_16;
}
dojo.raise(_17);
};
dj_deprecated=dojo.deprecated=function(_18,_19,_1a){
var _1b="DEPRECATED: "+_18;
if(_19){
_1b+=" "+_19;
}
if(_1a){
_1b+=" -- will be removed in version: "+_1a;
}
dojo.debug(_1b);
};
dojo.inherits=function(_1c,_1d){
if(typeof _1d!="function"){
dojo.raise("superclass: "+_1d+" borken");
}
_1c.prototype=new _1d();
_1c.prototype.constructor=_1c;
_1c.superclass=_1d.prototype;
_1c["super"]=_1d.prototype;
};
dj_inherits=function(_1e,_1f){
dojo.deprecated("dj_inherits deprecated, use dojo.inherits instead");
dojo.inherits(_1e,_1f);
};
dojo.render=(function(){
function vscaffold(_20,_21){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_20};
for(var x in _21){
tmp[x]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _24={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_24;
}else{
for(var _25 in _24){
if(typeof djConfig[_25]=="undefined"){
djConfig[_25]=_24[_25];
}
}
}
var djc=djConfig;
function _def(obj,_28,def){
return (dj_undef(_28,obj)?def:obj[_28]);
}
return {name_:"(unset)",version_:"(unset)",pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_2a,_2b){
this.modulePrefixes_[_2a]={name:_2a,value:_2b};
},getModulePrefix:function(_2c){
var mp=this.modulePrefixes_;
if((mp[_2c])&&(mp[_2c]["name"])){
return mp[_2c].value;
}
return _2c;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
},getLibraryScriptUri:function(){
dojo.unimplemented("getLibraryScriptUri","");
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _30=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
dojo.hostenv.setBaseScriptUri=function(uri){
djConfig.baseScriptUri=uri;
};
dojo.hostenv.loadPath=function(_32,_33,cb){
if((_32.charAt(0)=="/")||(_32.match(/^\w+:/))){
dojo.raise("relpath '"+_32+"'; must be relative");
}
var uri=this.getBaseScriptUri()+_32;
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+djConfig.cacheBust.replace(/\W+/g,"");
}
try{
return ((!_33)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_33,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(dojo.hostenv.loadedUris[uri]){
return;
}
var _38=this.getText(uri,null,true);
if(_38==null){
return 0;
}
var _39=dj_eval(_38);
return 1;
};
dojo.hostenv.loadUriAndCheck=function(uri,_3b,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return ((ok)&&(this.findModule(_3b,false)))?true:false;
};
dojo.loaded=function(){
};
dojo.hostenv.loaded=function(){
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
dojo.loaded();
};
dojo.addOnLoad=function(obj,_41){
if(arguments.length==1){
dojo.hostenv.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dojo.hostenv.modulesLoadedListeners.push(function(){
obj[_41]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
}
};
dojo.hostenv.moduleLoaded=function(_42){
var _43=dojo.evalObjPath((_42.split(".").slice(0,-1)).join("."));
this.loaded_modules_[(new String(_42)).toLowerCase()]=_43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_44,_45,_46){
_46=this._global_omit_module_check||_46;
var _47=this.findModule(_44,false);
if(_47){
return _47;
}
if(dj_undef(_44,this.loading_modules_)){
this.addedToLoadingCount.push(_44);
}
this.loading_modules_[_44]=1;
var _48=_44.replace(/\./g,"/")+".js";
var _49=_44.split(".");
var _4a=_44.split(".");
for(var i=_49.length-1;i>0;i--){
var _4c=_49.slice(0,i).join(".");
var _4d=this.getModulePrefix(_4c);
if(_4d!=_4c){
_49.splice(0,i,_4d);
break;
}
}
var _4e=_49[_49.length-1];
if(_4e=="*"){
_44=(_4a.slice(0,-1)).join(".");
while(_49.length){
_49.pop();
_49.push(this.pkgFileName);
_48=_49.join("/")+".js";
if(_48.charAt(0)=="/"){
_48=_48.slice(1);
}
ok=this.loadPath(_48,((!_46)?_44:null));
if(ok){
break;
}
_49.pop();
}
}else{
_48=_49.join("/")+".js";
_44=_4a.join(".");
var ok=this.loadPath(_48,((!_46)?_44:null));
if((!ok)&&(!_45)){
_49.pop();
while(_49.length){
_48=_49.join("/")+".js";
ok=this.loadPath(_48,((!_46)?_44:null));
if(ok){
break;
}
_49.pop();
_48=_49.join("/")+"/"+this.pkgFileName+".js";
if(_48.charAt(0)=="/"){
_48=_48.slice(1);
}
ok=this.loadPath(_48,((!_46)?_44:null));
if(ok){
break;
}
}
}
if((!ok)&&(!_46)){
dojo.raise("Could not load '"+_44+"'; last tried '"+_48+"'");
}
}
if(!_46){
_47=this.findModule(_44,false);
if(!_47){
dojo.raise("symbol '"+_44+"' is not defined after loading '"+_48+"'");
}
}
return _47;
};
dojo.hostenv.startPackage=function(_50){
var _51=_50.split(/\./);
if(_51[_51.length-1]=="*"){
_51.pop();
}
return dojo.evalObjPath(_51.join("."),true);
};
dojo.hostenv.findModule=function(_52,_53){
if(this.loaded_modules_[(new String(_52)).toLowerCase()]){
return this.loaded_modules_[_52];
}
var _54=dojo.evalObjPath(_52);
if((typeof _54!=="undefined")&&(_54)){
return _54;
}
if(_53){
dojo.raise("no loaded module named '"+_52+"'");
}
return null;
};
if(typeof window=="undefined"){
dojo.raise("no window object");
}
(function(){
if(djConfig.allowQueryConfig){
var _55=document.location.toString();
var _56=_55.split("?",2);
if(_56.length>1){
var _57=_56[1];
var _58=_57.split("&");
for(var x in _58){
var sp=_58[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _5c=document.getElementsByTagName("script");
var _5d=/(__package__|dojo)\.js(\?|$)/i;
for(var i=0;i<_5c.length;i++){
var src=_5c[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_5d);
if(m){
root=src.substring(0,m.index);
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=root;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=root;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var dua=drh.UA=navigator.userAgent;
var dav=drh.AV=navigator.appVersion;
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _67=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_67>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_67+6,_67+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
dr.vml.capable=drh.ie;
dr.svg.capable=f;
dr.svg.support.plugin=f;
dr.svg.support.builtin=f;
dr.svg.adobe=f;
if(document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("org.w3c.dom.svg","1.0")){
dr.svg.capable=t;
dr.svg.support.builtin=t;
dr.svg.support.plugin=f;
dr.svg.adobe=f;
}else{
if(navigator.mimeTypes&&navigator.mimeTypes.length>0){
var _68=navigator.mimeTypes["image/svg+xml"]||navigator.mimeTypes["image/svg"]||navigator.mimeTypes["image/svg-xml"];
if(_68){
dr.svg.adobe=_68&&_68.enabledPlugin&&_68.enabledPlugin.description&&(_68.enabledPlugin.description.indexOf("Adobe")>-1);
if(dr.svg.adobe){
dr.svg.capable=t;
dr.svg.support.plugin=t;
}
}
}else{
if(drh.ie&&dr.os.win){
var _68=f;
try{
var _69=new ActiveXObject("Adobe.SVGCtl");
_68=t;
}
catch(e){
}
if(_68){
dr.svg.capable=t;
dr.svg.support.plugin=t;
dr.svg.adobe=t;
}
}else{
dr.svg.capable=f;
dr.svg.support.plugin=f;
dr.svg.adobe=f;
}
}
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
var DJ_XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _6a=null;
var _6b=null;
try{
_6a=new XMLHttpRequest();
}
catch(e){
}
if(!_6a){
for(var i=0;i<3;++i){
var _6d=DJ_XMLHTTP_PROGIDS[i];
try{
_6a=new ActiveXObject(_6d);
}
catch(e){
_6b=e;
}
if(_6a){
DJ_XMLHTTP_PROGIDS=[_6d];
break;
}
}
}
if(!_6a){
return dojo.raise("XMLHTTP not available",_6b);
}
return _6a;
};
dojo.hostenv.getText=function(uri,_6f,_70){
var _71=this.getXmlhttpObject();
if(_6f){
_71.onreadystatechange=function(){
if((4==_71.readyState)&&(_71["status"])){
if(_71.status==200){
dojo.debug("LOADED URI: "+uri);
_6f(_71.responseText);
}
}
};
}
_71.open("GET",uri,_6f?true:false);
_71.send(null);
if(_6f){
return null;
}
return _71.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_72){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_72);
}else{
try{
var _73=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_73){
_73=document.getElementsByTagName("body")[0]||document.body;
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_72));
_73.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_72+"</div>");
}
catch(e2){
window.status=_72;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_75,_76,fp,_78){
var _79=_75["on"+_76]||function(){
};
_75["on"+_76]=function(){
fp.apply(_75,arguments);
_79.apply(_75,arguments);
};
return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
dojo.hostenv.modulesLoaded();
});
dojo.hostenv.makeWidgets=function(){
var _7a=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_7a=_7a.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_7a=_7a.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_7a.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
try{
var _7b=new dojo.xml.Parse();
if(_7a.length>0){
for(var x=0;x<_7a.length;x++){
var _7d=document.getElementById(_7a[x]);
if(!_7d){
continue;
}
var _7e=_7b.parseElement(_7d,null,true);
dojo.widget.getParser().createComponents(_7e);
}
}else{
if(djConfig.parseWidgets){
var _7e=_7b.parseElement(document.getElementsByTagName("body")[0]||document.body,null,true);
dojo.widget.getParser().createComponents(_7e);
}
}
}
catch(e){
dojo.debug("auto-build-widgets error:",e);
}
}
}
};
dojo.hostenv.modulesLoadedListeners.push(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(!window["djConfig"]||!window.djConfig["preventBackButtonFix"]){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
if(dojo.render.html.ie){
document.write("<style>v:*{ behavior:url(#default#VML); }</style>");
document.write("<xml:namespace ns=\"urn:schemas-microsoft-com:vml\" prefix=\"v\"/>");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
dojo.hostenv.byId=dojo.byId=function(id,doc){
if(typeof id=="string"||id instanceof String){
if(!doc){
doc=document;
}
return doc.getElementById(id);
}
return id;
};
dojo.hostenv.byIdArray=dojo.byIdArray=function(){
var ids=[];
for(var i=0;i<arguments.length;i++){
if((arguments[i] instanceof Array)||(typeof arguments[i]=="array")){
for(var j=0;j<arguments[i].length;j++){
ids=ids.concat(dojo.hostenv.byIdArray(arguments[i][j]));
}
}else{
ids.push(dojo.hostenv.byId(arguments[i]));
}
}
return ids;
};
dojo.hostenv.conditionalLoadModule=function(_84){
var _85=_84["common"]||[];
var _86=(_84[dojo.hostenv.name_])?_85.concat(_84[dojo.hostenv.name_]||[]):_85.concat(_84["default"]||[]);
for(var x=0;x<_86.length;x++){
var _88=_86[x];
if(_88.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_88);
}else{
dojo.hostenv.loadModule(_88);
}
}
};
dojo.hostenv.require=dojo.hostenv.loadModule;
dojo.require=function(){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireAfter=dojo.require;
dojo.requireIf=function(){
if((arguments[0]===true)||(arguments[0]=="common")||(dojo.render[arguments[0]].capable)){
var _89=[];
for(var i=1;i<arguments.length;i++){
_89.push(arguments[i]);
}
dojo.require.apply(dojo,_89);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.conditionalRequire=dojo.requireIf;
dojo.kwCompoundRequire=function(){
dojo.hostenv.conditionalLoadModule.apply(dojo.hostenv,arguments);
};
dojo.hostenv.provide=dojo.hostenv.startPackage;
dojo.provide=function(){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.setModulePrefix=function(_8b,_8c){
return dojo.hostenv.setModulePrefix(_8b,_8c);
};
dojo.profile={start:function(){
},end:function(){
},dump:function(){
}};
dojo.exists=function(obj,_8e){
var p=_8e.split(".");
for(var i=0;i<p.length;i++){
if(!(obj[p[i]])){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.provide("dojo.lang");
dojo.provide("dojo.AdapterRegistry");
dojo.provide("dojo.lang.Lang");
dojo.lang.mixin=function(obj,_92,_93){
if(typeof _93!="object"){
_93={};
}
for(var x in _92){
if(typeof _93[x]=="undefined"||_93[x]!=_92[x]){
obj[x]=_92[x];
}
}
return obj;
};
dojo.lang.extend=function(_95,_96){
this.mixin(_95.prototype,_96);
};
dojo.lang.extendPrototype=function(obj,_98){
this.extend(obj.constructor,_98);
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_99,_9a){
var nso=(_9a||dojo.lang.anon);
if((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true)){
for(var x in nso){
if(nso[x]===_99){
return x;
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_99;
return ret;
};
dojo.lang.hitch=function(_9e,_9f){
if(dojo.lang.isString(_9f)){
var fcn=_9e[_9f];
}else{
var fcn=_9f;
}
return function(){
return fcn.apply(_9e,arguments);
};
};
dojo.lang.setTimeout=function(_a1,_a2){
var _a3=window,argsStart=2;
if(!dojo.lang.isFunction(_a1)){
_a3=_a1;
_a1=_a2;
_a2=arguments[2];
argsStart++;
}
if(dojo.lang.isString(_a1)){
_a1=_a3[_a1];
}
var _a4=[];
for(var i=argsStart;i<arguments.length;i++){
_a4.push(arguments[i]);
}
return setTimeout(function(){
_a1.apply(_a3,_a4);
},_a2);
};
dojo.lang.isObject=function(wh){
return typeof wh=="object"||dojo.lang.isArray(wh)||dojo.lang.isFunction(wh);
};
dojo.lang.isArray=function(wh){
return (wh instanceof Array||typeof wh=="array");
};
dojo.lang.isArrayLike=function(wh){
if(dojo.lang.isString(wh)){
return false;
}
if(dojo.lang.isArray(wh)){
return true;
}
if(dojo.lang.isNumber(wh.length)&&isFinite(wh)){
return true;
}
return false;
};
dojo.lang.isFunction=function(wh){
return (wh instanceof Function||typeof wh=="function");
};
dojo.lang.isString=function(wh){
return (wh instanceof String||typeof wh=="string");
};
dojo.lang.isAlien=function(wh){
return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(wh));
};
dojo.lang.isBoolean=function(wh){
return (wh instanceof Boolean||typeof wh=="boolean");
};
dojo.lang.isNumber=function(wh){
return (wh instanceof Number||typeof wh=="number");
};
dojo.lang.isUndefined=function(wh){
return ((wh==undefined)&&(typeof wh=="undefined"));
};
dojo.lang.whatAmI=function(wh){
try{
if(dojo.lang.isArray(wh)){
return "array";
}
if(dojo.lang.isFunction(wh)){
return "function";
}
if(dojo.lang.isString(wh)){
return "string";
}
if(dojo.lang.isNumber(wh)){
return "number";
}
if(dojo.lang.isBoolean(wh)){
return "boolean";
}
if(dojo.lang.isAlien(wh)){
return "alien";
}
if(dojo.lang.isUndefined(wh)){
return "undefined";
}
for(var _b0 in dojo.lang.whatAmI.custom){
if(dojo.lang.whatAmI.custom[_b0](wh)){
return _b0;
}
}
if(dojo.lang.isObject(wh)){
return "object";
}
}
catch(E){
}
return "unknown";
};
dojo.lang.whatAmI.custom={};
dojo.lang.find=function(arr,val,_b3){
if(!dojo.lang.isArray(arr)&&dojo.lang.isArray(val)){
var a=arr;
arr=val;
val=a;
}
var _b5=dojo.lang.isString(arr);
if(_b5){
arr=arr.split("");
}
if(_b3){
for(var i=0;i<arr.length;++i){
if(arr[i]===val){
return i;
}
}
}else{
for(var i=0;i<arr.length;++i){
if(arr[i]==val){
return i;
}
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(arr,val,_b9){
if(!dojo.lang.isArray(arr)&&dojo.lang.isArray(val)){
var a=arr;
arr=val;
val=a;
}
var _bb=dojo.lang.isString(arr);
if(_bb){
arr=arr.split("");
}
if(_b9){
for(var i=arr.length-1;i>=0;i--){
if(arr[i]===val){
return i;
}
}
}else{
for(var i=arr.length-1;i>=0;i--){
if(arr[i]==val){
return i;
}
}
}
return -1;
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(arr,val){
return dojo.lang.find(arr,val)>-1;
};
dojo.lang.getNameInObj=function(ns,_c0){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===_c0){
return new String(x);
}
}
return null;
};
dojo.lang.has=function(obj,_c3){
return (typeof obj[_c3]!=="undefined");
};
dojo.lang.isEmpty=function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _c6=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_c6++;
break;
}
}
return (_c6==0);
}else{
if(dojo.lang.isArray(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
};
dojo.lang.forEach=function(arr,_c9,_ca){
var _cb=dojo.lang.isString(arr);
if(_cb){
arr=arr.split("");
}
var il=arr.length;
for(var i=0;i<((_ca)?il:arr.length);i++){
if(_c9(arr[i],i,arr)=="break"){
break;
}
}
};
dojo.lang.map=function(arr,obj,_d0){
var _d1=dojo.lang.isString(arr);
if(_d1){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_d0)){
_d0=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_d0){
var _d2=obj;
obj=_d0;
_d0=_d2;
}
}
if(Array.map){
var _d3=Array.map(arr,_d0,obj);
}else{
var _d3=[];
for(var i=0;i<arr.length;++i){
_d3.push(_d0.call(obj,arr[i]));
}
}
if(_d1){
return _d3.join("");
}else{
return _d3;
}
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(_d7,cb,_d9,_da){
if(!_d7.length){
if(typeof _da=="function"){
_da();
}
return;
}
if((typeof _d9=="undefined")&&(typeof cb=="number")){
_d9=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_d9){
_d9=0;
}
}
}
setTimeout(function(){
(_d7.shift())();
cb();
dojo.lang.delayThese(_d7,cb,_d9,_da);
},_d9);
};
dojo.lang.shallowCopy=function(obj){
var ret={},key;
for(key in obj){
if(dojo.lang.isUndefined(ret[key])){
ret[key]=obj[key];
}
}
return ret;
};
dojo.lang.every=function(arr,_de,_df){
var _e0=dojo.lang.isString(arr);
if(_e0){
arr=arr.split("");
}
if(Array.every){
return Array.every(arr,_de,_df);
}else{
if(!_df){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_df=dj_global;
}
for(var i=0;i<arr.length;i++){
if(!_de.call(_df,arr[i],i,arr)){
return false;
}
}
return true;
}
};
dojo.lang.some=function(arr,_e3,_e4){
var _e5=dojo.lang.isString(arr);
if(_e5){
arr=arr.split("");
}
if(Array.some){
return Array.some(arr,_e3,_e4);
}else{
if(!_e4){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_e4=dj_global;
}
for(var i=0;i<arr.length;i++){
if(_e3.call(_e4,arr[i],i,arr)){
return true;
}
}
return false;
}
};
dojo.lang.filter=function(arr,_e8,_e9){
var _ea=dojo.lang.isString(arr);
if(_ea){
arr=arr.split("");
}
if(Array.filter){
var _eb=Array.filter(arr,_e8,_e9);
}else{
if(!_e9){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_e9=dj_global;
}
var _eb=[];
for(var i=0;i<arr.length;i++){
if(_e8.call(_e9,arr[i],i,arr)){
_eb.push(arr[i]);
}
}
}
if(_ea){
return _eb.join("");
}else{
return _eb;
}
};
dojo.AdapterRegistry=function(){
this.pairs=[];
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(_ed,_ee,_ef,_f0){
if(_f0){
this.pairs.unshift([_ed,_ee,_ef]);
}else{
this.pairs.push([_ed,_ee,_ef]);
}
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var _f2=this.pairs[i];
if(_f2[1].apply(this,arguments)){
return _f2[2].apply(this,arguments);
}
}
dojo.raise("No match found");
},unregister:function(_f3){
for(var i=0;i<this.pairs.length;i++){
var _f5=this.pairs[i];
if(_f5[0]==_f3){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.lang.reprRegistry=new dojo.AdapterRegistry();
dojo.lang.registerRepr=function(_f6,_f7,_f8,_f9){
dojo.lang.reprRegistry.register(_f6,_f7,_f8,_f9);
};
dojo.lang.repr=function(obj){
if(typeof (obj)=="undefined"){
return "undefined";
}else{
if(obj===null){
return "null";
}
}
try{
if(typeof (obj["__repr__"])=="function"){
return obj["__repr__"]();
}else{
if((typeof (obj["repr"])=="function")&&(obj.repr!=arguments.callee)){
return obj["repr"]();
}
}
return dojo.lang.reprRegistry.match(obj);
}
catch(e){
if(typeof (obj.NAME)=="string"&&(obj.toString==Function.prototype.toString||obj.toString==Object.prototype.toString)){
return o.NAME;
}
}
if(typeof (obj)=="function"){
obj=(obj+"").replace(/^\s+/,"");
var idx=obj.indexOf("{");
if(idx!=-1){
obj=obj.substr(0,idx)+"{...}";
}
}
return obj+"";
};
dojo.lang.reprArrayLike=function(arr){
try{
var na=dojo.lang.map(arr,dojo.lang.repr);
return "["+na.join(", ")+"]";
}
catch(e){
}
};
dojo.lang.reprString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.lang.reprNumber=function(num){
return num+"";
};
(function(){
var m=dojo.lang;
m.registerRepr("arrayLike",m.isArrayLike,m.reprArrayLike);
m.registerRepr("string",m.isString,m.reprString);
m.registerRepr("numbers",m.isNumber,m.reprNumber);
m.registerRepr("boolean",m.isBoolean,m.reprNumber);
})();
dojo.lang.unnest=function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
};
dojo.provide("dojo.dom");
dojo.require("dojo.lang");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=dojo.lang.isDomNode=function(wh){
if(typeof Element=="object"){
try{
return wh instanceof Element;
}
catch(E){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.lang.whatAmI.custom["node"]=dojo.dom.isNode;
dojo.dom.getTagName=function(node){
var _106=node.tagName;
if(_106.substr(0,5).toLowerCase()!="dojo:"){
if(_106.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_106.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((node.getAttributeNS)&&(node.getAttributeNS(this.dojoml,"type"))){
return "dojo:"+node.getAttributeNS(this.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((!dj_global["djConfig"])||(!djConfig["ignoreClassNames"])){
var _108=node.className||node.getAttribute("class");
if((_108)&&(_108.indexOf("dojo-")!=-1)){
var _109=_108.split(" ");
for(var x=0;x<_109.length;x++){
if((_109[x].length>5)&&(_109[x].indexOf("dojo-")>=0)){
return "dojo:"+_109[x].substr(5).toLowerCase();
}
}
}
}
}
return _106.toLowerCase();
};
dojo.dom.getUniqueId=function(){
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(document.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_10c,_10d){
var node=_10c.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_10d&&node&&node.tagName&&node.tagName.toLowerCase()!=_10d.toLowerCase()){
node=dojo.dom.nextElement(node,_10d);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_10f,_110){
var node=_10f.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_110&&node&&node.tagName&&node.tagName.toLowerCase()!=_110.toLowerCase()){
node=dojo.dom.prevElement(node,_110);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_113){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_113&&_113.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_113);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_115){
if(!node){
return null;
}
if(_115){
_115=_115.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_115&&_115.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_115);
}
return node;
};
dojo.dom.moveChildren=function(_116,_117,trim){
var _119=0;
if(trim){
while(_116.hasChildNodes()&&_116.firstChild.nodeType==dojo.dom.TEXT_NODE){
_116.removeChild(_116.firstChild);
}
while(_116.hasChildNodes()&&_116.lastChild.nodeType==dojo.dom.TEXT_NODE){
_116.removeChild(_116.lastChild);
}
}
while(_116.hasChildNodes()){
_117.appendChild(_116.firstChild);
_119++;
}
return _119;
};
dojo.dom.copyChildren=function(_11a,_11b,trim){
var _11d=_11a.cloneNode(true);
return this.moveChildren(_11d,_11b,trim);
};
dojo.dom.removeChildren=function(node){
var _11f=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _11f;
};
dojo.dom.replaceChildren=function(node,_121){
dojo.dom.removeChildren(node);
node.appendChild(_121);
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_124,_125){
var _126=[];
var _127=dojo.lang.isFunction(_124);
while(node){
if(!_127||_124(node)){
_126.push(node);
}
if(_125&&_126.length>0){
return _126[0];
}
node=node.parentNode;
}
if(_125){
return null;
}
return _126;
};
dojo.dom.getAncestorsByTag=function(node,tag,_12a){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_12a);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_12f,_130){
if(_130&&node){
node=node.parentNode;
}
while(node){
if(node==_12f){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
};
dojo.dom.createDocumentFromText=function(str,_133){
if(!_133){
_133="text/xml";
}
if(typeof DOMParser!="undefined"){
var _134=new DOMParser();
return _134.parseFromString(str,_133);
}else{
if(typeof ActiveXObject!="undefined"){
var _135=new ActiveXObject("Microsoft.XMLDOM");
if(_135){
_135.async=false;
_135.loadXML(str);
return _135;
}else{
dojo.debug("toXml didn't work?");
}
}else{
if(document.createElement){
var tmp=document.createElement("xml");
tmp.innerHTML=str;
if(document.implementation&&document.implementation.createDocument){
var _137=document.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_137.importNode(tmp.childNodes.item(i),true);
}
return _137;
}
return tmp.document&&tmp.document.firstChild?tmp.document.firstChild:tmp;
}
}
}
return null;
};
dojo.dom.insertBefore=function(node,ref,_13b){
if(_13b!=true&&(node===ref||node.nextSibling===ref)){
return false;
}
var _13c=ref.parentNode;
_13c.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_13f){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_13f!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_13f);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_143){
if((!node)||(!ref)||(!_143)){
return false;
}
switch(_143.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_145,_146){
var _147=_145.childNodes;
if(!_147.length){
_145.appendChild(node);
return true;
}
var _148=null;
for(var i=0;i<_147.length;i++){
var _14a=_147.item(i)["getAttribute"]?parseInt(_147.item(i).getAttribute("dojoinsertionindex")):-1;
if(_14a<_146){
_148=_147.item(i);
}
}
if(_148){
return dojo.dom.insertAfter(node,_148);
}else{
return dojo.dom.insertBefore(node,_147.item(0));
}
};
dojo.dom.textContent=function(node,text){
if(text){
dojo.dom.replaceChildren(node,document.createTextNode(text));
return text;
}else{
var _14d="";
if(node==null){
return _14d;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_14d+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_14d+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _14d;
}
};
dojo.dom.collectionToArray=function(_14f){
var _150=new Array(_14f.length);
for(var i=0;i<_14f.length;i++){
_150[i]=_14f[i];
}
return _150;
};
dojo.provide("dojo.xml.Parse");
dojo.require("dojo.dom");
dojo.xml.Parse=function(){
this.parseFragment=function(_152){
var _153={};
var _154=dojo.dom.getTagName(_152);
_153[_154]=new Array(_152.tagName);
var _155=this.parseAttributes(_152);
for(var attr in _155){
if(!_153[attr]){
_153[attr]=[];
}
_153[attr][_153[attr].length]=_155[attr];
}
var _157=_152.childNodes;
for(var _158 in _157){
switch(_157[_158].nodeType){
case dojo.dom.ELEMENT_NODE:
_153[_154].push(this.parseElement(_157[_158]));
break;
case dojo.dom.TEXT_NODE:
if(_157.length==1){
if(!_153[_152.tagName]){
_153[_154]=[];
}
_153[_154].push({value:_157[0].nodeValue});
}
break;
}
}
return _153;
};
this.parseElement=function(node,_15a,_15b,_15c){
var _15d={};
var _15e=dojo.dom.getTagName(node);
_15d[_15e]=[];
if((!_15b)||(_15e.substr(0,4).toLowerCase()=="dojo")){
var _15f=this.parseAttributes(node);
for(var attr in _15f){
if((!_15d[_15e][attr])||(typeof _15d[_15e][attr]!="array")){
_15d[_15e][attr]=[];
}
_15d[_15e][attr].push(_15f[attr]);
}
_15d[_15e].nodeRef=node;
_15d.tagName=_15e;
_15d.index=_15c||0;
}
var _161=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
_161++;
var ctn=dojo.dom.getTagName(tcn);
if(!_15d[ctn]){
_15d[ctn]=[];
}
_15d[ctn].push(this.parseElement(tcn,true,_15b,_161));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_15d[ctn][_15d[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_15d[_15e].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _15d;
};
this.parseAttributes=function(node){
var _166={};
var atts=node.attributes;
for(var i=0;i<atts.length;i++){
var _169=atts.item(i);
if((dojo.render.html.capable)&&(dojo.render.html.ie)){
if(!_169){
continue;
}
if((typeof _169=="object")&&(typeof _169.nodeValue=="undefined")||(_169.nodeValue==null)||(_169.nodeValue=="")){
continue;
}
}
var nn=(_169.nodeName.indexOf("dojo:")==-1)?_169.nodeName:_169.nodeName.split("dojo:")[1];
_166[nn]={value:_169.nodeValue};
}
return _166;
};
};
dojo.require("dojo.lang");
dojo.provide("dojo.event");
dojo.event=new function(){
this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
this.createFunctionPair=function(obj,cb){
var ret=[];
if(typeof obj=="function"){
ret[1]=dojo.lang.nameAnonFunc(obj,dj_global);
ret[0]=dj_global;
return ret;
}else{
if((typeof obj=="object")&&(typeof cb=="string")){
return [obj,cb];
}else{
if((typeof obj=="object")&&(typeof cb=="function")){
ret[1]=dojo.lang.nameAnonFunc(cb,obj);
ret[0]=obj;
return ret;
}
}
}
return null;
};
function interpolateArgs(args){
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((typeof args[0]=="object")&&(typeof args[1]=="string")&&(typeof args[2]=="string")){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((typeof args[1]=="string")&&(typeof args[2]=="string")){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((typeof args[0]=="object")&&(typeof args[1]=="string")&&(typeof args[2]=="function")){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _170=dojo.lang.nameAnonFunc(args[2],ao.adviceObj);
ao.adviceObj[_170]=args[2];
ao.adviceFunc=_170;
}else{
if((typeof args[0]=="function")&&(typeof args[1]=="object")&&(typeof args[2]=="string")){
ao.adviceType="after";
ao.srcObj=dj_global;
var _170=dojo.lang.nameAnonFunc(args[0],ao.srcObj);
ao.srcObj[_170]=args[0];
ao.srcFunc=_170;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((typeof args[0]=="object")&&(typeof args[2]=="object")){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((typeof args[1]).toLowerCase()=="object"){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if((typeof args[2]).toLowerCase()=="object"){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if((typeof ao.srcFunc).toLowerCase()!="string"){
ao.srcFunc=dojo.lang.getNameInObj(ao.srcObj,ao.srcFunc);
}
if((typeof ao.adviceFunc).toLowerCase()!="string"){
ao.adviceFunc=dojo.lang.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&((typeof ao.aroundFunc).toLowerCase()!="string")){
ao.aroundFunc=dojo.lang.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
return ao;
}
this.connect=function(){
var ao=interpolateArgs(arguments);
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this._kwConnectImpl=function(_178,_179){
var fn=(_179)?"disconnect":"connect";
if(typeof _178["srcFunc"]=="function"){
_178.srcObj=_178["srcObj"]||dj_global;
var _17b=dojo.lang.nameAnonFunc(_178.srcFunc,_178.srcObj);
_178.srcFunc=_17b;
}
if(typeof _178["adviceFunc"]=="function"){
_178.adviceObj=_178["adviceObj"]||dj_global;
var _17b=dojo.lang.nameAnonFunc(_178.adviceFunc,_178.adviceObj);
_178.adviceFunc=_17b;
}
return dojo.event[fn]((_178["type"]||_178["adviceType"]||"after"),_178["srcObj"]||dj_global,_178["srcFunc"],_178["adviceObj"]||_178["targetObj"]||dj_global,_178["adviceFunc"]||_178["targetFunc"],_178["aroundObj"],_178["aroundFunc"],_178["once"],_178["delay"],_178["rate"],_178["adviceMsg"]||false);
};
this.kwConnect=function(_17c){
return this._kwConnectImpl(_17c,false);
};
this.disconnect=function(){
var ao=interpolateArgs(arguments);
if(!ao.adviceFunc){
return;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
};
this.kwDisconnect=function(_17f){
return this._kwConnectImpl(_17f,true);
};
};
dojo.event.MethodInvocation=function(_180,obj,args){
this.jp_=_180;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_188){
this.object=obj||dj_global;
this.methodname=_188;
this.methodfunc=this.object[_188];
this.before=[];
this.after=[];
this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_18a){
if(!obj){
obj=dj_global;
}
if(!obj[_18a]){
obj[_18a]=function(){
};
}else{
if((!dojo.lang.isFunction(obj[_18a]))&&(!dojo.lang.isAlien(obj[_18a]))){
return null;
}
}
var _18b=_18a+"$joinpoint";
var _18c=_18a+"$joinpoint$method";
var _18d=obj[_18b];
if(!_18d){
var _18e=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_18e=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_18b,_18c,_18a]);
}
}
obj[_18c]=obj[_18a];
_18d=obj[_18b]=new dojo.event.MethodJoinPoint(obj,_18c);
obj[_18a]=function(){
var args=[];
if((_18e)&&(!arguments.length)&&(window.event)){
args.push(dojo.event.browser.fixEvent(window.event));
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_18e)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x]));
}else{
args.push(arguments[x]);
}
}
}
return _18d.run.apply(_18d,args);
};
}
return _18d;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
},run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _193=[];
for(var x=0;x<args.length;x++){
_193[x]=args[x];
}
var _195=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _197=marr[0]||dj_global;
var _198=marr[1];
if(!_197[_198]){
dojo.raise("function \""+_198+"\" does not exist on \""+_197+"\"");
}
var _199=marr[2]||dj_global;
var _19a=marr[3];
var msg=marr[6];
var _19c;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _197[_198].apply(_197,to.args);
}};
to.args=_193;
var _19e=parseInt(marr[4]);
var _19f=((!isNaN(_19e))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _1a2=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event.canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_195(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_19a){
_199[_19a].call(_199,to);
}else{
if((_19f)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_197[_198].call(_197,to);
}else{
_197[_198].apply(_197,args);
}
},_19e);
}else{
if(msg){
_197[_198].call(_197,to);
}else{
_197[_198].apply(_197,args);
}
}
}
};
if(this.before.length>0){
dojo.lang.forEach(this.before,_195,true);
}
var _1a5;
if(this.around.length>0){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_1a5=mi.proceed();
}else{
if(this.methodfunc){
_1a5=this.object[this.methodname].apply(this.object,args);
}
}
if(this.after.length>0){
dojo.lang.forEach(this.after,_195,true);
}
return (this.methodfunc)?_1a5:null;
},getArr:function(kind){
var arr=this.after;
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
arr=this.before;
}else{
if(kind=="around"){
arr=this.around;
}
}
return arr;
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_1aa,_1ab,_1ac,_1ad,_1ae,_1af,once,_1b1,rate,_1b3){
var arr=this.getArr(_1ae);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_1aa,_1ab,_1ac,_1ad,_1b1,rate,_1b3];
if(once){
if(this.hasAdvice(_1aa,_1ab,_1ae,arr)>=0){
return;
}
}
if(_1af=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_1b6,_1b7,_1b8,arr){
if(!arr){
arr=this.getArr(_1b8);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
if((arr[x][0]==_1b6)&&(arr[x][1]==_1b7)){
ind=x;
}
}
return ind;
},removeAdvice:function(_1bc,_1bd,_1be,once){
var arr=this.getArr(_1be);
var ind=this.hasAdvice(_1bc,_1bd,_1be,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_1bc,_1bd,_1be,arr);
}
return true;
}});
dojo.require("dojo.event");
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_1c2){
if(!this.topics[_1c2]){
this.topics[_1c2]=new this.TopicImpl(_1c2);
}
return this.topics[_1c2];
};
this.registerPublisher=function(_1c3,obj,_1c5){
var _1c3=this.getTopic(_1c3);
_1c3.registerPublisher(obj,_1c5);
};
this.subscribe=function(_1c6,obj,_1c8){
var _1c6=this.getTopic(_1c6);
_1c6.subscribe(obj,_1c8);
};
this.unsubscribe=function(_1c9,obj,_1cb){
var _1c9=this.getTopic(_1c9);
_1c9.unsubscribe(obj,_1cb);
};
this.publish=function(_1cc,_1cd){
var _1cc=this.getTopic(_1cc);
var args=[];
if((arguments.length==2)&&(_1cd.length)&&(typeof _1cd!="string")){
args=_1cd;
}else{
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
}
_1cc.sendMessage.apply(_1cc,args);
};
};
dojo.event.topic.TopicImpl=function(_1d0){
this.topicName=_1d0;
var self=this;
self.subscribe=function(_1d2,_1d3){
dojo.event.connect("before",self,"sendMessage",_1d2,_1d3);
};
self.unsubscribe=function(_1d4,_1d5){
dojo.event.disconnect("before",self,"sendMessage",_1d4,_1d5);
};
self.registerPublisher=function(_1d6,_1d7){
dojo.event.connect(_1d6,_1d7,self,"sendMessage");
};
self.sendMessage=function(_1d8){
};
};
dojo.provide("dojo.event.browser");
dojo.require("dojo.event");
dojo_ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_1db){
var na;
var tna;
if(_1db){
tna=_1db.getElementsByTagName("*");
na=[_1db];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _1df={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
if(el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
na=null;
};
};
if(dojo.render.html.ie){
window.onunload=function(){
dojo_ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo_ie_clobber.clobberNodes=[];
};
}
dojo.event.browser=new function(){
var _1e3=0;
this.clean=function(node){
if(dojo.render.html.ie){
dojo_ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo_ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_1e7){
this.addClobberNode(node);
for(var x=0;x<_1e7.length;x++){
node.__clobberAttrs__.push(_1e7[x]);
}
};
this.removeListener=function(node,_1ea,fp,_1ec){
if(!_1ec){
var _1ec=false;
}
_1ea=_1ea.toLowerCase();
if(_1ea.substr(0,2)=="on"){
_1ea=_1ea.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_1ea,fp,_1ec);
}
};
this.addListener=function(node,_1ee,fp,_1f0,_1f1){
if(!node){
return;
}
if(!_1f0){
var _1f0=false;
}
_1ee=_1ee.toLowerCase();
if(_1ee.substr(0,2)!="on"){
_1ee="on"+_1ee;
}
if(!_1f1){
var _1f2=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt));
if(_1f0){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_1f2=fp;
}
if(node.addEventListener){
node.addEventListener(_1ee.substr(2),_1f2,_1f0);
return _1f2;
}else{
if(typeof node[_1ee]=="function"){
var _1f5=node[_1ee];
node[_1ee]=function(e){
_1f5(e);
return _1f2(e);
};
}else{
node[_1ee]=_1f2;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_1ee]);
}
return _1f2;
}
};
this.isEvent=function(obj){
return (typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_1f8,_1f9){
if(typeof _1f8!="function"){
dojo.raise("listener not a function: "+_1f8);
}
dojo.event.browser.currentEvent.currentTarget=_1f9;
return _1f8.call(_1f9,dojo.event.browser.currentEvent);
};
this.stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this.preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt){
if((!evt)&&(window["event"])){
var evt=window.event;
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
evt.charCode=evt.keyCode;
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=evt.srcElement;
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
if(evt.fromElement){
evt.relatedTarget=evt.fromElement;
}
if(evt.toElement){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this.stopPropagation;
evt.preventDefault=this.preventDefault;
}
return evt;
};
this.stopEvent=function(ev){
if(window.event){
ev.returnValue=false;
ev.cancelBubble=true;
}else{
ev.preventDefault();
ev.stopPropagation();
}
};
};
dojo.hostenv.conditionalLoadModule({common:["dojo.event","dojo.event.topic"],browser:["dojo.event.browser"]});
dojo.hostenv.moduleLoaded("dojo.event.*");
dojo.provide("dojo.widget.Manager");
dojo.require("dojo.lang");
dojo.require("dojo.event.*");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _1fe={};
var _1ff=[];
this.getUniqueId=function(_200){
return _200+"_"+(_1fe[_200]!=undefined?++_1fe[_200]:_1fe[_200]=0);
};
this.add=function(_201){
dojo.profile.start("dojo.widget.manager.add");
this.widgets.push(_201);
if(_201.widgetId==""){
if(_201["id"]){
_201.widgetId=_201["id"];
}else{
if(_201.extraArgs["id"]){
_201.widgetId=_201.extraArgs["id"];
}else{
_201.widgetId=this.getUniqueId(_201.widgetType);
}
}
}
if(this.widgetIds[_201.widgetId]){
dojo.debug("widget ID collision on ID: "+_201.widgetId);
}
this.widgetIds[_201.widgetId]=_201;
dojo.profile.end("dojo.widget.manager.add");
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_203){
var tw=this.widgets[_203].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_203,1);
};
this.removeById=function(id){
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
return this.widgetIds[id];
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(x.widgetType.toLowerCase()==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsOfType=function(id){
dj_deprecated("getWidgetsOfType is depecrecated, use getWidgetsByType");
return dojo.widget.manager.getWidgetsByType(id);
};
this.getWidgetsByFilter=function(_20d){
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_20d(x)){
ret.push(x);
}
});
return ret;
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
var _210={};
var _211=["dojo.widget","dojo.webui.widgets"];
for(var i=0;i<_211.length;i++){
_211[_211[i]]=true;
}
this.registerWidgetPackage=function(_213){
if(!_211[_213]){
_211[_213]=true;
_211.push(_213);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_211,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_215,_216,_217){
var impl=this.getImplementationName(_215);
if(impl){
var ret=new impl(_216);
return ret;
}
};
this.getImplementationName=function(_21a){
var _21b=_21a.toLowerCase();
var impl=_210[_21b];
if(impl){
return impl;
}
if(!_1ff.length){
for(var _21d in dojo.render){
if(dojo.render[_21d]["capable"]===true){
var _21e=dojo.render[_21d].prefixes;
for(var i=0;i<_21e.length;i++){
_1ff.push(_21e[i].toLowerCase());
}
}
}
_1ff.push("");
}
for(var i=0;i<_211.length;i++){
var _220=dojo.evalObjPath(_211[i]);
if(!_220){
continue;
}
for(var j=0;j<_1ff.length;j++){
if(!_220[_1ff[j]]){
continue;
}
for(var _222 in _220[_1ff[j]]){
if(_222.toLowerCase()!=_21b){
continue;
}
_210[_21b]=_220[_1ff[j]][_222];
return _210[_21b];
}
}
for(var j=0;j<_1ff.length;j++){
for(var _222 in _220){
if(_222.toLowerCase()!=(_1ff[j]+_21b)){
continue;
}
_210[_21b]=_220[_222];
return _210[_21b];
}
}
}
throw new Error("Could not locate \""+_21a+"\" class");
};
this.onResized=function(){
for(var id in this.topWidgets){
var _224=this.topWidgets[id];
if(_224.onResized){
_224.onResized();
}
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onResized");
dojo.event.connect(window,"onresize",this,"onResized");
}
};
dojo.widget.getUniqueId=function(){
return dojo.widget.manager.getUniqueId.apply(dojo.widget.manager,arguments);
};
dojo.widget.addWidget=function(){
return dojo.widget.manager.add.apply(dojo.widget.manager,arguments);
};
dojo.widget.destroyAllWidgets=function(){
return dojo.widget.manager.destroyAll.apply(dojo.widget.manager,arguments);
};
dojo.widget.removeWidget=function(){
return dojo.widget.manager.remove.apply(dojo.widget.manager,arguments);
};
dojo.widget.removeWidgetById=function(){
return dojo.widget.manager.removeById.apply(dojo.widget.manager,arguments);
};
dojo.widget.getWidgetById=function(){
return dojo.widget.manager.getWidgetById.apply(dojo.widget.manager,arguments);
};
dojo.widget.getWidgetsByType=function(){
return dojo.widget.manager.getWidgetsByType.apply(dojo.widget.manager,arguments);
};
dojo.widget.getWidgetsByFilter=function(){
return dojo.widget.manager.getWidgetsByFilter.apply(dojo.widget.manager,arguments);
};
dojo.widget.byId=function(){
return dojo.widget.manager.getWidgetById.apply(dojo.widget.manager,arguments);
};
dojo.widget.byType=function(){
return dojo.widget.manager.getWidgetsByType.apply(dojo.widget.manager,arguments);
};
dojo.widget.byFilter=function(){
return dojo.widget.manager.getWidgetsByFilter.apply(dojo.widget.manager,arguments);
};
dojo.widget.all=function(){
return dojo.widget.manager.getAllWidgets.apply(dojo.widget.manager,arguments);
};
dojo.widget.registerWidgetPackage=function(){
return dojo.widget.manager.registerWidgetPackage.apply(dojo.widget.manager,arguments);
};
dojo.widget.getWidgetImplementation=function(){
return dojo.widget.manager.getImplementation.apply(dojo.widget.manager,arguments);
};
dojo.widget.getWidgetImplementationName=function(){
return dojo.widget.manager.getImplementationName.apply(dojo.widget.manager,arguments);
};
dojo.widget.widgets=dojo.widget.manager.widgets;
dojo.widget.widgetIds=dojo.widget.manager.widgetIds;
dojo.widget.root=dojo.widget.manager.root;
dojo.provide("dojo.string");
dojo.require("dojo.lang");
dojo.string.trim=function(str,wh){
if(!dojo.lang.isString(str)){
return str;
}
if(!str.length){
return str;
}
if(wh>0){
return str.replace(/^\s+/,"");
}else{
if(wh<0){
return str.replace(/\s+$/,"");
}else{
return str.replace(/^\s+|\s+$/g,"");
}
}
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.paramString=function(str,_22a,_22b){
for(var name in _22a){
var re=new RegExp("\\%\\{"+name+"\\}","g");
str=str.replace(re,_22a[name]);
}
if(_22b){
str=str.replace(/%\{([^\}\s]+)\}/g,"");
}
return str;
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _22f=str.split(" ");
var _230="";
var len=_22f.length;
for(var i=0;i<len;i++){
var word=_22f[i];
word=word.charAt(0).toUpperCase()+word.substring(1,word.length);
_230+=word;
if(i<len-1){
_230+=" ";
}
}
return new String(_230);
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _237=escape(str);
var _238,re=/%u([0-9A-F]{4})/i;
while((_238=_237.match(re))){
var num=Number("0x"+_238[1]);
var _23a=escape("&#"+num+";");
ret+=_237.substring(0,_238.index)+_23a;
_237=_237.substring(_238.index+_238[0].length);
}
ret+=_237.replace(/\+/g,"%2B");
return ret;
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}else{
return str.substring(0,len).replace(/\.+$/,"")+"...";
}
};
dojo.string.escape=function(type,str){
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml(str);
case "sql":
return dojo.string.escapeSql(str);
case "regexp":
case "regex":
return dojo.string.escapeRegExp(str);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript(str);
case "ascii":
return dojo.string.encodeAscii(str);
default:
return str;
}
};
dojo.string.escapeXml=function(str){
return str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;");
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.repeat=function(str,_244,_245){
var out="";
for(var i=0;i<_244;i++){
out+=str;
if(_245&&i<_244-1){
out+=_245;
}
}
return out;
};
dojo.string.endsWith=function(str,end,_24a){
if(_24a){
str=str.toLowerCase();
end=end.toLowerCase();
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_24e,_24f){
if(_24f){
str=str.toLowerCase();
_24e=_24e.toLowerCase();
}
return str.indexOf(_24e)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i]>-1)){
return true;
}
}
return false;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.string.addToPrototype=function(){
for(var _25f in dojo.string){
if(dojo.lang.isFunction(dojo.string[_25f])){
var func=(function(){
var meth=_25f;
switch(meth){
case "addToPrototype":
return null;
break;
case "escape":
return function(type){
return dojo.string.escape(type,this);
};
break;
default:
return function(){
var args=[this];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
dojo.debug(args);
return dojo.string[meth].apply(dojo.string,args);
};
}
})();
if(func){
String.prototype[_25f]=func;
}
}
}
};
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.require("dojo.lang");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.event.*");
dojo.require("dojo.string");
dojo.widget.Widget=function(){
this.children=[];
this.extraArgs={};
};
dojo.lang.extend(dojo.widget.Widget,{parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",toString:function(){
return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.isEnabled=true;
},disable:function(){
this.isEnabled=false;
},hide:function(){
this.isHidden=true;
},show:function(){
this.isHidden=false;
},create:function(args,_266,_267){
this.satisfyPropertySets(args,_266,_267);
this.mixInProperties(args,_266,_267);
this.postMixInProperties(args,_266,_267);
dojo.widget.manager.add(this);
this.buildRendering(args,_266,_267);
this.initialize(args,_266,_267);
this.postInitialize(args,_266,_267);
this.postCreate(args,_266,_267);
return this;
},destroy:function(_268){
this.uninitialize();
this.destroyRendering(_268);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(_269){
_269=(!_269)?function(){
return true;
}:_269;
for(var x=0;x<this.children.length;x++){
var tc=this.children[x];
if((tc)&&(_269(tc))){
tc.destroy();
}
}
},destroyChildrenOfType:function(type){
type=type.toLowerCase();
this.destroyChildren(function(item){
if(item.widgetType.toLowerCase()==type){
return true;
}else{
return false;
}
});
},getChildrenOfType:function(type,_26f){
var ret=[];
type=type.toLowerCase();
for(var x=0;x<this.children.length;x++){
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
if(_26f){
ret=ret.concat(this.children[x].getChildrenOfType(type,_26f));
}
}
return ret;
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _276;
var _277=dojo.widget.lcArgsCache[this.widgetType];
if(_277==null){
_277={};
for(var y in this){
_277[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_277;
}
var _279={};
for(var x in args){
if(!this[x]){
var y=_277[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_279[x]){
continue;
}
_279[x]=true;
if((typeof this[x])!=(typeof _276)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.connect(this,x,this,tn);
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
var _27b=args[x].split(";");
for(var y=0;y<_27b.length;y++){
var si=_27b[y].indexOf(":");
if((si!=-1)&&(_27b[y].length>si)){
this[x][dojo.string.trim(_27b[y].substr(0,si))]=_27b[y].substr(si+1);
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x]=args[x];
}
}
},postMixInProperties:function(){
},initialize:function(args,frag){
return false;
},postInitialize:function(args,frag){
return false;
},postCreate:function(args,frag){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(){
dj_unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dj_unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},cleanUp:function(){
dj_unimplemented("dojo.widget.Widget.cleanUp");
return false;
},addedTo:function(_283){
},addChild:function(_284){
dj_unimplemented("dojo.widget.Widget.addChild");
return false;
},addChildAtIndex:function(_285,_286){
dj_unimplemented("dojo.widget.Widget.addChildAtIndex");
return false;
},removeChild:function(_287){
dj_unimplemented("dojo.widget.Widget.removeChild");
return false;
},removeChildAtIndex:function(_288){
dj_unimplemented("dojo.widget.Widget.removeChildAtIndex");
return false;
},resize:function(_289,_28a){
this.setWidth(_289);
this.setHeight(_28a);
},setWidth:function(_28b){
if((typeof _28b=="string")&&(_28b.substr(-1)=="%")){
this.setPercentageWidth(_28b);
}else{
this.setNativeWidth(_28b);
}
},setHeight:function(_28c){
if((typeof _28c=="string")&&(_28c.substr(-1)=="%")){
this.setPercentageHeight(_28c);
}else{
this.setNativeHeight(_28c);
}
},setPercentageHeight:function(_28d){
return false;
},setNativeHeight:function(_28e){
return false;
},setPercentageWidth:function(_28f){
return false;
},setNativeWidth:function(_290){
return false;
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
var _292=type.toLowerCase();
this[_292]=function(_293,_294,_295,_296){
return dojo.widget.buildWidgetFromParseTree(_292,_293,_294,_295,_296);
};
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_297,_298,_299){
var _29a=_298.parseProperties(_297["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_29b,_29c,_29d){
var _29e=_29c.parseProperties(_29b["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_2a1,_2a2,_2a3){
var _2a4={};
var _2a5=type.split(":");
_2a5=(_2a5.length==2)?_2a5[1]:type;
var _2a4=_2a1.parseProperties(frag["dojo:"+_2a5]);
var _2a6=dojo.widget.manager.getImplementation(_2a5);
if(!_2a6){
throw new Error("cannot find \""+_2a5+"\" widget");
}else{
if(!_2a6.create){
throw new Error("\""+_2a5+"\" widget object does not appear to implement *Widget");
}
}
_2a4["dojoinsertionindex"]=_2a3;
var ret=_2a6.create(_2a4,frag,_2a2);
return ret;
};
dojo.provide("dojo.widget.Parse");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.string");
dojo.require("dojo.dom");
dojo.widget.Parse=function(_2a8){
this.propertySetsList=[];
this.fragment=_2a8;
this.createComponents=function(_2a9,_2aa){
var _2ab=dojo.widget.tags;
var _2ac=[];
for(var item in _2a9){
var _2ae=false;
try{
if(_2a9[item]&&(_2a9[item]["tagName"])&&(_2a9[item]!=_2a9["nodeRef"])){
var tn=new String(_2a9[item]["tagName"]);
var tna=tn.split(";");
for(var x=0;x<tna.length;x++){
var ltn=dojo.string.trim(tna[x]).toLowerCase();
if(_2ab[ltn]){
_2ae=true;
_2a9[item].tagName=ltn;
_2ac.push(_2ab[ltn](_2a9[item],this,_2aa,_2a9[item]["index"]));
}else{
if(ltn.substr(0,5)=="dojo:"){
dojo.debug("no tag handler registed for type: ",ltn);
}
}
}
}
}
catch(e){
dojo.debug(e);
}
if((!_2ae)&&(typeof _2a9[item]=="object")&&(_2a9[item]!=_2a9.nodeRef)&&(_2a9[item]!=_2a9["tagName"])){
_2ac.push(this.createComponents(_2a9[item],_2aa));
}
}
return _2ac;
};
this.parsePropertySets=function(_2b3){
return [];
var _2b4=[];
for(var item in _2b3){
if((_2b3[item]["tagName"]=="dojo:propertyset")){
_2b4.push(_2b3[item]);
}
}
this.propertySetsList.push(_2b4);
return _2b4;
};
this.parseProperties=function(_2b6){
var _2b7={};
for(var item in _2b6){
if((_2b6[item]==_2b6["tagName"])||(_2b6[item]==_2b6.nodeRef)){
}else{
if((_2b6[item]["tagName"])&&(dojo.widget.tags[_2b6[item].tagName.toLowerCase()])){
}else{
if((_2b6[item][0])&&(_2b6[item][0].value!="")){
try{
if(item.toLowerCase()=="dataprovider"){
var _2b9=this;
this.getDataProvider(_2b9,_2b6[item][0].value);
_2b7.dataProvider=this.dataProvider;
}
_2b7[item]=_2b6[item][0].value;
var _2ba=this.parseProperties(_2b6[item]);
for(var _2bb in _2ba){
_2b7[_2bb]=_2ba[_2bb];
}
}
catch(e){
dj_debug(e);
}
}
}
}
}
return _2b7;
};
this.getDataProvider=function(_2bc,_2bd){
dojo.io.bind({url:_2bd,load:function(type,_2bf){
if(type=="load"){
_2bc.dataProvider=_2bf;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_2c0){
for(var x=0;x<this.propertySetsList.length;x++){
if(_2c0==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_2c2){
var _2c3=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
if((cpcc)&&(propertySetId==cpcc[0].value)){
_2c3.push(cpl);
}
}
return _2c3;
};
this.getPropertySets=function(_2c7){
var ppl="dojo:propertyproviderlist";
var _2c9=[];
var _2ca=_2c7["tagName"];
if(_2c7[ppl]){
var _2cb=_2c7[ppl].value.split(" ");
for(propertySetId in _2cb){
if((propertySetId.indexOf("..")==-1)&&(propertySetId.indexOf("://")==-1)){
var _2cc=this.getPropertySetById(propertySetId);
if(_2cc!=""){
_2c9.push(_2cc);
}
}else{
}
}
}
return (this.getPropertySetsByType(_2ca)).concat(_2c9);
};
this.createComponentFromScript=function(_2cd,_2ce,_2cf,_2d0){
var frag={};
var _2d2="dojo:"+_2ce.toLowerCase();
frag[_2d2]={};
var bo={};
_2cf.dojotype=_2ce;
for(var prop in _2cf){
if(typeof bo[prop]=="undefined"){
frag[_2d2][prop]=[{value:_2cf[prop]}];
}
}
frag[_2d2].nodeRef=_2cd;
frag.tagName=_2d2;
var _2d5=[frag];
if(_2d0){
_2d5[0].fastMixIn=true;
}
return this.createComponents(_2d5);
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.fromScript=function(name,_2d8,_2d9,_2da){
if((typeof name!="string")&&(typeof _2d8=="string")){
return dojo.widget._oldFromScript(name,_2d8,_2d9);
}
_2d8=_2d8||{};
var _2db=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_2d9){
_2db=true;
_2d9=tn;
if(h){
dojo.html.body().appendChild(_2d9);
}
}else{
if(_2da){
dojo.dom.insertAtPosition(tn,_2d9,_2da);
}else{
tn=_2d9;
}
}
var _2de=dojo.widget._oldFromScript(tn,name,_2d8);
if(!_2de[0]||typeof _2de[0].widgetType=="undefined"){
throw new Error("Creation of \""+name+"\" widget fromScript failed.");
}
if(_2db){
if(_2de[0].domNode.parentNode){
_2de[0].domNode.parentNode.removeChild(_2de[0].domNode);
}
}
return _2de[0];
};
dojo.widget._oldFromScript=function(_2df,name,_2e1){
var ln=name.toLowerCase();
var tn="dojo:"+ln;
_2e1[tn]={dojotype:[{value:ln}],nodeRef:_2df,fastMixIn:true};
var ret=dojo.widget.getParser().createComponentFromScript(_2df,name,_2e1,true);
return ret;
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.joinPath=function(){
var arr=[];
for(var i=0;i<arguments.length;i++){
arr.push(arguments[i]);
}
return arr.join("/").replace(/\/{2,}/g,"/").replace(/((https*|ftps*):)/i,"$1/");
};
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _2ea=new dojo.uri.Uri(arguments[i].toString());
var _2eb=new dojo.uri.Uri(uri.toString());
if(_2ea.path==""&&_2ea.scheme==null&&_2ea.authority==null&&_2ea.query==null){
if(_2ea.fragment!=null){
_2eb.fragment=_2ea.fragment;
}
_2ea=_2eb;
}else{
if(_2ea.scheme==null){
_2ea.scheme=_2eb.scheme;
if(_2ea.authority==null){
_2ea.authority=_2eb.authority;
if(_2ea.path.charAt(0)!="/"){
var path=_2eb.path.substring(0,_2eb.path.lastIndexOf("/")+1)+_2ea.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_2ea.path=segs.join("/");
}
}
}
}
uri="";
if(_2ea.scheme!=null){
uri+=_2ea.scheme+":";
}
if(_2ea.authority!=null){
uri+="//"+_2ea.authority;
}
uri+=_2ea.path;
if(_2ea.query!=null){
uri+="?"+_2ea.query;
}
if(_2ea.fragment!=null){
uri+="#"+_2ea.fragment;
}
}
this.uri=uri.toString();
var _2ef="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_2ef));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_2ef="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_2ef));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.hostenv.conditionalLoadModule({common:["dojo.uri.Uri",false,false]});
dojo.hostenv.moduleLoaded("dojo.uri.*");
dojo.provide("dojo.widget.DomWidget");
dojo.require("dojo.event.*");
dojo.require("dojo.string");
dojo.require("dojo.widget.Widget");
dojo.require("dojo.dom");
dojo.require("dojo.xml.Parse");
dojo.require("dojo.uri.*");
dojo.widget._cssFiles={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(obj,_2f2,_2f3,_2f4){
var _2f5=_2f2||obj.templatePath;
var _2f6=_2f3||obj.templateCssPath;
if(!_2f6&&obj.templateCSSPath){
obj.templateCssPath=_2f6=obj.templateCSSPath;
obj.templateCSSPath=null;
dj_deprecated("templateCSSPath is deprecated, use templateCssPath");
}
if(_2f5&&!(_2f5 instanceof dojo.uri.Uri)){
_2f5=dojo.uri.dojoUri(_2f5);
dj_deprecated("templatePath should be of type dojo.uri.Uri");
}
if(_2f6&&!(_2f6 instanceof dojo.uri.Uri)){
_2f6=dojo.uri.dojoUri(_2f6);
dj_deprecated("templateCssPath should be of type dojo.uri.Uri");
}
var _2f7=dojo.widget.DomWidget.templates;
if(!obj["widgetType"]){
do{
var _2f8="__dummyTemplate__"+dojo.widget.buildFromTemplate.dummyCount++;
}while(_2f7[_2f8]);
obj.widgetType=_2f8;
}
if((_2f6)&&(!dojo.widget._cssFiles[_2f6])){
dojo.html.insertCssFile(_2f6);
obj.templateCssPath=null;
dojo.widget._cssFiles[_2f6]=true;
}
var ts=_2f7[obj.widgetType];
if(!ts){
_2f7[obj.widgetType]={};
ts=_2f7[obj.widgetType];
}
if(!obj.templateString){
obj.templateString=_2f4||ts["string"];
}
if(!obj.templateNode){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_2f5)){
var _2fa=dojo.hostenv.getText(_2f5);
if(_2fa){
var _2fb=_2fa.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_2fb){
_2fa=_2fb[1];
}
}else{
_2fa="";
}
obj.templateString=_2fa;
ts.string=_2fa;
}
if(!ts["string"]){
ts.string=obj.templateString;
}
};
dojo.widget.buildFromTemplate.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.attachTemplateNodes=function(_2fc,_2fd,_2fe){
var _2ff=dojo.dom.ELEMENT_NODE;
if(!_2fc){
_2fc=_2fd.domNode;
}
if(_2fc.nodeType!=_2ff){
return;
}
var _300=_2fc.getElementsByTagName("*");
var _301=_2fd;
for(var x=-1;x<_300.length;x++){
var _303=(x==-1)?_2fc:_300[x];
var _304=[];
for(var y=0;y<this.attachProperties.length;y++){
var _306=_303.getAttribute(this.attachProperties[y]);
if(_306){
_304=_306.split(";");
for(var z=0;z<this.attachProperties.length;z++){
if((_2fd[_304[z]])&&(dojo.lang.isArray(_2fd[_304[z]]))){
_2fd[_304[z]].push(_303);
}else{
_2fd[_304[z]]=_303;
}
}
break;
}
}
var _308=_303.getAttribute(this.templateProperty);
if(_308){
_2fd[_308]=_303;
}
var _309=_303.getAttribute(this.eventAttachProperty);
if(_309){
var evts=_309.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _30b=null;
var tevt=dojo.string.trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _30d=tevt.split(":");
tevt=dojo.string.trim(_30d[0]);
_30b=dojo.string.trim(_30d[1]);
}
if(!_30b){
_30b=tevt;
}
var tf=function(){
var ntf=new String(_30b);
return function(evt){
if(_301[ntf]){
_301[ntf](dojo.event.browser.fixEvent(evt));
}
};
}();
dojo.event.browser.addListener(_303,tevt,tf,false,true);
}
}
for(var y=0;y<_2fe.length;y++){
var _311=_303.getAttribute(_2fe[y]);
if((_311)&&(_311.length)){
var _30b=null;
var _312=_2fe[y].substr(4);
_30b=dojo.string.trim(_311);
var tf=function(){
var ntf=new String(_30b);
return function(evt){
if(_301[ntf]){
_301[ntf](dojo.event.browser.fixEvent(evt));
}
};
}();
dojo.event.browser.addListener(_303,_312,tf,false,true);
}
}
var _315=_303.getAttribute(this.onBuildProperty);
if(_315){
eval("var node = baseNode; var widget = targetObj; "+_315);
}
_303.id="";
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].legth<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.widget.buildAndAttachTemplate=function(obj,_31e,_31f,_320,_321){
this.buildFromTemplate(obj,_31e,_31f,_320);
var node=dojo.dom.createNodesFromText(obj.templateString,true)[0];
this.attachTemplateNodes(node,_321||obj,dojo.widget.getDojoEventsFromStr(_320));
return node;
};
dojo.widget.DomWidget=function(){
dojo.widget.Widget.call(this);
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
};
dojo.inherits(dojo.widget.DomWidget,dojo.widget.Widget);
dojo.lang.extend(dojo.widget.DomWidget,{templateNode:null,templateString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_323,_324,pos,ref,_327){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
this.addWidgetAsDirectChild(_323,_324,pos,ref,_327);
this.registerChild(_323);
}
return _323;
},addWidgetAsDirectChild:function(_328,_329,pos,ref,_32c){
if((!this.containerNode)&&(!_329)){
this.containerNode=this.domNode;
}
var cn=(_329)?_329:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
ref=cn.lastChild;
}
if(!_32c){
_32c=0;
}
_328.domNode.setAttribute("dojoinsertionindex",_32c);
if(!ref){
cn.appendChild(_328.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_328.domNode,ref.parentNode,_32c);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_328.domNode);
}else{
dojo.dom.insertAtPosition(_328.domNode,cn,pos);
}
}
}
},registerChild:function(_32e,_32f){
_32e.dojoInsertionIndex=_32f;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<_32f){
idx=i;
}
}
this.children.splice(idx+1,0,_32e);
_32e.parent=this;
_32e.addedTo(this);
delete dojo.widget.manager.topWidgets[_32e.widgetId];
},removeChild:function(_332){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_332){
this.children.splice(x,1);
break;
}
}
return _332;
},getFragNodeRef:function(frag){
if(!frag["dojo:"+this.widgetType.toLowerCase()]){
dojo.raise("Error: no frag for widget type "+this.widgetType+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return (frag?frag["dojo:"+this.widgetType.toLowerCase()]["nodeRef"]:null);
},postInitialize:function(args,frag,_337){
var _338=this.getFragNodeRef(frag);
if(_337&&(_337.snarfChildDomOutput||!_338)){
_337.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_338);
}else{
if(_338){
if(this.domNode&&(this.domNode!==_338)){
var _339=_338.parentNode.replaceChild(this.domNode,_338);
}
}
}
if(_337){
_337.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.isContainer){
var _33a=dojo.widget.getParser();
_33a.createComponents(frag,this);
}
},startResize:function(_33b){
dj_unimplemented("dojo.widget.DomWidget.startResize");
},updateResize:function(_33c){
dj_unimplemented("dojo.widget.DomWidget.updateResize");
},endResize:function(_33d){
dj_unimplemented("dojo.widget.DomWidget.endResize");
},buildRendering:function(args,frag){
var ts=dojo.widget.DomWidget.templates[this.widgetType];
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var ts=dojo.widget.DomWidget.templates[this.widgetType];
if(ts){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _344=false;
var node=null;
var tstr=new String(this.templateString);
if((!this.templateNode)&&(this.templateString)){
_344=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_344){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_344.length;i++){
var key=_344[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?this[key.substring(5)]:hash[key];
var _34b;
if((kval)||(dojo.lang.isString(kval))){
_34b=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
tstr=tstr.replace(_344[i],_34b);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
ts.node=this.templateNode;
}
}
if((!this.templateNode)&&(!_344)){
dojo.debug("weren't able to create template!");
return false;
}else{
if(!_344){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes(this.domNode,this);
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_34d,_34e){
if(!_34e){
_34e=this;
}
return dojo.widget.attachTemplateNodes(_34d,_34e,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
var _34f=this.domNode.parentNode.removeChild(this.domNode);
delete _34f;
}
catch(e){
}
},cleanUp:function(){
},getContainerHeight:function(){
return dojo.html.getInnerHeight(this.domNode.parentNode);
},getContainerWidth:function(){
return dojo.html.getInnerWidth(this.domNode.parentNode);
},createNodesFromText:function(){
dj_unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.widget.DomWidget.templates={};
dojo.provide("dojo.math");
dojo.math.degToRad=function(x){
return (x*Math.PI)/180;
};
dojo.math.radToDeg=function(x){
return (x*180)/Math.PI;
};
dojo.math.factorial=function(n){
if(n<1){
return 0;
}
var _353=1;
for(var i=1;i<=n;i++){
_353*=i;
}
return _353;
};
dojo.math.permutations=function(n,k){
if(n==0||k==0){
return 1;
}
return (dojo.math.factorial(n)/dojo.math.factorial(n-k));
};
dojo.math.combinations=function(n,r){
if(n==0||r==0){
return 1;
}
return (dojo.math.factorial(n)/(dojo.math.factorial(n-r)*dojo.math.factorial(r)));
};
dojo.math.bernstein=function(t,n,i){
return (dojo.math.combinations(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i));
};
dojo.math.gaussianRandom=function(){
var k=2;
do{
var i=2*Math.random()-1;
var j=2*Math.random()-1;
k=i*i+j*j;
}while(k>=1);
k=Math.sqrt((-2*Math.log(k))/k);
return i*k;
};
dojo.math.mean=function(){
var _35f=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0;
for(var i=0;i<_35f.length;i++){
mean+=_35f[i];
}
return mean/_35f.length;
};
dojo.math.round=function(_362,_363){
if(!_363){
var _364=1;
}else{
var _364=Math.pow(10,_363);
}
return Math.round(_362*_364)/_364;
};
dojo.math.sd=function(){
var _365=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
return Math.sqrt(dojo.math.variance(_365));
};
dojo.math.variance=function(){
var _366=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0,squares=0;
for(var i=0;i<_366.length;i++){
mean+=_366[i];
squares+=Math.pow(_366[i],2);
}
return (squares/_366.length)-Math.pow(mean/_366.length,2);
};
dojo.provide("dojo.graphics.color");
dojo.require("dojo.lang");
dojo.require("dojo.string");
dojo.require("dojo.math");
dojo.graphics.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.graphics.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.graphics.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_36e){
if(_36e){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},toHsv:function(){
return dojo.graphics.color.rgb2hsv(this.toRgb());
},toHsl:function(){
return dojo.graphics.color.rgb2hsl(this.toRgb());
},blend:function(_36f,_370){
return dojo.graphics.color.blend(this.toRgb(),new Color(_36f).toRgb(),_370);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_373){
if(typeof a=="string"){
return dojo.graphics.color.blendHex(a,b,_373);
}
if(!_373){
_373=0;
}else{
if(_373>1){
_373=1;
}else{
if(_373<-1){
_373=-1;
}
}
}
var c=new Array(3);
for(var i=0;i<3;i++){
var half=Math.abs(a[i]-b[i])/2;
c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_373));
}
return c;
};
dojo.graphics.color.blendHex=function(a,b,_379){
return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_379));
};
dojo.graphics.color.extractRGB=function(_37a){
var hex="0123456789abcdef";
_37a=_37a.toLowerCase();
if(_37a.indexOf("rgb")==0){
var _37c=_37a.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_37c.splice(1,3);
return ret;
}else{
var _37e=dojo.graphics.color.hex2rgb(_37a);
if(_37e){
return _37e;
}else{
return dojo.graphics.color.named[_37a]||[255,255,255];
}
}
};
dojo.graphics.color.hex2rgb=function(hex){
var _380="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_380+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_380.indexOf(rgb[i].charAt(0))*16+_380.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
return ["#",dojo.string.pad(r.toString(16),2),dojo.string.pad(g.toString(16),2),dojo.string.pad(b.toString(16),2)].join("");
};
dojo.graphics.color.rgb2hsv=function(r,g,b){
if(dojo.lang.isArray(r)){
b=r[2]||0;
g=r[1]||0;
r=r[0]||0;
}
var h=null;
var s=null;
var v=null;
var min=Math.min(r,g,b);
v=Math.max(r,g,b);
var _38d=v-min;
s=(v==0)?0:_38d/v;
if(s==0){
h=0;
}else{
if(r==v){
h=60*(g-b)/_38d;
}else{
if(g==v){
h=120+60*(b-r)/_38d;
}else{
if(b==v){
h=240+60*(r-g)/_38d;
}
}
}
if(h<0){
h+=360;
}
}
h=(h==0)?360:Math.ceil((h/360)*255);
s=Math.ceil(s*255);
return [h,s,v];
};
dojo.graphics.color.hsv2rgb=function(h,s,v){
if(dojo.lang.isArray(h)){
v=h[2]||0;
s=h[1]||0;
h=h[0]||0;
}
h=(h/255)*360;
if(h==360){
h=0;
}
s=s/255;
v=v/255;
var r=null;
var g=null;
var b=null;
if(s==0){
r=v;
g=v;
b=v;
}else{
var _394=h/60;
var i=Math.floor(_394);
var f=_394-i;
var p=v*(1-s);
var q=v*(1-(s*f));
var t=v*(1-(s*(1-f)));
switch(i){
case 0:
r=v;
g=t;
b=p;
break;
case 1:
r=q;
g=v;
b=p;
break;
case 2:
r=p;
g=v;
b=t;
break;
case 3:
r=p;
g=q;
b=v;
break;
case 4:
r=t;
g=p;
b=v;
break;
case 5:
r=v;
g=p;
b=q;
break;
}
}
r=Math.ceil(r*255);
g=Math.ceil(g*255);
b=Math.ceil(b*255);
return [r,g,b];
};
dojo.graphics.color.rgb2hsl=function(r,g,b){
if(dojo.lang.isArray(r)){
b=r[2]||0;
g=r[1]||0;
r=r[0]||0;
}
r/=255;
g/=255;
b/=255;
var h=null;
var s=null;
var l=null;
var min=Math.min(r,g,b);
var max=Math.max(r,g,b);
var _3a2=max-min;
l=(min+max)/2;
s=0;
if((l>0)&&(l<1)){
s=_3a2/((l<0.5)?(2*l):(2-2*l));
}
h=0;
if(_3a2>0){
if((max==r)&&(max!=g)){
h+=(g-b)/_3a2;
}
if((max==g)&&(max!=b)){
h+=(2+(b-r)/_3a2);
}
if((max==b)&&(max!=r)){
h+=(4+(r-g)/_3a2);
}
h*=60;
}
h=(h==0)?360:Math.ceil((h/360)*255);
s=Math.ceil(s*255);
l=Math.ceil(l*255);
return [h,s,l];
};
dojo.graphics.color.hsl2rgb=function(h,s,l){
if(dojo.lang.isArray(h)){
l=h[2]||0;
s=h[1]||0;
h=h[0]||0;
}
h=(h/255)*360;
if(h==360){
h=0;
}
s=s/255;
l=l/255;
while(h<0){
h+=360;
}
while(h>360){
h-=360;
}
if(h<120){
r=(120-h)/60;
g=h/60;
b=0;
}else{
if(h<240){
r=0;
g=(240-h)/60;
b=(h-120)/60;
}else{
r=(h-240)/60;
g=0;
b=(360-h)/60;
}
}
r=Math.min(r,1);
g=Math.min(g,1);
b=Math.min(b,1);
r=2*s*r+(1-s);
g=2*s*g+(1-s);
b=2*s*b+(1-s);
if(l<0.5){
r=l*r;
g=l*g;
b=l*b;
}else{
r=(1-l)*r+2*l-1;
g=(1-l)*g+2*l-1;
b=(1-l)*b+2*l-1;
}
r=Math.ceil(r*255);
g=Math.ceil(g*255);
b=Math.ceil(b*255);
return [r,g,b];
};
dojo.provide("dojo.style");
dojo.require("dojo.dom");
dojo.require("dojo.uri.Uri");
dojo.require("dojo.graphics.color");
dojo.style.boxSizing={marginBox:"margin-box",borderBox:"border-box",paddingBox:"padding-box",contentBox:"content-box"};
dojo.style.getBoxSizing=function(node){
if(dojo.render.html.ie||dojo.render.html.opera){
var cm=document["compatMode"];
if(cm=="BackCompat"||cm=="QuirksMode"){
return dojo.style.boxSizing.borderBox;
}else{
return dojo.style.boxSizing.contentBox;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _3a8=dojo.style.getStyle(node,"-moz-box-sizing");
if(!_3a8){
_3a8=dojo.style.getStyle(node,"box-sizing");
}
return (_3a8?_3a8:dojo.style.boxSizing.contentBox);
}
};
dojo.style.isBorderBox=function(node){
return (dojo.style.getBoxSizing(node)==dojo.style.boxSizing.borderBox);
};
dojo.style.getUnitValue=function(_3aa,_3ab,_3ac){
var _3ad={value:0,units:"px"};
var s=dojo.style.getComputedStyle(_3aa,_3ab);
if(s==""||(s=="auto"&&_3ac)){
return _3ad;
}
if(dojo.lang.isUndefined(s)){
_3ad.value=NaN;
}else{
var _3af=s.match(/([\d.]+)([a-z%]*)/i);
if(!_3af){
_3ad.value=NaN;
}else{
_3ad.value=Number(_3af[1]);
_3ad.units=_3af[2].toLowerCase();
}
}
return _3ad;
};
dojo.style.getPixelValue=function(_3b0,_3b1,_3b2){
var _3b3=dojo.style.getUnitValue(_3b0,_3b1,_3b2);
if(isNaN(_3b3.value)||(_3b3.value&&_3b3.units!="px")){
return NaN;
}
return _3b3.value;
};
dojo.style.getNumericStyle=dojo.style.getPixelValue;
dojo.style.isPositionAbsolute=function(node){
return (dojo.style.getComputedStyle(node,"position")=="absolute");
};
dojo.style.getMarginWidth=function(node){
var _3b6=dojo.style.isPositionAbsolute(node);
var left=dojo.style.getPixelValue(node,"margin-left",_3b6);
var _3b8=dojo.style.getPixelValue(node,"margin-right",_3b6);
return left+_3b8;
};
dojo.style.getBorderWidth=function(node){
var left=(dojo.style.getStyle(node,"border-left-style")=="none"?0:dojo.style.getPixelValue(node,"border-left-width"));
var _3bb=(dojo.style.getStyle(node,"border-right-style")=="none"?0:dojo.style.getPixelValue(node,"border-right-width"));
return left+_3bb;
};
dojo.style.getPaddingWidth=function(node){
var left=dojo.style.getPixelValue(node,"padding-left",true);
var _3be=dojo.style.getPixelValue(node,"padding-right",true);
return left+_3be;
};
dojo.style.getContentWidth=function(node){
return node.offsetWidth-dojo.style.getPaddingWidth(node)-dojo.style.getBorderWidth(node);
};
dojo.style.getInnerWidth=function(node){
return node.offsetWidth;
};
dojo.style.getOuterWidth=function(node){
return dojo.style.getInnerWidth(node)+dojo.style.getMarginWidth(node);
};
dojo.style.setOuterWidth=function(node,_3c3){
if(!dojo.style.isBorderBox(node)){
_3c3-=dojo.style.getPaddingWidth(node)+dojo.style.getBorderWidth(node);
}
_3c3-=dojo.style.getMarginWidth(node);
if(!isNaN(_3c3)&&_3c3>0){
node.style.width=_3c3+"px";
return true;
}else{
return false;
}
};
dojo.style.getContentBoxWidth=dojo.style.getContentWidth;
dojo.style.getBorderBoxWidth=dojo.style.getInnerWidth;
dojo.style.getMarginBoxWidth=dojo.style.getOuterWidth;
dojo.style.setMarginBoxWidth=dojo.style.setOuterWidth;
dojo.style.getMarginHeight=function(node){
var _3c5=dojo.style.isPositionAbsolute(node);
var top=dojo.style.getPixelValue(node,"margin-top",_3c5);
var _3c7=dojo.style.getPixelValue(node,"margin-bottom",_3c5);
return top+_3c7;
};
dojo.style.getBorderHeight=function(node){
var top=(dojo.style.getStyle(node,"border-top-style")=="none"?0:dojo.style.getPixelValue(node,"border-top-width"));
var _3ca=(dojo.style.getStyle(node,"border-bottom-style")=="none"?0:dojo.style.getPixelValue(node,"border-bottom-width"));
return top+_3ca;
};
dojo.style.getPaddingHeight=function(node){
var top=dojo.style.getPixelValue(node,"padding-top",true);
var _3cd=dojo.style.getPixelValue(node,"padding-bottom",true);
return top+_3cd;
};
dojo.style.getContentHeight=function(node){
return node.offsetHeight-dojo.style.getPaddingHeight(node)-dojo.style.getBorderHeight(node);
};
dojo.style.getInnerHeight=function(node){
return node.offsetHeight;
};
dojo.style.getOuterHeight=function(node){
return dojo.style.getInnerHeight(node)+dojo.style.getMarginHeight(node);
};
dojo.style.setOuterHeight=function(node,_3d2){
if(!dojo.style.isBorderBox(node)){
_3d2-=dojo.style.getPaddingHeight(node)+dojo.style.getBorderHeight(node);
}
_3d2-=dojo.style.getMarginHeight(node);
if(!isNaN(_3d2)&&_3d2>0){
node.style.height=_3d2+"px";
return true;
}else{
return false;
}
};
dojo.style.setContentWidth=function(node,_3d4){
if(dojo.style.isBorderBox(node)){
_3d4+=dojo.style.getPaddingWidth(node)+dojo.style.getBorderWidth(node);
}
if(!isNaN(_3d4)&&_3d4>0){
node.style.width=_3d4+"px";
return true;
}else{
return false;
}
};
dojo.style.setContentHeight=function(node,_3d6){
if(dojo.style.isBorderBox(node)){
_3d6+=dojo.style.getPaddingHeight(node)+dojo.style.getBorderHeight(node);
}
if(!isNaN(_3d6)&&_3d6>0){
node.style.height=_3d6+"px";
return true;
}else{
return false;
}
};
dojo.style.getContentBoxHeight=dojo.style.getContentHeight;
dojo.style.getBorderBoxHeight=dojo.style.getInnerHeight;
dojo.style.getMarginBoxHeight=dojo.style.getOuterHeight;
dojo.style.setMarginBoxHeight=dojo.style.setOuterHeight;
dojo.style.getTotalOffset=function(node,type,_3d9){
var _3da=(type=="top")?"offsetTop":"offsetLeft";
var _3db=(type=="top")?"scrollTop":"scrollLeft";
var alt=(type=="top")?"y":"x";
var ret=0;
if(node["offsetParent"]){
if(_3d9&&node.parentNode!=document.body){
ret-=dojo.style.sumAncestorProperties(node,_3db);
}
do{
ret+=node[_3da];
node=node.offsetParent;
}while(node!=document.getElementsByTagName("body")[0].parentNode&&node!=null);
}else{
if(node[alt]){
ret+=node[alt];
}
}
return ret;
};
dojo.style.sumAncestorProperties=function(node,prop){
if(!node){
return 0;
}
var _3e0=0;
while(node){
var val=node[prop];
if(val){
_3e0+=val-0;
}
node=node.parentNode;
}
return _3e0;
};
dojo.style.totalOffsetLeft=function(node,_3e3){
return dojo.style.getTotalOffset(node,"left",_3e3);
};
dojo.style.getAbsoluteX=dojo.style.totalOffsetLeft;
dojo.style.totalOffsetTop=function(node,_3e5){
return dojo.style.getTotalOffset(node,"top",_3e5);
};
dojo.style.getAbsoluteY=dojo.style.totalOffsetTop;
dojo.style.getAbsolutePosition=function(node,_3e7){
var _3e8=[dojo.style.getAbsoluteX(node,_3e7),dojo.style.getAbsoluteY(node,_3e7)];
_3e8.x=_3e8[0];
_3e8.y=_3e8[1];
return _3e8;
};
dojo.style.styleSheet=null;
dojo.style.insertCssRule=function(_3e9,_3ea,_3eb){
if(!dojo.style.styleSheet){
if(document.createStyleSheet){
dojo.style.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.style.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.style.styleSheet.cssRules){
_3eb=dojo.style.styleSheet.cssRules.length;
}else{
if(dojo.style.styleSheet.rules){
_3eb=dojo.style.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.style.styleSheet.insertRule){
var rule=_3e9+" { "+_3ea+" }";
return dojo.style.styleSheet.insertRule(rule,_3eb);
}else{
if(dojo.style.styleSheet.addRule){
return dojo.style.styleSheet.addRule(_3e9,_3ea,_3eb);
}else{
return null;
}
}
};
dojo.style.removeCssRule=function(_3ed){
if(!dojo.style.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_3ed){
_3ed=dojo.style.styleSheet.rules.length;
dojo.style.styleSheet.removeRule(_3ed);
}
}else{
if(document.styleSheets[0]){
if(!_3ed){
_3ed=dojo.style.styleSheet.cssRules.length;
}
dojo.style.styleSheet.deleteRule(_3ed);
}
}
return true;
};
dojo.style.insertCssFile=function(URI,doc,_3f0){
if(!URI){
return;
}
if(!doc){
doc=document;
}
if(doc.baseURI){
URI=new dojo.uri.Uri(doc.baseURI,URI);
}
if(_3f0&&doc.styleSheets){
var loc=location.href.split("#")[0].substring(0,location.href.indexOf(location.pathname));
for(var i=0;i<doc.styleSheets.length;i++){
if(doc.styleSheets[i].href&&URI.toString()==new dojo.uri.Uri(doc.styleSheets[i].href.toString())){
return;
}
}
}
var file=doc.createElement("link");
file.setAttribute("type","text/css");
file.setAttribute("rel","stylesheet");
file.setAttribute("href",URI);
var head=doc.getElementsByTagName("head")[0];
if(head){
head.appendChild(file);
}
};
dojo.style.getBackgroundColor=function(node){
var _3f6;
do{
_3f6=dojo.style.getStyle(node,"background-color");
if(_3f6.toLowerCase()=="rgba(0, 0, 0, 0)"){
_3f6="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(_3f6,["transparent",""]));
if(_3f6=="transparent"){
_3f6=[255,255,255,0];
}else{
_3f6=dojo.graphics.color.extractRGB(_3f6);
}
return _3f6;
};
dojo.style.getComputedStyle=function(_3f7,_3f8,_3f9){
var _3fa=_3f9;
if(_3f7.style.getPropertyValue){
_3fa=_3f7.style.getPropertyValue(_3f8);
}
if(!_3fa){
if(document.defaultView){
_3fa=document.defaultView.getComputedStyle(_3f7,"").getPropertyValue(_3f8);
}else{
if(_3f7.currentStyle){
_3fa=_3f7.currentStyle[dojo.style.toCamelCase(_3f8)];
}
}
}
return _3fa;
};
dojo.style.getStyle=function(_3fb,_3fc){
var _3fd=dojo.style.toCamelCase(_3fc);
var _3fe=_3fb.style[_3fd];
return (_3fe?_3fe:dojo.style.getComputedStyle(_3fb,_3fc,_3fe));
};
dojo.style.toCamelCase=function(_3ff){
var arr=_3ff.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.style.toSelectorCase=function(_402){
return _402.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.style.setOpacity=function setOpacity(node,_404,_405){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_405){
if(_404>=1){
if(h.ie){
dojo.style.clearOpacity(node);
return;
}else{
_404=0.999999;
}
}else{
if(_404<0){
_404=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_404*100+")";
}
}
node.style.filter="Alpha(Opacity="+_404*100+")";
}else{
if(h.moz){
node.style.opacity=_404;
node.style.MozOpacity=_404;
}else{
if(h.safari){
node.style.opacity=_404;
node.style.KhtmlOpacity=_404;
}else{
node.style.opacity=_404;
}
}
}
};
dojo.style.getOpacity=function getOpacity(node){
if(dojo.render.html.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.style.clearOpacity=function clearOpacity(node){
var h=dojo.render.html;
if(h.ie){
if(node.filters&&node.filters.alpha){
node.style.filter="";
}
}else{
if(h.moz){
node.style.opacity=1;
node.style.MozOpacity=1;
}else{
if(h.safari){
node.style.opacity=1;
node.style.KhtmlOpacity=1;
}else{
node.style.opacity=1;
}
}
}
};
dojo.provide("dojo.html");
dojo.require("dojo.dom");
dojo.require("dojo.style");
dojo.require("dojo.string");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.lang.mixin(dojo.html,dojo.style);
dojo.html.clearSelection=function(){
try{
if(window["getSelection"]){
if(dojo.render.html.safari){
window.getSelection().collapse();
}else{
window.getSelection().removeAllRanges();
}
}else{
if((document.selection)&&(document.selection.clear)){
document.selection.clear();
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_40d){
_40d=_40d||dojo.html.body();
var h=dojo.render.html;
if(h.mozilla){
_40d.style.MozUserSelect="none";
}else{
if(h.safari){
_40d.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_40d.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_40f){
_40f=_40f||dojo.html.body();
var h=dojo.render.html;
if(h.mozilla){
_40f.style.MozUserSelect="";
}else{
if(h.safari){
_40f.style.KhtmlUserSelect="";
}else{
if(h.ie){
_40f.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_411){
if(document.selection&&dojo.html.body().createTextRange){
var _412=dojo.html.body().createTextRange();
_412.moveToElementText(_411);
_412.select();
}else{
if(window["getSelection"]){
var _413=window.getSelection();
if(_413["selectAllChildren"]){
_413.selectAllChildren(_411);
}
}
}
};
dojo.html.isSelectionCollapsed=function(){
if(document["selection"]){
return document.selection.createRange().text=="";
}else{
if(window["getSelection"]){
var _414=window.getSelection();
if(dojo.lang.isString(_414)){
return _414=="";
}else{
return _414.isCollapsed;
}
}
}
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=window.event||{};
}
if(evt.srcElement){
return evt.srcElement;
}else{
if(evt.target){
return evt.target;
}
}
return null;
};
dojo.html.getScrollTop=function(){
return document.documentElement.scrollTop||dojo.html.body().scrollTop||0;
};
dojo.html.getScrollLeft=function(){
return document.documentElement.scrollLeft||dojo.html.body().scrollLeft||0;
};
dojo.html.getDocumentWidth=function(){
dojo.deprecated("dojo.html.getDocument* has been deprecated in favor of dojo.html.getViewport*");
return dojo.html.getViewportWidth();
};
dojo.html.getDocumentHeight=function(){
dojo.deprecated("dojo.html.getDocument* has been deprecated in favor of dojo.html.getViewport*");
return dojo.html.getViewportHeight();
};
dojo.html.getDocumentSize=function(){
dojo.deprecated("dojo.html.getDocument* has been deprecated in favor of dojo.html.getViewport*");
return dojo.html.getViewportSize();
};
dojo.html.getViewportWidth=function(){
var w=0;
if(window.innerWidth){
w=window.innerWidth;
}
if(dojo.exists(document,"documentElement.clientWidth")){
var w2=document.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
return w;
}
if(document.body){
return document.body.clientWidth;
}
return 0;
};
dojo.html.getViewportHeight=function(){
if(window.innerHeight){
return window.innerHeight;
}
if(dojo.exists(document,"documentElement.clientHeight")){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return 0;
};
dojo.html.getViewportSize=function(){
var ret=[dojo.html.getViewportWidth(),dojo.html.getViewportHeight()];
ret.w=ret[0];
ret.h=ret[1];
return ret;
};
dojo.html.getScrollOffset=function(){
var ret=[0,0];
if(window.pageYOffset){
ret=[window.pageXOffset,window.pageYOffset];
}else{
if(dojo.exists(document,"documentElement.scrollTop")){
ret=[document.documentElement.scrollLeft,document.documentElement.scrollTop];
}else{
if(document.body){
ret=[document.body.scrollLeft,document.body.scrollTop];
}
}
}
ret.x=ret[0];
ret.y=ret[1];
return ret;
};
dojo.html.getParentOfType=function(node,type){
dojo.deprecated("dojo.html.getParentOfType has been deprecated in favor of dojo.html.getParentByType*");
return dojo.html.getParentByType(node,type);
};
dojo.html.getParentByType=function(node,type){
var _41e=node;
type=type.toLowerCase();
while((_41e)&&(_41e.nodeName.toLowerCase()!=type)){
if(_41e==(document["body"]||document["documentElement"])){
return null;
}
_41e=_41e.parentNode;
}
return _41e;
};
dojo.html.getAttribute=function(node,attr){
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(node,attr)?true:false;
};
dojo.html.getClass=function(node){
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return dojo.string.trim(cs);
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_42a){
return dojo.lang.inArray(dojo.html.getClasses(node),_42a);
};
dojo.html.prependClass=function(node,_42c){
if(!node){
return false;
}
_42c+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_42c);
};
dojo.html.addClass=function(node,_42e){
if(!node){
return false;
}
if(dojo.html.hasClass(node,_42e)){
return false;
}
_42e=dojo.string.trim(dojo.html.getClass(node)+" "+_42e);
return dojo.html.setClass(node,_42e);
};
dojo.html.setClass=function(node,_430){
if(!node){
return false;
}
var cs=new String(_430);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_430);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_433,_434){
if(!node){
return false;
}
var _433=dojo.string.trim(new String(_433));
try{
var cs=dojo.html.getClasses(node);
var nca=[];
if(_434){
for(var i=0;i<cs.length;i++){
if(cs[i].indexOf(_433)==-1){
nca.push(cs[i]);
}
}
}else{
for(var i=0;i<cs.length;i++){
if(cs[i]!=_433){
nca.push(cs[i]);
}
}
}
dojo.html.setClass(node,nca.join(" "));
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_439,_43a){
dojo.html.removeClass(node,_43a);
dojo.html.addClass(node,_439);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_43b,_43c,_43d,_43e){
if(!_43c){
_43c=document;
}
var _43f=_43b.split(/\s+/g);
var _440=[];
if(_43e!=1&&_43e!=2){
_43e=0;
}
var _441=new RegExp("(\\s|^)(("+_43f.join(")|(")+"))(\\s|$)");
if(!_43d){
_43d="*";
}
var _442=_43c.getElementsByTagName(_43d);
outer:
for(var i=0;i<_442.length;i++){
var node=_442[i];
var _445=dojo.html.getClasses(node);
if(_445.length==0){
continue outer;
}
var _446=0;
for(var j=0;j<_445.length;j++){
if(_441.test(_445[j])){
if(_43e==dojo.html.classMatchType.ContainsAny){
_440.push(node);
continue outer;
}else{
_446++;
}
}else{
if(_43e==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_446==_43f.length){
if(_43e==dojo.html.classMatchType.IsOnly&&_446==_445.length){
_440.push(node);
}else{
if(_43e==dojo.html.classMatchType.ContainsAll){
_440.push(node);
}
}
}
}
return _440;
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.gravity=function(node,e){
var _44a=e.pageX||e.clientX+dojo.html.body().scrollLeft;
var _44b=e.pageY||e.clientY+dojo.html.body().scrollTop;
with(dojo.html){
var _44c=getAbsoluteX(node)+(getInnerWidth(node)/2);
var _44d=getAbsoluteY(node)+(getInnerHeight(node)/2);
}
with(dojo.html.gravity){
return ((_44a<_44c?WEST:EAST)|(_44b<_44d?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_44e,e){
var _450=e.pageX||e.clientX+dojo.html.body().scrollLeft;
var _451=e.pageY||e.clientY+dojo.html.body().scrollTop;
with(dojo.html){
var top=getAbsoluteY(_44e);
var _453=top+getInnerHeight(_44e);
var left=getAbsoluteX(_44e);
var _455=left+getInnerWidth(_44e);
}
return (_450>=left&&_450<=_455&&_451>=top&&_451<=_453);
};
dojo.html.renderedTextContent=function(node){
var _457="";
if(node==null){
return _457;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _459="unknown";
try{
_459=dojo.style.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_459){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_457+="\n";
_457+=dojo.html.renderedTextContent(node.childNodes[i]);
_457+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_457+="\n";
}else{
_457+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _45b="unknown";
try{
_45b=dojo.style.getStyle(node,"text-transform");
}
catch(E){
}
switch(_45b){
case "capitalize":
text=dojo.string.capitalize(text);
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_45b){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_457)){
text.replace(/^\s/,"");
}
break;
}
_457+=text;
break;
default:
break;
}
}
return _457;
};
dojo.html.setActiveStyleSheet=function(_45c){
var i,a,main;
for(i=0;(a=document.getElementsByTagName("link")[i]);i++){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_45c){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i,a;
for(i=0;(a=document.getElementsByTagName("link")[i]);i++){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i,a;
for(i=0;(a=document.getElementsByTagName("link")[i]);i++){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.body=function(){
return document.body||document.getElementsByTagName("body")[0];
};
dojo.html.createNodesFromText=function(txt,wrap){
var tn=document.createElement("div");
tn.style.visibility="hidden";
document.body.appendChild(tn);
tn.innerHTML=txt;
tn.normalize();
if(wrap){
var ret=[];
var fc=tn.firstChild;
ret[0]=((fc.nodeValue==" ")||(fc.nodeValue=="\t"))?fc.nextSibling:fc;
document.body.removeChild(tn);
return ret;
}
var _465=[];
for(var x=0;x<tn.childNodes.length;x++){
_465.push(tn.childNodes[x].cloneNode(true));
}
tn.style.display="none";
document.body.removeChild(tn);
return _465;
};
if(!dojo.evalObjPath("dojo.dom.createNodesFromText")){
dojo.dom.createNodesFromText=function(){
dojo.deprecated("dojo.dom.createNodesFromText","use dojo.html.createNodesFromText instead");
return dojo.html.createNodesFromText.apply(dojo.html,arguments);
};
}
dojo.html.isVisible=function(node){
return dojo.style.getComputedStyle(node||this.domNode,"display")!="none";
};
dojo.html.show=function(node){
if(node.style){
node.style.display=dojo.lang.inArray(["tr","td","th"],node.tagName.toLowerCase())?"":"block";
}
};
dojo.html.hide=function(node){
if(node.style){
node.style.display="none";
}
};
dojo.html.toCoordinateArray=function(_46a,_46b){
if(dojo.lang.isArray(_46a)){
while(_46a.length<4){
_46a.push(0);
}
while(_46a.length>4){
_46a.pop();
}
var ret=_46a;
}else{
var node=dojo.byId(_46a);
var ret=[dojo.html.getAbsoluteX(node,_46b),dojo.html.getAbsoluteY(node,_46b),dojo.html.getInnerWidth(node),dojo.html.getInnerHeight(node)];
}
ret.x=ret[0];
ret.y=ret[1];
ret.w=ret[2];
ret.h=ret[3];
return ret;
};
dojo.html.placeOnScreen=function(node,_46f,_470,_471,_472){
if(dojo.lang.isArray(_46f)){
_472=_471;
_471=_470;
_470=_46f[1];
_46f=_46f[0];
}
if(!isNaN(_471)){
_471=[Number(_471),Number(_471)];
}else{
if(!dojo.lang.isArray(_471)){
_471=[0,0];
}
}
var _473=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var w=node.offsetWidth+_471[0];
var h=node.offsetHeight+_471[1];
if(_472){
_46f-=_473.x;
_470-=_473.y;
}
var x=_46f+w;
if(x>view.w){
x=view.w-w;
}else{
x=_46f;
}
x=Math.max(_471[0],x)+_473.x;
var y=_470+h;
if(y>view.h){
y=view.h-h;
}else{
y=_470;
}
y=Math.max(_471[1],y)+_473.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.placeOnScreenPoint=function(node,_47b,_47c,_47d,_47e){
if(dojo.lang.isArray(_47b)){
_47e=_47d;
_47d=_47c;
_47c=_47b[1];
_47b=_47b[0];
}
var _47f=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var w=node.offsetWidth;
var h=node.offsetHeight;
if(_47e){
_47b-=_47f.x;
_47c-=_47f.y;
}
var x=-1,y=-1;
if(_47b+w<=view.w&&_47c+h<=view.h){
x=_47b;
y=_47c;
}
if((x<0||y<0)&&_47b<=view.w&&_47c+h<=view.h){
x=_47b-w;
y=_47c;
}
if((x<0||y<0)&&_47b+w<=view.w&&_47c<=view.h){
x=_47b;
y=_47c-h;
}
if((x<0||y<0)&&_47b<=view.w&&_47c<=view.h){
x=_47b-w;
y=_47c-h;
}
if(x<0||y<0||(x+w>view.w)||(y+h>view.h)){
return dojo.html.placeOnScreen(node,_47b,_47c,_47d,_47e);
}
x+=_47f.x;
y+=_47f.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.BackgroundIframe=function(){
if(this.ie){
this.iframe=document.createElement("<iframe frameborder='0' src='about:blank'>");
var s=this.iframe.style;
s.position="absolute";
s.left=s.top="0px";
s.zIndex=2;
s.display="none";
dojo.style.setOpacity(this.iframe,0);
dojo.html.body().appendChild(this.iframe);
}else{
this.enabled=false;
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{ie:dojo.render.html.ie,enabled:true,visibile:false,iframe:null,sizeNode:null,sizeCoords:null,size:function(node){
if(!this.ie||!this.enabled){
return;
}
if(dojo.dom.isNode(node)){
this.sizeNode=node;
}else{
if(arguments.length>0){
this.sizeNode=null;
this.sizeCoords=node;
}
}
this.update();
},update:function(){
if(!this.ie||!this.enabled){
return;
}
if(this.sizeNode){
this.sizeCoords=dojo.html.toCoordinateArray(this.sizeNode,true);
}else{
if(this.sizeCoords){
this.sizeCoords=dojo.html.toCoordinateArray(this.sizeCoords,true);
}else{
return;
}
}
var s=this.iframe.style;
var dims=this.sizeCoords;
s.width=dims.w+"px";
s.height=dims.h+"px";
s.left=dims.x+"px";
s.top=dims.y+"px";
},setZIndex:function(node){
if(!this.ie||!this.enabled){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.zIndex=node;
}
}
},show:function(node){
if(!this.ie||!this.enabled){
return;
}
this.size(node);
this.iframe.style.display="block";
},hide:function(){
if(!this.ie){
return;
}
var s=this.iframe.style;
s.display="none";
s.width=s.height="1px";
},remove:function(){
dojo.dom.removeNode(this.iframe);
}});
dojo.provide("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.DomWidget");
dojo.require("dojo.html");
dojo.require("dojo.string");
dojo.widget.HtmlWidget=function(args){
dojo.widget.DomWidget.call(this);
};
dojo.inherits(dojo.widget.HtmlWidget,dojo.widget.DomWidget);
dojo.lang.extend(dojo.widget.HtmlWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,allowResizeX:true,allowResizeY:true,resizeGhost:null,initialResizeCoords:null,toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
dojo.lang.mixin(this,dojo.widget.HtmlWidget.Toggle[dojo.string.capitalize(this.toggle)]||dojo.widget.HtmlWidget.Toggle.Plain);
},getContainerHeight:function(){
dj_unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_491){
var ch=this.getContainerHeight();
},startResize:function(_493){
_493.offsetLeft=dojo.html.totalOffsetLeft(this.domNode);
_493.offsetTop=dojo.html.totalOffsetTop(this.domNode);
_493.innerWidth=dojo.html.getInnerWidth(this.domNode);
_493.innerHeight=dojo.html.getInnerHeight(this.domNode);
if(!this.resizeGhost){
this.resizeGhost=document.createElement("div");
var rg=this.resizeGhost;
rg.style.position="absolute";
rg.style.backgroundColor="white";
rg.style.border="1px solid black";
dojo.html.setOpacity(rg,0.3);
dojo.html.body().appendChild(rg);
}
with(this.resizeGhost.style){
left=_493.offsetLeft+"px";
top=_493.offsetTop+"px";
}
this.initialResizeCoords=_493;
this.resizeGhost.style.display="";
this.updateResize(_493,true);
},updateResize:function(_495,_496){
var dx=_495.x-this.initialResizeCoords.x;
var dy=_495.y-this.initialResizeCoords.y;
with(this.resizeGhost.style){
if((this.allowResizeX)||(_496)){
width=this.initialResizeCoords.innerWidth+dx+"px";
}
if((this.allowResizeY)||(_496)){
height=this.initialResizeCoords.innerHeight+dy+"px";
}
}
},endResize:function(_499){
var dx=_499.x-this.initialResizeCoords.x;
var dy=_499.y-this.initialResizeCoords.y;
with(this.domNode.style){
if(this.allowResizeX){
width=this.initialResizeCoords.innerWidth+dx+"px";
}
if(this.allowResizeY){
height=this.initialResizeCoords.innerHeight+dy+"px";
}
}
this.resizeGhost.style.display="none";
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},_old_buildFromTemplate:dojo.widget.DomWidget.prototype.buildFromTemplate,buildFromTemplate:function(args,frag){
if(dojo.widget.DomWidget.templates[this.widgetType]){
var ot=dojo.widget.DomWidget.templates[this.widgetType];
dojo.widget.DomWidget.templates[this.widgetType]={};
}
dojo.widget.buildFromTemplate(this,args["templatePath"],args["templateCssPath"]);
this._old_buildFromTemplate(args,frag);
dojo.widget.DomWidget.templates[this.widgetType]=ot;
},destroyRendering:function(_4a1){
try{
var _4a2=this.domNode.parentNode.removeChild(this.domNode);
if(!_4a1){
dojo.event.browser.clean(_4a2);
}
delete _4a2;
}
catch(e){
}
},isVisible:function(){
return dojo.html.isVisible(this.domNode);
},doToggle:function(){
this.isVisible()?this.hide():this.show();
},show:function(){
this.showMe();
},onShow:function(){
},hide:function(){
this.hideMe();
},onHide:function(){
}});
dojo.widget.HtmlWidget.Toggle={};
dojo.widget.HtmlWidget.Toggle.Plain={showMe:function(){
dojo.html.show(this.domNode);
if(dojo.lang.isFunction(this.onShow)){
this.onShow();
}
},hideMe:function(){
dojo.html.hide(this.domNode);
if(dojo.lang.isFunction(this.onHide)){
this.onHide();
}
}};
dojo.widget.HtmlWidget.Toggle.Fade={showMe:function(){
dojo.fx.html.fadeShow(this.domNode,this.toggleDuration,dojo.lang.hitch(this,this.onShow));
},hideMe:function(){
dojo.fx.html.fadeHide(this.domNode,this.toggleDuration,dojo.lang.hitch(this,this.onHide));
}};
dojo.widget.HtmlWidget.Toggle.Wipe={showMe:function(){
dojo.fx.html.wipeIn(this.domNode,this.toggleDuration,dojo.lang.hitch(this,this.onShow));
},hideMe:function(){
dojo.fx.html.wipeOut(this.domNode,this.toggleDuration,dojo.lang.hitch(this,this.onHide));
}};
dojo.widget.HtmlWidget.Toggle.Explode={showMe:function(){
dojo.fx.html.explode(this.explodeSrc,this.domNode,this.toggleDuration,dojo.lang.hitch(this,this.onShow));
},hideMe:function(){
dojo.fx.html.implode(this.domNode,this.explodeSrc,this.toggleDuration,dojo.lang.hitch(this,this.onHide));
}};
dojo.hostenv.conditionalLoadModule({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"]});
dojo.hostenv.moduleLoaded("dojo.widget.*");
dojo.provide("dojo.io.IO");
dojo.require("dojo.string");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error"];
dojo.io.Request=function(url,_4a4,_4a5,_4a6){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_4a4){
this.mimetype=_4a4;
}
if(_4a5){
this.transport=_4a5;
}
if(arguments.length>=4){
this.changeUrl=_4a6;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_4ab){
},handle:function(){
},abort:function(){
},fromKwArgs:function(_4ac){
if(_4ac["url"]){
_4ac.url=_4ac.url.toString();
}
if(!_4ac["method"]&&_4ac["formNode"]&&_4ac["formNode"].method){
_4ac.method=_4ac["formNode"].method;
}
if(!_4ac["handle"]&&_4ac["handler"]){
_4ac.handle=_4ac.handler;
}
if(!_4ac["load"]&&_4ac["loaded"]){
_4ac.load=_4ac.loaded;
}
if(!_4ac["changeUrl"]&&_4ac["changeURL"]){
_4ac.changeUrl=_4ac.changeURL;
}
if(!_4ac["encoding"]){
if(!dojo.lang.isUndefined(djConfig["bindEncoding"])){
_4ac.encoding=djConfig.bindEncoding;
}else{
_4ac.encoding="";
}
}
var _4ad=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_4ad(_4ac[fn])){
continue;
}
if(_4ad(_4ac["handle"])){
_4ac[fn]=_4ac.handle;
}
}
dojo.lang.mixin(this,_4ac);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_4b4){
if(!(_4b4 instanceof dojo.io.Request)){
try{
_4b4=new dojo.io.Request(_4b4);
}
catch(e){
dojo.debug(e);
}
}
var _4b5="";
if(_4b4["transport"]){
_4b5=_4b4["transport"];
if(!this[_4b5]){
return _4b4;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_4b4))){
_4b5=tmp;
}
}
if(_4b5==""){
return _4b4;
}
}
this[_4b5].bind(_4b4);
_4b4.bindSuccess=true;
return _4b4;
};
dojo.io.queueBind=function(_4b8){
if(!(_4b8 instanceof dojo.io.Request)){
try{
_4b8=new dojo.io.Request(_4b8);
}
catch(e){
dojo.debug(e);
}
}
var _4b9=_4b8.load;
_4b8.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_4b9.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _4bb=_4b8.error;
_4b8.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_4bb.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_4b8);
dojo.io._dispatchNextQueueBind();
return _4b8;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
dojo.io.bind(dojo.io._bindQueue.shift());
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_4be){
var _4bf=new Object();
var _4c0="";
var enc=/utf/i.test(_4be||"")?encodeURIComponent:dojo.string.encodeAscii;
for(var x in map){
if(!_4bf[x]){
_4c0+=enc(x)+"="+enc(map[x])+"&";
}
}
return _4c0;
};
dojo.provide("dojo.io.BrowserIO");
dojo.require("dojo.io");
dojo.require("dojo.lang");
dojo.require("dojo.dom");
try{
if((!djConfig.preventBackButtonFix)&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
dojo.io.checkChildrenForFile=function(node){
var _4c4=false;
var _4c5=node.getElementsByTagName("input");
dojo.lang.forEach(_4c5,function(_4c6){
if(_4c4){
return;
}
if(_4c6.getAttribute("type")=="file"){
_4c4=true;
}
});
return _4c4;
};
dojo.io.formHasFile=function(_4c7){
return dojo.io.checkChildrenForFile(_4c7);
};
dojo.io.encodeForm=function(_4c8,_4c9){
if((!_4c8)||(!_4c8.tagName)||(!_4c8.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
var enc=/utf/i.test(_4c9||"")?encodeURIComponent:dojo.string.encodeAscii;
var _4cb=[];
for(var i=0;i<_4c8.elements.length;i++){
var elm=_4c8.elements[i];
if(elm.disabled||elm.tagName.toLowerCase()=="fieldset"||!elm.name){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_4cb.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(type,["radio","checkbox"])){
if(elm.checked){
_4cb.push(name+"="+enc(elm.value));
}
}else{
if(!dojo.lang.inArray(type,["file","submit","reset","button"])){
_4cb.push(name+"="+enc(elm.value));
}
}
}
}
var _4d1=_4c8.getElementsByTagName("input");
for(var i=0;i<_4d1.length;i++){
var _4d2=_4d1[i];
if(_4d2.type.toLowerCase()=="image"&&_4d2.form==_4c8){
var name=enc(_4d2.name);
_4cb.push(name+"="+enc(_4d2.value));
_4cb.push(name+".x=0");
_4cb.push(name+".y=0");
}
}
return _4cb.join("&")+"&";
};
dojo.io.setIFrameSrc=function(_4d3,src,_4d5){
try{
var r=dojo.render.html;
if(!_4d5){
if(r.safari){
_4d3.location=src;
}else{
frames[_4d3.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_4d3.contentWindow.document;
}else{
if(r.moz){
idoc=_4d3.contentWindow;
}
}
idoc.location.replace(src);
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.io.XMLHTTPTransport=new function(){
var _4d8=this;
this.initialHref=window.location.href;
this.initialHash=window.location.hash;
this.moveForward=false;
var _4d9={};
this.useCache=false;
this.preventCache=false;
this.historyStack=[];
this.forwardStack=[];
this.historyIframe=null;
this.bookmarkAnchor=null;
this.locationTimer=null;
function getCacheKey(url,_4db,_4dc){
return url+"|"+_4db+"|"+_4dc.toLowerCase();
}
function addToCache(url,_4de,_4df,http){
_4d9[getCacheKey(url,_4de,_4df)]=http;
}
function getFromCache(url,_4e2,_4e3){
return _4d9[getCacheKey(url,_4e2,_4e3)];
}
this.clearCache=function(){
_4d9={};
};
function doLoad(_4e4,http,url,_4e7,_4e8){
if((http.status==200)||(location.protocol=="file:"&&http.status==0)){
var ret;
if(_4e4.method.toLowerCase()=="head"){
var _4ea=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _4ea;
};
var _4eb=_4ea.split(/[\r\n]+/g);
for(var i=0;i<_4eb.length;i++){
var pair=_4eb[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_4e4.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_4e4.mimetype=="text/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_4e4.mimetype=="application/xml")||(_4e4.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_4e8){
addToCache(url,_4e7,_4e4.method,http);
}
_4e4[(typeof _4e4.load=="function")?"load":"handle"]("load",ret,http);
}else{
var _4ee=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_4e4[(typeof _4e4.error=="function")?"error":"handle"]("error",_4ee,http);
}
}
function setHeaders(http,_4f0){
if(_4f0["headers"]){
for(var _4f1 in _4f0["headers"]){
if(_4f1.toLowerCase()=="content-type"&&!_4f0["contentType"]){
_4f0["contentType"]=_4f0["headers"][_4f1];
}else{
http.setRequestHeader(_4f1,_4f0["headers"][_4f1]);
}
}
}
}
this.addToHistory=function(args){
var _4f3=args["back"]||args["backButton"]||args["handle"];
var hash=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
(document.body||document.getElementsByTagName("body")[0]).appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if((!args["changeUrl"])||(dojo.render.html.ie)){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
setTimeout("window.location.href = '"+hash+"';",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
var _4f6=_4f3;
var lh=null;
var hsl=this.historyStack.length-1;
if(hsl>=0){
while(!this.historyStack[hsl]["urlHash"]){
hsl--;
}
lh=this.historyStack[hsl]["urlHash"];
}
if(lh){
_4f3=function(){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+lh+"';",1);
}
_4f6();
};
}
this.forwardStack=[];
var _4f9=args["forward"]||args["forwardButton"];
var tfw=function(){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_4f9){
_4f9();
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.io.XMLHTTPTransport.checkLocation();",200);
}
}
}
}
this.historyStack.push({"url":url,"callback":_4f3,"kwArgs":args,"urlHash":hash});
};
this.checkLocation=function(){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash)||(window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
};
this.iframeLoaded=function(evt,_4fd){
var isp=_4fd.href.split("?");
if(isp.length<2){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
var _4ff=isp[1];
if(this.moveForward){
this.moveForward=false;
return;
}
var last=this.historyStack.pop();
if(!last){
if(this.forwardStack.length>0){
var next=this.forwardStack[this.forwardStack.length-1];
if(_4ff==next.url.split("?")[1]){
this.handleForwardButton();
}
}
return;
}
this.historyStack.push(last);
if(this.historyStack.length>=2){
if(isp[1]==this.historyStack[this.historyStack.length-2].url.split("?")[1]){
this.handleBackButton();
}
}else{
this.handleBackButton();
}
};
this.handleBackButton=function(){
var last=this.historyStack.pop();
if(!last){
return;
}
if(last["callback"]){
last.callback();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(last);
};
this.handleForwardButton=function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
};
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setInterval("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
for(var x=this.inFlight.length-1;x>=0;x--){
var tif=this.inFlight[x];
if(!tif){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
if(this.inFlight.length==0){
clearInterval(this.inFlightTimer);
this.inFlightTimer=null;
}
}
}
};
var _506=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_507){
return _506&&dojo.lang.inArray((_507["mimetype"]||"".toLowerCase()),["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"])&&dojo.lang.inArray(_507["method"].toLowerCase(),["post","get","head"])&&!(_507["formNode"]&&dojo.io.formHasFile(_507["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_508){
if(!_508["url"]){
if(!_508["formNode"]&&(_508["backButton"]||_508["back"]||_508["changeUrl"]||_508["watchForURL"])&&(!djConfig.preventBackButtonFix)){
this.addToHistory(_508);
return true;
}
}
var url=_508.url;
var _50a="";
if(_508["formNode"]){
var ta=_508.formNode.getAttribute("action");
if((ta)&&(!_508["url"])){
url=ta;
}
var tp=_508.formNode.getAttribute("method");
if((tp)&&(!_508["method"])){
_508.method=tp;
}
_50a+=dojo.io.encodeForm(_508.formNode,_508.encoding);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_508["file"]){
_508.method="post";
}
if(!_508["method"]){
_508.method="get";
}
if(_508.method.toLowerCase()=="get"){
_508.multipart=false;
}else{
if(_508["file"]){
_508.multipart=true;
}else{
if(!_508["multipart"]){
_508.multipart=false;
}
}
}
if(_508["backButton"]||_508["back"]||_508["changeUrl"]){
this.addToHistory(_508);
}
do{
if(_508.postContent){
_50a=_508.postContent;
break;
}
if(_508["content"]){
_50a+=dojo.io.argsFromMap(_508.content,_508.encoding);
}
if(_508.method.toLowerCase()=="get"||!_508.multipart){
break;
}
var t=[];
if(_50a.length){
var q=_50a.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_508.file){
if(dojo.lang.isArray(_508.file)){
for(var i=0;i<_508.file.length;++i){
var o=_508.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_508.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_50a=t.join("\r\n");
}
}while(false);
var _512=_508["sync"]?false:true;
var _513=_508["preventCache"]||(this.preventCache==true&&_508["preventCache"]!=false);
var _514=_508["useCache"]==true||(this.useCache==true&&_508["useCache"]!=false);
if(!_513&&_514){
var _515=getFromCache(url,_50a,_508.method);
if(_515){
doLoad(_508,_515,url,_50a,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject();
var _517=false;
if(_512){
this.inFlight.push({"req":_508,"http":http,"url":url,"query":_50a,"useCache":_514});
this.startWatchingInFlight();
}
if(_508.method.toLowerCase()=="post"){
http.open("POST",url,_512);
setHeaders(http,_508);
http.setRequestHeader("Content-Type",_508.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_508.contentType||"application/x-www-form-urlencoded"));
http.send(_50a);
}else{
var _518=url;
if(_50a!=""){
_518+=(_518.indexOf("?")>-1?"&":"?")+_50a;
}
if(_513){
_518+=(dojo.string.endsWithAny(_518,"?","&")?"":(_518.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
http.open(_508.method.toUpperCase(),_518,_512);
setHeaders(http,_508);
http.send(null);
}
if(!_512){
doLoad(_508,http,url,_50a,_514);
}
_508.abort=function(){
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_51a,days,path,_51d,_51e){
var _51f=-1;
if(typeof days=="number"&&days>=0){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_51f=d.toGMTString();
}
_51a=escape(_51a);
document.cookie=name+"="+_51a+";"+(_51f!=-1?" expires="+_51f+";":"")+(path?"path="+path:"")+(_51d?"; domain="+_51d:"")+(_51e?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.indexOf(name+"=");
if(idx==-1){
return null;
}
value=document.cookie.substring(idx+name.length+1);
var end=value.indexOf(";");
if(end==-1){
end=value.length;
}
value=value.substring(0,end);
value=unescape(value);
return value;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_529,_52a,_52b){
if(arguments.length==5){
_52b=_529;
_529=null;
_52a=null;
}
var _52c=[],cookie,value="";
if(!_52b){
cookie=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!cookie){
cookie={};
}
for(var prop in obj){
if(prop==null){
delete cookie[prop];
}else{
if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
cookie[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in cookie){
_52c.push(escape(prop)+"="+escape(cookie[prop]));
}
value=_52c.join("&");
}
dojo.io.cookie.setCookie(name,value,days,path,_529,_52a);
};
dojo.io.cookie.getObjectCookie=function(name){
var _52f=null,cookie=dojo.io.cookie.getCookie(name);
if(cookie){
_52f={};
var _530=cookie.split("&");
for(var i=0;i<_530.length;i++){
var pair=_530[i].split("=");
var _533=pair[1];
if(isNaN(_533)){
_533=unescape(pair[1]);
}
_52f[unescape(pair[0])]=_533;
}
}
return _52f;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _534=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_534=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.hostenv.conditionalLoadModule({common:["dojo.io",false,false],rhino:["dojo.io.RhinoIO",false,false],browser:[["dojo.io.BrowserIO",false,false],["dojo.io.cookie",false,false]]});
dojo.hostenv.moduleLoaded("dojo.io.*");
dojo.provide("dojo.math.curves");
dojo.require("dojo.math");
dojo.math.curves={Line:function(_535,end){
this.start=_535;
this.end=end;
this.dimensions=_535.length;
for(var i=0;i<_535.length;i++){
_535[i]=Number(_535[i]);
}
for(var i=0;i<end.length;i++){
end[i]=Number(end[i]);
}
this.getValue=function(n){
var _539=new Array(this.dimensions);
for(var i=0;i<this.dimensions;i++){
_539[i]=((this.end[i]-this.start[i])*n)+this.start[i];
}
return _539;
};
return this;
},Bezier:function(pnts){
this.getValue=function(step){
if(step>=1){
return this.p[this.p.length-1];
}
if(step<=0){
return this.p[0];
}
var _53d=new Array(this.p[0].length);
for(var k=0;j<this.p[0].length;k++){
_53d[k]=0;
}
for(var j=0;j<this.p[0].length;j++){
var C=0;
var D=0;
for(var i=0;i<this.p.length;i++){
C+=this.p[i][j]*this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,i);
}
for(var l=0;l<this.p.length;l++){
D+=this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,l);
}
_53d[j]=C/D;
}
return _53d;
};
this.p=pnts;
return this;
},CatmullRom:function(pnts,c){
this.getValue=function(step){
var _547=step*(this.p.length-1);
var node=Math.floor(_547);
var _549=_547-node;
var i0=node-1;
if(i0<0){
i0=0;
}
var i=node;
var i1=node+1;
if(i1>=this.p.length){
i1=this.p.length-1;
}
var i2=node+2;
if(i2>=this.p.length){
i2=this.p.length-1;
}
var u=_549;
var u2=_549*_549;
var u3=_549*_549*_549;
var _551=new Array(this.p[0].length);
for(var k=0;k<this.p[0].length;k++){
var x1=(-this.c*this.p[i0][k])+((2-this.c)*this.p[i][k])+((this.c-2)*this.p[i1][k])+(this.c*this.p[i2][k]);
var x2=(2*this.c*this.p[i0][k])+((this.c-3)*this.p[i][k])+((3-2*this.c)*this.p[i1][k])+(-this.c*this.p[i2][k]);
var x3=(-this.c*this.p[i0][k])+(this.c*this.p[i1][k]);
var x4=this.p[i][k];
_551[k]=x1*u3+x2*u2+x3*u+x4;
}
return _551;
};
if(!c){
this.c=0.7;
}else{
this.c=c;
}
this.p=pnts;
return this;
},Arc:function(_557,end,ccw){
var _55a=dojo.math.points.midpoint(_557,end);
var _55b=dojo.math.points.translate(dojo.math.points.invert(_55a),_557);
var rad=Math.sqrt(Math.pow(_55b[0],2)+Math.pow(_55b[1],2));
var _55d=dojo.math.radToDeg(Math.atan(_55b[1]/_55b[0]));
if(_55b[0]<0){
_55d-=90;
}else{
_55d+=90;
}
dojo.math.curves.CenteredArc.call(this,_55a,rad,_55d,_55d+(ccw?-180:180));
},CenteredArc:function(_55e,_55f,_560,end){
this.center=_55e;
this.radius=_55f;
this.start=_560||0;
this.end=end;
this.getValue=function(n){
var _563=new Array(2);
var _564=dojo.math.degToRad(this.start+((this.end-this.start)*n));
_563[0]=this.center[0]+this.radius*Math.sin(_564);
_563[1]=this.center[1]-this.radius*Math.cos(_564);
return _563;
};
return this;
},Circle:function(_565,_566){
dojo.math.curves.CenteredArc.call(this,_565,_566,0,360);
return this;
},Path:function(){
var _567=[];
var _568=[];
var _569=[];
var _56a=0;
this.add=function(_56b,_56c){
if(_56c<0){
dojo.raise("dojo.math.curves.Path.add: weight cannot be less than 0");
}
_567.push(_56b);
_568.push(_56c);
_56a+=_56c;
computeRanges();
};
this.remove=function(_56d){
for(var i=0;i<_567.length;i++){
if(_567[i]==_56d){
_567.splice(i,1);
_56a-=_568.splice(i,1)[0];
break;
}
}
computeRanges();
};
this.removeAll=function(){
_567=[];
_568=[];
_56a=0;
};
this.getValue=function(n){
var _570=false,value=0;
for(var i=0;i<_569.length;i++){
var r=_569[i];
if(n>=r[0]&&n<r[1]){
var subN=(n-r[0])/r[2];
value=_567[i].getValue(subN);
_570=true;
break;
}
}
if(!_570){
value=_567[_567.length-1].getValue(1);
}
for(j=0;j<i;j++){
value=dojo.math.points.translate(value,_567[j].getValue(1));
}
return value;
};
function computeRanges(){
var _574=0;
for(var i=0;i<_568.length;i++){
var end=_574+_568[i]/_56a;
var len=end-_574;
_569[i]=[_574,end,len];
_574=end;
}
}
return this;
}};
dojo.provide("dojo.animation");
dojo.provide("dojo.animation.Animation");
dojo.require("dojo.lang");
dojo.require("dojo.math");
dojo.require("dojo.math.curves");
dojo.animation.Animation=function(_578,_579,_57a,_57b,rate){
this.curve=_578;
this.duration=_579;
this.repeatCount=_57b||0;
this.rate=rate||10;
if(_57a){
if(dojo.lang.isFunction(_57a.getValue)){
this.accel=_57a;
}else{
var i=0.35*_57a+0.5;
this.accel=new dojo.math.curves.CatmullRom([[0],[i],[1]],0.45);
}
}
};
dojo.lang.extend(dojo.animation.Animation,{curve:null,duration:0,repeatCount:0,accel:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,handler:null,_animSequence:null,_startTime:null,_endTime:null,_lastFrame:null,_timer:null,_percent:0,_active:false,_paused:false,_startRepeatCount:0,play:function(_57e){
if(_57e){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return;
}
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._lastFrame=this._startTime;
var e=new dojo.animation.AnimationEvent(this,null,this.curve.getValue(this._percent),this._startTime,this._startTime,this._endTime,this.duration,this._percent,0);
this._active=true;
this._paused=false;
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
e.type="begin";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
e.type="play";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPlay=="function"){
this.onPlay(e);
}
if(this._animSequence){
this._animSequence._setCurrent(this);
}
this._cycle();
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return;
}
this._paused=true;
var e=new dojo.animation.AnimationEvent(this,"pause",this.curve.getValue(this._percent),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent,0);
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPause=="function"){
this.onPause(e);
}
},playPause:function(){
if(!this._active||this._paused){
this.play();
}else{
this.pause();
}
},gotoPercent:function(pct,_582){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_582){
this.play();
}
},stop:function(_583){
clearTimeout(this._timer);
var step=this._percent/100;
if(_583){
step=1;
}
var e=new dojo.animation.AnimationEvent(this,"stop",this.curve.getValue(step),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent,Math.round(fps));
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onStop=="function"){
this.onStop(e);
}
this._active=false;
this._paused=false;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
fps=1000/(curr-this._lastFrame);
this._lastFrame=curr;
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if(this.accel&&this.accel.getValue){
step=this.accel.getValue(step);
}
var e=new dojo.animation.AnimationEvent(this,"animate",this.curve.getValue(step),this._startTime,curr,this._endTime,this.duration,this._percent,Math.round(fps));
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onAnimate=="function"){
this.onAnimate(e);
}
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
e.type="end";
this._active=false;
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this.repeatCount--;
this.play(true);
}else{
if(this.repeatCount==-1){
this.play(true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
if(this._animSequence){
this._animSequence._playNext();
}
}
}
}
}
}});
dojo.animation.AnimationEvent=function(anim,type,_58b,_58c,_58d,_58e,dur,pct,fps){
this.type=type;
this.animation=anim;
this.coords=_58b;
this.x=_58b[0];
this.y=_58b[1];
this.z=_58b[2];
this.startTime=_58c;
this.currentTime=_58d;
this.endTime=_58e;
this.duration=dur;
this.percent=pct;
this.fps=fps;
};
dojo.lang.extend(dojo.animation.AnimationEvent,{coordsAsInts:function(){
var _592=new Array(this.coords.length);
for(var i=0;i<this.coords.length;i++){
_592[i]=Math.round(this.coords[i]);
}
return _592;
}});
dojo.animation.AnimationSequence=function(_594){
this.repeatCount=_594||0;
};
dojo.lang.extend(dojo.animation.AnimationSequence,{repeateCount:0,_anims:[],_currAnim:-1,onBegin:null,onEnd:null,onNext:null,handler:null,add:function(){
for(var i=0;i<arguments.length;i++){
this._anims.push(arguments[i]);
arguments[i]._animSequence=this;
}
},remove:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._anims[i]._animSequence=null;
this._anims.splice(i,1);
break;
}
}
},removeAll:function(){
for(var i=0;i<this._anims.length;i++){
this._anims[i]._animSequence=null;
}
this._anims=[];
this._currAnim=-1;
},clear:function(){
this.removeAll();
},play:function(_599){
if(this._anims.length==0){
return;
}
if(_599||!this._anims[this._currAnim]){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
if(this._currAnim==0){
var e={type:"begin",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
this._anims[this._currAnim].play(_599);
}
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
}
},playPause:function(){
if(this._anims.length==0){
return;
}
if(this._currAnim==-1){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
this._anims[this._currAnim].playPause();
}
},stop:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].stop();
}
},status:function(){
if(this._anims[this._currAnim]){
return this._anims[this._currAnim].status();
}else{
return "stopped";
}
},_setCurrent:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._currAnim=i;
break;
}
}
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return;
}
this._currAnim++;
if(this._anims[this._currAnim]){
var e={type:"next",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onNext=="function"){
this.onNext(e);
}
this._anims[this._currAnim].play(true);
}else{
var e={type:"end",animation:this._anims[this._anims.length-1]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this._currAnim=0;
this.repeatCount--;
this._anims[this._currAnim].play(true);
}else{
if(this.repeatCount==-1){
this._currAnim=0;
this._anims[this._currAnim].play(true);
}else{
this._currAnim=-1;
}
}
}
}});
dojo.hostenv.conditionalLoadModule({common:["dojo.animation.Animation",false,false]});
dojo.hostenv.moduleLoaded("dojo.animation.*");
dojo.provide("dojo.fx.html");
dojo.require("dojo.html");
dojo.require("dojo.style");
dojo.require("dojo.lang");
dojo.require("dojo.animation.*");
dojo.require("dojo.event.*");
dojo.require("dojo.graphics.color");
dojo.fx.html._makeFadeable=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.style.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.style.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
dojo.fx.html.fadeOut=function(node,_5a0,_5a1,_5a2){
return dojo.fx.html.fade(node,_5a0,dojo.style.getOpacity(node),0,_5a1,_5a2);
};
dojo.fx.html.fadeIn=function(node,_5a4,_5a5,_5a6){
return dojo.fx.html.fade(node,_5a4,dojo.style.getOpacity(node),1,_5a5,_5a6);
};
dojo.fx.html.fadeHide=function(node,_5a8,_5a9,_5aa){
node=dojo.byId(node);
if(!_5a8){
_5a8=150;
}
return dojo.fx.html.fadeOut(node,_5a8,function(node){
node.style.display="none";
if(typeof _5a9=="function"){
_5a9(node);
}
});
};
dojo.fx.html.fadeShow=function(node,_5ad,_5ae,_5af){
node=dojo.byId(node);
if(!_5ad){
_5ad=150;
}
node.style.display="block";
return dojo.fx.html.fade(node,_5ad,0,1,_5ae,_5af);
};
dojo.fx.html.fade=function(node,_5b1,_5b2,_5b3,_5b4,_5b5){
node=dojo.byId(node);
dojo.fx.html._makeFadeable(node);
var anim=new dojo.animation.Animation(new dojo.math.curves.Line([_5b2],[_5b3]),_5b1,0);
dojo.event.connect(anim,"onAnimate",function(e){
dojo.style.setOpacity(node,e.x);
});
if(_5b4){
dojo.event.connect(anim,"onEnd",function(e){
_5b4(node,anim);
});
}
if(!_5b5){
anim.play(true);
}
return anim;
};
dojo.fx.html.slideTo=function(node,_5ba,_5bb,_5bc,_5bd){
if(!dojo.lang.isNumber(_5ba)){
var tmp=_5ba;
_5ba=_5bb;
_5bb=tmp;
}
node=dojo.byId(node);
var top=node.offsetTop;
var left=node.offsetLeft;
var pos=dojo.style.getComputedStyle(node,"position");
if(pos=="relative"||pos=="static"){
top=parseInt(dojo.style.getComputedStyle(node,"top"))||0;
left=parseInt(dojo.style.getComputedStyle(node,"left"))||0;
}
return dojo.fx.html.slide(node,_5ba,[left,top],_5bb,_5bc,_5bd);
};
dojo.fx.html.slideBy=function(node,_5c3,_5c4,_5c5,_5c6){
if(!dojo.lang.isNumber(_5c3)){
var tmp=_5c3;
_5c3=_5c4;
_5c4=tmp;
}
node=dojo.byId(node);
var top=node.offsetTop;
var left=node.offsetLeft;
var pos=dojo.style.getComputedStyle(node,"position");
if(pos=="relative"||pos=="static"){
top=parseInt(dojo.style.getComputedStyle(node,"top"))||0;
left=parseInt(dojo.style.getComputedStyle(node,"left"))||0;
}
return dojo.fx.html.slideTo(node,_5c3,[left+_5c4[0],top+_5c4[1]],_5c5,_5c6);
};
dojo.fx.html.slide=function(node,_5cc,_5cd,_5ce,_5cf,_5d0){
if(!dojo.lang.isNumber(_5cc)){
var tmp=_5cc;
_5cc=_5ce;
_5ce=_5cd;
_5cd=tmp;
}
node=dojo.byId(node);
if(dojo.style.getComputedStyle(node,"position")=="static"){
node.style.position="relative";
}
var anim=new dojo.animation.Animation(new dojo.math.curves.Line(_5cd,_5ce),_5cc,0);
dojo.event.connect(anim,"onAnimate",function(e){
with(node.style){
left=e.x+"px";
top=e.y+"px";
}
});
if(_5cf){
dojo.event.connect(anim,"onEnd",function(e){
_5cf(node,anim);
});
}
if(!_5d0){
anim.play(true);
}
return anim;
};
dojo.fx.html.colorFadeIn=function(node,_5d6,_5d7,_5d8,_5d9,_5da){
if(!dojo.lang.isNumber(_5d6)){
var tmp=_5d6;
_5d6=_5d7;
_5d7=tmp;
}
node=dojo.byId(node);
var _5dc=dojo.html.getBackgroundColor(node);
var bg=dojo.style.getStyle(node,"background-color").toLowerCase();
var _5de=bg=="transparent"||bg=="rgba(0, 0, 0, 0)";
while(_5dc.length>3){
_5dc.pop();
}
var rgb=new dojo.graphics.color.Color(_5d7).toRgb();
var anim=dojo.fx.html.colorFade(node,_5d6,_5d7,_5dc,_5d9,true);
dojo.event.connect(anim,"onEnd",function(e){
if(_5de){
node.style.backgroundColor="transparent";
}
});
if(_5d8>0){
node.style.backgroundColor="rgb("+rgb.join(",")+")";
if(!_5da){
setTimeout(function(){
anim.play(true);
},_5d8);
}
}else{
if(!_5da){
anim.play(true);
}
}
return anim;
};
dojo.fx.html.highlight=dojo.fx.html.colorFadeIn;
dojo.fx.html.colorFadeFrom=dojo.fx.html.colorFadeIn;
dojo.fx.html.colorFadeOut=function(node,_5e3,_5e4,_5e5,_5e6,_5e7){
if(!dojo.lang.isNumber(_5e3)){
var tmp=_5e3;
_5e3=_5e4;
_5e4=tmp;
}
node=dojo.byId(node);
var _5e9=new dojo.graphics.color.Color(dojo.html.getBackgroundColor(node)).toRgb();
var rgb=new dojo.graphics.color.Color(_5e4).toRgb();
var anim=dojo.fx.html.colorFade(node,_5e3,_5e9,rgb,_5e6,_5e5>0||_5e7);
if(_5e5>0){
node.style.backgroundColor="rgb("+_5e9.join(",")+")";
if(!_5e7){
setTimeout(function(){
anim.play(true);
},_5e5);
}
}
return anim;
};
dojo.fx.html.unhighlight=dojo.fx.html.colorFadeOut;
dojo.fx.html.colorFadeTo=dojo.fx.html.colorFadeOut;
dojo.fx.html.colorFade=function(node,_5ed,_5ee,_5ef,_5f0,_5f1){
if(!dojo.lang.isNumber(_5ed)){
var tmp=_5ed;
_5ed=_5ef;
_5ef=_5ee;
_5ee=tmp;
}
node=dojo.byId(node);
var _5f3=new dojo.graphics.color.Color(_5ee).toRgb();
var _5f4=new dojo.graphics.color.Color(_5ef).toRgb();
var anim=new dojo.animation.Animation(new dojo.math.curves.Line(_5f3,_5f4),_5ed,0);
dojo.event.connect(anim,"onAnimate",function(e){
node.style.backgroundColor="rgb("+e.coordsAsInts().join(",")+")";
});
if(_5f0){
dojo.event.connect(anim,"onEnd",function(e){
_5f0(node,anim);
});
}
if(!_5f1){
anim.play(true);
}
return anim;
};
dojo.fx.html.wipeIn=function(node,_5f9,_5fa,_5fb){
node=dojo.byId(node);
var _5fc=dojo.html.getStyle(node,"height");
var _5fd=dojo.lang.inArray(node.tagName.toLowerCase(),["tr","td","th"])?"":"block";
node.style.display=_5fd;
var _5fe=node.offsetHeight;
var anim=dojo.fx.html.wipeInToHeight(node,_5f9,_5fe,function(e){
node.style.height=_5fc||"auto";
if(_5fa){
_5fa(node,anim);
}
},_5fb);
};
dojo.fx.html.wipeInToHeight=function(node,_602,_603,_604,_605){
node=dojo.byId(node);
var _606=dojo.html.getStyle(node,"overflow");
node.style.height="0px";
node.style.display="none";
if(_606=="visible"){
node.style.overflow="hidden";
}
var _607=dojo.lang.inArray(node.tagName.toLowerCase(),["tr","td","th"])?"":"block";
node.style.display=_607;
var anim=new dojo.animation.Animation(new dojo.math.curves.Line([0],[_603]),_602,0);
dojo.event.connect(anim,"onAnimate",function(e){
node.style.height=Math.round(e.x)+"px";
});
dojo.event.connect(anim,"onEnd",function(e){
if(_606!="visible"){
node.style.overflow=_606;
}
if(_604){
_604(node,anim);
}
});
if(!_605){
anim.play(true);
}
return anim;
};
dojo.fx.html.wipeOut=function(node,_60c,_60d,_60e){
node=dojo.byId(node);
var _60f=dojo.html.getStyle(node,"overflow");
var _610=dojo.html.getStyle(node,"height");
var _611=node.offsetHeight;
node.style.overflow="hidden";
var anim=new dojo.animation.Animation(new dojo.math.curves.Line([_611],[0]),_60c,0);
dojo.event.connect(anim,"onAnimate",function(e){
node.style.height=Math.round(e.x)+"px";
});
dojo.event.connect(anim,"onEnd",function(e){
node.style.display="none";
node.style.overflow=_60f;
node.style.height=_610||"auto";
if(_60d){
_60d(node,anim);
}
});
if(!_60e){
anim.play(true);
}
return anim;
};
dojo.fx.html.explode=function(_615,_616,_617,_618,_619){
var _61a=dojo.html.toCoordinateArray(_615);
var _61b=document.createElement("div");
with(_61b.style){
position="absolute";
border="1px solid black";
display="none";
}
dojo.html.body().appendChild(_61b);
_616=dojo.byId(_616);
with(_616.style){
visibility="hidden";
display="block";
}
var _61c=dojo.html.toCoordinateArray(_616);
with(_616.style){
display="none";
visibility="visible";
}
var anim=new dojo.animation.Animation(new dojo.math.curves.Line(_61a,_61c),_617,0);
dojo.event.connect(anim,"onBegin",function(e){
_61b.style.display="block";
});
dojo.event.connect(anim,"onAnimate",function(e){
with(_61b.style){
left=e.x+"px";
top=e.y+"px";
width=e.coords[2]+"px";
height=e.coords[3]+"px";
}
});
dojo.event.connect(anim,"onEnd",function(){
_616.style.display="block";
_61b.parentNode.removeChild(_61b);
if(_618){
_618(_616,anim);
}
});
if(!_619){
anim.play();
}
return anim;
};
dojo.fx.html.implode=function(_620,end,_622,_623,_624){
var _625=dojo.html.toCoordinateArray(_620);
var _626=dojo.html.toCoordinateArray(end);
_620=dojo.byId(_620);
var _627=document.createElement("div");
with(_627.style){
position="absolute";
border="1px solid black";
display="none";
}
dojo.html.body().appendChild(_627);
var anim=new dojo.animation.Animation(new dojo.math.curves.Line(_625,_626),_622,0);
dojo.event.connect(anim,"onBegin",function(e){
_620.style.display="none";
_627.style.display="block";
});
dojo.event.connect(anim,"onAnimate",function(e){
with(_627.style){
left=e.x+"px";
top=e.y+"px";
width=e.coords[2]+"px";
height=e.coords[3]+"px";
}
});
dojo.event.connect(anim,"onEnd",function(){
_627.parentNode.removeChild(_627);
if(_623){
_623(_620,anim);
}
});
if(!_624){
anim.play();
}
return anim;
};
dojo.fx.html.Exploder=function(_62b,_62c){
_62b=dojo.byId(_62b);
_62c=dojo.byId(_62c);
var _62d=this;
this.waitToHide=500;
this.timeToShow=100;
this.waitToShow=200;
this.timeToHide=70;
this.autoShow=false;
this.autoHide=false;
var _62e=null;
var _62f=null;
var _630=null;
var _631=null;
var _632=null;
var _633=null;
this.showing=false;
this.onBeforeExplode=null;
this.onAfterExplode=null;
this.onBeforeImplode=null;
this.onAfterImplode=null;
this.onExploding=null;
this.onImploding=null;
this.timeShow=function(){
clearTimeout(_630);
_630=setTimeout(_62d.show,_62d.waitToShow);
};
this.show=function(){
clearTimeout(_630);
clearTimeout(_631);
if((_62f&&_62f.status()=="playing")||(_62e&&_62e.status()=="playing")||_62d.showing){
return;
}
if(typeof _62d.onBeforeExplode=="function"){
_62d.onBeforeExplode(_62b,_62c);
}
_62e=dojo.fx.html.explode(_62b,_62c,_62d.timeToShow,function(e){
_62d.showing=true;
if(typeof _62d.onAfterExplode=="function"){
_62d.onAfterExplode(_62b,_62c);
}
});
if(typeof _62d.onExploding=="function"){
dojo.event.connect(_62e,"onAnimate",this,"onExploding");
}
};
this.timeHide=function(){
clearTimeout(_630);
clearTimeout(_631);
if(_62d.showing){
_631=setTimeout(_62d.hide,_62d.waitToHide);
}
};
this.hide=function(){
clearTimeout(_630);
clearTimeout(_631);
if(_62e&&_62e.status()=="playing"){
return;
}
_62d.showing=false;
if(typeof _62d.onBeforeImplode=="function"){
_62d.onBeforeImplode(_62b,_62c);
}
_62f=dojo.fx.html.implode(_62c,_62b,_62d.timeToHide,function(e){
if(typeof _62d.onAfterImplode=="function"){
_62d.onAfterImplode(_62b,_62c);
}
});
if(typeof _62d.onImploding=="function"){
dojo.event.connect(_62f,"onAnimate",this,"onImploding");
}
};
dojo.event.connect(_62b,"onclick",function(e){
if(_62d.showing){
_62d.hide();
}else{
_62d.show();
}
});
dojo.event.connect(_62b,"onmouseover",function(e){
if(_62d.autoShow){
_62d.timeShow();
}
});
dojo.event.connect(_62b,"onmouseout",function(e){
if(_62d.autoHide){
_62d.timeHide();
}
});
dojo.event.connect(_62c,"onmouseover",function(e){
clearTimeout(_631);
});
dojo.event.connect(_62c,"onmouseout",function(e){
if(_62d.autoHide){
_62d.timeHide();
}
});
dojo.event.connect(document.documentElement||dojo.html.body(),"onclick",function(e){
if(_62d.autoHide&&_62d.showing&&!dojo.dom.isDescendantOf(e.target,_62c)&&!dojo.dom.isDescendantOf(e.target,_62b)){
_62d.hide();
}
});
return this;
};
dojo.lang.mixin(dojo.fx,dojo.fx.html);
dojo.hostenv.conditionalLoadModule({browser:["dojo.fx.html"]});
dojo.hostenv.moduleLoaded("dojo.fx.*");

