
function quiz(button, correct, id, message){
  const box=document.getElementById(id);
  const parent=button.parentElement;
  parent.querySelectorAll(".option").forEach(b=>{b.style.background="#fff";b.style.borderColor="#ccd6e8";});
  button.style.background=correct?"#e7f8f3":"#fff0f0";
  button.style.borderColor=correct?"#12a594":"#d64545";
  box.textContent=(correct?"✓ ":"✗ ")+message;
  box.style.color=correct?"#087f6a":"#b33636";
}

const functions={
 sqrt2:{name:"x² − 2",f:x=>x*x-2,fp:x=>2*x,fpp:x=>2},
 cosx:{name:"cos(x) − x",f:x=>Math.cos(x)-x,fp:x=>-Math.sin(x)-1,fpp:x=>-Math.cos(x)},
 cubic:{name:"x³ − x − 2",f:x=>x*x*x-x-2,fp:x=>3*x*x-1,fpp:x=>6*x},
 multiple:{name:"(x − 2)²",f:x=>(x-2)*(x-2),fp:x=>2*(x-2),fpp:x=>2}
};

function runNewton(){
  const key=document.getElementById("func").value;
  const method=document.getElementById("method").value;
  const x0=Number(document.getElementById("x0").value);
  const tol=Math.abs(Number(document.getElementById("tol").value));
  const out=document.getElementById("calcResult");
  if(!Number.isFinite(x0)||!Number.isFinite(tol)||tol<=0){out.innerHTML="<strong>Revisa los datos:</strong> introduce un valor inicial y una tolerancia positiva.";return;}
  let x=x0, rows=[], converged=false, warning="";
  for(let n=0;n<30;n++){
    const fx=functions[key].f(x), fp=functions[key].fp(x), fpp=functions[key].fpp(x);
    if(!Number.isFinite(fx)||!Number.isFinite(fp)||!Number.isFinite(fpp)){warning="Se produjo un valor no válido.";break;}
    if(Math.abs(fx)<tol){converged=true;break;}
    let denom, next;
    if(method==="classic"){
      if(Math.abs(fp)<1e-14){warning="La primera derivada es demasiado cercana a cero.";break;}
      next=x-fx/fp;
    }else{
      denom=fp*fp-fx*fpp;
      if(Math.abs(denom)<1e-14){warning="El denominador del método mejorado es demasiado cercano a cero.";break;}
      next=x-(fx*fp)/denom;
    }
    if(!Number.isFinite(next)){warning="La iteración produjo un valor no válido.";break;}
    const err=Math.abs(next-x)/(Math.abs(next)>1e-14?Math.abs(next):1)*100;
    rows.push(`<tr><td>${n}</td><td>${x.toFixed(10)}</td><td>${fx.toExponential(5)}</td><td>${next.toFixed(10)}</td><td>${err.toExponential(3)}%</td></tr>`);
    x=next;
    if(Math.abs(functions[key].f(x))<tol){converged=true;break;}
  }
  let html=`<p><strong>Función:</strong> ${functions[key].name}</p><p><strong>Método:</strong> ${method==="classic"?"Newton-Raphson clásico":"Newton-Raphson mejorado"}</p>`;
  html+=`<p><strong>Aproximación final:</strong> ${x.toFixed(10)}</p>`;
  if(converged) html+=`<p>✓ Se alcanzó la tolerancia de ${tol}.</p>`;
  else html+=`<p>⚠ No se alcanzó la tolerancia en el máximo de iteraciones.</p>`;
  if(warning) html+=`<p><strong>Precaución:</strong> ${warning}</p>`;
  html+=`<div class="table-container"><table><tr><th>n</th><th>xₙ</th><th>f(xₙ)</th><th>xₙ₊₁</th><th>Error</th></tr>${rows.join("")}</table></div>`;
  out.innerHTML=html;
}
