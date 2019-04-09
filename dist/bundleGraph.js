!function(t){var e={};function s(i){if(e[i])return e[i].exports;var l=e[i]={i:i,l:!1,exports:{}};return t[i].call(l.exports,l,l.exports,s),l.l=!0,l.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)s.d(i,l,function(e){return t[e]}.bind(null,l));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";function i(t){this._root=t,this._visible={},this._graph={},this._scroll={},this._mode="day",this._chart=[],this._setSize=function(t){this._width=.9*this._root.clientWidth,this._height=.7*this._root.clientHeight,this._positions={offsetLeft:this._root.offsetLeft,clientWidth:this._root.clientWidth,clientHeight:this._root.clientHeight},this._offsetX=this._root.offsetLeft+.05*this._root.clientWidth,this._graph={...this._graph,YScale:{...this._graph.YScale,height:.63*this._height},XScale:{...this._graph.XScale,width:this._width,height:.07*this._height},chart:{line:{strokeWidth:this._width*this._height*1e-5}},width:this._width,height:.7*this._height},this._scroll={...this._scroll,XScale:{...this._scroll.XScale,width:this._width},YScale:{...this._scroll.YScale,height:.08*this._height},chart:{line:{strokeWidth:20*this._width*65e-6}}},t&&(this._graph={...this._graph,YScale:{...this._graph.YScale,min:0,incriment:50,axis:{numberDevision:5,textY:[],axis:null}},XScale:{...this._graph.XScale,min:0,max:20,incriment:50,axis:{numberDevision:5,textX:[],axis:null}}},this._scroll={...this._scroll,XScale:{...this._scroll.XScale,min:0,max:300},YScale:{...this._scroll.YScale,min:0,max:300},eventIndicator:{back:{down:!1,move:!1},changeBuffer:{down:!1,move:!1,side:0}},minBufferSize:10,changeBuffersize:1})},this._setSize(!0),window.addEventListener("resize",t=>{this._checkSize()}),this._html=document.createElement("div"),this._html.className="graphMain",function(t){let e=!1;function s(t,e,s){t.addEventListener&&t.addEventListener(e,s,!1)}s(t,"mousemove",function(){e&&(window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.clear&&document.selection.clear())}),s(t,"mousedown",function(t){let s=t||window.event,i=s.target||s.srcElement;e=!i.tagName.match(/INPUT|TEXTAREA/i)})}(this._html),this._createIntfc=function(t){const e=document.createElement("div"),s=document.createElement("div");s.className="buttons",e.className="graphArea";const i=this._graph,l=this._scroll,a=document.createElement("p");a.className="graphTitle",a.innerHTML="Graph name";const h=document.createElement("a");h.className="themeButton",h.value=this._mode,h.innerHTML="day"===this._mode?"Switch to Night Mode":"Switch to Day Mode",h.onclick=this._clickThemeButton,i.html=this.createSvg("svg",{class:"graph"}),l.html=this.createSvg("svg",{class:"scroll"});var n=this.createSvg("g",{class:"chart"}),c=this.createSvg("g",{class:"chart"});const o=this.createSvg("path",{class:"roller",d:`M0,0 ${l.XScale.width},0 ${l.XScale.width},${l.YScale.height} 0,${l.YScale.height}Z`}),r=this.createSvg("path",{class:"back",d:`M0,0 ${l.XScale.width},0 ${l.XScale.width},${l.YScale.height} 0,${l.YScale.height}Z`}),d=this.createSvg("path",{class:"changeBuffer"}),m=i.YScale.height/(i.YScale.axis.numberDevision+1);let _="";for(let t=1;t<i.YScale.axis.numberDevision+1;t++)_+=`M0,${t*m} ${i.XScale.width},${t*m} `;const u=this.createSvg("path",{class:"axisY",d:""+_});i.YScale.axis.axis=u,o.onclick=this._clickScroll,r.addEventListener("mousedown",this._rollerMouseDown),d.addEventListener("mousedown",this._rollerMouseDown),window.addEventListener("mouseup",this._rollerMouseUp),window.addEventListener("mousemove",this._rollerMouseMove),r.addEventListener("touchstart",this._rollerMouseDown),d.addEventListener("touchstart",this._rollerMouseDown),window.addEventListener("touchend",this._rollerMouseUp),window.addEventListener("touchmove",this._rollerMouseMove),e.appendChild(i.html),e.appendChild(l.html),i.html.appendChild(u),i.html.appendChild(n),l.html.appendChild(c),l.html.appendChild(r),l.html.appendChild(o),l.html.appendChild(d),t.appendChild(a),t.appendChild(e),t.appendChild(s),t.appendChild(h);for(let t=1;t<this._data.columns.length;t++){const e=this._data.names[this._data.columns[t][0]];this._visible[e]=!0,s.innerHTML+=`<div class ='switch'>\n                                <button class ='switchButton' value ='true'>&#10004</button>\n                                <span>${e}</span>\n                            </div>`}const g=s.getElementsByTagName("BUTTON");for(let t=0;t<g.length;t++)g[t].onclick=this._clickBtn;for(let t=0;t<s.children.length;t++)s.children[t].onmousedown="return false",s.children[t].ondblclick="return false";this._renderRoller()},this._data,this._checkSize=(t=>{for(let t in this._positions)if(this._root[t]!=this._positions[t]){const t=this._html.getElementsByClassName("back")[0],e=this._html.getElementsByClassName("roller")[0];this._setSize(!1);const s=this._graph.YScale.height/(this._graph.YScale.axis.numberDevision+1);let i="";for(let t=1;t<this._graph.YScale.axis.numberDevision+1;t++)i+=`M0,${t*s} ${this._graph.XScale.width},${t*s} `;const l=`M0,0 ${this._scroll.XScale.width},0 ${this._scroll.XScale.width},${this._scroll.YScale.height} 0,${this._scroll.YScale.height}Z`;t.setAttributeNS(null,"d",l),e.setAttributeNS(null,"d",l),this._graph.YScale.axis.axis.setAttributeNS(null,"d",i),this._clearGraph(this._scroll.html,this._graph.html),this._renderRoller(),this._drow()}}),this._renderRoller=function(){const t=this._html.getElementsByClassName("roller")[0],e=this._html.getElementsByClassName("changeBuffer")[0],{XScale:s}=this._graph,{YScale:i}=this._scroll,l=s.width/(this._data.columns[0].length-1),a=l*this._scroll.changeBuffersize,h=(s.min+this._scroll.changeBuffersize)*l,n=(s.max-1-this._scroll.changeBuffersize)*l,c=`${n},${i.height-.5} ${n},0.5 ${h},0.5 ${h},${i.height-.5}`,o=`M${n+a},0 ${n+a},${i.height} ${h-a},${i.height} ${h-a},0Z M${c}Z`,r=t.getAttributeNS(null,"d").match(/M[^M]+/g);t.setAttributeNS(null,"d",`${r[0]} M${c}Z`),e.setAttributeNS(null,"d",o)};const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];this._formatX=function(t,s){var i=[];const l=new Date(t);return i.push(e[l.getMonth()],l.getDate()),s&&i.push(l.getFullYear()),i.join(" ")},this.setData=function(t){this._html.innerHTML="",this._data={...t},this._scroll.changeBuffersize=Math.floor((t.columns[0].length-1)/50),this._scroll.minBufferSize=Math.floor((t.columns[0].length-1)/10),this._graph.XScale.max=this._scroll.minBufferSize,this._scroll.XScale.max=t.columns[0].length,this._graph.XScale.min=0,this._scroll.XScale.min=0},this.rendering=function(){this._createIntfc(this._html),this._drow(),this._root.appendChild(this._html)},this._drow=function(){this._processingData(this._graph),this._processingData(this._scroll),this._createAxis()},this._clickScroll=(t=>{this._moveScroll(t)}),this._moveScroll=function(t){const e=this._graph.XScale.max-this._graph.XScale.min,s="targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX;let i=Math.floor(s/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min)-e/2);i+e>this._scroll.XScale.max?i=this._scroll.XScale.max-e:i<0&&(i=0),this._graph.XScale.min=i,this._graph.XScale.max=i+e,this._renderRoller(),this._clearGraph(this._graph.html),this._processingData(this._graph),this._createAxis()},this._rollerMouseDown=(t=>{if(this._scroll.eventIndicator[t.target.className.baseVal].down=!0,"changeBuffer"===t.target.className.baseVal){const e=("targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX)/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min);e>this._graph.XScale.max-2*this._scroll.changeBuffersize-2||e<this._graph.XScale.min+this._scroll.changeBuffersize+1?this._scroll.eventIndicator.changeBuffer.side=e+2*this._scroll.changeBuffersize<this._graph.XScale.max?0:1:this._scroll.eventIndicator[t.target.className.baseVal].down=!1}}),this._rollerMouseUp=(t=>{this._scroll.eventIndicator.back.down&&(this._scroll.eventIndicator.back.down=!1),this._scroll.eventIndicator.changeBuffer.down&&(this._scroll.eventIndicator.changeBuffer.down=!1)}),this._rollerMouseMove=(t=>{this._scroll.eventIndicator.back.down&&this._moveScroll(t),this._scroll.eventIndicator.changeBuffer.down&&this._changeBufferMove(t)}),this._changeBufferMove=function(t){let e=("targetTouches"in t?t.targetTouches[0].clientX-this._offsetX:t.clientX-this._offsetX)/this._scroll.XScale.width*(this._scroll.XScale.max-this._scroll.XScale.min);this._scroll.eventIndicator.changeBuffer.side?(e=Math.ceil(e))-this._graph.XScale.min>=this._scroll.minBufferSize&&(this._graph.XScale.max=e<=this._scroll.XScale.max?e:this._scroll.XScale.max):(e=Math.floor(e),this._graph.XScale.max-e>=this._scroll.minBufferSize&&(this._graph.XScale.min=e>=0?e:0)),this._renderRoller(),this._clearGraph(this._graph.html),this._processingData(this._graph),this._createAxis()},this._clearGraph=function(){const t=arguments;for(let e=1;e<this._data.columns.length;e++){const s=this._data.names[this._data.columns[e][0]];if(this._visible[s])for(let e=0;e<t.length;e++){const i=t[e].getElementsByClassName("chart")[0];i.removeChild(i.getElementsByClassName(s)[0])}}},this._clickThemeButton=(t=>{const e=document.getElementsByClassName("root")[0],s=document.getElementsByClassName("graphMain"),i=document.getElementsByClassName("themeButton");if("day"===t.target.value){for(var l=0;l<i.length;l++)i[l].innerHTML="Switch to Day Mode",i[l].value="night";if(e.className.match("day")?e.className=e.className.replace("day","night"):e.className+=" night",this._html.className.match("day"))for(l=0;l<s.length;l++)s[l].className=s[l].className.replace("day","night");else for(l=0;l<s.length;l++)s[l].className+=" night"}else if("night"===t.target.value){for(l=0;l<i.length;l++)i[l].innerHTML="Switch to Night Mode",i[l].value="day";e.className=e.className.replace("night","day");for(l=0;l<s.length;l++)s[l].className=s[l].className.replace("night","day")}}),this._clickBtn=(t=>{const e=t.target.parentNode.children[1].innerHTML;t.target.value="true"===t.target.value?"false":"true",this._clearGraph(this._scroll.html,this._graph.html),this._visible[e]=!this._visible[e],this._drow()}),this._processingData=function(t){this._updateYScale(t);const{html:e,XScale:s,YScale:i}=t,l=e.getElementsByClassName("chart")[0];for(let e=1;e<this._data.columns.length;e++){const a=this._data.names[this._data.columns[e][0]];if(this._visible[a]){let h="";for(let t=s.min;t<s.max-1;t++)h+=`${(t-s.min)/(s.max-2-s.min)*s.width},${(i.max-this._data.columns[e][t+1])/i.max*i.height} `;const n=this.createSvg("polyline",{points:h,stroke:this._data.colors[this._data.columns[e][0]],strokeWidth:t.chart.line.strokeWidth,fill:"none",class:a});l.appendChild(n)}}},this._createAxis=function(){const{YScale:t,XScale:e,html:s}=this._graph;t.incriment=Math.floor(t.max/(t.axis.numberDevision+1)),e.incriment=Math.floor(e.max/e.axis.numberDevision);const i=(e.max-e.min)/e.width;let[l,a]=[[],[]];const h=s.getElementsByClassName("textAxisY"),n=s.getElementsByClassName("textAxisX"),c=.6*e.height;for(let t=0;n.length;t++)s.removeChild(n[0]);for(let t=0;h.length;t++)s.removeChild(h[0]);for(let e=0;e<=t.axis.numberDevision;e++)a.push(this.createSvg("text",{class:"textAxisY",x:0,y:t.height*(1-e/(t.axis.numberDevision+1)),style:`font-size:${c}px`})),a[e].textContent=e*t.incriment,s.appendChild(a[e]);const o=3*c;let r=e.axis.numberDevision+1;for(;o*r>e.width;)r=o*r>e.width?r-1:r;const d=(e.width-o*r)/(r-1);let m=0;const _=this._graph.height-c/2;for(let t=0;t<=r-1;t++){let a;t?(m+=o+d,t<r-1?a=Math.round(e.min+(m-o/2)*i)+1:(m=e.width-3.2*c,a=e.max-1)):(m=0,a=e.min+1),l.push(this.createSvg("text",{class:"textAxisX",x:m,y:_,style:`font-size:${c}px`})),l[t].textContent=this._formatX(this._data.columns[0][a],!1),s.appendChild(l[t])}e.textX=l,t.textY=a},this._updateYScale=function(t){const{XScale:e,YScale:s}=t;let i=[];for(let t=1;t<this._data.columns.length;t++){const s=this._data.names[this._data.columns[t][0]];this._visible[s]&&(i=i.concat(this._data.columns[t].slice(e.min+1,e.max)))}let l=(a=i,Math.max.apply(null,a));var a;let h=function(t){return Math.min.apply(null,t)}(i);t.YScale={...s,min:h,max:l}},this.createSvg=function(t,e){t=document.createElementNS("http://www.w3.org/2000/svg",t);for(let s in e)t.setAttributeNS(null,s.replace(/[A-Z]/g,function(t,e,s,i){return"-"+t.toLowerCase()}),e[s]);return t}}s.r(e),document.addEventListener("DOMContentLoaded",function(t){console.log("dd"),function(t){const e=document.getElementsByClassName("root")[0];t.forEach(t=>{const s=document.createElement("div");s.className="main",e.appendChild(s);const l=new i(s);l.setData(t),l.rendering()})}(json)})}]);