/**
 * Forza una columna a tipo DATETIME (en lugar de DATETIMEOFFSET) en SQL Server, eliminando el DEFAULT CONSTRAINT si existe.
 *
 * @param {object} queryInterface - Query interface de Sequelize
 * @param {string} tableName - Nombre de la tabla (ej. 'ST_FakeUsers')
 * @param {string} columnName - Nombre de la columna en SQL Server (ej. 'FechaAlta')
 * @param {object} [options] - Opciones adicionales
 * @param {boolean} [options.allowNull=true] - Permitir nulos
 * @param {boolean} [options.reapplyDefault=false] - Si quieres volver a aplicar GETDATE() como default
 * @param {string} [options.constraintName] - Nombre del DEFAULT CONSTRAINT (opcional)
 */
async function forceDatetimeColumn(queryInterface, tableName, columnName, options = {}) {
    const {
        allowNull = true,
        reapplyDefault = false,
        constraintName
    } = options;

    const quotedTable = `[${tableName}]`;
    const quotedColumn = `[${columnName}]`;

    const constraintVar = constraintName
        ? `'${constraintName}'`
        : `(
        SELECT d.name
        FROM sys.default_constraints d
        JOIN sys.columns c ON d.parent_object_id = c.object_id AND d.parent_column_id = c.column_id
        WHERE OBJECT_NAME(d.parent_object_id) = '${tableName}' AND c.name = '${columnName}'
        )`;

    //? 1. Elimina el constraint existente si lo encuentra
    await queryInterface.sequelize.query(`
        DECLARE @constraintName NVARCHAR(200) = ${constraintVar};

        IF @constraintName IS NOT NULL
        EXEC('ALTER TABLE ${quotedTable} DROP CONSTRAINT ' + @constraintName);
    `);

    //? 2. Modifica la columna al tipo DATETIME
    await queryInterface.sequelize.query(`
        ALTER TABLE ${quotedTable}
        ALTER COLUMN ${quotedColumn} DATETIME ${allowNull ? 'NULL' : 'NOT NULL'};
    `);

    //? 3. (Opcional) Reasigna GETDATE() como default
    if (reapplyDefault) {
        const finalConstraintName = constraintName || `DF_${tableName}_${columnName}`;
        await queryInterface.sequelize.query(`
        ALTER TABLE ${quotedTable}
        ADD CONSTRAINT ${finalConstraintName}
        DEFAULT GETDATE() FOR ${quotedColumn};
        `);
    }
}

module.exports = { forceDatetimeColumn };
