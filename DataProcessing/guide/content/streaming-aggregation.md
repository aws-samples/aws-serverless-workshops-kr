## 스트리밍 데이터 통합

이 모듈에서는 Amazon Kinesis Data Analytics 애플리케이션을 생성하여 유니콘 차량의 센서 데이터를 실시간으로 집계합니다. 응용 프로그램은 Amazon Kinesis 스트림에서 이동 총 거리를 계산하고, 현재 Wild Rydes에 있는 각 유니콘에 대한 최소 및 최대 체력 및 마법 점수를 집계하여 Amazon Kinesis 스트림에 출력합니다.

### 개요

이 모듈의 아키텍처에는 Amazon Kinesis Data Analytics, 송신(source) 및 수신(destination) 스트림, Producer 및 Customer 명령줄 클라이언트가 포함됩니다.

Amazon Kinesis Data Analytics 애플리케이션은 이전 모듈에서 생성한 Amazon Kinesis 스트림의 데이터를 가공하고 1분에 한 번씩 집계 데이터를 만듭니다. 매 분 각 유니콘의 마지막 1분 간 이동 거리, 건강 점수와 매직 점수의 최소/최대치를 집계합니다. 이 데이터 포인트들은 수신하는 Amazon Kinesis 스트림으로 보내져 우리 시스템의 다른 부분들이 가공하게 됩니다.


### 구현

#### 1. Amazon Kinesis 스트림 생성

Amazon Kinesis Data Streams 콘솔을 사용하여 **wildrydes** 라는 이름의 새 스트림을 생성하십시오. 이때 샤드는 **1개**만 갖습니다.

**:white_check_mark:  단계별 지침**

1. AWS Management Console로 이동하여**서비스**를 클릭 한 다음**Kinesis**를 선택하십시오.
   웹 로그 분석에서

1. 소개 화면이 나타나면 **Get started**를 클릭하십시오.

1. **Create data stream**을 클릭합니다.

1. **Kinesis stream name**에 `wildrydes-summary`를 입력하고 **Number of shards** 에 1을 입력한 다음 **Create Kinesis stream**을 클릭합니다.

1. 60 초 내에 Kinesis 스트림이 **ACTIVE** 상태가 되며 실시간 스트리밍 데이터 저장 준비가 완료됩니다.


#### 2. Amazon Kinesis Data Analytics 애플리케이션 생성

이전 모듈에서 생성한 **wildrydes** 스트림을 읽고 매 분 다음과 같은 속성을 갖는 JSON Object를 생성하는 Amazon Kinesis Data Analytics 애플리케이션을 빌드합니다.

  | | |
  | --- | --- |
  |**Name**| 유니콘 이름 |
  |**StatusTime**| Amazon Kinesis Data Analytics이 제공하는 ROWTIME |
  |**Distance**| 유니콘이 움직인 거리의 합 |
  |**MinMagicPoints**| _MagicPoints_ 속성의 최소값 |
  |**MaxMagicPoints**| _MagicPoints_ 속성의 최대값 |
  |**MinHealthPoints**| _HealthPoints_ 속성의 최소값 |
  |**MaxHealthPoints**| _HealthPoints_ 속성의 최대값 |

응용 프로그램의 대상(destination) 스트림을 **wildrydes-summary**로 설정하십시오.

**:white_check_mark: 단계별 지시 사항**

1. Cloud9 환경을 연 탭으로 전환하십시오.

1. Producer를 실행하여 센서 데이터를 스트림으로 전송하기 시작합니다.

    ```console
    ./producer
    ```
 

    이 단계에서 애플리케이션을 구축하는 동안 센서 데이터를 적극적으로 생성하면 Amazon Kinesis Data Analytics가 스키마를 자동 감지할 수 있습니다.

1. AWS Management Console로 이동하여 **Services**를 클릭 한 다음 Analytics 하위의 **Kinesis**를 선택하십시오.


1. **Create analytics application**를 클릭합니다.

1. **Application name**에 `wildrydes`를 입력한 다음 **Create application** 클릭.

1. **Connect streaming data**을 클릭하십시오.

1. **Kinesis stream**에서 'wildrydes'를 선택하십시오.

1. 아래로 스크롤하여 **Discover schema**을 클릭하고 잠시 기다렸다가 스키마가 올바르게 자동 검색되는지 확인합니다.

    ![](./images/streaming-aggregation-schema-discovery.png)

    자동 검색된 스키마에 다음이 포함되어 있는지 확인하십시오.

    | Column | Data Type |
    | --- | --- |
    | Distance | `DOUBLE` |
    | HealthPoints | `INTEGER` |
    | Latitude | `DOUBLE` |
    | Longitude | `DOUBLE` |
    | MagicPoints | `INTEGER` |
    | Name | `VARCHAR(16)` |
    | StatusTime | `TIMESTAMP` |


1. **Save and continue**을 클릭하십시오.

1. **Go to SQL editor**을 클릭하십시오. 대화식 쿼리 세션이 열립니다.
   이 세션에서 실시간 Amazon Kinesis 스트림을 대상으로 쿼리를 작성할 수 있습니다.

1. **Yes, start application**을 클릭하십시오. 응용 프로그램을 시작하기까지 30 ~ 90 초가 소요됩니다.


1. 다음 SQL 쿼리를 복사하여 SQL 편집기에 붙여 넣습니다.

    ```sql
    CREATE OR REPLACE STREAM "DESTINATION_SQL_STREAM" (
      "Name"                VARCHAR(16),
      "StatusTime"          TIMESTAMP,
      "Distance"            SMALLINT,
      "MinMagicPoints"      SMALLINT,
      "MaxMagicPoints"      SMALLINT,
      "MinHealthPoints"     SMALLINT,
      "MaxHealthPoints"     SMALLINT
    );

    CREATE OR REPLACE PUMP "STREAM_PUMP" AS
      INSERT INTO "DESTINATION_SQL_STREAM"
        SELECT STREAM "Name", "ROWTIME", SUM("Distance"), MIN("MagicPoints"),
                      MAX("MagicPoints"), MIN("HealthPoints"), MAX("HealthPoints")
        FROM "SOURCE_SQL_STREAM_001"
        GROUP BY FLOOR("SOURCE_SQL_STREAM_001"."ROWTIME" TO MINUTE), "Name";
    ```
 


1. **Save and run SQL**을 클릭하십시오. 매분, 집계된 데이터가 한 행으로 등록되는 것을 볼 수 있습니다.

    ![](./images/streaming-aggregation-rows-preview.png)

1. **Close** 링크를 클릭하십시오.

1. **Connect to a destination**을 클릭하십시오.

1. **Kinesis stream**에서 **wildrydes-summary**를 선택합니다.

1. **In-application stream name**에서 **DESTINATION_SQL_STREAM**을 선택하십시오.

1. **Save and continue**을 클릭하십시오.

#### 3. 스트림에서 메시지 읽기

Kinesis 스트림이 1 분마다 집계하여 전송하는 메시지를 보려면 Consumer 를 사용하십시오.


**:white_check_mark:  단계별 지시 사항**

1. Cloud9 환경을 연 탭으로 전환하십시오.

1. 소비자를 실행하여 스트림에서 센서 데이터 읽기를 시작합니다.

    ```console
    ./consumer -stream wildrydes-summary
    ```
 


    Consumer 는 Kinesis Data에서 1 분마다 분석하여 보내는 메시지를 인쇄합니다.

    ```json
    {
      "Name": "Shadowfax",
      "StatusTime": "2018-03-18 03:20:00.000",
      "Distance": 362,
      "MinMagicPoints": 170,
      "MaxMagicPoints": 172,
      "MinHealthPoints": 146,
      "MaxHealthPoints": 149
    }
    ```

#### 4. Producer 실험

대시 보드와 소비자를 보면서 Producer를 중지하고 시작하십시오.
다른 유니콘 이름으로 여러 Producer를 시작하십시오.

**:white_check_mark: 단계별 지시 사항**

1. Cloud9 환경을 연 탭으로 전환하십시오.

1. Control + C를 눌러 Producer를 중지하면 메시지가 중지됩니다.

1. Producer를 다시 시작하고 메시지가 재개되는지 확인하십시오.

1. (+) 버튼을 누르고 **New Terminal**을 클릭하여 새 터미널 탭을 엽니다.

1. 새 탭에서 Producer의 다른 인스턴스를 시작하십시오. 구체적인 유니콘 이름을 지정하고 Consumer 아웃풋에서 추가로 지정한 유니콘의 데이터 포인트를 확인하십시오.

    ```console
    ./producer -name Bucephalus
    ```
 

1. 출력에 여러 유니콘이 있는지 확인하십시오.

    ```json
    {
        "Name": "Shadowfax",
        "StatusTime": "2018-03-18 03:20:00.000",
        "Distance": 362,
        "MinMagicPoints": 170,
        "MaxMagicPoints": 172,
        "MinHealthPoints": 146,
        "MaxHealthPoints": 149
    }
    {
        "Name": "Bucephalus",
        "StatusTime": "2018-03-18 03:20:00.000",
        "Distance": 1773,
        "MinMagicPoints": 140,
        "MaxMagicPoints": 148,
        "MinHealthPoints": 132,
        "MaxHealthPoints": 138
    }
    ```

### :star: 요약

:key: Amazon Kinesis Data Analytics를 사용하면 스트리밍 데이터를 쿼리하거나 SQL을 사용하여 전체 스트리밍 응용 프로그램을 구축, 실행 가능합니다. 이를 통해 통찰력을 확보하고 비즈니스 및 고객 요구에 신속하게 대응하십시오.

:wrench: 이 모듈에서는 Kinesis Data Analytics 애플리케이션을 생성했습니다. 이 애플리케이션은 유니콘 데이터의 Kinesis 스트림에서 읽고 1분 마다 요약하여 별도의 행을 생성합니다.

### 다음

: white_check_mark : 다음 모듈인 [스트림 처리][stream-processing]에서는, Kinesis Data Analytics 애플리케이션에서 생성한 요약 데이터를 Amazon DynamoDB 테이블에 저장합니다.

[dashboard]: https://reinvent2017.wildrydes.com/dashboard.html
[setup]: setup.md
[find-account-id]: https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
[stream-processing]: stream-processing.md