/*! RD_TemplatePackage_Contrib 2015-12-16 Build: 1.4.1.1 */
!function(window,document,undefined){window.CDC=window.CDC||{},window.CDC.Widget=window.CDC.Widget||{},window.CDC.Widget.Common=window.CDC.Widget.Common||function(){var objCommon={};return objCommon.loadScript=function(script,callback){var eleScript=document.createElement("script"),eleHead=document.getElementsByTagName("head")[0];if(script!==undefined&&script.length>0){eleScript.src=script;var fctLocalCallback=function(){objCommon.log("Loading script: "+script),callback!==undefined?(objCommon.log("Executing Callback: "+script),callback()):objCommon.log("No Callback Provided for: "+script)};eleScript.addEventListener?eleScript.addEventListener("load",fctLocalCallback,!1):eleScript.readyState&&(eleScript.onreadystatechange=fctLocalCallback),eleHead.appendChild(eleScript)}},objCommon.cleanString=function(anyString){return anyString=anyString||"","string"!=typeof cleanString&&(anyString=anyString.toString()),anyString.replace("	","").replace("\r","").replace("\n","")},objCommon.s4=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},objCommon.guid=function(){return objCommon.s4()+objCommon.s4()+"-"+objCommon.s4()+"-"+objCommon.s4()+"-"+objCommon.s4()+"-"+objCommon.s4()+objCommon.s4()+objCommon.s4()},objCommon.replaceAll=function(find,replace,str){return find="|"===find?new RegExp("\\|","g"):new RegExp(find,"g"),str.replace(find,replace)},objCommon.init=function(objSettings){objCommon.iFrameResizerContentWindow();for(var aryCallParams=window.location.search.replace("?","").split("&"),len=aryCallParams.length;len--;){var aryNvp=aryCallParams[len].split("=");objCommon.runtime.callParams[aryNvp[0]]=aryNvp[1]}objCommon.loadScript(objCommon.runtime.widgetScript,function(){objCommon.events.init(),window.CDC.Widget.load&&CDC.Widget.load(objCommon)}),objCommon.log("window.CDC.Widget.Common.runtime"),objCommon.log(objCommon.runtime)},objCommon.initOnSyndication=function(){objCommon.log("** This content is being syndicated (loaded in an iframe) **"),window.CDC.Widget.syndicatedLoad&&(objCommon.log("** Executing Widget Syndicated Load Hander **"),window.CDC.Widget.syndicatedLoad(objCommon))},objCommon.getCallParam=function(paramName,blnDecode){blnDecode="undefined"==typeof blnDecode?!0:blnDecode;var anyVar=objCommon.runtime.callParams[paramName]||null;return blnDecode&&null!==anyVar?decodeURIComponent(anyVar):anyVar},objCommon.attrToCamelCase=function(strAttribute){var arySource,strCurr,i,aryDestination=[];for(arySource=strAttribute.toLowerCase().replace("data-","").split("-"),i=0;i<arySource.length;i++)strCurr=arySource[i],i>0&&(strCurr=strCurr.charAt(0).toUpperCase()+strCurr.substring(1)),aryDestination.push(strCurr);return aryDestination.join("")},objCommon.createEmbedCode=function(strWidgetName,aryParameters){var aryEmbedCode=[],objCallParams=objCommon.runtime.callParams;aryEmbedCode.push('<div data-cdc-widget="'+strWidgetName+'"');for(var strAttrName,strParamName,i=aryParameters.length-1;i>=0;i--)strAttrName=aryParameters[i],strParamName=objCommon.attrToCamelCase(strAttrName),objCallParams.hasOwnProperty(strParamName)&&aryEmbedCode.push(strAttrName+'="'+objCallParams[strParamName]+'"');return aryEmbedCode.push("></div>"),aryEmbedCode.push("\n"),aryEmbedCode.push('<script src="https://tools.cdc.gov/1M1B"><script>'),objCommon.runtime.embedCode=aryEmbedCode.join(" "),objCommon.events.setEmbedCode(objCommon.runtime.embedCode),objCommon.events.setEmbedCode},objCommon.iFrameResizerContentWindow=function(){"use strict";function addEventListener(el,evt,func){"addEventListener"in window?el.addEventListener(evt,func,!1):"attachEvent"in window&&el.attachEvent("on"+evt,func)}function formatLogMsg(msg){return msgID+"["+myID+"] "+msg}function log(msg){logging&&"object"==typeof window.console&&console.log(formatLogMsg(msg))}function warn(msg){"object"==typeof window.console&&console.warn(formatLogMsg(msg))}function init(){log("Initializing iFrame"),objCommon.initOnSyndication(),readData(),setMargin(),setBodyStyle("background",bodyBackground),setBodyStyle("padding",bodyPadding),injectClearFixIntoBodyElement(),checkHeightMode(),stopInfiniteResizingOfIFrame(),setupPublicMethods(),startEventListeners(),inPageLinks=setupInPageLinks(),sendSize("init","Init message from host page")}function readData(){function strBool(str){return"true"===str?!0:!1}var data=initMsg.substr(msgIdLen).split(":");myID=data[0],bodyMargin=undefined!==data[1]?Number(data[1]):bodyMargin,calculateWidth=undefined!==data[2]?strBool(data[2]):calculateWidth,logging=undefined!==data[3]?strBool(data[3]):logging,interval=undefined!==data[4]?Number(data[4]):interval,publicMethods=undefined!==data[5]?strBool(data[5]):publicMethods,autoResize=undefined!==data[6]?strBool(data[6]):autoResize,bodyMarginStr=data[7],heightCalcMode=undefined!==data[8]?data[8]:heightCalcMode,bodyBackground=data[9],bodyPadding=data[10],tolerance=undefined!==data[11]?Number(data[11]):tolerance,inPageLinks.enable=undefined!==data[12]?strBool(data[12]):!1,resizeFrom=data[13]}function chkCSS(attr,value){return-1!==value.indexOf("-")&&(warn("Negative CSS value ignored for "+attr),value=""),value}function setBodyStyle(attr,value){undefined!==value&&""!==value&&"null"!==value&&(document.body.style[attr]=value,log("Body "+attr+' set to "'+value+'"'))}function setMargin(){undefined===bodyMarginStr&&(bodyMarginStr=bodyMargin+"px"),chkCSS("margin",bodyMarginStr),setBodyStyle("margin",bodyMarginStr)}function stopInfiniteResizingOfIFrame(){document.documentElement.style.height="",document.body.style.height="",log('HTML & body height set to "auto"')}function addTriggerEvent(options){function addListener(eventName){addEventListener(window,eventName,function(e){sendSize(options.eventName,options.eventType)})}options.eventNames&&Array.prototype.map?(options.eventName=options.eventNames[0],options.eventNames.map(addListener)):addListener(options.eventName),log("Added event listener: "+options.eventType)}function initEventListeners(){addTriggerEvent({eventType:"Animation Start",eventNames:["animationstart","webkitAnimationStart"]}),addTriggerEvent({eventType:"Animation Iteration",eventNames:["animationiteration","webkitAnimationIteration"]}),addTriggerEvent({eventType:"Animation End",eventNames:["animationend","webkitAnimationEnd"]}),addTriggerEvent({eventType:"Device Orientation Change",eventName:"deviceorientation"}),addTriggerEvent({eventType:"Transition End",eventNames:["transitionend","webkitTransitionEnd","MSTransitionEnd","oTransitionEnd","otransitionend"]}),addTriggerEvent({eventType:"Window Clicked",eventName:"click"}),"child"===resizeFrom&&addTriggerEvent({eventType:"IFrame Resized",eventName:"resize"})}function checkHeightMode(){heightCalcModeDefault!==heightCalcMode&&(heightCalcMode in getHeight||(warn(heightCalcMode+" is not a valid option for heightCalculationMethod."),heightCalcMode="bodyScroll"),log('Height calculation method set to "'+heightCalcMode+'"'))}function startEventListeners(){!0===autoResize?(initEventListeners(),setupMutationObserver()):log("Auto Resize disabled")}function injectClearFixIntoBodyElement(){var clearFix=document.createElement("div");clearFix.style.clear="both",clearFix.style.display="block",document.body.appendChild(clearFix)}function setupInPageLinks(){function getPagePosition(){return{x:window.pageXOffset!==undefined?window.pageXOffset:document.documentElement.scrollLeft,y:window.pageYOffset!==undefined?window.pageYOffset:document.documentElement.scrollTop}}function getElementPosition(el){var elPosition=el.getBoundingClientRect(),pagePosition=getPagePosition();return{x:parseInt(elPosition.left,10)+parseInt(pagePosition.x,10),y:parseInt(elPosition.top,10)+parseInt(pagePosition.y,10)}}function findTarget(location){function jumpToTarget(target){var jumpPosition=getElementPosition(target);log("Moving to in page link (#"+hash+") at x: "+jumpPosition.x+" y: "+jumpPosition.y),sendMsg(jumpPosition.y,jumpPosition.x,"scrollToOffset")}var hash=location.split("#")[1]||"",hashData=decodeURIComponent(hash),target=document.getElementById(hashData)||document.getElementsByName(hashData)[0];target?jumpToTarget(target):(log("In page link (#"+hash+") not found in iFrame, so sending to parent"),sendMsg(0,0,"inPageLink","#"+hash))}function checkLocationHash(){""!==location.hash&&"#"!==location.hash&&findTarget(location.href)}function bindAnchors(){function setupLink(el){function linkClicked(e){e.preventDefault(),findTarget(this.getAttribute("href"))}"#"!==el.getAttribute("href")&&addEventListener(el,"click",linkClicked)}Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'),setupLink)}function bindLocationHash(){addEventListener(window,"hashchange",checkLocationHash)}function initCheck(){setTimeout(checkLocationHash,eventCancelTimer)}function enableInPageLinks(){Array.prototype.forEach&&document.querySelectorAll?(log("Setting up location.hash handlers"),bindAnchors(),bindLocationHash(),initCheck()):warn("In page linking not fully supported in this browser! (See README.md for IE8 workaround)")}return inPageLinks.enable?enableInPageLinks():log("In page linking not enabled"),{findTarget:findTarget}}function setupPublicMethods(){publicMethods&&(log("Enable public methods"),window.parentIFrame={close:function(){sendMsg(0,0,"close")},getId:function(){return myID},moveToAnchor:function(hash){inPageLinks.findTarget(hash)},reset:function(){resetIFrame("parentIFrame.reset")},scrollTo:function(x,y){sendMsg(y,x,"scrollTo")},scrollToOffset:function(x,y){sendMsg(y,x,"scrollToOffset")},sendMessage:function(msg,targetOrigin){sendMsg(0,0,"message",JSON.stringify(msg),targetOrigin)},setHeightCalculationMethod:function(heightCalculationMethod){heightCalcMode=heightCalculationMethod,checkHeightMode()},setTargetOrigin:function(targetOrigin){log("Set targetOrigin: "+targetOrigin),targetOriginDefault=targetOrigin},size:function(customHeight,customWidth){var valString=""+(customHeight?customHeight:"")+(customWidth?","+customWidth:"");lockTrigger(),sendSize("size","parentIFrame.size("+valString+")",customHeight,customWidth)}})}function initInterval(){0!==interval&&(log("setInterval: "+interval+"ms"),setInterval(function(){sendSize("interval","setInterval: "+interval)},Math.abs(interval)))}function setupInjectElementLoadListners(mutations){function addLoadListener(element){(element.height===undefined||element.width===undefined||0===element.height||0===element.width)&&(log("Attach listerner to "+element.src),addEventListener(element,"load",function(){sendSize("imageLoad","Image loaded")}))}mutations.forEach(function(mutation){if("attributes"===mutation.type&&"src"===mutation.attributeName)addLoadListener(mutation.target);else if("childList"===mutation.type){var images=mutation.target.querySelectorAll("img");Array.prototype.forEach.call(images,function(image){addLoadListener(image)})}})}function setupMutationObserver(){function createMutationObserver(){var target=document.querySelector("body"),config={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},observer=new MutationObserver(function(mutations){sendSize("mutationObserver","mutationObserver: "+mutations[0].target+" "+mutations[0].type),setupInjectElementLoadListners(mutations)});log("Enable MutationObserver"),observer.observe(target,config)}var MutationObserver=window.MutationObserver||window.WebKitMutationObserver;MutationObserver?0>interval?initInterval():createMutationObserver():(warn("MutationObserver not supported in this browser!"),initInterval())}function getBodyOffsetHeight(){function getComputedBodyStyle(prop){function convertUnitsToPxForIE8(value){var PIXEL=/^\d+(px)?$/i;if(PIXEL.test(value))return parseInt(value,base);var style=el.style.left,runtimeStyle=el.runtimeStyle.left;return el.runtimeStyle.left=el.currentStyle.left,el.style.left=value||0,value=el.style.pixelLeft,el.style.left=style,el.runtimeStyle.left=runtimeStyle,value}var el=document.body,retVal=0;return"defaultView"in document&&"getComputedStyle"in document.defaultView?(retVal=document.defaultView.getComputedStyle(el,null),retVal=null!==retVal?retVal[prop]:0):retVal=convertUnitsToPxForIE8(el.currentStyle[prop]),parseInt(retVal,base)}return document.body.offsetHeight+getComputedBodyStyle("marginTop")+getComputedBodyStyle("marginBottom")}function getBodyScrollHeight(){return document.body.scrollHeight}function getDEOffsetHeight(){return document.documentElement.offsetHeight}function getDEScrollHeight(){return document.documentElement.scrollHeight}function getLowestElementHeight(){for(var allElements=document.querySelectorAll("body *"),allElementsLength=allElements.length,maxBottomVal=0,timer=(new Date).getTime(),i=0;allElementsLength>i;i++)allElements[i].getBoundingClientRect().bottom>maxBottomVal&&(maxBottomVal=allElements[i].getBoundingClientRect().bottom);return timer=(new Date).getTime()-timer,log("Parsed "+allElementsLength+" HTML elements"),log("LowestElement bottom position calculated in "+timer+"ms"),maxBottomVal}function getAllHeights(){return[getBodyOffsetHeight(),getBodyScrollHeight(),getDEOffsetHeight(),getDEScrollHeight()]}function getMaxHeight(){return Math.max.apply(null,getAllHeights())}function getMinHeight(){return Math.min.apply(null,getAllHeights())}function getBestHeight(){return Math.max(getBodyOffsetHeight(),getLowestElementHeight())}function getWidth(){return Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)}function sendSize(triggerEvent,triggerEventDesc,customHeight,customWidth){function recordTrigger(){triggerEvent in{reset:1,resetPage:1,init:1}||log("Trigger event: "+triggerEventDesc)}function resizeIFrame(){height=currentHeight,width=currentWidth,sendMsg(height,width,triggerEvent)}function isDoubleFiredEvent(){return triggerLocked&&triggerEvent in doubleEventList}function isSizeChangeDetected(){function checkTolarance(a,b){var retVal=Math.abs(a-b)<=tolerance;return!retVal}return currentHeight=undefined!==customHeight?customHeight:getHeight[heightCalcMode](),currentWidth=undefined!==customWidth?customWidth:getWidth(),checkTolarance(height,currentHeight)||calculateWidth&&checkTolarance(width,currentWidth)}function isForceResizableEvent(){return!(triggerEvent in{init:1,interval:1,size:1})}function isForceResizableHeightCalcMode(){return heightCalcMode in resetRequiredMethods}function logIgnored(){log("No change in size detected")}function checkDownSizing(){isForceResizableEvent()&&isForceResizableHeightCalcMode()?resetIFrame(triggerEventDesc):triggerEvent in{interval:1}||(recordTrigger(),logIgnored())}var currentHeight,currentWidth;isDoubleFiredEvent()?log("Trigger event cancelled: "+triggerEvent):isSizeChangeDetected()?(recordTrigger(),lockTrigger(),resizeIFrame()):checkDownSizing()}function lockTrigger(){triggerLocked||(triggerLocked=!0,log("Trigger event lock on")),clearTimeout(triggerLockedTimer),triggerLockedTimer=setTimeout(function(){triggerLocked=!1,log("Trigger event lock off"),log("--")},eventCancelTimer)}function triggerReset(triggerEvent){height=getHeight[heightCalcMode](),width=getWidth(),sendMsg(height,width,triggerEvent)}function resetIFrame(triggerEventDesc){var hcm=heightCalcMode;heightCalcMode=heightCalcModeDefault,log("Reset trigger event: "+triggerEventDesc),lockTrigger(),triggerReset("reset"),heightCalcMode=hcm}function sendMsg(height,width,triggerEvent,msg,targetOrigin){function setTargetOrigin(){undefined===targetOrigin?targetOrigin=targetOriginDefault:log("Message targetOrigin: "+targetOrigin)}function sendToParent(){var size=height+":"+width,message=myID+":"+size+":"+triggerEvent+(undefined!==msg?":"+msg:"");log("Sending message to host page ("+message+")"),target.postMessage(msgID+message,targetOrigin)}setTargetOrigin(),sendToParent()}function receiver(event){function isMessageForUs(){return msgID===(""+event.data).substr(0,msgIdLen)}function initFromParent(){initMsg=event.data,target=event.source,init(),firstRun=!1,setTimeout(function(){initLock=!1},eventCancelTimer)}function resetFromParent(){initLock?log("Page reset ignored by init"):(log("Page size reset by host page"),triggerReset("resetPage"))}function resizeFromParent(){sendSize("resizeParent","Parent window resized")}function getMessageType(){return event.data.split("]")[1]}function isMiddleTier(){return"iFrameResize"in window}function isInitMsg(){return event.data.split(":")[2]in{"true":1,"false":1}}isMessageForUs()&&(firstRun&&isInitMsg()?initFromParent():"reset"===getMessageType()?resetFromParent():"resize"===getMessageType()?resizeFromParent():event.data===initMsg||isMiddleTier()||warn("Unexpected message ("+event.data+")"))}var autoResize=!0,base=10,bodyBackground="",bodyMargin=0,bodyMarginStr="",bodyPadding="",calculateWidth=!1,doubleEventList={resize:1,click:1},eventCancelTimer=128,height=1,firstRun=!0,heightCalcModeDefault="offset",heightCalcMode=heightCalcModeDefault,initLock=!0,initMsg="",inPageLinks={},interval=32,logging=!1,msgID="[iFrameSizer]",msgIdLen=msgID.length,myID="",publicMethods=!1,resetRequiredMethods={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},resizeFrom="parent",targetOriginDefault="*",target=window.parent,tolerance=0,triggerLocked=!1,triggerLockedTimer=null,width=1,getHeight={offset:getBodyOffsetHeight,bodyOffset:getBodyOffsetHeight,bodyScroll:getBodyScrollHeight,documentElementOffset:getDEOffsetHeight,scroll:getDEScrollHeight,documentElementScroll:getDEScrollHeight,max:getMaxHeight,min:getMinHeight,grow:getMaxHeight,lowestElement:getBestHeight};addEventListener(window,"message",receiver)},objCommon.metrics=function(){var objMetrics={};return objMetrics.initBeacon=function(){objMetrics.eleBeacon||(objMetrics.eleBeacon=document.createElement("img"),objMetrics.eleBeacon.id="cdc-widget-metrics-beacon")},objMetrics.trackData=function(objParamOverrides){if(objMetrics.trackingEnabled(objParamOverrides)){objMetrics.initBeacon();var strBeaconUrl=objMetrics.getBeaconUrl(objParamOverrides);objCommon.log("** BEACON SENDING: **"),objCommon.log(strBeaconUrl),objMetrics.eleBeacon.src=strBeaconUrl,objCommon.log("** BEACON SENT **")}else objCommon.log("** TRACKING DISABLED - BEACON SEND ABORTED **");return!0},objMetrics.trackEvent=function(objOrStringData,strEventValue){return strEventValue=strEventValue||"",objOrStringData?"string"==typeof objOrStringData?objMetrics.trackData({c33:objOrStringData,c14:strEventValue}):objMetrics.trackData(objOrStringData):void 0},objMetrics.getBeaconUrl=function(objParamOverrides){return objMetrics.getBaseUrl()+"?"+objMetrics.getQueryString(objParamOverrides)},objMetrics.getBaseUrl=function(){return objMetrics.settings.api.url?objMetrics.settings.api.url:objMetrics.settings.api.urlPrefix+objMetrics.settings.api.urlAccount+objMetrics.settings.api.urlSuffix},objMetrics.getCallParam=function(paramName){return objCommon.getCallParam(paramName)},objMetrics.getQueryString=function(objParamOverrides){objParamOverrides=objParamOverrides||{};var key,value,objParams={},aryParams=[];for(key in objMetrics.settings.params)objParams[key]=objMetrics.settings.params[key];for(key in objParamOverrides)objParams[key]=objParamOverrides[key];for(key in objParams)value=objCommon.cleanString(objParams[key]),value.length&&aryParams.push(key+"="+encodeURIComponent(value));return aryParams.join("&")},objMetrics.trackingEnabled=function(objParamOverrides){objParamOverrides=objParamOverrides||{};var anyIsEnabled,objSettings=objMetrics.settings.params;return anyIsEnabled=objParamOverrides.useMetrics||objSettings.useMetrics||"false","false"!==objCommon.cleanString(anyIsEnabled).toLowerCase()},objMetrics.init=function(objSettings){objMetrics.settings=function(){var objSettingsReturn;switch(objSettingsReturn={api:{url:window.location.protocol+"//tools.cdc.gov/metrics.aspx"}},objSettingsReturn.trackWidgetAs=objCommon.getCallParam("mMode")||"widget",objSettingsReturn.blnPageLevelMetrics=objCommon.getCallParam("loadPageLevel")||"module"===objSettingsReturn.trackWidgetAs||!1,objSettingsReturn.trackWidgetAs){case"module":objSettingsReturn.params={reportsuite:"cdcgov",prop2:objMetrics.getCallParam("chost")+objMetrics.getCallParam("cpath"),prop26:document.title,prop30:document.title,prop31:objMetrics.getCallParam("cpath"),prop46:objMetrics.getCallParam("cpath"),server:objMetrics.getCallParam("chost"),useMetrics:"true"};break;default:objSettingsReturn.params={reportsuite:"cdcsynd",c8:"Widget",c17:objMetrics.getCallParam("chost")+objMetrics.getCallParam("cpath"),c27:"Widget Framework",urlreferrer:location.host+location.pathname,contenttitle:objMetrics.getCallParam("wn"),useMetrics:"true"}}return objSettingsReturn}(),objSettings=objSettings||{};for(var key in objSettings)objMetrics.settings.params[key]=objSettings[key];objMetrics.settings.blnPageLevelMetrics&&("module"===objMetrics.settings.trackWidgetAs?objCommon.loadScript("/JScript/metrics/topic_levels.js",function(){objCommon.loadScript("/JScript/metrics/s_code_v21_cdcgov.js",function(){for(var key in objSettings)s[key]=objSettings[key];updateVariables(s)})}):objCommon.loadScript("/JScript/metrics/widget/s_code.js",function(){for(var key in objSettings)s[key]=objSettings[key];updateVariables(s)})),objMetrics.initBeacon()},objMetrics.update=function(objSettings){objSettings=objSettings||{};for(var key in objSettings)objMetrics.settings.params[key]=objSettings[key];return!0},objMetrics}(),objCommon.events=function(){var objEventHandlers={};return objEventHandlers.init=function(objSettings){objEventHandlers.elements={shareModal:document.getElementById("tp-widget-share-modal"),infoModal:document.getElementById("tp-widget-info-modal"),embedElement:document.getElementById("tp-widget-share-code")},objEventHandlers.shareOpen=function(){objCommon.events.elements.shareModal&&(objCommon.metrics.trackEvent("Share Embed Code"),objCommon.events.elements.shareModal.style.display="block")},objEventHandlers.shareClose=function(){objCommon.events.elements.shareModal&&(objCommon.metrics.trackEvent("Share Embed Code Close"),objCommon.events.elements.shareModal.style.display="none")},objEventHandlers.infoOpen=function(){objCommon.events.elements.infoModal&&(objCommon.metrics.trackEvent("Info, About CDC"),objCommon.events.elements.infoModal.style.display="block")},objEventHandlers.infoClose=function(){objCommon.events.elements.infoModal&&(objCommon.metrics.trackEvent("Info, About CDC Close"),objCommon.events.elements.infoModal.style.display="none")},objEventHandlers.logoClick=function(){objCommon.metrics.trackEvent("CDC Logo")},objEventHandlers.setEmbedCode=function(strEmbedCode){objCommon.runtime.embedCode=strEmbedCode||"",objCommon.events.elements.embedElement&&(objCommon.events.elements.embedElement.innerHTML=objCommon.runtime.embedCode)},objEventHandlers.selectAllText=function(){this.setSelectionRange(0,this.value.length)}},objEventHandlers}(),objCommon.runtime={logLevel:1,callParams:{},widgetScript:function(){for(var target=document.documentElement;target.childNodes.length&&1==target.lastChild.nodeType;)target=target.lastChild;return target&&target.getAttribute("data-widget-script")?target.getAttribute("data-widget-script"):"./widget.js"}()},objCommon.log=function(){var console=window.console||{log:function(){},warn:function(){},error:function(){},time:function(){},timeEnd:function(){}};return function(anyArg){return objCommon.runtime.logLevel&&console&&console.log&&("string"==typeof anyArg?console.log(objCommon.getCallParam("wid")+": "+anyArg):console.log(anyArg)),objCommon.runtime.logLevel>0}}(),objCommon}(),window.CDC.Widget.Common.init()}(window,document);