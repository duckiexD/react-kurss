import { Link, useParams } from 'react-router'
import { useMonitoring } from '../monitoring'
import { statusText } from '../status'

function SitePage() {
  const { sites, history, loading, error } = useMonitoring()
  const { id } = useParams()

  if (loading) {
    return (
      <main className="main">
        <p className="empty">Загрузка данных…</p>
      </main>
    )
  }

  if (error !== '') {
    return (
      <main className="main">
        <p className="load-error">{error}</p>
      </main>
    )
  }

  const site = sites.find((s) => s.id === id)
  if (site === undefined) {
    return (
      <main className="main">
        <Link to="/" className="back">← Все сайты</Link>
        <p className="empty">Сайта с id {id} нет в списке: его убрали или в адресе ошибка.</p>
      </main>
    )
  }

  const checks = history.map((run) => ({
    time: run.time,
    check: run.checks.find((c) => c.id === site.id),
  }))
  const okCount = checks.filter((row) => row.check?.ok).length

  return (
    <main className="main">
      <Link to="/" className="back">← Все сайты</Link>
      <article className="site site--page">
        <h2>{site.name}</h2>
        <a href={site.url} target="_blank" rel="noreferrer">
          {site.url}
        </a>
        <p className="site__ratio">
          {checks.length === 0
            ? 'Проверок ещё не было'
            : `Открывался в ${okCount} из ${checks.length} последних проверок`}
        </p>
      </article>
      {checks.length > 0 && (
        <table className="history">
          <thead>
            <tr>
              <th>Время проверки</th>
              <th>Результат</th>
              <th>Время ответа</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((row) => (
              <tr key={row.time} className={row.check !== undefined && !row.check.ok ? 'history__bad' : ''}>
                <td>{new Date(row.time).toLocaleString('ru')}</td>
                <td>{statusText(row.check)}</td>
                <td>{row.check === undefined ? '—' : `${row.check.ms} мс`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default SitePage