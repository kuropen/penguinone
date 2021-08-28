---
title: "NetlifyからAWSに移管しました"
date: 2021-02-05T00:00:00+09:00
showDate: true
draft: false
tags: ["tech"]
type: posts
slug: 210205_migrate_to_aws
image: b94c5875_9ffc_4b1c_9b6d_898f052e0290_after_20210205_f3f670074e.png
---
当サイトはこれまでNetlifyから配信していましたが、このたびAWSに移管しました。

この記事では、移管にあたって実施した事項の概略について記述します。なお、詳細につきましては[技術文書としてまとめました](https://zenn.dev/kuropen/articles/12c1203cc52139)。

### 移管の背景
![https://images.prismic.io/penguinone/13e6334e-251f-47e9-a0c4-74a6315049bd_before_20210201.png](https://kuropen-strapi-images.s3.ap-northeast-1.amazonaws.com/13e6334e_251f_47e9_a0c4_74a6315049bd_before_20210201_489df7a985.png)

これまで利用していたNetlifyのフリープランでは、サーバの所在地が限定されており、日本国内からのアクセスはシンガポール国内のサーバに転送されてしまいます。このためもあり、アクセスからページの表示までにやや時間がかかる状況が発生していたため、AWSに再構築を行いました。

### ステップ1: CloudFrontの構築
はじめに、高速化策の検証と、それが不十分であった場合のAWS移管の準備のため、CloudFrontディストリビューションを準備し、DNSレコードをそちらに向ける作業を実施しました。

![https://images.prismic.io/penguinone/a3c06e88-d259-4c08-bc37-51986c42fe9e_20210201_to_0204.png](https://kuropen-strapi-images.s3.ap-northeast-1.amazonaws.com/a3c06e88_d259_4c08_bc37_51986c42fe9e_20210201_to_0204_62c25a97c5.png)

結果、多少の高速化は図れましたが、依然として読み込みに数秒かかる状況であったため、AWS移管を実施することとしました。

### ステップ2: AWS環境の構築
![Cover Image](./b94c5875_9ffc_4b1c_9b6d_898f052e0290_after_20210205_f3f670074e.png)

従来のNetlifyと同様の環境を構築するために、以下を実施し、2月4日夜より運用を開始致しました。

- GitHubからCodePipelineでソースコードを取得する設定
- CodeBuildでGatsbyJSのコードをHTML化し、S3にコピーする設定
- CloudFrontのコンテンツ取得先を、上記でコピー対象となるS3バケット（静的Webページ公開機能）に変更
- Prismic CMSからのWebhookを受け入れるため、CodeBuildを実行するLambda関数およびそれに対するAPI Gatewayのエンドポイントを作成
