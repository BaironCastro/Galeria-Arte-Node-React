-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2025 a las 01:52:23
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `galeria_arte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artista`
--

CREATE TABLE `artista` (
  `id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nacionalidad` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estilo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `artista`
--

INSERT INTO `artista` (`id`, `nombre`, `nacionalidad`, `estilo`) VALUES
(1, 'Frida Kahlo', 'Mexicana', 'Surrealismoo'),
(2, 'Pablo Picasso', 'Española', 'Cubismo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exposicion`
--

CREATE TABLE `exposicion` (
  `id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lugar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `exposicion`
--

INSERT INTO `exposicion` (`id`, `nombre`, `lugar`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Arte Moderno Contemporáneo', 'Museo de Arte Moderno', '2025-12-01 00:00:00', '2026-03-01 00:00:00'),
(2, 'Surrealismo y Revolución', 'Galería Nacional de Bogotá', '2026-01-15 00:00:00', '2026-04-15 00:00:00'),
(3, 'Colores del Neoexpresionismo', 'Centro Cultural FarraZone', '2025-11-20 00:00:00', '2026-02-20 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra`
--

CREATE TABLE `obra` (
  `id` int NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anio` int DEFAULT NULL,
  `tecnica` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_artista` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `obra`
--

INSERT INTO `obra` (`id`, `titulo`, `anio`, `tecnica`, `id_artista`) VALUES
(1, 'Las dos Fridas', 1939, 'Óleo sobre lienzoo', 1),
(2, 'Guernica', 1937, 'Óleo sobre lienzo', 2),
(4, 'Número 1A', 1948, 'Esmalte sobre lienzo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obraexpuesta`
--

CREATE TABLE `obraexpuesta` (
  `id` int NOT NULL,
  `id_obra` int DEFAULT NULL,
  `id_exposicion` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `obraexpuesta`
--

INSERT INTO `obraexpuesta` (`id`, `id_obra`, `id_exposicion`) VALUES
(2, 1, 1),
(4, 2, 2),
(5, 4, 3),
(7, 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artista`
--
ALTER TABLE `artista`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `exposicion`
--
ALTER TABLE `exposicion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_artista` (`id_artista`);

--
-- Indices de la tabla `obraexpuesta`
--
ALTER TABLE `obraexpuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obra` (`id_obra`),
  ADD KEY `id_exposicion` (`id_exposicion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artista`
--
ALTER TABLE `artista`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `exposicion`
--
ALTER TABLE `exposicion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `obra`
--
ALTER TABLE `obra`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `obraexpuesta`
--
ALTER TABLE `obraexpuesta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `obra`
--
ALTER TABLE `obra`
  ADD CONSTRAINT `obra_ibfk_1` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_10` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_11` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_12` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_13` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_14` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_15` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_16` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_17` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_18` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_19` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_2` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_20` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_3` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_4` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_5` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_6` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_7` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_8` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `obra_ibfk_9` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `obraexpuesta`
--
ALTER TABLE `obraexpuesta`
  ADD CONSTRAINT `obraexpuesta_ibfk_1` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`),
  ADD CONSTRAINT `obraexpuesta_ibfk_10` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_11` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_12` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_13` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_14` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_15` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_16` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_17` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_18` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_19` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_2` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`),
  ADD CONSTRAINT `obraexpuesta_ibfk_20` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_21` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_22` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_23` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_24` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_25` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_26` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_27` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_28` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_29` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_3` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_30` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_31` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_32` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_33` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_34` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_35` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_36` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_37` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_38` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_39` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_4` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_40` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_5` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_6` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_7` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_8` FOREIGN KEY (`id_exposicion`) REFERENCES `exposicion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obraexpuesta_ibfk_9` FOREIGN KEY (`id_obra`) REFERENCES `obra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
