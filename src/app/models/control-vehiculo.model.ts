export class ControlVehiculoModel {
    fecha!: Date;
    ruta!: number;
    numero_vueltas!: number;
    numero_buseta!: number;
    reg_salida!: number;
    reg_llegada!: number;
    otros!: object;
    neto_total!: number;
    conductor!: string;
    placa!: string;
    pico_placa!: boolean;
    taller!: boolean;
    estado!: string;
}