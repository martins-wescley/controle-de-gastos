import test from "@playwright/test";
import { LoginPage } from "./support/pages/login/login";
import { HomePage } from "./support/pages";
import { LoginModel } from "./fixtures/login.model";
import { MovimentacaoPage } from "./support/pages/movimentacao/movimentacao"
import { postConta, deleteMovimentacao, deleteContaSemMovimentacao } from "./support/helpers";
import { MovimentacaoModel } from "./fixtures/movimentacao.model";
import data from './fixtures/login.json'
import movimentacaoData from './fixtures/movimentacao.json'

let loginPage: LoginPage
let homePage: HomePage
let movimentacaoPage: MovimentacaoPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    movimentacaoPage = new MovimentacaoPage(page)
})

test('Deve criar uma movimentação', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacao(movimentacao, movimentacaoData.alerts.movimentacaoAlertSuccess)
    await deleteMovimentacao(request, movimentacao.descricao)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeConta)
})

test('Deve validar obrigatoriedade do campo Data de Movimentação', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeContaData)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacaoSemDataMovimentacao(movimentacao, movimentacaoData.accounts.nomeContaData, movimentacaoData.alerts.movimentacaoDataAlert)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaData)
})

test('Deve validar obrigatoriedade do campo Data do Pagamento', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeContaPagamento)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacaoSemDataPagamento(movimentacao, movimentacaoData.accounts.nomeContaPagamento, movimentacaoData.alerts.movimentacaoPagamentoAlert)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaPagamento)
})

test('Deve validar obrigatoriedade do campo Descrição', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeContaDesc)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacaoSemDescricao(movimentacao, movimentacaoData.accounts.nomeContaDesc, movimentacaoData.alerts.movimentacaoDescAlert)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaDesc)
})

test('Deve validar obrigatoriedade do campo Interessado', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeContaInteressado)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacaoSemInterassado(movimentacao, movimentacaoData.accounts.nomeContaInteressado, movimentacaoData.alerts.movimentacaoInteressadoAlert)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaInteressado)
})

test('Deve validar obrigatoriedade do campo Valor', async ({ request }) => {
    const login = data.success as LoginModel
    const movimentacao = movimentacaoData.createTransactions as MovimentacaoModel
    await postConta(request, movimentacaoData.accounts.nomeContaValor)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarCriarMovimentacao()
    await movimentacaoPage.criarMovimentacaoSemValor(movimentacao, movimentacaoData.accounts.nomeContaValor, movimentacaoData.alerts.movimentacaoValorAlert, movimentacaoData.alerts.movimentacaoValorFormatAlert)
    await deleteContaSemMovimentacao(request, movimentacaoData.accounts.nomeContaValor)
})