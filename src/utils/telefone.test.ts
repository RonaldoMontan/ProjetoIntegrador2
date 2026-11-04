import { describe, it, expect } from 'vitest'
import { mascaraTelefone } from './telefone'

describe('mascaraTelefone', () => {
  it('formata celular com 11 dígitos', () => {
    expect(mascaraTelefone('19998216722')).toBe('(19) 99821-6722')
  })

  it('formata telefone fixo com 10 dígitos', () => {
    expect(mascaraTelefone('1935211234')).toBe('(19) 3521-1234')
  })

  it('formata aos poucos enquanto digita', () => {
    expect(mascaraTelefone('')).toBe('')
    expect(mascaraTelefone('1')).toBe('(1')
    expect(mascaraTelefone('1999')).toBe('(19) 99')
  })

  it('ignora letras, símbolos e dígitos excedentes', () => {
    expect(mascaraTelefone('(19) 99821-6722 ramal 5')).toBe('(19) 99821-6722')
  })
})
