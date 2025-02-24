USE sistema_votaciones;-- Tabla de Candidatos (Representantes y Personeros)
CREATE TABLE candidatos (
    id_candidato INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    -- salon al que pertenece
    biografia TEXT,
    -- Biografía o presentación del candidato
    foto_url VARCHAR(255) -- Enlace a la foto del candidato (opcional)
);-- Tabla de Votaciones
CREATE TABLE votaciones (
    id_voto INT AUTO_INCREMENT PRIMARY KEY,
    id_candidato INT,
    -- ID del candidato que recibió el voto
    id_estudiante INT,
    -- ID del estudiante que votó
    fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_candidato) REFERENCES candidatos(id_candidato) ON DELETE CASCADE
);-- Tabla de Resultados
1 ° 01 2 ° 01 2 ° 02 3 ° 01 3 ° 02 4 ° 01 4 ° 02 5 ° 01 5 ° 02 5 ° 03 6 ° 01 6 ° 02 6 ° 03 7 ° 01 7 ° 02 7 ° 03 8 ° 01 8 ° 02 8 ° 03 9 ° 01 9 ° 03 10 ° 01 10 ° 02 10 ° 03 11 ° 01 11 ° 02 11 ° 03 11 ° 04