
import { createPool, Pool } from 'mysql';
let pool: Pool | null = null;

// Initialize the MySQL connector
const initializeMysqlConnector = () => {
    try {
        // Create a connection pool with the specified configuration
        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        // Log a debug message indicating that the pool has been generated successfully
        console.debug('MySql Adapter Pool generated successfully');
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        // Get a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('error mysql failed to connect');
                throw new Error('not able to connect to database');
            }
            else {
                console.log('connection made');
                connection.release();
            }
        });
    } catch (error) {
        console.error('[mysql.connector][InitializeMysqlConnector][Error]: ', error);
        throw new Error('failed to initialized pool');
    }
};

// Execute a MySQL query
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        // If the pool is not initialized, initialize it
        if (!pool) {
            initializeMysqlConnector();
        }

        // Return a promise that resolves to the query results
        return new Promise<T>((resolve, reject) => {
            // Execute the query with the provided parameters
            pool!.query(query, params, (error, results) => {
                // If there is an error, reject the promise with the error
                if (error) reject(error);
                // Otherwise, resolve the promise with the query results
                else resolve(results);
            });
        });
    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};

export { initializeMysqlConnector, pool };
