import { expect, Locator, Page } from "@playwright/test";
import { MovimentacaoModel } from "../../../fixtures/movimentacao.model";

export class MovimentacaoPage {
    readonly page:Page
    readonly inputDataMovimentacao: Locator
    readonly inputDataPagamento: Locator
    readonly inputDescricao: Locator
    readonly inputInteressado: Locator
    readonly inputValor: Locator
    readonly situacaoPago: Locator
    readonly situacaoPendente: Locator


    constructor(page: Page){
        this.page = page
        this.inputDataMovimentacao = page.locator('input[id="data_transacao"]')
        this.inputDataPagamento = page.locator('input[id="data_pagamento"]')
        this.inputDescricao = page.locator('input[id="descricao"]')
        this.inputInteressado = page.locator('input[id="interessado"]')
        this.inputValor = page.locator('input[id="valor"]')
        this.situacaoPago = page.locator('input[id="status_pago"]')
        this.situacaoPendente = page.locator('input[id="status_pendente"]')
    }

    async selecionarTipoMovimentacao(opcao: string) {
        const selectOption = '#tipo'
        await this.page.selectOption(selectOption, {value: opcao})
    }

    async criarMovimentacao(movimentacaoModel: MovimentacaoModel, alertMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataMovimentacao.fill(movimentacaoModel.dataMovimentacao)
        await this.inputDataPagamento.fill(movimentacaoModel.dataPagmento)
        await this.inputDescricao.fill(movimentacaoModel.descricao)
        await this.inputInteressado.fill(movimentacaoModel.interessado)
        await this.inputValor.fill(movimentacaoModel.valor.toString())
        await this.page.selectOption('#conta', { label: movimentacaoModel.conta})
        await this.situacaoPago.click()
        await this.page.locator('css=button >> text=Salvar').click()

        let target = this.page.locator(`css=.alert-success >> text=${alertMessage}`)
        if(!target) {
            target = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        }
        await expect(target).toBeVisible()
        
    }

    async criarMovimentacaoSemDataMovimentacao(movimentacaoModel: MovimentacaoModel, opcao: string , alertMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataPagamento.fill(movimentacaoModel.dataPagmento)
        await this.inputDescricao.fill(movimentacaoModel.descricao)
        await this.inputInteressado.fill(movimentacaoModel.interessado)
        await this.inputValor.fill(movimentacaoModel.valor.toString())
        await this.page.selectOption('#conta', { label: opcao})
        await this.situacaoPago.click()

        await this.page.locator('css=button >> text=Salvar').click()
        const target = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        await expect(target).toBeVisible()
    }

    async criarMovimentacaoSemDataPagamento(movimentacaoModel: MovimentacaoModel, opcao: string ,alertMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataMovimentacao.fill(movimentacaoModel.dataMovimentacao)
        await this.inputDescricao.fill(movimentacaoModel.descricao)
        await this.inputInteressado.fill(movimentacaoModel.interessado)
        await this.inputValor.fill(movimentacaoModel.valor.toString())
        await this.page.selectOption('#conta', { label: opcao})
        await this.situacaoPago.click()

        await this.page.locator('css=button >> text=Salvar').click()
        const target = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        await expect(target).toBeVisible()
    }

    async criarMovimentacaoSemDescricao(movimentacaoModel: MovimentacaoModel, opcao: string, alertMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataMovimentacao.fill(movimentacaoModel.dataMovimentacao)
        await this.inputDataPagamento.fill(movimentacaoModel.dataPagmento)
        await this.inputInteressado.fill(movimentacaoModel.interessado)
        await this.inputValor.fill(movimentacaoModel.valor.toString())
        await this.page.selectOption('#conta', { label: opcao})
        await this.situacaoPago.click()

        await this.page.locator('css=button >> text=Salvar').click()
        const target = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        await expect(target).toBeVisible()
    }

    async criarMovimentacaoSemInterassado(movimentacaoModel: MovimentacaoModel,  opcao: string, alertMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataMovimentacao.fill(movimentacaoModel.dataMovimentacao)
        await this.inputDataPagamento.fill(movimentacaoModel.dataPagmento)
        await this.inputDescricao.fill(movimentacaoModel.descricao)
        await this.inputValor.fill(movimentacaoModel.valor.toString())
        await this.page.selectOption('#conta', { label: opcao})
        await this.situacaoPago.click()

        await this.page.locator('css=button >> text=Salvar').click()
        const target = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        await expect(target).toBeVisible()
    }

    async criarMovimentacaoSemValor(movimentacaoModel: MovimentacaoModel,  opcao: string,alertMessage: string, formatMessage: string) {
        await this.page.selectOption('#tipo', {value: movimentacaoModel.tipo})
        await this.inputDataMovimentacao.fill(movimentacaoModel.dataMovimentacao)
        await this.inputDataPagamento.fill(movimentacaoModel.dataPagmento)
        await this.inputDescricao.fill(movimentacaoModel.descricao)
        await this.inputInteressado.fill(movimentacaoModel.interessado)
        await this.page.selectOption('#conta', { label: opcao})
        await this.situacaoPago.click()

        await this.page.locator('css=button >> text=Salvar').click()
        const targetA = this.page.locator(`css=.alert-danger >> text=${alertMessage}`)
        const targetB = this.page.locator(`css=.alert-danger >> text=${formatMessage}`)
        await expect(targetA).toBeVisible()
        await expect(targetB).toBeVisible()
    }

}