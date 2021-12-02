---
title: アップグレードの準備ができました（できるとは言っていない）（12/3追記）
date: 2021-11-13T11:28:00.000+09:00
showDate: true
tags:
- diary
type: posts
lang: ja
slug: 20211113-upgrade-is-ready-but-unable
image: ./upgrade_fails.png
---
自作PCにWindows 11へのアップグレード通知が11月2日に来ていますが、
いざアップグレードを実行しようとすると、 `0xc1900101` のSTOPエラーが出て起動せず、Windows 10に自動的にロールバックされます。

自動的にロールバックされるということでまだ安心感はありますが、このSTOPエラーはデバイスドライバの問題ということで、
この状態でアップグレード準備完了という表示がWindows Updateに残り続けることには違和感があります。

![残り続けているアップグレード通知](./upgrade_fails.png)

自作して1年のマシンですが、そもそも第3世代CoreのゲーミングPCの緊急リプレイスを目的に作ったもので、
グラフィックボード以外のパーツは相当低予算で作っていることを考えると、
グラフィックボードだけ引き継いだ新しいマシン作る方がコストがかからないのかなあ。

## 追記
上記のアップグレードが妨害される事象は、PowerDVDが原因との情報を入手し、PowerDVDを削除してアップグレードを行ったところ、アップグレードに成功しました。

※[Fix INVALID DATA ACCESS TRAP error on Windows 11](https://www.thewindowsclub.com/fix-invalid-data-access-trap-error-on-windows)において、STOPエラーでWindows 10にロールバックされた場合の確認事項として **Uninstall Media related apps like PowerDVD** との記載がある。
