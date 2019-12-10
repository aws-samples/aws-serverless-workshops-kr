# Wildrydes 서버리스 웹 애플리케이션 워크샵

이 리포지토리는 AWS Lambda, Amazon API Gateway, Amazon DynamoDB, AWS Step Functions, Amazon Kinesis 및 기타 서비스를 사용하여 다양한 서버리스 애플리케이션을 구축하는 데 도움이되는 워크샵 및 기타 실습 콘텐츠들을 포함합니다.

# 워크샵

- [**Web Application**](WebApplication) - 이 워크샵에서는 서버리스 동적 웹 애플리케이션을 빌드하는 방법을 보여줍니다. Amazon S3에서 정적 웹 리소스를 호스팅하는 방법, Amazon Cognito를 사용하여 사용자 및 인증을 관리하는 방법, Amazon API Gateway, AWS Lambda 및 Amazon DynamoDB를 사용하여 백엔드 처리를 위한 RESTful API를 구축하는 방법에 대해 알아 봅니다.

- [**Auth**](Auth) - 이 워크샵에서는 애플리케이션의 가입 및 로그인 기능부터 시작하여 여러 계층에서 보안을 강화하는 방법, 서버리스 마이크로 서비스를 보호하는 방법, 그리고 AWS의 ID 및 액세스 관리 (Identity and Access Management, IAM)를 활용하여 애플리케이션 사용자에게 세분화된 액세스 제어를 제공하는 방법을 보여줍니다. AWS Amplify가 Amazon Cognito, Amazon API Gateway, AWS Lambda 및 IAM과 통합하여 통합 인증 및 권한 부여 환경을 제공하는 방법에 대해 알아봅니다.

- [**Data Processing**](DataProcessing/guide/content) - 이 워크샵은 서버리스 애플리케이션으로 데이터를 수집, 저장 및 처리하는 방법을 보여줍니다. 이 워크숍에서는 Amazon Kinesis Data Streams 및 Amazon Kinesis Data Analytics를 사용하여 실시간 스트리밍 애플리케이션을 구축하는 방법, Amazon Kinesis Data Firehose 및 Amazon S3를 사용하여 데이터 스트림을 아카이브하는 방법 및 이 데이터들에 대해 Amazon Athena를 이용하여 ad-hoc 쿼리를 실행하는 방법을 보여줍니다. 

- [**DevOps**](DevOps) - 이 워크샵은 [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model) 을 활용하여 Amazon API Gateway, AWS Lambda 및 Amazon DynamoDB를 사용한 서버리스 애플리케이션을 구축하는 방법을 보여줍니다. 
워크 스테이션에서 SAM을 사용하여 애플리케이션에 대한 업데이트를 릴리스하는 방법, AWS CodePipeline 및 AWS CodeBuild를 사용하여 서버리스 애플리케이션을위한 CI/CD 파이프라인을 구축하는 방법 및 애플리케이션의 여러 환경을 관리하도록 파이프라인을 향상시키는 방법에 대해 배웁니다.

- [**Image Processing**](ImageProcessing) - 
이 모듈은 백엔드에서 워크 플로우 오케스트레이션을 사용하여 서버리스 이미지 처리 애플리케이션을 빌드하는 방법을 보여줍니다. Amazon Rekogntion의 딥 러닝 기반 얼굴 인식 기능을 활용하면서 AWS Step Functions를 사용하여 여러 AWS Lambda 함수를 오케스트레이션하는 기본 사항을 학습합니다.

- [**Multi Region**](MultiRegion) - 
이 워크샵에서는 두 지역에 걸쳐 복제되고 재해 발생시 자동 장애 조치를 제공하는 서버리스 티켓팅 시스템을 구축하는 방법을 보여줍니다. AWS Lambda 함수 배포, API 게이트웨이를 통해 이를 노출하고 Route53 및 DynamoDB 스트림을 사용하여 복제를 구성하는 기본 사항을 학습합니다.

- [**Security**](https://github.com/aws-samples/aws-serverless-security-workshop) - 
이 워크샵에서는 AWS Lambda, Amazon API Gateway 및 RDS Aurora로 구축된 서버리스 애플리케이션을 보호하는 기술을 보여줍니다. 자격 증명 및 액세스 관리, 인프라, 데이터, 코드 및 로깅 및 모니터링의 5가지 도메인에서 서버리스 애플리케이션의 보안을 향상시키기 위해 활용할 수있는 AWS 서비스 및 기능을 다룹니다.


# Third Party Workshops

다음 워크샵은 타사에서 만들고 유지 관리하는 워크샵으로, AWS에서의 서버리스 개발과 관련된 다양한 주제와 도구를 살펴볼 수 있습니다.

- [**HERE Geocoding and Routing Extensions**](https://github.com/heremaps/devrel-workshops/tree/master/aws-serverless) - [**Web Application**](WebApplication) 과 [**Data Processing**](https://dataprocessing.wildrydes.com)  워크샵을 확장하여 지오 코딩 및 고급 라우팅 기능으로 기본 응용 프로그램을 향상시키는 방법을 안내합니다. AWS Serverless Application Repository에서 애플리케이션을 시작하고 이러한 구성 요소를 기존 아키텍처에 통합하는 방법을 살펴 봅니다. 이 워크샵을 시작하기 전에 이 저장소에서 기본 웹 애플리케이션 또는 데이터 처리 워크샵을 완료해야 합니다.