import { test } from '@playwright/test'
import { LoginPage } from './support/pages/login/login'
import { LoginModel } from './fixtures/login.model'
import { HomePage } from './support/pages'
import { ContaPage } from './support/pages/conta/conta'
import { deleteContaSemMovimentacao } from './support/helpers'

let loginPage: LoginPage
let homePage: HomePage
let contaPage: ContaPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    contaPage = new ContaPage(page)
})

test('Deve criar uma conta', async({ request }) => {

    const login: LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }
    const successMensage = 'Bem vindo, Wescley!';
    const nomeConta = 'Conta Teste'
    const mensagemContaCriada = 'Conta adicionada com sucesso!';
    await deleteContaSemMovimentacao(request, nomeConta)

    await loginPage.go()
    await loginPage.login(login, successMensage)

    await homePage.clicarAdicionarConta()
    
    await contaPage.criarConta(nomeConta, mensagemContaCriada);
    await contaPage.contaDeveEstarVisivel(nomeConta)
})