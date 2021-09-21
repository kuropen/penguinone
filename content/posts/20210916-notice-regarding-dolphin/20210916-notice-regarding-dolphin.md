---
title: ActivityPub (Dolphin) 個人インスタンスに関するご報告
date: 2021-09-16T23:28:00.000+09:00
showDate: true
tags:
- activitypub
- notice
type: posts
slug: 20210916-notice-regarding-dolphin
---
[Misskey.io](https://misskey.io/@kuropen)上でお知らせした通り、[個人で開設していたDolphinインスタンス](https://kuropen.me/@krpn)は、
2021年9月16日を最後に使用停止となることをご報告申し上げます。

今後につきましては当面、Misskey.ioにあるアカウントをメインのアカウントとして利用してまいります。

## 使用停止を決定した経緯
2021年9月15日に、画像ストレージとして使用しているS3インスタンスの容量削減を目的として、Dolphinインスタンスの画像キャッシュの削除を実施いたしました。
その後、タイムライン上において、フォローしていた複数のアカウントの画像が正常に表示されなくなっていることを確認いたしました。

画像表示を復旧するためにデータベース直接操作によるアカウント情報の補正などを試みましたが、一部うまくいっていない事例が確認されました。

このため、サーバー間のアカウント情報の同期に疑義が生じる事態となったこと、またこのほか、かねてから問題になっていましたログ検索に伴うデータベース負荷の問題等
長期運用に伴う各種問題が顕在化したことから、私個人が全世界に点在するActivityPub Fediverseにアクセスするための一つの拠点として用いるには耐えがたい状況であると判断しました。

## 今後について
今後個人インスタンスを再構築する予定ではございますが、継続的に運用するためのシステム設計等を検討したいため、すぐには行いません。

また、現在運用しているDolphinインスタンスについては、あくまでも私の操作に耐えないという理由で使用停止することもあり、
過去ログ消失を防止する観点から、サーバー維持費の低減を前提として、引き続き閲覧できるよう調整中です。

個人アカウントをフォローしていた方々ならびに連合先インスタンスの管理者各位にはご迷惑をおかけいたしまして誠に申し訳ございません。
何卒よろしくお願いいたします。