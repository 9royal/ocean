const assert=require('assert');const P=require('./dist/coriolis-physics.js');const near=(a,b,eps=1e-8)=>assert(Math.abs(a-b)<eps,a+' != '+b);
for(const lat of [-60,-45,-30,-15,0,15,30,45,60])for(const heading of ['north','east','south','west','still'])for(const t of [0,300,3600,10800,21600]){const p=P.sample(lat,heading,t);assert(Object.values(p).every(Number.isFinite));near(p.speed,heading==='still'?0:1,1e-12);near(p.u*p.ax+p.v*p.ay,0,1e-12)}
const north=P.sample(45,'north',10800),south=P.sample(-45,'north',10800);assert(north.x>0&&south.x<0);near(north.x,-south.x);near(north.y,south.y);assert(P.sample(45,'east',10800).y<0);assert(P.sample(-45,'east',10800).y>0);
const equator=P.sample(0,'north',21600);near(equator.x,0);near(equator.y,21600);near(equator.ax,0);near(equator.ay,0);for(const lat of [-60,0,60]){const p=P.sample(lat,'still',21600);near(p.x,0);near(p.y,0)}
for(const lat of [-60,-45,-15,15,45,60]){const period=2*Math.PI/Math.abs(P.sample(lat,'north',0).f);const p=P.sample(lat,'north',period);near(p.x,0);near(p.y,0)}
assert(P.sample(60,'north',3600).x>P.sample(15,'north',3600).x);assert.throws(()=>P.sample(100,'north',1),RangeError);
console.log('PASS PHYSICS: hemisphere symmetry, equator, stationary case, constant speed, perpendicular acceleration, inertial period closure, latitude strength and finite outputs.');
