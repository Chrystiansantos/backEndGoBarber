import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // esta tabela de agendamento ira pertencer a um usuario, pois um usuario marcou este a gendamento
    // QUANDO UMA TABELA TEM RELACIONAMENTO +2 MODULOS SOU OBRIGADO A DAR UM APELIDO "AS"
    // Se nao o Sequelize ira se perder com qual relacionamento utilizar
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    /* esta tabela ira pertencer a um usuario porem que seja um provider */
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default Appointment;
