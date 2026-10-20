import { DataSource } from "typeorm"
import { Situation } from "../entity/Situations" // Verifique se o caminho da sua entidade está correto

export default class CreateSituationsSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        // Instanciando o repositório (corrigido com 'r' no final)
        const situationRepository = dataSource.getRepository(Situation);

        const existingCount = await situationRepository.count();

        if (existingCount > 0) {
            console.log("A tabela 'situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const situations = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" }
        ];

        await situationRepository.save(situations);

        console.log("seed concluido com sucesso: situações cadastradas!");
    }
}