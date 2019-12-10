## 환영합니다!

_AWS Serverless Data Processing_ 워크샵에 오신 것을 환영합니다!

이 워크샵은 AWS 서비스를 사용하여 서버를 관리하지 않고 실시간 데이터 스트림을 처리하는 200 레벨 워크샵입니다. 이 워크샵에서는
[Wild Rydes][wildrydes] 본사의 운영자들이 [유니콘들][unicorns]의 건강 및 현재 상태를 모니터링할 수 있는 인프라를 구축할 겁니다. 각 유니콘에는 센서가 장착되어 각각의 위치와 건강 상태를 전송합니다. 또 이 워크샵에서는 AWS를 사용하여 이 데이터를 실시간으로 처리하고 시각화하는 애플리케이션을 빌드합니다.


[Amazon Kinesis][kinesis], [AWS Lambda][lambda], [Amazon Simple Storage Service (Amazon S3)][s3], [Amazon DynamoDB][dynamodb], [Amazon Cognito][cognito] 및 [Amazon Athena][athena] 등의 다양한 AWS 서비스를 이용할 예정입니다. Lambda를 사용하여 실시간 스트림을 처리하고 DynamoDB를 사용하여 유니콘의 건강 상태 정보를 저장합니다.
Amazon Kinesis Data Analytics를 사용하여 데이터를 통합하는 서버리스 애플리케이션을 구축하고, Amazon Kinesis Data Firehose 로 S3에 원본 데이터를 보내 아카이빙 합니다. 여기에 더해 Athena를 이용해서 원본 데이터에 대한 비정기적 쿼리를 실행합니다.

### 모듈

이 워크샵은 4 개의 모듈로 나뉩니다. 각 모듈은 우리가 구현하려는 대상과 이를 위한 단계별 스텝을 담은 시나리오를 설명합니다.

| 모듈 | 설명 |
| ---------------- | -------------------------------------------------------- |
| [실시간 스트리밍 데이터][streaming-data] | Kinesis에서 스트림을 만들고 그 스트림에서 데이터를 읽어서 와일드 라이드 유니콘을 라이브 맵에서 추적하십시오. 이 모듈에서는 Amazon Cognito 자격 증명 풀을 생성하여 라이브 맵에 스트림 액세스 권한을 부여합니다. |
| [스트리밍 데이터 통합][streaming-aggregation] | Kinesis Data Analytics 이용해 스트림을 읽는 애플리케이션을 구축하여 매분 이동하는 유니콘 건강 상태와 및 이동 거리와 같은 메트릭을 수집하십시오. |
| [스트림 처리][stream-processing] | 애플리케이션에서 데이터를 집계하여 DynamoDB의 백엔드 데이터베이스에 저장하고 쿼리를 수행하십시오. |
| [데이터 레이크][data-lake] | 데이터 장기 보관을 위해 Kinesis Data Firehose를 사용하여 원시 센서 데이터를 S3 버킷으로 플러시합니다. Athena로 원시 데이터에 대해 SQL 쿼리를 실행하고 비정기적 분석을 수행합니다. |

:warning: 이 모듈은 순서대로 수행하도록 설계되었습니다.

### 문제, 의견, 피드백?

이 워크샵은 [오픈 소스][repo]입니다! 문제가 발생하거나 콘텐츠에 기여하고 싶거나 전반적인 피드백을 하고 싶으시면 [issue][issue] 또는 [pull request][pull]을 여십시오.

### 다음

:white_check_mark: [설정 안내][setup]의 지침을 검토하고 따르십시오. 이 안내서에서는 AWS Cloud9 IDE를 구성하고 AWS 계정과 같은 사전 요구 사항을 설정합니다.


[wildrydes]: http://wildrydes.com/
[unicorns]: http://www.wildrydes.com/unicorns.html
[kinesis]: https://aws.amazon.com/kinesis/
[cognito]: https://aws.amazon.com/cognito/
[lambda]: https://aws.amazon.com/lambda/
[s3]: https://aws.amazon.com/s3/
[dynamodb]: https://aws.amazon.com/dynamodb/
[athena]: https://aws.amazon.com/athena/
[streaming-data]: streaming-data.md
[streaming-aggregation]: streaming-aggregation.md
[stream-processing]: stream-processing.md
[data-lake]: data-lake.md
[setup]: setup.md
[repo]: https://github.com/awslabs/aws-serverless-workshops
[issue]: https://github.com/awslabs/aws-serverless-workshops/issues
[pull]: https://github.com/awslabs/aws-serverless-workshops/pulls