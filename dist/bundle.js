(()=>{var t={426:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var s=n(81),r=n.n(s),i=n(645),a=n.n(i)()(r());a.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap);"]),a.push([t.id,"* {\n    box-sizing: border-box;\n    margin: 0;\n    font-family: 'Ubuntu', sans-serif;\n    --shadow: 2px 2px 4px;\n    transition: all ease-in-out 350ms;\n}\n\n.header { \n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.content {\n    display: grid;\n    grid-template-rows: 300px 300px;\n    grid-template-columns: 300px 330px;\n    justify-content: center;\n}\n\n\n#board1 {\n    grid-area: 1 / 2 / 2 / 3;\n    z-index: 1;\n}\n\n#board2 { \n    grid-area: 2 / 1 / 3 / 2;\n    z-index: 2;\n}\n\n#display1 {\n    position: relative;\n    top: 90px;\n    left: 90px;\n}\n#display2 {\n    position: relative;\n    top: 120px;\n    left: 120px;\n}\n\n.board {\n    width: 330px;\n    height: 330px;\n    display: grid;\n    grid-template-rows: repeat(11, 30px);\n    justify-content: center;\n    align-items: center;\n    box-shadow: var(--shadow)\n}\n\n.display {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 2rem;\n    width: 120px;\n    height: 120px;\n    flex-shrink: 0;\n    background-color: antiquewhite;\n    border-radius: 5px;\n    box-shadow: var(--shadow)\n\n}\n\n.row {\n    display: grid;\n    grid-template-columns: repeat(11, 30px);\n    justify-content: center;\n    align-items: center;\n}\n\n.field, .label {\n    width: 30px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: solid 1px black;\n    background-color: white;\n}\n\n.label {\n    background-color: rgb(255, 0, 0, 0.3);\n}\n.label.corner {\n    background-color: transparent;\n}\n\n.field.ship.A {\n    background-color: rgb(0, 128, 0, 0.3);\n}\n.field.ship.B {\n    background-color: rgba(0, 0, 128, 0.3);\n}\n.field.ship.C {\n    background-color: rgba(128, 0, 0, 0.3);\n}\n.field.ship.D1 {\n    background-color: rgba(128, 0, 128, 0.3);\n}\n.field.ship.D2 {\n    background-color: rgba(128, 128, 0, 0.3);\n}\n.field.ship.S1 {\n    background-color: rgba(0, 128, 128, 0.3);\n}\n.field.ship.S2 {\n    background-color: rgba(128, 128, 128, 0.3);\n}\n\n.field.hit {\n    color: red;\n}\n.field.miss {\n    color: blue;\n}\n\n.board .field.sunk {\n    background-color: rgb(93, 93, 93, 0.3);\n}\n\n.switchPlayerScreen {\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 3;\n    font-size: 3rem;\n}\n.board.hide > *{\n    opacity: 0;\n}\n\n@media screen and (max-width: 600px) {\n    .content{\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 30px\n    }\n    .display {\n        display: none;\n    }\n}\n\n@media screen and (max-height: 700px) {\n    .content{\n        height: 500px;\n        transform: scale(0.6);\n    }\n    .header {\n        height: 50px;\n    }\n}",""]);const o=a},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",s=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),s&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),s&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,s,r,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(s)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);s&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),r&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=r):u[4]="".concat(r)),e.push(u))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,s=0;s<e.length;s++)if(e[s].identifier===t){n=s;break}return n}function s(t,s){for(var i={},a=[],o=0;o<t.length;o++){var c=t[o],l=s.base?c[0]+s.base:c[0],u=i[l]||0,d="".concat(l," ").concat(u);i[l]=u+1;var p=n(d),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=r(h,s);s.byIndex=o,e.splice(o,0,{identifier:d,updater:f,references:1})}a.push(d)}return a}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var i=s(t=t||[],r=r||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var o=n(i[a]);e[o].references--}for(var c=s(t,r),l=0;l<i.length;l++){var u=n(i[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}i=c}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var s=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,r&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},417:function(t,e,n){const{Player:s}=n(507);e.Game=function(t){this.players={player1:new s("Player1"),player2:new s("Computer")},this.currentPlayer=!0,this.twoPlayer=t,this.gameOver=!1,this.compQueue={lastHits:[],direction:null,cue:[]}},this.Game.prototype={curPlayerAttacks:function(t){if(this.gameOver)return;let e,n;return e=this.currentPlayer?this.players.player2.receiveAttack(t):this.players.player1.receiveAttack(t),this.twoPlayer?this.currentPlayer=!this.currentPlayer:n=this.compAttack(),[e,n]},compAttack:function(){if(this.gameOver)return;let t,e,n;for(;!t;)try{this.compQueue.cue.length>0?[e,n]=this.compQueue.cue.shift():(e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random())),t=this.players.player1.receiveAttack([e,n]),"HIT!"===t.attackResult[0]&&this.fillQueue(e,n),"SUNK!"===t.attackResult[0]&&this.clearQueue(t.attackResult[1].coords)}catch{continue}return t},fillQueue:function(t,e){if(this.compQueue.lastHits.length>0){this.compQueue.direction||this.trackDirection(t,e);const[n,s]=this.compQueue.lastHits[this.compQueue.lastHits.length-1];let r;"vertical"===this.compQueue.direction?r=[[t+1,e],[t-1,e],[n+1,e],[n-1,e]]:"horizontal"===this.compQueue.direction&&(r=[[t,e+1],[t,e-1],[t,s+1],[t,s-1]]),r.forEach((t=>{this.compQueue.cue.some((e=>JSON.stringify(e)===JSON.stringify(t)))||this.compQueue.cue.unshift(t)}))}this.compQueue.lastHits.push([t,e]),[[t,e+1],[t+1,e],[t,e-1],[t-1,e]].forEach((t=>{t[0]>=0&&t[0]<=9&&t[1]>=0&&t[1]<=9&&this.compQueue.cue.push(t)}))},clearQueue:function(t){if(t.forEach((t=>{this.compQueue.lastHits.some((e=>{if(strX=JSON.stringify(t),strY=JSON.stringify(e),strX===strY){const t=this.compQueue.lastHits.findIndex((t=>JSON.stringify(t)===strY));this.compQueue.lastHits.splice(t,1)}}))})),this.compQueue.direction=null,this.compQueue.lastHits.length>0){const[t,e]=this.compQueue.lastHits.pop();this.fillQueue(t,e)}},trackDirection:function(t,e){const[n,s]=this.compQueue.lastHits[this.compQueue.lastHits.length-1];t===n+1&&e===s||t===n-1&&e===s?this.compQueue.direction="vertical":(e===s+1&&t===n||e===s-1&&t===n)&&(this.compQueue.direction="horizontal")}}},507:function(t,e,n){const{Ship:s}=n(643);e.Player=function(t){this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null))),this.ships={},this.hasLost=!1,this.name=t},this.Player.prototype={placeShip:function(t,e,n){let[r,a]=e;this.testShipPlacement(t,r,a,n);const o=this.findShipType(t);for(this.ships[o]=new s(t),i=0;i<t;i++)n?(this.board[r][a-i]=o,this.ships[o].coords.push([r,a-i])):(this.board[r+i][a]=o,this.ships[o].coords.push([r+i,a]))},testShipPlacement:function(t,e,n,s){for(i=0;i<t;i++)if(s){if(null!==this.board[e][n-i])throw new Error("Invalid placement.")}else if(null!==this.board[e+i][n])throw new Error("Invalid placement.")},findShipType:function(t){switch(t){case 5:return"A";case 4:return"B";case 3:return"C";case 2:return this.ships.D1?"D2":"D1";case 1:return this.ships.S1?"S2":"S1"}},populateGameboard:function(){const t=[5,4,3,2,2,1,1];let e=!1;for(;!e;){e=!0;for(let n of t){let t=Math.floor(10*Math.random()),s=Math.floor(10*Math.random()),r=Math.random()>.5;try{this.placeShip(n,[t,s],r)}catch{e=!1,this.board=new Array(10).fill(null).map((()=>new Array(10).fill(null))),this.ships={};break}}}},receiveAttack:function(t){let e;const[n,s]=t,r=this.board[n][s];if("X"==r||"O"==r)throw new Error("Invalid move, field has already been attacked");if(n<0||n>9||s<0||s>9)throw new Error("Invalid move, coordinates out of bounds");return null!=r?(e=this.ships[r].hit(),this.checkStatus(),this.board[n][s]="O"):(e=["MISS!",null],this.board[n][s]="X"),{attackResult:e,isGameOver:this.hasLost}},checkStatus:function(){if(Object.values(this.ships).every((t=>t.isSunk))){this.hasLost=!0;const t=new CustomEvent("gameOver",{detail:this.name});window.dispatchEvent(t)}}}},643:function(t,e){e.Ship=function(t){this.length=t,this.hitCount=0,this.isSunk=!1,this.coords=[]},this.Ship.prototype={hit:function(){return this.hitCount++,this.checkSunk()},checkSunk:function(){let t="HIT!";return this.hitCount>=this.length&&(this.isSunk=!0,t="SUNK!"),[t,this]}}},281:(t,e)=>{e.initiateUI=function(){const t=document.querySelector(".content");t.innerHTML="";const e=document.createElement("div");e.classList.add("splash");const n=document.createElement("button");n.id="singlePlayerBtn",n.textContent="Single player";const s=document.createElement("button");s.id="twoPlayerBtn",s.textContent="Two players",e.append(n,s),t.append(e);const r=h();r.id="board1";const i=h();i.id="board2";const a=document.createElement("div");a.classList.add("display"),a.id="display1";const o=document.createElement("div");o.classList.add("display"),o.id="display2",t.append(r,a,i,o);const c=document.createElement("div");c.classList.add("gameOverScreen");const l=document.createElement("h1");l.textContent="GAME OVER";const u=document.createElement("h2"),d=document.createElement("button");d.textContent="Start new game",c.append(l,u,d),c.style.transform="scale(0)",t.append(c),d.addEventListener("click",(()=>{c.style.transform="scale(0)",r.style.filter="",i.style.filter="";const t=new CustomEvent("newGame");window.dispatchEvent(t)}));const p=document.createElement("div");function h(){const t=document.createElement("div");t.classList.add("board");for(let e=10;e>=0;e--){const n=document.createElement("div");n.classList.add("row"),n.dataset.row=e-1;for(let t=0;t<=10;t++){const s=document.createElement("div");0==e||0==t?(s.classList.add("label"),0==e?0==t?(s.textContent="",s.classList.add("corner")):s.textContent=t:0==t&&(s.textContent="ABCDEFGHIJ"[e-1])):(s.classList.add("field"),s.dataset.coords=`[${e-1},${t-1}]`),n.append(s)}t.append(n)}return t}function f(t,e){t.textContent=e,setTimeout((()=>{t.textContent=""}),1e3)}function m(t,e){const n=e?"#board1":"#board2";t.coords.forEach((t=>{document.querySelector(`${n} [data-coords="[${t}]"]`).classList.add("sunk")}))}return p.classList.add("switchPlayerScreen"),p.innerHTML="<span></span>'s turn in &nbsp;<span><span>",p.style.transform="scale(0)",t.append(p),{setupSplashMenu:function(t){n.addEventListener("click",(()=>{t(!1)})),s.addEventListener("click",(()=>{t(!0)}))},update:function(t){const e=t.currentPlayer?"player1":"player2",n=t.currentPlayer?"player2":"player1";this.updateGameboard(e,"board1",t),this.updateGameboard(n,"board2",t)},updateGameboard:function(t,e,n){for(let s=9;s>=0;s--)for(let r=0;r<10;r++){const i=document.querySelector(`#${e} [data-coords="[${s},${r}]"`);i.textContent="",i.classList.remove(...i.classList),i.classList.add("field");const a=n.players[t].board[s][r];if("X"===a)i.classList.add("miss"),i.textContent=a;else if("O"===a)for(ship in"board1"===e&&i.classList.add("ship"),i.classList.add("hit"),i.textContent=a,n.players[t].ships)n.players[t].ships[ship].coords.some((e=>{if(e[0]===s&&e[1]===r)return n.players[t].ships[ship].isSunk?i.classList.add("sunk"):i.classList.add(ship)}));else null!==a&&"board1"===e&&(i.classList.add("ship"),i.classList.add(a))}},eventListenerActive:!0,setupEventListeners:function(t,e){document.querySelector("#board2").querySelectorAll(".field").forEach((n=>{n.addEventListener("click",(n=>{this.handleAttacks(n,t,e)}))}))},handleAttacks:function(t,e,n){if(!this.eventListenerActive)return;const s=t.target.dataset.coords.slice(1,-1).split(",");let r;try{r=e(s);let i=r[0].attackResult;if(f(o,i[0]),this.eventListenerActive=!1,!n.twoPlayer){let t=r[1].attackResult;setTimeout((()=>{f(a,t[0]),"SUNK!"===t[0]&&m(t[1],!0)}),1e3)}!function(t,e){switch(t[0]){case"MISS!":e.textContent="X",e.style.color="blue";break;case"HIT!":e.textContent="O",e.style.color="red";break;case"SUNK!":e.textContent="O",e.style.color="red",m(t[1],!1)}}(i,t.target),n.twoPlayer?setTimeout((()=>{this.switchPlayers(n)}),1500):setTimeout((()=>{this.update(n),this.eventListenerActive=!0}),1e3)}catch(t){f(o,"!")}},toggleGameOver:function(t){c.style.transform="scale(1)",r.style.filter="blur(5px)",i.style.filter="blur(5px)",u.textContent=`${t} wins!`},switchPlayers:function(t){const e=t.currentPlayer?t.players.player1.name:t.players.player2.name,n=document.querySelector(".switchPlayerScreen span:first-child"),s=document.querySelector(".switchPlayerScreen span:last-child"),i=document.querySelectorAll(".content > *:not(.switchPlayerScreen)");i.forEach((t=>t.style.filter="blur(15px)")),r.classList.toggle("hide"),p.style.transform="scale(1)",n.textContent=e;for(let t=1;t<4;t++)setTimeout((()=>{s.textContent=4-t}),1e3*t);setTimeout((()=>{p.style.transform="scale(0)",i.forEach((t=>t.style.filter="blur(0px)")),this.update(t),s.textContent="",this.eventListenerActive=!0,r.classList.toggle("hide")}),4e3)}}}}},e={};function n(s){var r=e[s];if(void 0!==r)return r.exports;var i=e[s]={id:s,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),s=n(795),r=n.n(s),i=n(569),a=n.n(i),o=n(565),c=n.n(o),l=n(216),u=n.n(l),d=n(589),p=n.n(d),h=n(426),f={};f.styleTagTransform=p(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=u(),e()(h.Z,f),h.Z&&h.Z.locals&&h.Z.locals;const{Game:m}=n(417),{initiateUI:y}=n(281);let v,b=y();function g(t){v=new m(t),v.players.player1.populateGameboard(),v.players.player2.populateGameboard(),b.update(v),b.setupEventListeners(v.curPlayerAttacks.bind(v),v),console.log(v)}b.setupSplashMenu(g),window.addEventListener("gameOver",(()=>{let t;v.gameOver=!0,b.eventListenersActive=!1;for(let e in v.players)v.players[e].hasLost||(t=v.players[e].name);b.toggleGameOver(t)})),window.addEventListener("newGame",(()=>{g()}))})()})();