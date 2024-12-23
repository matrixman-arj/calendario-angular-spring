import { Usuario } from "./usuario";

export interface UsuarioPage {

  content: Usuario[]; // O conteúdo da página está na propriedade "content"
  usuarios: Usuario[]; // O array de usuarios está na propriedade "usuarios"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
