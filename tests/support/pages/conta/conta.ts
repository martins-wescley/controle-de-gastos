import { Page, expect } from "@playwright/test";

export class ContaPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async criarConta(nomeConta: string, successMensage: string) {
        const campoConta = this.page.locator('#nome')
        await campoConta.fill(nomeConta)
        const salvar = this.page.locator('css=button >> text=Salvar')
        await salvar.click()
        const target = this.page.locator(`css=.alert-success >> text=${successMensage}`)
        await expect(target).toBeVisible()
    }

    async contaDeveEstarVisivel(nomeConta: string){
        const target = this.page.locator('#tabelaContas > tbody > tr', {hasText: nomeConta})
        await expect(target).toBeVisible()
    }

    async alertaDeErroDeveEstarVisivel(erroAlert: string) {
        const target = this.page.locator(`css=.alert-danger >> text=${erroAlert}`)
        await expect(target).toBeVisible()
    }

    async alertaDeSucessoDeveEstarVisivel(successAlert: string) {
        const target = this.page.locator(`css=.alert-success >> text=${successAlert}`)
        await expect(target).toBeVisible()
    }

    async preencherCampoConta(nomeConta: string) {
        const campoConta = this.page.locator('#nome')
        await campoConta.fill(nomeConta)
    }

    async botaoSalvar() {
        const botaoSalvarConta = this.page.locator('css=button >> text=Salvar')
        await botaoSalvarConta.click()
    }

    async clicarBotaoEditar(nomeConta: string) {
        const botaoEditar = this.page.locator(`xpath=//*[contains(text(), "${nomeConta}")]/..//a/span[@class="glyphicon glyphicon-edit"]`)
        await botaoEditar.click()
    }

    async clicarBotaoExcluir(nomeConta: string) {
        const botaoEditar = this.page.locator(`xpath=//*[contains(text(), "${nomeConta}")]/..//a/span[@class="glyphicon glyphicon-remove-circle"]`)
        await botaoEditar.click()
    }

    async editarConta(contaEditada: string, successMensage: string) {
        const campoConta = this.page.locator('#nome')
        await campoConta.clear()
        await campoConta.fill(contaEditada)
        const salvar = this.page.locator('css=button >> text=Salvar')
        await salvar.click()
        const target = this.page.locator(`css=.alert-success >> text=${successMensage}`)
        await expect(target).toBeVisible()
    }

    async limparCampoConta() {
        const campoConta = this.page.locator('#nome')
        await campoConta.clear()
    }
}