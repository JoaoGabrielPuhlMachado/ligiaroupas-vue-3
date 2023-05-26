import axios from 'axios';
export default class ItensApi {
  async buscarTodosOsItens() {
    const { data } = await axios.get('/itens/');
    return data;
  }
  async adicionarItem(item) {
    const { data } = await axios.post('/itens/', item);
    return data;
  }
  async atualizarItem(item) {
    const { data } = await axios.put(`/itens/${item.id}/`, item);
    return data;
  }
  async excluirItem(id) {
    const { data } = await axios.delete(`/itens/${id}/`);
    return data;
  }
}
