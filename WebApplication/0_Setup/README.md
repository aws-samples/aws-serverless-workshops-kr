## 실습 준비

### AWS 계정

이 워크샵을 완료하려면 AWS 계정 및 계정 내에서 AWS IAM(Identity and Access Management)  Amazon Cognito, AWS Lambda, Amazon S3, Amazon API Gateway, AWS Amplify Console, Amazon DynamoDB, AWS 
Cloud9 리소스를 구성할 수 있는 권한이 필요합니다. 

이 워크샵은 한 번에 한 명의 참가자가 하나의 AWS 계정을 사용한다고 가정합니다. 다른 참가자와 계정을 공유할 경우 특정 리소스에 대한 이름 충돌이 발생합니다. 리소스 이름에 접미사를 사용하거나 별개의 리전을 사용하여이 문제를 해결할 수 있지만, 이러한 내용은 워크샵 지침에 포함되지 않습니다.

필요한 서비스에 대한 전체 액세스 권한을 확보하고 워크샵에서 리소스를 완전히 삭제할 수 있도록 회사 계정 대신 개인 계정을 사용하거나 새 AWS 계정을 생성할 것을 권장합니다. 

### AWS Cloud9 IDE

AWS Cloud9는 브라우저만으로 코드를 작성, 실행 및 디버깅할 수 있는 클라우드 기반 통합 개발 환경(IDE)입니다. 코드 편집기, 디버거 및 터미널이 포함되어 있습니다. Cloud9에는 널리 사용되는 프로그래밍 언어 및 AWS CLI(Command Line Interface) 등 필수 도구가 사전 패키지로 제공되므로 별도로 파일을 설치하거나 랩톱을 구성할 필요가 없습니다. Cloud9 환경은 AWS Management Console에 로그인 한 사용자와 동일한 AWS 리소스에 액세스할 수 있습니다.

이제 Cloud9 개발 환경을 설정합니다.

**:white_check_mark: 단계별 지침**

1. AWS 관리 콘솔로 이동하여 **Services**를 클릭하고 Developer Tools에 있는 **Cloud9**을 선택합니다. 

1. **Create environment**을 선택합니다.

1. **Name**에 `Development`를 입력하고 필요한 경우 **Description**도 작성합니다.

1. **Next step**을 클릭합니다. 

1. Environment settings를 기본 설정으로 남겨둡니다. (**Create a new instance for environment (EC2)**, **t2.micro**, **Amazon Linux**, **30분 동안 미활동 시 정지** 등)

1. **Next step**을 클릭합니다. 

1. 환경 설정값을 검토 후 **Create environment**을 클릭합니다. 환경이 준비되기까지 수 분이 소요됩니다.

1. 준비가 완료되면 Welcome 화면과 함께 하단에 터미널 프롬프트가 보입니다.

    로컬 컴퓨터에서와 마찬가지로 여기에서 AWS CLI 명령을 실행할 수 있습니다. `aws sts get-caller-identity`를 실행하여 로그인 정보를 확인합니다.

    ```console
    aws sts get-caller-identity
    ```

    계정 및 사용자 정보를 나타내는 출력이 표시됩니다:

    ```console
    ec2-user:~/environment $ aws sts get-caller-identity
    ```
    ```json
    {
        "Account": "123456789012",
        "UserId": "AKIAI44QH8DHBEXAMPLE",
        "Arn": "arn:aws:iam::123456789012:user/Alice"
    }
    ```

이 워크샵을 진행하는 동안 AWS Cloud9 IDE를 다른 탭에 열어둡니다.

### :star: 팁

:bulb: Cloud9의 스크래치 패드나 로컬 컴퓨터의 텍스트 편집기를 열어둡니다. 단계별 지침에서 ID나 ARN(Amazon Resource Name) 등이 다음 단계에서 필요하므로 그때그때 메모장에 적어둡니다. 

### :star: 요약

:key: 개인 고유 또는 개발 [AWS 계정](#aws-account) 을 사용합니다.

:key: [AWS Cloud9 IDE](#aws-cloud9-ide) 을 다른 탭에 계속 열어둡니다.

### Next

:white_check_mark: 첫번째 모듈인 [정적 웹 호스팅][static-web-hosting]으로 이동하여 AWS Amplify Console를 이용해 정적 웹 사이트를 배포합니다.

[region-table]: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/
[static-web-hosting]: ../1_StaticWebHosting/