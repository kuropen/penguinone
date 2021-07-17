---
title: "ディスプレイドライバエラー多発を受けた対応"
date: 2021-02-11T00:00:00+09:00
showDate: true
draft: false
tags: ["pc"]
images:
    - /posts/images/d44a4d77_61d7_4449_96ad_814cdaf84387_nvlddmkm_error_d398d34a2a.png
---
![Cover Image](/posts/images/d44a4d77_61d7_4449_96ad_814cdaf84387_nvlddmkm_error_d398d34a2a.png)
【2021年2月17日追記】

本件は、[NVIDIAの修正版ドライバ公開](https://www.nichepcgamer.com/archives/geforce-driver-461-51-hotfix.html)により解決しております。

大変お騒がせ致しました。

-------------------

現在使用しているメインPCにおいて、ChromeとMicrosoft Edgeを使っていると突然ディスプレイが数秒間ブラックアウトし、システムログで
ディスプレイ ドライバー nvlddmkm が応答を停止しましたが、正常に回復しました。
と記載される例が発生しています。


原因ははっきりしていませんが、SNSを見たところでは、NVIDIA GeForce RTX 3000 シリーズのグラフィックボードを搭載したPCで同様の報告が相次いでいることから、NVIDIAのディスプレイドライバーとChromium系ブラウザの間に相性問題が発生しているものと考えられます。

マルチディスプレイ環境に起因しているとの情報があるため、サブディスプレイを撤去して問題回避を試みていますが、これで問題が回避できない場合は、Windows PCのGoogle ChromeとMicrosoft Edgeにおける当サイトの動作確認をとりやめる場合がございます。

何卒ご理解とご協力をお願いいたします。
