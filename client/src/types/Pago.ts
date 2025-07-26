
export interface PagoForm {
    monto: number;
    moneda: string;
    estado: string;
    cliente: string;
}

export interface Pago {
    _id: string;
    monto: number;
    moneda: string;
    estado: string;
    cliente: {
        _id: string;
        nombre: string;
    };
    usuario: {
        _id: string;
        nombre: string;
    };
}
