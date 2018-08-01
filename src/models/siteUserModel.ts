import * as Sequelize from 'sequelize';
import { dbContext } from '../db-config/dbContext';

export const siteUserModel = dbContext.define('SiteUserModel',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    firstname:{
        type: Sequelize.STRING
    },
    lastname:{
        type: Sequelize.STRING
    }
},
{
    timestamps:false,
    freezeTableName:true,
    tableName:'SiteUsers'
});