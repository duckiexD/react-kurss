import { Link } from 'react-router'
import { useMonitoring } from '../monitoring'
import { statusText } from '../status'

function SitesPage() {
  const { sites, history, loading, error } = useMonitoring()
  const last = history[0]

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

  const badCount =
    last === undefined
      ? 0
      : sites.filter((site) => {
          const check = last.checks.find((c) => c.id === site.id)
          return check !== undefined && !check.ok
        }).length

  return (
    <main className="main">
      {last !== undefined && (
        <p className={badCount > 0 ? 'summary summary--bad' : 'summary'}>
          {badCount > 0
            ? `Не открываются: ${badCount} из ${sites.length}`
            : `Все ${sites.length} сайтов открываются`}
        </p>
      )}
      <ul className="sites">
        {sites.map((site) => {
          const check = last?.checks.find((c) => c.id === site.id)
          return (
            <li key={site.id} className={check?.ok ? 'site' : 'site site--bad'}>
              <span className="site__status">{statusText(check)}</span>
              <h2>
                <Link to={`/site/${site.id}`}>{site.name}</Link>
              </h2>
              <a href={site.url} target="_blank" rel="noreferrer">
                {site.url}
              </a>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default SitesPage