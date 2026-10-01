import { ConsultaDeAcervo } from "@/modules/acervo/solicitacoes/ConsultaDeAcervo";
import { ConsultaDeLivros } from "@/modules/acervo/solicitacoes/ConsultaDeLivros";
import { Solicitacao } from "@/modules/acervo/solicitacoes/Solicitacao";
import type { ConsultaDeAcervo } from "./ConsultaDeAcervo";

export class AcervoComoConsultaDeSolicitacoes implements ConsultaDeAcervo {
  constructor(private readonly livros: ConsultaDeLivros) {}

  existeNumeroRegistro(numeroRegistro: string): boolean {
    return this.livros.existeNumeroRegistro(numeroRegistro);
  }
}