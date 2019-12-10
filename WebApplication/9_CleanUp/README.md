# 워크샵 정리

이 페이지는 이전 모듈 중에 생성된 리소스를 정리하는 지침을 제공합니다.

## 리소스 정리 가이드

### 1. Module 6 - AppSync GraphQL API Cleanup

<details>
<summary><strong>:white_check_mark: Step-by-step directions(expand for details)</strong></summary><p>
Delete the AppSync GraphQL API. From the AppSync console, select the application and click **Delete**

1. Go to the [AWS AppSync Console][appsync-console].
1. Select the API created for this workshop.
1. Select **Delete** from the top right.
1. Complete the application deletion process.

</p></details>

### 2. Module 5 - OAuth Cleanup

<details>
<summary><strong>:white_check_mark: Step-by-step directions(expand for details)</strong></summary><p>
Delete the Unicorn Manager CloudFront distribution and S3 bucket for the static website hosting created in module 5. Using the Lambda console, also delete the **ListUnicornRides** and **ListUnicornAuthorizer** functions. If you have deployed the pre-requisites CloudFormation stack, delete the stack using the CloudFormation console.

1. In the AWS Management Console, click **Services** then select **CloudFront** under Networking & Content Delivery.

1. Select the distribution for the Unicorn Manager application we created in module 5 and click **Disable**.

1. Once the distribution is disabled, click **Delete**.

1. Using the **Services** dropdown, navigate to the **S3** console under Storage.

1. Select the **unicornmanager-xxx** bucket and click **Delete bucket**. In the confirmation window enter the bucket name and click **Confirm**.

1. Next, using the **Services** dropdown navigate to the **Lambda** console under Compute.

1. From the functions list, select the **ListUnicornRides** function and use the **Actions** dropdown to select **Delete**.

1. Repeat the same operation for the **ListUnicornAuthorizer** function.

1. If you have deployed the pre-requisites stack before starting module 5, navigate to the **CloudFormation** console under Management Tools.

1. Select the **WildRydes-xxx** stack and use the **Actions** dropdown to click **Delete Stack**.

</p></details>

### 3. Module 4 - REST API 정리
모듈 4에서 생성한 REST API를 삭제합니다.  Amazon API Gateway 콘솔에서 삭제할 API를 선택하여 **Actions** 드롭다운에서 **Delete API** 옵션을 선택합니다. 

**:white_check_mark: Step-by-step directions**

1. [Amazon API Gateway Console][api-gw-console]로 이동합니다.
1. 모듈 4에서 생성한 API를 선택합니다..
1. **Actions** 드롭다운을 확장하여 **Delete API**를 선택합니다.
1. 창이 뜨면 API의 이름을 입력하고 **Delete API**를 클릭합니다.

### 4. Module 3 - 서버리스 백엔드 정리
모듈 3에서 생성한 AWS Lambda 함수, IAM 역할(role) 및 Amazon DynamoDB 테이블을 삭제합니다.

**:white_check_mark: Step-by-step directions**

#### Lambda 함수

1. [AWS Lambda console][lambda-console]로 이동합니다.
1. 모듈 3에서 생성한 `RequestUnicorn` 함수를 선택합니다. 
1. **Actions** 드롭다운에서 **Delete function**을 선택합니다.
1. 확인 메세지가 나타나면 **Delete**를 선택합니다. 

#### IAM Role

1. [AWS IAM Console][iam-console]로 이동합니다.
1. 네비게이션 메뉴에서 **Roles**를 선택합니다. 
1. 검색창에 `WildRydesLambda` 를 입력하여 검색합니다. 
1. 모듈 3에서 작성한 역할을 선택합니다.
1. **Role actions** 드롭다운에서 **Delete role**를 선택합니다. 
1. 창이 뜨면 **Yes, Delete** 를 클릭합니다. 

#### DynamoDB 테이블

1. [Amazon DynamoDB Console][dynamodb-console]로 이동합니다.
1. 네비게이션 메뉴에서 **Tables** 로 이동합니다. 
1. 모듈 3에서 생성한 **Rides** 테이블을 선택합니다. 
1. **Actions** 드롭다운에서 **Delete table** 을 클릭합니다. 
1. **Delete all CloudWatch alarms for this table** 을 체크한 상태로 **Delete**를 클릭합니다.

### 5. Module 2 - User Management 정리
Amazon Cognito 사용자 풀(User Pool)을 삭제합니다.

**:white_check_mark: Step-by-step directions**

1. [Amazon Cognito Console][cognito-console]로 이동합니다.
1. **Manage your User Pools**을 선택합니다.
1. 모듈 2에서 생성한 **WildRydes** user pool을 선택합니다. 
1. 오른쪽 상단 코너의 **Delete Pool** 을 선택합니다. 
1. 애플리케이션 삭제 절차를 완료하십시오. 

### 6. Module 1 - Web Application 정리
AWS Amplify Console 애플리케이션을 삭제하고, 선택적으로 AWS CodeCommit과 GitHub repository도 삭제합니다:

**:white_check_mark: Step-by-step directions**

#### Amplify Console 웹 애플리케이션:

1. [Amplify Console console page][amplify-console-console]를 시작합니다.
1. 오늘 실습했던 애플리케이션을 선택합니다. 
1. 오른쪽 상단 코너에 **Actions** 에서 *Delete App*를 선택합니다.
1. 애플리케이션 삭제 절차를 완료합니다. 

#### For the CodeCommit repository:

1. [AWS CodeCommit console][codecommit-console]로 이동합니다.
1. 오늘 생성한 repository 옆의 라디오 버튼을 클릭합니다.
1. 페이지의 오른쪽 상단에서 **Delete repository**를 선택합니다.  
1. repository 삭제 절차를 완료합니다.


### 7. CloudWatch Logs 정리
AWS Lambda는 Amazon CloudWatch Logs에서 함수별로 새 로그 그룹을 자동으로 생성하고, 함수가 호출될 때마다 로그를 기록합니다. **RequestUnicorn** 함수의 로그 그룹을 삭제해야 합니다. 

**:white_check_mark: Step-by-step directions**

1. AWS 콘솔에서 **Services** 를 클릭하여 Management Tools 하단에서 **CloudWatch**를 선택합니다.
1. 네비게이션 메뉴에서 **Logs**를 선택합니다. 
1. 로그 그룹에서 **/aws/lambda/RequestUnicorn** 를 선택합니다. 만약 계정 내에 여러개의 로그 그룹이 있다면 **Filter** 에 `/aws/lambda/RequestUnicorn` 를 입력하여 쉽게 검색할 수 있습니다. 
1. **Actions** 드롭다운에서 **Delete log group** 를 선택합니다. 
1. 확인 메세지가 뜨면 **Yes, Delete** 를 선택합니다. 
1. 모듈을 진행하면서 CloudFormation 템플릿을 사용했다면 `/aws/lambda/wildrydes-webapp`에 해당하는 모든 로그 그룹에 대해 3-5 단계를 반복합니다. 

### 8. Cloud9 정리
오늘 생성한 Cloud9 개발 환경을 삭제합니다. 

**:white_check_mark: Step-by-step directions**

1. [Cloud9 console page][cloud9-console]을 시작합니다.
1. 오늘 시작한 환경을 선택합니다.
1. 맨 위 탐색에서 **Delete** 를 선택합니다.
1. 애플리케이션 삭제 절차를 완료합니다. 


[amplify-console-console]: https://console.aws.amazon.com/amplify/home
[amplify-console]: https://aws.amazon.com/amplify/console/
[api-gw-console]: https://console.aws.amazon.com/apigateway/home
[cloud9-console]: https://console.aws.amazon.com/cloud9/home
[codecommit-console]: https://console.aws.amazon.com/codesuite/codecommit/repositories
[codecommit-free]: https://aws.amazon.com/codecommit/pricing/
[cognito-console]: https://console.aws.amazon.com/cognito/home
[commit]: https://aws.amazon.com/codecommit
[create-repo]: https://help.github.com/en/articles/create-a-repo
[dynamodb-console]: https://console.aws.amazon.com/dynamodb/home
[github-clone]: https://help.github.com/en/articles/cloning-a-repository
[github]: https://github.com
[github-new-sshkey]: https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
[iam-console]: https://console.aws.amazon.com/iam/home
[lambda-console]: https://console.aws.amazon.com/lambda/home
[region-services]: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/
[setup]: ../0_Setup/
[user-management]: ../2_UserManagement/
