export const formatearFecha = (fechaISO: string): string => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-AR", {
        timeZone: "UTC",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
