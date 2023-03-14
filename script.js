// alert('Estoy bien enlazado')
const moneyATM = [
    {
        denomination: 100000,
        amount: 5,
    },
    {
        denomination: 50000,
        amount: 10,
    },
    {
        denomination: 20000,
        amount: 15,
    },
    {
        denomination: 10000,
        amount: 8,
    },
    {
        denomination: 5000,
        amount: 20,
    },
]

const users = [
    {
        name: "Liliana",
        documentNumber: '66974041',
        password: "6697",
        typeUser: 1,
    },
    {
        name: "Victor",
        documentNumber: '1130626935',
        password: "1130",
        typeUser: 2,
    },
    {
        name: "Sayuri",
        documentNumber: '1111681230',
        password: "1230",
        typeUser: 2,
    },
    {
        name: "Valerie",
        documentNumber: '1111703972',
        password: "3972",
        typeUser: 2,
    }
];

const inicioCajero = () => {
    const numeroDocumento = prompt("Por favor ingrese su número de documento");
    const password = prompt("Por favor ingrese su contraseña");
    return {
        numeroDocumento,
        password,
    };
};

const validateUser = () => {
    let usuarioIniciado = inicioCajero();
    let userFound = users.find(
        (user) =>
            user.documentNumber === usuarioIniciado.numeroDocumento &&
            user.password === usuarioIniciado.password
    );
    while (!userFound) {
        alert("Los datos del usuario ingresado están incorrectos");
        usuarioIniciado = inicioCajero();
        userFound = users.find(
            (user) =>
                user.documentNumber === usuarioIniciado.numeroDocumento &&
                user.password === usuarioIniciado.password
        );
    }
    return userFound;
};
const depositarDinero = () => {
    alert("Vamos a depositar dinero");
    let totalDineroEnCajero = 0;
    moneyATM.forEach((billete) => {
        const cantidadDepositadaStr = prompt(
            `Por favor ingrese la cantidad de billetes de ${billete.denomination} a depositar`
        );
        const cantidadDepositada = Number(cantidadDepositadaStr);
        billete.amount += cantidadDepositada;
        const sumaDenominacion = billete.denomination * billete.amount;
        totalDineroEnCajero += sumaDenominacion;
        console.log(
            `Hay ${sumaDenominacion} en billetes de ${billete.denomination}`
        );
    });
    console.log("Dinero en cajero por denominación", moneyATM);
    console.log("Total de dinero en el cajero", totalDineroEnCajero);
};

const retirarDinero = () => {
    alert("vamos a retirar dinero")
    const cantidadRetirar = parseInt(prompt('Por favor ingrese la cantidad a retirar'));
    let totalEnCajero = 0;
    moneyATM.forEach((billetes) => {
        totalEnCajero += billetes.denomination * billetes.amount;
    });
    const restaCajero = totalEnCajero - cantidadRetirar;
    if(restaCajero < 0) {
        return {
            status: 'El cajero no tiene suficiente dinero'
        };
    } else if (restaCajero === 0){    
        return {
            status: 'Cajero cerrado'
        }
    } else if (restaCajero > 0) {
        const dineroSuficiente = [];
        let cantidadEntregar = restaCajero;
        moneyATM.forEach((billete) => {
            const billetesNecesarios = Math.floor(cantidadEntregar / billete.denomination);
            if (billetesNecesarios > 0) {
                if (billetesNecesarios <= billete.amount) {
                    const billetes = {
                        denominacion: billete.denomination,
                        cantidad: billetesNecesarios,
                    };
                    dineroSuficiente.push(billetes);
                    billetes.cantidad -= billetesNecesarios;
                    cantidadEntregar -= billetes.denominacion * billetesNecesarios;
                } else {
                    const billetes = {
                        denominacion: billete.denomination,
                        cantidad: billetes.amount,
                    };
                    dineroSuficiente.push(billetes);
                    cantidadEntregar -= billetes.denominacion * billetes.cantidad;
                    billetes.cantidad = billetes.cantidad > 0 ? 0 : 0;
                }
            }
        });

        if (cantidadEntregar) {
            return {
                status: 'El cajero no tiene suficiente sencillo'
            };
        } else {
            return {
                status: 'Cajero en funcionamiento'
            };
        }
    }
};

const transaccionesCajero = () => {
    const usuarioEncontrado = validateUser();
   
    if (usuarioEncontrado) {
        if (usuarioEncontrado.typeUser === 1) {
            
            depositarDinero();
        } else {
        
            retirarDinero();
        }
    }
};

transaccionesCajero();