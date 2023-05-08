(()=>{var t={426:(t,e,n)=>{"use strict";n.d(e,{Z:()=>s});var r=n(81),o=n.n(r),a=n(645),i=n.n(a)()(o());i.push([t.id,"* {\n}\n\n.board {\n    margin: 10px;\n    width: 300px;\n    height: 300px;\n    display: grid;\n    grid-template-rows: repeat(10, 30px);\n    justify-content: center;\n    align-items: center;\n    border: solid 1px black;\n}\n\n.row {\n    display: grid;\n    grid-template-columns: repeat(10, 30px);\n    justify-content: center;\n    align-items: center;\n}\n\n.field {\n    width: 30px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: solid 1px black;\n\n}",""]);const s=i},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,a){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);r&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),e.push(u))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var a={},i=[],s=0;s<t.length;s++){var c=t[s],l=r.base?c[0]+r.base:c[0],u=a[l]||0,p="".concat(l," ").concat(u);a[l]=u+1;var d=n(p),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)e[d].references++,e[d].updater(h);else{var f=o(h,r);r.byIndex=s,e.splice(s,0,{identifier:p,updater:f,references:1})}i.push(p)}return i}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var a=r(t=t||[],o=o||{});return function(t){t=t||[];for(var i=0;i<a.length;i++){var s=n(a[i]);e[s].references--}for(var c=r(t,o),l=0;l<a.length;l++){var u=n(a[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}a=c}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},417:function(t,e,n){const{Player:r}=n(507);e.Game=function(){this.players={player1:new r,player2:new r},this.currentPlayer=!0,this.compEnemy=!0},this.Game.prototype={curPlayerAttacks:function(t){let e;return this.currentPlayer=!this.currentPlayer,e=this.currentPlayer?this.players.player1.receiveAttack(t):this.players.player2.receiveAttack(t),this.compEnemy&&!this.currentPlayer&&this.compAttack(),e},compAttack:function(){this.currentPlayer=!this.currentPlayer;let t=Math.floor(9*Math.random()),e=Math.floor(9*Math.random());try{this.players.player1.receiveAttack([t,e])}catch{this.compAttack()}}}},507:function(t,e,n){const{Ship:r}=n(643);e.Player=function(){this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null))),this.ships={},this.hasLost=!1},this.Player.prototype={placeShip:function(t,e,n){const o=this.findShipType(t);let[a,s]=e;const c=n?s-t+1:a+t-1;if(c<0||c>9)throw new Error("Invalid placement. Out of bounds");for(this.ships[o]=new r(t),i=0;i<t;i++)n?(this.testShipCrossing(a,s-i),this.board[a][s-i]=o):(this.testShipCrossing(a,s+i),this.board[a+i][s]=o)},populateGameboard:function(){const t=[5,4,3,2,2,1,1];let e=!1;for(;!e;){e=!0;for(let n of t){let t=Math.floor(9*Math.random()),r=Math.floor(9*Math.random()),o=Math.random()>.5;try{this.placeShip(n,[t,r],o)}catch(t){e=!1,this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null)));break}}}},testShipCrossing:function(t,e){if(null!==this.board[t][e])throw new Error("Invalid placement. Ships cannot cross")},findShipType:function(t){switch(t){case 5:return"A";case 4:return"B";case 3:return"C";case 2:return this.ships.D1?"D2":"D1";case 1:return this.ships.S1?"S2":"S1"}},receiveAttack:function(t){const[e,n]=t,r=this.board[e][n];let o;if("X"==r)throw new Error("Invalid move, field has already been attacked");return null!=r?(o=this.ships[r].hit(),this.checkStatus(),this.board[e][n]="O"):(o="MISS!",this.board[e][n]="X"),o},checkStatus:function(){Object.values(this.ships).every((t=>t.isSunk))&&(this.hasLost=!0,alert("GAME OVER"))}}},643:function(t,e){e.Ship=function(t){this.length=t,this.hitCount=0,this.isSunk=!1},this.Ship.prototype={hit:function(){return this.hitCount++,this.checkSunk()},checkSunk:function(){let t="HIT!";return this.hitCount>=this.length&&(this.isSunk=!0,t="SUNK!"),t}}},281:(t,e)=>{e.initiateUI=function(){const t=document.querySelector(".content"),e=r(),n=r();function r(){const t=document.createElement("div");t.classList.add("board");for(let e=9;e>=0;e--){const n=document.createElement("div");n.classList.add("row"),n.dataset.row=e;for(let t=0;t<10;t++){const r=document.createElement("div");r.classList.add("field"),r.dataset.coords=`[${e},${t}]`,n.append(r)}t.append(n)}return t}return t.append(e,n),{update:function(t){for(let e=9;e>=0;e--)for(let n=0;n<10;n++){const r=document.querySelector(`[data-coords="[${e},${n}]"`),o=t.players.player1.board[e][n];r.textContent=o,"X"===o?r.style.color="blue":"O"===o?r.style.color="red":null!==o&&(r.style.color="green")}},setupEventListeners:function(t,e){document.querySelector(".board:last-of-type").querySelectorAll(".field").forEach((n=>{n.addEventListener("click",(r=>{const o=r.target.dataset.coords.slice(1,-1).split(",");try{let e=t(o);switch(e){case"MISS!":n.textContent="X",n.style.color="blue";break;case"HIT!":n.textContent="O",n.style.color="red";break;case"SUNK!":n.textContent="O",n.style.color="red",alert(e)}}catch(t){console.log(t)}setTimeout((()=>{this.update(e)}),750)}))}))}}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),r=n(795),o=n.n(r),a=n(569),i=n.n(a),s=n(565),c=n.n(s),l=n(216),u=n.n(l),p=n(589),d=n.n(p),h=n(426),f={};f.styleTagTransform=d(),f.setAttributes=c(),f.insert=i().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=u(),e()(h.Z,f),h.Z&&h.Z.locals&&h.Z.locals;const{Game:y}=n(417),{initiateUI:m}=n(281),v=new y;v.players.player1.populateGameboard(),v.players.player2.populateGameboard();const b=m();b.update(v),b.setupEventListeners(v.curPlayerAttacks.bind(v),v)})()})();