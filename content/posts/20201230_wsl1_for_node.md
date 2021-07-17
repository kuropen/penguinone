---
title: "node.js開発にはWSL1"
date: 2020-12-30T00:00:00+09:00
showDate: true
draft: false
tags: ["tech","pc"]
images:
    - /posts/images/9924fd8f_bce6_4e32_bbe6_7142f42db99d_WSL_version_fc1bf5f21d.png
---
久しぶりに技術系のエントリーを書く。

このサイトは GatsbyJS で書かれている。React系のフレームワークであり当然ながら動作確認などには node.js が必要である。

今回、このサイトに使っている Tailwind CSS がバージョンアップしたとの報に接し [^1] バージョンアップ作業をすることにしたが、 node.js の要求バージョンが上がっている [^2] 。

現在当サイトは Netlify 上で公開されているが、Netlify 上でビルドに node.js v10 が使われていたので、まずは Netlify でのバージョンアップの適用法を調べると、nvmのバージョン設定のための方法とある [^3] 。設定するはいいが、Windows環境にバージョンの同期を取るのは難しいと考え、Windows Subsystem for Linux (WSL) 環境に nvm を入れて node.js を動かす方法を考えた。

nvmのインストール自体は通常のLinux環境と同じである [^4]。よってインストール自体は問題なく終了し、実際に npm run dev を実行するも、ファイルの更新によりリビルドが走らない [^5]。現状、ファイルの変更をリアルタイム検知しなければならないLinuxアプリケーション（例えばリアルタイムトランスパイラ）は、WSL1で動かすしかないということである。

ということでWSL2で構築したUbuntu環境をWSL1に移す方法を調べると、コマンドライン一つで移行できる [^6] ということなので早速移行し、Ubuntu環境に入ってみると設定したnvmはそのまま、npm run dev も正常に動くようになった。

![https://images.prismic.io/penguinone/9924fd8f-bce6-4e32-bbe6-7142f42db99d_WSL-version.png?auto=compress,format](https://kuropen-strapi-images.s3.ap-northeast-1.amazonaws.com/9924fd8f_bce6_4e32_bbe6_7142f42db99d_WSL_version_fc1bf5f21d.png%3Fauto%3Dcompress%2Cformat)

### 注意
上記の当サイトの環境に関する情報は、その後変更された内容が多数含まれます。

- [Tailwind CSS v2.0 – Tailwind CSS](https://blog.tailwindcss.com/tailwindcss-v2)
- [Upgrade Guide - Tailwind CSS](https://tailwindcss.com/docs/upgrading-to-v2)
- [Manage build dependencies | Netlify Docs](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript)
- [nvm/README.md at master · nvm-sh/nvm (github.com)](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)
- [[WSL2] File changes made by Windows apps on Windows filesystem don't trigger notifications for Linux apps · Issue #4739 · microsoft/WSL (github.com)](https://github.com/microsoft/WSL/issues/4739)
- [WSL2からWSL1にダウングレードしたい - Memento (yoshinorin.net)](https://yoshinorin.net/2020/08/22/downgrade-wsl2-to-wsl1/)
