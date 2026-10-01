import { SolicitacaoRepository } from "../repositories/SolicitacaoRepository";  
import { ConsultaDeAcervo } from "../services/ConsultaDeAcervo";
import { NovaSolicitacao } from "./NovaSolicitacao";
import { SolicitacaoJson, solicitacaoToJson } from "./SolicitacaoJson";
import { Solicitacao } from "./Solicitacao";
import { NotFound } from "@/shared/domain/NotFound";
import { RuleConflict } from "@/shared/domain/RuleConflict";

export class RegistrarSolicitacao {
  constructor(
    private readonly solicitacoes: SolicitacaoRepository,
    private readonly acervo: ConsultaDeAcervo,
  ) {}

  execute(input: NovaSolicitacao): SolicitacaoJson {
    if (!this.acervo.existeNumeroRegistro(input.numeroRegistro)) {
      throw new NotFound("Livro não encontrado");
    }
    if (this.solicitacoes.findByMatriculaELivro(
      input.matricula, input.numeroRegistro,
    )) {
      throw new RuleConflict("Leitor já solicitou este livro");
    }

    const solicitacao = this.solicitacoes.insert(Solicitacao.registrar(
      input.numeroRegistro,
      input.matricula,
      input.diasPretendidos,
      input.observacao,
    ));
    return solicitacaoToJson(solicitacao);
  }
}