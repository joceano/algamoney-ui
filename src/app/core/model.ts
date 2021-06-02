export class Estado {
  codigo = 0;
  nome = '';
}

export class Cidade {
  codigo = 0;
  nome = '';
  estado = new Estado();
}

export class Endereco {
  logradouro = '';
  numero = '';
  complemento = '';
  bairro = '';
  cep = '';
  cidade = new Cidade();
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(
    codigo = 0,
    nome = '',
    email = '',
    telefone = '') {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
    }
}

export class Pessoa {
  codigo = 0;
  nome = '';
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo = 0;
}

export class Lancamento {
  codigo = 0;
  tipo = 'RECEITA';
  descricao = '';
  dataVencimento = new Date;
  dataPagamento = new Date;
  valor = 0;
  observacao = '';
  pessoa = new Pessoa();
  categoria = new Categoria();
  anexo = '';
  urlAnexo = '';
}
