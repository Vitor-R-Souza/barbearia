/* conjunto de interfaces que definem os modelos de dados para o formulario e listagem de clientes (listagem em uma tabela) */

export interface ClientModelForm {
  id?: number
  name: string
  email: string
  phone: string
}

export interface ClientModelTable {
  id: number
  name: string
  email: string
  phone: string
}
