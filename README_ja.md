これはKuropenのパーソナルウェブサイトである [Penguinone](https://penguinone.kuropen.org/) のソースコードです。

## 著作権についての注記
このリポジトリは LICENSE.txt に記載されている通り、 Mozilla Public License バージョン 2.0 (以下MPL) によりライセンスされますが、**以下に記す通り例外があります**。
なお、MPLの対象であるソースコードは、MPLのExhibit Aに示されたコメントが記載されています。

- このソースコードにより生成され公開されたウェブサイトそのものは、**原則として**[クリエイティブ・コモンズ 表示-継承 4.0 (CC-BY-SA)](https://creativecommons.org/licenses/by-sa/4.0/)によりライセンスされます。
なお、一部のページに関しては、その内容を考慮してこの限りでないものとする場合があります。
- `contents`ディレクトリの**Markdown文書**はCC-BY-SAライセンスです。
- `contents`ディレクトリの**画像**については、以下の注記をよくお読みください。
    - 一部の画像は[Unsplash](https://unsplash.com/license) ないし [Pixabay](https://pixabay.com/ja/service/terms/)で公開されていたものです。
    これらのものについては、それが掲載された文書のMarkdownファイルに権利表記が記載されているはずです。
    配布していたサイトの利用規約により、これらの画像は商用・非商用を問わず自由に利用することができますが、画像そのものを再配布ないし販売する行為は制限されています。
    詳細は各サイトでご確認ください。
    - そのような権利表記がない画像についてはKuropenが権原を有するものであり、CC-BY-SAライセンスで利用できます。
- `og-image/font` ディレクトリにある以下のフォントファイルは、Open Graph画像を生成するために使用されるサードパーティーコンポーネントであり、
[SIL Open Font License, version 1.1](https://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web)にしたがって利用できます。
    - IBM Plex Sans JP by IBM Corporation
    - Orbitron by Matt McInerney

## ビルド方法
下記を実行します。

```bash
yarn install
yarn build
yarn serve
```
