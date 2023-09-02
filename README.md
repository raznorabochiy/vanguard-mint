# Скрипт минтит Xai Odyssey Vanguard PFP NFT

https://xai.games/odyssey/vanguard-mint

Для запуска скрипта нужен Node.js, если ещё не установлен, устанавливаем с
https://nodejs.org/en

НЕ УСТАНАВЛИВАЙТЕ версию Current, ставьте версию LTS!

Запускаем терминал, переходим в терминале в папку vanguard-mint

Выполняем команды:

```
npm install
```

ждём когда установятся все зависимости если появились ошибки, пробуем команду

```
npm install --legacy-peer-deps
```

Далее необходимо добавить приватные ключи в файл keys.txt каждый ключ на новой
строке

## Принцип работы

Скрипт минтит бесплатную NFT в сети Xai для квестов https://galxe.com/xaigames
Для минта необходима только подпись, деньги на балансе в сети Xai не нужны

## Настройки в файле constants.ts:

`export const DELAY_FROM_SEC = 300` - минимальное время ожидания в секундах
между кошельками

`export const DELAY_TO_SEC = 600` - максимальное время ожидания в секундах между
кошельками

Выбирается случайное число между MIN_BRIDGE_IN_ETH и MAX_BRIDGE_IN_ETH

Запуск

```
npm start
```

## Поблагодарить автора можно отправив донат в любой evm сети на:

```
raznorabochiy.eth
raznorabochiy.arb
raznorabochiy.bnb
0xE8eAbec7CE9e8Bf78A766E8556E542BC2C9446ae
```
