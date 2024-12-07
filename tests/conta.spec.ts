import { test } from '@playwright/test'
import { LoginPage } from './support/pages/login/login'
import { LoginModel } from './fixtures/login.model'
import { HomePage } from './support/pages'
import { ContaPage } from './support/pages/conta/conta'
import { deleteContaSemMovimentacao, postConta } from './support/helpers'
import loginData from './fixtures/login.json'
import contaData from './fixtures/conta.json'

let loginPage: LoginPage
let homePage: HomePage
let contaPage: ContaPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    contaPage = new ContaPage(page)
})

test('Deve criar uma conta', { tag: '@regression' }, async ({ request }) => {
    const login = loginData.success as LoginModel
    await deleteContaSemMovimentacao(request, contaData.success.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarAdicionarConta()
    await contaPage.criarConta(contaData.success.nomeConta, contaData.success.successMessage);
    await contaPage.contaDeveEstarVisivel(contaData.success.nomeConta)
    await deleteContaSemMovimentacao(request, contaData.success.nomeConta)
})

test('Deve exibir alerta ao tentar criar uma conta em branco', async () => {
    const login = loginData.success as LoginModel
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarAdicionarConta()
    await contaPage.botaoSalvar()
    await contaPage.alertaDeErroDeveEstarVisivel(contaData.blankCount.errorMessage)
})

test('Deve exibir alerta ao tentar criar uma conta duplicada', async ({ request }) => {
    const login = loginData.success as LoginModel
    await postConta(request, contaData.duplicated.nomeConta)
    await loginPage.go()
    await loginPage.login(login)
    await homePage.clicarAdicionarConta()
    await contaPage.preencherCampoConta(contaData.duplicated.nomeConta)
    await contaPage.botaoSalvar()
    await contaPage.alertaDeErroDeveEstarVisivel(contaData.duplicated.errorMessage)
    await deleteContaSemMovimentacao(request, contaData.duplicated.nomeConta)
})