export interface TareaForm {
    titulo: string;
    descripcion: string;
    fechaEntrega: string;
    estado: string;
    cliente: string;
}

export interface Tarea {
    _id: string;
    titulo: string;
    descripcion: string;
    fechaEntrega: string;
    estado: string;
    cliente: {
        _id: string;
        nombre: string;
    };
}
