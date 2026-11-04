import { describe, it, expect } from 'vitest'
import { mascaraData, mascaraHora, formatarData, formatarHora, isoParaData, montarDataHora, somarMinutos, dataParaIso } from './dataHora'

describe('máscaras de digitação', () => {
  it('formata a data enquanto digita', () => {
    expect(mascaraData('27')).toBe('27')
    expect(mascaraData('2710')).toBe('27/10')
    expect(mascaraData('27102026')).toBe('27/10/2026')
    expect(mascaraData('27/10/2026999')).toBe('27/10/2026')
  })

  it('formata a hora enquanto digita', () => {
    expect(mascaraHora('08')).toBe('08')
    expect(mascaraHora('0830')).toBe('08:30')
    expect(mascaraHora('08h30min')).toBe('08:30')
  })
})

describe('montarDataHora', () => {
  it('junta data e hora no horário local', () => {
    expect(montarDataHora('27/10/2026', '08:30')).toEqual(new Date(2026, 9, 27, 8, 30))
  })

  it('usa o ano atual quando a data vem sem ano', () => {
    expect(montarDataHora('27/10', '08:30')?.getFullYear()).toBe(new Date().getFullYear())
  })

  it('recusa datas que não existem', () => {
    expect(montarDataHora('31/02/2026', '08:30')).toBeNull()
    expect(montarDataHora('00/10/2026', '08:30')).toBeNull()
  })

  it('recusa horas inválidas ou incompletas', () => {
    expect(montarDataHora('27/10/2026', '25:00')).toBeNull()
    expect(montarDataHora('27/10/2026', '08:60')).toBeNull()
    expect(montarDataHora('27/10/2026', '8:30')).toBeNull()
    expect(montarDataHora('27-10-2026', '08:30')).toBeNull()
  })
})

describe('data de nascimento', () => {
  it('digitar 22092002 resulta em 22/09/2002, com o dia antes do mês', () => {
    const digitado = mascaraData('22092002')
    expect(digitado).toBe('22/09/2002')
    expect(dataParaIso(digitado)).toBe('2002-09-22')
  })

  it('volta para DD/MM/AAAA ao editar uma cliente', () => {
    expect(isoParaData(dataParaIso('07/01/1999')!)).toBe('07/01/1999')
  })

  it('recusa data incompleta, sem ano ou inexistente', () => {
    expect(dataParaIso('22/09')).toBeNull()
    expect(dataParaIso('22/09/02')).toBeNull()
    expect(dataParaIso('30/02/2002')).toBeNull()
    expect(dataParaIso('22/13/2002')).toBeNull()
  })
})

describe('formatação', () => {
  const data = new Date(2026, 0, 5, 7, 5)

  it('mostra data e hora com dois dígitos', () => {
    expect(formatarData(data)).toBe('05/01/2026')
    expect(formatarHora(data)).toBe('07:05')
  })

  it('converte a data da URL para o padrão brasileiro', () => {
    expect(isoParaData('2026-11-03')).toBe('03/11/2026')
  })

  it('soma a duração do serviço, inclusive virando a hora', () => {
    expect(formatarHora(somarMinutos(data, 45))).toBe('07:50')
    expect(formatarHora(somarMinutos(data, 90))).toBe('08:35')
  })
})
