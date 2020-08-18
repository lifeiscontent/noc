!function(){function t(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var n=function(){function n(t,i){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),this.x=t,this.y=i}var i,e,a;return i=n,a=[{key:"random2D",value:function(){var t=Math.random()*(2*Math.PI);return new n(Math.cos(t),Math.sin(t))}},{key:"add",value:function(t,i){return new n(t.x+i.x,t.y+i.y)}},{key:"sub",value:function(t,i){return new n(t.x-i.x,t.y-i.y)}},{key:"mult",value:function(t,i){return new n(t.x*i,t.y*i)}},{key:"div",value:function(t,i){return new n(t.x/i,t.y/i)}}],(e=[{key:"add",value:function(t){return this.x+=t.x,this.y+=t.y,this}},{key:"sub",value:function(t){return this.x-=t.x,this.y-=t.y,this}},{key:"mult",value:function(t){return this.x*=t,this.y*=t,this}},{key:"div",value:function(t){return this.x/=t,this.y/=t,this}},{key:"mag",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}},{key:"limit",value:function(t){return this.mag()>t&&this.normalize().mult(t),this}},{key:"heading",value:function(){return Math.atan2(this.y,this.x)}},{key:"rotate",value:function(t){var n=this.heading()+t,i=this.mag();return this.x=Math.cos(n)*i,this.y=Math.sin(n)*i,this}},{key:"magSq",value:function(){var t=this.x,n=this.y;return t*t+n*n}},{key:"normalize",value:function(){var t=this.mag();return 0!==t&&this.div(t),this}},{key:"setMag",value:function(t){return this.normalize().mult(t),this}},{key:"lerp",value:function(t,n,i){return this.x+=(t-this.x)*i||0,this.y+=(n-this.y)*i||0,this}},{key:"get",value:function(){return new n(this.x,this.y)}}])&&t(i.prototype,e),a&&t(i,a),n}();function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function a(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}var o,s,r=document.getElementById("canvas"),u=r.getContext("2d");function l(t,n){return"number"!=typeof t?Math.random():("number"!=typeof n&&(n=t,t=0),Math.random()*(n-t+1)+t)}function h(t,n,i){return Math.min(Math.max(t,n),i)}document.body.style.margin="0",new n(0,0),document.onmousemove=function(t){new n(t.clientX,t.clientY)},document.onmousedown=function(){},document.onmouseup=function(){};var c,y,f=function(){function t(e,a,o){i(this,t),this.mass=e,this.location=new n(a,o),this.velocity=new n(0,0),this.acceleration=new n(0,0),this.topSpeed=4,this.G=.4,this.color="hsl(".concat(l(360),", 100%, 50%)")}return a(t,[{key:"applyForce",value:function(t){this.acceleration.add(n.div(t,this.mass))}},{key:"update",value:function(){this.velocity.add(this.acceleration),this.location.add(this.velocity),this.acceleration.mult(0)}},{key:"attract",value:function(t){var i=n.sub(this.location,t.location),e=h(i.mag(),5,25),a=this.G*this.mass*t.mass/(e*e);return i.normalize().mult(a)}},{key:"display",value:function(){u.fillStyle=this.color,u.beginPath(),u.ellipse(this.location.x,this.location.y,16*this.mass,16*this.mass,Math.PI/4,0,2*Math.PI),u.fill()}},{key:"checkEdges",value:function(){this.location.x>o?(this.location.x=o,this.velocity.x*=-1):this.location.x<0&&(this.velocity.x*=-1,this.location.x=0),this.location.y>s&&(this.location.y=s,this.velocity.y*=-1)}},{key:"isInside",value:function(t){return this.location.x>=t.x&&this.location.x<t.x+t.w&&this.location.y>=t.y&&this.location.y<t.y+t.h}},{key:"drag",value:function(t){var n=this.velocity.mag(),i=t.c*n*n,e=this.velocity.get().mult(-1).normalize().mult(i);return this.applyForce(e),this}}]),t}(),v=function(){function t(){i(this,t),this.location=new n(o/2,s/2),this.mass=20,this.G=.4}return a(t,[{key:"attract",value:function(t){var i=n.sub(this.location,t.location),e=h(i.mag(),5,25),a=this.G*this.mass*t.mass/(e*e);return i.normalize().mult(a)}},{key:"display",value:function(){u.beginPath(),u.ellipse(this.location.x,this.location.y,2*this.mass,2*this.mass,Math.PI/4,0,2*Math.PI),u.fillStyle="rgba(200, 200, 200, ".concat(175/255,")"),u.fill(),u.stroke()}}]),t}();!function(){r.width=o=640,r.height=s=360,c=Array.from({length:10});for(var t=0;t<c.length;t++)c[t]=new f(l(.1,2),l(o),l(s));y=new v}(),requestAnimationFrame((function t(n){!function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;u.fillStyle="rgb(".concat(t,", ").concat(n,", ").concat(i,")"),u.fillRect(0,0,o,s)}(255),y.display();for(var i=0;i<c.length;i++){for(var e=0;e<c.length;e++)if(i!==e){var a=c[e].attract(c[i]);c[i].applyForce(a)}c[i].update(),c[i].display()}requestAnimationFrame(t)}))}();
//# sourceMappingURL=noc.624e5178.e2205b34.js.map