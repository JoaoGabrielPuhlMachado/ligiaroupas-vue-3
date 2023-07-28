import axios from "axios";
export default class ImagensApi {
  async buscarTodasAsImagens() {
    const { data } = await axios.get("media/images/");
    return data;
  }
  async buscarImagemPorId(id) {
    const { data } = await axios.get(`media/images/${id}/`);
    return data;
  }
  async adicionarImagem(imagem) {
    const { data } = await axios.post("media/images/", imagem);
    return data;
  }
  async atualizarImagem(imagem) {
    const { data } = await axios.put(`media/images/${imagem.id}/`, imagem);
    return data;
  }
  async excluirImagem(id) {
    const { data } = await axios.delete(`media/images/${id}/`);
    return data;
  }
}
