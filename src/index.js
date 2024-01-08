import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  //Nome do link = chave e link = value do map.
    if(resultados.length !== 0){
      return resultados;
    }
    else{
      return "não tem links";
    }
}

function trataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro)
  }
}
export default pegaArquivo;



//funcao com promises e then()

// function pegaArquivo(caminhoDoArquivo){
    //     const encoding = 'utf-8';
    //     fs.promises
    //         .readFile(caminhoDoArquivo, encoding)
    //         .then((texto) => console.log(chalk.green(texto)))
    //         .catch(trataErro);
    // }
    
    //funcao com tratador de erro na mão.
    
    // function pegaArquivo(caminhoDoArquivo){
        //     const encoding = 'utf-8';
        //     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
            //         if(erro){
                //             trataErro(erro);
                //         }
                //         console.log(chalk.green(texto));
                //     });
                // }
                
//        \[[ˆ[\]]*?\]
//         \(https?:\/\/[^\s?#.].[^\s]*\)