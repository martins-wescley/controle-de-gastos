import test from "@playwright/test";
import { LoginPage } from "./support/pages/login/login";
import { HomePage } from "./support/pages";
import { LoginModel } from "./fixtures/login.model";
import data from './fixtures/login.json'
import { deleteMovimentacao, deleteContaSemMovimentacao, postMovimentacao } from "./support/helpers";
import movimentacaoData from './fixtures/movimentacao.json'
import { MovimentacaoModel } from "./fixtures/movimentacao.model";
import { ResumoMensalPage } from "./support/pages/resumoMensal/resumoMensal";

let loginPage: LoginPage
let homePage: HomePage
let resumoMensalPage: ResumoMensalPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    resumoMensalPage = new ResumoMensalPage(page)
})


test('Visualizar resumo mensal', { tag: '@regression' }, async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.readMonthlyReport as MovimentacaoModel
    await postMovimentacao(request, movimentacao)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarResumoMensal()
    await resumoMensalPage.visualizarResumoMensal(movimentacao)
    await resumoMensalPage.resumoMensalDeveEstarVisivel(movimentacao.descricao)
    await deleteMovimentacao(request, movimentacao.descricao)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaResumo)
})

test('Excluir resumo mensal', { tag: '@regression' }, async ({request}) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.deleteMonthlyReport as MovimentacaoModel
    await postMovimentacao(request, movimentacao)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarResumoMensal()
    await resumoMensalPage.visualizarResumoMensal(movimentacao)
    await resumoMensalPage.excluirResumoMensal(movimentacao.descricao, movimentacaoData.alerts.movimentacaoDeleteAlertSucess)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaExcluirResumo)
})