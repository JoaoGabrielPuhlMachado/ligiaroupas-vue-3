import axios from "axios";
export default class ProdutosApi {
  async buscarTodosOsProdutos() {
    const { data } = await axios.get("produtos/");
    return data;
  }
  async buscarProdutoPorId(id) {
    const { data } = await axios.get(`produtos/${id}/`);
    return data;
  }
  async adicionarProduto(produto) {
    const { data } = await axios.post("produtos/", produto);
    return data;
  }
  async atualizarProduto(produto) {
    const { data } = await axios.patch(`produtos/${produto.id}/`, produto);
    return data;
  }
  async excluirProduto(id) {
    const { data } = await axios.delete(`produtos/${id}/`);
    return data;
  }
}
