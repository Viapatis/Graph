!function(t){var e={};function i(s){if(e[s])return e[s].exports;var l=e[s]={i:s,l:!1,exports:{}};return t[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)i.d(s,l,function(e){return t[e]}.bind(null,l));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";function s(t){this._root=t,this._visible={},this._graph={},this._scroll={},this._mode="day",this._setSize=function(t){this._width=.9*this._root.clientWidth,this._height=.7*this._root.clientHeight,this._positions={offsetLeft:this._root.offsetLeft,clientWidth:this._root.clientWidth,clientHeight:this._root.clientHeight},this._offsetX=this._root.offsetLeft+.05*this._root.clientWidth,this._graph={...this._graph,YScale:{...this._graph.YScale,height:.63*this._height},XScale:{...this._graph.XScale,width:this._width,height:.07*this._height},chart:{line:{strokeWidth:this._width*this._height*1e-5}},width:this._width,height:.7*this._height},this._scroll={...this._scroll,XScale:{...this._scroll.XScale,width:this._width},YScale:{...this._scroll.YScale,height:.1*this._height},chart:{line:{strokeWidth:20*this._width*65e-6}}},t&&(this._graph={...this._graph,YScale:{...this._graph.YScale,min:0,incriment:50,axis:{numberDevision:5,textY:[],axis:null}},XScale:{...this._graph.XScale,min:0,max:20,incriment:50,axis:{numberDevision:5,textX:[],axis:null}}},this._scroll={...this._scroll,XScale:{...this._scroll.XScale,min:0,max:300},YScale:{...this._scroll.YScale,min:0,max:300},eventIndicator:{back:{down:!1,move:!1},changeBuffer:{down:!1,move:!1,side:0}},minBufferSize:10,changeBuffersize:1})},this._setSize(!0),window.addEventListener("resize",t=>{this._checkSize()}),this._html=document.createElement("div"),this._html.className="graphMain",function(t){let e=!1;function i(t,e,i){t.addEventListener&&t.addEventListener(e,i,!1)}i(t,"mousemove",function(){e&&(window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.clear&&document.selection.clear())}),i(t,"mousedown",function(t){let i=t||window.event,s=i.target||i.srcElement;e=!s.tagName.match(/INPUT|TEXTAREA/i)})}(this._html),this._createIntfc=function(t){const e=document.createElement("div"),i=document.createElement("div");i.className="buttons",e.className="graphArea";const s=this._graph,l=this._scroll,h=document.createElement("p");h.className="graphTitle",h.innerHTML="Graph name";const a=document.createElement("a");a.className="themeButton",a.value=this._mode,a.innerHTML="day"===this._mode?"Switch to Night Mode":"Switch to Day Mode",a.onclick=this._clickThemeButton,s.html=this.createSvg("svg",{class:"graph"}),l.html=this.createSvg("svg",{class:"scroll"});const n=this.createSvg("path",{class:"roller",d:`M0,0 ${l.XScale.width},0 ${l.XScale.width},${l.YScale.height} 0,${l.YScale.height}Z`}),o=this.createSvg("path",{class:"back",d:`M0,0 ${l.XScale.width},0 ${l.XScale.width},${l.YScale.height} 0,${l.YScale.height}Z`}),r=this.createSvg("path",{class:"changeBuffer"}),c=s.YScale.height/(s.YScale.axis.numberDevision+1);let m="";for(let t=1;t<s.YScale.axis.numberDevision+1;t++)m+=`M0,${t*c} ${s.XScale.width},${t*c} `;const d=this.createSvg("path",{class:"axisY",d:""+m});s.YScale.axis.axis=d,n.onclick=this._clickScroll,o.addEventListener("mousedown",this._rollerMouseDown),r.addEventListener("mousedown",this._rollerMouseDown),window.addEventListener("mouseup",this._rollerMouseUp),window.addEventListener("mousemove",this._rollerMouseMove),o.addEventListener("touchstart",this._rollerMouseDown),r.addEventListener("touchstart",this._rollerMouseDown),window.addEventListener("touchend",this._rollerMouseUp),window.addEventListener("touchmove",this._rollerMouseMove),e.appendChild(s.html),e.appendChild(l.html),s.html.appendChild(d),l.html.appendChild(o),l.html.appendChild(n),l.html.appendChild(r),t.appendChild(h),t.appendChild(e),t.appendChild(i),t.appendChild(a);for(let t=1;t<this._data.columns.length;t++){const e=this._data.names[this._data.columns[t][0]];this._visible[e]=!0,i.innerHTML+=`<div class ='switch'>\n                                <button class ='switchButton' value ='true'>&#10004</button>\n                                <span>${e}</span>\n                            </div>`}const _=i.getElementsByTagName("BUTTON");for(let t=0;t<_.length;t++)_[t].onclick=this._clickBtn;for(let t=0;t<i.children.length;t++)i.children[t].onmousedown="return false",i.children[t].ondblclick="return false";this._renderRoller()},this._data,this._checkSize=(t=>{for(let t in this._positions)if(this._root[t]!=this._positions[t]){const t=this._html.getElementsByClassName("back")[0],e=this._html.getElementsByClassName("roller")[0];this._setSize(!1);const i=this._graph.YScale.height/(this._graph.YScale.axis.numberDevision+1);let s="";for(let t=1;t<this._graph.YScale.axis.numberDevision+1;t++)s+=`M0,${t*i} ${this._graph.XScale.width},${t*i} `;const l=`M0,0 ${this._scroll.XScale.width},0 ${this._scroll.XScale.width},${this._scroll.YScale.height} 0,${this._scroll.YScale.height}Z`;t.setAttributeNS(null,"d",l),e.setAttributeNS(null,"d",l),this._graph.YScale.axis.axis.setAttributeNS(null,"d",s),this._clearGraph(this._scroll.html,this._graph.html),this._renderRoller(),this._drow()}}),this._renderRoller=function(){const t=this._html.getElementsByClassName("roller")[0],e=this._html.getElementsByClassName("changeBuffer")[0],{XScale:i}=this._graph,{YScale:s}=this._scroll,l=i.width/(this.formatX.length-1),h=l*this._scroll.changeBuffersize,a=(i.min+this._scroll.changeBuffersize)*l,n=(i.max-1-this._scroll.changeBuffersize)*l,o=`${n},${s.height-.5} ${n},0.5 ${a},0.5 ${a},${s.height-.5}`,r=`M${n+h},0 ${n+h},${s.height} ${a-h},${s.height} ${a-h},0Z M${o}Z`,c=t.getAttributeNS(null,"d").match(/M[^M]+/g);t.setAttributeNS(null,"d",`${c[0]} M${o}Z`),e.setAttributeNS(null,"d",r)},this.setData=function(t){this._html.innerHTML="",this._data={...t},this.formatX=t.columns[0].map((t,e)=>0!==e?new Date(t).toLocaleString("en-US",{month:"short",day:"numeric"}):t),this._scroll.changeBuffersize=Math.floor((this.formatX.length-1)/50),this._scroll.minBufferSize=Math.floor((this.formatX.length-1)/10),this._graph.XScale.max=this._scroll.minBufferSize,this._scroll.XScale.max=this.formatX.length,this._graph.XScale.min=0,this._scroll.XScale.min=0},this.rendering=function(){this._createIntfc(this._html),this._drow(),this._root.appendChild(this._html)},this._drow=function(){this._processingData(this._graph),this._processingData(this._scroll),this._createAxis()},this._clickScroll=(t=>{this._moveScroll(t)}),this._moveScroll=function(t){const e=this._graph.XScale.max-this._graph.XScale.min,i="targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX;let s=Math.floor(i/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min)-e/2);s+e>this._scroll.XScale.max?s=this._scroll.XScale.max-e:s<0&&(s=0),this._graph.XScale.min=s,this._graph.XScale.max=s+e,this._renderRoller(),this._clearGraph(this._graph.html),this._processingData(this._graph),this._createAxis()},this._rollerMouseDown=(t=>{if(this._scroll.eventIndicator[t.target.className.baseVal].down=!0,"changeBuffer"===t.target.className.baseVal){const e=("targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX)/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min);e>this._graph.XScale.max-2*this._scroll.changeBuffersize-2||e<this._graph.XScale.min+this._scroll.changeBuffersize+1?this._scroll.eventIndicator.changeBuffer.side=e+2*this._scroll.changeBuffersize<this._graph.XScale.max?0:1:this._scroll.eventIndicator[t.target.className.baseVal].down=!1}}),this._rollerMouseUp=(t=>{this._scroll.eventIndicator.back.down&&(this._scroll.eventIndicator.back.down=!1),this._scroll.eventIndicator.changeBuffer.down&&(this._scroll.eventIndicator.changeBuffer.down=!1)}),this._rollerMouseMove=(t=>{this._scroll.eventIndicator.back.down&&this._moveScroll(t),this._scroll.eventIndicator.changeBuffer.down&&this._changeBufferMove(t)}),this._changeBufferMove=function(t){let e=("targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX)/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min);this._scroll.eventIndicator.changeBuffer.side?(e=Math.ceil(e))-this._graph.XScale.min>=this._scroll.minBufferSize&&(this._graph.XScale.max=e<=this._scroll.XScale.max?e:this._scroll.XScale.max):(e=Math.floor(e),this._graph.XScale.max-e>=this._scroll.minBufferSize&&(this._graph.XScale.min=e>=0?e:0)),this._renderRoller(),this._clearGraph(this._graph.html),this._processingData(this._graph),this._createAxis()},this._clearGraph=function(){const t=arguments;for(let e=1;e<this._data.columns.length;e++){const i=this._data.names[this._data.columns[e][0]];if(this._visible[i])for(let e=0;e<t.length;e++)t[e].removeChild(t[e].getElementsByClassName(i)[0])}},this._clickThemeButton=(t=>{const e=document.getElementsByClassName("root")[0],i=document.getElementsByClassName("graphMain"),s=document.getElementsByClassName("themeButton");if("day"===t.target.value){for(var l=0;l<s.length;l++)s[l].innerHTML="Switch to Day Mode",s[l].value="night";if(e.className.match("day")?e.className=e.className.replace("day","night"):e.className+=" night",this._html.className.match("day"))for(l=0;l<i.length;l++)i[l].className=i[l].className.replace("day","night");else for(l=0;l<i.length;l++)i[l].className+=" night"}else if("night"===t.target.value){for(l=0;l<s.length;l++)s[l].innerHTML="Switch to Night Mode",s[l].value="day";e.className=e.className.replace("night","day");for(l=0;l<i.length;l++)i[l].className=i[l].className.replace("night","day")}}),this._clickBtn=(t=>{const e=t.target.parentNode.children[1].innerHTML;t.target.value="true"===t.target.value?"false":"true",this._clearGraph(this._scroll.html,this._graph.html),this._visible[e]=!this._visible[e],this._drow()}),this._processingData=function(t){this._updateYScale(t);const{html:e,XScale:i,YScale:s}=t;for(let l=1;l<this._data.columns.length;l++){const h=this._data.names[this._data.columns[l][0]];if(this._visible[h]){let a="";for(let t=i.min;t<i.max-1;t++)a+=`${(t-i.min)/(i.max-2-i.min)*i.width},${(s.max-this._data.columns[l][t+1])/s.max*s.height*.9} `;const n=this.createSvg("polyline",{points:a,stroke:this._data.colors[this._data.columns[l][0]],strokeWidth:t.chart.line.strokeWidth,fill:"none",class:h});e.children.length?e.insertBefore(n,e.children[0]):e.appendChild(n)}}},this._createAxis=function(){const{YScale:t,XScale:e,html:i}=this._graph;t.incriment=Math.floor(t.max/(t.axis.numberDevision+1)),e.incriment=Math.floor(e.max/e.axis.numberDevision);const s=(e.max-e.min)/e.width;let[l,h]=[[],[]];const a=i.getElementsByClassName("textAxisY"),n=i.getElementsByClassName("textAxisX"),o=.6*e.height;for(let t=0;n.length;t++)i.removeChild(n[0]);for(let t=0;a.length;t++)i.removeChild(a[0]);for(let e=0;e<=t.axis.numberDevision;e++)h.push(this.createSvg("text",{class:"textAxisY",x:0,y:t.height*(1-e/(t.axis.numberDevision+1)),style:`font-size:${o}px`})),h[e].textContent=e*t.incriment,i.appendChild(h[e]);const r=3*o;let c=e.axis.numberDevision+1;for(;r*c>e.width;)c=r*c>e.width?c-1:c;const m=(e.width-r*c)/(c-1);let d=0;const _=this._graph.height-o/2;for(let t=0;t<=c-1;t++){let h;t?(d+=r+m,t<c-1?h=Math.round(e.min+(d-r/2)*s):(d=e.width-3.2*o,h=e.max-1)):(d=0,h=e.min+1),l.push(this.createSvg("text",{class:"textAxisX",x:d,y:_,style:`font-size:${o}px`})),l[t].textContent=this.formatX[h],i.appendChild(l[t])}e.textX=l,t.textY=h},this._updateYScale=function(t){const{XScale:e,YScale:i}=t;let s=0,l=0;for(let t=1;t<this._data.columns.length;t++){const i=this._data.names[this._data.columns[t][0]];if(this._visible[i])for(let i=e.min;i<e.max;i++)l=l>this._data.columns[t][i]?this._data.columns[t][i]:l,s=s<this._data.columns[t][i]?this._data.columns[t][i]:s}t.YScale={...i,min:l,max:s}},this.createSvg=function(t,e){t=document.createElementNS("http://www.w3.org/2000/svg",t);for(let i in e)t.setAttributeNS(null,i.replace(/[A-Z]/g,function(t,e,i,s){return"-"+t.toLowerCase()}),e[i]);return t}}i.r(e);var l=new Request("https://api.myjson.com/bins/13ekc2");fetch(l,{mode:"cors"}).then(function(t){if(t.ok)return t.json();throw new Error("Network response was not ok.")}).then(function(t){!function(t){const e=document.getElementsByClassName("root")[0];t.forEach(t=>{const i=document.createElement("div");i.className="main",e.appendChild(i);const l=new s(i);l.setData(t),l.rendering()})}(t)}).catch(function(t){console.log('There has been a problem with your fetch "operation": '+t.message)})}]);