import test from "@playwright/test";
import { LoginPage } from "./support/pages/login/login";
import { HomePage } from "./support/pages";
import { ContaPage } from "./support/pages/conta/conta";
import { LoginModel } from "./fixtures/login.model";
import { deleteContaSemMovimentacao, postConta } from './support/helpers';
import data from './fixtures/login.json'
import listaData from './fixtures/listarConta.json'

let loginPage: LoginPage
let homePage: HomePage
let contaPage: ContaPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    contaPage = new ContaPage(page)
})

test('Deve editar uma conta', async({ request }) => {
    const login = data.success as LoginModel
    await postConta(request, listaData.editCount.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarListarConta()
    await contaPage.clicarBotaoEditar(listaData.editCount.nomeConta)
    await contaPage.editarConta(listaData.editCount.contaEditada, listaData.editCount.mensagemContaEditada)
    await contaPage.contaDeveEstarVisivel(listaData.editCount.contaEditada)
    await deleteContaSemMovimentacao(request,listaData.editCount.contaEditada)
})

test('Deve exibir alerta ao tentar editar uma conta em branco', async({ request }) => {
    const login = data.success as LoginModel
    await postConta(request, listaData.blankAccount.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarListarConta()
    await contaPage.clicarBotaoEditar(listaData.blankAccount.nomeConta)
    await contaPage.limparCampoConta()
    await contaPage.botaoSalvar()
    await contaPage.alertaDeErroDeveEstarVisivel(listaData.blankAccount.errorMessage)
    await deleteContaSemMovimentacao(request,listaData.blankAccount.nomeConta)
})

test('Deve exibir alerta ao tentar editar uma conta duplicada', async({ request }) => {
    const login = data.success as LoginModel
    await postConta(request, listaData.duplicatedAccount.nomeConta)
    await postConta(request, listaData.duplicatedAccount.contaDuplicada)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarListarConta()
    await contaPage.clicarBotaoEditar(listaData.duplicatedAccount.nomeConta)
    await contaPage.limparCampoConta()
    await contaPage.preencherCampoConta(listaData.duplicatedAccount.contaDuplicada)
    await contaPage.botaoSalvar()
    await contaPage.alertaDeErroDeveEstarVisivel(listaData.duplicatedAccount.errorMessage)
    await deleteContaSemMovimentacao(request, listaData.duplicatedAccount.nomeConta)
    await deleteContaSemMovimentacao(request, listaData.duplicatedAccount.contaDuplicada)
})

test('Deve excluir uma conta sem movimentação', async({ request }) => {
    const login = data.success as LoginModel
    await postConta(request, listaData.deleteAccount.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarListarConta()
    await contaPage.clicarBotaoExcluir(listaData.deleteAccount.nomeConta)
    await contaPage.alertaDeSucessoDeveEstarVisivel(listaData.deleteAccount.successDeleteAlert)
})

//test('Deve exibir um alerta ao tentar excluir uma conta com movimentação', async() => {})