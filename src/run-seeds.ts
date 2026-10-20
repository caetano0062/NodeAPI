import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds"; // Confirme se o caminho do import está correto no seu projeto

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...");
    await AppDataSource.initialize();
    console.log("Banco de dados conectado!");

    try {
        // Instanciando a classe do seed que criamos anteriormente
        const situationsSeeds = new CreateSituationsSeeds();
        
        // Executa as Seeds
        await situationsSeeds.run(AppDataSource);
        
    } catch(error) {
        
        console.log("Erro ao executar o seed:", error);
        
    } finally {
        
        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");
        
    }
};

// Chama a função para rodar
runSeeds();