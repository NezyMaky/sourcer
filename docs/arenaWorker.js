!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=153)}({12:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(t,e){this.x=t,this.y=e,this.calculatedLength=null,this.calculatedAngle=null}add(t,e){return t instanceof i?new i(this.x+(t.x||0),this.y+(t.y||0)):new i(this.x+(t||0),this.y+(e||0))}subtract(t,e){return t instanceof i?new i(this.x-(t.x||0),this.y-(t.y||0)):new i(this.x-(t||0),this.y-(e||0))}multiply(t){return t instanceof i?new i(this.x*t.x,this.y*t.y):new i(this.x*t,this.y*t)}divide(t){return t instanceof i?new i(this.x/t.x,this.y/t.y):new i(this.x/t,this.y/t)}modulo(t){return t instanceof i?new i(this.x%t.x,this.y%t.y):new i(this.x%t,this.y%t)}negate(){return new i(-this.x,-this.y)}distance(t){return this.subtract(t).length()}length(){return null!==this.calculatedLength?this.calculatedLength:(this.calculatedLength=Math.sqrt(this.dot()),this.calculatedLength)}normalize(){const t=this.length(),e=0!==t?1/t:0;return this.multiply(e)}angle(){return 180*this.angleInRadians()/Math.PI}angleInRadians(){return null!==this.calculatedAngle?this.calculatedAngle:(this.calculatedAngle=Math.atan2(-this.y,this.x),this.calculatedAngle)}dot(t=this){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}rotate(t){const e=t*(Math.PI/180),s=Math.cos(e),n=Math.sin(e);return new i(s*this.x-n*this.y,s*this.y+n*this.x)}static direction(t){return new i(1,0).rotate(t)}minimize(){return{x:Math.round(this.x),y:Math.round(this.y)}}}e.default=i},127:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,s,i){this.field=t,this.position=e,this.speed=s,this.length=i,this.id=-1,this.frame=0}action(){this.frame++,this.length<=this.frame&&this.field.removeFx(this)}move(){this.position=this.position.add(this.speed)}dump(){return{i:this.id,p:this.position.minimize(),f:this.frame,l:Math.round(this.length)}}}},128:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(132)),o=i(s(127)),r=i(s(12)),a=i(s(16));e.default=class extends n.default{constructor(t,e,s){super(t,e.position.x,e.position.y),this.owner=e,this.type=s,this.temperature=0,this.damage=(()=>0),this.breakable=!1}action(){this.onAction();const t=this.field.checkCollision(this);t&&(t.onHit(this),this.createFxs()),this.field.checkCollisionEnviroment(this)&&(this.field.removeShot(this),this.createFxs())}createFxs(){for(let t=0;t<3;t++){const t=this.position.add(a.default.rand(16)-8,a.default.rand(16)-8),e=new r.default(a.default.rand(1)-.5,a.default.rand(1)-.5),s=a.default.rand(8)+4;this.field.addFx(new o.default(this.field,t,this.speed.divide(2).add(e),s))}}reaction(t){t.temperature+=this.temperature}onAction(){}dump(){return{o:this.owner.id,i:this.id,p:this.position.minimize(),d:this.direction,s:this.type}}}},129:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{}i.DIRECTION_RIGHT=1,i.DIRECTION_LEFT=-1,i.VERTICAL_UP="vertial_up",i.VERTICAL_DOWN="vertial_down",e.default=i},13:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{}i.INITIAL_SHIELD=100,i.INITIAL_FUEL=100,i.INITIAL_MISSILE_AMMO=20,i.LASER_ATTENUATION=1,i.LASER_MOMENTUM=128,i.FUEL_COST=.24,i.COLLISION_SIZE=4,i.SCAN_WAIT=.35,i.SPEED_RESISTANCE=.96,i.GRAVITY=.1,i.TOP_INVISIBLE_HAND=480,i.DISTANCE_BORDAR=400,i.DISTANCE_INVISIBLE_HAND=.008,i.OVERHEAT_BORDER=100,i.OVERHEAT_DAMAGE_LINEAR_WEIGHT=.05,i.OVERHEAT_DAMAGE_POWER_WEIGHT=.012,i.GROUND_DAMAGE_SCALE=1,i.COOL_DOWN=.5,i.ON_HIT_SPEED_GIVEN_RATE=.4,e.default=i},130:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.framesOfLife=0,this.preThink=(()=>{this.framesOfLife++}),this.frame=(()=>this.framesOfLife),this.altitude=(()=>t.position.y),this.wait=(e=>{0<e&&(t.wait+=e)})}}},131:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.isAccepted=!1}validate(){if(!this.isAccepted)throw new Error("Invalid command.")}accept(){this.isAccepted=!0}unaccept(){this.isAccepted=!1}}},132:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(12)),o=i(s(13));e.default=class{constructor(t,e,s){this.field=t,this.id=-1,this.direction=0,this.size=o.default.COLLISION_SIZE,this.wait=0,this.wait=0,this.position=new n.default(e,s),this.speed=new n.default(0,0)}think(){this.wait<=0?(this.wait=0,this.onThink()):this.wait=this.wait-1}onThink(){}action(){}move(){this.position=this.position.add(this.speed)}onHit(t){}dump(){throw new Error("not implimentation")}}},143:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.console={log:(...t)=>{}};const t={Object:Object,String:String,Number:Number,Boolean:Boolean,Array:Array,Date:Date,Math:Math,RegExp:RegExp,JSON:JSON,NaN:NaN,Infinity:1/0,undefined:void 0,parseInt:parseInt,parseFloat:parseFloat,isNaN:isNaN,isFinite:isFinite,console:this.console};this.argNames=Object.keys(t),this.argValues=this.argNames.map(e=>t[e])}isDebuggable(){return!0}getExposedConsole(){return this.console}load(t){let e=[];return(e=e.concat(this.argNames)).push('"use strict";\n'+t),function(t,e){function s(){return t.apply(this,e)}return s.prototype=t.prototype,new s}(Function,e).apply(void 0,this.argValues)}}},144:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(130)),o=i(s(16));e.default=class extends n.default{constructor(t){super(t),this.direction=(()=>t.direction);const e=t.command;this.fuel=(()=>t.fuel),this.scanEnemy=((s,i,n)=>{e.validate(),t.wait+=1.5;const r=t.opposite(s),a=o.default.createRadar(t.position,r,i,n||Number.MAX_VALUE);return t.field.scanEnemy(t.owner,a)}),this.speedUp=(()=>{e.validate(),e.speedUp=.8}),this.speedDown=(()=>{e.validate(),e.speedDown=.1}),this.turnRight=(()=>{e.validate(),e.turn=-9}),this.turnLeft=(()=>{e.validate(),e.turn=9}),this.log=((...s)=>{e.validate(),t.log(s.map(t=>(t=>"[object String]"===Object.prototype.toString.call(t))(t)?t:JSON.stringify(t)).join(", "))}),this.scanDebug=((s,i,n)=>{e.validate(),t.scanDebug(t.opposite(s),i,n)})}connectConsole(t){t&&(t.log=this.log.bind(this))}}},145:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(131)),o=i(s(13)),r=i(s(12));e.default=class extends n.default{constructor(t){super(),this.missile=t,this.speedUp=0,this.speedDown=0,this.turn=0,this.reset()}reset(){this.speedUp=0,this.speedDown=0,this.turn=0}execute(){if(0<this.missile.fuel){this.missile.direction+=this.turn;const t=r.default.direction(this.missile.direction);this.missile.speed=this.missile.speed.add(t.multiply(this.speedUp)),this.missile.speed=this.missile.speed.multiply(1-this.speedDown),this.missile.fuel-=(this.speedUp+3*this.speedDown)*o.default.FUEL_COST,this.missile.fuel=Math.max(0,this.missile.fuel)}}}},146:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(128)),o=i(s(13)),r=i(s(145)),a=i(s(144)),h=i(s(129));e.default=class extends n.default{constructor(t,e,s){super(t,e,"Missile"),this.bot=s,this.temperature=10,this.damage=(()=>10+2*this.speed.length()),this.fuel=100,this.breakable=!0,this.debugDump={logs:[],arcs:[]},this.direction=e.direction===h.default.DIRECTION_RIGHT?0:180,this.speed=e.speed,this.command=new r.default(this),this.command.reset(),this.controller=new a.default(this)}onThink(){if(this.command.reset(),!(this.fuel<=0))try{this.command.accept(),this.controller.preThink(),this.debugDump={logs:[],arcs:[]},this.owner.scriptLoader&&this.controller.connectConsole(this.owner.scriptLoader.getExposedConsole()),this.bot(this.controller)}catch(t){this.command.reset(),this.debugDump.logs.push({message:`Missile function error: ${t.message}`,color:"red"})}finally{this.command.unaccept()}}onAction(){this.speed=this.speed.multiply(o.default.SPEED_RESISTANCE),this.command.execute(),this.command.reset()}onHit(t){this.field.removeShot(this),this.field.removeShot(t)}opposite(t){return this.direction+t}log(t){this.debugDump.logs.push({message:t})}scanDebug(t,e,s){this.debugDump.arcs.push({direction:t,angle:e,renge:s})}dump(){const t=super.dump();return this.owner.scriptLoader&&this.owner.scriptLoader.isDebuggable()&&(t.debug=this.debugDump),t}}},147:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(128)),o=i(s(12)),r=i(s(13));e.default=class extends n.default{constructor(t,e,s,i){super(t,e,"Laser"),this.direction=s,this.temperature=5,this.damage=(()=>8),this.speed=o.default.direction(s).multiply(i),this.momentum=r.default.LASER_MOMENTUM}action(){super.action(),this.momentum-=r.default.LASER_ATTENUATION,this.momentum<0&&this.field.removeShot(this)}}},148:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(t){this.shotType=t}isLaser(){return"Laser"===this.shotType}isMissile(){return"Missile"===this.shotType}}e.default=i;e.MissileParam=class extends i{constructor(t){super("Missile"),this.bot=t}};e.LaserParam=class extends i{constructor(t,e){super("Laser"),this.direction=e,this.power=0,this.power=Math.min(Math.max(t||8,3),8)}}},149:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(130)),o=i(s(13)),r=i(s(16)),a=s(148);e.default=class extends n.default{constructor(t){super(t),this.shield=(()=>t.shield),this.temperature=(()=>t.temperature),this.missileAmmo=(()=>t.missileAmmo),this.fuel=(()=>t.fuel);const e=t.field,s=t.command;this.scanEnemy=((i,n,a)=>{s.validate(),t.wait+=o.default.SCAN_WAIT;const h=t.opposite(i),u=a||Number.MAX_VALUE,c=r.default.createRadar(t.position,h,n,u);return e.scanEnemy(t,c)}),this.scanAttack=((i,n,a)=>{s.validate(),t.wait+=o.default.SCAN_WAIT;const h=t.opposite(i),u=a||Number.MAX_VALUE,c=r.default.createRadar(t.position,h,n,u);return e.scanAttack(t,c)}),this.ahead=(()=>{s.validate(),s.ahead=.8}),this.back=(()=>{s.validate(),s.ahead=-.4}),this.ascent=(()=>{s.validate(),s.ascent=.9}),this.descent=(()=>{s.validate(),s.ascent=-.9}),this.turn=(()=>{s.validate(),s.turn=!0}),this.fireLaser=((t,e)=>{s.validate(),s.fire=new a.LaserParam(e,t)}),this.fireMissile=(t=>{s.validate(),s.fire=new a.MissileParam(t)}),this.log=((...e)=>{s.validate(),t.log(e.map(t=>(t=>"[object String]"===Object.prototype.toString.call(t))(t)?t:JSON.stringify(t)).join(", "))}),this.scanDebug=((e,i,n)=>{s.validate(),t.scanDebug(t.opposite(e),i,n)})}connectConsole(t){t&&(t.log=this.log.bind(this))}}},150:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(131)),o=i(s(13));e.default=class extends n.default{constructor(t){super(),this.sourcer=t,this.ahead=0,this.ascent=0,this.turn=!1,this.fire=null,this.reset()}reset(){this.ahead=0,this.ascent=0,this.turn=!1,this.fire=null}execute(){this.fire&&this.sourcer.fire(this.fire),this.turn&&(this.sourcer.direction*=-1),0<this.sourcer.fuel&&(this.sourcer.speed=this.sourcer.speed.add(this.ahead*this.sourcer.direction,this.ascent),this.sourcer.fuel-=(Math.abs(this.ahead)+Math.abs(this.ascent))*o.default.FUEL_COST,this.sourcer.fuel=Math.max(0,this.sourcer.fuel))}}},151:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(132)),o=i(s(150)),r=i(s(149)),a=i(s(13)),h=i(s(129)),u=i(s(16)),c=i(s(12)),d=i(s(147)),l=i(s(146)),f=i(s(127));e.default=class extends n.default{constructor(t,e,s,i,n,u,c){super(t,e,s),this.aiSource=i,this.account=n,this.name=u,this.color=c,this.alive=!0,this.temperature=0,this.shield=a.default.INITIAL_SHIELD,this.missileAmmo=a.default.INITIAL_MISSILE_AMMO,this.fuel=a.default.INITIAL_FUEL,this.bot=null,this.debugDump={logs:[],arcs:[]},this.direction=Math.random()<.5?h.default.DIRECTION_RIGHT:h.default.DIRECTION_LEFT,this.command=new o.default(this),this.controller=new r.default(this)}compile(t){if(this.scriptLoader=t,this.bot=t.load(this.aiSource),!this.bot)throw{message:"Function has not been returned."};if("function"!=typeof this.bot)throw{message:"Returned is not a Function."}}onThink(){if(null!==this.bot&&this.alive)try{this.command.accept(),this.controller.preThink(),this.debugDump={logs:[],arcs:[]},this.scriptLoader&&this.controller.connectConsole(this.scriptLoader.getExposedConsole()),this.bot(this.controller)}catch(t){this.debugDump.logs.push({message:`Sourcer function error: ${t.message}`,color:"red"}),this.command.reset()}finally{this.command.unaccept()}}action(){if(!this.alive&&u.default.rand(8)<1){const t=this.position.add(u.default.rand(16)-8,u.default.rand(16)-8),e=new c.default(u.default.rand(1)-.5,u.default.rand(1)+.5),s=u.default.rand(8)+4;this.field.addFx(new f.default(this.field,t,e,s))}if(this.speed=this.speed.multiply(a.default.SPEED_RESISTANCE),this.speed=this.speed.subtract(0,a.default.GRAVITY),a.default.TOP_INVISIBLE_HAND<this.position.y){const t=.1*(this.position.y-a.default.TOP_INVISIBLE_HAND);this.speed=this.speed.subtract(0,a.default.GRAVITY*t)}const t=this.field.center-this.position.x;if(a.default.DISTANCE_BORDAR<Math.abs(t)){const e=t<0?-1:1,s=(Math.abs(t)-a.default.DISTANCE_BORDAR)*a.default.DISTANCE_INVISIBLE_HAND*e;this.position=new c.default(this.position.x+s,this.position.y)}this.position.y<0&&(this.shield-=-this.speed.y*a.default.GROUND_DAMAGE_SCALE,this.position=new c.default(this.position.x,0),this.speed=new c.default(this.speed.x,0)),this.temperature-=a.default.COOL_DOWN,this.temperature=Math.max(this.temperature,0);const e=this.temperature-a.default.OVERHEAT_BORDER;if(0<e){const t=e*a.default.OVERHEAT_DAMAGE_LINEAR_WEIGHT,s=Math.pow(e*a.default.OVERHEAT_DAMAGE_POWER_WEIGHT,2);this.shield-=t+s}this.shield=Math.max(0,this.shield),this.command.execute(),this.command.reset()}fire(t){if(t.isLaser()){const e=this.opposite(t.direction),s=new d.default(this.field,this,e,t.power);s.reaction(this),this.field.addShot(s)}if(t.isMissile()&&0<this.missileAmmo){const e=new l.default(this.field,this,t.bot);e.reaction(this),this.missileAmmo--,this.field.addShot(e)}}opposite(t){return this.direction===h.default.DIRECTION_LEFT?u.default.toOpposite(t):t}onHit(t){this.speed=this.speed.add(t.speed.multiply(a.default.ON_HIT_SPEED_GIVEN_RATE)),this.shield-=t.damage(),this.shield=Math.max(0,this.shield),this.field.removeShot(t)}log(t){this.debugDump.logs.push({message:t})}scanDebug(t,e,s){this.debugDump.arcs.push({direction:t,angle:e,renge:s})}dump(){const t={i:this.id,p:this.position.minimize(),d:this.direction,h:Math.ceil(this.shield),t:Math.ceil(this.temperature),a:this.missileAmmo,f:Math.ceil(this.fuel)};return this.scriptLoader&&this.scriptLoader.isDebuggable()&&(t.debug=this.debugDump),t}}},152:function(t,e,s){"use strict";var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))(function(n,o){function r(t){try{h(i.next(t))}catch(t){o(t)}}function a(t){try{h(i.throw(t))}catch(t){o(t)}}function h(t){t.done?n(t.value):new s(function(e){e(t.value)}).then(r,a)}h((i=i.apply(t,e||[])).next())})},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=n(s(12)),r=n(s(151)),a=n(s(16)),h=128;e.default=class{constructor(t,e=!1){this.scriptLoaderConstructor=t,this.isDemo=e,this.currentId=0,this.center=0,this.isFinished=!1,this.dummyEnemy=new o.default(0,150),this.frame=0,this.sourcers=[],this.shots=[],this.fxs=[]}registerSourcer(t,e,s,i){const n=this.sourcers.length%2==0?-1:1,o=a.default.rand(80)+160*n,h=a.default.rand(160)+80;this.addSourcer(new r.default(this,o,h,t,e,s,i))}process(t,e){return i(this,void 0,void 0,function*(){for(const s of this.sourcers)t.onPreThink(s.id),yield t.waitNextTick(),e(s),t.onPostThink(s.id),yield t.waitNextTick()})}compile(t){return i(this,void 0,void 0,function*(){return this.process(t,e=>{try{e.compile(new this.scriptLoaderConstructor)}catch(e){t.onError(`There is an error in your code:　${e.message}`)}})})}addSourcer(t){t.id=this.currentId++,this.sourcers.push(t)}addShot(t){t.id=this.currentId++,this.shots.push(t)}removeShot(t){const e=this.shots.indexOf(t);0<=e&&this.shots.splice(e,1)}addFx(t){t.id=this.currentId++,this.fxs.push(t)}removeFx(t){const e=this.fxs.indexOf(t);0<=e&&this.fxs.splice(e,1)}tick(t){return i(this,void 0,void 0,function*(){0===this.frame&&t.onFrame(this.dump()),this.center=this.computeCenter(),yield this.process(t,t=>{t.think(),this.shots.filter(e=>e.owner.id===t.id).forEach(t=>t.think())}),this.sourcers.forEach(t=>t.action()),this.shots.forEach(t=>t.action()),this.fxs.forEach(t=>t.action()),this.sourcers.forEach(t=>t.move()),this.shots.forEach(t=>t.move()),this.fxs.forEach(t=>t.move()),this.checkFinish(t),this.checkEndOfGame(t),this.frame++,t.onFrame(this.dump())})}checkFinish(t){if(this.isDemo)return void(h<this.frame&&(this.result={frame:this.frame,timeout:null,isDraw:null,winnerId:null},t.onFinished(this.result)));if(this.result)return;this.sourcers.forEach(t=>{t.alive=0<t.shield});const e=this.sourcers.filter(t=>t.alive);if(!(1<e.length)){if(1===e.length){const s=e[0];return this.result={winnerId:s.id,frame:this.frame,timeout:null,isDraw:!1},void t.onFinished(this.result)}this.result={winnerId:null,timeout:null,frame:this.frame,isDraw:!0},t.onFinished(this.result)}}checkEndOfGame(t){if(!this.isFinished&&this.result)return this.isDemo?(this.isFinished=!0,void t.onEndOfGame()):void(this.result.frame<this.frame-90&&(this.isFinished=!0,t.onEndOfGame()))}scanEnemy(t,e){return this.isDemo&&1===this.sourcers.length?e(this.dummyEnemy):this.sourcers.some(s=>s.alive&&s!==t&&e(s.position))}scanAttack(t,e){return this.shots.some(s=>s.owner!==t&&e(s.position)&&this.isIncoming(t,s))}isIncoming(t,e){const s=t.position,i=e.position,n=s.distance(i);return s.distance(i.add(e.speed))<n}checkCollision(t){const e=t.position,s=t.position.add(t.speed),i=this.shots.find(i=>i.breakable&&i.owner!==t.owner&&a.default.calcDistance(e,s,i.position)<t.size+i.size);if(i)return i;const n=this.sourcers.find(i=>i.alive&&i!==t.owner&&a.default.calcDistance(e,s,i.position)<t.size+i.size);return n||null}checkCollisionEnviroment(t){return t.position.y<0}computeCenter(){let t=0,e=0;return this.sourcers.forEach(s=>{s.alive&&(e+=s.position.x,t++)}),e/t}players(){const t={};return this.sourcers.forEach(e=>{t[e.id]={name:e.name||e.account,account:e.account,color:e.color}}),t}dump(){const t=[],e=[],s=[];return this.sourcers.forEach(e=>{t.push(e.dump())}),this.shots.forEach(t=>{e.push(t.dump())}),this.fxs.forEach(t=>{s.push(t.dump())}),{f:this.frame,s:t,b:e,x:s}}}},153:function(t,e,s){"use strict";var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))(function(n,o){function r(t){try{h(i.next(t))}catch(t){o(t)}}function a(t){try{h(i.throw(t))}catch(t){o(t)}}function h(t){t.done?n(t.value):new s(function(e){e(t.value)}).then(r,a)}h((i=i.apply(t,e||[])).next())})},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=n(s(152)),r=n(s(143));let a=0;const h={};onmessage=(({data:t})=>{if(void 0!==t.issuedId)return h[t.issuedId](),void delete h[t.issuedId];const e=t,s=e.isDemo,n=e.sources,u=[],c={waitNextTick:()=>i(this,void 0,void 0,function*(){return new Promise(t=>{const e=(()=>a++)();h[e]=t,postMessage({issuedId:e,command:"Next"})})}),onPreThink:t=>{postMessage({command:"PreThink",id:t})},onPostThink:t=>{postMessage({command:"PostThink",id:t,loadedFrame:u.length})},onFrame:t=>{u.push(t)},onFinished:t=>{postMessage({result:t,command:"Finished"})},onEndOfGame:()=>{postMessage({frames:u,command:"EndOfGame"})},onError:t=>{postMessage({error:t,command:"Error"})}},d=new o.default(r.default,s);n.forEach(t=>{d.registerSourcer(t.source,t.name,t.name,t.color)}),postMessage({command:"Players",players:d.players()}),setTimeout(()=>i(this,void 0,void 0,function*(){yield d.compile(c);for(let t=0;t<1e4&&!d.isFinished;t++)yield d.tick(c)}),0)})},16:function(t,e,s){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(12)),o=1e-11;class r{static createRadar(t,e,s,i){const n=e=>t.distance(e)<=i;if(360<=s)return n;const o=r.side(t,e+s/2),a=r.side(t,e+180-s/2);return s<180?t=>o(t)&&a(t)&&n(t):t=>(o(t)||a(t))&&n(t)}static side(t,e){const s=r.toRadian(e),i=new n.default(Math.cos(s),Math.sin(s)),a=t.x*i.y-t.y*i.x-o;return t=>0<=t.x*i.y-t.y*i.x-a}static calcDistance(t,e,s){const i=e.subtract(t),n=s.subtract(t);if(i.dot(n)<o)return n.length();const r=t.subtract(e),a=s.subtract(e);return r.dot(a)<o?a.length():Math.abs(i.cross(n)/i.length())}static toRadian(t){return t*(Math.PI/180)}static toOpposite(t){const e=r.normalizeDegree(t);return e<=180?2*(90-e)+e:2*(270-e)+e}static normalizeDegree(t){const e=t%360;return e<0?e+360:e}static rand(t){return Math.random()*t}}e.default=r}});