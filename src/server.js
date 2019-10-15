import app from './app';

const porta = 3000;
app.listen(porta, () => {
  console.log(`Aplicação rodando na porta ${porta}`);
});
