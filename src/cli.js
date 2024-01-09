import pegaArquivo from './index.js';
import chalk from 'chalk';
import fs from 'fs';
import validatedList from './http-validacao.js';

const path = process.argv;

async function listPrint(valida, result, archiveName){
    if(valida){
        console.log(chalk.yellow(`${archiveName} - lista de links:`), await validatedList(result));
    }
    else{
        console.log(
            chalk.yellow("Lista de links:"),
            chalk.black.bgGreen(archiveName),
            result);
    }
}
// pegaArquivo(path[2]);

async function textProcessor(args){
    let path = args[2];
    const validation = args[3] === '--valida';

    try{
        fs.lstatSync(path);
    }catch(erro){
        if(erro.code === 'ENOENT'){
            console.log(chalk.red("arquivo ou diretorio não existe."));
            return;
        }
    }
    if(fs.lstatSync(path).isFile()){
        const result = await pegaArquivo(path);
        listPrint(validation, result, path);
    }
    // percorre um diretorio pegando cada arquivo e lendo ele com a funcao pegaArquivo.
    else if(fs.lstatSync(path).isDirectory()){
        const archives = await fs.promises.readdir(path);
        //forEach para percorrer a lista de arquivos.
        archives.forEach(async (archiveName) => {
            const currentLinkedArchive = await pegaArquivo(`${path}/${archiveName}`);
            listPrint(validation, currentLinkedArchive, archiveName);
        });
    }
}

textProcessor(path);