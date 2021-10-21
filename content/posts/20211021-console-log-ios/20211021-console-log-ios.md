---
title: iOSでWebアプリのデバッグログを見る
date: 2021-10-21T21:05:00.000+09:00
showDate: true
tags:
- tech
type: posts
lang: ja
slug: 20211021-console-log-ios
image: ./20211021_120227000_iOS.png
---
Macを持たない[^1]者にとって、WebアプリであってもiOSでの動作確認はかなりハードルが高い問題です。

しかし先日リリースされた iOS 15 でブラウザアドオンが拡充されたようで、
[実機画面で開発者ツールを表示できるアドオン](https://apps.apple.com/jp/app/web-inspector/id1584825745)が登場していました。

![iOS Safariで開発者ツールを表示した状態](./20211021_120227000_iOS.png)

DOMツリーやconsole.logもきちんと表示できています。

Webアプリの実機検証が少し楽になる気がしました。

[^1]: かつては持っていましたが今は手放しています。
