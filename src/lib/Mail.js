import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    /* Maneira como o nodemailer chama uma conexao com um serviço externo  para evio de email
    e dentro dele preciso informar as configurações do config/mail.js */
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      /* Aqui irei verificar se possui um auth, caso nao tenha irei passar null,
      porque há algumas estrategias de envio de email que ele nao necessita de autenticaçao */
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    // this.transporter.sendMail que sera responsavel por enviar o email
    return this.transporter.sendMail({
      /* aqui irei pegar os dados do mailConfig.default se comar com a message que
      recebo por parametro */
      ...mailConfig.default,
      ...message,
    });
  }
}
export default new Mail();
