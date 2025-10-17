ALTER TABLE flyway_schema_history
    ADD checksum INTEGER;

ALTER TABLE flyway_schema_history
    ADD description VARCHAR(200) NOT NULL;

ALTER TABLE flyway_schema_history
    ADD execution_time INTEGER NOT NULL;

ALTER TABLE flyway_schema_history
    ADD installed_by VARCHAR(100) NOT NULL;

ALTER TABLE flyway_schema_history
    ADD installed_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL;

ALTER TABLE flyway_schema_history
    ADD installed_rank INTEGER NOT NULL;

ALTER TABLE flyway_schema_history
    ADD script VARCHAR(1000) NOT NULL;

ALTER TABLE flyway_schema_history
    ADD success BOOLEAN NOT NULL;

ALTER TABLE flyway_schema_history
    ADD type VARCHAR(20) NOT NULL;

ALTER TABLE flyway_schema_history
    ADD version VARCHAR(50);

ALTER TABLE flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);

CREATE INDEX flyway_schema_history_s_idx ON flyway_schema_history (success);