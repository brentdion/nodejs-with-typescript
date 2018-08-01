import * as Sequelize from 'sequelize';

const db = 'postgres';
const username = 'postgres';
const password = 'ChangeMe!';
const server = '192.168.99.100';
const port = 5432;

export const dbContext = new Sequelize(db,username,password,{
    host: server,
    dialect: 'postgres',
    port: port
});


dbContext.authenticate().then(function(){
    console.log('Database connection has been established successfully.');
})
.catch(function(err){
    console.log('Unable to connect to the database');
});

//for new blank db only. this will drop all tables and rebuild them. *** all data will be lost ***
//dbContext.sync({ force:true });