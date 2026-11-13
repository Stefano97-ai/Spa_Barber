-- ============================================================
-- DDL — Sistema de Citas para Barbería (Monolito)
-- Una sola base de datos PostgreSQL
-- ============================================================

CREATE TYPE rol_usuario AS ENUM ('CLIENTE', 'BARBERO', 'RECEPCION', 'ADMIN');
CREATE TYPE dia_semana AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');
CREATE TYPE estado_cita AS ENUM ('PENDIENTE_PAGO', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');
CREATE TYPE canal_pago AS ENUM ('ONLINE', 'PRESENCIAL');
CREATE TYPE estado_pago AS ENUM ('PENDIENTE', 'EXITOSO', 'FALLIDO');

-- ============================================================
-- MÓDULO: usuarios
-- ============================================================

CREATE TABLE usuario (
                         id              BIGSERIAL       PRIMARY KEY,
                         nombre          VARCHAR(100)    NOT NULL,
                         email           VARCHAR(150)    NOT NULL UNIQUE,
                         telefono        VARCHAR(20),
                         password_hash   VARCHAR(255)    NOT NULL,
                         rol             rol_usuario     NOT NULL,
                         activo          BOOLEAN         NOT NULL DEFAULT TRUE,
                         created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
                         updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE perfil_barbero (
                                id                      BIGSERIAL       PRIMARY KEY,
                                usuario_id              BIGINT          NOT NULL UNIQUE REFERENCES usuario(id),
                                especialidad            VARCHAR(100),
                                foto_url                VARCHAR(500),
                                calificacion_promedio   DECIMAL(2,1)    NOT NULL DEFAULT 0.0,
                                fecha_ingreso           DATE,
                                created_at              TIMESTAMP       NOT NULL DEFAULT NOW(),
                                updated_at              TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_usuario_rol_activo ON usuario(rol, activo);

-- ============================================================
-- MÓDULO: catalogo
-- ============================================================

CREATE TABLE servicio (
                          id              BIGSERIAL       PRIMARY KEY,
                          nombre          VARCHAR(100)    NOT NULL,
                          duracion_min    INT             NOT NULL CHECK (duracion_min > 0),
                          precio          DECIMAL(10,2)   NOT NULL CHECK (precio >= 0),
                          activo          BOOLEAN         NOT NULL DEFAULT TRUE,
                          created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
                          updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MÓDULO: reservas
-- ============================================================

CREATE TABLE horario_negocio (
                                 id              BIGSERIAL       PRIMARY KEY,
                                 dia_semana      dia_semana      NOT NULL UNIQUE,
                                 hora_apertura   TIME            NOT NULL,
                                 hora_cierre     TIME            NOT NULL,
                                 CHECK (hora_cierre > hora_apertura)
);

CREATE TABLE horario_semanal (
                                 id              BIGSERIAL       PRIMARY KEY,
                                 barbero_id      BIGINT          NOT NULL REFERENCES usuario(id),
                                 dia_semana      dia_semana      NOT NULL,
                                 hora_inicio     TIME            NOT NULL,
                                 hora_fin        TIME            NOT NULL,
                                 CHECK (hora_fin > hora_inicio),
                                 UNIQUE (barbero_id, dia_semana, hora_inicio)
);

CREATE TABLE bloqueo_disponibilidad (
                                        id              BIGSERIAL       PRIMARY KEY,
                                        barbero_id      BIGINT          NOT NULL REFERENCES usuario(id),
                                        fecha           DATE            NOT NULL,
                                        hora_inicio     TIME            NOT NULL,
                                        hora_fin        TIME            NOT NULL,
                                        motivo          VARCHAR(255),
                                        created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
                                        CHECK (hora_fin > hora_inicio)
);

CREATE TABLE cita (
                      id              BIGSERIAL       PRIMARY KEY,
                      cliente_id      BIGINT          NOT NULL REFERENCES usuario(id),
                      barbero_id      BIGINT          NOT NULL REFERENCES usuario(id),
                      fecha_hora      TIMESTAMP       NOT NULL,
                      estado          estado_cita     NOT NULL DEFAULT 'PENDIENTE_PAGO',
                      created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
                      updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- Constraint anti doble-booking (RF13)
CREATE UNIQUE INDEX idx_no_doble_booking
    ON cita(barbero_id, fecha_hora)
    WHERE (estado != 'CANCELADA');

CREATE INDEX idx_cita_cliente ON cita(cliente_id);
CREATE INDEX idx_cita_barbero_fecha ON cita(barbero_id, fecha_hora);
CREATE INDEX idx_cita_estado ON cita(estado);

CREATE TABLE cita_servicio (
                               id                  BIGSERIAL       PRIMARY KEY,
                               cita_id             BIGINT          NOT NULL REFERENCES cita(id),
                               servicio_id         BIGINT          NOT NULL REFERENCES servicio(id),
                               precio_aplicado     DECIMAL(10,2)   NOT NULL CHECK (precio_aplicado >= 0),
                               UNIQUE (cita_id, servicio_id)
);

-- ============================================================
-- MÓDULO: pagos
-- ============================================================

CREATE TABLE pago (
                      id                  BIGSERIAL       PRIMARY KEY,
                      cita_id             BIGINT          NOT NULL UNIQUE REFERENCES cita(id),
                      monto               DECIMAL(10,2)   NOT NULL CHECK (monto > 0),
                      canal               canal_pago      NOT NULL,
                      estado              estado_pago     NOT NULL DEFAULT 'PENDIENTE',
                      fecha_pago          TIMESTAMP,
                      registrado_por      BIGINT          REFERENCES usuario(id),
                      culqi_charge_id     VARCHAR(100),
                      created_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
                      updated_at          TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pago_fecha ON pago(fecha_pago);
CREATE INDEX idx_pago_canal ON pago(canal);
CREATE INDEX idx_pago_estado ON pago(estado);

-- ============================================================
-- MÓDULO: resenas
-- ============================================================

CREATE TABLE resena (
                        id              BIGSERIAL       PRIMARY KEY,
                        cita_id         BIGINT          NOT NULL UNIQUE REFERENCES cita(id),
                        calificacion    INT             NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
                        comentario      TEXT,
                        created_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MÓDULO: notificaciones
-- ============================================================

CREATE TYPE tipo_notificacion AS ENUM ('CONFIRMACION', 'RECORDATORIO', 'CANCELACION', 'NUEVA_CITA', 'REAGENDAMIENTO', 'BIENVENIDA');
CREATE TYPE canal_notificacion AS ENUM ('EMAIL', 'SMS');
CREATE TYPE estado_notificacion AS ENUM ('ENVIADA', 'FALLIDA', 'PENDIENTE');

CREATE TABLE notificacion (
                              id              BIGSERIAL               PRIMARY KEY,
                              tipo            tipo_notificacion       NOT NULL,
                              canal           canal_notificacion      NOT NULL,
                              destinatario    VARCHAR(200)            NOT NULL,
                              asunto          VARCHAR(255),
                              contenido       TEXT                    NOT NULL,
                              estado          estado_notificacion     NOT NULL DEFAULT 'PENDIENTE',
                              cita_id         BIGINT                  REFERENCES cita(id),
                              usuario_id      BIGINT                  REFERENCES usuario(id),
                              error_detalle   TEXT,
                              created_at      TIMESTAMP               NOT NULL DEFAULT NOW(),
                              enviada_at      TIMESTAMP
);

CREATE INDEX idx_notificacion_estado ON notificacion(estado);
CREATE INDEX idx_notificacion_tipo ON notificacion(tipo);