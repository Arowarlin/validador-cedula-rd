// Elementos del DOM
const cedulaInput = document.getElementById('cedulaInput');
const validarBtn = document.getElementById('validarBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const resultado = document.getElementById('resultado');


function validarCedulaJCE(cedula) {
    const cedulaLimpia = cedula.replace(/[-\s]/g, '');
    
    if (cedulaLimpia.length !== 11) {
        return { 
            valida: false, 
            mensaje: 'La cédula debe tener 11 dígitos', 
            detalles: '' 
        };
    }
    
    if (!/^\d+$/.test(cedulaLimpia)) {
        return { 
            valida: false, 
            mensaje: 'La cédula solo debe contener números', 
            detalles: '' 
        };
    }
    
    const digitoVerificador = parseInt(cedulaLimpia[10]);
    const cedulaSinVerificador = cedulaLimpia.substring(0, 10);
    
   
    let suma1 = 0;
    let detalleCalculo1 = 'Método JCE estándar:\n';
    
    for (let i = 0; i < cedulaSinVerificador.length; i++) {
        let digito = parseInt(cedulaSinVerificador[i]);
        const multiplicador = (i % 2 === 0) ? 1 : 2;
        let resultado = digito * multiplicador;
        
        if (resultado > 9) {
            resultado -= 9;
        }
        
        detalleCalculo1 += `Pos ${i}: ${digito} × ${multiplicador} = ${digito * multiplicador}${(digito * multiplicador) > 9 ? ` → ${resultado}` : ''}\n`;
        suma1 += resultado;
    }
    
    const digitoCalc1 = (10 - (suma1 % 10)) % 10;
    detalleCalculo1 += `Suma: ${suma1}, Módulo 10: ${suma1 % 10}, Dígito: ${digitoCalc1}`;
    
    
    let suma2 = 0;
    let detalleCalculo2 = '\n\nMétodo alternativo:\n';
    
    for (let i = 0; i < cedulaSinVerificador.length; i++) {
        let digito = parseInt(cedulaSinVerificador[i]);
        const multiplicador = (i % 2 === 0) ? 2 : 1;
        let resultado = digito * multiplicador;
        
        if (resultado > 9) {
            resultado -= 9;
        }
        
        detalleCalculo2 += `Pos ${i}: ${digito} × ${multiplicador} = ${digito * multiplicador}${(digito * multiplicador) > 9 ? ` → ${resultado}` : ''}\n`;
        suma2 += resultado;
    }
    
    const digitoCalc2 = (10 - (suma2 % 10)) % 10;
    detalleCalculo2 += `Suma: ${suma2}, Módulo 10: ${suma2 % 10}, Dígito: ${digitoCalc2}`;
    
    
    let suma3 = 0;
    let detalleCalculo3 = '\n\nMétodo suma de dígitos:\n';
    
    for (let i = 0; i < cedulaSinVerificador.length; i++) {
        let digito = parseInt(cedulaSinVerificador[i]);
        const multiplicador = (i % 2 === 0) ? 2 : 1;
        let resultado = digito * multiplicador;
        
        if (resultado > 9) {
            resultado = Math.floor(resultado / 10) + (resultado % 10);
        }
        
        detalleCalculo3 += `Pos ${i}: ${digito} × ${multiplicador} = ${digito * multiplicador}${(digito * multiplicador) > 9 ? ` → ${resultado}` : ''}\n`;
        suma3 += resultado;
    }
    
    const digitoCalc3 = (10 - (suma3 % 10)) % 10;
    detalleCalculo3 += `Suma: ${suma3}, Módulo 10: ${suma3 % 10}, Dígito: ${digitoCalc3}`;
    
    
    if (digitoCalc1 === digitoVerificador) {
        return { 
            valida: true, 
            mensaje: '✓ LA CÉDULA ES CORRECTA',
            detalles: detalleCalculo1 + '\n\n✓ Validación exitosa con Método JCE estándar'
        };
    } else if (digitoCalc2 === digitoVerificador) {
        return { 
            valida: true, 
            mensaje: '✓ LA CÉDULA ES CORRECTA',
            detalles: detalleCalculo2 + '\n\n✓ Validación exitosa con Método alternativo'
        };
    } else if (digitoCalc3 === digitoVerificador) {
        return { 
            valida: true, 
            mensaje: '✓ LA CÉDULA ES CORRECTA',
            detalles: detalleCalculo3 + '\n\n✓ Validación exitosa con Método suma de dígitos'
        };
    } else {
        return { 
            valida: false, 
            mensaje: `✗ LA CÉDULA ES INCORRECTA`,
            detalles: `Tu cédula tiene dígito verificador: ${digitoVerificador}\n\nDígitos esperados según diferentes métodos:\n- Método JCE estándar: ${digitoCalc1}\n- Método alternativo: ${digitoCalc2}\n- Método suma dígitos: ${digitoCalc3}\n\n${detalleCalculo1}${detalleCalculo2}${detalleCalculo3}`
        };
    }
}


function formatearCedula(valor) {
    return valor.replace(/[^\d-]/g, '').slice(0, 13);
}


function mostrarResultado(res) {
    resultado.classList.remove('hidden', 'exito', 'error', 'warning');
    
    let html = '';
    
    if (res.valida === true) {
        resultado.classList.add('exito');
        html = `<span class="resultado-icon">✓</span>
                <div>
                    <div class="resultado-mensaje">${res.mensaje}</div>`;
    } else if (res.valida === false) {
        resultado.classList.add('error');
        html = `<span class="resultado-icon">✗</span>
                <div>
                    <div class="resultado-mensaje">${res.mensaje}</div>`;
    } else {
        resultado.classList.add('warning');
        html = `<span class="resultado-icon">⚠</span>
                <div>
                    <div class="resultado-mensaje">${res.mensaje}</div>`;
    }
    
    if (res.detalles) {
        html += `<div class="resultado-detalles">${res.detalles}</div>`;
    }
    
    html += `</div>`;
    resultado.innerHTML = html;
}

cedulaInput.addEventListener('input', (e) => {
    e.target.value = formatearCedula(e.target.value);
});

cedulaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        validarBtn.click();
    }
});

validarBtn.addEventListener('click', () => {
    const cedula = cedulaInput.value.trim();
    
    if (!cedula) {
        mostrarResultado({ 
            valida: null, 
            mensaje: 'Por favor ingrese una cédula',
            detalles: ''
        });
        return;
    }
    
    const res = validarCedulaJCE(cedula);
    mostrarResultado(res);
});

limpiarBtn.addEventListener('click', () => {
    cedulaInput.value = '';
    resultado.classList.add('hidden');
    cedulaInput.focus();
});