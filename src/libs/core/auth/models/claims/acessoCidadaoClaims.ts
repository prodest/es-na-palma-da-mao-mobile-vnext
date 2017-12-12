/**
 * Claims do Acesso Cidadão
 *
 */
export interface AcessoCidadaoClaims {
    /**
     * Claim indicando se o celular do usuário está validado
     */
    celularValidado: boolean

    /**
     * Claim com cpf do usuário
     *
     */
    cpf: string

    /**
     * Claim com a data de nascimento do usuário
     *
     */
    dateofbirth: string

    /**
     * Claim com o email do usuário
     *
     */
    emailaddress: string

    /**
     * Claim com o telefone residencial do usuário
     *
     */
    homephone: string

    /**
     * Claim com o telefone celular do usuário
     *
     */
    mobilephone: string

    /**
     * Claim com o nome do usuário
     *
     */
    nome: string

    /**
     * Claim com o nome da mãe do usuário
     *
     */
    nomemae: string

    /**
     * Claim com o nome do pai do usuário
     *
     */
    nomepai: string

    /**
     * Subject Id Claim
     *
     * O Id do usuário
     *
     */
    sid: string

    /**
     * Subject Id Claim
     *
     * O Id do usuário
     *
     */
    sub: number

    /**
     * Número de registro da CNH
     *
     */
    cnhNumero: string

    /**
     * Cédula da CNH
     *
     */
    cnhCedula: string
}
