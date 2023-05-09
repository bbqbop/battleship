(()=>{var t={426:(t,e,n)=>{"use strict";n.d(e,{Z:()=>i});var r=n(81),a=n.n(r),s=n(645),o=n.n(s)()(a());o.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap);"]),o.push([t.id,"* {\n    box-sizing: border-box;\n    margin: 0;\n    font-family: 'Ubuntu', sans-serif;\n    --shadow: 2px 2px 4px;\n}\n\n.header { \n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.content {\n    display: grid;\n    grid-template-rows: 300px 300px;\n    grid-template-columns: 300px 330px;\n    justify-content: center;\n}\n\n\n#board1 {\n    grid-area: 1 / 2 / 2 / 3;\n    z-index: 1;\n}\n\n#board2 { \n    grid-area: 2 / 1 / 3 / 2;\n    z-index: 2;\n}\n\n#display1 {\n    position: relative;\n    top: 90px;\n    left: 90px;\n}\n#display2 {\n    position: relative;\n    top: 120px;\n    left: 120px;\n}\n\n.board {\n    width: 330px;\n    height: 330px;\n    display: grid;\n    grid-template-rows: repeat(11, 30px);\n    justify-content: center;\n    align-items: center;\n    box-shadow: var(--shadow)\n}\n\n.display {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 2rem;\n    width: 120px;\n    height: 120px;\n    flex-shrink: 0;\n    background-color: antiquewhite;\n    border-radius: 5px;\n    box-shadow: var(--shadow)\n\n}\n\n.row {\n    display: grid;\n    grid-template-columns: repeat(11, 30px);\n    justify-content: center;\n    align-items: center;\n}\n\n.field, .label {\n    width: 30px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: solid 1px black;\n    background-color: white;\n}\n\n.label {\n    background-color: rgb(255, 0, 0, 0.3);\n}\n.label.corner {\n    background-color: transparent;\n}\n\n.field.ship.A {\n    background-color: rgb(0, 128, 0, 0.3);\n}\n.field.ship.B {\n    background-color: rgba(0, 0, 128, 0.3);\n}\n.field.ship.C {\n    background-color: rgba(128, 0, 0, 0.3);\n}\n.field.ship.D1 {\n    background-color: rgba(128, 0, 128, 0.3);\n}\n.field.ship.D2 {\n    background-color: rgba(128, 128, 0, 0.3);\n}\n.field.ship.S1 {\n    background-color: rgba(0, 128, 128, 0.3);\n}\n.field.ship.S2 {\n    background-color: rgba(128, 128, 128, 0.3);\n}\n\n.board .field.sunk {\n    background-color: rgb(93, 93, 93, 0.3);\n}\n\n@media screen and (max-width: 600px) {\n    .content{\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 30px\n    }\n    .display {\n        display: none;\n    }\n}\n\n@media screen and (max-height: 700px) {\n    .content{\n        height: 500px;\n        transform: scale(0.6);\n    }\n    .header {\n        height: 50px;\n    }\n}",""]);const i=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,a,s){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(o[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);r&&o[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),e.push(d))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var s={},o=[],i=0;i<t.length;i++){var c=t[i],l=r.base?c[0]+r.base:c[0],d=s[l]||0,u="".concat(l," ").concat(d);s[l]=d+1;var p=n(u),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=a(h,r);r.byIndex=i,e.splice(i,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function a(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,a){var s=r(t=t||[],a=a||{});return function(t){t=t||[];for(var o=0;o<s.length;o++){var i=n(s[o]);e[i].references--}for(var c=r(t,a),l=0;l<s.length;l++){var d=n(s[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}s=c}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},417:function(t,e,n){const{Player:r}=n(507);e.Game=function(){this.players={player1:new r("Player1"),player2:new r("Computer")},this.currentPlayer=!0,this.twoPlayer=!1,this.gameOver=!1,this.compQueue=[]},this.Game.prototype={curPlayerAttacks:function(t){let e,n;return e=this.currentPlayer?this.players.player2.receiveAttack(t):this.players.player1.receiveAttack(t),this.twoPlayer?this.currentPlayer=!this.currentPlayer:n=this.compAttack(),[e,n]},compAttack:function(){let t,e,n;for(;!t;)try{this.compQueue.length>0?[e,n]=this.compQueue.shift():(e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random())),t=this.players.player1.receiveAttack([e,n]),"HIT!"===t.attackResult[0]&&this.fillQueue(e,n)}catch{this.compQueue.length>0&&([e,n]=this.compQueue.shift()),e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random())}return t},fillQueue(t,e){[[t-1,e+1],[t,e+1],[t+1,e+1],[t+1,e],[t+1,e-1],[t,e-1],[t-1,e-1],[t-1,e]].forEach((t=>{t[0]>=0&&t[0]<=9&&t[1]>=0&&t[1]<=9&&(this.compQueue.push(t),console.log(t))}))}}},507:function(t,e,n){const{Ship:r}=n(643);e.Player=function(t){this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null))),this.ships={},this.hasLost=!1,this.name=t},this.Player.prototype={placeShip:function(t,e,n){let[a,s]=e;this.testShipPlacement(t,a,s,n);const o=this.findShipType(t);for(this.ships[o]=new r(t),i=0;i<t;i++)n?(this.board[a][s-i]=o,this.ships[o].coords.push([a,s-i])):(this.board[a+i][s]=o,this.ships[o].coords.push([a+i,s]))},testShipPlacement:function(t,e,n,r){for(i=0;i<t;i++)if(r){if(null!==this.board[e][n-i])throw new Error("Invalid placement.")}else if(null!==this.board[e+i][n])throw new Error("Invalid placement.")},findShipType:function(t){switch(t){case 5:return"A";case 4:return"B";case 3:return"C";case 2:return this.ships.D1?"D2":"D1";case 1:return this.ships.S1?"S2":"S1"}},populateGameboard:function(){const t=[5,4,3,2,2,1,1];let e=!1;for(;!e;){e=!0;for(let n of t){let t=Math.floor(10*Math.random()),r=Math.floor(10*Math.random()),a=Math.random()>.5;try{this.placeShip(n,[t,r],a)}catch{e=!1,this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null))),this.ships={};break}}}},receiveAttack:function(t){let e;const[n,r]=t,a=this.board[n][r];if("X"==a||"O"==a)throw new Error("Invalid move, field has already been attacked");return null!=a?(e=this.ships[a].hit(),this.checkStatus(),this.board[n][r]="O"):(e=["MISS!",null],this.board[n][r]="X"),{attackResult:e,isGameOver:this.hasLost}},checkStatus:function(){if(Object.values(this.ships).every((t=>t.isSunk))){this.hasLost=!0;const t=new CustomEvent("gameOver",{detail:this.name});window.dispatchEvent(t)}}}},643:function(t,e){e.Ship=function(t){this.length=t,this.hitCount=0,this.isSunk=!1,this.coords=[]},this.Ship.prototype={hit:function(){return this.hitCount++,this.checkSunk()},checkSunk:function(){let t="HIT!";return this.hitCount>=this.length&&(this.isSunk=!0,t="SUNK!"),[t,this]}}},281:(t,e)=>{e.initiateUI=function(){const t=document.querySelector(".content");t.innerHTML="";const e=l();e.id="board1";const n=l();n.id="board2";const r=document.createElement("div");r.classList.add("display"),r.id="display1";const a=document.createElement("div");a.classList.add("display"),a.id="display2",t.append(e,r,n,a);const s=document.createElement("div");s.classList.add("gameOverScreen");const o=document.createElement("h1");o.textContent="GAME OVER";const i=document.createElement("h2"),c=document.createElement("button");function l(){const t=document.createElement("div");t.classList.add("board");for(let e=10;e>=0;e--){const n=document.createElement("div");n.classList.add("row"),n.dataset.row=e-1;for(let t=0;t<=10;t++){const r=document.createElement("div");0==e||0==t?(r.classList.add("label"),0==e?0==t?(r.textContent="",r.classList.add("corner")):r.textContent=t:0==t&&(r.textContent="ABCDEFGHIJ"[e-1])):(r.classList.add("field"),r.dataset.coords=`[${e-1},${t-1}]`),n.append(r)}t.append(n)}return t}function d(t,e){t.textContent=e,setTimeout((()=>{t.textContent=""}),1e3)}function u(t,e){const n=e?"#board1":"#board2";t.coords.forEach((t=>{document.querySelector(`${n} [data-coords="[${t}]"]`).classList.add("sunk")}))}return c.textContent="Start new game",s.append(o,i,c),s.style.transform="scale(0)",t.append(s),c.addEventListener("click",(()=>{s.style.transform="scale(0)",e.style.filter="",n.style.filter="";const t=new CustomEvent("newGame");window.dispatchEvent(t)})),{update:function(t){for(let e=9;e>=0;e--)for(let n=0;n<10;n++){const r=document.querySelector(`[data-coords="[${e},${n}]"`),a=t.players.player1.board[e][n];"X"===a?(r.classList.add("miss"),r.style.color="blue",r.textContent=a):"O"===a?(r.classList.add("hit"),r.style.color="red",r.textContent=a):null!==a&&(r.classList.add("ship"),r.classList.add(a))}},eventListenerActive:!0,setupEventListeners:function(t,e){document.querySelector("#board2").querySelectorAll(".field").forEach((n=>{n.addEventListener("click",(n=>{this.handleAttacks(n,t,e)}))}))},handleAttacks:function(t,e,n){if(!this.eventListenerActive)return;const s=t.target.dataset.coords.slice(1,-1).split(",");let o;try{o=e(s);let i=o[0].attackResult,c=o[1].attackResult;d(a,i[0]),this.eventListenerActive=!1,setTimeout((()=>{d(r,c[0]),"SUNK!"===c[0]&&u(c[1],!0)}),1e3),function(t,e){switch(t[0]){case"MISS!":e.textContent="X",e.style.color="blue";break;case"HIT!":e.textContent="O",e.style.color="red";break;case"SUNK!":e.textContent="O",e.style.color="red",u(t[1],!1)}}(i,t.target),setTimeout((()=>{this.update(n),this.eventListenerActive=!0}),1e3)}catch(t){d(a,"!"),console.log(t.message)}},toggleGameOver:function(t){s.style.transform="scale(1)",e.style.filter="blur(5px)",n.style.filter="blur(5px)",i.textContent=`${t} wins!`}}}}},e={};function n(r){var a=e[r];if(void 0!==a)return a.exports;var s=e[r]={id:r,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),r=n(795),a=n.n(r),s=n(569),o=n.n(s),i=n(565),c=n.n(i),l=n(216),d=n.n(l),u=n(589),p=n.n(u),h=n(426),f={};f.styleTagTransform=p(),f.setAttributes=c(),f.insert=o().bind(null,"head"),f.domAPI=a(),f.insertStyleElement=d(),e()(h.Z,f),h.Z&&h.Z.locals&&h.Z.locals;const{Game:m}=n(417),{initiateUI:y}=n(281);let v,b;function g(){v=new m,b=new y,v.players.player1.populateGameboard(),v.players.player2.populateGameboard(),b.update(v),b.setupEventListeners(v.curPlayerAttacks.bind(v),v)}window.addEventListener("gameOver",(()=>{let t;v.gameOver=!0,b.eventListenersActive=!1;for(let e in v.players)v.players[e].hasLost||(t=v.players[e].name);b.toggleGameOver(t)})),window.addEventListener("newGame",(()=>{g()})),g(),console.log(v)})()})();