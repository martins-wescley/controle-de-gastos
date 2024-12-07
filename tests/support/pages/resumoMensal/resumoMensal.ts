import { Page, expect } from "@playwright/test";
import { MovimentacaoModel } from "../../../fixtures/movimentacao.model";

export class ResumoMensalPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visualizarResumoMensal(movimentacao: MovimentacaoModel) {
        const data = movimentacao.dataMovimentacao
        const lista = data.split('/')
        const mes = lista[1]
        const ano = lista[2] 
        const selectMonth = '#mes'
        await this.page.selectOption(selectMonth, {value: mes})
        const selectYear = '#ano'
        await this.page.selectOption(selectYear, {value: ano})
        await this.page.locator('css=input >> text=Buscar').click()
    }

    async resumoMensalDeveEstarVisivel(descricao: string){
        const target = this.page.locator('#tabelaExtrato > tbody > tr', {hasText: descricao})
        await
        expect(target).toBeVisible()
    }

    async excluirResumoMensal(descriacao: string, successAlert: string) {
        const botaoEditar = this.page.locator(`xpath=//*[contains(text(), "${descriacao}")]/..//a/span[@class="glyphicon glyphicon-remove-circle"]`)
        await botaoEditar.click()
        const target = this.page.locator(`css=.alert-success >> text=${successAlert}`)
        await expect(target).toBeVisible()
    }
}