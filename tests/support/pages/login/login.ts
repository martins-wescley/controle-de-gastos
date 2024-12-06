import { Page, expect } from "@playwright/test"
import { LoginModel } from "../../../fixtures/login.model"

export class LoginPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('https://seubarriga.wcaquino.me/login')

    }

    async login(login: LoginModel) {
        const inputEmail = this.page.locator('#email')
        await inputEmail.fill(login.email)
        const inputPassword = this.page.locator('#senha')
        await inputPassword.fill(login.senha)
        await this.page.click('css=button >> text=Entrar')
        const target = this.page.locator(`css=.alert-success >> text=${login.message}`)
        await expect(target).toBeVisible()
    }

    async shouldBeVisible(alert: string) {
        const target = this.page.locator(`css=.alert-danger >> text=${alert}`)
        await expect(target).toBeVisible()
    }

    async botaoEntrar() {
        await this.page.click('css=button >> text=Entrar')
    }

    async fillEmail(email: string) {
        const inputPassword = this.page.locator('#email')
        await inputPassword.fill(email)
    }

    async fillPassword(password: string) {
        const inputPassword = this.page.locator('#senha')
        await inputPassword.fill(password)
    }
}