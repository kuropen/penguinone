---
title: "ActivityPubについて"
date: 2021-04-20T14:25:46.958Z
type: fixed
lang: ja
slug: activitypub
---
![ActivityPub-logo.png](./Activity_Pub_logo.png)

Kuropenは以下のサーバにActivityPubアカウントを開設しています。

- Misskey.io (メインアカウント): [@kuropen@misskey.io](https://misskey.io/@kuropen)
- 個人サーバ ([旧アカウント](/posts/20210916-notice-regarding-dolphin)): [@krpn@kuropen.me](https://kuropen.me/@krpn)

なお、ActivityPubアカウントに関するお知らせは [ブログのActivityPubカテゴリ](/tags/activitypub) をご覧ください。

## ActivityPubとは
「分散型SNS」（[Fediverse](https://dic.nicovideo.jp/a/fediverse)）を実現するための通信規格であり、主に以下のシステムを採用したSNSが採用しています。

※以下以外の分散型SNSにも対応しているものがあります。詳細はお使いのSNSの運営者にご確認ください。

- Mastodon
- Pleroma
- Misskey

## ActivityPubアカウントの利用方法
ActivityPub対応SNSから、上記のアカウントIDに対して「リモートフォロー」操作を行ってください。

（詳細は各SNSシステムのマニュアルを参照してください。）

なお、フォローする前には[SNSポリシー](/social)をご確認ください。

## Kuropen管理サーバの詳細について
2021年9月16日をもちまして[メインアカウントとしての運用を休止](/posts/20210916-notice-regarding-dolphin)いたしました。

### サーバ環境
（2021年7月20日現在）

プライベートインスタンスであるためインフラは最小限です。

- Web & DBサーバー: さくらのVPS 2G (ストレージ200GB拡張済)
- ストレージ: S3 （参照用にCloudFront使用）
- DNS: Cloudflare DNS

![システム構成図(Dolphin以外も含む)](../system_structure_202109.png)

### CAPTCHA導入について
直近、検索エンジンのクローラーが、当サーバや連合先で使用されていないハッシュタグの検索ページにアクセスすることで、データベース負荷が高まるという事案が[発生しています](/posts/20210613-investigation-dolphin-load)。

このため対策として、当サーバのハッシュタグページにおいてCloudflare WAFによりCAPTCHAを導入しています。

### システム
Kuropen管理サーバでは、Misskeyをベースにプライベートインスタンスの運営に特化した [Dolphin](https://github.com/syuilo/dolphin) （バージョン 1.4.0 / [めいめい氏によるカスタム版](https://github.com/mei23/dolphin)）を採用しています。
