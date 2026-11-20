import { useMonitoring } from '../monitoring'

function AboutPage() {
  const { sites, history } = useMonitoring()

  return (
    <main className="main">
      <h2>О проверке</h2>
      <p>
        Каждую ночь в 00:00 по Москве (21:00 UTC) GitHub Actions запускает скрипт{' '}
        <code>scripts/check.mjs</code>, который запрашивает {sites.length} сайтов из списка{' '}
        <code>sites.json</code>.
      </p>
      <p>
        Сайт считается работающим, если сервер ответил кодом 200–299. На ответ отводится 15
        секунд: если сервер не успел, проверка считается неудачной. Для каждой проверки
        записываются код ответа и время ответа в миллисекундах.
      </p>
      <p>
        Результаты сохраняются в <code>results.json</code> коммитом бота{' '}
        <code>github-actions[bot]</code>, после чего сайт публикуется на GitHub Pages заново. В
        истории хранятся 30 последних проверок — сейчас в ней {history.length}.
      </p>
      <p>
        Если сайт перестал открываться или снова заработал, в Telegram приходит сообщение
        «🔴 Не открывается» или «🟢 Снова работает». О проверках без изменений сообщений нет.
      </p>
    </main>
  )
}

export default AboutPage