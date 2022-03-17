---
title: 'Mac 환경에서 NVM 설치하기'
description: 'NVM이 무엇인지 간략하게 설명하고 Mac 환경에서 NVM 설치에 대해 알아봅니다.'
createdAt: '2022-03-18'
updatedAt: '2022-03-18'
category: { main: 'Development', sub: 'NodeJS' }
tags: ['node', 'nodejs', 'nvm', 'mac', 'homebrew']
published: true
---

## NVM 이란?

NVM은 `Node Version Manager`의 약자로 말 그대로 노드의 버전을 관리하는 프로그램입니다.

여러 프로젝트를 진행하다보면 각 프로젝트 별로 노드 버전을 달리해야 하는데 이럴 때 NVM으로 현재 사용중인 노드의 버전을 원하는 버전으로 마음대로 변경하고 설치가 가능하며 관리 또한 용이합니다.
NVM의 보다 자세한 사항은 [깃허브](https://github.com/nvm-sh/nvm)에서 확인 가능합니다.

> :information_source: NVM or NPM or NPX
>
> - [NVM](https://github.com/nvm-sh/nvm): Node Version Manager의 약자로 노드의 버전을 관리하는 도구
> - [NPM](https://docs.npmjs.com/cli/v8/commands/npm): Node Package Manager의 약자로 노드의 패키지를 관리하는 도구
> - [NPX](https://docs.npmjs.com/cli/v8/commands/npx): Node Package eXecute의 약자로 노드의 패키지를 쉽게 설치하고 관리하는 도구

## NVM 설치하기

Mac에서 NVM을 설치하려면 `curl`, `wget`으로 직접 스크립트를 다운받아 설치하는 방법도 있지만, 저는 [Homebrew](https://brew.sh/index_ko)를 추천드립니다.
그럼에도 `curl`, `wget`으로 직접 설치를 원하시는 경우 [NVM](https://github.com/nvm-sh/nvm) 여기서 자세히 설명하고 있으니 참고하시면 됩니다.

### Homebrew 설치하기

[Homebrew](https://brew.sh/)는 Mac용 패키지 관리 도구입니다.
우리는 이를 이용하여 NVM을 설치할 것이므로 Homebrew가 먼저 설치되어 있어야 합니다.
Homebrew 설치는 터미널에서 아래와 같이 입력하신 후 실행하시면 됩니다.

```bash
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

설치가 완료된 후 `brew --version`을 실행하면 현재 설치된 버전을 확인 할 수 있습니다.

```bash
> brew --version
Homebrew 3.3.5
Homebrew/homebrew-core (git revision 00f3d1617a5; last commit 2021-11-25)
Homebrew/homebrew-cask (git revision 09a47ef507; last commit 2021-11-25)
```

### Homebrew로 NVM 설치하기

이제 `brew search nvm`을 입력하여 nvm이 Homebrew에 있는지 먼저 확인합니다.
아래에 보시면 Formulae 항목에 nvm이 있는게 보입니다. 저렇게 검색했을 떼 나오면 설치가 가능합니다. (nvm 옆에 ✔ 표시가 있는 것은 이미 설치가 완료된거라 보시면 됩니다.)

```bash
> brew search nvm
==> Formulae
convmv     mvnvm      nvm ✔      nvi        nvc        nim        dvm

==> Casks
paragon-vmdk-mounter
```

> :information_source: Formulae? Casks
>
> - Formulae: 콘솔 기반 어플리케이션
> - Casks: GUI 기반 어플리케이션

설치가 가능한 것으로 나왔으니 이제 아래 명령어를 입력해서 NVM을 설치해 줍니다.
Homebrew를 처음 설치했거나, 오랫동안 사용을 하지 않았을 경우 Update에 시간이 다소 소요될 수 있으니 여유롭게 기다리시면 됩니다.

```bash
> brew install nvm
Updating Homebrew...
==> Downloading https://ghcr.io/v2/homebrew/core/nvm/manifests/0.39.1_1
Already downloaded: /Users/moroo/Library/Caches/Homebrew/downloads/c9eff8b850f89092c09f7a099286e0b4eddb66d9630b46d5cd248024f2a7a86f--nvm-0.39.1_1.bottle_manifest.json
==> Downloading https://ghcr.io/v2/homebrew/core/nvm/blobs/sha256:6e14c8a2bf9421
Already downloaded: /Users/moroo/Library/Caches/Homebrew/downloads/c8c9b3f90c1fec62178862d14b78db352760216edf6cf2947b829001e49c40c7--nvm--0.39.1_1.all.bottle.tar.gz
==> Pouring nvm--0.39.1_1.all.bottle.tar.gz
==> Caveats
Please note that upstream has asked us to make explicit managing
nvm via Homebrew is unsupported by them and you should check any
problems against the standard nvm install method prior to reporting.

You should create NVM's working directory if it doesn't exist:

  mkdir ~/.nvm

Add the following to ~/.zshrc or your desired shell
configuration file:

  export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/opt/nvm will destroy any nvm-installed Node installations
upon upgrade/reinstall.

Type `nvm help` for further information.
==> Summary
🍺  /usr/local/Cellar/nvm/0.39.1_1: 9 files, 184.1KB
==> Running `brew cleanup nvm`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

여기까지 진행하셨다면 NVM 설치는 완료하였습니다. 하지만 터미널에 `nvm --version`을 실행하면 아래와 같이 없는 명령어라고 나오는데 nvm이 사용할 폴더 및 환경변수를 설정하지 않아서입니다.

```bash
> nvm --version
zsh: command not found: nvm
```

## 환경변수 설정하기

이제 환경변수를 설정해야 하는데 설정에 앞서 nvm이 사용할 폴더를 먼저 생성해 줍니다.

```bash
> mkdir ~/.nvm
```

다음으로 vi 편집기로 본인이 사용하는 쉘의 구성파일을 엽니다.
(nvm 설치가 완료되면 친절하게 )

```bash
# Bash를 사용할 경우
> vi ~/.bash_profile

# ZSH를 사용할 경우
> vi ~/.zshrc
```

vi 편집기가 열렸으면 맨 아래로 내려서 아래 내용을 입력한 후 저장합니다.
(아래 내용을 `⌘ + C`로 복사한 후 편집기에서 키보드 `A`를 눌러서 입력 가능하게 전환한 다음 `⌘ + V` 로 붙여넣고 `esc` 키를 누른 후에 차례대로 `:`, `w`, `q`를 입력하시면 됩니다.)

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

다음으로 변경된 구성파일이 반영되도록 아래 명령어를 실행합니다.

```bash
# Bash를 사용할 경우
> source ~/.bash_profile

# ZSH를 사용할 경우
> source ~/.zshrc
```

이제 터미널에 `nvm --version` 을 입력해서 정상적으로 실행이 되는지 확인합니다.

```bash
> nvm --version
0.38.0
```

## NVM 사용하기

NVM에서 사뇽 가능한 명령어에 대해 알아보겠습니다.

## install

원하는 노드를 설치합니다.

```bash
# 최신 버전을 설치하려는 경우
> nvm install node

# 최신 LTS 버전을 설치하려는 경우
> nvm install --lts

# 특정 버전을 설치하려는 경우
> nvm install 14.7.0 # or 16.3.0, 12.22.1, etc
```

## uninstall

원하는 노드를 제거합니다.

```bash
# 최신 버전을 제거하려는 경우
> nvm uninstall node

# 최신 LTS 버전을 제거하려는 경우
> nvm uninstall --lts

# 특정 버전을 제거하려는 경우
> nvm uninstall 14.7.0 # or 16.3.0, 12.22.1, etc
```

### ls

노드 버전들의 목록을 나열합니다.

```bash
# 현재 설치된 노드 버전들을 나열합니다.
> nvm ls

# 전체 노드 버전들을 나열합니다.
> nvm ls-remote
```

### use

선택한 노드를 사용합니다.

```bash
> nvm use 14.7.0 # or 16.3.0, 12.22.1, etc
```

### run

선택한 노드를 실행합니다.

```bash
> nvm use 14.7.0 # or 16.3.0, 12.22.1, etc
```

### exec

원하는 버전의 노드가 있는 서브쉘에서 임의의 명령을 실행합니다.

```bash
> nvm exec 17.5.0 node --version
Running node v17.5.0 (npm v8.4.1)
```

### which

선택한 노도의 경로를 출력합니다.

```bash
> nvm which 16.14.0
/Users/moroo/.nvm/versions/node/v16.14.0/bin/node
```

보다 더 자세한 사항은 [NVM 깃허브](https://github.com/nvm-sh/nvm#usage)에서 확인 가능합니다.
