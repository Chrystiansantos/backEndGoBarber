import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    /* aqui ficara minhas filas, o envio de cancelamento de email tera uma lista
    o de restauração de senha outra lista */
    this.queues = {};
    // irei dividir a inicializaçao das filas
    // irei importar os jobs
    this.init();
  }

  init() {
    /* Aqui irei percorrer os jobs como faço com o model */
    // este key e handle sao dos arquivos que estao dentro de const jobs
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          // aqui irei passar a conexao com o redis
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /* Este metodo ira adicionar emails na lista, para serem enviados */
  /*  add(fila que desejo adicionar o job,informaçoes que passaremos para o hadle montar o email) */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /* Aqui irei processar as filas */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
