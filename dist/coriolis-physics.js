'use strict';
(function(root){
const OMEGA=7.2921159e-5,headings={north:[0,1],east:[1,0],south:[0,-1],west:[-1,0],still:[0,0]};
function sample(latitude,heading,seconds){
if(!Number.isFinite(latitude)||Math.abs(latitude)>90||!headings[heading]||!Number.isFinite(seconds)||seconds<0)throw new RangeError('Invalid idealized Coriolis parameters');
const f=2*OMEGA*Math.sin(latitude*Math.PI/180),[u0,v0]=headings[heading];let x,y,u,v;
if(Math.abs(f)<1e-12){x=u0*seconds;y=v0*seconds;u=u0;v=v0}
else{const s=Math.sin(f*seconds),c=Math.cos(f*seconds);u=u0*c+v0*s;v=v0*c-u0*s;x=(u0*s+v0*(1-c))/f;y=(v0*s-u0*(1-c))/f}
return {x,y,u,v,ax:f*v,ay:-f*u,f,speed:Math.hypot(u,v)};
}
const api={OMEGA,MAX_TIME:21600,sample};
if(typeof module==='object'&&module.exports)module.exports=api;else root.CoriolisPhysics=api;
})(globalThis);
