import { Sequelize } from 'sequelize';



const db = new Sequelize(process.env.BD_NAME || '',process.env.BD_USER || '',process.env.BD_PASS || '', {
    host: process.env.BD_HOST || '',
    dialect: 'mariadb',
    define: {
        timestamps: false
    }
    //logging: false
});

export default db;