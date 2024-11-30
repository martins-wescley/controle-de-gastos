import { Page, expect } from "@playwright/test";
import exp from "constants";

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
        const target = await this.page.locator('#tabelaContas > tbody > tr', {hasText: nomeConta})
        await console.log(target)
        await expect(target).toBeVisible()
    }
}