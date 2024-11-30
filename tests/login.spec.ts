import { test } from '@playwright/test'
import { LoginModel } from './fixtures/login.model'
import { LoginPage } from './support/pages/login/login'

let loginPage: LoginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('Deve logar na aplicação', async () => {

    const login: LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }

    const successMensage = 'Bem vindo, Wescley Martins !';

    await loginPage.go()
    await loginPage.login(login, successMensage)
})

test('Deve validar os campos obrigatórios', async () => {
    const emailAlert = 'Email é um campo obrigatório'
    const passwordAlert = 'Senha é um campo obrigatório'

    await loginPage.go()
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(emailAlert)
    await loginPage.shouldBeVisible(passwordAlert)
})

test('Deve validar a obrigatoriedade do campo Email', async () => {

    const login: LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }

    const emailAlert = 'Email é um campo obrigatório'

    await loginPage.go()
    await loginPage.fillPassword(login.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(emailAlert)
})

test('Deve validar a obrigatoriedade do campo Senha', async () => {

    const login: LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: '1234@'
    }
    const passwordAlert = 'Senha é um campo obrigatório'

    await loginPage.go()
    await loginPage.fillEmail(login.email)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(passwordAlert)
})

test('Deve validar a segurança - Usuário inexistente', async () => {

    const login: LoginModel = {
        email: 'xpto02@gmail.com',
        senha: '1234@'
    }

    const loginAlert = 'Problemas com o login do usuário'

    await loginPage.go()
    await loginPage.fillEmail(login.email)
    await loginPage.fillPassword(login.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(loginAlert)
})

test('Deve validar a segurança - Senha inválida', async () => {
    const login: LoginModel = {
        email: 'wescleymartins02@outlook.com',
        senha: 'xpto@'
    }
    const loginAlert = 'Problemas com o login do usuário'

    await loginPage.go()
    await loginPage.fillEmail(login.email)
    await loginPage.fillPassword(login.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(loginAlert)
})