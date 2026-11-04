import { describe, it, expect } from 'vitest'
import { rotuloStatus, classeStatus } from './status'

describe('status da etapa', () => {
  it('todo status tem um texto, para não depender só da cor', () => {
    expect(rotuloStatus).toEqual({
      agendado: 'Aguardando etapa anterior',
      liberado: 'Liberado',
      em_andamento: 'Em andamento',
      concluido: 'Concluído'
    })
  })

  it('gera a classe de cor do selo', () => {
    expect(classeStatus('em_andamento')).toBe('seloStatus status-em_andamento')
    expect(classeStatus()).toBe('seloStatus status-agendado')
  })
})
