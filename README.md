This is the repository for [Penguinone](https://penguinone.kuropen.org/), Kuropen's personal website.

## Copyright Notice

This repository is licensed under the Mozilla Public License, version 2.0, which is described in `LICENSE.txt`, **with following exceptions**. Note that files which are subject of the MPL contains a comment shown in Exhibit A of the MPL.

- The website published itself is licensed *in principal* under the [Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA)](https://creativecommons.org/licenses/by-sa/4.0/) license. Note that there may be some page excluded from subject of the CC-BY-SA for the page's theme.
- **Markdown texts** in `contents` directory are licensed under the CC-BY-SA.
- For **images** in `contents` directory, read the texts below carefully:
    - Some of the images may be from [Unsplash](https://unsplash.com/license) or [Pixabay](https://pixabay.com/ja/service/terms/). 
    In this case, there should be attribution text in corresponding Markdown file. 
    Because of their license terms, while they can be used freely no matter whether for commercial use or not, 
    selling or redistributing each image itself is restricted. Please consult the source website for detail.
    - Images without attribution text in Markdown file, which means Kuropen having its rights, are licensed under the CC-BY-SA.
- Font files under `og-image/font` directory, described below, are third-party component which are used to generate the Open Graph images. 
They are licensed under the [SIL Open Font License, version 1.1](https://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web).
    - IBM Plex Sans JP by IBM Corporation
    - Orbitron by Matt McInerney

## How to build
Simply run the following:

```bash
yarn install
yarn build
yarn serve
```
