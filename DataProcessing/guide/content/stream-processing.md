## 스트림 처리

이 모듈에서는 AWS Lambda를 사용하여 이전에 생성 된 Amazon Kinesis 스트림 `wildrydes`의 데이터를 프로세싱합니다.
Lambda 함수를 생성하여 스트림을 읽고 데이터가 도착하면 Amazon DynamoDB 테이블에 쓰는 기능을 구현합니다.

### 구현

#### 1. Amazon DynamoDB 테이블 생성

Amazon DynamoDB 콘솔을 사용하여 새 DynamoDB 테이블을 생성하십시오.
테이블 이름을 `UnicornSensorData`로 지정하고 `Name`이라는 **String** 유형의 **파티션 키(Partition Key)**를 설정합니다.
`StatusTime`이라는 **String** 유형의 **정렬 키(Sort Key)**도 추가합니다. 다른 설정값은 기본값으로 둡니다.

다음 섹션에서 사용하기 위해 테이블을 생성 한 후 **ARN (Amazon Resource Name)**를 적어두십시오.


**:white_check_mark: 단계별 지침**

1. AWS Management Console로 이동하여 **Services**를 선택한 다음 Database 하위에 있는 **DynamoDB**를 선택합니다.


1. **Create table**를 클릭하십시오.

1. **Table name**으로 `UnicornSensorData`를 입력하십시오.

1. **Partition Key**에 `Name`을 입력하고 키 타입을 **String**으로 선택하십시오.

1. **Add sort key** 확인란을 선택하십시오. **Sort Key**에 `StatusTime`을 입력하고 키 유형으로 **String**을 선택합니다.

1. **Use default settings** 란을 체크하고 **Create**를 클릭합니다.

    ![](images/stream-processing-dynamodb-create.png)

1. 새 테이블 속성의 **Table details** 섹션으로 스크롤 한 다음
  **Amazon Resource Name (ARN)**를 적어두십시오. 다음 단계에서 이것을 사용할 것입니다.

#### 2. Lambda 함수에 대한 IAM 역할 생성

IAM 콘솔을 사용하여 새 역할을 생성하십시오. 이름을 `WildRydesStreamProcessorRole`로 지정하고 역할 유형으로 Lambda를 선택하십시오. 
이 역할에 `AWSLambdaKinesisExecutionRole`라는 관리 정책을 할당하여 람다 함수가 Amazon Kinesis 스트림을 읽고 Amazon CloudWatch Logs에 로깅하도록 합니다. 
마지막 섹션에서 생성된 DynamoDB 테이블에 대한 `dynamodb : BatchWriteItem`를 허용하는 정책을 생성한 뒤 새 역할에 연결합니다.

**:white_check_mark: 단계별 지침**

1. AWS Management Console로 이동하여 **Service**를 클릭 한 다음 Security, Identity & Compliance 하위의 **IAM**을 선택하십시오.

1. 왼쪽 탐색 메뉴에서 **Policy**을 선택한 다음 **Create Policy** 클릭합니다.

1. **Visual Editor**를 사용하여 마지막 섹션에서 생성된 DynamoDB 테이블에 Lambda 함수가 접근할 수 있도록 IAM 정책을 만듭니다. **Service**를 클릭하고 **Find a Service**에 **DynamoDB** 를 입력합니다.

1. **Action**을 클릭하고 **Filter actions**에 **BatchWriteItem**을 입력한 뒤 체크 박스를 클릭합니다.

1. **Resources**를 클릭하고 **Table**에서**Add ARN**을 클릭 한 다음, 이전 섹션에서 생성한 DynamoDB 테이블의 **지역**, **계정** 및 **테이블 이름**을 입력합니다.

    **Region**에 이전 섹션에서 DynamoDB 테이블을 생성한 AWS 리전을 입력하십시오. (예 : us-east-1)

    **Account**에 12 자리 숫자 인 AWS 계정 ID를 입력합니다.
     예 : 123456789012. AWS Management 콘솔에서 AWS Account ID 번호를 찾으려면, 콘솔의 오른쪽 상단에 있는 탐색 모음에서 **Support**을 클릭한 다음 **Support Center**를 클릭하십시오. 현재 로그인 한 계정 ID가 화면 오른쪽 상단, Support 메뉴 바로 아래 표기됩니다.

    **Table Name**에 **UnicornSensorData**를 입력하십시오.

    **표에 ARN 지정** 필드에 다음과 유사하게 ARN이 표시되어야합니다.

     ![](images/stream-processing-add-arn.png)

1. **Add**를 클릭하십시오.

1. **Review policy**를 클릭합니다.

    ![](images/stream-processing-review-policy.png)

1. **Name** 필드에 `WildRydesDynamoDBWritePolicy`를 입력하십시오.

1. **Create policy**을 클릭합니다.

1. 왼쪽 탐색에서 **Roles**을 선택한 다음 **Create role**을 클릭하십시오.

1. **AWS service** 섹션에서 역할 유형으로 **Lambda**를 클릭하십시오.

1. **Next: Permission**을 클릭하십시오.

1. **Filter** 텍스트 상자에 `AWSLambdaKinesisExecutionRole`을 입력하고 해당 역할 옆의 확인란을 선택하십시오.

1. **Filter** 텍스트 상자에 `WildRydesDynamoDBWritePolicy`를 입력하고 해당 역할 옆의 확인란을 선택하십시오.

1. **Next: Review**를 클릭하십시오.

1. **Role Name**에 `WildRydesStreamProcessorRole`을 입력하십시오.

1. **Create Role**을 클릭하십시오.

#### 3. 스트림을 처리하기위한 Lambda 함수 생성

`WildRydesStreamProcessor`라는 Lambda 함수를 만듭니다.
**wildrydes** 스트림에서 새 레코드를 사용할 수 있을 때마다 트리거됩니다. 
아래 제공된 `index.js` 코드를 이용합니다. 환경 변수를 생성하여 `TABLE_NAME` 키에 `UnicornSensorData`값을 갖도록 구성하십시오. 또한 이 함수가 이전 섹션에서 생성한 `WildRydesStreamProcessor` 역할을 이용하도록 설정합니다.

**:white_check_mark: 단계별 지침**

1. AWS Management Console로 이동하여 **Services**를 선택한 다음 Compute 하위의 **Lambda**를 선택하십시오.

1. **Create a function**을 클릭합니다.

1. **Name** 필드에 `WildRydesStreamProcessor`를 입력하십시오.

1. **Runtime**에서 **Node.js 10.x**를 선택하십시오.

1. **Existing Role** 드롭 다운 리스트에서 **WildRydesStreamProcessorRole**을 선택합니다.

    ![](./images/stream-processing-lambda-basic-information.png)

1. **Create function**을 클릭합니다.

1. **Function code** 섹션까지 아래로 스크롤합니다.

1. 아래의 JavaScript 코드를 복사하여 코드 편집기에 붙여 넣습니다.

    ```javascript
    'use strict';

    const AWS = require('aws-sdk');
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.TABLE_NAME;

    exports.handler = function(event, context, callback) {
      const requestItems = buildRequestItems(event.Records);
      const requests = buildRequests(requestItems);

      Promise.all(requests)
        .then(() => callback(null, `Delivered ${event.Records.length} records`))
        .catch(callback);
    };

    function buildRequestItems(records) {
      return records.map((record) => {
        const json = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
        const item = JSON.parse(json);

        return {
          PutRequest: {
            Item: item,
          },
        };
      });
    }

    function buildRequests(requestItems) {
      const requests = [];

      while (requestItems.length > 0) {
        const request = batchWrite(requestItems.splice(0, 25));

        requests.push(request);
      }

      return requests;
    }

    function batchWrite(requestItems, attempt = 0) {
      const params = {
        RequestItems: {
          [tableName]: requestItems,
        },
      };

      let delay = 0;

      if (attempt > 0) {
        delay = 50 * Math.pow(2, attempt);
      }

      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          dynamoDB.batchWrite(params).promise()
            .then(function(data) {
              if (data.UnprocessedItems.hasOwnProperty(tableName)) {
                return batchWrite(data.UnprocessedItems[tableName], attempt + 1);
              }
            })
            .then(resolve)
            .catch(reject);
        }, delay);
      });
    }
    ```
    
 


    ![](./images/stream-processing-lambda-code.png)

1. **Environment variables** 섹션에서 다음 환경 변수를 입력하십시오.
  **키** `TABLE_NAME`, **값** `UnicornSensorData`.

    ![](./images/stream-processing-lambda-environment-variables.png)

1. **Basic settings** 섹션에서 **Timeout**을 **1**분으로 설정하십시오.

    ![](./images/stream-processing-lambda-basic-settings.png)

1. 스크롤하여 **Designer**섹션에서 **Kinesis**를 선택합니다.

    ![](./images/stream-processing-trigger-designer.png)

1. **Configure triggers** 섹션에서 **Kinesis Stream** 중 **wildrydes-summary**를 선택합니다.
  
1. **Batch size**를 100으로 설정하고 **Starting position**을 **latest**로 설정합니다.

1. **Add**를 클릭하십시오.

1. **Enabled**를 클릭하여 트리거를 활성화합니다.

    ![](./images/stream-processing-trigger-enabled.png)

1. **Save**를 클릭합니다.

#### 4. Lambda 함수 모니터링

트리거가 Lambda 함수를 올바르게 실행하고 있는지 확인하십시오. Lambda 함수에서 생성된 메트릭과 함수 실행 결과를 확인합니다.

**:white_check_mark: 단계별 지침**

1. 생산자를 실행하여 고유한 유니콘 이름을 가지고 센서 데이터를 스트림으로 전송하기 시작합니다.

    ```console
    ./producer -name Rocinante
    ```

1. **Monitoring** 탭을 클릭하고 모니터링 할 수 있는 메트릭을 탐색하십시오.
  **Jump to Logs**를 클릭하여 함수에서 출력된 로그들을 확인하십시오.

 

#### 5. DynamoDB 테이블 쿼리

AWS Management Console을 사용하여 DynamoDB 테이블을 쿼리하여 특정 유니콘에 대한 데이터를 확인합니다. producer를 사용하여 고유한 유니콘 이름을 가진 데이터를 생성합니다. 이 레코드들이 DB에 젖아이 되는지 확인합니다.

**:white_check_mark: 단계별 지침**

1. **Service**를 클릭한 다음 데이터베이스 섹션에서 **DynamoDB**를 선택하십시오.

1. 왼쪽 탐색 메뉴에서 **Tables**을 클릭하십시오.

1. **UnicornSensorData**를 클릭하십시오.

1. **Items** 탭을 클릭하십시오. 여기에 여러분이 실행한 Producer 에서 입력한 유니콘들에 대한 분당 데이터 포인트가 표시됩니다.

    ![](images/stream-processing-dynamodb-items.png)

### :star: 요약

:key: Lambda 함수를 구독하여 Kinesis 스트림의 데이터 레코드 배치를 읽어오고 프로세싱하도록 할 수 있습니다.

:wrench: 이 모듈에서는 유니콘 데이터를 요약하는 Kinesis 스트림을 읽어서 각 행을 DynamoDB에 저장하는 Lambda 함수를 구현해보았습니다.

### 다음

:white_check_mark: 다음 모듈인 [데이터레이크][data-lake]로 넘어가십시오.
해당 모듈에서는 Kinesis 스트림 원본 데이터를 Kinesis Data Firehose로 전달하고 S3에 저장해 Amazon Athena로 원본 데이터 쿼리를 수행합니다.

[data-lake]: data-lake.md