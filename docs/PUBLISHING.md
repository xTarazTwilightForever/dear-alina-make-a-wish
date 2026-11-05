# Как опубликовать открытку для Алины

Публикация подготовлена для GitHub Pages. Предполагаемый адрес после успешного запуска:

https://xtaraztwilightforever.github.io/dear-alina-make-a-wish/

Сайт пока не опубликован. Процесс запускается вручную, обычный push не публикует изменения.

## 1. Перенести готовые изменения в main

1. Открой репозиторий: https://github.com/xTarazTwilightForever/dear-alina-make-a-wish
2. Перейди в Pull requests и нажми New pull request.
3. Выбери base: main, compare: feature/birthday-experience.
4. Создай запрос, затем нажми Merge pull request и Confirm merge.

После слияния в main появится файл `.github/workflows/publish-pages.yml`.

## 2. Выбрать доступность репозитория

На GitHub Free публикация Pages доступна из публичного репозитория. Если у тебя GitHub Pro, исходный репозиторий можно оставить приватным.

Для бесплатного варианта открой Settings → General → Danger Zone → Change repository visibility → Change to public и подтверди изменение. Публичными станут исходники, история коммитов, письмо, подпись и фотографии. Пароль открытки является частью сценария, а не защитой опубликованных файлов. Даже при приватном исходном репозитории обычный сайт Pages доступен по публичной ссылке.

Если хочешь сохранить исходники приватными, выбери вариант с GitHub Pro и не меняй видимость репозитория.

## 3. Включить GitHub Pages

1. В репозитории открой Settings → Pages.
2. Найди Build and deployment.
3. В Source выбери GitHub Actions.

Не выбирай публикацию из корня ветки: проекту требуется сборка React и TypeScript.

## 4. Запустить публикацию

1. Перейди во вкладку Actions.
2. Слева выбери Publish birthday website.
3. Нажми Run workflow, выбери main и ещё раз Run workflow.
4. Дождись зелёного результата. Внутри запуска появится ссылка на опубликованный сайт. Она также будет доступна в Settings → Pages.

Сборка выполняется на стороне GitHub. Локально ничего запускать для публикации не нужно. Процесс устанавливает зависимости, собирает сайт и публикует папку dist. В режиме github-pages настроен путь `/dear-alina-make-a-wish/`, чтобы изображения, подпись и музыка загружались по правильным адресам.

## 5. Открыть на iPhone

Открой ссылку в Safari. Пароль: Иксик или brcbr, регистр не важен. Музыка включается после первого нажатия. Для задувания дыханием Safari запросит доступ к микрофону, также работает нажатие на свечку.

## Как обновлять сайт

Перенеси новые изменения в main и снова запусти Publish birthday website через Actions → Run workflow. Автоматической публикации при push нет.

Если запуск завершился ошибкой, открой красный шаг в Actions. При ошибке сборки исправь указанный файл. При ошибке доступа к Pages проверь Source: GitHub Actions, доступность Pages на своём тарифе и Settings → Environments → github-pages: ветка main должна быть разрешена для публикации.

## Официальные инструкции

- [Публикация Vite на GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Настройка источника GitHub Pages и доступность по тарифам](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Публикация через GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
