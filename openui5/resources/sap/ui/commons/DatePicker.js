/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.DatePicker");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.commons.TextField");sap.ui.commons.TextField.extend("sap.ui.commons.DatePicker",{metadata:{library:"sap.ui.commons",properties:{"locale":{type:"string",group:"Misc",defaultValue:null},"yyyymmdd":{type:"string",group:"Misc",defaultValue:null}}}});jQuery.sap.require("sap.ui.thirdparty.jqueryui.jquery-ui-core");jQuery.sap.require("sap.ui.thirdparty.jqueryui.jquery-ui-datepicker");jQuery.sap.require("sap.ui.model.type.Date");(function(){var o=function(d,i){var I=this.id;var c=I.replace(/-input/,'');var C=sap.ui.getCore().getControl(c);if(C){if(C.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: JQUERY ONCLOSE CALLBACK")}C._hide()}};var O=function(y,m,i){if(document.activeElement){if(document.activeElement.className=="ui-datepicker-month"){setTimeout(sap.ui.commons.DatePicker._focusMonth,100)}else if(document.activeElement.className=="ui-datepicker-year"){setTimeout(sap.ui.commons.DatePicker._focusYear,100)}else{var p=jQuery(this).parent();var d=sap.ui.getCore().byId(p.attr("id"));if(d.oPrivate.bIsVisible){setTimeout(sap.ui.commons.DatePicker._focusCalendar,100)}}}};jQuery.datepicker.regional['']={changeMonth:true,changeYear:true,isRTL:sap.ui.getCore().getConfiguration().getRTL(),onChangeMonthYear:O,onClose:o,showOn:'button',showOtherMonths:true,selectOtherMonths:true,showWeek:true,weekHeader:''};jQuery.datepicker.setDefaults(jQuery.datepicker.regional[''])}());
sap.ui.commons.DatePicker.weekNumWithSundayFirst=function(d){var c=new Date(d.getTime());if(c.getDay()==0){c.setDate(c.getDate()+1)}return jQuery.datepicker.iso8601Week(c)};
sap.ui.commons.DatePicker.weekNumUS=function(d){var c=new Date(d.getTime());c.setDate(c.getDate()-c.getDay());if(d.getMonth()==0&&c.getMonth==11){return 1}var t=c.getTime();var f=new Date(c.getTime());f.setMonth(0);f.setDate(1);f.setDate(f.getDate()-f.getDay());return Math.floor(Math.round((c-f)/86400000)/7)+1};
sap.ui.commons.DatePicker.prototype.init=function(){sap.ui.commons.TextField.prototype.init.apply(this,arguments);this.oPrivate={bIsVisible:false,tLastTimeStamp:"",sValue:"",bVerboseMode:false};this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd"});if(sap.ui.Device.browser.mobile){this.mobile=true;this._oFormatMobile=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyy-MM-dd"})}};
sap.ui.commons.DatePicker.prototype._getInputId=function(){return this.getId()+"-input"};
sap.ui.commons.DatePicker.prototype.onAfterRendering=function(){var i=this._getInputId();var I=jQuery.sap.domById(i);jQuery(I).bind('keydown',jQuery.proxy(sap.ui.commons.DatePicker.prototype._handleKeydown,this));var b=this.getBindingInfo("value");var l=this.getRenderedLocale();if(b&&b.type&&b.type instanceof sap.ui.model.type.Date){var o=this.pattern;this.pattern=b.type.getOutputPattern();this._bValidateViaBinding=true;if(o!=this.pattern){var L=new sap.ui.core.Locale(l);this._oFormat=sap.ui.core.format.DateFormat.getInstance({pattern:this.pattern},L)}}if(!this.mobile){var s=jQuery.sap.byId(i);s.datepicker(jQuery.datepicker.regional[l]);s.removeAttr("title");var p=jQuery('#ui-datepicker-div');p.addClass('sapUi-jQdatePicker sapUi-visibilityHidden sapUiShd');var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");p.attr('role','dialog').attr('aria-label',r.getText("DATEPICKER_DIALOG"));if(this._bValidateViaBinding){s.datepicker("option","dateFormat",this._convertDatePattern(this.pattern));if(!this._bSetYyyymmddAfterRendering&&!this._bSetValueAfterRendering){s.datepicker("setDate",this.getValue())}}}if(this._bSetYyyymmddAfterRendering){this.setYyyymmdd(this.getYyyymmdd())}else if(this._bSetValueAfterRendering){this.setValue(this.getValue())}this._bSetYyyymmddAfterRendering=undefined;this._bSetValueAfterRendering=undefined};
sap.ui.commons.DatePicker.prototype._show=function(){if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: ._show()")}if(sap.ui.core.Popup){sap.ui.core.Popup.getNextZIndex()}var s=jQuery.sap.byId(this._getInputId());var p=jQuery('#ui-datepicker-div');p.removeClass('sapUi-visibilityHidden sapUi-DP-top');s.datepicker("show");if(p.offset().top<s.offset().top){p.addClass('sapUi-DP-top')}if(p.css('position')=='fixed'){if((p.position().top-jQuery(document).scrollTop()+p.outerHeight())>document.documentElement.clientHeight){var n=(p.position().top-jQuery(document).scrollTop()-p.outerHeight()-s.outerHeight())+'px';p.css('top',n)}}this.oPrivate.bIsVisible=true;this._setKeyboardNavigation();setTimeout(sap.ui.commons.DatePicker._focusCalendar,100);if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: open")}};
sap.ui.commons.DatePicker.prototype._hide=function(){if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: ._hide()")}if(this.oPrivate.bIsVisible){var c=new Date().getTime();this.oPrivate.tLastTimeStamp=c;jQuery('#ui-datepicker-div').addClass('sapUi-visibilityHidden');this.oPrivate.bIsVisible=false;var s=jQuery.sap.byId(this._getInputId());s.datepicker("hide");var i=this.getInputDomRef();if(i.value!=this.getValue()){this._checkChange()}if(i){i.focus()}}if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: closed")}};
sap.ui.commons.DatePicker.prototype.onclick=function(e){var t=e.target;if(this.mobile&&t.nodeName!="INPUT"){return}if(!this.getEnabled()||!this.getEditable()){if(t.nodeName!="INPUT"){this.$().focus()}return}if(t.nodeName!="INPUT"){if(this.oPrivate.bIsVisible){if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: BUTTON-CLICK HIDE")}this._hide()}else{var c=new Date().getTime();var a=c-this.oPrivate.tLastTimeStamp;if(a&&a<300){if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: BUTTON-D-CLICK IGNORED: "+a+"msec")}this.getInputDomRef().focus()}else{if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: BUTTON-CLICK SHOW")}if(!sap.ui.Device.support.input.placeholder){this.onfocusin(e)}this._show()}}}};
sap.ui.commons.DatePicker.prototype.onmousedown=function(e){if(this.oPrivate.bIsVisible){e.stopPropagation()}};
sap.ui.commons.DatePicker.prototype.onsapshow=function(e){if(!this.getEnabled||!this.getEditable()||this.mobile){return}if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: .onsapshow()")}this._checkChange(e);this._show();e.preventDefault();e.stopPropagation()};
sap.ui.commons.DatePicker.prototype._handleKeydown=function(e){if(this.mobile){return}if(e.keyCode==jQuery.sap.KeyCodes.PAGE_UP&&!e.ctrlKey&&!e.shiftKey){this._increaseDate("day",1,e)}else if(e.keyCode==jQuery.sap.KeyCodes.PAGE_DOWN&&!e.ctrlKey&&!e.shiftKey){this._increaseDate("day",-1,e)}else if(e.keyCode==jQuery.sap.KeyCodes.PAGE_UP&&!e.ctrlKey&&e.shiftKey){this._increaseDate("month",1,e)}else if(e.keyCode==jQuery.sap.KeyCodes.PAGE_DOWN&&!e.ctrlKey&&e.shiftKey){this._increaseDate("month",-1,e)}else if(e.keyCode==jQuery.sap.KeyCodes.PAGE_UP&&e.ctrlKey&&e.shiftKey){this._increaseDate("year",1,e)}else if(e.keyCode==jQuery.sap.KeyCodes.PAGE_DOWN&&e.ctrlKey&&e.shiftKey){this._increaseDate("year",-1,e)}};
sap.ui.commons.DatePicker.prototype._increaseDate=function(u,i,e){var s=jQuery.sap.byId(this._getInputId());var d=s.datepicker("getDate");if(!d){return}switch(u){case"day":d.setDate(d.getDate()+i);break;case"month":d.setMonth(d.getMonth()+i);break;case"year":d.setFullYear(d.getFullYear()+i);break;default:break}s.datepicker("setDate",d);e.preventDefault()};
sap.ui.commons.DatePicker.prototype.onsapfocusleave=function(e){if(this.oPrivate.bIsVisible){return}if(this.oPrivate.bVerboseMode){jQuery.sap.log.debug("DATEPICKER: .onsapfocusleave()")}sap.ui.commons.TextField.prototype.onsapfocusleave.apply(this,arguments)};
sap.ui.commons.DatePicker._focusCalendar=function(){var p=jQuery('#ui-datepicker-div');var c=p.attr('associatedControlId');if(!c){return}var C=sap.ui.getCore().getControl(c);if(!C){return}if(!C.oPrivate.bIsVisible){p.attr('restoreFocusOnDay',"");return}var d=jQuery.sap.domById(c);var f=null;var F=null;var D=p.attr('restoreFocusOnDay');if(D){f=jQuery('a.ui-state-default');var a=Number(D);if(a<=0){a+=f.length}F=f[a-1];if(F&&F.offsetHeight){F.focus();jQuery(F).mouseover();if(d.className.indexOf("sapUiTfFoc")==-1){d.className+=" sapUiTfFoc"}p.attr('restoreFocusOnDay',"");return}}F=jQuery('a.ui-state-default.ui-state-hover').get(0);if(!F){f=jQuery('td.ui-datepicker-current-day');F=(f[0])?f[0].firstChild:null}if(!F){f=jQuery('td.ui-datepicker-today');F=(f[0])?f[0].firstChild:null}if(!F){var b=jQuery("a.ui-state-default");for(var i=0;i<b.length;i++){var o=b[i];if(!jQuery(o).hasClass('ui-priority-secondary')){F=o;break}}}if(F&&F.nodeName=="A"&&F.offsetHeight){F.focus();jQuery(F).mouseover();if(d.className.indexOf("sapUiTfFoc")==-1){d.className+=" sapUiTfFoc"}return}setTimeout(sap.ui.commons.DatePicker._focusCalendar,100)};
sap.ui.commons.DatePicker._focusMonth=function(){jQuery('select.ui-datepicker-year')[0].focus();jQuery('select.ui-datepicker-month')[0].focus()};
sap.ui.commons.DatePicker._focusYear=function(){jQuery('select.ui-datepicker-month')[0].focus();jQuery('select.ui-datepicker-year')[0].focus()};
sap.ui.commons.DatePicker._keyboardHandler=function(e){function f(n){var i=jQuery("a.ui-state-default");var O=jQuery(i[n-1]).hasClass('ui-priority-secondary');if((n>0)&&(n<=i.length)&&!O){i[n-1].focus();jQuery(i[n-1]).mouseover()}else if((n<=0)||(O&&n<7)){var s=0;if(jQuery(i[0]).hasClass('ui-priority-secondary')){s=7}jQuery("a.ui-datepicker-prev").focus();jQuery("a.ui-datepicker-prev").click();var N=jQuery("a.ui-state-default");jQuery(N[N.length-1-s+n]).mouseover();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(N.length-s+n))}else{var s=0;var l=n-i.length;if(jQuery(i[i.length-1]).hasClass('ui-priority-secondary')){s=7}jQuery("a.ui-datepicker-next").focus();jQuery("a.ui-datepicker-next").click();var N=jQuery("a.ui-state-default");jQuery(N[s+l-1]).mouseover();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(s+l))}}function a(){var i=jQuery("a.ui-state-default");for(var D=i.length-1;D>=0;D--){var o=i[D];if(!jQuery(o).hasClass('ui-priority-secondary')){o.focus();jQuery(o).mouseover();return(D)}}}function b(F){var i=jQuery("a.ui-state-default");for(var D=0;D<i.length;D++){var o=i[D];if(!jQuery(o).hasClass('ui-priority-secondary')){o.focus();jQuery(o).mouseover();return(D)}}}function c(n){var l=jQuery("a.ui-state-default");var m=l[n-1].parentNode.parentNode;for(var i=0,q=l.length;i<q;i++){if(l[i].parentNode.parentNode==m){if(!jQuery(l[i]).hasClass('ui-priority-secondary')){l[i].focus();jQuery(l[i]).mouseover()}else{jQuery("a.ui-datepicker-prev").focus();jQuery("a.ui-datepicker-prev").click();var N=jQuery("a.ui-state-default");jQuery(N[N.length-7]).mouseover();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(N.length-6))}return}}}function d(n){var l=jQuery("a.ui-state-default");var m=l[n-1].parentNode.parentNode;for(var i=l.length-1;i>=0;i--){if(l[i].parentNode.parentNode==m){if(!jQuery(l[i]).hasClass('ui-priority-secondary')){l[i].focus();jQuery(l[i]).mouseover()}else{jQuery("a.ui-datepicker-next").focus();jQuery("a.ui-datepicker-next").click();var N=jQuery("a.ui-state-default");jQuery(N[6]).mouseover();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(7))}return}}}var k=e.keyCode;var t=e.target;var g=Number(t.innerHTML);var I=(t.nodeName=="SELECT");var h=(t.nodeName=="A");if(!I&&!h){jQuery.sap.log.debug("ERROR: DatePicker.prototype._keyboardHandler()");return}for(var D=0;D<jQuery("a.ui-state-default").length;D++){var o=jQuery("a.ui-state-default")[D];if(t==o){g=D+1;break}}switch(k){case jQuery.sap.KeyCodes.TAB:if(I){if((t.className.indexOf("year")!=-1&&!e.shiftKey)||(t.className.indexOf("month")!=-1&&e.shiftKey)){setTimeout(sap.ui.commons.DatePicker._focusCalendar,100)}else{if(t.className.indexOf("year")!=-1){setTimeout(sap.ui.commons.DatePicker._focusMonth,100)}else{setTimeout(sap.ui.commons.DatePicker._focusYear,100)}return}}else{if(e.shiftKey){jQuery("select.ui-datepicker-year")[0].focus()}else{jQuery("select.ui-datepicker-month")[0].focus()}}break;case jQuery.sap.KeyCodes.ENTER:if(document.activeElement){if(document.activeElement.className=="ui-datepicker-month"){setTimeout(sap.ui.commons.DatePicker._focusMonth,100);break}else if(document.activeElement.className=="ui-datepicker-year"){setTimeout(sap.ui.commons.DatePicker._focusYear,100);break}}return;break;case jQuery.sap.KeyCodes.ESCAPE:var p=jQuery('#ui-datepicker-div');var C=p.attr('associatedControlId');var j=sap.ui.getCore().getControl(C);j._hide();break;case jQuery.sap.KeyCodes.SPACE:if(h){jQuery(t.offsetParent).click()}else{return}break;case jQuery.sap.KeyCodes.PAGE_UP:jQuery("a.ui-datepicker-prev").click();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(b()+1));break;case jQuery.sap.KeyCodes.PAGE_DOWN:jQuery("a.ui-datepicker-next").click();jQuery('#ui-datepicker-div').attr('restoreFocusOnDay',String(b()+1));break;case jQuery.sap.KeyCodes.END:if(h){if(e.ctrlKey){a()}else{d(g)}}else{return}break;case jQuery.sap.KeyCodes.HOME:if(h){if(e.ctrlKey){b()}else{c(g)}}else{return}break;case jQuery.sap.KeyCodes.ARROW_LEFT:if(h){if(sap.ui.getCore().getConfiguration().getRTL()){f(g+1)}else{f(g-1)}}else{return}break;case jQuery.sap.KeyCodes.ARROW_UP:if(h){f(g-7)}else{return}break;case jQuery.sap.KeyCodes.ARROW_RIGHT:if(h){if(sap.ui.getCore().getConfiguration().getRTL()){f(g-1)}else{f(g+1)}}else{return}break;case jQuery.sap.KeyCodes.ARROW_DOWN:if(h){f(g+7)}else{return}break;default:return}e.preventDefault();e.stopPropagation()};
sap.ui.commons.DatePicker.prototype._setKeyboardNavigation=function(){var p=jQuery('#ui-datepicker-div');if(p){var r=p.attr('associatedControlId');if(!r){p.bind('keydown',jQuery.proxy(sap.ui.commons.DatePicker._keyboardHandler,this))}p.attr('associatedControlId',this.getId())}else{jQuery.sap.log.debug("ERROR: DatePicker ._setKeyboardNavigation() fails.")}};
sap.ui.commons.DatePicker.prototype.getRenderedLocale=function(){var l=this.getLocale();if(l){var L=new sap.ui.core.Locale(l);l=L.toString()}else{l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();this.setLocaleTexts(l)}if(!l){l="en";this.setLocaleTexts(l)}return l};
sap.ui.commons.DatePicker.prototype.setYyyymmdd=function(y){this.setProperty("yyyymmdd",y,true);var i=this.getInputDomRef();if(!i){this._bSetYyyymmddAfterRendering=true;this._bSetValueAfterRendering=false;return this}var s=jQuery.sap.byId(this._getInputId());var v;try{var d=this._oFormatYyyymmdd.parse(y);if(this.mobile){v=this._oFormat.format(d);var o=this._oFormatMobile.format(d);s.val(o)}else{s.datepicker("setDate",d);v=i.value}}catch(e){jQuery.sap.log.error("Error: DATEPICKER setYyyymmdd("+y+") failed! Maybe the format is wrong.");return this};this.setProperty("value",v,true);return this};
sap.ui.commons.DatePicker.prototype.setValue=function(v){var i=this.getInputDomRef();if(!i){this.setProperty("value",v,true);this._bSetValueAfterRendering=true;this._bSetYyyymmddAfterRendering=false;return this}var s=jQuery.sap.byId(this._getInputId());var d;try{if(this.mobile){d=this._oFormat.parse(v);var o=this._oFormatMobile.format(d);s.val(o)}else{s.datepicker("setDate",v);d=s.datepicker("getDate");v=i.value}var y="";if(d){y=this._oFormatYyyymmdd.format(d)}}catch(e){jQuery.sap.log.error("Error: DATEPICKER setValue("+v+") failed! Maybe VALUE was not supplied in the appropriate LOCALE format!");this.setProperty("value",v,true);return this}this.setProperty("value",v,true);this.setProperty("yyyymmdd",y,true);jQuery.sap.log.debug("DATEPICKER("+this.getId()+"): setValue: value= "+this.getValue()+" yyyymmdd= "+this.getYyyymmdd());return this};
sap.ui.commons.DatePicker.prototype.setLocale=function(l){var o=this.getLocale();if(l==o){return this}this.setProperty("locale",l,true);var i=this.getInputDomRef();if(!i){this.setLocaleTexts(l);return this}l=this.getRenderedLocale();var s=jQuery.sap.byId(this._getInputId());if(!this.mobile){this.setLocaleTexts(l);var d=s.datepicker("getDate");s.datepicker("destroy");s.datepicker(jQuery.datepicker.regional[l]);s.datepicker("setDate",d);this.setValue(i.value)}else{var v=this.getValue();d=this._oFormat.parse(v);this.setLocaleTexts(l);v=this._oFormat.format(d);this.setProperty("value",v,true)}return this};
sap.ui.commons.DatePicker.prototype.setLocaleTexts=function(l){var L=new sap.ui.core.Locale(l);var o=sap.ui.core.LocaleData.getInstance(L);l=L.toString();var r=jQuery.datepicker.regional[l];if(!r||!r.closeText){r=r||(jQuery.datepicker.regional[l]={});var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons",l);r.closeText=a.getText("DATEPICKER_CLOSE_TEXT");r.prevText=a.getText("DATEPICKER_PREV_TEXT");r.nextText=a.getText("DATEPICKER_NEXT_TEXT");r.currentText=a.getText("DATEPICKER_CURRENT_TEXT");r.monthNames=o.getMonths("wide");r.monthNamesShort=o.getMonths("abbreviated");r.dayNames=o.getDays("wide");r.dayNamesShort=o.getDays("abbreviated");if(L.sLanguage=="zh"||o.getDaysStandAlone("abbreviated")[0].length>2){r.dayNamesMin=o.getDaysStandAlone("narrow")}else{r.dayNamesMin=o.getDaysStandAlone("abbreviated")}r.dateFormat=this._convertDatePattern(o.getDatePattern("medium"));r.showMonthAfterYear=this._getOrderMonthYear(r.dateFormat);r.firstDay=o.getFirstDayOfWeek();if(l=="en-US"){r.calculateWeek=sap.ui.commons.DatePicker.weekNumUS}else if(r.firstDay==0){r.calculateWeek=sap.ui.commons.DatePicker.weekNumWithSundayFirst}}if(!this._bValidateViaBinding){var O=this.pattern;this.pattern=o.getDatePattern("medium");if(O!=this.pattern){this._oFormat=sap.ui.core.format.DateFormat.getInstance({pattern:this.pattern},L)}}};
sap.ui.commons.DatePicker.prototype._convertDatePattern=function(p){var f=sap.ui.core.format.DateFormat.prototype.parseJavaDateFormat(p);var b=[];var P;var F;var n=false;for(var i=0;i<f.length;i++){P=f[i];switch(P.sType){case"text":b.push(P.sValue);break;case"day":if(P.iDigits==1){b.push("d")}else{b.push("dd")}break;case"dayNameInWeek":case"dayNameInWeekStandalone":if(P.iDigits<4){b.push("D")}else if(P.iDigits>=4){b.push("DD")}break;case"dayInYear":if(P.iDigits<4){b.push("o")}else if(P.iDigits>=4){b.push("oo")}break;case"dayNumberOfWeek":n=true;break;case"month":case"monthStandalone":if(P.iDigits==1){b.push("m")}else if(P.iDigits==2){b.push("mm")}else if(P.iDigits==3){b.push("M")}else if(P.iDigits==4){b.push("MM")}else{b.push("m")}break;case"era":b.push("AD");break;case"year":case"weekYear":if(P.iDigits==2){b.push("y")}else{b.push("yy")}break;case"weekInYear":n=true;break;default:n=true;break}}F=b.join("");if(n){jQuery.sap.log.warning("Date pattern \""+p+"\" not supported by DatePicker","_convertDatePattern","DatePicker")}return F};
sap.ui.commons.DatePicker.prototype._getOrderMonthYear=function(f){var i=f.indexOf('M'),I=f.lastIndexOf('y');if(i==-1){i=f.indexOf('m')}if(i>I){return true}else{return false}};
sap.ui.commons.DatePicker.prototype.fireChange=function(i){this.fireEvent("change",{newValue:this.getValue(),newYyyymmdd:this.getYyyymmdd(),invalidValue:i});return this};
sap.ui.commons.DatePicker.prototype._checkChange=function(e){var i=this.getInputDomRef(),n=i&&i.value;if(this.mobile){var d=this._oFormatMobile.parse(n);n=this._oFormat.format(d)}if(this.getEditable()&&this.getEnabled()&&n!=this.getValue()){var l=this.getRenderedLocale();var d;var w=false;if(!this.mobile){if(n!=""){d=this._oFormat.parse(n);if(d){n=this._oFormat.format(d)}else{w=true}}}if(w){this.setProperty("value",n,true)}else{this.setValue(n)}this.fireChange(w)}else if(this.getEditable()&&this.getEnabled()&&n==this.getYyyymmdd()){i.value=this.getValue()}};
