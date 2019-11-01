export default {
  // endereco
  host: 'smtp.mailtrap.io',
  // porta
  port: 2525,
  // se e seguro ou nao
  secure: false,
  // usuario e senha, autenticação como se fosse para enviar um email
  auth: {
    user: '4448e9a39c8fdf',
    pass: 'dc5a96a6a8e59a',
  },
  /* aqui abaixo sera definido algumas configuraçoes padrao que sera utilizada
   para todo envio de email */
  default: {
    /* Remetente padrao dos emails */
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
