/**
 * QUnit v1.10.0 - A JavaScript Unit Testing Framework
 *
 * http://qunitjs.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
(function(w){var Q,c,d,t=0,f=(q(0)||"").replace(/(:\d+)+\)?/,"").replace(/.+\//,""),g=Object.prototype.toString,h=Object.prototype.hasOwnProperty,D=w.Date,k={setTimeout:typeof w.setTimeout!=="undefined",sessionStorage:(function(){var x="qunit-test-string";try{sessionStorage.setItem(x,x);sessionStorage.removeItem(x);return true}catch(e){return false}}())};function T(s){C(this,s);this.assertions=[];this.testNumber=++T.count}T.count=0;T.prototype={init:function(){var a,b,l,e=G("qunit-tests");if(e){b=document.createElement("strong");b.innerHTML=this.name;a=document.createElement("a");a.innerHTML="Rerun";a.href=Q.url({testNumber:this.testNumber});l=document.createElement("li");l.appendChild(b);l.appendChild(a);l.className="running";l.id=this.id="qunit-test-output"+t++;e.appendChild(l)}},setup:function(){if(this.module!==c.previousModule){if(c.previousModule){I("moduleDone",Q,{name:c.previousModule,failed:c.moduleStats.bad,passed:c.moduleStats.all-c.moduleStats.bad,total:c.moduleStats.all})}c.previousModule=this.module;c.moduleStats={all:0,bad:0};I("moduleStart",Q,{name:this.module})}else if(c.autorun){I("moduleStart",Q,{name:this.module})}c.current=this;this.testEnvironment=C({setup:function(){},teardown:function(){}},this.moduleTestEnvironment);I("testStart",Q,{name:this.testName,module:this.module});Q.current_testEnvironment=this.testEnvironment;if(!c.pollution){z()}if(c.notrycatch){this.testEnvironment.setup.call(this.testEnvironment);return}try{this.testEnvironment.setup.call(this.testEnvironment)}catch(e){Q.pushFailure("Setup failed on "+this.testName+": "+e.message,p(e,1))}},run:function(){c.current=this;var a=G("qunit-testresult");if(a){a.innerHTML="Running: <br/>"+this.name}if(this.async){Q.stop()}if(c.notrycatch){this.callback.call(this.testEnvironment,Q.assert);return}try{this.callback.call(this.testEnvironment,Q.assert)}catch(e){Q.pushFailure("Died on test #"+(this.assertions.length+1)+" "+this.stack+": "+e.message,p(e,0));z();if(c.blocking){Q.start()}}},teardown:function(){c.current=this;if(c.notrycatch){this.testEnvironment.teardown.call(this.testEnvironment);return}else{try{this.testEnvironment.teardown.call(this.testEnvironment)}catch(e){Q.pushFailure("Teardown failed on "+this.testName+": "+e.message,p(e,1))}}A()},finish:function(){c.current=this;if(c.requireExpects&&this.expected==null){Q.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack)}else if(this.expected!=null&&this.expected!=this.assertions.length){Q.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack)}else if(this.expected==null&&!this.assertions.length){Q.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack)}var j,a,b,i,l,o,n=this,s=0,x=0,F=G("qunit-tests");c.stats.all+=this.assertions.length;c.moduleStats.all+=this.assertions.length;if(F){o=document.createElement("ol");for(i=0;i<this.assertions.length;i++){j=this.assertions[i];l=document.createElement("li");l.className=j.result?"pass":"fail";l.innerHTML=j.message||(j.result?"okay":"failed");o.appendChild(l);if(j.result){s++}else{x++;c.stats.bad++;c.moduleStats.bad++}}if(Q.config.reorder&&k.sessionStorage){if(x){sessionStorage.setItem("qunit-test-"+this.module+"-"+this.testName,x)}else{sessionStorage.removeItem("qunit-test-"+this.module+"-"+this.testName)}}if(x===0){o.style.display="none"}b=document.createElement("strong");b.innerHTML=this.name+" <b class='counts'>(<b class='failed'>"+x+"</b>, <b class='passed'>"+s+"</b>, "+this.assertions.length+")</b>";E(b,"click",function(){var e=b.nextSibling.nextSibling,L=e.style.display;e.style.display=L==="none"?"block":"none"});E(b,"dblclick",function(e){var L=e&&e.target?e.target:w.event.srcElement;if(L.nodeName.toLowerCase()=="span"||L.nodeName.toLowerCase()=="b"){L=L.parentNode}if(w.location&&L.nodeName.toLowerCase()==="strong"){w.location=Q.url({testNumber:n.testNumber})}});l=G(this.id);l.className=x?"fail":"pass";l.removeChild(l.firstChild);a=l.firstChild;l.appendChild(b);l.appendChild(a);l.appendChild(o)}else{for(i=0;i<this.assertions.length;i++){if(!this.assertions[i].result){x++;c.stats.bad++;c.moduleStats.bad++}}}I("testDone",Q,{name:this.testName,module:this.module,failed:x,passed:this.assertions.length-x,total:this.assertions.length});Q.reset();c.current=undefined},queue:function(){var b,a=this;u(function(){a.init()});function e(){u(function(){a.setup()});u(function(){a.run()});u(function(){a.teardown()});u(function(){a.finish()})}b=Q.config.reorder&&k.sessionStorage&&+sessionStorage.getItem("qunit-test-"+this.module+"-"+this.testName);if(b){e()}else{u(e,true)}}};Q={module:function(n,a){c.currentModule=n;c.currentModuleTestEnvironment=a;c.modules[n]=true},asyncTest:function(a,e,b){if(arguments.length===2){b=e;e=null}Q.test(a,e,b,true)},test:function(a,e,b,i){var j,n="<span class='test-name'>"+r(a)+"</span>";if(arguments.length===2){b=e;e=null}if(c.currentModule){n="<span class='module-name'>"+c.currentModule+"</span>: "+n}j=new T({name:n,testName:a,expected:e,async:i,callback:b,module:c.currentModule,moduleTestEnvironment:c.currentModuleTestEnvironment,stack:q(2)});if(!v(j)){return}j.queue()},expect:function(a){if(arguments.length===1){c.current.expected=a}else{return c.current.expected}},start:function(a){c.semaphore-=a||1;if(c.semaphore>0){return}if(c.semaphore<0){c.semaphore=0}if(k.setTimeout){w.setTimeout(function(){if(c.semaphore>0){return}if(c.timeout){clearTimeout(c.timeout)}c.blocking=false;y(true)},13)}else{c.blocking=false;y(true)}},stop:function(a){c.semaphore+=a||1;c.blocking=true;if(c.testTimeout&&k.setTimeout){clearTimeout(c.timeout);c.timeout=w.setTimeout(function(){Q.ok(false,"Test timed out");c.semaphore=1;Q.start()},c.testTimeout)}}};Q.assert={ok:function(a,b){if(!c.current){throw new Error("ok() assertion outside test context, was "+q(2))}a=!!a;var s,e={module:c.current.module,name:c.current.testName,result:a,message:b};b=r(b||(a?"okay":"failed"));b="<span class='test-message'>"+b+"</span>";if(!a){s=q(2);if(s){e.source=s;b+="<table><tr class='test-source'><th>Source: </th><td><pre>"+r(s)+"</pre></td></tr></table>"}}I("log",Q,e);c.current.assertions.push({result:a,message:b})},equal:function(a,e,b){Q.push(e==a,a,e,b)},notEqual:function(a,e,b){Q.push(e!=a,a,e,b)},deepEqual:function(a,e,b){Q.push(Q.equiv(a,e),a,e,b)},notDeepEqual:function(a,e,b){Q.push(!Q.equiv(a,e),a,e,b)},strictEqual:function(a,e,b){Q.push(e===a,a,e,b)},notStrictEqual:function(a,e,b){Q.push(e!==a,a,e,b)},"throws":function(b,a,i){var j,o=false;if(typeof a==="string"){i=a;a=null}c.current.ignoreGlobalErrors=true;try{b.call(c.current.testEnvironment)}catch(e){j=e}c.current.ignoreGlobalErrors=false;if(j){if(!a){o=true}else if(Q.objectType(a)==="regexp"){o=a.test(j)}else if(j instanceof a){o=true}else if(a.call({},j)===true){o=true}Q.push(o,j,null,i)}else{Q.pushFailure(i,null,'No exception was thrown.')}}};C(Q,Q.assert);Q.raises=Q.assert["throws"];Q.equals=function(){Q.push(false,false,false,"QUnit.equals has been deprecated since 2009 (e88049a0), use QUnit.equal instead")};Q.same=function(){Q.push(false,false,false,"QUnit.same has been deprecated since 2009 (e88049a0), use QUnit.deepEqual instead")};(function(){function F(){}F.prototype=Q;Q=new F();Q.constructor=F}());c={queue:[],blocking:true,hidepassed:false,reorder:true,altertitle:true,requireExpects:false,urlConfig:[{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the `window` object. Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}],modules:{},begin:[],done:[],log:[],testStart:[],testDone:[],moduleStart:[],moduleDone:[]};(function(){var i,l=w.location||{search:"",protocol:"file:"},a=l.search.slice(1).split("&"),b=a.length,e={},j;if(a[0]){for(i=0;i<b;i++){j=a[i].split("=");j[0]=decodeURIComponent(j[0]);j[1]=j[1]?decodeURIComponent(j[1]):true;e[j[0]]=j[1]}}Q.urlParams=e;c.filter=e.filter;c.module=e.module;c.testNumber=parseInt(e.testNumber,10)||null;Q.isLocal=l.protocol==="file:"}());if(typeof exports==="undefined"){C(w,Q);w.QUnit=Q}C(Q,{config:c,init:function(){C(c,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:+new D(),updateRate:1000,blocking:false,autostart:true,autorun:false,filter:"",queue:[],semaphore:0});var a,b,e,i=G("qunit");if(i){i.innerHTML="<h1 id='qunit-header'>"+r(document.title)+"</h1>"+"<h2 id='qunit-banner'></h2>"+"<div id='qunit-testrunner-toolbar'></div>"+"<h2 id='qunit-userAgent'></h2>"+"<ol id='qunit-tests'></ol>"}a=G("qunit-tests");b=G("qunit-banner");e=G("qunit-testresult");if(a){a.innerHTML=""}if(b){b.className=""}if(e){e.parentNode.removeChild(e)}if(a){e=document.createElement("p");e.id="qunit-testresult";e.className="result";a.parentNode.insertBefore(e,a);e.innerHTML="Running...<br/>&nbsp;"}},reset:function(){var a=G("qunit-fixture");if(a){a.innerHTML=c.fixture}},triggerEvent:function(e,a,b){if(document.createEvent){b=document.createEvent("MouseEvents");b.initMouseEvent(a,true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(b)}else if(e.fireEvent){e.fireEvent("on"+a)}},is:function(a,o){return Q.objectType(o)==a},objectType:function(o){if(typeof o==="undefined"){return"undefined"}if(o===null){return"null"}var a=g.call(o).match(/^\[object\s(.*)\]$/)[1]||"";switch(a){case"Number":if(isNaN(o)){return"nan"}return"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return a.toLowerCase()}if(typeof o==="object"){return"object"}return undefined},push:function(a,b,e,i){if(!c.current){throw new Error("assertion outside test context, was "+q())}var o,s,j={module:c.current.module,name:c.current.testName,result:a,message:i,actual:b,expected:e};i=r(i)||(a?"okay":"failed");i="<span class='test-message'>"+i+"</span>";o=i;if(!a){e=r(Q.jsDump.parse(e));b=r(Q.jsDump.parse(b));o+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+e+"</pre></td></tr>";if(b!=e){o+="<tr class='test-actual'><th>Result: </th><td><pre>"+b+"</pre></td></tr>";o+="<tr class='test-diff'><th>Diff: </th><td><pre>"+Q.diff(e,b)+"</pre></td></tr>"}s=q();if(s){j.source=s;o+="<tr class='test-source'><th>Source: </th><td><pre>"+r(s)+"</pre></td></tr>"}o+="</table>"}I("log",Q,j);c.current.assertions.push({result:!!a,message:o})},pushFailure:function(a,s,b){if(!c.current){throw new Error("pushFailure() assertion outside test context, was "+q(2))}var o,e={module:c.current.module,name:c.current.testName,result:false,message:a};a=r(a)||"error";a="<span class='test-message'>"+a+"</span>";o=a;o+="<table>";if(b){o+="<tr class='test-actual'><th>Result: </th><td><pre>"+r(b)+"</pre></td></tr>"}if(s){e.source=s;o+="<tr class='test-source'><th>Source: </th><td><pre>"+r(s)+"</pre></td></tr>"}o+="</table>";I("log",Q,e);c.current.assertions.push({result:false,message:o})},url:function(a){a=C(C({},Q.urlParams),a);var b,e="?";for(b in a){if(!h.call(a,b)){continue}e+=encodeURIComponent(b)+"="+encodeURIComponent(a[b])+"&"}return w.location.pathname+e.slice(0,-1)},extend:C,id:G,addEvent:E});C(Q.constructor.prototype,{begin:H("begin"),done:H("done"),log:H("log"),testStart:H("testStart"),testDone:H("testDone"),moduleStart:H("moduleStart"),moduleDone:H("moduleDone")});if(typeof document==="undefined"||document.readyState==="complete"){c.autorun=true}Q.load=function(){I("begin",Q,{});var b,a,i,l,e,j,o,n,s,x,F,L,M=0,N="",O="",P=C({},c);Q.init();C(c,P);c.blocking=false;e=c.urlConfig.length;for(i=0;i<e;i++){x=c.urlConfig[i];if(typeof x==="string"){x={id:x,label:x,tooltip:"[no tooltip available]"}}c[x.id]=Q.urlParams[x.id];O+="<input id='qunit-urlconfig-"+x.id+"' name='"+x.id+"' type='checkbox'"+(c[x.id]?" checked='checked'":"")+" title='"+x.tooltip+"'><label for='qunit-urlconfig-"+x.id+"' title='"+x.tooltip+"'>"+x.label+"</label>"}N+="<label for='qunit-modulefilter'>Module: </label><select id='qunit-modulefilter' name='modulefilter'><option value='' "+(c.module===undefined?"selected":"")+">< All Modules ></option>";for(i in c.modules){if(c.modules.hasOwnProperty(i)){M+=1;N+="<option value='"+encodeURIComponent(i)+"' "+(c.module===i?"selected":"")+">"+i+"</option>"}}N+="</select>";s=G("qunit-userAgent");if(s){s.innerHTML=navigator.userAgent}b=G("qunit-header");if(b){b.innerHTML="<a href='"+Q.url({filter:undefined,module:undefined,testNumber:undefined})+"'>"+b.innerHTML+"</a> "}n=G("qunit-testrunner-toolbar");if(n){a=document.createElement("input");a.type="checkbox";a.id="qunit-filter-pass";E(a,"click",function(){var R,o=document.getElementById("qunit-tests");if(a.checked){o.className=o.className+" hidepass"}else{R=" "+o.className.replace(/[\n\t\r]/g," ")+" ";o.className=R.replace(/ hidepass /," ")}if(k.sessionStorage){if(a.checked){sessionStorage.setItem("qunit-filter-passed-tests","true")}else{sessionStorage.removeItem("qunit-filter-passed-tests")}}});if(c.hidepassed||k.sessionStorage&&sessionStorage.getItem("qunit-filter-passed-tests")){a.checked=true;o=document.getElementById("qunit-tests");o.className=o.className+" hidepass"}n.appendChild(a);l=document.createElement("label");l.setAttribute("for","qunit-filter-pass");l.setAttribute("title","Only show tests and assertons that fail. Stored in sessionStorage.");l.innerHTML="Hide passed tests";n.appendChild(l);F=document.createElement('span');F.innerHTML=O;E(F,"change",function(R){var S={};S[R.target.name]=R.target.checked?true:undefined;w.location=Q.url(S)});n.appendChild(F);if(M>1){L=document.createElement('span');L.setAttribute('id','qunit-modulefilter-container');L.innerHTML=N;E(L,"change",function(){var R=L.getElementsByTagName("select")[0],S=decodeURIComponent(R.options[R.selectedIndex].value);w.location=Q.url({module:(S==="")?undefined:S})});n.appendChild(L)}}j=G("qunit-fixture");if(j){c.fixture=j.innerHTML}if(c.autostart){Q.start()}};E(w,"load",Q.load);d=w.onerror;w.onerror=function(e,a,l){var b=false;if(d){b=d(e,a,l)}if(b!==true){if(Q.config.current){if(Q.config.current.ignoreGlobalErrors){return true}Q.pushFailure(e,a+":"+l)}else{Q.test("global failure",C(function(){Q.pushFailure(e,a+":"+l)},{validTest:v}))}return false}return b};function m(){c.autorun=true;if(c.currentModule){I("moduleDone",Q,{name:c.currentModule,failed:c.moduleStats.bad,passed:c.moduleStats.all-c.moduleStats.bad,total:c.moduleStats.all})}var i,a,b=G("qunit-banner"),e=G("qunit-tests"),j=+new D()-c.started,l=c.stats.all-c.stats.bad,n=["Tests completed in ",j," milliseconds.<br/>","<span class='passed'>",l,"</span> tests of <span class='total'>",c.stats.all,"</span> passed, <span class='failed'>",c.stats.bad,"</span> failed."].join("");if(b){b.className=(c.stats.bad?"qunit-fail":"qunit-pass")}if(e){G("qunit-testresult").innerHTML=n}if(c.altertitle&&typeof document!=="undefined"&&document.title){document.title=[(c.stats.bad?"\u2716":"\u2714"),document.title.replace(/^[\u2714\u2716] /i,"")].join(" ")}if(c.reorder&&k.sessionStorage&&c.stats.bad===0){for(i=0;i<sessionStorage.length;i++){a=sessionStorage.key(i++);if(a.indexOf("qunit-test-")===0){sessionStorage.removeItem(a)}}}if(w.scrollTo){w.scrollTo(0,0)}I("done",Q,{failed:c.stats.bad,passed:l,total:c.stats.all,runtime:j})}function v(a){var i,b=c.filter&&c.filter.toLowerCase(),e=c.module&&c.module.toLowerCase(),j=(a.module+": "+a.testName).toLowerCase();if(a.callback&&a.callback.validTest===v){delete a.callback.validTest;return true}if(c.testNumber){return a.testNumber===c.testNumber}if(e&&(!a.module||a.module.toLowerCase()!==e)){return false}if(!b){return true}i=b.charAt(0)!=="!";if(!i){b=b.slice(1)}if(j.indexOf(b)!==-1){return i}return!i}function p(e,o){o=o===undefined?3:o;var s,a,i,b;if(e.stacktrace){return e.stacktrace.split("\n")[o+3]}else if(e.stack){s=e.stack.split("\n");if(/^error$/i.test(s[0])){s.shift()}if(f){a=[];for(i=o;i<s.length;i++){if(s[i].indexOf(f)!=-1){break}a.push(s[i])}if(a.length){return a.join("\n")}}return s[o]}else if(e.sourceURL){if(/qunit.js$/.test(e.sourceURL)){return}return e.sourceURL+":"+e.line}}function q(o){try{throw new Error()}catch(e){return p(e,o)}}function r(s){if(!s){return""}s=s+"";return s.replace(/[\&<>]/g,function(s){switch(s){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return s}})}function u(a,l){c.queue.push(a);if(c.autorun&&!c.blocking){y(l)}}function y(l){function n(){y(l)}var s=new D().getTime();c.depth=c.depth?c.depth+1:1;while(c.queue.length&&!c.blocking){if(!k.setTimeout||c.updateRate<=0||((new D().getTime()-s)<c.updateRate)){c.queue.shift()()}else{w.setTimeout(n,13);break}}c.depth--;if(l&&!c.blocking&&!c.queue.length&&c.depth===0){m()}}function z(){c.pollution=[];if(c.noglobals){for(var a in w){if(!h.call(w,a)||/^qunit-test-output/.test(a)){continue}c.pollution.push(a)}}}function A(n){var a,b,o=c.pollution;z();a=B(c.pollution,o);if(a.length>0){Q.pushFailure("Introduced global variable(s): "+a.join(", "))}b=B(o,c.pollution);if(b.length>0){Q.pushFailure("Deleted global variable(s): "+b.join(", "))}}function B(a,b){var i,j,e=a.slice();for(i=0;i<e.length;i++){for(j=0;j<b.length;j++){if(e[i]===b[j]){e.splice(i,1);i--;break}}}return e}function C(a,b){for(var e in b){if(b[e]===undefined){delete a[e]}else if(e!=="constructor"||a!==w){a[e]=b[e]}}return a}function E(e,a,b){if(e.addEventListener){e.addEventListener(a,b,false)}else if(e.attachEvent){e.attachEvent("on"+a,b)}else{b()}}function G(n){return!!(typeof document!=="undefined"&&document&&document.getElementById)&&document.getElementById(n)}function H(a){return function(b){c[a].push(b)}}function I(a,s,b){var i,e;if(Q.hasOwnProperty(a)){Q[a].call(s,b)}else{e=c[a];for(i=0;i<e.length;i++){e[i].call(s,b)}}}Q.equiv=(function(){function e(o,F,a){var b=Q.objectType(o);if(b){if(Q.objectType(F[b])==="function"){return F[b].apply(F,a)}else{return F[b]}}}var l,n=[],s=[],x=Object.getPrototypeOf||function(o){return o.__proto__},F=(function(){function o(b,a){if(b instanceof a.constructor||a instanceof b.constructor){return a==b}else{return a===b}}return{"string":o,"boolean":o,"number":o,"null":o,"undefined":o,"nan":function(b){return isNaN(b)},"date":function(b,a){return Q.objectType(b)==="date"&&a.valueOf()===b.valueOf()},"regexp":function(b,a){return Q.objectType(b)==="regexp"&&a.source===b.source&&a.global===b.global&&a.ignoreCase===b.ignoreCase&&a.multiline===b.multiline&&a.sticky===b.sticky},"function":function(){var a=n[n.length-1];return a!==Object&&typeof a!=="undefined"},"array":function(b,a){var i,j,L,M;if(Q.objectType(b)!=="array"){return false}L=a.length;if(L!==b.length){return false}s.push(a);for(i=0;i<L;i++){M=false;for(j=0;j<s.length;j++){if(s[j]===a[i]){M=true}}if(!M&&!l(a[i],b[i])){s.pop();return false}}s.pop();return true},"object":function(b,a){var i,j,L,M=true,P=[],N=[];if(a.constructor!==b.constructor){if(!((x(a)===null&&x(b)===Object.prototype)||(x(b)===null&&x(a)===Object.prototype))){return false}}n.push(a.constructor);s.push(a);for(i in a){L=false;for(j=0;j<s.length;j++){if(s[j]===a[i]){L=true}}P.push(i);if(!L&&!l(a[i],b[i])){M=false;break}}n.pop();s.pop();for(i in b){N.push(i)}return M&&l(P.sort(),N.sort())}}}());l=function(){var i=[].slice.apply(arguments);if(i.length<2){return true}return(function(a,b){if(a===b){return true}else if(a===null||b===null||typeof a==="undefined"||typeof b==="undefined"||Q.objectType(a)!==Q.objectType(b)){return false}else{return e(a,F,[b,a])}}(i[0],i[1])&&arguments.callee.apply(this,i.splice(1,i.length-1)))};return l}());
/**
 * jsDump Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com |
 * http://flesler.blogspot.com Licensed under BSD
 * (http://www.opensource.org/licenses/bsd-license.php) Date: 5/15/2008
 *
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
Q.jsDump=(function(){function b(s){return'"'+s.toString().replace(/"/g,'\\"')+'"'}function e(o){return o+""}function j(a,i,l){var s=F.separator(),o=F.indent(),L=F.indent(1);if(i.join){i=i.join(","+s+L)}if(!i){return a+l}return[a,L+i,o+l].join(s)}function n(a,s){var i=a.length,l=new Array(i);this.up();while(i--){l[i]=this.parse(a[i],undefined,s)}this.down();return j("[",l,"]")}var x=/^function (\w+)/,F={parse:function(o,a,s){s=s||[];var i,l,L=this.parsers[a||this.typeOf(o)];a=typeof L;i=K(o,s);if(i!=-1){return"recursion("+(i-s.length)+")"}if(a=="function"){s.push(o);l=L.call(this,o,s);s.pop();return l}return(a=="string")?L:this.parsers.error},typeOf:function(o){var a;if(o===null){a="null"}else if(typeof o==="undefined"){a="undefined"}else if(Q.is("regexp",o)){a="regexp"}else if(Q.is("date",o)){a="date"}else if(Q.is("function",o)){a="function"}else if(typeof o.setInterval!==undefined&&typeof o.document!=="undefined"&&typeof o.nodeType==="undefined"){a="window"}else if(o.nodeType===9){a="document"}else if(o.nodeType){a="node"}else if(g.call(o)==="[object Array]"||(typeof o.length==="number"&&typeof o.item!=="undefined"&&(o.length?o.item(0)===o[0]:(o.item(0)===null&&typeof o[0]==="undefined")))){a="array"}else{a=typeof o}return a},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&nbsp;":" "},indent:function(a){if(!this.multiline){return""}var i=this.indentChar;if(this.HTML){i=i.replace(/\t/g,"   ").replace(/ /g,"&nbsp;")}return new Array(this._depth_+(a||0)).join(i)},up:function(a){this._depth_+=a||1},down:function(a){this._depth_-=a||1},setParser:function(a,i){this.parsers[a]=i},quote:b,literal:e,join:j,_depth_:1,parsers:{window:"[Window]",document:"[Document]",error:"[ERROR]",unknown:"[Unknown]","null":"null","undefined":"undefined","function":function(a){var i="function",l="name"in a?a.name:(x.exec(a)||[])[1];if(l){i+=" "+l}i+="( ";i=[i,Q.jsDump.parse(a,"functionArgs"),"){"].join("");return j(i,Q.jsDump.parse(a,"functionCode"),"}")},array:n,nodelist:n,"arguments":n,object:function(a,s){var l=[],o,L,M,i;Q.jsDump.up();if(Object.keys){o=Object.keys(a)}else{o=[];for(L in a){o.push(L)}}o.sort();for(i=0;i<o.length;i++){L=o[i];M=a[L];l.push(Q.jsDump.parse(L,"key")+": "+Q.jsDump.parse(M,undefined,s))}Q.jsDump.down();return j("{",l,"}")},node:function(i){var a,l,o=Q.jsDump.HTML?"&lt;":"<",s=Q.jsDump.HTML?"&gt;":">",L=i.nodeName.toLowerCase(),M=o+L;for(a in Q.jsDump.DOMAttrs){l=i[Q.jsDump.DOMAttrs[a]];if(l){M+=" "+a+"="+Q.jsDump.parse(l,"attribute")}}return M+s+o+"/"+L+s},functionArgs:function(a){var i,l=a.length;if(!l){return""}i=new Array(l);while(l--){i[l]=String.fromCharCode(97+l)}return" "+i.join(", ")+" "},key:b,functionCode:"[code]",attribute:b,string:b,date:b,regexp:e,number:e,"boolean":e},DOMAttrs:{id:"id",name:"name","class":"className"},HTML:false,indentChar:"  ",multiline:true};return F}());function J(e){var i,a,b="";for(i=0;e[i];i++){a=e[i];if(a.nodeType===3||a.nodeType===4){b+=a.nodeValue}else if(a.nodeType!==8){b+=J(a.childNodes)}}return b}function K(e,a){if(a.indexOf){return a.indexOf(e)}for(var i=0,l=a.length;i<l;i++){if(a[i]===e){return i}}return-1}
/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *
 * Usage: QUnit.diff(expected, actual)
 *
 * QUnit.diff( "the quick brown fox jumped over", "the quick fox jumps over" ) == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */
Q.diff=(function(){function B(o,n){var i,a={},b={};for(i=0;i<n.length;i++){if(a[n[i]]==null){a[n[i]]={rows:[],o:null}}a[n[i]].rows.push(i)}for(i=0;i<o.length;i++){if(b[o[i]]==null){b[o[i]]={rows:[],n:null}}b[o[i]].rows.push(i)}for(i in a){if(!h.call(a,i)){continue}if(a[i].rows.length==1&&typeof b[i]!="undefined"&&b[i].rows.length==1){n[a[i].rows[0]]={text:n[a[i].rows[0]],row:b[i].rows[0]};o[b[i].rows[0]]={text:o[b[i].rows[0]],row:a[i].rows[0]}}}for(i=0;i<n.length-1;i++){if(n[i].text!=null&&n[i+1].text==null&&n[i].row+1<o.length&&o[n[i].row+1].text==null&&n[i+1]==o[n[i].row+1]){n[i+1]={text:n[i+1],row:n[i].row+1};o[n[i].row+1]={text:o[n[i].row+1],row:i+1}}}for(i=n.length-1;i>0;i--){if(n[i].text!=null&&n[i-1].text==null&&n[i].row>0&&o[n[i].row-1].text==null&&n[i-1]==o[n[i].row-1]){n[i-1]={text:n[i-1],row:n[i].row-1};o[n[i].row-1]={text:o[n[i].row-1],row:i-1}}}return{o:o,n:n}}return function(o,n){o=o.replace(/\s+$/,"");n=n.replace(/\s+$/,"");var i,a,s="",b=B(o===""?[]:o.split(/\s+/),n===""?[]:n.split(/\s+/)),S=o.match(/\s+/g),e=n.match(/\s+/g);if(S==null){S=[" "]}else{S.push(" ")}if(e==null){e=[" "]}else{e.push(" ")}if(b.n.length===0){for(i=0;i<b.o.length;i++){s+="<del>"+b.o[i]+S[i]+"</del>"}}else{if(b.n[0].text==null){for(n=0;n<b.o.length&&b.o[n].text==null;n++){s+="<del>"+b.o[n]+S[n]+"</del>"}}for(i=0;i<b.n.length;i++){if(b.n[i].text==null){s+="<ins>"+b.n[i]+e[i]+"</ins>"}else{a="";for(n=b.n[i].row+1;n<b.o.length&&b.o[n].text==null;n++){a+="<del>"+b.o[n]+S[n]+"</del>"}s+=" "+b.n[i].text+e[i]+a}}}return s}}());if(typeof exports!=="undefined"){C(exports,Q)}}((function(){return this}.call())));
