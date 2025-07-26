export interface Tarea {
    _id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fechaEntrega: Date;
    cliente: { nombre: string };
}