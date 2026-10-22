% NEWTON-RAPHSON Y NEWTON-RAPHSON MEJORADO
clc; clear;
fprintf('===============================================\n');
fprintf('   NEWTON-RAPHSON Y NEWTON-RAPHSON MEJORADO\n');
fprintf('===============================================\n\n');
fprintf('1. Newton-Raphson clasico\n');
fprintf('2. Newton-Raphson mejorado\n');
metodo=input('Seleccione el metodo (1 o 2): ');
if metodo~=1 && metodo~=2, error('Debe seleccionar 1 o 2.'); end

f_txt=input('Ingrese f(x): ','s');
df_txt=input('Ingrese la primera derivada f1(x): ','s');
try
    f=str2func(['@(x)',f_txt]);
    df=str2func(['@(x)',df_txt]);
    f(1); df(1);
catch
    error('La funcion o la primera derivada tienen una sintaxis incorrecta.');
end

if metodo==2
    d2f_txt=input('Ingrese la segunda derivada f2(x): ','s');
    try
        d2f=str2func(['@(x)',d2f_txt]);
        d2f(1);
    catch
        error('La segunda derivada tiene una sintaxis incorrecta.');
    end
end

x=input('Ingrese el valor inicial x0: ');
tol=input('Ingrese la tolerancia: ');
maxIter=input('Ingrese el numero maximo de iteraciones: ');
if tol<=0 || maxIter<=0, error('La tolerancia y las iteraciones deben ser mayores que cero.'); end

fprintf('\n---------------------------------------------------------------\n');
fprintf('Iter       x_n              f(x_n)             Error\n');
fprintf('---------------------------------------------------------------\n');
convergio=false;

for k=1:maxIter
    fx=f(x); dfx=df(x);
    if ~isfinite(fx) || ~isfinite(dfx), error('Se obtuvo un valor no finito.'); end
    if abs(dfx)<eps, error('La primera derivada es demasiado cercana a cero.'); end

    if metodo==1
        xnew=x-fx/dfx;
    else
        d2fx=d2f(x);
        den=dfx^2-fx*d2fx;
        if ~isfinite(d2fx) || abs(den)<eps
            error('El denominador del metodo mejorado es demasiado cercano a cero.');
        end
        xnew=x-(fx*dfx)/den;
    end

    if xnew~=0
        err=abs((xnew-x)/xnew);
    else
        err=abs(xnew-x);
    end
    fprintf('%3d   % .12f   % .6e   %.6e\n',k,xnew,f(xnew),err);

    if abs(f(xnew))<=tol || err<=tol
        x=xnew; convergio=true; break;
    end
    x=xnew;
end

fprintf('---------------------------------------------------------------\n');
if convergio
    fprintf('Raiz aproximada: %.12f\n',x);
    fprintf('Iteraciones: %d\n',k);
    fprintf('Error aproximado: %.6e\n',err);
    fprintf('|f(x)|: %.6e\n',abs(f(x)));
else
    fprintf('No se alcanzo la tolerancia en %d iteraciones.\n',maxIter);
    fprintf('Ultima aproximacion: %.12f\n',x);
    fprintf('Error aproximado: %.6e\n',err);
end
