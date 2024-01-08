import pegaArquivo from './index.js';
import chalk from 'chalk';
import fs from 'fs';

const path = process.argv;

function listPrint(result, archiveName){
    console.log(chalk.yellow(`${archiveName} - lista de links:`), result);
}
// pegaArquivo(path[2]);

async function textProcessor(args){
    let path = args[2];
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
        listPrint(result);
    }
    // percorre um diretorio pegando cada arquivo e lendo ele com a funcao pegaArquivo.
    else if(fs.lstatSync(path).isDirectory()){
        const archives = await fs.promises.readdir(path);
        //forEach para percorrer a lista de arquivos.
        archives.forEach(async (archiveName) => {
            const currentLinkedArchive = await pegaArquivo(`${path}/${archiveName}`);
            listPrint(currentLinkedArchive, archiveName);
        });
    }
}

textProcessor(path);