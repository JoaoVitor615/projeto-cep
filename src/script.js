const btnConsulta = document.querySelector('#btnConsulta')
const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#logradouro')
const bairro = document.querySelector('#bairro')
const localidade = document.querySelector('#localidade')
const uf = document.querySelector('#uf')
const ddd = document.querySelector('#ddd')
const succes = document.querySelector('#succes')
const error = document.querySelector('#error')
const nova = document.querySelector('#btnNova')

btnConsulta.addEventListener('click', async (e) => {
    e.preventDefault()

    limpar()

    const cepBusca = cep.value.replace('-', '')
    const endereco = await getCep(cepBusca)

    async function showCep(){
        const result = await endereco
        console.log(result)
        if(result.erro == true ){
            if(error.classList.contains('hiden')){
                error.classList.toggle('hiden')
            }

        } else {
            logradouro.value = `${JSON.stringify(result.logradouro, undefined, 2).replace(/["]/g, "")}`
            bairro.value = `${JSON.stringify(result.bairro, undefined, 2).replace(/["]/g, "")}`
            localidade.value = `${JSON.stringify(result.localidade, undefined, 2).replace(/["]/g, "")}`
            uf.value = `${JSON.stringify(result.uf, undefined, 2).replace(/["]/g, "")}`
            ddd.value = `(${JSON.stringify(result.ddd, undefined, 2).replace(/["]/g, "")})`
            if(succes.classList.contains('hiden')){
                succes.classList.remove('hiden')
            }
        }
    }
    
    showCep()
    
})

function getCep(cep){
    const result = fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(data => data.json())
                    .then(data => { return data })
                    .catch(() => {
                        console.log("ocorreu um erro")
                        if(error.classList.contains('hiden')){
                            error.classList.remove('hiden')
                        }
                    })
                    

    return result
    
}

cep.addEventListener("keyup", formatarCep);

//formatação do cep
function formatarCep(e){
    var v= e.target.value.replace(/\D/g,"")                
    v=v.replace(/^(\d{5})(\d)/,"$1-$2") 
    e.target.value = v;
}

//botão de nova consulta
nova.addEventListener('click', (e) => {
    e.preventDefault()
    limpar()
    cep.value = ''
    
    cep.focus()

})


//função para limpar campos
function limpar(){
    if(succes.classList.contains('hiden') == false){
        succes.classList.add('hiden')
    }

    if(error.classList.contains('hiden') == false){
        error.classList.add('hiden')
    }

    logradouro.value = ``
    bairro.value = ``
    localidade.value = ``
    uf.value = ``
    ddd.value = ``
}