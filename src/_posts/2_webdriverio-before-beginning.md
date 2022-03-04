---
title: '1. 시작하기 전에...'
description: 'WebdriverIO 시리즈를 시작하기 전에 필자가 WebdriverIO를 접하게 된 계기 및 간략한 소개 글입니다.'
createdAt: '2022-02-19'
updatedAt: '2022-03-04'
coverImageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--co5LdVu9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i2.wp.com/grantnorwood.com/app/uploads/2017/07/webdriver-io-logo.png%3Fw%3D1680%26ssl%3D1'
category: { main: 'Test Automation', sub: 'WebdriverIO' }
tags: ['webdriverio', 'wdio', 'e2e', 'automation']
series: { name: 'WebdriverIO', number: 1 }
---

## WebdriverIO를 접하게된 계기

넥슨에서 근무하고 있을 때 ActiveX가 중단됨에 따라 유저의 PC 사양을 수집하던 것을 EXE 프로그램으로 전환해야 하는 QA 업무를 맞게 되었습니다.  
넥슨에서 서비스하는 약 100여개가 되는 모든 게임들을 IE7 ~ IE11, Edge, Chrome, Firefox 브라우저 환경에서 확인해야 했습니다.  
테스트 케이스가 약 100개인 테스트를 800번 진행해야 했죠. 그것도 혼자서... :scream:

C# WPF를 이용하여 업무 자동화 프로그램을 토이 프로젝트로 몇번 진행한 경험을 토대로 자동화에 눈을 돌렸고 그때 처음으로 WebdriverIO를 접하게 되었습니다. (그때 당시 WebdriverIO가 버전 3에서 4로 넘어가는 시기였는데 벌써 버전 7까지 나왔네요...)

그때 WebdriverIO를 선택한 기준은

- Javascript 언어를 사용할 것
  - 저는 업무에서 사용하는 언어를 우선적으로 공부합니다. (그래서 C#부터 배운...)
- 오픈소스일 것
  - 저 스스로 도전적으로 시험하는 터라 회사에 지원을 받기가 어려웠습니다.
- 모든 브라우저를 지원할 것
  - 넥슨은 오래된 게임들도 많다보니 사양이 낮은 PC까지 지원을 해줘야 했는데 그러다보니 IE7도 테스트 범위에 포함되어 있었습니다.
- 최신 기술일 것
  - 처음으로 자동화에 대해 공부하는거 최신 기술을 배우고 싶었습니다.

그렇게 구글신에 문의해서 [Protractor](https://www.protractortest.org), [Karma](http://karma-runner.github.io) 등 여러 프레임워크를 사용해 보고 WebdriverIO를 선택하게 되었습니다.

## WebdriverIO 소개

WebdriverIO는 아래에 있는 모든 것들이 가능합니다.  
그리고 이것들이 제가 WebdriverIO를 사랑하고 지금까지도 꾸준히 사용하고 있는 이유이기도 합니다.

- 다양한 플랫폼 및 OS 지원
  - Web, App, Windows, Mac 등등...
- 다양한 테스트 툴 지원
  - [BrowserStack](https://www.browserstack.com), [Sauce Labs](https://saucelabs.com), [TestRail](https://www.gurock.com/testrai) 등등...
- Devtools 지원
  - [Puppeteer](https://pptr.dev) 사용 가능
- 다양한 테스트 프레임워크 지원
  - [Mocha](https://mochajs.org), [Jasmine](https://jasmine.github.io), [Cucumber](https://cucumber.io)
- 병렬 테스트 지원
- 커스터마이징 용이
- 사용성 용이
  - Webdriver / Appium / Devtools 등 다양한 프로토콜에서 사용하는 API를 하나로 통합해 쉽게 사용 할 수 있습니다. ([WebdriverIO APIs](https://webdriver.io/docs/api))
  - 간단한 설정으로 시작부터 결과, 그리고 리포트 제출까지 수월하게 진행할 수 있습니다.
  - 기타 다양한 기능들
- 오픈소스
- 커뮤니티

> WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and stable test suite.
>
> It is designed to be:
>
> - Extendable - Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful
> - Compatible - WebdriverIO can be run on the WebDriver Protocol for true cross-browser testing as well as Chrome DevTools Protocol for Chromium based automation using Puppeteer.
> - Feature Rich - The huge variety of built-in and community plugins allows you to easily integrate and extend your setup to fulfill your requirements.
>
> You can use WebdriverIO to automate:
>
> - 🌐 modern web applications written in React, Vue, Angular, Svelte or other frontend frameworks
> - 📱 hybrid or native mobile applications running in an emulator/> -simulator or on a real device
> - 💻 native desktop applications (e.g. written with Electron.js)
>
> _[WebdriverIO](https://webdriver.io/docs/what-is-webdriverio) 홈페이지에서 발췌..._

더 많은 정보들은 [WebdriverIO](https://webdriver.io) 홈페이지에 가시면 있으니 한번 정독하는 것을 추천드립니다.

## Javascript를 선택한 이유 그리고 Typescript

자동화를 시작하기 앞서 어떤 언어를 사용할 것인지가 많은 사람들의 고민거리인 것 같습니다.
저 같은 경우 업무에서 사용중이고, QA하는 제품이 어떤 언어를 사용하는지를 보고 그 언어를 우선적으로 사용합니다.

그래서 게임 QA를 할 때는 C#을 배워서 WPF를 활용하여 [성능 체크](https://github.com/morooLee/PerfMon), [호스트 변경](https://github.com/morooLee/HostManager) 등과 같은 업무 자동화 프로그램을 토이 프로젝트로 만들었으며, Web QA를 했을 때는 C# ASP.NET을 사용해서 [Popeyetrip](https://github.com/morooLee/popeyetrip) 이라는 사이트를 만들어 실제 라이브 서비스까지 했었습니다. (지금은 Github에 코드로만.... :disappointed_relieved:)

E2E 자동화가 여러 플랫폼에서 이루어지고 있지만, 대표적인 환경이라고 치면 아마도 Web이 아닐까 싶네요. 저 또한 Web을 통해 자동화를 시작하게 되었고요...

Web을 위해 [Javascript가 탄생](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)했고, Web/App에서 최근 인기 있는 프론트엔드 프레임워크인 [React.JS](https://ko.reactjs.org/) 등이 Javascript로 만들어진 만큼 Javascript에 대한 이해도가 충분히 필요하다고 생각이 들어 선택하게 되었습니다. (자동화를 하다 보면 간단하게라도 View가 필요하게 되는데 이럴 경우 Javascript를 잘 알고 있으면 웹 환경에서 화면을 만들기 수월합니다.)

저는 C#을 먼저 배웠던 터라, 타입 정의가 없는 Javascript를 배울 때 너무 힘들었습니다.  
그래서 그때 당시 핫했던(지금도 핫한) [Python](https://www.python.org)으로 갈아탈까 싶어 배워봤는데. 이것 또한 타입 정의가 되지 않았고 (지금은 타입 정의가 가능합니다.), 코드 블럭이 괄호가 아닌 띄어쓰기로 되어 있다 보니 범위를 파악하고 작성하는데 너무 어색했었습니다. 그러다 [Typescript](https://www.typescriptlang.org)를 알게되어서 그때부터 지금까지 쭈욱 사용하고 있습니다.

## WebdriverIO Series 시작하기 (출사표:interrobang:)

WebdriverIo Ver.3 부터 사용하기 시작했는데 그때 당시에 한글로된 정보가 전무하다시피해서 안되는 영어로 힘들게 배웠었습니다. 그리고 그것은 Ver.7이 된 지금까지도 여전하고요...  
아직까지도 제대로 된 한글 튜토리얼이 없다는게 마음에 걸렸고, 후배 육성 및 국내 커뮤니티 발전에 조금이나마 이바지 하고자 본 시리즈를 시작하게 되었습니다.

이를 위해 블로그를 만들고 첫번째 포스트로 이 글을 작성하고 있습니다.  
처음하는 블로그 활동이라 운영에 부족함이 많을 수 있으며, 처음 작성하는 튜토리얼이라 내용이 많이 부실하고 진행에 문제가 발생할 수도 있습니다.  
그러니, 너그러운 마음으로 봐주셨으면 좋겠습니다.

제 블로그에 오신 것을 환영하며, 이제 본 시리즈 본격적으로 시작하도록 하겠습니다! :rocket:

감사합니다. :man-bowing:
