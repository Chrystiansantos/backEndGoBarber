import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
// models
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  // este metodo ficara responsavel por fazer a conexão e carregar os models
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      /* model.associate && model.associate(this.coonection), este metodo sera responsavel por associar
      os model que possui relacionamento caso exista por isso preciso do && ele verifica se existe o
      metodo associate dentro do model caso exista ele passa o this.connection para dentro do metodo
    */
      // this.conection.models sera todos os models da minha aplicação
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
