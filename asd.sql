-- Volcado de datos para la tabla `reclamos_estado`

INSERT INTO `reclamosestado` (`idReclamoEstado`, `descripcion`, `activo`) VALUES
(1, 'Creado', 1),
(2, 'En Proceso', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 1);


-- Volcado de datos para la tabla `reclamos_tipo`

INSERT INTO `reclamostipo` (`idReclamoTipo`, `descripcion`, `activo`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1),
(14, 'tipo reclamos creado en clase', 0);


-- Volcado de datos para la tabla `usuarios_tipo`

INSERT INTO `usuariostipo` (`idUsuarioTipo`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);


-- Volcado de datos para la tabla `usuarios`

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idTipoUsuario`, `imagen`, `activo`) VALUES
(1, 'Daenerys', 'Targaryen', 'daetar@correo.com', 'b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3', 1, NULL, 1),
(2, 'Jon', 'Snow', 'jonsno@gmail.com', 'd98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5', 1, NULL, 1),
(3, 'Tyrion', 'Lannister', 'tyrlan@correo.com', '9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9', 2, NULL, 1),
(4, 'Margaery', 'Tyrell', 'martyr@correo.com', 'ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57', 2, NULL, 1),
(5, 'Samwell', 'Tarly', 'samtar@correo.com', 'a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde', 2, NULL, 1),
(6, 'Jeor', 'Mormont', 'jeomor@correo.com', 'ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca', 2, NULL, 1),
(7, 'Khal', 'Drogo', 'khadro@gmail.com', '84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37', 3, NULL, 1),
(8, 'Catelyn', 'Stark', 'catsta@correo.com', '229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7', 3, NULL, 1),
(9, 'Yara', 'Greyjoy', 'yargre@correo.com', '097c61d6a3ee77e4f4a9d2c6b6fb284ee927a0c315f30172f685e4659a4f621b', 3, NULL, 1),
(12, 'Jose', 'Battaglia', 'josbat@gmail.com', 'c30d798692466db470eafebfb04c272b359c80f2ebbac6f51f6e9ff9b6e3177b', 3, NULL, 1);


-- Volcado de datos para la tabla `oficinas`

INSERT INTO `oficinas` (`idOficina`, `nombre`, `idReclamoTipo`, `activo`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 1),
(4, 'Dpto. de Facturación', 9, 1);


-- Volcado de datos para la tabla `usuarios_oficinas`

INSERT INTO `usuariosoficinas` (`idUsuarioOficina`, `idUsuario`, `idOficina`, `activo`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 8, 3, 1),
(4, 9, 4, 1);


-- Volcado de datos para la tabla `reclamos`

INSERT INTO `reclamos` (`idReclamo`, `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`, `idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
(5, 'ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),
(6, 'rotura de  motor ', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(11, 'suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2, 3, 8, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 12, NULL);
