import { test } from '@playwright/test'
import { LoginModel } from './fixtures/login.model'
import { LoginPage } from './support/pages/login/login'
import data from './fixtures/login.json'

let loginPage: LoginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('Deve logar na aplicação', { tag: '@regression' }, async () => {
    const login = data.success as LoginModel
    await loginPage.go()
    await loginPage.login(login)
})

test('Deve validar os campos obrigatórios', async () => {
    await loginPage.go()
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(data.requiredFields.emailMessage)
    await loginPage.shouldBeVisible(data.requiredFields.passwordMessage)
})

test('Deve validar a obrigatoriedade do campo Email', async () => {
    await loginPage.go()
    await loginPage.fillPassword(data.emailRequired.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(data.emailRequired.alertMessage)
})

test('Deve validar a obrigatoriedade do campo Senha', async () => {
    await loginPage.go()
    await loginPage.fillEmail(data.passwordRequired.email)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(data.passwordRequired.alertMessage)
})

test('Deve validar a segurança - Usuário inexistente', async () => {
    const login = data.nonExistingUser as LoginModel
    await loginPage.go()
    await loginPage.fillEmail(login.email)
    await loginPage.fillPassword(login.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(login.message)
})

test('Deve validar a segurança - Senha inválida', async () => {
    const login = data.invalidPassword as LoginModel
    await loginPage.go()
    await loginPage.fillEmail(login.email)
    await loginPage.fillPassword(login.senha)
    await loginPage.botaoEntrar()
    await loginPage.shouldBeVisible(login.message)
})