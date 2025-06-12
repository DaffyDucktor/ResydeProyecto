-- Tipo Residencia

DELETE FROM tipo_residencia;
INSERT INTO tipo_residencia values (1, "Edificio");
INSERT INTO tipo_residencia values (2, "Condominio");

-- Estado departamento

DELETE FROM estado_departamento;
INSERT INTO estado_departamento values (1, "Disponible");
INSERT INTO estado_departamento values (2, "Ocupado");

-- Estado recibo

DELETE FROM estado_recibo;
INSERT INTO estado_recibo values (1, "Pendiente");
INSERT INTO estado_recibo values (2, "Pagado");