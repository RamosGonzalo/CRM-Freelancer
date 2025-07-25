import Swal from "sweetalert2";

export const alertaExito = (msg: string) => {
    Swal.fire({
        icon: "success",
        title: "Éxito",
        text: msg,
        confirmButtonColor: "#0e7490",
    });
};

export const alertaError = (msg: string) => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: msg,
        confirmButtonColor: "#ef4444",
    });
};

export const confirmarEliminacion = async (): Promise<boolean> => {
    const res = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#94a3b8",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });

    return res.isConfirmed;
};
