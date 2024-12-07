import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async clicarAdicionarConta() {
        const dropdownContas = this.page.locator('css=a >> text=Contas')
        await dropdownContas.click()
        const adicionarConta = this.page.locator('css=a >> text=Adicionar')
        await adicionarConta.click()
    }

    async clicarListarConta() {
        const dropdownContas = this.page.locator('css=a >> text=Contas')
        await dropdownContas.click()
        const adicionarConta = this.page.locator('css=a >> text=Listar')
        await adicionarConta.click()
    }

    async clicarCriarMovimentacao() {
        const dropdownContas = this.page.locator('css=a >> text=Criar Movimentação')
        await dropdownContas.click()
    }

    async clicarResumoMensal() {
        const dropdownContas = this.page.locator('css=a >> text=Resumo Mensal')
        await dropdownContas.click()
    }
} 