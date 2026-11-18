var Sa="160";var tc=0,za=1,ec=2;var ul=1,nc=2,_n=3,Fn=0,Be=1,xn=2;var Un=0,Si=1,Ga=2,ka=3,Ha=4,ic=5,Yn=100,sc=101,rc=102,Va=103,Wa=104,ac=200,oc=201,lc=202,cc=203,Fr=204,Br=205,hc=206,uc=207,fc=208,dc=209,pc=210,mc=211,gc=212,_c=213,vc=214,xc=0,yc=1,Mc=2,ws=3,Sc=4,bc=5,wc=6,Ec=7,fl=0,Ac=1,Tc=2,Dn=0,Rc=1,Cc=2,Pc=3,ba=4,Ic=5,Lc=6;var dl=300,Ei=301,Ai=302,Hi=303,zr=304,Qs=306,Gr=1e3,Ve=1001,kr=1002,Re=1003,Xa=1004;var rr=1005;var ve=1006,Nc=1007;var Ti=1008;var On=1009,Uc=1010,Dc=1011,wa=1012,pl=1013,Nn=1014,Ye=1015,on=1016,ml=1017,gl=1018,Kn=1020,Oc=1021,De=1023,Fc=1024,Bc=1025,$n=1026,Ri=1027,Ea=1028,_l=1029,zc=1030,vl=1031,xl=1033,ar=33776,or=33777,lr=33778,cr=33779,qa=35840,Ya=35841,Za=35842,Ka=35843,yl=36196,$a=37492,Ja=37496,Qa=37808,ja=37809,to=37810,eo=37811,no=37812,io=37813,so=37814,ro=37815,ao=37816,oo=37817,lo=37818,co=37819,ho=37820,uo=37821,hr=36492,fo=36494,po=36495,Gc=36283,mo=36284,go=36285,_o=36286;var Es=2300,As=2301,ur=2302,vo=2400,xo=2401,yo=2402;var Ml=3e3,Jn=3001,kc=3200,Hc=3201,Sl=0,Vc=1,Fe="",_e="srgb",ze="srgb-linear",Aa="display-p3",js="display-p3-linear",Ts="linear",ue="srgb",Rs="rec709",Cs="p3";var ni=7680;var Mo=519,Wc=512,Xc=513,qc=514,bl=515,Yc=516,Zc=517,Kc=518,$c=519,So=35044;var bo="300 es",Hr=1035,Mn=2e3,Ps=2001,Bn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var fr=Math.PI/180,Vr=180/Math.PI;function $i(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Ie(i,t,e){return Math.max(t,Math.min(e,i))}function Jc(i,t){return(i%t+t)%t}function dr(i,t,e){return(1-e)*i+e*t}function wo(i){return(i&i-1)===0&&i!==0}function Wr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Di(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ee=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],g=n[5],v=n[8],x=s[0],p=s[3],u=s[6],R=s[1],M=s[4],U=s[7],F=s[2],D=s[5],L=s[8];return r[0]=o*x+a*R+l*F,r[3]=o*p+a*M+l*D,r[6]=o*u+a*U+l*L,r[1]=c*x+h*R+f*F,r[4]=c*p+h*M+f*D,r[7]=c*u+h*U+f*L,r[2]=d*x+g*R+v*F,r[5]=d*p+g*M+v*D,r[8]=d*u+g*U+v*L,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,d=a*l-h*r,g=c*r-o*l,v=e*f+n*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/v;return t[0]=f*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=g*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(pr.makeScale(t,e)),this}rotate(t){return this.premultiply(pr.makeRotation(-t)),this}translate(t,e){return this.premultiply(pr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},pr=new $t;function wl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qc(){let i=Is("canvas");return i.style.display="block",i}var Eo={};function Gi(i){i in Eo||(Eo[i]=!0,console.warn(i))}var Ao=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),To=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),es={[ze]:{transfer:Ts,primaries:Rs,toReference:i=>i,fromReference:i=>i},[_e]:{transfer:ue,primaries:Rs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[js]:{transfer:Ts,primaries:Cs,toReference:i=>i.applyMatrix3(To),fromReference:i=>i.applyMatrix3(Ao)},[Aa]:{transfer:ue,primaries:Cs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(To),fromReference:i=>i.applyMatrix3(Ao).convertLinearToSRGB()}},jc=new Set([ze,js]),le={enabled:!0,_workingColorSpace:ze,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!jc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=es[t].toReference,s=es[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return es[i].primaries},getTransfer:function(i){return i===Fe?Ts:es[i].transfer}};function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ii,Ls=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ii===void 0&&(ii=Is("canvas")),ii.width=t.width,ii.height=t.height;let n=ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Is("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bi(e[n]/255)*255):e[n]=bi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},th=0,Ns=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=$i(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(gr(s[o].image)):r.push(gr(s[o]))}else r=gr(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ls.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var eh=0,We=class i extends Bn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ve,s=Ve,r=ve,o=Ti,a=De,l=On,c=i.DEFAULT_ANISOTROPY,h=Fe){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=$i(),this.name="",this.source=new Ns(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Gi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Jn?_e:Fe),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gr:t.x=t.x-Math.floor(t.x);break;case Ve:t.x=t.x<0?0:1;break;case kr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gr:t.y=t.y-Math.floor(t.y);break;case Ve:t.y=t.y<0?0:1;break;case kr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Gi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===_e?Jn:Ml}set encoding(t){Gi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Jn?_e:Fe}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=dl;We.DEFAULT_ANISOTROPY=1;var be=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],g=l[5],v=l[9],x=l[2],p=l[6],u=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-x)<.01&&Math.abs(v-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+x)<.1&&Math.abs(v+p)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,U=(g+1)/2,F=(u+1)/2,D=(h+d)/4,L=(f+x)/4,K=(v+p)/4;return M>U&&M>F?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=D/n,r=L/n):U>F?U<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(U),n=D/s,r=K/s):F<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),n=L/r,s=K/r),this.set(n,s,r,e),this}let R=Math.sqrt((p-v)*(p-v)+(f-x)*(f-x)+(d-h)*(d-h));return Math.abs(R)<.001&&(R=1),this.x=(p-v)/R,this.y=(f-x)/R,this.z=(d-h)/R,this.w=Math.acos((c+g+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xr=class extends Bn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Gi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Jn?_e:Fe),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ve,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new We(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ns(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sn=class extends Xr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Us=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ve,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qr=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ve,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ln=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],d=r[o+0],g=r[o+1],v=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=g,t[e+2]=v,t[e+3]=x;return}if(f!==x||l!==d||c!==g||h!==v){let p=1-a,u=l*d+c*g+h*v+f*x,R=u>=0?1:-1,M=1-u*u;if(M>Number.EPSILON){let F=Math.sqrt(M),D=Math.atan2(F,u*R);p=Math.sin(p*D)/F,a=Math.sin(a*D)/F}let U=a*R;if(l=l*p+d*U,c=c*p+g*U,h=h*p+v*U,f=f*p+x*U,p===1-a){let F=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=F,c*=F,h*=F,f*=F}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[o],d=r[o+1],g=r[o+2],v=r[o+3];return t[e]=a*v+h*f+l*g-c*d,t[e+1]=l*v+h*d+c*f-a*g,t[e+2]=c*v+h*g+a*d-l*f,t[e+3]=h*v-a*f-l*d-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),f=a(r/2),d=l(n/2),g=l(s/2),v=l(r/2);switch(o){case"XYZ":this._x=d*h*f+c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f-d*g*v;break;case"YXZ":this._x=d*h*f+c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f+d*g*v;break;case"ZXY":this._x=d*h*f-c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f-d*g*v;break;case"ZYX":this._x=d*h*f-c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f+d*g*v;break;case"YZX":this._x=d*h*f+c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f-d*g*v;break;case"XZY":this._x=d*h*f-c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f+d*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+a+f;if(d>0){let g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(n>a&&n>f){let g=2*Math.sqrt(1+n-a-f);this._w=(h-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>f){let g=2*Math.sqrt(1+a-n-f);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+h)/g}else{let g=2*Math.sqrt(1+f-n-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let g=1-e;return this._w=g*o+e*this._w,this._x=g*n+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),f=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ro.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ro.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+l*c+o*f-a*h,this.y=n+l*h+a*c-r*f,this.z=s+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _r.copy(this).projectOnVector(t),this.sub(_r)}reflect(t){return this.sub(_r.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_r=new H,Ro=new ln,Qn=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qe):Qe.fromBufferAttribute(r,o),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ns.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ns.copy(n.boundingBox)),ns.applyMatrix4(t.matrixWorld),this.union(ns)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Oi),is.subVectors(this.max,Oi),si.subVectors(t.a,Oi),ri.subVectors(t.b,Oi),ai.subVectors(t.c,Oi),Rn.subVectors(ri,si),Cn.subVectors(ai,ri),Hn.subVectors(si,ai);let e=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Hn.z,Hn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Hn.z,0,-Hn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Hn.y,Hn.x,0];return!vr(e,si,ri,ai,is)||(e=[1,0,0,0,1,0,0,0,1],!vr(e,si,ri,ai,is))?!1:(ss.crossVectors(Rn,Cn),e=[ss.x,ss.y,ss.z],vr(e,si,ri,ai,is))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},un=[new H,new H,new H,new H,new H,new H,new H,new H],Qe=new H,ns=new Qn,si=new H,ri=new H,ai=new H,Rn=new H,Cn=new H,Hn=new H,Oi=new H,is=new H,ss=new H,Vn=new H;function vr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Vn.fromArray(i,r);let a=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),l=t.dot(Vn),c=e.dot(Vn),h=n.dot(Vn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var nh=new Qn,Fi=new H,xr=new H,Vi=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):nh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);let e=Fi.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(xr)),this.expandByPoint(Fi.copy(t.center).sub(xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},fn=new H,yr=new H,rs=new H,Pn=new H,Mr=new H,as=new H,Sr=new H,Yr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.origin).addScaledVector(this.direction,e),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){yr.copy(t).add(e).multiplyScalar(.5),rs.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(yr);let r=t.distanceTo(e)*.5,o=-this.direction.dot(rs),a=Pn.dot(this.direction),l=-Pn.dot(rs),c=Pn.lengthSq(),h=Math.abs(1-o*o),f,d,g,v;if(h>0)if(f=o*l-a,d=o*a-l,v=r*h,f>=0)if(d>=-v)if(d<=v){let x=1/h;f*=x,d*=x,g=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*l)+c;else d<=-v?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c):d<=v?(f=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(yr).addScaledVector(rs,d),g}intersectSphere(t,e){fn.subVectors(t.center,this.origin);let n=fn.dot(this.direction),s=fn.dot(fn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,s,r){Mr.subVectors(e,t),as.subVectors(n,t),Sr.crossVectors(Mr,as);let o=this.direction.dot(Sr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pn.subVectors(this.origin,t);let l=a*this.direction.dot(as.crossVectors(Pn,as));if(l<0)return null;let c=a*this.direction.dot(Mr.cross(Pn));if(c<0||l+c>o)return null;let h=-a*Pn.dot(Sr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},we=class i{constructor(t,e,n,s,r,o,a,l,c,h,f,d,g,v,x,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,f,d,g,v,x,p)}set(t,e,n,s,r,o,a,l,c,h,f,d,g,v,x,p){let u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=f,u[14]=d,u[3]=g,u[7]=v,u[11]=x,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/oi.setFromMatrixColumn(t,0).length(),r=1/oi.setFromMatrixColumn(t,1).length(),o=1/oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=o*h,g=o*f,v=a*h,x=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=g+v*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=v+g*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,g=l*f,v=c*h,x=c*f;e[0]=d+x*a,e[4]=v*a-g,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=g*a-v,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,g=l*f,v=c*h,x=c*f;e[0]=d-x*a,e[4]=-o*f,e[8]=v+g*a,e[1]=g+v*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,g=o*f,v=a*h,x=a*f;e[0]=l*h,e[4]=v*c-g,e[8]=d*c+x,e[1]=l*f,e[5]=x*c+d,e[9]=g*c-v,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,g=o*c,v=a*l,x=a*c;e[0]=l*h,e[4]=x-d*f,e[8]=v*f+g,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=g*f+v,e[10]=d-x*f}else if(t.order==="XZY"){let d=o*l,g=o*c,v=a*l,x=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+x,e[5]=o*h,e[9]=g*f-v,e[2]=v*f-g,e[6]=a*h,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ih,t,sh)}lookAt(t,e,n){let s=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),In.crossVectors(n,ke),In.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),In.crossVectors(n,ke)),In.normalize(),os.crossVectors(ke,In),s[0]=In.x,s[4]=os.x,s[8]=ke.x,s[1]=In.y,s[5]=os.y,s[9]=ke.y,s[2]=In.z,s[6]=os.z,s[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],g=n[13],v=n[2],x=n[6],p=n[10],u=n[14],R=n[3],M=n[7],U=n[11],F=n[15],D=s[0],L=s[4],K=s[8],b=s[12],T=s[1],q=s[5],j=s[9],ht=s[13],O=s[2],W=s[6],Z=s[10],et=s[14],J=s[3],$=s[7],Q=s[11],at=s[15];return r[0]=o*D+a*T+l*O+c*J,r[4]=o*L+a*q+l*W+c*$,r[8]=o*K+a*j+l*Z+c*Q,r[12]=o*b+a*ht+l*et+c*at,r[1]=h*D+f*T+d*O+g*J,r[5]=h*L+f*q+d*W+g*$,r[9]=h*K+f*j+d*Z+g*Q,r[13]=h*b+f*ht+d*et+g*at,r[2]=v*D+x*T+p*O+u*J,r[6]=v*L+x*q+p*W+u*$,r[10]=v*K+x*j+p*Z+u*Q,r[14]=v*b+x*ht+p*et+u*at,r[3]=R*D+M*T+U*O+F*J,r[7]=R*L+M*q+U*W+F*$,r[11]=R*K+M*j+U*Z+F*Q,r[15]=R*b+M*ht+U*et+F*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],g=t[14],v=t[3],x=t[7],p=t[11],u=t[15];return v*(+r*l*f-s*c*f-r*a*d+n*c*d+s*a*g-n*l*g)+x*(+e*l*g-e*c*d+r*o*d-s*o*g+s*c*h-r*l*h)+p*(+e*c*f-e*a*g-r*o*f+n*o*g+r*a*h-n*c*h)+u*(-s*a*h-e*l*f+e*a*d+s*o*f-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],g=t[11],v=t[12],x=t[13],p=t[14],u=t[15],R=f*p*c-x*d*c+x*l*g-a*p*g-f*l*u+a*d*u,M=v*d*c-h*p*c-v*l*g+o*p*g+h*l*u-o*d*u,U=h*x*c-v*f*c+v*a*g-o*x*g-h*a*u+o*f*u,F=v*f*l-h*x*l-v*a*d+o*x*d+h*a*p-o*f*p,D=e*R+n*M+s*U+r*F;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/D;return t[0]=R*L,t[1]=(x*d*r-f*p*r-x*s*g+n*p*g+f*s*u-n*d*u)*L,t[2]=(a*p*r-x*l*r+x*s*c-n*p*c-a*s*u+n*l*u)*L,t[3]=(f*l*r-a*d*r-f*s*c+n*d*c+a*s*g-n*l*g)*L,t[4]=M*L,t[5]=(h*p*r-v*d*r+v*s*g-e*p*g-h*s*u+e*d*u)*L,t[6]=(v*l*r-o*p*r-v*s*c+e*p*c+o*s*u-e*l*u)*L,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*g+e*l*g)*L,t[8]=U*L,t[9]=(v*f*r-h*x*r-v*n*g+e*x*g+h*n*u-e*f*u)*L,t[10]=(o*x*r-v*a*r+v*n*c-e*x*c-o*n*u+e*a*u)*L,t[11]=(h*a*r-o*f*r-h*n*c+e*f*c+o*n*g-e*a*g)*L,t[12]=F*L,t[13]=(h*x*s-v*f*s+v*n*d-e*x*d-h*n*p+e*f*p)*L,t[14]=(v*a*s-o*x*s-v*n*l+e*x*l+o*n*p-e*a*p)*L,t[15]=(o*f*s-h*a*s+h*n*l-e*f*l-o*n*d+e*a*d)*L,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,d=r*c,g=r*h,v=r*f,x=o*h,p=o*f,u=a*f,R=l*c,M=l*h,U=l*f,F=n.x,D=n.y,L=n.z;return s[0]=(1-(x+u))*F,s[1]=(g+U)*F,s[2]=(v-M)*F,s[3]=0,s[4]=(g-U)*D,s[5]=(1-(d+u))*D,s[6]=(p+R)*D,s[7]=0,s[8]=(v+M)*L,s[9]=(p-R)*L,s[10]=(1-(d+x))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=oi.set(s[0],s[1],s[2]).length(),o=oi.set(s[4],s[5],s[6]).length(),a=oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],je.copy(this);let c=1/r,h=1/o,f=1/a;return je.elements[0]*=c,je.elements[1]*=c,je.elements[2]*=c,je.elements[4]*=h,je.elements[5]*=h,je.elements[6]*=h,je.elements[8]*=f,je.elements[9]*=f,je.elements[10]*=f,e.setFromRotationMatrix(je),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Mn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,v;if(a===Mn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Ps)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Mn){let l=this.elements,c=1/(e-t),h=1/(n-s),f=1/(o-r),d=(e+t)*c,g=(n+s)*h,v,x;if(a===Mn)v=(o+r)*f,x=-2*f;else if(a===Ps)v=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},oi=new H,je=new we,ih=new H(0,0,0),sh=new H(1,1,1),In=new H,os=new H,ke=new H,Co=new we,Po=new ln,Ds=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ie(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Co.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Co,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Po.setFromEuler(this),this.setFromQuaternion(Po,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ds.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rh=0,Io=new H,li=new ln,dn=new we,ls=new H,Bi=new H,ah=new H,oh=new ln,Lo=new H(1,0,0),No=new H(0,1,0),Uo=new H(0,0,1),lh={type:"added"},ch={type:"removed"},Ge=class i extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new Ds,n=new ln,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new $t}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.multiply(li),this}rotateOnWorldAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.premultiply(li),this}rotateX(t){return this.rotateOnAxis(Lo,t)}rotateY(t){return this.rotateOnAxis(No,t)}rotateZ(t){return this.rotateOnAxis(Uo,t)}translateOnAxis(t,e){return Io.copy(t).applyQuaternion(this.quaternion),this.position.add(Io.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lo,t)}translateY(t){return this.translateOnAxis(No,t)}translateZ(t){return this.translateOnAxis(Uo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ls.copy(t):ls.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Bi,ls,this.up):dn.lookAt(ls,Bi,this.up),this.quaternion.setFromRotationMatrix(dn),s&&(dn.extractRotation(s.matrixWorld),li.setFromRotationMatrix(dn),this.quaternion.premultiply(li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(lh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ch)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(dn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,ah),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,oh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),d=o(t.skeletons),g=o(t.animations),v=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ge.DEFAULT_UP=new H(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=new H,pn=new H,br=new H,mn=new H,ci=new H,hi=new H,Do=new H,wr=new H,Er=new H,Ar=new H,cs=!1,vi=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),tn.subVectors(t,e),s.cross(tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){tn.subVectors(s,e),pn.subVectors(n,e),br.subVectors(t,e);let o=tn.dot(tn),a=tn.dot(pn),l=tn.dot(br),c=pn.dot(pn),h=pn.dot(br),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;let d=1/f,g=(c*l-a*h)*d,v=(o*h-a*l)*d;return r.set(1-g-v,v,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getUV(t,e,n,s,r,o,a,l){return cs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),cs=!0),this.getInterpolation(t,e,n,s,r,o,a,l)}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mn.x),l.addScaledVector(o,mn.y),l.addScaledVector(a,mn.z),l)}static isFrontFacing(t,e,n,s){return tn.subVectors(n,e),pn.subVectors(t,e),tn.cross(pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),tn.cross(pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return cs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),cs=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ci.subVectors(s,n),hi.subVectors(r,n),wr.subVectors(t,n);let l=ci.dot(wr),c=hi.dot(wr);if(l<=0&&c<=0)return e.copy(n);Er.subVectors(t,s);let h=ci.dot(Er),f=hi.dot(Er);if(h>=0&&f<=h)return e.copy(s);let d=l*f-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ci,o);Ar.subVectors(t,r);let g=ci.dot(Ar),v=hi.dot(Ar);if(v>=0&&g<=v)return e.copy(r);let x=g*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),e.copy(n).addScaledVector(hi,a);let p=h*v-g*f;if(p<=0&&f-h>=0&&g-v>=0)return Do.subVectors(r,s),a=(f-h)/(f-h+(g-v)),e.copy(s).addScaledVector(Do,a);let u=1/(p+x+d);return o=x*u,a=d*u,e.copy(n).addScaledVector(ci,o).addScaledVector(hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},El={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},hs={h:0,s:0,l:0};function Tr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=_e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=le.workingColorSpace){if(t=Jc(t,1),e=Ie(e,0,1),n=Ie(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Tr(o,r,t+1/3),this.g=Tr(o,r,t),this.b=Tr(o,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=_e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=_e){let n=El[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}copyLinearToSRGB(t){return this.r=mr(t.r),this.g=mr(t.g),this.b=mr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=_e){return le.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Ie(Pe.r*255,0,255))*65536+Math.round(Ie(Pe.g*255,0,255))*256+Math.round(Ie(Pe.b*255,0,255))}getHexString(t=_e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(Pe.copy(this),e);let n=Pe.r,s=Pe.g,r=Pe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=_e){le.fromWorkingColorSpace(Pe.copy(this),t);let e=Pe.r,n=Pe.g,s=Pe.b;return t!==_e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(hs);let n=dr(Ln.h,hs.h,e),s=dr(Ln.s,hs.s,e),r=dr(Ln.l,hs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pe=new Qt;Qt.NAMES=El;var hh=0,jn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Si,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fr,this.blendDst=Br,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fr&&(n.blendSrc=this.blendSrc),this.blendDst!==Br&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Fs=class extends jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},yn=uh();function uh(){let i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function fh(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Ie(i,-65504,65504),yn.floatView[0]=i;let t=yn.uint32View[0],e=t>>23&511;return yn.baseTable[e]+((t&8388607)>>yn.shiftTable[e])}function dh(i){let t=i>>10;return yn.uint32View[0]=yn.mantissaTable[yn.offsetTable[t]+(i&1023)]+yn.exponentTable[t],yn.floatView[0]}var Ta={toHalfFloat:fh,fromHalfFloat:dh},ge=new H,us=new ee,Ke=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=So,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ye,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)us.fromBufferAttribute(this,e),us.applyMatrix3(t),this.setXY(e,us.x,us.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==So&&(t.usage=this.usage),t}};var Bs=class extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var zs=class extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var $e=class extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}};var ph=0,qe=new we,Rr=new Ge,ui=new H,He=new Qn,zi=new Qn,Se=new H,zn=class i extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wl(t)?zs:Bs)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return Rr.lookAt(t),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new $e(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];zi.setFromBufferAttribute(a),this.morphTargetsRelative?(Se.addVectors(He.min,zi.min),He.expandByPoint(Se),Se.addVectors(He.max,zi.max),He.expandByPoint(Se)):(He.expandByPoint(zi.min),He.expandByPoint(zi.max))}He.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Se.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Se));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Se.fromBufferAttribute(a,c),l&&(ui.fromBufferAttribute(t,c),Se.add(ui)),s=Math.max(s,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<a;T++)c[T]=new H,h[T]=new H;let f=new H,d=new H,g=new H,v=new ee,x=new ee,p=new ee,u=new H,R=new H;function M(T,q,j){f.fromArray(s,T*3),d.fromArray(s,q*3),g.fromArray(s,j*3),v.fromArray(o,T*2),x.fromArray(o,q*2),p.fromArray(o,j*2),d.sub(f),g.sub(f),x.sub(v),p.sub(v);let ht=1/(x.x*p.y-p.x*x.y);isFinite(ht)&&(u.copy(d).multiplyScalar(p.y).addScaledVector(g,-x.y).multiplyScalar(ht),R.copy(g).multiplyScalar(x.x).addScaledVector(d,-p.x).multiplyScalar(ht),c[T].add(u),c[q].add(u),c[j].add(u),h[T].add(R),h[q].add(R),h[j].add(R))}let U=this.groups;U.length===0&&(U=[{start:0,count:n.length}]);for(let T=0,q=U.length;T<q;++T){let j=U[T],ht=j.start,O=j.count;for(let W=ht,Z=ht+O;W<Z;W+=3)M(n[W+0],n[W+1],n[W+2])}let F=new H,D=new H,L=new H,K=new H;function b(T){L.fromArray(r,T*3),K.copy(L);let q=c[T];F.copy(q),F.sub(L.multiplyScalar(L.dot(q))).normalize(),D.crossVectors(K,q);let ht=D.dot(h[T])<0?-1:1;l[T*4]=F.x,l[T*4+1]=F.y,l[T*4+2]=F.z,l[T*4+3]=ht}for(let T=0,q=U.length;T<q;++T){let j=U[T],ht=j.start,O=j.count;for(let W=ht,Z=ht+O;W<Z;W+=3)b(n[W+0]),b(n[W+1]),b(n[W+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);let s=new H,r=new H,o=new H,a=new H,l=new H,c=new H,h=new H,f=new H;if(t)for(let d=0,g=t.count;d<g;d+=3){let v=t.getX(d+0),x=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,p),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,f=a.normalized,d=new c.constructor(l.length*h),g=0,v=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?g=l[x]*a.data.stride+a.offset:g=l[x]*h;for(let u=0;u<h;u++)d[v++]=c[g++]}return new Ke(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let d=c[h],g=t(d,n);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){let g=c[f];h.push(g.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let d=0,g=f.length;d<g;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Oo=new we,Wn=new Yr,fs=new Vi,Fo=new H,fi=new H,di=new H,pi=new H,Cr=new H,ds=new H,ps=new ee,ms=new ee,gs=new ee,Bo=new H,zo=new H,Go=new H,_s=new H,vs=new H,Ze=class extends Ge{constructor(t=new zn,e=new Fs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ds.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],f=r[l];h!==0&&(Cr.fromBufferAttribute(f,t),o?ds.addScaledVector(Cr,h):ds.addScaledVector(Cr.sub(e),h))}e.add(ds)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fs.copy(n.boundingSphere),fs.applyMatrix4(r),Wn.copy(t.ray).recast(t.near),!(fs.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(fs,Fo)===null||Wn.origin.distanceToSquared(Fo)>(t.far-t.near)**2))&&(Oo.copy(r).invert(),Wn.copy(t.ray).applyMatrix4(Oo),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Wn)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){let p=d[v],u=o[p.materialIndex],R=Math.max(p.start,g.start),M=Math.min(a.count,Math.min(p.start+p.count,g.start+g.count));for(let U=R,F=M;U<F;U+=3){let D=a.getX(U),L=a.getX(U+1),K=a.getX(U+2);s=xs(this,u,t,n,c,h,f,D,L,K),s&&(s.faceIndex=Math.floor(U/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let v=Math.max(0,g.start),x=Math.min(a.count,g.start+g.count);for(let p=v,u=x;p<u;p+=3){let R=a.getX(p),M=a.getX(p+1),U=a.getX(p+2);s=xs(this,o,t,n,c,h,f,R,M,U),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){let p=d[v],u=o[p.materialIndex],R=Math.max(p.start,g.start),M=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let U=R,F=M;U<F;U+=3){let D=U,L=U+1,K=U+2;s=xs(this,u,t,n,c,h,f,D,L,K),s&&(s.faceIndex=Math.floor(U/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let v=Math.max(0,g.start),x=Math.min(l.count,g.start+g.count);for(let p=v,u=x;p<u;p+=3){let R=p,M=p+1,U=p+2;s=xs(this,o,t,n,c,h,f,R,M,U),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function mh(i,t,e,n,s,r,o,a){let l;if(t.side===Be?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Fn,a),l===null)return null;vs.copy(a),vs.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(vs);return c<e.near||c>e.far?null:{distance:c,point:vs.clone(),object:i}}function xs(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,fi),i.getVertexPosition(l,di),i.getVertexPosition(c,pi);let h=mh(i,t,e,n,fi,di,pi,_s);if(h){s&&(ps.fromBufferAttribute(s,a),ms.fromBufferAttribute(s,l),gs.fromBufferAttribute(s,c),h.uv=vi.getInterpolation(_s,fi,di,pi,ps,ms,gs,new ee)),r&&(ps.fromBufferAttribute(r,a),ms.fromBufferAttribute(r,l),gs.fromBufferAttribute(r,c),h.uv1=vi.getInterpolation(_s,fi,di,pi,ps,ms,gs,new ee),h.uv2=h.uv1),o&&(Bo.fromBufferAttribute(o,a),zo.fromBufferAttribute(o,l),Go.fromBufferAttribute(o,c),h.normal=vi.getInterpolation(_s,fi,di,pi,Bo,zo,Go,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new H,materialIndex:0};vi.getNormal(fi,di,pi,f.normal),h.face=f}return h}var Wi=class i extends zn{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],f=[],d=0,g=0;v("z","y","x",-1,-1,n,e,t,o,r,0),v("z","y","x",1,-1,n,e,-t,o,r,1),v("x","z","y",1,1,t,n,e,s,o,2),v("x","z","y",1,-1,t,n,-e,s,o,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(f,2));function v(x,p,u,R,M,U,F,D,L,K,b){let T=U/L,q=F/K,j=U/2,ht=F/2,O=D/2,W=L+1,Z=K+1,et=0,J=0,$=new H;for(let Q=0;Q<Z;Q++){let at=Q*q-ht;for(let ft=0;ft<W;ft++){let Y=ft*T-j;$[x]=Y*R,$[p]=at*M,$[u]=O,c.push($.x,$.y,$.z),$[x]=0,$[p]=0,$[u]=D>0?1:-1,h.push($.x,$.y,$.z),f.push(ft/L),f.push(1-Q/K),et+=1}}for(let Q=0;Q<K;Q++)for(let at=0;at<L;at++){let ft=d+at+W*Q,Y=d+at+W*(Q+1),nt=d+(at+1)+W*(Q+1),vt=d+(at+1)+W*Q;l.push(ft,Y,vt),l.push(Y,nt,vt),J+=6}a.addGroup(g,J,b),g+=J,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ci(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){let t={};for(let e=0;e<i.length;e++){let n=Ci(i[e]);for(let s in n)t[s]=n[s]}return t}function gh(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Al(i){return i.getRenderTarget()===null?i.outputColorSpace:le.workingColorSpace}var _h={clone:Ci,merge:Ne},vh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vh,this.fragmentShader=xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ci(t.uniforms),this.uniformsGroups=gh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Gs=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=Mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ue=class extends Gs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vr*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(fr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},mi=-90,gi=1,Zr=class extends Ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ue(mi,gi,t,e);s.layers=this.layers,this.add(s);let r=new Ue(mi,gi,t,e);r.layers=this.layers,this.add(r);let o=new Ue(mi,gi,t,e);o.layers=this.layers,this.add(o);let a=new Ue(mi,gi,t,e);a.layers=this.layers,this.add(a);let l=new Ue(mi,gi,t,e);l.layers=this.layers,this.add(l);let c=new Ue(mi,gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,d,g),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},ks=class extends We{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ei,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Kr=class extends Sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Gi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Jn?_e:Fe),this.texture=new ks(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ve}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Wi(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Un});r.uniforms.tEquirect.value=e;let o=new Ze(s,r),a=e.minFilter;return e.minFilter===Ti&&(e.minFilter=ve),new Zr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Pr=new H,yh=new H,Mh=new $t,vn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Pr.subVectors(n,e).cross(yh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Pr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Mh.getNormalMatrix(t),s=this.coplanarPoint(Pr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Xn=new Vi,ys=new H,Xi=class{constructor(t=new vn,e=new vn,n=new vn,s=new vn,r=new vn,o=new vn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],f=s[6],d=s[7],g=s[8],v=s[9],x=s[10],p=s[11],u=s[12],R=s[13],M=s[14],U=s[15];if(n[0].setComponents(l-r,d-c,p-g,U-u).normalize(),n[1].setComponents(l+r,d+c,p+g,U+u).normalize(),n[2].setComponents(l+o,d+h,p+v,U+R).normalize(),n[3].setComponents(l-o,d-h,p-v,U-R).normalize(),n[4].setComponents(l-a,d-f,p-x,U-M).normalize(),e===Mn)n[5].setComponents(l+a,d+f,p+x,U+M).normalize();else if(e===Ps)n[5].setComponents(a,f,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(t){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ys.x=s.normal.x>0?t.max.x:t.min.x,ys.y=s.normal.y>0?t.max.y:t.min.y,ys.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ys)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Tl(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Sh(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let f=c.array,d=c.usage,g=f.byteLength,v=i.createBuffer();i.bindBuffer(h,v),i.bufferData(h,f,d),c.onUploadCallback();let x;if(f instanceof Float32Array)x=i.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=i.SHORT;else if(f instanceof Uint32Array)x=i.UNSIGNED_INT;else if(f instanceof Int32Array)x=i.INT;else if(f instanceof Int8Array)x=i.BYTE;else if(f instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:g}}function r(c,h,f){let d=h.array,g=h._updateRange,v=h.updateRanges;if(i.bindBuffer(f,c),g.count===-1&&v.length===0&&i.bufferSubData(f,0,d),v.length!==0){for(let x=0,p=v.length;x<p;x++){let u=v[x];e?i.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):i.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}g.count!==-1&&(e?i.bufferSubData(f,g.offset*d.BYTES_PER_ELEMENT,d,g.offset,g.count):i.bufferSubData(f,g.offset*d.BYTES_PER_ELEMENT,d.subarray(g.offset,g.offset+g.count)),g.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let f=n.get(c);if(f===void 0)n.set(c,s(c,h));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(f.buffer,c,h),f.version=c.version}}return{get:o,remove:a,update:l}}var $r=class i extends zn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,f=t/a,d=e/l,g=[],v=[],x=[],p=[];for(let u=0;u<h;u++){let R=u*d-o;for(let M=0;M<c;M++){let U=M*f-r;v.push(U,-R,0),x.push(0,0,1),p.push(M/a),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let R=0;R<a;R++){let M=R+c*u,U=R+c*(u+1),F=R+1+c*(u+1),D=R+1+c*u;g.push(M,U,D),g.push(U,F,D)}this.setIndex(g),this.setAttribute("position",new $e(v,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ah=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Th=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Rh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ch=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ph=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ih=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Nh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Oh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Fh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,qh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$h=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",tu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,iu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,su=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ru=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,au=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ou=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,du=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_u=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Su=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Eu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Au=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ru=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Pu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Du=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ou=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Bu=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,zu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Gu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ku=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ku=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$u=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ju=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ju=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,af=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ff=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_f=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,If=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ff=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,td=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ed=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:bh,alphahash_pars_fragment:wh,alphamap_fragment:Eh,alphamap_pars_fragment:Ah,alphatest_fragment:Th,alphatest_pars_fragment:Rh,aomap_fragment:Ch,aomap_pars_fragment:Ph,batching_pars_vertex:Ih,batching_vertex:Lh,begin_vertex:Nh,beginnormal_vertex:Uh,bsdfs:Dh,iridescence_fragment:Oh,bumpmap_pars_fragment:Fh,clipping_planes_fragment:Bh,clipping_planes_pars_fragment:zh,clipping_planes_pars_vertex:Gh,clipping_planes_vertex:kh,color_fragment:Hh,color_pars_fragment:Vh,color_pars_vertex:Wh,color_vertex:Xh,common:qh,cube_uv_reflection_fragment:Yh,defaultnormal_vertex:Zh,displacementmap_pars_vertex:Kh,displacementmap_vertex:$h,emissivemap_fragment:Jh,emissivemap_pars_fragment:Qh,colorspace_fragment:jh,colorspace_pars_fragment:tu,envmap_fragment:eu,envmap_common_pars_fragment:nu,envmap_pars_fragment:iu,envmap_pars_vertex:su,envmap_physical_pars_fragment:gu,envmap_vertex:ru,fog_vertex:au,fog_pars_vertex:ou,fog_fragment:lu,fog_pars_fragment:cu,gradientmap_pars_fragment:hu,lightmap_fragment:uu,lightmap_pars_fragment:fu,lights_lambert_fragment:du,lights_lambert_pars_fragment:pu,lights_pars_begin:mu,lights_toon_fragment:_u,lights_toon_pars_fragment:vu,lights_phong_fragment:xu,lights_phong_pars_fragment:yu,lights_physical_fragment:Mu,lights_physical_pars_fragment:Su,lights_fragment_begin:bu,lights_fragment_maps:wu,lights_fragment_end:Eu,logdepthbuf_fragment:Au,logdepthbuf_pars_fragment:Tu,logdepthbuf_pars_vertex:Ru,logdepthbuf_vertex:Cu,map_fragment:Pu,map_pars_fragment:Iu,map_particle_fragment:Lu,map_particle_pars_fragment:Nu,metalnessmap_fragment:Uu,metalnessmap_pars_fragment:Du,morphcolor_vertex:Ou,morphnormal_vertex:Fu,morphtarget_pars_vertex:Bu,morphtarget_vertex:zu,normal_fragment_begin:Gu,normal_fragment_maps:ku,normal_pars_fragment:Hu,normal_pars_vertex:Vu,normal_vertex:Wu,normalmap_pars_fragment:Xu,clearcoat_normal_fragment_begin:qu,clearcoat_normal_fragment_maps:Yu,clearcoat_pars_fragment:Zu,iridescence_pars_fragment:Ku,opaque_fragment:$u,packing:Ju,premultiplied_alpha_fragment:Qu,project_vertex:ju,dithering_fragment:tf,dithering_pars_fragment:ef,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:af,shadowmap_vertex:of,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:hf,skinning_vertex:uf,skinnormal_vertex:ff,specularmap_fragment:df,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:_f,transmission_pars_fragment:vf,uv_pars_fragment:xf,uv_pars_vertex:yf,uv_vertex:Mf,worldpos_vertex:Sf,background_vert:bf,background_frag:wf,backgroundCube_vert:Ef,backgroundCube_frag:Af,cube_vert:Tf,cube_frag:Rf,depth_vert:Cf,depth_frag:Pf,distanceRGBA_vert:If,distanceRGBA_frag:Lf,equirect_vert:Nf,equirect_frag:Uf,linedashed_vert:Df,linedashed_frag:Of,meshbasic_vert:Ff,meshbasic_frag:Bf,meshlambert_vert:zf,meshlambert_frag:Gf,meshmatcap_vert:kf,meshmatcap_frag:Hf,meshnormal_vert:Vf,meshnormal_frag:Wf,meshphong_vert:Xf,meshphong_frag:qf,meshphysical_vert:Yf,meshphysical_frag:Zf,meshtoon_vert:Kf,meshtoon_frag:$f,points_vert:Jf,points_frag:Qf,shadow_vert:jf,shadow_frag:td,sprite_vert:ed,sprite_frag:nd},mt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},an={basic:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ne([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ne([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ne([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ne([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ne([mt.points,mt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ne([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ne([mt.common,mt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ne([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ne([mt.sprite,mt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ne([mt.common,mt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ne([mt.lights,mt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};an.physical={uniforms:Ne([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var Ms={r:0,b:0,g:0};function id(i,t,e,n,s,r,o){let a=new Qt(0),l=r===!0?0:1,c,h,f=null,d=0,g=null;function v(p,u){let R=!1,M=u.isScene===!0?u.background:null;M&&M.isTexture&&(M=(u.backgroundBlurriness>0?e:t).get(M)),M===null?x(a,l):M&&M.isColor&&(x(M,1),R=!0);let U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,o):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||R)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),M&&(M.isCubeTexture||M.mapping===Qs)?(h===void 0&&(h=new Ze(new Wi(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Ci(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,D,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=le.getTransfer(M.colorSpace)!==ue,(f!==M||d!==M.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,f=M,d=M.version,g=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ze(new $r(2,2),new bn({name:"BackgroundMaterial",uniforms:Ci(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=le.getTransfer(M.colorSpace)!==ue,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||d!==M.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,f=M,d=M.version,g=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function x(p,u){p.getRGB(Ms,Al(i)),n.buffers.color.setClear(Ms.r,Ms.g,Ms.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(p,u=1){a.set(p),l=u,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,x(a,l)},render:v}}function sd(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=p(null),c=l,h=!1;function f(O,W,Z,et,J){let $=!1;if(o){let Q=x(et,Z,W);c!==Q&&(c=Q,g(c.object)),$=u(O,et,Z,J),$&&R(O,et,Z,J)}else{let Q=W.wireframe===!0;(c.geometry!==et.id||c.program!==Z.id||c.wireframe!==Q)&&(c.geometry=et.id,c.program=Z.id,c.wireframe=Q,$=!0)}J!==null&&e.update(J,i.ELEMENT_ARRAY_BUFFER),($||h)&&(h=!1,K(O,W,Z,et),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function g(O){return n.isWebGL2?i.bindVertexArray(O):r.bindVertexArrayOES(O)}function v(O){return n.isWebGL2?i.deleteVertexArray(O):r.deleteVertexArrayOES(O)}function x(O,W,Z){let et=Z.wireframe===!0,J=a[O.id];J===void 0&&(J={},a[O.id]=J);let $=J[W.id];$===void 0&&($={},J[W.id]=$);let Q=$[et];return Q===void 0&&(Q=p(d()),$[et]=Q),Q}function p(O){let W=[],Z=[],et=[];for(let J=0;J<s;J++)W[J]=0,Z[J]=0,et[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:Z,attributeDivisors:et,object:O,attributes:{},index:null}}function u(O,W,Z,et){let J=c.attributes,$=W.attributes,Q=0,at=Z.getAttributes();for(let ft in at)if(at[ft].location>=0){let nt=J[ft],vt=$[ft];if(vt===void 0&&(ft==="instanceMatrix"&&O.instanceMatrix&&(vt=O.instanceMatrix),ft==="instanceColor"&&O.instanceColor&&(vt=O.instanceColor)),nt===void 0||nt.attribute!==vt||vt&&nt.data!==vt.data)return!0;Q++}return c.attributesNum!==Q||c.index!==et}function R(O,W,Z,et){let J={},$=W.attributes,Q=0,at=Z.getAttributes();for(let ft in at)if(at[ft].location>=0){let nt=$[ft];nt===void 0&&(ft==="instanceMatrix"&&O.instanceMatrix&&(nt=O.instanceMatrix),ft==="instanceColor"&&O.instanceColor&&(nt=O.instanceColor));let vt={};vt.attribute=nt,nt&&nt.data&&(vt.data=nt.data),J[ft]=vt,Q++}c.attributes=J,c.attributesNum=Q,c.index=et}function M(){let O=c.newAttributes;for(let W=0,Z=O.length;W<Z;W++)O[W]=0}function U(O){F(O,0)}function F(O,W){let Z=c.newAttributes,et=c.enabledAttributes,J=c.attributeDivisors;Z[O]=1,et[O]===0&&(i.enableVertexAttribArray(O),et[O]=1),J[O]!==W&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](O,W),J[O]=W)}function D(){let O=c.newAttributes,W=c.enabledAttributes;for(let Z=0,et=W.length;Z<et;Z++)W[Z]!==O[Z]&&(i.disableVertexAttribArray(Z),W[Z]=0)}function L(O,W,Z,et,J,$,Q){Q===!0?i.vertexAttribIPointer(O,W,Z,J,$):i.vertexAttribPointer(O,W,Z,et,J,$)}function K(O,W,Z,et){if(n.isWebGL2===!1&&(O.isInstancedMesh||et.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;M();let J=et.attributes,$=Z.getAttributes(),Q=W.defaultAttributeValues;for(let at in $){let ft=$[at];if(ft.location>=0){let Y=J[at];if(Y===void 0&&(at==="instanceMatrix"&&O.instanceMatrix&&(Y=O.instanceMatrix),at==="instanceColor"&&O.instanceColor&&(Y=O.instanceColor)),Y!==void 0){let nt=Y.normalized,vt=Y.itemSize,dt=e.get(Y);if(dt===void 0)continue;let St=dt.buffer,It=dt.type,Ht=dt.bytesPerElement,Dt=n.isWebGL2===!0&&(It===i.INT||It===i.UNSIGNED_INT||Y.gpuType===pl);if(Y.isInterleavedBufferAttribute){let Jt=Y.data,k=Jt.stride,Me=Y.offset;if(Jt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<ft.locationSize;Ct++)F(ft.location+Ct,Jt.meshPerAttribute);O.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=Jt.meshPerAttribute*Jt.count)}else for(let Ct=0;Ct<ft.locationSize;Ct++)U(ft.location+Ct);i.bindBuffer(i.ARRAY_BUFFER,St);for(let Ct=0;Ct<ft.locationSize;Ct++)L(ft.location+Ct,vt/ft.locationSize,It,nt,k*Ht,(Me+vt/ft.locationSize*Ct)*Ht,Dt)}else{if(Y.isInstancedBufferAttribute){for(let Jt=0;Jt<ft.locationSize;Jt++)F(ft.location+Jt,Y.meshPerAttribute);O.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Jt=0;Jt<ft.locationSize;Jt++)U(ft.location+Jt);i.bindBuffer(i.ARRAY_BUFFER,St);for(let Jt=0;Jt<ft.locationSize;Jt++)L(ft.location+Jt,vt/ft.locationSize,It,nt,vt*Ht,vt/ft.locationSize*Jt*Ht,Dt)}}else if(Q!==void 0){let nt=Q[at];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(ft.location,nt);break;case 3:i.vertexAttrib3fv(ft.location,nt);break;case 4:i.vertexAttrib4fv(ft.location,nt);break;default:i.vertexAttrib1fv(ft.location,nt)}}}}D()}function b(){j();for(let O in a){let W=a[O];for(let Z in W){let et=W[Z];for(let J in et)v(et[J].object),delete et[J];delete W[Z]}delete a[O]}}function T(O){if(a[O.id]===void 0)return;let W=a[O.id];for(let Z in W){let et=W[Z];for(let J in et)v(et[J].object),delete et[J];delete W[Z]}delete a[O.id]}function q(O){for(let W in a){let Z=a[W];if(Z[O.id]===void 0)continue;let et=Z[O.id];for(let J in et)v(et[J].object),delete et[J];delete Z[O.id]}}function j(){ht(),h=!0,c!==l&&(c=l,g(c.object))}function ht(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:j,resetDefaultState:ht,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:q,initAttributes:M,enableAttribute:U,disableUnusedAttributes:D}}function rd(i,t,e,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,f){i.drawArrays(r,h,f),e.update(f,r,1)}function l(h,f,d){if(d===0)return;let g,v;if(s)g=i,v="drawArraysInstanced";else if(g=t.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[v](r,h,f,d),e.update(f,r,d)}function c(h,f,d){if(d===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<d;v++)this.render(h[v],f[v]);else{g.multiDrawArraysWEBGL(r,h,0,f,0,d);let v=0;for(let x=0;x<d;x++)v+=f[x];e.update(v,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function ad(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let L=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),R=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=d>0,U=o||t.has("OES_texture_float"),F=M&&U,D=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:g,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:R,vertexTextures:M,floatFragmentTextures:U,floatVertexTextures:F,maxSamples:D}}function od(i){let t=this,e=null,n=0,s=!1,r=!1,o=new vn,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let g=f.length!==0||d||n!==0||s;return s=d,n=f.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,g){let v=f.clippingPlanes,x=f.clipIntersection,p=f.clipShadows,u=i.get(f);if(!s||v===null||v.length===0||r&&!p)r?h(null):c();else{let R=r?0:n,M=R*4,U=u.clippingState||null;l.value=U,U=h(v,d,M,g);for(let F=0;F!==M;++F)U[F]=e[F];u.clippingState=U,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=R}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,g,v){let x=f!==null?f.length:0,p=null;if(x!==0){if(p=l.value,v!==!0||p===null){let u=g+x*4,R=d.matrixWorldInverse;a.getNormalMatrix(R),(p===null||p.length<u)&&(p=new Float32Array(u));for(let M=0,U=g;M!==x;++M,U+=4)o.copy(f[M]).applyMatrix4(R,a),o.normal.toArray(p,U),p[U+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function ld(i){let t=new WeakMap;function e(o,a){return a===Hi?o.mapping=Ei:a===zr&&(o.mapping=Ai),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Hi||a===zr)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Kr(l.height/2);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Hs=class extends Gs{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},xi=4,ko=[.125,.215,.35,.446,.526,.582],Zn=20,Ir=new Hs,Ho=new Qt,Lr=null,Nr=0,Ur=0,qn=(1+Math.sqrt(5))/2,_i=1/qn,Vo=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,qn,_i),new H(0,qn,-_i),new H(_i,0,qn),new H(-_i,0,qn),new H(qn,_i,0),new H(-qn,_i,0)],Pi=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Lr=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Lr,Nr,Ur),t.scissorTest=!1,Ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ei||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lr=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ve,minFilter:ve,generateMipmaps:!1,type:on,format:De,colorSpace:ze,depthBuffer:!1},s=Wo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wo(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cd(r)),this._blurMaterial=hd(r,t,e)}return s}_compileMaterial(t){let e=new Ze(this._lodPlanes[0],t);this._renderer.compile(e,Ir)}_sceneToCubeUV(t,e,n,s){let a=new Ue(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Ho),h.toneMapping=Dn,h.autoClear=!1;let g=new Fs({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),v=new Ze(new Wi,g),x=!1,p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,x=!0):(g.color.copy(Ho),x=!0);for(let u=0;u<6;u++){let R=u%3;R===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):R===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));let M=this._cubeSize;Ss(s,R*M,u>2?M:0,M,M),h.setRenderTarget(s),x&&h.render(v,a),h.render(t,a)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ei||t.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xo());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ss(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ir)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Vo[(s-1)%Vo.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new Ze(this._lodPlanes[s],c),d=c.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Zn-1),x=r/v,p=isFinite(r)?1+Math.floor(h*x):Zn;p>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zn}`);let u=[],R=0;for(let L=0;L<Zn;++L){let K=L/x,b=Math.exp(-K*K/2);u.push(b),L===0?R+=b:L<p&&(R+=2*b)}for(let L=0;L<u.length;L++)u[L]=u[L]/R;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=u,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=v,d.mipInt.value=M-n;let U=this._sizeLods[s],F=3*U*(s>M-xi?s-M+xi:0),D=4*(this._cubeSize-U);Ss(e,F,D,3*U,2*U),l.setRenderTarget(e),l.render(f,Ir)}};function cd(i){let t=[],e=[],n=[],s=i,r=i-xi+1+ko.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-xi?l=ko[o-i+xi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,f=1+c,d=[h,h,f,h,f,f,h,h,f,f,h,f],g=6,v=6,x=3,p=2,u=1,R=new Float32Array(x*v*g),M=new Float32Array(p*v*g),U=new Float32Array(u*v*g);for(let D=0;D<g;D++){let L=D%3*2/3-1,K=D>2?0:-1,b=[L,K,0,L+2/3,K,0,L+2/3,K+1,0,L,K,0,L+2/3,K+1,0,L,K+1,0];R.set(b,x*v*D),M.set(d,p*v*D);let T=[D,D,D,D,D,D];U.set(T,u*v*D)}let F=new zn;F.setAttribute("position",new Ke(R,x)),F.setAttribute("uv",new Ke(M,p)),F.setAttribute("faceIndex",new Ke(U,u)),t.push(F),s>xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wo(i,t,e){let n=new Sn(i,t,e);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function hd(i,t,e){let n=new Float32Array(Zn),s=new H(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Xo(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function qo(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ud(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Hi||l===zr,h=l===Ei||l===Ai;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=t.get(a);return e===null&&(e=new Pi(i)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),t.set(a,f),f.texture}else{if(t.has(a))return t.get(a).texture;{let f=a.image;if(c&&f&&f.height>0||h&&f&&s(f)){e===null&&(e=new Pi(i));let d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function fd(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dd(i,t,e,n){let s={},r=new WeakMap;function o(f){let d=f.target;d.index!==null&&t.remove(d.index);for(let v in d.attributes)t.remove(d.attributes[v]);for(let v in d.morphAttributes){let x=d.morphAttributes[v];for(let p=0,u=x.length;p<u;p++)t.remove(x[p])}d.removeEventListener("dispose",o),delete s[d.id];let g=r.get(d);g&&(t.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(f){let d=f.attributes;for(let v in d)t.update(d[v],i.ARRAY_BUFFER);let g=f.morphAttributes;for(let v in g){let x=g[v];for(let p=0,u=x.length;p<u;p++)t.update(x[p],i.ARRAY_BUFFER)}}function c(f){let d=[],g=f.index,v=f.attributes.position,x=0;if(g!==null){let R=g.array;x=g.version;for(let M=0,U=R.length;M<U;M+=3){let F=R[M+0],D=R[M+1],L=R[M+2];d.push(F,D,D,L,L,F)}}else if(v!==void 0){let R=v.array;x=v.version;for(let M=0,U=R.length/3-1;M<U;M+=3){let F=M+0,D=M+1,L=M+2;d.push(F,D,D,L,L,F)}}else return;let p=new(wl(d)?zs:Bs)(d,1);p.version=x;let u=r.get(f);u&&t.remove(u),r.set(f,p)}function h(f){let d=r.get(f);if(d){let g=f.index;g!==null&&d.version<g.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function pd(i,t,e,n){let s=n.isWebGL2,r;function o(g){r=g}let a,l;function c(g){a=g.type,l=g.bytesPerElement}function h(g,v){i.drawElements(r,v,a,g*l),e.update(v,r,1)}function f(g,v,x){if(x===0)return;let p,u;if(s)p=i,u="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](r,v,a,g*l,x),e.update(v,r,x)}function d(g,v,x){if(x===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<x;u++)this.render(g[u]/l,v[u]);else{p.multiDrawElementsWEBGL(r,v,0,a,g,0,x);let u=0;for(let R=0;R<x;R++)u+=v[R];e.update(u,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function md(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function gd(i,t){return i[0]-t[0]}function _d(i,t){return Math.abs(t[1])-Math.abs(i[1])}function vd(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,o=new be,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,f){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=g!==void 0?g.length:0,x=r.get(h);if(x===void 0||x.count!==v){let O=function(){j.dispose(),r.delete(h),h.removeEventListener("dispose",O)};x!==void 0&&x.texture.dispose();let R=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,U=h.morphAttributes.color!==void 0,F=h.morphAttributes.position||[],D=h.morphAttributes.normal||[],L=h.morphAttributes.color||[],K=0;R===!0&&(K=1),M===!0&&(K=2),U===!0&&(K=3);let b=h.attributes.position.count*K,T=1;b>t.maxTextureSize&&(T=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let q=new Float32Array(b*T*4*v),j=new Us(q,b,T,v);j.type=Ye,j.needsUpdate=!0;let ht=K*4;for(let W=0;W<v;W++){let Z=F[W],et=D[W],J=L[W],$=b*T*4*W;for(let Q=0;Q<Z.count;Q++){let at=Q*ht;R===!0&&(o.fromBufferAttribute(Z,Q),q[$+at+0]=o.x,q[$+at+1]=o.y,q[$+at+2]=o.z,q[$+at+3]=0),M===!0&&(o.fromBufferAttribute(et,Q),q[$+at+4]=o.x,q[$+at+5]=o.y,q[$+at+6]=o.z,q[$+at+7]=0),U===!0&&(o.fromBufferAttribute(J,Q),q[$+at+8]=o.x,q[$+at+9]=o.y,q[$+at+10]=o.z,q[$+at+11]=J.itemSize===4?o.w:1)}}x={count:v,texture:j,size:new ee(b,T)},r.set(h,x),h.addEventListener("dispose",O)}let p=0;for(let R=0;R<d.length;R++)p+=d[R];let u=h.morphTargetsRelative?1:1-p;f.getUniforms().setValue(i,"morphTargetBaseInfluence",u),f.getUniforms().setValue(i,"morphTargetInfluences",d),f.getUniforms().setValue(i,"morphTargetsTexture",x.texture,e),f.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let g=d===void 0?0:d.length,v=n[h.id];if(v===void 0||v.length!==g){v=[];for(let M=0;M<g;M++)v[M]=[M,0];n[h.id]=v}for(let M=0;M<g;M++){let U=v[M];U[0]=M,U[1]=d[M]}v.sort(_d);for(let M=0;M<8;M++)M<g&&v[M][1]?(a[M][0]=v[M][0],a[M][1]=v[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(gd);let x=h.morphAttributes.position,p=h.morphAttributes.normal,u=0;for(let M=0;M<8;M++){let U=a[M],F=U[0],D=U[1];F!==Number.MAX_SAFE_INTEGER&&D?(x&&h.getAttribute("morphTarget"+M)!==x[F]&&h.setAttribute("morphTarget"+M,x[F]),p&&h.getAttribute("morphNormal"+M)!==p[F]&&h.setAttribute("morphNormal"+M,p[F]),s[M]=D,u+=D):(x&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),p&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),s[M]=0)}let R=h.morphTargetsRelative?1:1-u;f.getUniforms().setValue(i,"morphTargetBaseInfluence",R),f.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function xd(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return f}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Vs=class extends We{constructor(t,e,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:$n,h!==$n&&h!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===$n&&(n=Nn),n===void 0&&h===Ri&&(n=Kn),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Re,this.minFilter=l!==void 0?l:Re,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Rl=new We,Cl=new Vs(1,1);Cl.compareFunction=bl;var Pl=new Us,Il=new qr,Ll=new ks,Yo=[],Zo=[],Ko=new Float32Array(16),$o=new Float32Array(9),Jo=new Float32Array(4);function Li(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Yo[s];if(r===void 0&&(r=new Float32Array(s),Yo[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function tr(i,t){let e=Zo[t];e===void 0&&(e=new Int32Array(t),Zo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function yd(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Md(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function Sd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function bd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function wd(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Jo.set(n),i.uniformMatrix2fv(this.addr,!1,Jo),ye(e,n)}}function Ed(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;$o.set(n),i.uniformMatrix3fv(this.addr,!1,$o),ye(e,n)}}function Ad(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Ko.set(n),i.uniformMatrix4fv(this.addr,!1,Ko),ye(e,n)}}function Td(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Rd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function Cd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function Pd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function Id(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ld(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function Nd(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function Ud(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function Dd(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Cl:Rl;e.setTexture2D(t||r,s)}function Od(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Il,s)}function Fd(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ll,s)}function Bd(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Pl,s)}function zd(i){switch(i){case 5126:return yd;case 35664:return Md;case 35665:return Sd;case 35666:return bd;case 35674:return wd;case 35675:return Ed;case 35676:return Ad;case 5124:case 35670:return Td;case 35667:case 35671:return Rd;case 35668:case 35672:return Cd;case 35669:case 35673:return Pd;case 5125:return Id;case 36294:return Ld;case 36295:return Nd;case 36296:return Ud;case 35678:case 36198:case 36298:case 36306:case 35682:return Dd;case 35679:case 36299:case 36307:return Od;case 35680:case 36300:case 36308:case 36293:return Fd;case 36289:case 36303:case 36311:case 36292:return Bd}}function Gd(i,t){i.uniform1fv(this.addr,t)}function kd(i,t){let e=Li(t,this.size,2);i.uniform2fv(this.addr,e)}function Hd(i,t){let e=Li(t,this.size,3);i.uniform3fv(this.addr,e)}function Vd(i,t){let e=Li(t,this.size,4);i.uniform4fv(this.addr,e)}function Wd(i,t){let e=Li(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Xd(i,t){let e=Li(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function qd(i,t){let e=Li(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yd(i,t){i.uniform1iv(this.addr,t)}function Zd(i,t){i.uniform2iv(this.addr,t)}function Kd(i,t){i.uniform3iv(this.addr,t)}function $d(i,t){i.uniform4iv(this.addr,t)}function Jd(i,t){i.uniform1uiv(this.addr,t)}function Qd(i,t){i.uniform2uiv(this.addr,t)}function jd(i,t){i.uniform3uiv(this.addr,t)}function tp(i,t){i.uniform4uiv(this.addr,t)}function ep(i,t,e){let n=this.cache,s=t.length,r=tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Rl,r[o])}function np(i,t,e){let n=this.cache,s=t.length,r=tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Il,r[o])}function ip(i,t,e){let n=this.cache,s=t.length,r=tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ll,r[o])}function sp(i,t,e){let n=this.cache,s=t.length,r=tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Pl,r[o])}function rp(i){switch(i){case 5126:return Gd;case 35664:return kd;case 35665:return Hd;case 35666:return Vd;case 35674:return Wd;case 35675:return Xd;case 35676:return qd;case 5124:case 35670:return Yd;case 35667:case 35671:return Zd;case 35668:case 35672:return Kd;case 35669:case 35673:return $d;case 5125:return Jd;case 36294:return Qd;case 36295:return jd;case 36296:return tp;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return sp}}var Jr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zd(e.type)}},Qr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rp(e.type)}},jr=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Dr=/(\w+)(\])?(\[|\.)?/g;function Qo(i,t){i.seq.push(t),i.map[t.id]=t}function ap(i,t,e){let n=i.name,s=n.length;for(Dr.lastIndex=0;;){let r=Dr.exec(n),o=Dr.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Qo(e,c===void 0?new Jr(a,i,t):new Qr(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new jr(a),Qo(e,f)),e=f}}}var wi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);ap(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function jo(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var op=37297,lp=0;function cp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function hp(i){let t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(i),n;switch(t===e?n="":t===Cs&&e===Rs?n="LinearDisplayP3ToLinearSRGB":t===Rs&&e===Cs&&(n="LinearSRGBToLinearDisplayP3"),i){case ze:case js:return[n,"LinearTransferOETF"];case _e:case Aa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function tl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+cp(i.getShaderSource(t),o)}else return s}function up(i,t){let e=hp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function fp(i,t){let e;switch(t){case Rc:e="Linear";break;case Cc:e="Reinhard";break;case Pc:e="OptimizedCineon";break;case ba:e="ACESFilmic";break;case Lc:e="AgX";break;case Ic:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function dp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(yi).join(`
`)}function pp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(yi).join(`
`)}function mp(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function gp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function yi(i){return i!==""}function el(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _p=/^[ \t]*#include +<([\w\d./]+)>/gm;function ta(i){return i.replace(_p,xp)}var vp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function xp(i,t){let e=Yt[t];if(e===void 0){let n=vp.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ta(e)}var yp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(i){return i.replace(yp,Mp)}function Mp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sl(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Sp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ul?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===nc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function bp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ei:case Ai:t="ENVMAP_TYPE_CUBE";break;case Qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ai:t="ENVMAP_MODE_REFRACTION";break}return t}function Ep(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fl:t="ENVMAP_BLENDING_MULTIPLY";break;case Ac:t="ENVMAP_BLENDING_MIX";break;case Tc:t="ENVMAP_BLENDING_ADD";break}return t}function Ap(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Tp(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Sp(e),c=bp(e),h=wp(e),f=Ep(e),d=Ap(e),g=e.isWebGL2?"":dp(e),v=pp(e),x=mp(r),p=s.createProgram(),u,R,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(yi).join(`
`),u.length>0&&(u+=`
`),R=[g,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(yi).join(`
`),R.length>0&&(R+=`
`)):(u=[sl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yi).join(`
`),R=[g,sl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,up("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(yi).join(`
`)),o=ta(o),o=el(o,e),o=nl(o,e),a=ta(a),a=el(a,e),a=nl(a,e),o=il(o),a=il(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,u=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,R=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+R);let U=M+u+o,F=M+R+a,D=jo(s,s.VERTEX_SHADER,U),L=jo(s,s.FRAGMENT_SHADER,F);s.attachShader(p,D),s.attachShader(p,L),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function K(j){if(i.debug.checkShaderErrors){let ht=s.getProgramInfoLog(p).trim(),O=s.getShaderInfoLog(D).trim(),W=s.getShaderInfoLog(L).trim(),Z=!0,et=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,D,L);else{let J=tl(s,D,"vertex"),$=tl(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+ht+`
`+J+`
`+$)}else ht!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ht):(O===""||W==="")&&(et=!1);et&&(j.diagnostics={runnable:Z,programLog:ht,vertexShader:{log:O,prefix:u},fragmentShader:{log:W,prefix:R}})}s.deleteShader(D),s.deleteShader(L),b=new wi(s,p),T=gp(s,p)}let b;this.getUniforms=function(){return b===void 0&&K(this),b};let T;this.getAttributes=function(){return T===void 0&&K(this),T};let q=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=s.getProgramParameter(p,op)),q},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lp++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=D,this.fragmentShader=L,this}var Rp=0,ea=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new na(t),e.set(t,n)),n}},na=class{constructor(t){this.id=Rp++,this.code=t,this.usedTimes=0}};function Cp(i,t,e,n,s,r,o){let a=new Os,l=new ea,c=[],h=s.isWebGL2,f=s.logarithmicDepthBuffer,d=s.vertexTextures,g=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return b===0?"uv":`uv${b}`}function p(b,T,q,j,ht){let O=j.fog,W=ht.geometry,Z=b.isMeshStandardMaterial?j.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||Z),J=et&&et.mapping===Qs?et.image.height:null,$=v[b.type];b.precision!==null&&(g=s.getMaxPrecision(b.precision),g!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));let Q=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,at=Q!==void 0?Q.length:0,ft=0;W.morphAttributes.position!==void 0&&(ft=1),W.morphAttributes.normal!==void 0&&(ft=2),W.morphAttributes.color!==void 0&&(ft=3);let Y,nt,vt,dt;if($){let Ee=an[$];Y=Ee.vertexShader,nt=Ee.fragmentShader}else Y=b.vertexShader,nt=b.fragmentShader,l.update(b),vt=l.getVertexShaderID(b),dt=l.getFragmentShaderID(b);let St=i.getRenderTarget(),It=ht.isInstancedMesh===!0,Ht=ht.isBatchedMesh===!0,Dt=!!b.map,Jt=!!b.matcap,k=!!et,Me=!!b.aoMap,Ct=!!b.lightMap,Bt=!!b.bumpMap,At=!!b.normalMap,he=!!b.displacementMap,Wt=!!b.emissiveMap,E=!!b.metalnessMap,y=!!b.roughnessMap,V=b.anisotropy>0,ot=b.clearcoat>0,st=b.iridescence>0,lt=b.sheen>0,Et=b.transmission>0,xt=V&&!!b.anisotropyMap,wt=ot&&!!b.clearcoatMap,Nt=ot&&!!b.clearcoatNormalMap,Gt=ot&&!!b.clearcoatRoughnessMap,rt=st&&!!b.iridescenceMap,ie=st&&!!b.iridescenceThicknessMap,Zt=lt&&!!b.sheenColorMap,Ut=lt&&!!b.sheenRoughnessMap,Mt=!!b.specularMap,bt=!!b.specularColorMap,Ft=!!b.specularIntensityMap,Vt=Et&&!!b.transmissionMap,Kt=Et&&!!b.thicknessMap,Xt=!!b.gradientMap,G=!!b.alphaMap,N=b.alphaTest>0,gt=!!b.alphaHash,_t=!!b.extensions,Ot=!!W.attributes.uv1,Lt=!!W.attributes.uv2,re=!!W.attributes.uv3,ae=Dn;return b.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ae=i.toneMapping),{isWebGL2:h,shaderID:$,shaderType:b.type,shaderName:b.name,vertexShader:Y,fragmentShader:nt,defines:b.defines,customVertexShaderID:vt,customFragmentShaderID:dt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Ht,instancing:It,instancingColor:It&&ht.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:St===null?i.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:ze,map:Dt,matcap:Jt,envMap:k,envMapMode:k&&et.mapping,envMapCubeUVHeight:J,aoMap:Me,lightMap:Ct,bumpMap:Bt,normalMap:At,displacementMap:d&&he,emissiveMap:Wt,normalMapObjectSpace:At&&b.normalMapType===Vc,normalMapTangentSpace:At&&b.normalMapType===Sl,metalnessMap:E,roughnessMap:y,anisotropy:V,anisotropyMap:xt,clearcoat:ot,clearcoatMap:wt,clearcoatNormalMap:Nt,clearcoatRoughnessMap:Gt,iridescence:st,iridescenceMap:rt,iridescenceThicknessMap:ie,sheen:lt,sheenColorMap:Zt,sheenRoughnessMap:Ut,specularMap:Mt,specularColorMap:bt,specularIntensityMap:Ft,transmission:Et,transmissionMap:Vt,thicknessMap:Kt,gradientMap:Xt,opaque:b.transparent===!1&&b.blending===Si,alphaMap:G,alphaTest:N,alphaHash:gt,combine:b.combine,mapUv:Dt&&x(b.map.channel),aoMapUv:Me&&x(b.aoMap.channel),lightMapUv:Ct&&x(b.lightMap.channel),bumpMapUv:Bt&&x(b.bumpMap.channel),normalMapUv:At&&x(b.normalMap.channel),displacementMapUv:he&&x(b.displacementMap.channel),emissiveMapUv:Wt&&x(b.emissiveMap.channel),metalnessMapUv:E&&x(b.metalnessMap.channel),roughnessMapUv:y&&x(b.roughnessMap.channel),anisotropyMapUv:xt&&x(b.anisotropyMap.channel),clearcoatMapUv:wt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Gt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&x(b.sheenRoughnessMap.channel),specularMapUv:Mt&&x(b.specularMap.channel),specularColorMapUv:bt&&x(b.specularColorMap.channel),specularIntensityMapUv:Ft&&x(b.specularIntensityMap.channel),transmissionMapUv:Vt&&x(b.transmissionMap.channel),thicknessMapUv:Kt&&x(b.thicknessMap.channel),alphaMapUv:G&&x(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(At||V),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,vertexUv1s:Ot,vertexUv2s:Lt,vertexUv3s:re,pointsUvs:ht.isPoints===!0&&!!W.attributes.uv&&(Dt||G),fog:!!O,useFog:b.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ht.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ft,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&q.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Dt&&b.map.isVideoTexture===!0&&le.getTransfer(b.map.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===xn,flipSided:b.side===Be,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:_t&&b.extensions.derivatives===!0,extensionFragDepth:_t&&b.extensions.fragDepth===!0,extensionDrawBuffers:_t&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:_t&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_t&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function u(b){let T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(let q in b.defines)T.push(q),T.push(b.defines[q]);return b.isRawShaderMaterial===!1&&(R(T,b),M(T,b),T.push(i.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function R(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function M(b,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function U(b){let T=v[b.type],q;if(T){let j=an[T];q=_h.clone(j.uniforms)}else q=b.uniforms;return q}function F(b,T){let q;for(let j=0,ht=c.length;j<ht;j++){let O=c[j];if(O.cacheKey===T){q=O,++q.usedTimes;break}}return q===void 0&&(q=new Tp(i,T,b,r),c.push(q)),q}function D(b){if(--b.usedTimes===0){let T=c.indexOf(b);c[T]=c[c.length-1],c.pop(),b.destroy()}}function L(b){l.remove(b)}function K(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:U,acquireProgram:F,releaseProgram:D,releaseShaderCache:L,programs:c,dispose:K}}function Pp(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Ip(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function rl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function al(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,d,g,v,x,p){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:d,material:g,groupOrder:v,renderOrder:f.renderOrder,z:x,group:p},i[t]=u):(u.id=f.id,u.object=f,u.geometry=d,u.material=g,u.groupOrder=v,u.renderOrder=f.renderOrder,u.z=x,u.group=p),t++,u}function a(f,d,g,v,x,p){let u=o(f,d,g,v,x,p);g.transmission>0?n.push(u):g.transparent===!0?s.push(u):e.push(u)}function l(f,d,g,v,x,p){let u=o(f,d,g,v,x,p);g.transmission>0?n.unshift(u):g.transparent===!0?s.unshift(u):e.unshift(u)}function c(f,d){e.length>1&&e.sort(f||Ip),n.length>1&&n.sort(d||rl),s.length>1&&s.sort(d||rl)}function h(){for(let f=t,d=i.length;f<d;f++){let g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Lp(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new al,i.set(n,[o])):s>=r.length?(o=new al,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Np(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new Qt};break;case"SpotLight":e={position:new H,direction:new H,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function Up(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Dp=0;function Op(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Fp(i,t){let e=new Np,n=Up(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new H);let r=new H,o=new we,a=new we;function l(h,f){let d=0,g=0,v=0;for(let j=0;j<9;j++)s.probe[j].set(0,0,0);let x=0,p=0,u=0,R=0,M=0,U=0,F=0,D=0,L=0,K=0,b=0;h.sort(Op);let T=f===!0?Math.PI:1;for(let j=0,ht=h.length;j<ht;j++){let O=h[j],W=O.color,Z=O.intensity,et=O.distance,J=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=W.r*Z*T,g+=W.g*Z*T,v+=W.b*Z*T;else if(O.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(O.sh.coefficients[$],Z);b++}else if(O.isDirectionalLight){let $=e.get(O);if($.color.copy(O.color).multiplyScalar(O.intensity*T),O.castShadow){let Q=O.shadow,at=n.get(O);at.shadowBias=Q.bias,at.shadowNormalBias=Q.normalBias,at.shadowRadius=Q.radius,at.shadowMapSize=Q.mapSize,s.directionalShadow[x]=at,s.directionalShadowMap[x]=J,s.directionalShadowMatrix[x]=O.shadow.matrix,U++}s.directional[x]=$,x++}else if(O.isSpotLight){let $=e.get(O);$.position.setFromMatrixPosition(O.matrixWorld),$.color.copy(W).multiplyScalar(Z*T),$.distance=et,$.coneCos=Math.cos(O.angle),$.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),$.decay=O.decay,s.spot[u]=$;let Q=O.shadow;if(O.map&&(s.spotLightMap[L]=O.map,L++,Q.updateMatrices(O),O.castShadow&&K++),s.spotLightMatrix[u]=Q.matrix,O.castShadow){let at=n.get(O);at.shadowBias=Q.bias,at.shadowNormalBias=Q.normalBias,at.shadowRadius=Q.radius,at.shadowMapSize=Q.mapSize,s.spotShadow[u]=at,s.spotShadowMap[u]=J,D++}u++}else if(O.isRectAreaLight){let $=e.get(O);$.color.copy(W).multiplyScalar(Z),$.halfWidth.set(O.width*.5,0,0),$.halfHeight.set(0,O.height*.5,0),s.rectArea[R]=$,R++}else if(O.isPointLight){let $=e.get(O);if($.color.copy(O.color).multiplyScalar(O.intensity*T),$.distance=O.distance,$.decay=O.decay,O.castShadow){let Q=O.shadow,at=n.get(O);at.shadowBias=Q.bias,at.shadowNormalBias=Q.normalBias,at.shadowRadius=Q.radius,at.shadowMapSize=Q.mapSize,at.shadowCameraNear=Q.camera.near,at.shadowCameraFar=Q.camera.far,s.pointShadow[p]=at,s.pointShadowMap[p]=J,s.pointShadowMatrix[p]=O.shadow.matrix,F++}s.point[p]=$,p++}else if(O.isHemisphereLight){let $=e.get(O);$.skyColor.copy(O.color).multiplyScalar(Z*T),$.groundColor.copy(O.groundColor).multiplyScalar(Z*T),s.hemi[M]=$,M++}}R>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=mt.LTC_FLOAT_1,s.rectAreaLTC2=mt.LTC_FLOAT_2):(s.rectAreaLTC1=mt.LTC_HALF_1,s.rectAreaLTC2=mt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=mt.LTC_FLOAT_1,s.rectAreaLTC2=mt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=mt.LTC_HALF_1,s.rectAreaLTC2=mt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=g,s.ambient[2]=v;let q=s.hash;(q.directionalLength!==x||q.pointLength!==p||q.spotLength!==u||q.rectAreaLength!==R||q.hemiLength!==M||q.numDirectionalShadows!==U||q.numPointShadows!==F||q.numSpotShadows!==D||q.numSpotMaps!==L||q.numLightProbes!==b)&&(s.directional.length=x,s.spot.length=u,s.rectArea.length=R,s.point.length=p,s.hemi.length=M,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.pointShadow.length=F,s.pointShadowMap.length=F,s.spotShadow.length=D,s.spotShadowMap.length=D,s.directionalShadowMatrix.length=U,s.pointShadowMatrix.length=F,s.spotLightMatrix.length=D+L-K,s.spotLightMap.length=L,s.numSpotLightShadowsWithMaps=K,s.numLightProbes=b,q.directionalLength=x,q.pointLength=p,q.spotLength=u,q.rectAreaLength=R,q.hemiLength=M,q.numDirectionalShadows=U,q.numPointShadows=F,q.numSpotShadows=D,q.numSpotMaps=L,q.numLightProbes=b,s.version=Dp++)}function c(h,f){let d=0,g=0,v=0,x=0,p=0,u=f.matrixWorldInverse;for(let R=0,M=h.length;R<M;R++){let U=h[R];if(U.isDirectionalLight){let F=s.directional[d];F.direction.setFromMatrixPosition(U.matrixWorld),r.setFromMatrixPosition(U.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(u),d++}else if(U.isSpotLight){let F=s.spot[v];F.position.setFromMatrixPosition(U.matrixWorld),F.position.applyMatrix4(u),F.direction.setFromMatrixPosition(U.matrixWorld),r.setFromMatrixPosition(U.target.matrixWorld),F.direction.sub(r),F.direction.transformDirection(u),v++}else if(U.isRectAreaLight){let F=s.rectArea[x];F.position.setFromMatrixPosition(U.matrixWorld),F.position.applyMatrix4(u),a.identity(),o.copy(U.matrixWorld),o.premultiply(u),a.extractRotation(o),F.halfWidth.set(U.width*.5,0,0),F.halfHeight.set(0,U.height*.5,0),F.halfWidth.applyMatrix4(a),F.halfHeight.applyMatrix4(a),x++}else if(U.isPointLight){let F=s.point[g];F.position.setFromMatrixPosition(U.matrixWorld),F.position.applyMatrix4(u),g++}else if(U.isHemisphereLight){let F=s.hemi[p];F.direction.setFromMatrixPosition(U.matrixWorld),F.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:s}}function ol(i,t){let e=new Fp(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function o(f){n.push(f)}function a(f){s.push(f)}function l(f){e.setup(n,f)}function c(f){e.setupView(n,f)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Bp(i,t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),l;return a===void 0?(l=new ol(i,t),e.set(r,[l])):o>=a.length?(l=new ol(i,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var ia=class extends jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},sa=class extends jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},zp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kp(i,t,e){let n=new Xi,s=new ee,r=new ee,o=new be,a=new ia({depthPacking:Hc}),l=new sa,c={},h=e.maxTextureSize,f={[Fn]:Be,[Be]:Fn,[xn]:xn},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:zp,fragmentShader:Gp}),g=d.clone();g.defines.HORIZONTAL_PASS=1;let v=new zn;v.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ze(v,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ul;let u=this.type;this.render=function(D,L,K){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||D.length===0)return;let b=i.getRenderTarget(),T=i.getActiveCubeFace(),q=i.getActiveMipmapLevel(),j=i.state;j.setBlending(Un),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);let ht=u!==_n&&this.type===_n,O=u===_n&&this.type!==_n;for(let W=0,Z=D.length;W<Z;W++){let et=D[W],J=et.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let $=J.getFrameExtents();if(s.multiply($),r.copy(J.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,J.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,J.mapSize.y=r.y)),J.map===null||ht===!0||O===!0){let at=this.type!==_n?{minFilter:Re,magFilter:Re}:{};J.map!==null&&J.map.dispose(),J.map=new Sn(s.x,s.y,at),J.map.texture.name=et.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();let Q=J.getViewportCount();for(let at=0;at<Q;at++){let ft=J.getViewport(at);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),j.viewport(o),J.updateMatrices(et,at),n=J.getFrustum(),U(L,K,J.camera,et,this.type)}J.isPointLightShadow!==!0&&this.type===_n&&R(J,K),J.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(b,T,q)};function R(D,L){let K=t.update(x);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,g.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Sn(s.x,s.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,i.setRenderTarget(D.mapPass),i.clear(),i.renderBufferDirect(L,null,K,d,x,null),g.uniforms.shadow_pass.value=D.mapPass.texture,g.uniforms.resolution.value=D.mapSize,g.uniforms.radius.value=D.radius,i.setRenderTarget(D.map),i.clear(),i.renderBufferDirect(L,null,K,g,x,null)}function M(D,L,K,b){let T=null,q=K.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(q!==void 0)T=q;else if(T=K.isPointLight===!0?l:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){let j=T.uuid,ht=L.uuid,O=c[j];O===void 0&&(O={},c[j]=O);let W=O[ht];W===void 0&&(W=T.clone(),O[ht]=W,L.addEventListener("dispose",F)),T=W}if(T.visible=L.visible,T.wireframe=L.wireframe,b===_n?T.side=L.shadowSide!==null?L.shadowSide:L.side:T.side=L.shadowSide!==null?L.shadowSide:f[L.side],T.alphaMap=L.alphaMap,T.alphaTest=L.alphaTest,T.map=L.map,T.clipShadows=L.clipShadows,T.clippingPlanes=L.clippingPlanes,T.clipIntersection=L.clipIntersection,T.displacementMap=L.displacementMap,T.displacementScale=L.displacementScale,T.displacementBias=L.displacementBias,T.wireframeLinewidth=L.wireframeLinewidth,T.linewidth=L.linewidth,K.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let j=i.properties.get(T);j.light=K}return T}function U(D,L,K,b,T){if(D.visible===!1)return;if(D.layers.test(L.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&T===_n)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,D.matrixWorld);let ht=t.update(D),O=D.material;if(Array.isArray(O)){let W=ht.groups;for(let Z=0,et=W.length;Z<et;Z++){let J=W[Z],$=O[J.materialIndex];if($&&$.visible){let Q=M(D,$,b,T);D.onBeforeShadow(i,D,L,K,ht,Q,J),i.renderBufferDirect(K,null,ht,Q,D,J),D.onAfterShadow(i,D,L,K,ht,Q,J)}}}else if(O.visible){let W=M(D,O,b,T);D.onBeforeShadow(i,D,L,K,ht,W,null),i.renderBufferDirect(K,null,ht,W,D,null),D.onAfterShadow(i,D,L,K,ht,W,null)}}let j=D.children;for(let ht=0,O=j.length;ht<O;ht++)U(j[ht],L,K,b,T)}function F(D){D.target.removeEventListener("dispose",F);for(let K in c){let b=c[K],T=D.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}function Hp(i,t,e){let n=e.isWebGL2;function s(){let N=!1,gt=new be,_t=null,Ot=new be(0,0,0,0);return{setMask:function(Lt){_t!==Lt&&!N&&(i.colorMask(Lt,Lt,Lt,Lt),_t=Lt)},setLocked:function(Lt){N=Lt},setClear:function(Lt,re,ae,me,Ee){Ee===!0&&(Lt*=me,re*=me,ae*=me),gt.set(Lt,re,ae,me),Ot.equals(gt)===!1&&(i.clearColor(Lt,re,ae,me),Ot.copy(gt))},reset:function(){N=!1,_t=null,Ot.set(-1,0,0,0)}}}function r(){let N=!1,gt=null,_t=null,Ot=null;return{setTest:function(Lt){Lt?Ht(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(Lt){gt!==Lt&&!N&&(i.depthMask(Lt),gt=Lt)},setFunc:function(Lt){if(_t!==Lt){switch(Lt){case xc:i.depthFunc(i.NEVER);break;case yc:i.depthFunc(i.ALWAYS);break;case Mc:i.depthFunc(i.LESS);break;case ws:i.depthFunc(i.LEQUAL);break;case Sc:i.depthFunc(i.EQUAL);break;case bc:i.depthFunc(i.GEQUAL);break;case wc:i.depthFunc(i.GREATER);break;case Ec:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_t=Lt}},setLocked:function(Lt){N=Lt},setClear:function(Lt){Ot!==Lt&&(i.clearDepth(Lt),Ot=Lt)},reset:function(){N=!1,gt=null,_t=null,Ot=null}}}function o(){let N=!1,gt=null,_t=null,Ot=null,Lt=null,re=null,ae=null,me=null,Ee=null;return{setTest:function(oe){N||(oe?Ht(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(oe){gt!==oe&&!N&&(i.stencilMask(oe),gt=oe)},setFunc:function(oe,Ae,Xe){(_t!==oe||Ot!==Ae||Lt!==Xe)&&(i.stencilFunc(oe,Ae,Xe),_t=oe,Ot=Ae,Lt=Xe)},setOp:function(oe,Ae,Xe){(re!==oe||ae!==Ae||me!==Xe)&&(i.stencilOp(oe,Ae,Xe),re=oe,ae=Ae,me=Xe)},setLocked:function(oe){N=oe},setClear:function(oe){Ee!==oe&&(i.clearStencil(oe),Ee=oe)},reset:function(){N=!1,gt=null,_t=null,Ot=null,Lt=null,re=null,ae=null,me=null,Ee=null}}}let a=new s,l=new r,c=new o,h=new WeakMap,f=new WeakMap,d={},g={},v=new WeakMap,x=[],p=null,u=!1,R=null,M=null,U=null,F=null,D=null,L=null,K=null,b=new Qt(0,0,0),T=0,q=!1,j=null,ht=null,O=null,W=null,Z=null,et=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,$=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Q)[1]),J=$>=1):Q.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),J=$>=2);let at=null,ft={},Y=i.getParameter(i.SCISSOR_BOX),nt=i.getParameter(i.VIEWPORT),vt=new be().fromArray(Y),dt=new be().fromArray(nt);function St(N,gt,_t,Ot){let Lt=new Uint8Array(4),re=i.createTexture();i.bindTexture(N,re),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ae=0;ae<_t;ae++)n&&(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)?i.texImage3D(gt,0,i.RGBA,1,1,Ot,0,i.RGBA,i.UNSIGNED_BYTE,Lt):i.texImage2D(gt+ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Lt);return re}let It={};It[i.TEXTURE_2D]=St(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=St(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(It[i.TEXTURE_2D_ARRAY]=St(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=St(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ht(i.DEPTH_TEST),l.setFunc(ws),Wt(!1),E(za),Ht(i.CULL_FACE),At(Un);function Ht(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function Dt(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Jt(N,gt){return g[N]!==gt?(i.bindFramebuffer(N,gt),g[N]=gt,n&&(N===i.DRAW_FRAMEBUFFER&&(g[i.FRAMEBUFFER]=gt),N===i.FRAMEBUFFER&&(g[i.DRAW_FRAMEBUFFER]=gt)),!0):!1}function k(N,gt){let _t=x,Ot=!1;if(N)if(_t=v.get(gt),_t===void 0&&(_t=[],v.set(gt,_t)),N.isWebGLMultipleRenderTargets){let Lt=N.texture;if(_t.length!==Lt.length||_t[0]!==i.COLOR_ATTACHMENT0){for(let re=0,ae=Lt.length;re<ae;re++)_t[re]=i.COLOR_ATTACHMENT0+re;_t.length=Lt.length,Ot=!0}}else _t[0]!==i.COLOR_ATTACHMENT0&&(_t[0]=i.COLOR_ATTACHMENT0,Ot=!0);else _t[0]!==i.BACK&&(_t[0]=i.BACK,Ot=!0);Ot&&(e.isWebGL2?i.drawBuffers(_t):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(_t))}function Me(N){return p!==N?(i.useProgram(N),p=N,!0):!1}let Ct={[Yn]:i.FUNC_ADD,[sc]:i.FUNC_SUBTRACT,[rc]:i.FUNC_REVERSE_SUBTRACT};if(n)Ct[Va]=i.MIN,Ct[Wa]=i.MAX;else{let N=t.get("EXT_blend_minmax");N!==null&&(Ct[Va]=N.MIN_EXT,Ct[Wa]=N.MAX_EXT)}let Bt={[ac]:i.ZERO,[oc]:i.ONE,[lc]:i.SRC_COLOR,[Fr]:i.SRC_ALPHA,[pc]:i.SRC_ALPHA_SATURATE,[fc]:i.DST_COLOR,[hc]:i.DST_ALPHA,[cc]:i.ONE_MINUS_SRC_COLOR,[Br]:i.ONE_MINUS_SRC_ALPHA,[dc]:i.ONE_MINUS_DST_COLOR,[uc]:i.ONE_MINUS_DST_ALPHA,[mc]:i.CONSTANT_COLOR,[gc]:i.ONE_MINUS_CONSTANT_COLOR,[_c]:i.CONSTANT_ALPHA,[vc]:i.ONE_MINUS_CONSTANT_ALPHA};function At(N,gt,_t,Ot,Lt,re,ae,me,Ee,oe){if(N===Un){u===!0&&(Dt(i.BLEND),u=!1);return}if(u===!1&&(Ht(i.BLEND),u=!0),N!==ic){if(N!==R||oe!==q){if((M!==Yn||D!==Yn)&&(i.blendEquation(i.FUNC_ADD),M=Yn,D=Yn),oe)switch(N){case Si:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.ONE,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ha:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Si:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ha:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}U=null,F=null,L=null,K=null,b.set(0,0,0),T=0,R=N,q=oe}return}Lt=Lt||gt,re=re||_t,ae=ae||Ot,(gt!==M||Lt!==D)&&(i.blendEquationSeparate(Ct[gt],Ct[Lt]),M=gt,D=Lt),(_t!==U||Ot!==F||re!==L||ae!==K)&&(i.blendFuncSeparate(Bt[_t],Bt[Ot],Bt[re],Bt[ae]),U=_t,F=Ot,L=re,K=ae),(me.equals(b)===!1||Ee!==T)&&(i.blendColor(me.r,me.g,me.b,Ee),b.copy(me),T=Ee),R=N,q=!1}function he(N,gt){N.side===xn?Dt(i.CULL_FACE):Ht(i.CULL_FACE);let _t=N.side===Be;gt&&(_t=!_t),Wt(_t),N.blending===Si&&N.transparent===!1?At(Un):At(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),a.setMask(N.colorWrite);let Ot=N.stencilWrite;c.setTest(Ot),Ot&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),V(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Ht(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(N){j!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),j=N)}function E(N){N!==tc?(Ht(i.CULL_FACE),N!==ht&&(N===za?i.cullFace(i.BACK):N===ec?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),ht=N}function y(N){N!==O&&(J&&i.lineWidth(N),O=N)}function V(N,gt,_t){N?(Ht(i.POLYGON_OFFSET_FILL),(W!==gt||Z!==_t)&&(i.polygonOffset(gt,_t),W=gt,Z=_t)):Dt(i.POLYGON_OFFSET_FILL)}function ot(N){N?Ht(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function st(N){N===void 0&&(N=i.TEXTURE0+et-1),at!==N&&(i.activeTexture(N),at=N)}function lt(N,gt,_t){_t===void 0&&(at===null?_t=i.TEXTURE0+et-1:_t=at);let Ot=ft[_t];Ot===void 0&&(Ot={type:void 0,texture:void 0},ft[_t]=Ot),(Ot.type!==N||Ot.texture!==gt)&&(at!==_t&&(i.activeTexture(_t),at=_t),i.bindTexture(N,gt||It[N]),Ot.type=N,Ot.texture=gt)}function Et(){let N=ft[at];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function xt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Gt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Zt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ut(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ft(N){vt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),vt.copy(N))}function Vt(N){dt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),dt.copy(N))}function Kt(N,gt){let _t=f.get(gt);_t===void 0&&(_t=new WeakMap,f.set(gt,_t));let Ot=_t.get(N);Ot===void 0&&(Ot=i.getUniformBlockIndex(gt,N.name),_t.set(N,Ot))}function Xt(N,gt){let Ot=f.get(gt).get(N);h.get(gt)!==Ot&&(i.uniformBlockBinding(gt,Ot,N.__bindingPointIndex),h.set(gt,Ot))}function G(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},at=null,ft={},g={},v=new WeakMap,x=[],p=null,u=!1,R=null,M=null,U=null,F=null,D=null,L=null,K=null,b=new Qt(0,0,0),T=0,q=!1,j=null,ht=null,O=null,W=null,Z=null,vt.set(0,0,i.canvas.width,i.canvas.height),dt.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ht,disable:Dt,bindFramebuffer:Jt,drawBuffers:k,useProgram:Me,setBlending:At,setMaterial:he,setFlipSided:Wt,setCullFace:E,setLineWidth:y,setPolygonOffset:V,setScissorTest:ot,activeTexture:st,bindTexture:lt,unbindTexture:Et,compressedTexImage2D:xt,compressedTexImage3D:wt,texImage2D:Mt,texImage3D:bt,updateUBOMapping:Kt,uniformBlockBinding:Xt,texStorage2D:Zt,texStorage3D:Ut,texSubImage2D:Nt,texSubImage3D:Gt,compressedTexSubImage2D:rt,compressedTexSubImage3D:ie,scissor:Ft,viewport:Vt,reset:G}}function Vp(i,t,e,n,s,r,o){let a=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,f,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,y){return g?new OffscreenCanvas(E,y):Is("canvas")}function x(E,y,V,ot){let st=1;if((E.width>ot||E.height>ot)&&(st=ot/Math.max(E.width,E.height)),st<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let lt=y?Wr:Math.floor,Et=lt(st*E.width),xt=lt(st*E.height);f===void 0&&(f=v(Et,xt));let wt=V?v(Et,xt):f;return wt.width=Et,wt.height=xt,wt.getContext("2d").drawImage(E,0,0,Et,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+xt+")."),wt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return wo(E.width)&&wo(E.height)}function u(E){return a?!1:E.wrapS!==Ve||E.wrapT!==Ve||E.minFilter!==Re&&E.minFilter!==ve}function R(E,y){return E.generateMipmaps&&y&&E.minFilter!==Re&&E.minFilter!==ve}function M(E){i.generateMipmap(E)}function U(E,y,V,ot,st=!1){if(a===!1)return y;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let lt=y;if(y===i.RED&&(V===i.FLOAT&&(lt=i.R32F),V===i.HALF_FLOAT&&(lt=i.R16F),V===i.UNSIGNED_BYTE&&(lt=i.R8)),y===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(lt=i.R8UI),V===i.UNSIGNED_SHORT&&(lt=i.R16UI),V===i.UNSIGNED_INT&&(lt=i.R32UI),V===i.BYTE&&(lt=i.R8I),V===i.SHORT&&(lt=i.R16I),V===i.INT&&(lt=i.R32I)),y===i.RG&&(V===i.FLOAT&&(lt=i.RG32F),V===i.HALF_FLOAT&&(lt=i.RG16F),V===i.UNSIGNED_BYTE&&(lt=i.RG8)),y===i.RGBA){let Et=st?Ts:le.getTransfer(ot);V===i.FLOAT&&(lt=i.RGBA32F),V===i.HALF_FLOAT&&(lt=i.RGBA16F),V===i.UNSIGNED_BYTE&&(lt=Et===ue?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(lt=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(lt=i.RGB5_A1)}return(lt===i.R16F||lt===i.R32F||lt===i.RG16F||lt===i.RG32F||lt===i.RGBA16F||lt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function F(E,y,V){return R(E,V)===!0||E.isFramebufferTexture&&E.minFilter!==Re&&E.minFilter!==ve?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function D(E){return E===Re||E===Xa||E===rr?i.NEAREST:i.LINEAR}function L(E){let y=E.target;y.removeEventListener("dispose",L),b(y),y.isVideoTexture&&h.delete(y)}function K(E){let y=E.target;y.removeEventListener("dispose",K),q(y)}function b(E){let y=n.get(E);if(y.__webglInit===void 0)return;let V=E.source,ot=d.get(V);if(ot){let st=ot[y.__cacheKey];st.usedTimes--,st.usedTimes===0&&T(E),Object.keys(ot).length===0&&d.delete(V)}n.remove(E)}function T(E){let y=n.get(E);i.deleteTexture(y.__webglTexture);let V=E.source,ot=d.get(V);delete ot[y.__cacheKey],o.memory.textures--}function q(E){let y=E.texture,V=n.get(E),ot=n.get(y);if(ot.__webglTexture!==void 0&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(V.__webglFramebuffer[st]))for(let lt=0;lt<V.__webglFramebuffer[st].length;lt++)i.deleteFramebuffer(V.__webglFramebuffer[st][lt]);else i.deleteFramebuffer(V.__webglFramebuffer[st]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[st])}else{if(Array.isArray(V.__webglFramebuffer))for(let st=0;st<V.__webglFramebuffer.length;st++)i.deleteFramebuffer(V.__webglFramebuffer[st]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let st=0;st<V.__webglColorRenderbuffer.length;st++)V.__webglColorRenderbuffer[st]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[st]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let st=0,lt=y.length;st<lt;st++){let Et=n.get(y[st]);Et.__webglTexture&&(i.deleteTexture(Et.__webglTexture),o.memory.textures--),n.remove(y[st])}n.remove(y),n.remove(E)}let j=0;function ht(){j=0}function O(){let E=j;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),j+=1,E}function W(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function Z(E,y){let V=n.get(E);if(E.isVideoTexture&&he(E),E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){let ot=E.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{vt(V,E,y);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+y)}function et(E,y){let V=n.get(E);if(E.version>0&&V.__version!==E.version){vt(V,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+y)}function J(E,y){let V=n.get(E);if(E.version>0&&V.__version!==E.version){vt(V,E,y);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+y)}function $(E,y){let V=n.get(E);if(E.version>0&&V.__version!==E.version){dt(V,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+y)}let Q={[Gr]:i.REPEAT,[Ve]:i.CLAMP_TO_EDGE,[kr]:i.MIRRORED_REPEAT},at={[Re]:i.NEAREST,[Xa]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[ve]:i.LINEAR,[Nc]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},ft={[Wc]:i.NEVER,[$c]:i.ALWAYS,[Xc]:i.LESS,[bl]:i.LEQUAL,[qc]:i.EQUAL,[Kc]:i.GEQUAL,[Yc]:i.GREATER,[Zc]:i.NOTEQUAL};function Y(E,y,V){if(V?(i.texParameteri(E,i.TEXTURE_WRAP_S,Q[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Q[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Q[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,at[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,at[y.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==Ve||y.wrapT!==Ve)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,D(y.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,D(y.minFilter)),y.minFilter!==Re&&y.minFilter!==ve&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ft[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===Re||y.minFilter!==rr&&y.minFilter!==Ti||y.type===Ye&&t.has("OES_texture_float_linear")===!1||a===!1&&y.type===on&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(E,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function nt(E,y){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",L));let ot=y.source,st=d.get(ot);st===void 0&&(st={},d.set(ot,st));let lt=W(y);if(lt!==E.__cacheKey){st[lt]===void 0&&(st[lt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),st[lt].usedTimes++;let Et=st[E.__cacheKey];Et!==void 0&&(st[E.__cacheKey].usedTimes--,Et.usedTimes===0&&T(y)),E.__cacheKey=lt,E.__webglTexture=st[lt].texture}return V}function vt(E,y,V){let ot=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ot=i.TEXTURE_3D);let st=nt(E,y),lt=y.source;e.bindTexture(ot,E.__webglTexture,i.TEXTURE0+V);let Et=n.get(lt);if(lt.version!==Et.__version||st===!0){e.activeTexture(i.TEXTURE0+V);let xt=le.getPrimaries(le.workingColorSpace),wt=y.colorSpace===Fe?null:le.getPrimaries(y.colorSpace),Nt=y.colorSpace===Fe||xt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let Gt=u(y)&&p(y.image)===!1,rt=x(y.image,Gt,!1,s.maxTextureSize);rt=Wt(y,rt);let ie=p(rt)||a,Zt=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type),Mt=U(y.internalFormat,Zt,Ut,y.colorSpace,y.isVideoTexture);Y(ot,y,ie);let bt,Ft=y.mipmaps,Vt=a&&y.isVideoTexture!==!0&&Mt!==yl,Kt=Et.__version===void 0||st===!0,Xt=F(y,rt,ie);if(y.isDepthTexture)Mt=i.DEPTH_COMPONENT,a?y.type===Ye?Mt=i.DEPTH_COMPONENT32F:y.type===Nn?Mt=i.DEPTH_COMPONENT24:y.type===Kn?Mt=i.DEPTH24_STENCIL8:Mt=i.DEPTH_COMPONENT16:y.type===Ye&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===$n&&Mt===i.DEPTH_COMPONENT&&y.type!==wa&&y.type!==Nn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Nn,Ut=r.convert(y.type)),y.format===Ri&&Mt===i.DEPTH_COMPONENT&&(Mt=i.DEPTH_STENCIL,y.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Kn,Ut=r.convert(y.type))),Kt&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Mt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Mt,rt.width,rt.height,0,Zt,Ut,null));else if(y.isDataTexture)if(Ft.length>0&&ie){Vt&&Kt&&e.texStorage2D(i.TEXTURE_2D,Xt,Mt,Ft[0].width,Ft[0].height);for(let G=0,N=Ft.length;G<N;G++)bt=Ft[G],Vt?e.texSubImage2D(i.TEXTURE_2D,G,0,0,bt.width,bt.height,Zt,Ut,bt.data):e.texImage2D(i.TEXTURE_2D,G,Mt,bt.width,bt.height,0,Zt,Ut,bt.data);y.generateMipmaps=!1}else Vt?(Kt&&e.texStorage2D(i.TEXTURE_2D,Xt,Mt,rt.width,rt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt.width,rt.height,Zt,Ut,rt.data)):e.texImage2D(i.TEXTURE_2D,0,Mt,rt.width,rt.height,0,Zt,Ut,rt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Vt&&Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,Mt,Ft[0].width,Ft[0].height,rt.depth);for(let G=0,N=Ft.length;G<N;G++)bt=Ft[G],y.format!==De?Zt!==null?Vt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,bt.width,bt.height,rt.depth,Zt,bt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Mt,bt.width,bt.height,rt.depth,0,bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,bt.width,bt.height,rt.depth,Zt,Ut,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,G,Mt,bt.width,bt.height,rt.depth,0,Zt,Ut,bt.data)}else{Vt&&Kt&&e.texStorage2D(i.TEXTURE_2D,Xt,Mt,Ft[0].width,Ft[0].height);for(let G=0,N=Ft.length;G<N;G++)bt=Ft[G],y.format!==De?Zt!==null?Vt?e.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,bt.width,bt.height,Zt,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,G,Mt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?e.texSubImage2D(i.TEXTURE_2D,G,0,0,bt.width,bt.height,Zt,Ut,bt.data):e.texImage2D(i.TEXTURE_2D,G,Mt,bt.width,bt.height,0,Zt,Ut,bt.data)}else if(y.isDataArrayTexture)Vt?(Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,Mt,rt.width,rt.height,rt.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,Zt,Ut,rt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,rt.width,rt.height,rt.depth,0,Zt,Ut,rt.data);else if(y.isData3DTexture)Vt?(Kt&&e.texStorage3D(i.TEXTURE_3D,Xt,Mt,rt.width,rt.height,rt.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,Zt,Ut,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,rt.width,rt.height,rt.depth,0,Zt,Ut,rt.data);else if(y.isFramebufferTexture){if(Kt)if(Vt)e.texStorage2D(i.TEXTURE_2D,Xt,Mt,rt.width,rt.height);else{let G=rt.width,N=rt.height;for(let gt=0;gt<Xt;gt++)e.texImage2D(i.TEXTURE_2D,gt,Mt,G,N,0,Zt,Ut,null),G>>=1,N>>=1}}else if(Ft.length>0&&ie){Vt&&Kt&&e.texStorage2D(i.TEXTURE_2D,Xt,Mt,Ft[0].width,Ft[0].height);for(let G=0,N=Ft.length;G<N;G++)bt=Ft[G],Vt?e.texSubImage2D(i.TEXTURE_2D,G,0,0,Zt,Ut,bt):e.texImage2D(i.TEXTURE_2D,G,Mt,Zt,Ut,bt);y.generateMipmaps=!1}else Vt?(Kt&&e.texStorage2D(i.TEXTURE_2D,Xt,Mt,rt.width,rt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Zt,Ut,rt)):e.texImage2D(i.TEXTURE_2D,0,Mt,Zt,Ut,rt);R(y,ie)&&M(ot),Et.__version=lt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function dt(E,y,V){if(y.image.length!==6)return;let ot=nt(E,y),st=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+V);let lt=n.get(st);if(st.version!==lt.__version||ot===!0){e.activeTexture(i.TEXTURE0+V);let Et=le.getPrimaries(le.workingColorSpace),xt=y.colorSpace===Fe?null:le.getPrimaries(y.colorSpace),wt=y.colorSpace===Fe||Et===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let Nt=y.isCompressedTexture||y.image[0].isCompressedTexture,Gt=y.image[0]&&y.image[0].isDataTexture,rt=[];for(let G=0;G<6;G++)!Nt&&!Gt?rt[G]=x(y.image[G],!1,!0,s.maxCubemapSize):rt[G]=Gt?y.image[G].image:y.image[G],rt[G]=Wt(y,rt[G]);let ie=rt[0],Zt=p(ie)||a,Ut=r.convert(y.format,y.colorSpace),Mt=r.convert(y.type),bt=U(y.internalFormat,Ut,Mt,y.colorSpace),Ft=a&&y.isVideoTexture!==!0,Vt=lt.__version===void 0||ot===!0,Kt=F(y,ie,Zt);Y(i.TEXTURE_CUBE_MAP,y,Zt);let Xt;if(Nt){Ft&&Vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Kt,bt,ie.width,ie.height);for(let G=0;G<6;G++){Xt=rt[G].mipmaps;for(let N=0;N<Xt.length;N++){let gt=Xt[N];y.format!==De?Ut!==null?Ft?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N,0,0,gt.width,gt.height,Ut,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N,0,0,gt.width,gt.height,Ut,Mt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N,bt,gt.width,gt.height,0,Ut,Mt,gt.data)}}}else{Xt=y.mipmaps,Ft&&Vt&&(Xt.length>0&&Kt++,e.texStorage2D(i.TEXTURE_CUBE_MAP,Kt,bt,rt[0].width,rt[0].height));for(let G=0;G<6;G++)if(Gt){Ft?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,rt[G].width,rt[G].height,Ut,Mt,rt[G].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,bt,rt[G].width,rt[G].height,0,Ut,Mt,rt[G].data);for(let N=0;N<Xt.length;N++){let _t=Xt[N].image[G].image;Ft?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N+1,0,0,_t.width,_t.height,Ut,Mt,_t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N+1,bt,_t.width,_t.height,0,Ut,Mt,_t.data)}}else{Ft?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,Ut,Mt,rt[G]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,bt,Ut,Mt,rt[G]);for(let N=0;N<Xt.length;N++){let gt=Xt[N];Ft?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N+1,0,0,Ut,Mt,gt.image[G]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,N+1,bt,Ut,Mt,gt.image[G])}}}R(y,Zt)&&M(i.TEXTURE_CUBE_MAP),lt.__version=st.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function St(E,y,V,ot,st,lt){let Et=r.convert(V.format,V.colorSpace),xt=r.convert(V.type),wt=U(V.internalFormat,Et,xt,V.colorSpace);if(!n.get(y).__hasExternalTextures){let Gt=Math.max(1,y.width>>lt),rt=Math.max(1,y.height>>lt);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,lt,wt,Gt,rt,y.depth,0,Et,xt,null):e.texImage2D(st,lt,wt,Gt,rt,0,Et,xt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),At(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,st,n.get(V).__webglTexture,0,Bt(y)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,st,n.get(V).__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(E,y,V){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let ot=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(V||At(y)){let st=y.depthTexture;st&&st.isDepthTexture&&(st.type===Ye?ot=i.DEPTH_COMPONENT32F:st.type===Nn&&(ot=i.DEPTH_COMPONENT24));let lt=Bt(y);At(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,ot,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,ot,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,ot,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){let ot=Bt(y);V&&At(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,i.DEPTH24_STENCIL8,y.width,y.height):At(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{let ot=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let st=0;st<ot.length;st++){let lt=ot[st],Et=r.convert(lt.format,lt.colorSpace),xt=r.convert(lt.type),wt=U(lt.internalFormat,Et,xt,lt.colorSpace),Nt=Bt(y);V&&At(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,wt,y.width,y.height):At(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt,wt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,wt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ht(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z(y.depthTexture,0);let ot=n.get(y.depthTexture).__webglTexture,st=Bt(y);if(y.depthTexture.format===$n)At(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0);else if(y.depthTexture.format===Ri)At(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function Dt(E){let y=n.get(E),V=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ht(y.__webglFramebuffer,E)}else if(V){y.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ot]),y.__webglDepthbuffer[ot]=i.createRenderbuffer(),It(y.__webglDepthbuffer[ot],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),It(y.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(E,y,V){let ot=n.get(E);y!==void 0&&St(ot.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Dt(E)}function k(E){let y=E.texture,V=n.get(E),ot=n.get(y);E.addEventListener("dispose",K),E.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=y.version,o.memory.textures++);let st=E.isWebGLCubeRenderTarget===!0,lt=E.isWebGLMultipleRenderTargets===!0,Et=p(E)||a;if(st){V.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(a&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[xt]=[];for(let wt=0;wt<y.mipmaps.length;wt++)V.__webglFramebuffer[xt][wt]=i.createFramebuffer()}else V.__webglFramebuffer[xt]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let xt=0;xt<y.mipmaps.length;xt++)V.__webglFramebuffer[xt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(lt)if(s.drawBuffers){let xt=E.texture;for(let wt=0,Nt=xt.length;wt<Nt;wt++){let Gt=n.get(xt[wt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&At(E)===!1){let xt=lt?y:[y];V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let wt=0;wt<xt.length;wt++){let Nt=xt[wt];V.__webglColorRenderbuffer[wt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[wt]);let Gt=r.convert(Nt.format,Nt.colorSpace),rt=r.convert(Nt.type),ie=U(Nt.internalFormat,Gt,rt,Nt.colorSpace,E.isXRRenderTarget===!0),Zt=Bt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,ie,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,V.__webglColorRenderbuffer[wt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),It(V.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),Y(i.TEXTURE_CUBE_MAP,y,Et);for(let xt=0;xt<6;xt++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let wt=0;wt<y.mipmaps.length;wt++)St(V.__webglFramebuffer[xt][wt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt);else St(V.__webglFramebuffer[xt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);R(y,Et)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){let xt=E.texture;for(let wt=0,Nt=xt.length;wt<Nt;wt++){let Gt=xt[wt],rt=n.get(Gt);e.bindTexture(i.TEXTURE_2D,rt.__webglTexture),Y(i.TEXTURE_2D,Gt,Et),St(V.__webglFramebuffer,E,Gt,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,0),R(Gt,Et)&&M(i.TEXTURE_2D)}e.unbindTexture()}else{let xt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?xt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(xt,ot.__webglTexture),Y(xt,y,Et),a&&y.mipmaps&&y.mipmaps.length>0)for(let wt=0;wt<y.mipmaps.length;wt++)St(V.__webglFramebuffer[wt],E,y,i.COLOR_ATTACHMENT0,xt,wt);else St(V.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,xt,0);R(y,Et)&&M(xt),e.unbindTexture()}E.depthBuffer&&Dt(E)}function Me(E){let y=p(E)||a,V=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ot=0,st=V.length;ot<st;ot++){let lt=V[ot];if(R(lt,y)){let Et=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,xt=n.get(lt).__webglTexture;e.bindTexture(Et,xt),M(Et),e.unbindTexture()}}}function Ct(E){if(a&&E.samples>0&&At(E)===!1){let y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],V=E.width,ot=E.height,st=i.COLOR_BUFFER_BIT,lt=[],Et=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(E),wt=E.isWebGLMultipleRenderTargets===!0;if(wt)for(let Nt=0;Nt<y.length;Nt++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let Nt=0;Nt<y.length;Nt++){lt.push(i.COLOR_ATTACHMENT0+Nt),E.depthBuffer&&lt.push(Et);let Gt=xt.__ignoreDepthValues!==void 0?xt.__ignoreDepthValues:!1;if(Gt===!1&&(E.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),wt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[Nt]),Gt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Et]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Et])),wt){let rt=n.get(y[Nt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,rt,0)}i.blitFramebuffer(0,0,V,ot,0,0,V,ot,st,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),wt)for(let Nt=0;Nt<y.length;Nt++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,xt.__webglColorRenderbuffer[Nt]);let Gt=n.get(y[Nt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}}function Bt(E){return Math.min(s.maxSamples,E.samples)}function At(E){let y=n.get(E);return a&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function he(E){let y=o.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function Wt(E,y){let V=E.colorSpace,ot=E.format,st=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Hr||V!==ze&&V!==Fe&&(le.getTransfer(V)===ue?a===!1?t.has("EXT_sRGB")===!0&&ot===De?(E.format=Hr,E.minFilter=ve,E.generateMipmaps=!1):y=Ls.sRGBToLinear(y):(ot!==De||st!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}this.allocateTextureUnit=O,this.resetTextureUnits=ht,this.setTexture2D=Z,this.setTexture2DArray=et,this.setTexture3D=J,this.setTextureCube=$,this.rebindTextures=Jt,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=At}function Wp(i,t,e){let n=e.isWebGL2;function s(r,o=Fe){let a,l=le.getTransfer(o);if(r===On)return i.UNSIGNED_BYTE;if(r===ml)return i.UNSIGNED_SHORT_4_4_4_4;if(r===gl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Uc)return i.BYTE;if(r===Dc)return i.SHORT;if(r===wa)return i.UNSIGNED_SHORT;if(r===pl)return i.INT;if(r===Nn)return i.UNSIGNED_INT;if(r===Ye)return i.FLOAT;if(r===on)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Oc)return i.ALPHA;if(r===De)return i.RGBA;if(r===Fc)return i.LUMINANCE;if(r===Bc)return i.LUMINANCE_ALPHA;if(r===$n)return i.DEPTH_COMPONENT;if(r===Ri)return i.DEPTH_STENCIL;if(r===Hr)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Ea)return i.RED;if(r===_l)return i.RED_INTEGER;if(r===zc)return i.RG;if(r===vl)return i.RG_INTEGER;if(r===xl)return i.RGBA_INTEGER;if(r===ar||r===or||r===lr||r===cr)if(l===ue)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===ar)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===or)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===lr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===cr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===ar)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===or)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===lr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===cr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===qa||r===Ya||r===Za||r===Ka)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===qa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ya)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Za)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ka)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===yl)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===$a||r===Ja)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===$a)return l===ue?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Ja)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Qa||r===ja||r===to||r===eo||r===no||r===io||r===so||r===ro||r===ao||r===oo||r===lo||r===co||r===ho||r===uo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Qa)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ja)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===to)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===eo)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===no)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===io)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===so)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ro)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ao)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===oo)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===lo)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===co)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ho)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===uo)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===hr||r===fo||r===po)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===hr)return l===ue?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===fo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===po)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Gc||r===mo||r===go||r===_o)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===hr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===mo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===go)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===_o)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Kn?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var ra=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Mi=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xp={type:"move"},ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let p=e.getJointPose(x,n),u=this._getHandJoint(c,x);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),g=.02,v=.005;c.inputState.pinching&&d>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Mi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},aa=class extends Bn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,d=null,g=null,v=null,x=e.getContextAttributes(),p=null,u=null,R=[],M=[],U=new ee,F=null,D=new Ue;D.layers.enable(1),D.viewport=new be;let L=new Ue;L.layers.enable(2),L.viewport=new be;let K=[D,L],b=new ra;b.layers.enable(1),b.layers.enable(2);let T=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=R[Y];return nt===void 0&&(nt=new ki,R[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=R[Y];return nt===void 0&&(nt=new ki,R[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=R[Y];return nt===void 0&&(nt=new ki,R[Y]=nt),nt.getHandSpace()};function j(Y){let nt=M.indexOf(Y.inputSource);if(nt===-1)return;let vt=R[nt];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,c||o),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function ht(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",ht),s.removeEventListener("inputsourceschange",O);for(let Y=0;Y<R.length;Y++){let nt=M[Y];nt!==null&&(M[Y]=null,R[Y].disconnect(nt))}T=null,q=null,t.setRenderTarget(p),g=null,d=null,f=null,s=null,u=null,ft.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",ht),s.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(U),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let nt={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),u=new Sn(g.framebufferWidth,g.framebufferHeight,{format:De,type:On,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let nt=null,vt=null,dt=null;x.depth&&(dt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=x.stencil?Ri:$n,vt=x.stencil?Kn:Nn);let St={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(St),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),u=new Sn(d.textureWidth,d.textureHeight,{format:De,type:On,depthTexture:new Vs(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});let It=t.properties.get(u);It.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ft.setContext(s),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function O(Y){for(let nt=0;nt<Y.removed.length;nt++){let vt=Y.removed[nt],dt=M.indexOf(vt);dt>=0&&(M[dt]=null,R[dt].disconnect(vt))}for(let nt=0;nt<Y.added.length;nt++){let vt=Y.added[nt],dt=M.indexOf(vt);if(dt===-1){for(let It=0;It<R.length;It++)if(It>=M.length){M.push(vt),dt=It;break}else if(M[It]===null){M[It]=vt,dt=It;break}if(dt===-1)break}let St=R[dt];St&&St.connect(vt)}}let W=new H,Z=new H;function et(Y,nt,vt){W.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(vt.matrixWorld);let dt=W.distanceTo(Z),St=nt.projectionMatrix.elements,It=vt.projectionMatrix.elements,Ht=St[14]/(St[10]-1),Dt=St[14]/(St[10]+1),Jt=(St[9]+1)/St[5],k=(St[9]-1)/St[5],Me=(St[8]-1)/St[0],Ct=(It[8]+1)/It[0],Bt=Ht*Me,At=Ht*Ct,he=dt/(-Me+Ct),Wt=he*-Me;nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Wt),Y.translateZ(he),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();let E=Ht+he,y=Dt+he,V=Bt-Wt,ot=At+(dt-Wt),st=Jt*Dt/y*E,lt=k*Dt/y*E;Y.projectionMatrix.makePerspective(V,ot,st,lt,E,y),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function J(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;b.near=L.near=D.near=Y.near,b.far=L.far=D.far=Y.far,(T!==b.near||q!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),T=b.near,q=b.far);let nt=Y.parent,vt=b.cameras;J(b,nt);for(let dt=0;dt<vt.length;dt++)J(vt[dt],nt);vt.length===2?et(b,D,L):b.projectionMatrix.copy(D.projectionMatrix),$(Y,b,nt)};function $(Y,nt,vt){vt===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Vr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Y)};let Q=null;function at(Y,nt){if(h=nt.getViewerPose(c||o),v=nt,h!==null){let vt=h.views;g!==null&&(t.setRenderTargetFramebuffer(u,g.framebuffer),t.setRenderTarget(u));let dt=!1;vt.length!==b.cameras.length&&(b.cameras.length=0,dt=!0);for(let St=0;St<vt.length;St++){let It=vt[St],Ht=null;if(g!==null)Ht=g.getViewport(It);else{let Jt=f.getViewSubImage(d,It);Ht=Jt.viewport,St===0&&(t.setRenderTargetTextures(u,Jt.colorTexture,d.ignoreDepthValues?void 0:Jt.depthStencilTexture),t.setRenderTarget(u))}let Dt=K[St];Dt===void 0&&(Dt=new Ue,Dt.layers.enable(St),Dt.viewport=new be,K[St]=Dt),Dt.matrix.fromArray(It.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(It.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),St===0&&(b.matrix.copy(Dt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),dt===!0&&b.cameras.push(Dt)}}for(let vt=0;vt<R.length;vt++){let dt=M[vt],St=R[vt];dt!==null&&St!==void 0&&St.update(dt,nt,c||o)}Q&&Q(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),v=null}let ft=new Tl;ft.setAnimationLoop(at),this.setAnimationLoop=function(Y){Q=Y},this.dispose=function(){}}};function qp(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,Al(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,R,M,U){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),f(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),d(p,u),u.isMeshPhysicalMaterial&&g(p,u,U)):u.isMeshMatcapMaterial?(r(p,u),v(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),x(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(o(p,u),u.isLineDashedMaterial&&a(p,u)):u.isPointsMaterial?l(p,u,R,M):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Be&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Be&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);let R=t.get(u).envMap;if(R&&(p.envMap.value=R,p.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;let M=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*M,e(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function o(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function a(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,R,M){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*R,p.scale.value=M*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function d(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),t.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function g(p,u,R){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Be&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=R.texture,p.transmissionSamplerSize.value.set(R.width,R.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,u){u.matcap&&(p.matcap.value=u.matcap)}function x(p,u){let R=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(R.matrixWorld),p.nearDistance.value=R.shadow.camera.near,p.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Yp(i,t,e,n){let s={},r={},o=[],a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(R,M){let U=M.program;n.uniformBlockBinding(R,U)}function c(R,M){let U=s[R.id];U===void 0&&(v(R),U=h(R),s[R.id]=U,R.addEventListener("dispose",p));let F=M.program;n.updateUBOMapping(R,F);let D=t.render.frame;r[R.id]!==D&&(d(R),r[R.id]=D)}function h(R){let M=f();R.__bindingPointIndex=M;let U=i.createBuffer(),F=R.__size,D=R.usage;return i.bindBuffer(i.UNIFORM_BUFFER,U),i.bufferData(i.UNIFORM_BUFFER,F,D),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,U),U}function f(){for(let R=0;R<a;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(R){let M=s[R.id],U=R.uniforms,F=R.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let D=0,L=U.length;D<L;D++){let K=Array.isArray(U[D])?U[D]:[U[D]];for(let b=0,T=K.length;b<T;b++){let q=K[b];if(g(q,D,b,F)===!0){let j=q.__offset,ht=Array.isArray(q.value)?q.value:[q.value],O=0;for(let W=0;W<ht.length;W++){let Z=ht[W],et=x(Z);typeof Z=="number"||typeof Z=="boolean"?(q.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,j+O,q.__data)):Z.isMatrix3?(q.__data[0]=Z.elements[0],q.__data[1]=Z.elements[1],q.__data[2]=Z.elements[2],q.__data[3]=0,q.__data[4]=Z.elements[3],q.__data[5]=Z.elements[4],q.__data[6]=Z.elements[5],q.__data[7]=0,q.__data[8]=Z.elements[6],q.__data[9]=Z.elements[7],q.__data[10]=Z.elements[8],q.__data[11]=0):(Z.toArray(q.__data,O),O+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,j,q.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(R,M,U,F){let D=R.value,L=M+"_"+U;if(F[L]===void 0)return typeof D=="number"||typeof D=="boolean"?F[L]=D:F[L]=D.clone(),!0;{let K=F[L];if(typeof D=="number"||typeof D=="boolean"){if(K!==D)return F[L]=D,!0}else if(K.equals(D)===!1)return K.copy(D),!0}return!1}function v(R){let M=R.uniforms,U=0,F=16;for(let L=0,K=M.length;L<K;L++){let b=Array.isArray(M[L])?M[L]:[M[L]];for(let T=0,q=b.length;T<q;T++){let j=b[T],ht=Array.isArray(j.value)?j.value:[j.value];for(let O=0,W=ht.length;O<W;O++){let Z=ht[O],et=x(Z),J=U%F;J!==0&&F-J<et.boundary&&(U+=F-J),j.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=U,U+=et.storage}}}let D=U%F;return D>0&&(U+=F-D),R.__size=U,R.__cache={},this}function x(R){let M={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(M.boundary=4,M.storage=4):R.isVector2?(M.boundary=8,M.storage=8):R.isVector3||R.isColor?(M.boundary=16,M.storage=12):R.isVector4?(M.boundary=16,M.storage=16):R.isMatrix3?(M.boundary=48,M.storage=48):R.isMatrix4?(M.boundary=64,M.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),M}function p(R){let M=R.target;M.removeEventListener("dispose",p);let U=o.indexOf(M.__bindingPointIndex);o.splice(U,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function u(){for(let R in s)i.deleteBuffer(s[R]);o=[],s={},r={}}return{bind:l,update:c,dispose:u}}var qi=class{constructor(t={}){let{canvas:e=Qc(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let g=new Uint32Array(4),v=new Int32Array(4),x=null,p=null,u=[],R=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_e,this._useLegacyLights=!1,this.toneMapping=Dn,this.toneMappingExposure=1;let M=this,U=!1,F=0,D=0,L=null,K=-1,b=null,T=new be,q=new be,j=null,ht=new Qt(0),O=0,W=e.width,Z=e.height,et=1,J=null,$=null,Q=new be(0,0,W,Z),at=new be(0,0,W,Z),ft=!1,Y=new Xi,nt=!1,vt=!1,dt=null,St=new we,It=new ee,Ht=new H,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Jt(){return L===null?et:1}let k=n;function Me(m,w){for(let A=0;A<m.length;A++){let C=m[A],P=e.getContext(C,w);if(P!==null)return P}return null}try{let m={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sa}`),e.addEventListener("webglcontextlost",G,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",gt,!1),k===null){let w=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&w.shift(),k=Me(w,m),k===null)throw Me(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(m){throw console.error("THREE.WebGLRenderer: "+m.message),m}let Ct,Bt,At,he,Wt,E,y,V,ot,st,lt,Et,xt,wt,Nt,Gt,rt,ie,Zt,Ut,Mt,bt,Ft,Vt;function Kt(){Ct=new fd(k),Bt=new ad(k,Ct,t),Ct.init(Bt),bt=new Wp(k,Ct,Bt),At=new Hp(k,Ct,Bt),he=new md(k),Wt=new Pp,E=new Vp(k,Ct,At,Wt,Bt,bt,he),y=new ld(M),V=new ud(M),ot=new Sh(k,Bt),Ft=new sd(k,Ct,ot,Bt),st=new dd(k,ot,he,Ft),lt=new xd(k,st,ot,he),Zt=new vd(k,Bt,E),Gt=new od(Wt),Et=new Cp(M,y,V,Ct,Bt,Ft,Gt),xt=new qp(M,Wt),wt=new Lp,Nt=new Bp(Ct,Bt),ie=new id(M,y,V,At,lt,d,l),rt=new kp(M,lt,Bt),Vt=new Yp(k,he,Bt,At),Ut=new rd(k,Ct,he,Bt),Mt=new pd(k,Ct,he,Bt),he.programs=Et.programs,M.capabilities=Bt,M.extensions=Ct,M.properties=Wt,M.renderLists=wt,M.shadowMap=rt,M.state=At,M.info=he}Kt();let Xt=new aa(M,k);this.xr=Xt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let m=Ct.get("WEBGL_lose_context");m&&m.loseContext()},this.forceContextRestore=function(){let m=Ct.get("WEBGL_lose_context");m&&m.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(m){m!==void 0&&(et=m,this.setSize(W,Z,!1))},this.getSize=function(m){return m.set(W,Z)},this.setSize=function(m,w,A=!0){if(Xt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=m,Z=w,e.width=Math.floor(m*et),e.height=Math.floor(w*et),A===!0&&(e.style.width=m+"px",e.style.height=w+"px"),this.setViewport(0,0,m,w)},this.getDrawingBufferSize=function(m){return m.set(W*et,Z*et).floor()},this.setDrawingBufferSize=function(m,w,A){W=m,Z=w,et=A,e.width=Math.floor(m*A),e.height=Math.floor(w*A),this.setViewport(0,0,m,w)},this.getCurrentViewport=function(m){return m.copy(T)},this.getViewport=function(m){return m.copy(Q)},this.setViewport=function(m,w,A,C){m.isVector4?Q.set(m.x,m.y,m.z,m.w):Q.set(m,w,A,C),At.viewport(T.copy(Q).multiplyScalar(et).floor())},this.getScissor=function(m){return m.copy(at)},this.setScissor=function(m,w,A,C){m.isVector4?at.set(m.x,m.y,m.z,m.w):at.set(m,w,A,C),At.scissor(q.copy(at).multiplyScalar(et).floor())},this.getScissorTest=function(){return ft},this.setScissorTest=function(m){At.setScissorTest(ft=m)},this.setOpaqueSort=function(m){J=m},this.setTransparentSort=function(m){$=m},this.getClearColor=function(m){return m.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(m=!0,w=!0,A=!0){let C=0;if(m){let P=!1;if(L!==null){let z=L.texture.format;P=z===xl||z===vl||z===_l}if(P){let z=L.texture.type,B=z===On||z===Nn||z===wa||z===Kn||z===ml||z===gl,X=ie.getClearColor(),tt=ie.getClearAlpha(),it=X.r,ct=X.g,ut=X.b;B?(g[0]=it,g[1]=ct,g[2]=ut,g[3]=tt,k.clearBufferuiv(k.COLOR,0,g)):(v[0]=it,v[1]=ct,v[2]=ut,v[3]=tt,k.clearBufferiv(k.COLOR,0,v))}else C|=k.COLOR_BUFFER_BIT}w&&(C|=k.DEPTH_BUFFER_BIT),A&&(C|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(C)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",G,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),wt.dispose(),Nt.dispose(),Wt.dispose(),y.dispose(),V.dispose(),lt.dispose(),Ft.dispose(),Vt.dispose(),Et.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",Ee),Xt.removeEventListener("sessionend",oe),dt&&(dt.dispose(),dt=null),Ae.stop()};function G(m){m.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;let m=he.autoReset,w=rt.enabled,A=rt.autoUpdate,C=rt.needsUpdate,P=rt.type;Kt(),he.autoReset=m,rt.enabled=w,rt.autoUpdate=A,rt.needsUpdate=C,rt.type=P}function gt(m){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",m.statusMessage)}function _t(m){let w=m.target;w.removeEventListener("dispose",_t),Ot(w)}function Ot(m){Lt(m),Wt.remove(m)}function Lt(m){let w=Wt.get(m).programs;w!==void 0&&(w.forEach(function(A){Et.releaseProgram(A)}),m.isShaderMaterial&&Et.releaseShaderCache(m))}this.renderBufferDirect=function(m,w,A,C,P,z){w===null&&(w=Dt);let B=P.isMesh&&P.matrixWorld.determinant()<0,X=_(m,w,A,C,P);At.setMaterial(C,B);let tt=A.index,it=1;if(C.wireframe===!0){if(tt=st.getWireframeAttribute(A),tt===void 0)return;it=2}let ct=A.drawRange,ut=A.attributes.position,pt=ct.start*it,yt=(ct.start+ct.count)*it;z!==null&&(pt=Math.max(pt,z.start*it),yt=Math.min(yt,(z.start+z.count)*it)),tt!==null?(pt=Math.max(pt,0),yt=Math.min(yt,tt.count)):ut!=null&&(pt=Math.max(pt,0),yt=Math.min(yt,ut.count));let Tt=yt-pt;if(Tt<0||Tt===1/0)return;Ft.setup(P,C,X,A,tt);let te,zt=Ut;if(tt!==null&&(te=ot.get(tt),zt=Mt,zt.setIndex(te)),P.isMesh)C.wireframe===!0?(At.setLineWidth(C.wireframeLinewidth*Jt()),zt.setMode(k.LINES)):zt.setMode(k.TRIANGLES);else if(P.isLine){let Pt=C.linewidth;Pt===void 0&&(Pt=1),At.setLineWidth(Pt*Jt()),P.isLineSegments?zt.setMode(k.LINES):P.isLineLoop?zt.setMode(k.LINE_LOOP):zt.setMode(k.LINE_STRIP)}else P.isPoints?zt.setMode(k.POINTS):P.isSprite&&zt.setMode(k.TRIANGLES);if(P.isBatchedMesh)zt.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else if(P.isInstancedMesh)zt.renderInstances(pt,Tt,P.count);else if(A.isInstancedBufferGeometry){let Pt=A._maxInstanceCount!==void 0?A._maxInstanceCount:1/0,se=Math.min(A.instanceCount,Pt);zt.renderInstances(pt,Tt,se)}else zt.render(pt,Tt)};function re(m,w,A){m.transparent===!0&&m.side===xn&&m.forceSinglePass===!1?(m.side=Be,m.needsUpdate=!0,qt(m,w,A),m.side=Fn,m.needsUpdate=!0,qt(m,w,A),m.side=xn):qt(m,w,A)}this.compile=function(m,w,A=null){A===null&&(A=m),p=Nt.get(A),p.init(),R.push(p),A.traverseVisible(function(P){P.isLight&&P.layers.test(w.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),m!==A&&m.traverseVisible(function(P){P.isLight&&P.layers.test(w.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),p.setupLights(M._useLegacyLights);let C=new Set;return m.traverse(function(P){let z=P.material;if(z)if(Array.isArray(z))for(let B=0;B<z.length;B++){let X=z[B];re(X,A,P),C.add(X)}else re(z,A,P),C.add(z)}),R.pop(),p=null,C},this.compileAsync=function(m,w,A=null){let C=this.compile(m,w,A);return new Promise(P=>{function z(){if(C.forEach(function(B){Wt.get(B).currentProgram.isReady()&&C.delete(B)}),C.size===0){P(m);return}setTimeout(z,10)}Ct.get("KHR_parallel_shader_compile")!==null?z():setTimeout(z,10)})};let ae=null;function me(m){ae&&ae(m)}function Ee(){Ae.stop()}function oe(){Ae.start()}let Ae=new Tl;Ae.setAnimationLoop(me),typeof self<"u"&&Ae.setContext(self),this.setAnimationLoop=function(m){ae=m,Xt.setAnimationLoop(m),m===null?Ae.stop():Ae.start()},Xt.addEventListener("sessionstart",Ee),Xt.addEventListener("sessionend",oe),this.render=function(m,w){if(w!==void 0&&w.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(w),w=Xt.getCamera()),m.isScene===!0&&m.onBeforeRender(M,m,w,L),p=Nt.get(m,R.length),p.init(),R.push(p),St.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),Y.setFromProjectionMatrix(St),vt=this.localClippingEnabled,nt=Gt.init(this.clippingPlanes,vt),x=wt.get(m,u.length),x.init(),u.push(x),Xe(m,w,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(J,$),this.info.render.frame++,nt===!0&&Gt.beginShadows();let A=p.state.shadowsArray;if(rt.render(A,m,w),nt===!0&&Gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ie.render(x,m),p.setupLights(M._useLegacyLights),w.isArrayCamera){let C=w.cameras;for(let P=0,z=C.length;P<z;P++){let B=C[P];kn(x,m,B,B.viewport)}}else kn(x,m,w);L!==null&&(E.updateMultisampleRenderTarget(L),E.updateRenderTargetMipmap(L)),m.isScene===!0&&m.onAfterRender(M,m,w),Ft.resetDefaultState(),K=-1,b=null,R.pop(),R.length>0?p=R[R.length-1]:p=null,u.pop(),u.length>0?x=u[u.length-1]:x=null};function Xe(m,w,A,C){if(m.visible===!1)return;if(m.layers.test(w.layers)){if(m.isGroup)A=m.renderOrder;else if(m.isLOD)m.autoUpdate===!0&&m.update(w);else if(m.isLight)p.pushLight(m),m.castShadow&&p.pushShadow(m);else if(m.isSprite){if(!m.frustumCulled||Y.intersectsSprite(m)){C&&Ht.setFromMatrixPosition(m.matrixWorld).applyMatrix4(St);let B=lt.update(m),X=m.material;X.visible&&x.push(m,B,X,A,Ht.z,null)}}else if((m.isMesh||m.isLine||m.isPoints)&&(!m.frustumCulled||Y.intersectsObject(m))){let B=lt.update(m),X=m.material;if(C&&(m.boundingSphere!==void 0?(m.boundingSphere===null&&m.computeBoundingSphere(),Ht.copy(m.boundingSphere.center)):(B.boundingSphere===null&&B.computeBoundingSphere(),Ht.copy(B.boundingSphere.center)),Ht.applyMatrix4(m.matrixWorld).applyMatrix4(St)),Array.isArray(X)){let tt=B.groups;for(let it=0,ct=tt.length;it<ct;it++){let ut=tt[it],pt=X[ut.materialIndex];pt&&pt.visible&&x.push(m,B,pt,A,Ht.z,ut)}}else X.visible&&x.push(m,B,X,A,Ht.z,null)}}let z=m.children;for(let B=0,X=z.length;B<X;B++)Xe(z[B],w,A,C)}function kn(m,w,A,C){let P=m.opaque,z=m.transmissive,B=m.transparent;p.setupLightsView(A),nt===!0&&Gt.setGlobalState(M.clippingPlanes,A),z.length>0&&sr(P,z,w,A),C&&At.viewport(T.copy(C)),P.length>0&&rn(P,w,A),z.length>0&&rn(z,w,A),B.length>0&&rn(B,w,A),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function sr(m,w,A,C){if((A.isScene===!0?A.overrideMaterial:null)!==null)return;let z=Bt.isWebGL2;dt===null&&(dt=new Sn(1,1,{generateMipmaps:!0,type:Ct.has("EXT_color_buffer_half_float")?on:On,minFilter:Ti,samples:z?4:0})),M.getDrawingBufferSize(It),z?dt.setSize(It.x,It.y):dt.setSize(Wr(It.x),Wr(It.y));let B=M.getRenderTarget();M.setRenderTarget(dt),M.getClearColor(ht),O=M.getClearAlpha(),O<1&&M.setClearColor(16777215,.5),M.clear();let X=M.toneMapping;M.toneMapping=Dn,rn(m,A,C),E.updateMultisampleRenderTarget(dt),E.updateRenderTargetMipmap(dt);let tt=!1;for(let it=0,ct=w.length;it<ct;it++){let ut=w[it],pt=ut.object,yt=ut.geometry,Tt=ut.material,te=ut.group;if(Tt.side===xn&&pt.layers.test(C.layers)){let zt=Tt.side;Tt.side=Be,Tt.needsUpdate=!0,An(pt,A,C,yt,Tt,te),Tt.side=zt,Tt.needsUpdate=!0,tt=!0}}tt===!0&&(E.updateMultisampleRenderTarget(dt),E.updateRenderTargetMipmap(dt)),M.setRenderTarget(B),M.setClearColor(ht,O),M.toneMapping=X}function rn(m,w,A){let C=w.isScene===!0?w.overrideMaterial:null;for(let P=0,z=m.length;P<z;P++){let B=m[P],X=B.object,tt=B.geometry,it=C===null?B.material:C,ct=B.group;X.layers.test(A.layers)&&An(X,w,A,tt,it,ct)}}function An(m,w,A,C,P,z){m.onBeforeRender(M,w,A,C,P,z),m.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,m.matrixWorld),m.normalMatrix.getNormalMatrix(m.modelViewMatrix),P.onBeforeRender(M,w,A,C,m,z),P.transparent===!0&&P.side===xn&&P.forceSinglePass===!1?(P.side=Be,P.needsUpdate=!0,M.renderBufferDirect(A,w,C,P,m,z),P.side=Fn,P.needsUpdate=!0,M.renderBufferDirect(A,w,C,P,m,z),P.side=xn):M.renderBufferDirect(A,w,C,P,m,z),m.onAfterRender(M,w,A,C,P,z)}function qt(m,w,A){w.isScene!==!0&&(w=Dt);let C=Wt.get(m),P=p.state.lights,z=p.state.shadowsArray,B=P.state.version,X=Et.getParameters(m,P.state,z,w,A),tt=Et.getProgramCacheKey(X),it=C.programs;C.environment=m.isMeshStandardMaterial?w.environment:null,C.fog=w.fog,C.envMap=(m.isMeshStandardMaterial?V:y).get(m.envMap||C.environment),it===void 0&&(m.addEventListener("dispose",_t),it=new Map,C.programs=it);let ct=it.get(tt);if(ct!==void 0){if(C.currentProgram===ct&&C.lightsStateVersion===B)return ts(m,X),ct}else X.uniforms=Et.getUniforms(m),m.onBuild(A,X,M),m.onBeforeCompile(X,M),ct=Et.acquireProgram(X,tt),it.set(tt,ct),C.uniforms=X.uniforms;let ut=C.uniforms;return(!m.isShaderMaterial&&!m.isRawShaderMaterial||m.clipping===!0)&&(ut.clippingPlanes=Gt.uniform),ts(m,X),C.needsLights=I(m),C.lightsStateVersion=B,C.needsLights&&(ut.ambientLightColor.value=P.state.ambient,ut.lightProbe.value=P.state.probe,ut.directionalLights.value=P.state.directional,ut.directionalLightShadows.value=P.state.directionalShadow,ut.spotLights.value=P.state.spot,ut.spotLightShadows.value=P.state.spotShadow,ut.rectAreaLights.value=P.state.rectArea,ut.ltc_1.value=P.state.rectAreaLTC1,ut.ltc_2.value=P.state.rectAreaLTC2,ut.pointLights.value=P.state.point,ut.pointLightShadows.value=P.state.pointShadow,ut.hemisphereLights.value=P.state.hemi,ut.directionalShadowMap.value=P.state.directionalShadowMap,ut.directionalShadowMatrix.value=P.state.directionalShadowMatrix,ut.spotShadowMap.value=P.state.spotShadowMap,ut.spotLightMatrix.value=P.state.spotLightMatrix,ut.spotLightMap.value=P.state.spotLightMap,ut.pointShadowMap.value=P.state.pointShadowMap,ut.pointShadowMatrix.value=P.state.pointShadowMatrix),C.currentProgram=ct,C.uniformsList=null,ct}function Ui(m){if(m.uniformsList===null){let w=m.currentProgram.getUniforms();m.uniformsList=wi.seqWithValue(w.seq,m.uniforms)}return m.uniformsList}function ts(m,w){let A=Wt.get(m);A.outputColorSpace=w.outputColorSpace,A.batching=w.batching,A.instancing=w.instancing,A.instancingColor=w.instancingColor,A.skinning=w.skinning,A.morphTargets=w.morphTargets,A.morphNormals=w.morphNormals,A.morphColors=w.morphColors,A.morphTargetsCount=w.morphTargetsCount,A.numClippingPlanes=w.numClippingPlanes,A.numIntersection=w.numClipIntersection,A.vertexAlphas=w.vertexAlphas,A.vertexTangents=w.vertexTangents,A.toneMapping=w.toneMapping}function _(m,w,A,C,P){w.isScene!==!0&&(w=Dt),E.resetTextureUnits();let z=w.fog,B=C.isMeshStandardMaterial?w.environment:null,X=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ze,tt=(C.isMeshStandardMaterial?V:y).get(C.envMap||B),it=C.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,ct=!!A.attributes.tangent&&(!!C.normalMap||C.anisotropy>0),ut=!!A.morphAttributes.position,pt=!!A.morphAttributes.normal,yt=!!A.morphAttributes.color,Tt=Dn;C.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Tt=M.toneMapping);let te=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,zt=te!==void 0?te.length:0,Pt=Wt.get(C),se=p.state.lights;if(nt===!0&&(vt===!0||m!==b)){let pe=m===b&&C.id===K;Gt.setState(C,m,pe)}let Rt=!1;C.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==se.state.version||Pt.outputColorSpace!==X||P.isBatchedMesh&&Pt.batching===!1||!P.isBatchedMesh&&Pt.batching===!0||P.isInstancedMesh&&Pt.instancing===!1||!P.isInstancedMesh&&Pt.instancing===!0||P.isSkinnedMesh&&Pt.skinning===!1||!P.isSkinnedMesh&&Pt.skinning===!0||P.isInstancedMesh&&Pt.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Pt.instancingColor===!1&&P.instanceColor!==null||Pt.envMap!==tt||C.fog===!0&&Pt.fog!==z||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Gt.numPlanes||Pt.numIntersection!==Gt.numIntersection)||Pt.vertexAlphas!==it||Pt.vertexTangents!==ct||Pt.morphTargets!==ut||Pt.morphNormals!==pt||Pt.morphColors!==yt||Pt.toneMapping!==Tt||Bt.isWebGL2===!0&&Pt.morphTargetsCount!==zt)&&(Rt=!0):(Rt=!0,Pt.__version=C.version);let ce=Pt.currentProgram;Rt===!0&&(ce=qt(C,w,P));let Le=!1,fe=!1,jt=!1,kt=ce.getUniforms(),Te=Pt.uniforms;if(At.useProgram(ce.program)&&(Le=!0,fe=!0,jt=!0),C.id!==K&&(K=C.id,fe=!0),Le||b!==m){kt.setValue(k,"projectionMatrix",m.projectionMatrix),kt.setValue(k,"viewMatrix",m.matrixWorldInverse);let pe=kt.map.cameraPosition;pe!==void 0&&pe.setValue(k,Ht.setFromMatrixPosition(m.matrixWorld)),Bt.logarithmicDepthBuffer&&kt.setValue(k,"logDepthBufFC",2/(Math.log(m.far+1)/Math.LN2)),(C.isMeshPhongMaterial||C.isMeshToonMaterial||C.isMeshLambertMaterial||C.isMeshBasicMaterial||C.isMeshStandardMaterial||C.isShaderMaterial)&&kt.setValue(k,"isOrthographic",m.isOrthographicCamera===!0),b!==m&&(b=m,fe=!0,jt=!0)}if(P.isSkinnedMesh){kt.setOptional(k,P,"bindMatrix"),kt.setOptional(k,P,"bindMatrixInverse");let pe=P.skeleton;pe&&(Bt.floatVertexTextures?(pe.boneTexture===null&&pe.computeBoneTexture(),kt.setValue(k,"boneTexture",pe.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}P.isBatchedMesh&&(kt.setOptional(k,P,"batchingTexture"),kt.setValue(k,"batchingTexture",P._matricesTexture,E));let hn=A.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0&&Bt.isWebGL2===!0)&&Zt.update(P,A,ce),(fe||Pt.receiveShadow!==P.receiveShadow)&&(Pt.receiveShadow=P.receiveShadow,kt.setValue(k,"receiveShadow",P.receiveShadow)),C.isMeshGouraudMaterial&&C.envMap!==null&&(Te.envMap.value=tt,Te.flipEnvMap.value=tt.isCubeTexture&&tt.isRenderTargetTexture===!1?-1:1),fe&&(kt.setValue(k,"toneMappingExposure",M.toneMappingExposure),Pt.needsLights&&S(Te,jt),z&&C.fog===!0&&xt.refreshFogUniforms(Te,z),xt.refreshMaterialUniforms(Te,C,et,Z,dt),wi.upload(k,Ui(Pt),Te,E)),C.isShaderMaterial&&C.uniformsNeedUpdate===!0&&(wi.upload(k,Ui(Pt),Te,E),C.uniformsNeedUpdate=!1),C.isSpriteMaterial&&kt.setValue(k,"center",P.center),kt.setValue(k,"modelViewMatrix",P.modelViewMatrix),kt.setValue(k,"normalMatrix",P.normalMatrix),kt.setValue(k,"modelMatrix",P.matrixWorld),C.isShaderMaterial||C.isRawShaderMaterial){let pe=C.uniformsGroups;for(let Tn=0,jl=pe.length;Tn<jl;Tn++)if(Bt.isWebGL2){let Ba=pe[Tn];Vt.update(Ba,ce),Vt.bind(Ba,ce)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ce}function S(m,w){m.ambientLightColor.needsUpdate=w,m.lightProbe.needsUpdate=w,m.directionalLights.needsUpdate=w,m.directionalLightShadows.needsUpdate=w,m.pointLights.needsUpdate=w,m.pointLightShadows.needsUpdate=w,m.spotLights.needsUpdate=w,m.spotLightShadows.needsUpdate=w,m.rectAreaLights.needsUpdate=w,m.hemisphereLights.needsUpdate=w}function I(m){return m.isMeshLambertMaterial||m.isMeshToonMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isShadowMaterial||m.isShaderMaterial&&m.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(m,w,A){Wt.get(m.texture).__webglTexture=w,Wt.get(m.depthTexture).__webglTexture=A;let C=Wt.get(m);C.__hasExternalTextures=!0,C.__hasExternalTextures&&(C.__autoAllocateDepthBuffer=A===void 0,C.__autoAllocateDepthBuffer||Ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),C.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(m,w){let A=Wt.get(m);A.__webglFramebuffer=w,A.__useDefaultFramebuffer=w===void 0},this.setRenderTarget=function(m,w=0,A=0){L=m,F=w,D=A;let C=!0,P=null,z=!1,B=!1;if(m){let tt=Wt.get(m);tt.__useDefaultFramebuffer!==void 0?(At.bindFramebuffer(k.FRAMEBUFFER,null),C=!1):tt.__webglFramebuffer===void 0?E.setupRenderTarget(m):tt.__hasExternalTextures&&E.rebindTextures(m,Wt.get(m.texture).__webglTexture,Wt.get(m.depthTexture).__webglTexture);let it=m.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(B=!0);let ct=Wt.get(m).__webglFramebuffer;m.isWebGLCubeRenderTarget?(Array.isArray(ct[w])?P=ct[w][A]:P=ct[w],z=!0):Bt.isWebGL2&&m.samples>0&&E.useMultisampledRTT(m)===!1?P=Wt.get(m).__webglMultisampledFramebuffer:Array.isArray(ct)?P=ct[A]:P=ct,T.copy(m.viewport),q.copy(m.scissor),j=m.scissorTest}else T.copy(Q).multiplyScalar(et).floor(),q.copy(at).multiplyScalar(et).floor(),j=ft;if(At.bindFramebuffer(k.FRAMEBUFFER,P)&&Bt.drawBuffers&&C&&At.drawBuffers(m,P),At.viewport(T),At.scissor(q),At.setScissorTest(j),z){let tt=Wt.get(m.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+w,tt.__webglTexture,A)}else if(B){let tt=Wt.get(m.texture),it=w||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,tt.__webglTexture,A||0,it)}K=-1},this.readRenderTargetPixels=function(m,w,A,C,P,z,B){if(!(m&&m.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let X=Wt.get(m).__webglFramebuffer;if(m.isWebGLCubeRenderTarget&&B!==void 0&&(X=X[B]),X){At.bindFramebuffer(k.FRAMEBUFFER,X);try{let tt=m.texture,it=tt.format,ct=tt.type;if(it!==De&&bt.convert(it)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let ut=ct===on&&(Ct.has("EXT_color_buffer_half_float")||Bt.isWebGL2&&Ct.has("EXT_color_buffer_float"));if(ct!==On&&bt.convert(ct)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ct===Ye&&(Bt.isWebGL2||Ct.has("OES_texture_float")||Ct.has("WEBGL_color_buffer_float")))&&!ut){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=m.width-C&&A>=0&&A<=m.height-P&&k.readPixels(w,A,C,P,bt.convert(it),bt.convert(ct),z)}finally{let tt=L!==null?Wt.get(L).__webglFramebuffer:null;At.bindFramebuffer(k.FRAMEBUFFER,tt)}}},this.copyFramebufferToTexture=function(m,w,A=0){let C=Math.pow(2,-A),P=Math.floor(w.image.width*C),z=Math.floor(w.image.height*C);E.setTexture2D(w,0),k.copyTexSubImage2D(k.TEXTURE_2D,A,0,0,m.x,m.y,P,z),At.unbindTexture()},this.copyTextureToTexture=function(m,w,A,C=0){let P=w.image.width,z=w.image.height,B=bt.convert(A.format),X=bt.convert(A.type);E.setTexture2D(A,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,A.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,A.unpackAlignment),w.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,C,m.x,m.y,P,z,B,X,w.image.data):w.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,C,m.x,m.y,w.mipmaps[0].width,w.mipmaps[0].height,B,w.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,C,m.x,m.y,B,X,w.image),C===0&&A.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(m,w,A,C,P=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let z=m.max.x-m.min.x+1,B=m.max.y-m.min.y+1,X=m.max.z-m.min.z+1,tt=bt.convert(C.format),it=bt.convert(C.type),ct;if(C.isData3DTexture)E.setTexture3D(C,0),ct=k.TEXTURE_3D;else if(C.isDataArrayTexture||C.isCompressedArrayTexture)E.setTexture2DArray(C,0),ct=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,C.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,C.unpackAlignment);let ut=k.getParameter(k.UNPACK_ROW_LENGTH),pt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),yt=k.getParameter(k.UNPACK_SKIP_PIXELS),Tt=k.getParameter(k.UNPACK_SKIP_ROWS),te=k.getParameter(k.UNPACK_SKIP_IMAGES),zt=A.isCompressedTexture?A.mipmaps[P]:A.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,zt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,zt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,m.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,m.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,m.min.z),A.isDataTexture||A.isData3DTexture?k.texSubImage3D(ct,P,w.x,w.y,w.z,z,B,X,tt,it,zt.data):A.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(ct,P,w.x,w.y,w.z,z,B,X,tt,zt.data)):k.texSubImage3D(ct,P,w.x,w.y,w.z,z,B,X,tt,it,zt),k.pixelStorei(k.UNPACK_ROW_LENGTH,ut),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,pt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,yt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Tt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,te),P===0&&C.generateMipmaps&&k.generateMipmap(ct),At.unbindTexture()},this.initTexture=function(m){m.isCubeTexture?E.setTextureCube(m,0):m.isData3DTexture?E.setTexture3D(m,0):m.isDataArrayTexture||m.isCompressedArrayTexture?E.setTexture2DArray(m,0):E.setTexture2D(m,0),At.unbindTexture()},this.resetState=function(){F=0,D=0,L=null,At.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Aa?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===js?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===_e?Jn:Ml}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Jn?_e:ze}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},oa=class extends qi{};oa.prototype.isWebGL1Renderer=!0;var Ws=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var Yi=class extends We{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Re,h=Re,f,d){super(null,o,a,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xs=class extends We{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qs=class i extends zn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],f=new H,d=new H,g=[],v=[],x=[],p=[];for(let u=0;u<=n;u++){let R=[],M=u/n,U=0;u===0&&o===0?U=.5/e:u===n&&l===Math.PI&&(U=-.5/e);for(let F=0;F<=e;F++){let D=F/e;f.x=-t*Math.cos(s+D*r)*Math.sin(o+M*a),f.y=t*Math.cos(o+M*a),f.z=t*Math.sin(s+D*r)*Math.sin(o+M*a),v.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),p.push(D+U,1-M),R.push(c++)}h.push(R)}for(let u=0;u<n;u++)for(let R=0;R<e;R++){let M=h[u][R+1],U=h[u][R],F=h[u+1][R],D=h[u+1][R+1];(u!==0||o>0)&&g.push(M,U,D),(u!==n-1||l<Math.PI)&&g.push(U,F,D)}this.setIndex(g),this.setAttribute("position",new $e(v,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var la=class extends jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sl,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ys=class extends la{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ie(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function bs(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Zp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ca=class extends Ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vo,endingEnd:vo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case xo:r=t,a=2*e-n;break;case yo:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case xo:o=t,l=2*n-e;break;case yo:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,g=this._weightNext,v=(n-e)/(s-e),x=v*v,p=x*v,u=-d*p+2*d*x-d*v,R=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*v+1,M=(-1-g)*p+(1.5+g)*x+.5*v,U=g*p-g*x;for(let F=0;F!==a;++F)r[F]=u*o[h+F]+R*o[c+F]+M*o[l+F]+U*o[f+F];return r}},ha=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),f=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*f+o[l+d]*h;return r}},ua=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},en=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=bs(e,this.TimeBufferType),this.values=bs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:bs(t.times,Array),values:bs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ca(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Es:e=this.InterpolantFactoryMethodDiscrete;break;case As:e=this.InterpolantFactoryMethodLinear;break;case ur:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return As;case this.InterpolantFactoryMethodSmooth:return ur}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Zp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ur,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let f=a*n,d=f-n,g=f+n;for(let v=0;v!==n;++v){let x=e[f+v];if(x!==e[d+v]||x!==e[g+v]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*n,d=o*n;for(let g=0;g!==n;++g)e[d+g]=e[f+g]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=As;var ti=class extends en{};ti.prototype.ValueTypeName="bool";ti.prototype.ValueBufferType=Array;ti.prototype.DefaultInterpolation=Es;ti.prototype.InterpolantFactoryMethodLinear=void 0;ti.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends en{};fa.prototype.ValueTypeName="color";var da=class extends en{};da.prototype.ValueTypeName="number";var pa=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ln.slerpFlat(r,0,o,c-a,o,c,l);return r}},Zi=class extends en{InterpolantFactoryMethodLinear(t){return new pa(this.times,this.values,this.getValueSize(),t)}};Zi.prototype.ValueTypeName="quaternion";Zi.prototype.DefaultInterpolation=As;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var ei=class extends en{};ei.prototype.ValueTypeName="string";ei.prototype.ValueBufferType=Array;ei.prototype.DefaultInterpolation=Es;ei.prototype.InterpolantFactoryMethodLinear=void 0;ei.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends en{};ma.prototype.ValueTypeName="vector";var ll={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ga=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=c.length;f<d;f+=2){let g=c[f],v=c[f+1];if(g.global&&(g.lastIndex=0),g.test(h))return v}return null}}},Kp=new ga,Ki=class{constructor(t){this.manager=t!==void 0?t:Kp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ki.DEFAULT_MATERIAL_NAME="__DEFAULT";var gn={},_a=class extends Error{constructor(t,e){super(t),this.response=e}},va=class extends Ki{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=ll.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(gn[t]!==void 0){gn[t].push({onLoad:e,onProgress:n,onError:s});return}gn[t]=[],gn[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=gn[t],f=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),g=d?parseInt(d):0,v=g!==0,x=0,p=new ReadableStream({start(u){R();function R(){f.read().then(({done:M,value:U})=>{if(M)u.close();else{x+=U.byteLength;let F=new ProgressEvent("progress",{lengthComputable:v,loaded:x,total:g});for(let D=0,L=h.length;D<L;D++){let K=h[D];K.onProgress&&K.onProgress(F)}u.enqueue(U),R()}})}}});return new Response(p)}else throw new _a(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let f=/charset="?([^;"\s]*)"?/i.exec(a),d=f&&f[1]?f[1].toLowerCase():void 0,g=new TextDecoder(d);return c.arrayBuffer().then(v=>g.decode(v))}}}).then(c=>{ll.add(t,c);let h=gn[t];delete gn[t];for(let f=0,d=h.length;f<d;f++){let g=h[f];g.onLoad&&g.onLoad(c)}}).catch(c=>{let h=gn[t];if(h===void 0)throw this.manager.itemError(t),c;delete gn[t];for(let f=0,d=h.length;f<d;f++){let g=h[f];g.onError&&g.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}};var Zs=class extends Ki{constructor(t){super(t)}load(t,e,n,s){let r=this,o=new Yi,a=new va(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(l){let c;try{c=r.parse(l)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Ve,o.wrapT=c.wrapT!==void 0?c.wrapT:Ve,o.magFilter=c.magFilter!==void 0?c.magFilter:ve,o.minFilter=c.minFilter!==void 0?c.minFilter:ve,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?o.colorSpace=c.colorSpace:c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Ti),c.mipmapCount===1&&(o.minFilter=ve),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,e&&e(o,c)},n,s),o}};var Ks=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}};var Or=new we,cl=new H,hl=new H,xa=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xi,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;cl.setFromMatrixPosition(t.matrixWorld),e.position.copy(cl),hl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hl),e.updateMatrixWorld(),Or.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Or),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Or)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var ya=class extends xa{constructor(){super(new Hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$s=class extends Ks{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new ya}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Js=class extends Ks{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ca="\\[\\]\\.:\\/",$p=new RegExp("["+Ca+"]","g"),Pa="[^"+Ca+"]",Jp="[^"+Ca.replace("\\.","")+"]",Qp=/((?:WC+[\/:])*)/.source.replace("WC",Pa),jp=/(WCOD+)?/.source.replace("WCOD",Jp),tm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Pa),em=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Pa),nm=new RegExp("^"+Qp+jp+tm+em+"$"),im=["material","materials","bones","map"],Ma=class{constructor(t,e,n){let s=n||de.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},de=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($p,"")}static parseTrackName(t){let e=nm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);im.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};de.Composite=Ma;de.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};de.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};de.prototype.GetterByBindingType=[de.prototype._getValue_direct,de.prototype._getValue_array,de.prototype._getValue_arrayElement,de.prototype._getValue_toArray];de.prototype.SetterByBindingTypeAndVersioning=[[de.prototype._setValue_direct,de.prototype._setValue_direct_setNeedsUpdate,de.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[de.prototype._setValue_array,de.prototype._setValue_array_setNeedsUpdate,de.prototype._setValue_array_setMatrixWorldNeedsUpdate],[de.prototype._setValue_arrayElement,de.prototype._setValue_arrayElement_setNeedsUpdate,de.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[de.prototype._setValue_fromArray,de.prototype._setValue_fromArray_setNeedsUpdate,de.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wm=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sa);var Nl=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))},rm=function(i){return new Worker(i)};try{URL.revokeObjectURL(Nl(""))}catch{Nl=function(t){return"data:application/javascript;charset=UTF-8,"+encodeURI(t)},rm=function(t){return new Worker(t,{type:"module"})}}var Je=Uint8Array,Gn=Uint16Array,Na=Uint32Array,Ul=new Je([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Dl=new Je([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),am=new Je([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ol=function(i,t){for(var e=new Gn(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new Na(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return[e,s]},Fl=Ol(Ul,2),Bl=Fl[0],om=Fl[1];Bl[28]=258,om[258]=28;var zl=Ol(Dl,0),lm=zl[0],Em=zl[1],Ua=new Gn(32768);for(ne=0;ne<32768;++ne)wn=(ne&43690)>>>1|(ne&21845)<<1,wn=(wn&52428)>>>2|(wn&13107)<<2,wn=(wn&61680)>>>4|(wn&3855)<<4,Ua[ne]=((wn&65280)>>>8|(wn&255)<<8)>>>1;var wn,ne,Ji=function(i,t,e){for(var n=i.length,s=0,r=new Gn(t);s<n;++s)++r[i[s]-1];var o=new Gn(t);for(s=0;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new Gn(1<<t);var l=15-t;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=t-i[s],f=o[i[s]-1]++<<h,d=f|(1<<h)-1;f<=d;++f)a[Ua[f]>>>l]=c}else for(a=new Gn(n),s=0;s<n;++s)i[s]&&(a[s]=Ua[o[i[s]-1]++]>>>15-i[s]);return a},Qi=new Je(288);for(ne=0;ne<144;++ne)Qi[ne]=8;var ne;for(ne=144;ne<256;++ne)Qi[ne]=9;var ne;for(ne=256;ne<280;++ne)Qi[ne]=7;var ne;for(ne=280;ne<288;++ne)Qi[ne]=8;var ne,Gl=new Je(32);for(ne=0;ne<32;++ne)Gl[ne]=5;var ne;var cm=Ji(Qi,9,1);var hm=Ji(Gl,5,1),Ia=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},nn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},La=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},um=function(i){return(i/8|0)+(i&7&&1)},fm=function(i,t,e){(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length);var n=new(i instanceof Gn?Gn:i instanceof Na?Na:Je)(e-t);return n.set(i.subarray(t,e)),n},dm=function(i,t,e){var n=i.length;if(!n||e&&!e.l&&n<5)return t||new Je(0);var s=!t||e,r=!e||e.i;e||(e={}),t||(t=new Je(n*3));var o=function(dt){var St=t.length;if(dt>St){var It=new Je(Math.max(St*2,dt));It.set(t),t=It}},a=e.f||0,l=e.p||0,c=e.b||0,h=e.l,f=e.d,d=e.m,g=e.n,v=n*8;do{if(!h){e.f=a=nn(i,l,1);var x=nn(i,l+1,3);if(l+=3,x)if(x==1)h=cm,f=hm,d=9,g=5;else if(x==2){var M=nn(i,l,31)+257,U=nn(i,l+10,15)+4,F=M+nn(i,l+5,31)+1;l+=14;for(var D=new Je(F),L=new Je(19),K=0;K<U;++K)L[am[K]]=nn(i,l+K*3,7);l+=U*3;for(var b=Ia(L),T=(1<<b)-1,q=Ji(L,b,1),K=0;K<F;){var j=q[nn(i,l,T)];l+=j&15;var p=j>>>4;if(p<16)D[K++]=p;else{var ht=0,O=0;for(p==16?(O=3+nn(i,l,3),l+=2,ht=D[K-1]):p==17?(O=3+nn(i,l,7),l+=3):p==18&&(O=11+nn(i,l,127),l+=7);O--;)D[K++]=ht}}var W=D.subarray(0,M),Z=D.subarray(M);d=Ia(W),g=Ia(Z),h=Ji(W,d,1),f=Ji(Z,g,1)}else throw"invalid block type";else{var p=um(l)+4,u=i[p-4]|i[p-3]<<8,R=p+u;if(R>n){if(r)throw"unexpected EOF";break}s&&o(c+u),t.set(i.subarray(p,R),c),e.b=c+=u,e.p=l=R*8;continue}if(l>v){if(r)throw"unexpected EOF";break}}s&&o(c+131072);for(var et=(1<<d)-1,J=(1<<g)-1,$=l;;$=l){var ht=h[La(i,l)&et],Q=ht>>>4;if(l+=ht&15,l>v){if(r)throw"unexpected EOF";break}if(!ht)throw"invalid length/literal";if(Q<256)t[c++]=Q;else if(Q==256){$=l,h=null;break}else{var at=Q-254;if(Q>264){var K=Q-257,ft=Ul[K];at=nn(i,l,(1<<ft)-1)+Bl[K],l+=ft}var Y=f[La(i,l)&J],nt=Y>>>4;if(!Y)throw"invalid distance";l+=Y&15;var Z=lm[nt];if(nt>3){var ft=Dl[nt];Z+=La(i,l)&(1<<ft)-1,l+=ft}if(l>v){if(r)throw"unexpected EOF";break}s&&o(c+131072);for(var vt=c+at;c<vt;c+=4)t[c]=t[c-Z],t[c+1]=t[c+1-Z],t[c+2]=t[c+2-Z],t[c+3]=t[c+3-Z];c=vt}}e.l=h,e.p=$,e.b=c,h&&(a=1,e.m=d,e.d=f,e.n=g)}while(!a);return c==t.length?t:fm(t,0,c)};var pm=new Je(0);var mm=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function ji(i,t){return dm((mm(i),i.subarray(2,-4)),t)}var gm=typeof TextDecoder<"u"&&new TextDecoder,_m=0;try{gm.decode(pm,{stream:!0}),_m=1}catch{}var er=class extends Zs{constructor(t){super(t),this.type=on}parse(t){let b=Math.pow(2.7182818,2.2);function T(_,S){let I=0;for(let w=0;w<65536;++w)(w==0||_[w>>3]&1<<(w&7))&&(S[I++]=w);let m=I-1;for(;I<65536;)S[I++]=0;return m}function q(_){for(let S=0;S<16384;S++)_[S]={},_[S].len=0,_[S].lit=0,_[S].p=null}let j={l:0,c:0,lc:0};function ht(_,S,I,m,w){for(;I<_;)S=S<<8|bt(m,w),I+=8;I-=_,j.l=S>>I&(1<<_)-1,j.c=S,j.lc=I}let O=new Array(59);function W(_){for(let I=0;I<=58;++I)O[I]=0;for(let I=0;I<65537;++I)O[_[I]]+=1;let S=0;for(let I=58;I>0;--I){let m=S+O[I]>>1;O[I]=S,S=m}for(let I=0;I<65537;++I){let m=_[I];m>0&&(_[I]=m|O[m]++<<6)}}function Z(_,S,I,m,w,A){let C=S,P=0,z=0;for(;m<=w;m++){if(C.value-S.value>I)return!1;ht(6,P,z,_,C);let B=j.l;if(P=j.c,z=j.lc,A[m]=B,B==63){if(C.value-S.value>I)throw new Error("Something wrong with hufUnpackEncTable");ht(8,P,z,_,C);let X=j.l+6;if(P=j.c,z=j.lc,m+X>w+1)throw new Error("Something wrong with hufUnpackEncTable");for(;X--;)A[m++]=0;m--}else if(B>=59){let X=B-59+2;if(m+X>w+1)throw new Error("Something wrong with hufUnpackEncTable");for(;X--;)A[m++]=0;m--}}W(A)}function et(_){return _&63}function J(_){return _>>6}function $(_,S,I,m){for(;S<=I;S++){let w=J(_[S]),A=et(_[S]);if(w>>A)throw new Error("Invalid table entry");if(A>14){let C=m[w>>A-14];if(C.len)throw new Error("Invalid table entry");if(C.lit++,C.p){let P=C.p;C.p=new Array(C.lit);for(let z=0;z<C.lit-1;++z)C.p[z]=P[z]}else C.p=new Array(1);C.p[C.lit-1]=S}else if(A){let C=0;for(let P=1<<14-A;P>0;P--){let z=m[(w<<14-A)+C];if(z.len||z.p)throw new Error("Invalid table entry");z.len=A,z.lit=S,C++}}}return!0}let Q={c:0,lc:0};function at(_,S,I,m){_=_<<8|bt(I,m),S+=8,Q.c=_,Q.lc=S}let ft={c:0,lc:0};function Y(_,S,I,m,w,A,C,P,z){if(_==S){m<8&&(at(I,m,w,A),I=Q.c,m=Q.lc),m-=8;let B=I>>m;if(B=new Uint8Array([B])[0],P.value+B>z)return!1;let X=C[P.value-1];for(;B-- >0;)C[P.value++]=X}else if(P.value<z)C[P.value++]=_;else return!1;ft.c=I,ft.lc=m}function nt(_){return _&65535}function vt(_){let S=nt(_);return S>32767?S-65536:S}let dt={a:0,b:0};function St(_,S){let I=vt(_),w=vt(S),A=I+(w&1)+(w>>1),C=A,P=A-w;dt.a=C,dt.b=P}function It(_,S){let I=nt(_),m=nt(S),w=I-(m>>1)&65535,A=m+w-32768&65535;dt.a=A,dt.b=w}function Ht(_,S,I,m,w,A,C){let P=C<16384,z=I>w?w:I,B=1,X,tt;for(;B<=z;)B<<=1;for(B>>=1,X=B,B>>=1;B>=1;){tt=0;let it=tt+A*(w-X),ct=A*B,ut=A*X,pt=m*B,yt=m*X,Tt,te,zt,Pt;for(;tt<=it;tt+=ut){let se=tt,Rt=tt+m*(I-X);for(;se<=Rt;se+=yt){let ce=se+pt,Le=se+ct,fe=Le+pt;P?(St(_[se+S],_[Le+S]),Tt=dt.a,zt=dt.b,St(_[ce+S],_[fe+S]),te=dt.a,Pt=dt.b,St(Tt,te),_[se+S]=dt.a,_[ce+S]=dt.b,St(zt,Pt),_[Le+S]=dt.a,_[fe+S]=dt.b):(It(_[se+S],_[Le+S]),Tt=dt.a,zt=dt.b,It(_[ce+S],_[fe+S]),te=dt.a,Pt=dt.b,It(Tt,te),_[se+S]=dt.a,_[ce+S]=dt.b,It(zt,Pt),_[Le+S]=dt.a,_[fe+S]=dt.b)}if(I&B){let ce=se+ct;P?St(_[se+S],_[ce+S]):It(_[se+S],_[ce+S]),Tt=dt.a,_[ce+S]=dt.b,_[se+S]=Tt}}if(w&B){let se=tt,Rt=tt+m*(I-X);for(;se<=Rt;se+=yt){let ce=se+pt;P?St(_[se+S],_[ce+S]):It(_[se+S],_[ce+S]),Tt=dt.a,_[ce+S]=dt.b,_[se+S]=Tt}}X=B,B>>=1}return tt}function Dt(_,S,I,m,w,A,C,P,z){let B=0,X=0,tt=C,it=Math.trunc(m.value+(w+7)/8);for(;m.value<it;)for(at(B,X,I,m),B=Q.c,X=Q.lc;X>=14;){let ut=B>>X-14&16383,pt=S[ut];if(pt.len)X-=pt.len,Y(pt.lit,A,B,X,I,m,P,z,tt),B=ft.c,X=ft.lc;else{if(!pt.p)throw new Error("hufDecode issues");let yt;for(yt=0;yt<pt.lit;yt++){let Tt=et(_[pt.p[yt]]);for(;X<Tt&&m.value<it;)at(B,X,I,m),B=Q.c,X=Q.lc;if(X>=Tt&&J(_[pt.p[yt]])==(B>>X-Tt&(1<<Tt)-1)){X-=Tt,Y(pt.p[yt],A,B,X,I,m,P,z,tt),B=ft.c,X=ft.lc;break}}if(yt==pt.lit)throw new Error("hufDecode issues")}}let ct=8-w&7;for(B>>=ct,X-=ct;X>0;){let ut=S[B<<14-X&16383];if(ut.len)X-=ut.len,Y(ut.lit,A,B,X,I,m,P,z,tt),B=ft.c,X=ft.lc;else throw new Error("hufDecode issues")}return!0}function Jt(_,S,I,m,w,A){let C={value:0},P=I.value,z=Mt(S,I),B=Mt(S,I);I.value+=4;let X=Mt(S,I);if(I.value+=4,z<0||z>=65537||B<0||B>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let tt=new Array(65537),it=new Array(16384);q(it);let ct=m-(I.value-P);if(Z(_,I,ct,z,B,tt),X>8*(m-(I.value-P)))throw new Error("Something wrong with hufUncompress");$(tt,z,B,it),Dt(tt,it,_,I,X,B,A,w,C)}function k(_,S,I){for(let m=0;m<I;++m)S[m]=_[S[m]]}function Me(_){for(let S=1;S<_.length;S++){let I=_[S-1]+_[S]-128;_[S]=I}}function Ct(_,S){let I=0,m=Math.floor((_.length+1)/2),w=0,A=_.length-1;for(;!(w>A||(S[w++]=_[I++],w>A));)S[w++]=_[m++]}function Bt(_){let S=_.byteLength,I=new Array,m=0,w=new DataView(_);for(;S>0;){let A=w.getInt8(m++);if(A<0){let C=-A;S-=C+1;for(let P=0;P<C;P++)I.push(w.getUint8(m++))}else{let C=A;S-=2;let P=w.getUint8(m++);for(let z=0;z<C+1;z++)I.push(P)}}return I}function At(_,S,I,m,w,A){let C=new DataView(A.buffer),P=I[_.idx[0]].width,z=I[_.idx[0]].height,B=3,X=Math.floor(P/8),tt=Math.ceil(P/8),it=Math.ceil(z/8),ct=P-(tt-1)*8,ut=z-(it-1)*8,pt={value:0},yt=new Array(B),Tt=new Array(B),te=new Array(B),zt=new Array(B),Pt=new Array(B);for(let Rt=0;Rt<B;++Rt)Pt[Rt]=S[_.idx[Rt]],yt[Rt]=Rt<1?0:yt[Rt-1]+tt*it,Tt[Rt]=new Float32Array(64),te[Rt]=new Uint16Array(64),zt[Rt]=new Uint16Array(tt*64);for(let Rt=0;Rt<it;++Rt){let ce=8;Rt==it-1&&(ce=ut);let Le=8;for(let jt=0;jt<tt;++jt){jt==tt-1&&(Le=ct);for(let kt=0;kt<B;++kt)te[kt].fill(0),te[kt][0]=w[yt[kt]++],he(pt,m,te[kt]),Wt(te[kt],Tt[kt]),E(Tt[kt]);B==3&&y(Tt);for(let kt=0;kt<B;++kt)V(Tt[kt],zt[kt],jt*64)}let fe=0;for(let jt=0;jt<B;++jt){let kt=I[_.idx[jt]].type;for(let Te=8*Rt;Te<8*Rt+ce;++Te){fe=Pt[jt][Te];for(let hn=0;hn<X;++hn){let pe=hn*64+(Te&7)*8;C.setUint16(fe+0*2*kt,zt[jt][pe+0],!0),C.setUint16(fe+1*2*kt,zt[jt][pe+1],!0),C.setUint16(fe+2*2*kt,zt[jt][pe+2],!0),C.setUint16(fe+3*2*kt,zt[jt][pe+3],!0),C.setUint16(fe+4*2*kt,zt[jt][pe+4],!0),C.setUint16(fe+5*2*kt,zt[jt][pe+5],!0),C.setUint16(fe+6*2*kt,zt[jt][pe+6],!0),C.setUint16(fe+7*2*kt,zt[jt][pe+7],!0),fe+=8*2*kt}}if(X!=tt)for(let Te=8*Rt;Te<8*Rt+ce;++Te){let hn=Pt[jt][Te]+8*X*2*kt,pe=X*64+(Te&7)*8;for(let Tn=0;Tn<Le;++Tn)C.setUint16(hn+Tn*2*kt,zt[jt][pe+Tn],!0)}}}let se=new Uint16Array(P);C=new DataView(A.buffer);for(let Rt=0;Rt<B;++Rt){I[_.idx[Rt]].decoded=!0;let ce=I[_.idx[Rt]].type;if(I[Rt].type==2)for(let Le=0;Le<z;++Le){let fe=Pt[Rt][Le];for(let jt=0;jt<P;++jt)se[jt]=C.getUint16(fe+jt*2*ce,!0);for(let jt=0;jt<P;++jt)C.setFloat32(fe+jt*2*ce,G(se[jt]),!0)}}}function he(_,S,I){let m,w=1;for(;w<64;)m=S[_.value],m==65280?w=64:m>>8==255?w+=m&255:(I[w]=m,w++),_.value++}function Wt(_,S){S[0]=G(_[0]),S[1]=G(_[1]),S[2]=G(_[5]),S[3]=G(_[6]),S[4]=G(_[14]),S[5]=G(_[15]),S[6]=G(_[27]),S[7]=G(_[28]),S[8]=G(_[2]),S[9]=G(_[4]),S[10]=G(_[7]),S[11]=G(_[13]),S[12]=G(_[16]),S[13]=G(_[26]),S[14]=G(_[29]),S[15]=G(_[42]),S[16]=G(_[3]),S[17]=G(_[8]),S[18]=G(_[12]),S[19]=G(_[17]),S[20]=G(_[25]),S[21]=G(_[30]),S[22]=G(_[41]),S[23]=G(_[43]),S[24]=G(_[9]),S[25]=G(_[11]),S[26]=G(_[18]),S[27]=G(_[24]),S[28]=G(_[31]),S[29]=G(_[40]),S[30]=G(_[44]),S[31]=G(_[53]),S[32]=G(_[10]),S[33]=G(_[19]),S[34]=G(_[23]),S[35]=G(_[32]),S[36]=G(_[39]),S[37]=G(_[45]),S[38]=G(_[52]),S[39]=G(_[54]),S[40]=G(_[20]),S[41]=G(_[22]),S[42]=G(_[33]),S[43]=G(_[38]),S[44]=G(_[46]),S[45]=G(_[51]),S[46]=G(_[55]),S[47]=G(_[60]),S[48]=G(_[21]),S[49]=G(_[34]),S[50]=G(_[37]),S[51]=G(_[47]),S[52]=G(_[50]),S[53]=G(_[56]),S[54]=G(_[59]),S[55]=G(_[61]),S[56]=G(_[35]),S[57]=G(_[36]),S[58]=G(_[48]),S[59]=G(_[49]),S[60]=G(_[57]),S[61]=G(_[58]),S[62]=G(_[62]),S[63]=G(_[63])}function E(_){let S=.5*Math.cos(.7853975),I=.5*Math.cos(3.14159/16),m=.5*Math.cos(3.14159/8),w=.5*Math.cos(3*3.14159/16),A=.5*Math.cos(5*3.14159/16),C=.5*Math.cos(3*3.14159/8),P=.5*Math.cos(7*3.14159/16),z=new Array(4),B=new Array(4),X=new Array(4),tt=new Array(4);for(let it=0;it<8;++it){let ct=it*8;z[0]=m*_[ct+2],z[1]=C*_[ct+2],z[2]=m*_[ct+6],z[3]=C*_[ct+6],B[0]=I*_[ct+1]+w*_[ct+3]+A*_[ct+5]+P*_[ct+7],B[1]=w*_[ct+1]-P*_[ct+3]-I*_[ct+5]-A*_[ct+7],B[2]=A*_[ct+1]-I*_[ct+3]+P*_[ct+5]+w*_[ct+7],B[3]=P*_[ct+1]-A*_[ct+3]+w*_[ct+5]-I*_[ct+7],X[0]=S*(_[ct+0]+_[ct+4]),X[3]=S*(_[ct+0]-_[ct+4]),X[1]=z[0]+z[3],X[2]=z[1]-z[2],tt[0]=X[0]+X[1],tt[1]=X[3]+X[2],tt[2]=X[3]-X[2],tt[3]=X[0]-X[1],_[ct+0]=tt[0]+B[0],_[ct+1]=tt[1]+B[1],_[ct+2]=tt[2]+B[2],_[ct+3]=tt[3]+B[3],_[ct+4]=tt[3]-B[3],_[ct+5]=tt[2]-B[2],_[ct+6]=tt[1]-B[1],_[ct+7]=tt[0]-B[0]}for(let it=0;it<8;++it)z[0]=m*_[16+it],z[1]=C*_[16+it],z[2]=m*_[48+it],z[3]=C*_[48+it],B[0]=I*_[8+it]+w*_[24+it]+A*_[40+it]+P*_[56+it],B[1]=w*_[8+it]-P*_[24+it]-I*_[40+it]-A*_[56+it],B[2]=A*_[8+it]-I*_[24+it]+P*_[40+it]+w*_[56+it],B[3]=P*_[8+it]-A*_[24+it]+w*_[40+it]-I*_[56+it],X[0]=S*(_[it]+_[32+it]),X[3]=S*(_[it]-_[32+it]),X[1]=z[0]+z[3],X[2]=z[1]-z[2],tt[0]=X[0]+X[1],tt[1]=X[3]+X[2],tt[2]=X[3]-X[2],tt[3]=X[0]-X[1],_[0+it]=tt[0]+B[0],_[8+it]=tt[1]+B[1],_[16+it]=tt[2]+B[2],_[24+it]=tt[3]+B[3],_[32+it]=tt[3]-B[3],_[40+it]=tt[2]-B[2],_[48+it]=tt[1]-B[1],_[56+it]=tt[0]-B[0]}function y(_){for(let S=0;S<64;++S){let I=_[0][S],m=_[1][S],w=_[2][S];_[0][S]=I+1.5747*w,_[1][S]=I-.1873*m-.4682*w,_[2][S]=I+1.8556*m}}function V(_,S,I){for(let m=0;m<64;++m)S[I+m]=Ta.toHalfFloat(ot(_[m]))}function ot(_){return _<=1?Math.sign(_)*Math.pow(Math.abs(_),2.2):Math.sign(_)*Math.pow(b,Math.abs(_)-1)}function st(_){return new DataView(_.array.buffer,_.offset.value,_.size)}function lt(_){let S=_.viewer.buffer.slice(_.offset.value,_.offset.value+_.size),I=new Uint8Array(Bt(S)),m=new Uint8Array(I.length);return Me(I),Ct(I,m),new DataView(m.buffer)}function Et(_){let S=_.array.slice(_.offset.value,_.offset.value+_.size),I=ji(S),m=new Uint8Array(I.length);return Me(I),Ct(I,m),new DataView(m.buffer)}function xt(_){let S=_.viewer,I={value:_.offset.value},m=new Uint16Array(_.width*_.scanlineBlockSize*(_.channels*_.type)),w=new Uint8Array(8192),A=0,C=new Array(_.channels);for(let ut=0;ut<_.channels;ut++)C[ut]={},C[ut].start=A,C[ut].end=C[ut].start,C[ut].nx=_.width,C[ut].ny=_.lines,C[ut].size=_.type,A+=C[ut].nx*C[ut].ny*C[ut].size;let P=N(S,I),z=N(S,I);if(z>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(P<=z)for(let ut=0;ut<z-P+1;ut++)w[ut+P]=Ft(S,I);let B=new Uint16Array(65536),X=T(w,B),tt=Mt(S,I);Jt(_.array,S,I,tt,m,A);for(let ut=0;ut<_.channels;++ut){let pt=C[ut];for(let yt=0;yt<C[ut].size;++yt)Ht(m,pt.start+yt,pt.nx,pt.size,pt.ny,pt.nx*pt.size,X)}k(B,m,A);let it=0,ct=new Uint8Array(m.buffer.byteLength);for(let ut=0;ut<_.lines;ut++)for(let pt=0;pt<_.channels;pt++){let yt=C[pt],Tt=yt.nx*yt.size,te=new Uint8Array(m.buffer,yt.end*2,Tt*2);ct.set(te,it),it+=Tt*2,yt.end+=Tt}return new DataView(ct.buffer)}function wt(_){let S=_.array.slice(_.offset.value,_.offset.value+_.size),I=ji(S),m=_.lines*_.channels*_.width,w=_.type==1?new Uint16Array(m):new Uint32Array(m),A=0,C=0,P=new Array(4);for(let z=0;z<_.lines;z++)for(let B=0;B<_.channels;B++){let X=0;switch(_.type){case 1:P[0]=A,P[1]=P[0]+_.width,A=P[1]+_.width;for(let tt=0;tt<_.width;++tt){let it=I[P[0]++]<<8|I[P[1]++];X+=it,w[C]=X,C++}break;case 2:P[0]=A,P[1]=P[0]+_.width,P[2]=P[1]+_.width,A=P[2]+_.width;for(let tt=0;tt<_.width;++tt){let it=I[P[0]++]<<24|I[P[1]++]<<16|I[P[2]++]<<8;X+=it,w[C]=X,C++}break}}return new DataView(w.buffer)}function Nt(_){let S=_.viewer,I={value:_.offset.value},m=new Uint8Array(_.width*_.lines*(_.channels*_.type*2)),w={version:Vt(S,I),unknownUncompressedSize:Vt(S,I),unknownCompressedSize:Vt(S,I),acCompressedSize:Vt(S,I),dcCompressedSize:Vt(S,I),rleCompressedSize:Vt(S,I),rleUncompressedSize:Vt(S,I),rleRawSize:Vt(S,I),totalAcUncompressedCount:Vt(S,I),totalDcUncompressedCount:Vt(S,I),acCompression:Vt(S,I)};if(w.version<2)throw new Error("EXRLoader.parse: "+An.compression+" version "+w.version+" is unsupported");let A=new Array,C=N(S,I)-2;for(;C>0;){let pt=Gt(S.buffer,I),yt=Ft(S,I),Tt=yt>>2&3,te=(yt>>4)-1,zt=new Int8Array([te])[0],Pt=Ft(S,I);A.push({name:pt,index:zt,type:Pt,compression:Tt}),C-=pt.length+3}let P=An.channels,z=new Array(_.channels);for(let pt=0;pt<_.channels;++pt){let yt=z[pt]={},Tt=P[pt];yt.name=Tt.name,yt.compression=0,yt.decoded=!1,yt.type=Tt.pixelType,yt.pLinear=Tt.pLinear,yt.width=_.width,yt.height=_.lines}let B={idx:new Array(3)};for(let pt=0;pt<_.channels;++pt){let yt=z[pt];for(let Tt=0;Tt<A.length;++Tt){let te=A[Tt];yt.name==te.name&&(yt.compression=te.compression,te.index>=0&&(B.idx[te.index]=pt),yt.offset=pt)}}let X,tt,it;if(w.acCompressedSize>0)switch(w.acCompression){case 0:X=new Uint16Array(w.totalAcUncompressedCount),Jt(_.array,S,I,w.acCompressedSize,X,w.totalAcUncompressedCount);break;case 1:let pt=_.array.slice(I.value,I.value+w.totalAcUncompressedCount),yt=ji(pt);X=new Uint16Array(yt.buffer),I.value+=w.totalAcUncompressedCount;break}if(w.dcCompressedSize>0){let pt={array:_.array,offset:I,size:w.dcCompressedSize};tt=new Uint16Array(Et(pt).buffer),I.value+=w.dcCompressedSize}if(w.rleRawSize>0){let pt=_.array.slice(I.value,I.value+w.rleCompressedSize),yt=ji(pt);it=Bt(yt.buffer),I.value+=w.rleCompressedSize}let ct=0,ut=new Array(z.length);for(let pt=0;pt<ut.length;++pt)ut[pt]=new Array;for(let pt=0;pt<_.lines;++pt)for(let yt=0;yt<z.length;++yt)ut[yt].push(ct),ct+=z[yt].width*_.type*2;At(B,ut,z,X,tt,m);for(let pt=0;pt<z.length;++pt){let yt=z[pt];if(!yt.decoded)switch(yt.compression){case 2:let Tt=0,te=0;for(let zt=0;zt<_.lines;++zt){let Pt=ut[pt][Tt];for(let se=0;se<yt.width;++se){for(let Rt=0;Rt<2*yt.type;++Rt)m[Pt++]=it[te+Rt*yt.width*yt.height];te++}Tt++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(m.buffer)}function Gt(_,S){let I=new Uint8Array(_),m=0;for(;I[S.value+m]!=0;)m+=1;let w=new TextDecoder().decode(I.slice(S.value,S.value+m));return S.value=S.value+m+1,w}function rt(_,S,I){let m=new TextDecoder().decode(new Uint8Array(_).slice(S.value,S.value+I));return S.value=S.value+I,m}function ie(_,S){let I=Ut(_,S),m=Mt(_,S);return[I,m]}function Zt(_,S){let I=Mt(_,S),m=Mt(_,S);return[I,m]}function Ut(_,S){let I=_.getInt32(S.value,!0);return S.value=S.value+4,I}function Mt(_,S){let I=_.getUint32(S.value,!0);return S.value=S.value+4,I}function bt(_,S){let I=_[S.value];return S.value=S.value+1,I}function Ft(_,S){let I=_.getUint8(S.value);return S.value=S.value+1,I}let Vt=function(_,S){let I;return"getBigInt64"in DataView.prototype?I=Number(_.getBigInt64(S.value,!0)):I=_.getUint32(S.value+4,!0)+Number(_.getUint32(S.value,!0)<<32),S.value+=8,I};function Kt(_,S){let I=_.getFloat32(S.value,!0);return S.value+=4,I}function Xt(_,S){return Ta.toHalfFloat(Kt(_,S))}function G(_){let S=(_&31744)>>10,I=_&1023;return(_>>15?-1:1)*(S?S===31?I?NaN:1/0:Math.pow(2,S-15)*(1+I/1024):6103515625e-14*(I/1024))}function N(_,S){let I=_.getUint16(S.value,!0);return S.value+=2,I}function gt(_,S){return G(N(_,S))}function _t(_,S,I,m){let w=I.value,A=[];for(;I.value<w+m-1;){let C=Gt(S,I),P=Ut(_,I),z=Ft(_,I);I.value+=3;let B=Ut(_,I),X=Ut(_,I);A.push({name:C,pixelType:P,pLinear:z,xSampling:B,ySampling:X})}return I.value+=1,A}function Ot(_,S){let I=Kt(_,S),m=Kt(_,S),w=Kt(_,S),A=Kt(_,S),C=Kt(_,S),P=Kt(_,S),z=Kt(_,S),B=Kt(_,S);return{redX:I,redY:m,greenX:w,greenY:A,blueX:C,blueY:P,whiteX:z,whiteY:B}}function Lt(_,S){let I=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],m=Ft(_,S);return I[m]}function re(_,S){let I=Mt(_,S),m=Mt(_,S),w=Mt(_,S),A=Mt(_,S);return{xMin:I,yMin:m,xMax:w,yMax:A}}function ae(_,S){let I=["INCREASING_Y"],m=Ft(_,S);return I[m]}function me(_,S){let I=Kt(_,S),m=Kt(_,S);return[I,m]}function Ee(_,S){let I=Kt(_,S),m=Kt(_,S),w=Kt(_,S);return[I,m,w]}function oe(_,S,I,m,w){if(m==="string"||m==="stringvector"||m==="iccProfile")return rt(S,I,w);if(m==="chlist")return _t(_,S,I,w);if(m==="chromaticities")return Ot(_,I);if(m==="compression")return Lt(_,I);if(m==="box2i")return re(_,I);if(m==="lineOrder")return ae(_,I);if(m==="float")return Kt(_,I);if(m==="v2f")return me(_,I);if(m==="v3f")return Ee(_,I);if(m==="int")return Ut(_,I);if(m==="rational")return ie(_,I);if(m==="timecode")return Zt(_,I);if(m==="preview")return I.value+=w,"skipped";I.value+=w}function Ae(_,S,I){let m={};if(_.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");m.version=_.getUint8(4);let w=_.getUint8(5);m.spec={singleTile:!!(w&2),longName:!!(w&4),deepFormat:!!(w&8),multiPart:!!(w&16)},I.value=8;let A=!0;for(;A;){let C=Gt(S,I);if(C==0)A=!1;else{let P=Gt(S,I),z=Mt(_,I),B=oe(_,S,I,P,z);B===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${P}'.`):m[C]=B}}if(w&-5)throw console.error("THREE.EXRHeader:",m),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return m}function Xe(_,S,I,m,w){let A={size:0,viewer:S,array:I,offset:m,width:_.dataWindow.xMax-_.dataWindow.xMin+1,height:_.dataWindow.yMax-_.dataWindow.yMin+1,channels:_.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:_.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:ze};switch(_.compression){case"NO_COMPRESSION":A.lines=1,A.uncompress=st;break;case"RLE_COMPRESSION":A.lines=1,A.uncompress=lt;break;case"ZIPS_COMPRESSION":A.lines=1,A.uncompress=Et;break;case"ZIP_COMPRESSION":A.lines=16,A.uncompress=Et;break;case"PIZ_COMPRESSION":A.lines=32,A.uncompress=xt;break;case"PXR24_COMPRESSION":A.lines=16,A.uncompress=wt;break;case"DWAA_COMPRESSION":A.lines=32,A.uncompress=Nt;break;case"DWAB_COMPRESSION":A.lines=256,A.uncompress=Nt;break;default:throw new Error("EXRLoader.parse: "+_.compression+" is unsupported")}if(A.scanlineBlockSize=A.lines,A.type==1)switch(w){case Ye:A.getter=gt,A.inputSize=2;break;case on:A.getter=N,A.inputSize=2;break}else if(A.type==2)switch(w){case Ye:A.getter=Kt,A.inputSize=4;break;case on:A.getter=Xt,A.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+A.type+" for "+_.compression+".");A.blockCount=(_.dataWindow.yMax+1)/A.scanlineBlockSize;for(let P=0;P<A.blockCount;P++)Vt(S,m);A.outputChannels=A.channels==3?4:A.channels;let C=A.width*A.height*A.outputChannels;switch(w){case Ye:A.byteArray=new Float32Array(C),A.channels<A.outputChannels&&A.byteArray.fill(1,0,C);break;case on:A.byteArray=new Uint16Array(C),A.channels<A.outputChannels&&A.byteArray.fill(15360,0,C);break;default:console.error("THREE.EXRLoader: unsupported type: ",w);break}return A.bytesPerLine=A.width*A.inputSize*A.channels,A.outputChannels==4?(A.format=De,A.colorSpace=ze):(A.format=Ea,A.colorSpace=Fe),A}let kn=new DataView(t),sr=new Uint8Array(t),rn={value:0},An=Ae(kn,t,rn),qt=Xe(An,kn,sr,rn,this.type),Ui={value:0},ts={R:0,G:1,B:2,A:3,Y:0};for(let _=0;_<qt.height/qt.scanlineBlockSize;_++){let S=Mt(kn,rn);qt.size=Mt(kn,rn),qt.lines=S+qt.scanlineBlockSize>qt.height?qt.height-S:qt.scanlineBlockSize;let m=qt.size<qt.lines*qt.bytesPerLine?qt.uncompress(qt):st(qt);rn.value+=qt.size;for(let w=0;w<qt.scanlineBlockSize;w++){let A=w+_*qt.scanlineBlockSize;if(A>=qt.height)break;for(let C=0;C<qt.channels;C++){let P=ts[An.channels[C].name];for(let z=0;z<qt.width;z++){Ui.value=(w*(qt.channels*qt.width)+C*qt.width+z)*qt.inputSize;let B=(qt.height-1-A)*(qt.width*qt.outputChannels)+z*qt.outputChannels+P;qt.byteArray[B]=qt.getter(m,Ui)}}}}return{header:An,width:qt.width,height:qt.height,data:qt.byteArray,format:qt.format,colorSpace:qt.colorSpace,type:this.type}}setDataType(t){return this.type=t,this}load(t,e,n,s){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=ve,o.magFilter=ve,o.generateMipmaps=!1,o.flipY=!1,e&&e(o,a)}return super.load(t,r,n,s)}};var kl="data:application/octet-stream;base64,di8xAQIAAABjaGFubmVscwBjaGxpc3QANwAAAEIAAQAAAAAAAAABAAAAAQAAAEcAAQAAAAAAAAABAAAAAQAAAFIAAQAAAAAAAAABAAAAAQAAAABjb21wcmVzc2lvbgBjb21wcmVzc2lvbgABAAAACWRhdGFXaW5kb3cAYm94MmkAEAAAAAAAAAAAAAAA/wEAAP8AAABkaXNwbGF5V2luZG93AGJveDJpABAAAAAAAAAAAAAAAP8BAAD/AAAAbGluZU9yZGVyAGxpbmVPcmRlcgABAAAAAHBpeGVsQXNwZWN0UmF0aW8AZmxvYXQABAAAAAAAgD9zY3JlZW5XaW5kb3dDZW50ZXIAdjJmAAgAAAAAAAAAAAAAAHNjcmVlbldpbmRvd1dpZHRoAGZsb2F0AAQAAAAAAIA/AEEBAAAAAAAAAAAAAEavAQACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArkQEAAAAAALUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAICAAAAAAAAGAAAAAAAAAAAAAAAAAAADgBSABQBRwAkAUIANAEAAAAAKf8AAKgPAAB3CwwAAAAAABP///////////////////////////////////64T////////qG////Qz///9BP/kn/5G/+Tv/kX95K/eR/3k795H/eS/3kj95P/eRPzkv85J/OUfzkf85M/OSvzk/85G/OTPzkr85R/OSfzkz85K/OUPzkb8ZN/GSvxk/8ZJ/GTPxkv85I/GTfxkr8ZR/GSvxk38ZL/GUfxkf8ZO/GS/xlH8ZJ/GTvxkz8ZR/GSPxlD8ZL/OSvxk78ZL/OSPwk78JL/GSvwk78JM/GSfwk/8JM/GS/wk/8JM/GSPwk/8JM/CUfwkv8JO/CTPwk/8JK/CTvwkz8JR/CS/wlD8JN/GSfwk78JM/GS/wk78JM/GSvwlD8JM/GTPwk/8JN/GSfwk78JN/GS/wk/8JN/GSvwk/8JN/GTPwk/8JN/GSfwE78BN/CTPwFD8BN/CSvwE/8BN/CTPwE/8BO/CSvwFH8BO/CTPwE/8BO/CS/wFD8BN/CTPwFH8BO/CSvwFH8BO/CTPwE/8BN/CS/wFH8BN/AUfwE38BP/ATvwkr8BP/ATvwkz8BQ/ATvwkz8BQ/ATfwk38BQ/ATvwkr8BR/ATfwFH8BN/AT/wE78JL/AUPwE78BQ/ATfwE/8BQ/CS/wFD8BO/CTfwE/8BO/CTPwFH8BN/CTfwFH8BQ/CS/wk78JN/CUPwkz8BR/ATfwk78BR/ATvwkz8BQ/ATvwk78BR/AUPwkz8BP/ATvwk78JQ/CS/EfDvwE78BO/ATPEfDvwE3xHw/8BM8R8O/ATfEPDvwE38BP/AT/D/D/wEzxHw/8BO8R8P/ATPwE/8BP8Q8Q/ATPEfDvwE78JN8R8P/ATvEfEPEfDPEfD/EfD/wFD8BN8R/BTvwFH8BM/AUPwE3xHw/8BN8R8R/ATvEfD/wE38BP/ATvEfEfwE38BP/AUPEfEfwEzxHw/8BP/CTvwFD8BO/CTPEfEfwE/8BQ/ATfwE78BO/AUfwE3w/xD8BO/AUfwE/xHxD8BP/AUPwE3xHw/8BQ/AUPwE3xHxD8BP/AUfwE78BQ/AT/wk/xH8FP8R8Q/ATfwE/8BP/AUPwE7xHxH8BQ8R8P/ATvEfD/wE/xHxD8BP/AT/wE/xH8FN/AT/wE/xHxH8BO8R8Q/AUfwk78BR/AUPwFH8BO/AUfwE/8BP/ATQDwEfEQEfj/EPEfEfDvEfD/wE/w/w8BH44BABHw/xDw8BH5ABEA/w0BEBHw4BABHw8BEBHxHxHw7xDxEBEBHw/xHxD8BOAQAP8P/AUPEfwFHw7xHxD8BP8Q8R8R8OARAR8PARAR8R8Q/AUfDvEfD/EPD/EfD/EfD/D/D/wFDxDxHxHw7xDw8BEBDw/8BQAR+O/AUPwFDxD8BR8OARAQ+Q+O8R8O/ATvwFABH5EBABDxH8BO/AUQEQEPEfEPEfwFDxDxD8BP/AUPEfDvwFH8BP8Q8P+RAP8Q+R+Q/CTvwE/8BP/AT/wFD8BR8R8Q/CTvEfD/EfEAEQEfEfwFD8BR/AUfEfEPEPDvEPD/wFDxH8BR8R8R8RAR+R8R8P8R8P/AUfwlHxDxDxHxD8BP8R+R+P/AUfwFEBEBH8FR+RAR/AUPwk8BABHxH8BQ/CUfwE/8BR8Q8RAR/B0fwFDxH8BR8Q/AUPwk/xHxDxABFFDxHxD8BRAR+QAQAR8Q/ATwEfkAEAEfEPwNH8DRARAR8Q8QAR8RAP8Q8R/AUfEfD/EfD/xE/8FQ8Q/AUQEfkfEUe0QEfkfEfkfj/EfwFEBABH5HxEBEBEBABD5DxHxABH5D8BQ/A0QEfEPwVHxABEA8BEBEBEBDxH8BQ8R8R/EUfwFBH1EBH8FRAR+R/FUfwE/5H8BR/Az/wFEBEBH8vR/H0fwVHxDxD8FP/AUPwlH8JR+R/BUfwdH8JR/AUPwk8BH5H8JR/C0fkQEQEPwVD8BR/BUfEfxVHxH8BRAR/B0fwFH8RQ8R/CUfwVEBH8fR/AUfwVH8BR/CUPEfwFHtD1H8BR/AUfwFDtFFH8IQ8R/AUfwdH8AR7R/AUUUfkfwFH8ER9R/BEfwZHxH8BR/Ake0fwFH8BR7R7R/A0PUe0e0e0fwNH8ZRRRR7R+R8R7R/AEfwFEBH8NR/EUfwtEBH8IR/GkUe0QEfkUfwBDxHxHxH8NRAR+R/AUfwFEBH1H1H8DR/A0fwZH8ERAR/BEfwZEBH1FH5H8RR/GUfzFH8DRR/FkfxlH8JR/EUfwhEBH8QR/AUQEfwVEBD8DR+R/CUfEPEfwZH8kR/AUfx9H8UR7R/DUfwJH8AQ8RAR/C0UfwVH8BR/EkfxNFH1EBH8RQ/B0UfwxH8BR/AEfEfkPxBH8HR/A0fzFH8ZR/TUfxlH8tR/CUfkfzVH8UR/DUfUf0FH8CR7RAR/G0UfyJH9YR/CEf1RH8CR/LkfyRH8HR/1Uf5lH8ZR/JUf9VH/QR////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5YT////////qG////Q3///9BP/kn/5G/+Tf/kX95K/eR/3k795H/eSv3kj95O/eRPzkv85J/OT/zkf85M/OSfzk785G/OTPzkr85R/OSPzkz85K/OUfzkb8ZM/GSvxlH8ZJ/GTfxkr8ZR/GR/xk78ZK/GUfxkr8ZN/GS/zkf8ZN/GS/xlH8ZJ/GTfxkv85J/GTvxkv85K/GTvxkv85I/CTfwkz8JR/CSvwk78JM/GSfwk78JM/CUfwkv8JO/CTPwlH8JI/CTvwkz8ZK/CT/wkz8ZK/CTvwkz8ZL/CTvwkz8ZI/CTvwkz8ZL/CT/wkz8ZK/CT/wk38ZL/CTvwk38ZJ/CTvwk38ZL/CUfwk38ZL/CT/wk38ZL/CT/wk78ZJ/AUPwE38BR/AS/wE/8BN/CSvwE/8BN/CTPwFH8BN/CSvwE/8BN/CTPwFD8BO/AUfwEv8BP/ATvwk38BP/ATvwkr8BR/ATvwkz8BO/ATvwkv8BQ/ATfwkz8BP/ATfwkr8BP/ATfwkz8BP/ATvwkv8BP/ATfwkz8BP/ATfwkv8BP/ATfwkz8BQ/ATvwkv8BP/ATvwk38BR/ATvwkv8BP/ATvwk38BP/ATfwkv8BP/ATfwk38BP/ATvwkv8JO/CTfwFH8BP/CTPwFD8BO/CTvwk78JM/AT/wE/8JN/AT/wE78JM/AT/wE78JN/AT/wE78JL8R8O/ATfD/DvwEzw/w78BN8Q8P/AS/EfDvwE3w/w78BM/AT/wE38BP/ATPEfDvwE3xHw78BM8Q8P/ATvEPDvwEzxDw78BN8R8P/ATfwE78BN8P8Q/ATPEfDvwE78BP/ATfD/D/wE7w/w78BM8R8P/ATvwE/8BN8R8O/ATvEfEPwEzxHxH8BO8R8Q/ATvEPD/wE78BP8R8N8R8P/ATvEPEPEfDvEPEPwE7xH8FM/AT/EfDvwFHxHw3xHw/8BO/AUPwE3xHw/8BO/AT/wE3xHw78BO8R8Q/ATfwE/xHxDxHw/8BO8R8R/ATvEfD/wE3w/xH8BO8R8P/ATvwFD8BR8R8Q/ATfwE78BQ/CTvwFH8BO/AT/wE3xHxD8BP8R8Q/ATvwE/8BP8Q8R/ATfwFD8BP8R8Q/ATvEPD/wFD8BQ/ATfwE/8BO/CTvwFH8BP8R8R/ATfwE8BH47w/xDxHw38BPARAR8O+RAPARAQ8N8P8P8P8Q/AUfEQEQDvEPEAEAEPEAEAEfDgEPjgEPkPwE7xHw/8BOARAP8Q8R8P8P8QAQ+N8Q8PARAQ8P+RAPAR+Q/AUPkQD/EfD/EPDgEQEfDwEQEPEPwE/8BP/AUQEQEfD/wE/xDw4BABDxEBEBHw8A/5ABH5H8BP/AT/wVHw/8BRAR+QARAP8P/ATQEPkAEAEQEQD/EfwU7xEBEBDxHxEBEBH5EBDw/xDxEBH5EBH5EBEBHw7xHw8BEBHw/xHxH8BPAR+QAR+Q/AT/wFH8BP8RARAQ8R8Q8R8P/AUPwE7xHxHxHw78BR/AT/wFH8BP8R/A0QEfwFD8BR8P8Q8R8PAR+R8R8P/AUQEPkPEfEfwE/8BR8R8P/AUfwE/8DR+P8R8PAR+R8R/BTwEQEPwU/w/8FR/BUfD/wNH5D8BR/AUPw1HxABH4/8BR/AUAEfkfwE/xHxHxDw/xH8BR/AT/EAD/kQEfkPwE8BD8BRAQ8QAR+RAQ8RAR8R7RR/AT/EQEQEfD/DwD/kfkQEAEQEPEfwFDxFHtDxHw/8BQ/AUAEPkPEPEAEAEfkQEPDwEfwlABEBEA/xHxD8BRAQ+R/AUPkQD/kQEAEQEQEQEfkfEQEPEe0fUAEQEfEPwVFHtD8BQ8RAQAQAR/AUfEfkPEPwBHtHxD5HxABEBHw/8BPAR+R/A0QEfEQEQEfwFHxHxHxEBEBH8DR/E0fwhFDxHw78ARRAR+RAR+R8R8R/AUfkQEfwFH8BPARAR8R/AUfwVHxH8DRARARAQ/CUfwFH8BRARAR/BUfwFH8BQ8Q+RAQ/B0QEfEfEfwFEBEBHxHxHxHxH8BRARAR8R8R+R/AUfwFH5EBH8BR8R/C0PwVH8DR/D0fwVEBH8DR/BUfkQEfwNH8HR/B0fwVH5HxEBD8DQ/BUQEfwND8FRAR7RRR8RRR/AEe0fwBH1H8AR/AkUfEfEfEUfEfwFBEBDxH5H5HtH8FR7RAQR7R8QR8RAR/AEfEfUfwFH8AR+R8R8R8PRQR/CEfwdH8BR+R/A0QEfwFH8MR8R/AUfwBH8FR8R/CUfkQEfwlEBH8ER+R/AkfwpH1HtH8ER/AEUfEfEfwVHxH8FRR/BEQEfxVH5D5H8HR+RAR8RR/BEfwlDtFD8GR/AEe0fUfwtH5H8JR/BUfxVD8RQ/BEfwFH1H8JRARR/G0e0fwVD8NR/EUPwFH8WR7R/GUfw1H8NR/JUe0fyVH8AR8RR+R9R/LEUfw1H8FR/F0fwlH5H8LR8RARAR/B0fwJH1DtHxH8BR7RAR/bUfxRH8BR/A0QEfw1H8AR/BUfwZH8CR/H0fyZH8KR/AkfxFH9zR/DUfUfyJH8bR/NEf2ZH9eR/IEf0dH8HR///x1H9WR/m0f//8tR/OUfx1H////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2QUAUYccggggkkkos0ww0ww0000049E9E9FDtEBEBFELU947nUBEmmObt1245GkvT05CV9S1DZ7YG8m17td8vf3Tcef1QnoSmx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";var Da=(1+Math.sqrt(5))/2,sn=[];for(let i of[-1,1])for(let t of[-1,1])sn.push([0,i,t*Da],[i,t*Da,0],[t*Da,0,i]);var Zl=i=>{let t=Math.hypot(...i);return i.map(e=>e/t)},Kl=[];for(let i=0;i<12;i++)for(let t=i+1;t<12;t++)for(let e=t+1;e<12;e++){let n=(s,r)=>Math.hypot(s[0]-r[0],s[1]-r[1],s[2]-r[2]);[n(sn[i],sn[t]),n(sn[t],sn[e]),n(sn[i],sn[e])].every(s=>Math.abs(s-2)<1e-6)&&Kl.push(Zl([0,1,2].map(s=>sn[i][s]+sn[t][s]+sn[e][s])))}var ym=[...sn.map(i=>({n:Zl(i),h:2.32744,p:!0})),...Kl.map(i=>({n:i,h:2.26728,p:!1}))];function Mm(i=1024){let t=i/2,e=document.createElement("canvas"),n=document.createElement("canvas");e.width=n.width=i,e.height=n.height=t;let s=e.getContext("2d"),r=n.getContext("2d"),o=s.createImageData(i,t),a=r.createImageData(i,t);for(let l=0;l<t;l++){let c=(l+.5)/t*Math.PI,h=Math.sin(c),f=Math.cos(c);for(let d=0;d<i;d++){let g=(d+.5)/i*Math.PI*2,v=-Math.cos(g)*h,x=f,p=Math.sin(g)*h,u=-9,R=-9,M=!1;for(let T of ym){let q=(v*T.n[0]+x*T.n[1]+p*T.n[2])/T.h;q>u?(R=u,u=q,M=T.p):q>R&&(R=q)}let U=(u-R)*260,F=Math.min(1,Math.max(0,(U-.35)/.6)),D=M?22:238,L=(l*i+d)*4,K=Math.round(18+(D-18)*F);o.data[L]=K,o.data[L+1]=K,o.data[L+2]=M?K+2:K,o.data[L+3]=255;let b=Math.round(255*Math.min(1,Math.sqrt(Math.max(0,U)/6)));a.data[L]=a.data[L+1]=a.data[L+2]=b,a.data[L+3]=255}}return s.putImageData(o,0,0),r.putImageData(a,0,0),{cor:e,rel:n}}var Hl=Mm(innerWidth<700?768:1024),$l=null,Sm=fetch(kl).then(i=>i.arrayBuffer()).then(i=>$l=i);function Jl(i,{luzTopo:t=1.2}={}){let e=document.createElement("canvas");e.className="bola-3d",i.appendChild(e);let n;try{n=new qi({canvas:e,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return e.remove(),null}n.setPixelRatio(Math.min(devicePixelRatio,2)),n.toneMapping=ba,n.toneMappingExposure=1.05,n.outputColorSpace=_e;let s=new Ws,r=new Ue(22,1,.1,50);r.position.set(0,0,5.4);let o=(x,p)=>{let u=new Xs(x);return p&&(u.colorSpace=_e),u.anisotropy=4,u},a=new Ys({map:o(Hl.cor,!0),bumpMap:o(Hl.rel,!1),bumpScale:2.2,roughness:.42,clearcoat:.7,clearcoatRoughness:.28,envMapIntensity:1}),l=new Ze(new qs(1,96,64),a);s.add(l);let c=new $s(14673663,t);c.position.set(-1.5,3,2.5),s.add(c),s.add(new Js(8425664,.15)),Sm.then(()=>{let x=new er().parse($l),p=new Yi(x.data,x.width,x.height,De,x.type);p.colorSpace=ze,p.flipY=!0,p.magFilter=p.minFilter=ve,p.needsUpdate=!0,p.mapping=Hi;let u=new Pi(n);s.environment=u.fromEquirectangular(p).texture,u.dispose(),p.dispose(),d=!0});let h=0,f=0,d=!0,g=!0,v=()=>{let x=i.getBoundingClientRect(),p=Math.round(x.width*1.06),u=Math.round(x.height*1.06);p===h&&u===f||(h=p,f=u,n.setSize(h,f,!1),e.style.width=h+"px",e.style.height=f+"px",d=!0)};return new ResizeObserver(v).observe(i),v(),new IntersectionObserver(x=>{g=x[0].isIntersecting}).observe(i),i.classList.add("tem-3d"),{bola:l,render(){!g||!d||!h||(n.render(s,r),d=!1)},marca(){d=!0}}}var En=window.BOLA||(window.BOLA={}),Vl=document.getElementById("bolaO"),Wl=document.getElementById("bolaT"),bm=matchMedia("(prefers-reduced-motion: reduce)").matches,cn=Vl&&Jl(Vl,{luzTopo:1.5}),Ni=Wl&&Jl(Wl,{luzTopo:1.1}),Xl=new ln,ql=new H,nr=(i,t,e,n,s)=>{s&&(ql.set(t,e,n).normalize(),Xl.setFromAxisAngle(ql,s),i.quaternion.premultiply(Xl))};Ni&&Ni.bola.rotation.set(.6,.3,0);cn&&cn.bola.rotation.set(.35,-.4,0);var Oa=0,Fa=0,ir=null,Yl=performance.now();function Ql(i){let t=Math.min(.05,(i-Yl)/1e3);if(Yl=i,cn){let e=(En.giro||0)+(En.giroR||0);nr(cn.bola,0,0,1,e-Oa),e!==Oa&&cn.marca(),Oa=e;let n=En.mx||0;nr(cn.bola,0,1,0,(n-Fa)*1.6),n!==Fa&&cn.marca(),Fa=n,bm||(nr(cn.bola,0,1,0,t*.35),cn.marca()),cn.render()}if(Ni&&En.t){if(ir){let e=En.t.x-ir.x,n=En.t.y-ir.y,s=Math.hypot(e,n);s>.01&&(nr(Ni.bola,n,e,0,s/(En.t.r||28)),Ni.marca())}ir={x:En.t.x,y:En.t.y},Ni.render()}requestAnimationFrame(Ql)}requestAnimationFrame(Ql);
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
