
export function useFormatters() {

  function formatarDias(dias: string[]): string {
  if (!dias || dias.length === 0) return '—';
  const map: Record<string, string> = { SEGUNDA:'SEG', TERCA:'TER', QUARTA:'QUA', QUINTA:'QUI', SEXTA:'SEX', SABADO:'SAB', DOMINGO:'DOM' };
  return dias.map(d => map[d] ?? d).join('/');
  }

  function formatarData(dataStr: string): string {
  if (!dataStr) return '—';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
  }

  function formatarHora(hora: string): string {
  if (!hora) return '—'
  return hora.substring(0, 5) // "08:00:00" → "08:00"
}

  function formatarTipoAvaliacao(tipo: string): string {
  const labels: Record<string, string> = { AV1:'1ª PROVA', AV2:'2ª PROVA', AV3:'3ª PROVA', REPOSICAO:'REPOSIÇÃO', FINAL:'FINAL' };
  return labels[tipo] ?? tipo;
  } 
  function corStatus(status) {
  switch (status) {
    case 'ATIVA':
      return 'green'
    case 'CANCELADA':
      return 'red'
    case 'ENCERRADA':
      return 'grey'
    default:
      return 'blue-grey'
  }
  return status;
}

  return { formatarDias, formatarData, formatarTipoAvaliacao, formatarHora,corStatus}

} 
