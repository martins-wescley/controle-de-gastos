import { APIRequestContext, expect } from "@playwright/test";
import { LoginModel } from "../fixtures/login.model";
import { MovimentacaoModel } from "../fixtures/movimentacao.model";

async function getToken(request: APIRequestContext) {
    const login = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }
    const getJsonToken = await request.post('http://barrigarest.wcaquino.me/signin', { data: login })
    const apiRequestBody = JSON.parse(await getJsonToken.text())
    return apiRequestBody.token
}

async function getConta(request: APIRequestContext) {
    const token = await getToken(request)

    const getContas = await request.get('http://barrigarest.wcaquino.me/contas', {
        headers: {
            Authorization: `JWT ${token}`
        }
    })

    const contas = JSON.parse(await getContas.text())
    return contas
}

async function findContaIdByName(request: APIRequestContext, nomeConta: string) {
    const contas = await getConta(request)
    let contaId
    for (const data of contas) {
        if (data.nome == nomeConta) {
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
            Authorization: `JWT ${token}`
        }
    })
}

export async function postConta(request: APIRequestContext, nomeConta: string) {
    const token = await getToken(request)

    const novaConta = {
        nome: nomeConta
    }

    const target = await request.post('http://barrigarest.wcaquino.me/contas/', {
        data: novaConta,
        headers: {
            Authorization: `JWT ${token}`
        }
    })

    expect(target.status()).toBe(201)
}

//Movimentações
async function getMovimentacao(request: APIRequestContext) {
    const token = await getToken(request)

    const getMovimentacoes = await request.get('http://barrigarest.wcaquino.me/transacoes/', {
        headers: {
            Authorization: `JWT ${token}`
        }
    })

    const movimentacoes = JSON.parse(await getMovimentacoes.text())
    return movimentacoes
}

async function findMovimentacaoIdByName(request: APIRequestContext, descMovimentacao: string) {
    const movimentacaoes = await getMovimentacao(request)
    let movimentacaoId
    for (const data of movimentacaoes) {
        if (data.descricao == descMovimentacao) {
            movimentacaoId = data.id
        }
    }
    return movimentacaoId
}

export async function deleteMovimentacao(request: APIRequestContext, descMovimentacao: string) {
    const token = await getToken(request)
    const movimentacaoId = await findMovimentacaoIdByName(request, descMovimentacao)

    const target = await request.delete(`http://barrigarest.wcaquino.me/transacoes/${movimentacaoId}`, {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
}

export async function postMovimentacao(request: APIRequestContext, movimentacao: MovimentacaoModel) {
    const token = await getToken(request)
    await postConta(request, movimentacao.conta)
    const contaId = await findContaIdByName(request, movimentacao.conta)
    let status;

    if(movimentacao.situacao == "Pago") {
        status = true
    }else{
        status = false
    }

    const mov = { 
        "tipo": movimentacao.tipo,
        "data_transacao": movimentacao.dataMovimentacao,
        "data_pagamento": movimentacao.dataPagmento,
        "descricao": movimentacao.descricao,
        "envolvido": movimentacao.interessado,
        "valor": movimentacao.valor,
        "conta_id": contaId,
        "status": status
    }

    const target = await request.post('http://barrigarest.wcaquino.me/transacoes/', {
        data: mov,
        headers: {
            Authorization: `JWT ${token}`
        }
    })

    expect(target.status()).toBe(201)
}
