import chalk from 'chalk';
function listExtractor (linkArray){
    return linkArray.map((linkObject) => Object.values(linkObject).join());
}

async function statusCheck(URLlist){
    const arrStatus = await Promise
    .all(
        URLlist.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(erro){
                return errorManager(erro);
            }
    })
    )
    return arrStatus;
}

function errorManager(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return chalk.bgBlue("Link não encontrado");
    }else{
        return "Ocorreu alguma erro";
    }
}

export default async function validatedList (linkList)  {
    const list = listExtractor(linkList);
    const status = await statusCheck(list);
    return linkList.map((object, index) => ({
        ...object,
        status: status[index],
    }));
}
// [gatinho salsicha](http://gatinhosalsicha.com.br/)
// const res = await fetch("link");
//     if(res.ok){
//         const data = await res.json();
//         console.log(data);   
//     }