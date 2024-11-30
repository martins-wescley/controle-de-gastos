import { APIRequestContext } from "@playwright/test";
import { LoginModel } from "../fixtures/login.model";

async function getToken(request: APIRequestContext) {
    const login:LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }
    const getJsonToken = await request.post('http://barrigarest.wcaquino.me/signin', {data: login})
    const apiRequestBody = JSON.parse(await getJsonToken.text())
    return apiRequestBody.token
}

async function getConta(request: APIRequestContext) {
    const token = await getToken(request)

    const getContas = await request.get('http://barrigarest.wcaquino.me/contas', {
        headers: {
            Authorization:`JWT ${token}`
        }
    })

    const contas = JSON.parse(await getContas.text())
    return contas
}

async function findContaIdByName(request: APIRequestContext, nomeConta: string) {
    const contas = await getConta(request)
    let contaId
    for(const data of contas) {
        if(data.nome == nomeConta){
            contaId = data.id
        }
    }
    return contaId
}

export async function deleteContaSemMovimentacao(request: APIRequestContext, nomeConta: string) {
    const token = await getToken(request)
    const contaId = await findContaIdByName(request, nomeConta)

    await request.delete(`http://barrigarest.wcaquino.me/contas/${contaId}`, {
        headers: {
            Authorization:`JWT ${token}`
        }
    })
}
