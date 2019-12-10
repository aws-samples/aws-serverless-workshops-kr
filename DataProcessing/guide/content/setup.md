## 설정 안내

### AWS 계정

이 워크숍을 마치려면 AWS 계정이 있어야 합니다. 이 계정으로 AWS Identity and Access Management (IAM), Amazon Cognito, Amazon Kinesis, Amazon S3, Amazon Athena, Amazon DynamoDB 및 AWS Cloud9 리소스를 생성합니다.

이 워크샵의 코드와 지침은 한 명의 참가자가 하나의 AWS 계정을 사용한다고 가정합니다.다른 사람과 계정을 공유하려고 하면 특정 리소스에 대해 이름 충돌이 발생할 수 있습니다. 이때 리소스 이름에 접미사를 사용하거나 다른 리전을 이용해서 이 문제를 해결할 수 있습니다. 워크샵 지침은 이 경우에 대한 자세한 가이드는 제공하지 않습니다.

이 워크샵을 위해 조직 내 계정을 이용하기 보다는 개인 계정을 사용하거나 새 AWS 계정을 생성하십시오. 이는 워크샵 수행에 필요한 모든 권한을 확보하고 워크샵 종료 후 어떠한 자원도 남기지 않기 위함입니다.


### 지역

**미국 동부 (버지니아 북부)**, **미국 서부 (오레곤)** 또는 **EU (아일랜드)**를 사용합니다. 이 지역은 워크샵 진행에 필요한 모든 서비스를 제공합니다. 이용할 수 있는 다른 지역을 확인하기 위해서는 [지역 테이블][region-table]을 참조하십시오.


### AWS Cloud9 IDE

AWS Cloud9는 클라우드 기반 통합 개발 환경 (IDE)으로 브라우저 만으로 코드를 작성, 실행 및 디버깅 할 수 있습니다. 코드 편집기, 디버거 및 터미널이 포함되며, 이외에 널리 사용되는 프로그래밍 언어 및 AWS 명령 줄 인터페이스 (CLI)등 필수 도구가 사전 패키지로 제공됩니다. Cloud9을 통해 개인 랩탑에 파일을 설치하거나 개발 환경을 구성할 필요가 없습니다. Cloud9 환경에서는 AWS Management Console에 로그인 한 사용자와 동일한 AWS 서비스에 액세스 할 수 있습니다.

잠시 시간을 내어 Cloud9 개발 환경을 설정하십시오.

**:white_check_mark: 단계별 지침**

1. AWS Management Console로 이동하여 **서비스**를 클릭 한 다음 **Cloud9**를 선택하십시오.
   개발자 도구 아래에 있습니다.

1. **Create Environment**을 클릭하십시오.

1. **Name**에 'Development'을 입력하고 선택적으로 **Description**을 제공하십시오.

1. **Next**를 클릭하십시오.

1. 새로운 환경을 시작하기 위해 **Environment Settings**을 기본값으로 두어 **t2.micro** EC2 인스턴스를 생성할 수 있습니다. 이 인스턴스는 콘솔이 액티브하지 않으면 **30 분** 후에 중지됩니다.

1. **Next**를 클릭하십시오.

1. 환경 설정을 검토하고 **Create Environment**를 클릭하십시오. 환경을 프로비저닝하고 준비하는 데 수 분이 소요될 수 있습니다.

1. 준비가 완료되면 IDE가 시작 화면으로 열립니다. 다음과 유사한 터미널 프롬프트가 뜹니다.
    ![](../site/images/setup-cloud9-terminal.png)

    로컬 컴퓨터에서와 마찬가지로 여기에서 AWS CLI 명령을 실행할 수 있습니다.
    `aws sts get-caller-identity`를 실행하여 사용자가 로그인했는지 확인하십시오.

    ```console
    aws sts get-caller-identity
    ```
 

    계정 및 사용자 정보가 출력됩니다.

    ```console
    Admin:~/environment $ aws sts get-caller-identity
    ```

    ```json
    {
        "Account": "123456789012",
        "UserId": "AKIAI44QH8DHBEXAMPLE",
        "Arn": "arn:aws:iam::123456789012:user/Alice"
    }
    ```

이 워크샵 전반에 걸쳐 AWS Cloud9 IDE를 탭으로 열어 두십시오. Docker 컨테이너로 샘플 앱 빌드 및 실행을 하거나 AWS CLI 사용하기 위해 Cloud9이 필요합니다.

### 커맨드 라인 클라이언트

이 모듈은 두 개의 명령 행 클라이언트를 사용하여 유니콘들의 센서 데이터를 시뮬레이션하고 표시합니다. 이는 [Go
프로그래밍 언어] [golang]로 작성된 작은 어플리케이션들로 구성되어 있습니다. 아래 [설치](#installation) 섹션을 따라 사전 빌드 된 바이너리를 설치할 수 있습니다. 소스를 다운로드하여 수동으로 빌드할 수도 있습니다.

- [producer.go][producer]
- [consumer.go][consumer]

#### Producer

Producer 는 Wild Ryde에서 승객을 태우는 유니콘에서 센서 데이터를 발생시킵니다. 매초마다 유니콘의 위도와 경도 위치와 초 단위 이동 거리(m), 유니콘의 현재 마법 레벨과 건강 상태 점수를 전송합니다.

#### Consumer

Consumer 는 Amazon Kinesis에서 Formatted JSON 메시지를 읽고 표시합니다. 스트림으로 전송되는 내용을 실시간으로 모니터링 할 수 있습니다. Consumer를 사용하면 Producer 와 응용 프로그램의 데이터를 모니터링 할 수 있습니다

#### 설치

1. Cloud9 환경을 여십시오.

1. Cloud9 터미널에서 다음 명령을 실행하여 명령 행 클라이언트를 다운로드하고 압축을 푸십시오.

    ```console
    curl -s https://dataprocessing.wildrydes.com/client/client.tar | tar -xv
    ```
 

그러면 `Consumer` 및 `Producer` 파일이 Cloud9 환경에 압축 해제됩니다.

### :star: 팁

:bulb: Cloud9의 스크래치 패드 또는 로컬 컴퓨터의 텍스트 편집기를 이용하여 단계별 지침에 필요한 ID 또는 Amazon 리소스 이름 (ARN)을 복사하여 붙여 넣습니다.

### :star: 요약

:key: 고유한 개인/개발용 [AWS 계정](#aws-account) 이용

:key: **미국 동부 (버지니아 북부)**, **미국 서부 (오레곤)** 또는 **EU(아일랜드)** [지역](#region) 중 하나를 사용합니다.

:key: [AWS Cloud9 IDE](#aws-cloud9-ide)를 탭으로 열어 둡니다

### 다음

:white_check_mark: 첫 번째 모듈인 [실시간 데이터 스트리밍][streaming-data]를 진행하여, 유니콘 데이터를 스트림으로 전송하고 유니콘의 위치를 라이브 맵에서 시각화하십시오.

[region-table]: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/
[streaming-data]: streaming-data.md
[golang]: https://golang.org
[producer]: https://dataprocessing.wildrydes.com/client/producer.go
[consumer]: https://dataprocessing.wildrydes.com/client/consumer.go