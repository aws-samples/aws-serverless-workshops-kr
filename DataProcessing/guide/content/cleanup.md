## 정리

### 자원

아래는 이 워크샵에서 생성된 리소스 목록입니다. 모듈을 수행한 후 각각을 삭제하여 어카운트를 정리하십시오.

#### 아마존 Athena

**_wildrydes_ 테이블**

1. **서비스**를 클릭한 다음 분석 섹션에서 **Athena**를 선택하십시오.

1. **wildrydes** 옆에 있는 오버플로(세 개의 수직 점) 아이콘을 클릭하십시오.
  **테이블 삭제**를 클릭하십시오.

1. **예**를 클릭하여 삭제를 확인합니다.

#### Amazon Kinesis Data Firehose

**_wildrydes_ 전송 스트림**

1. **서비스**를 클릭한 다음 분석 섹션에서 **Kinesis**를 선택하십시오.

1. **Kinesis 전송 스트림**에서 **모두보기**를 클릭합니다.

1. **wildrydes** 옆의 라디오 버튼을 선택하십시오.

1. **동작** 및 **삭제**를 클릭하십시오.

1. 스트림 이름(**wildrydes**)을 입력하고 **삭제**를 클릭하여 자원이 삭제되었음을 확인합니다.

#### 아마존 S3

**데이터 버킷 (예 : _wildrydes-data-yourname_)**

1. **서비스**를 클릭한 다음 스토리지 섹션에서 **S3**을 선택하십시오.

1. 버킷 행 (예 : _wildydes-data-yourname_)을 클릭하여 강조되도록 하십시오.

1. **버킷 삭제**를 클릭하십시오.

1. 버킷 이름 (예 : _wildrydes-data-yourname_)을 입력하고 **확인**하여 삭제를 확인합니다.

#### AWS Lambda

**_WildRydesStreamProcessor_ 함수**

1. **서비스**를 클릭한 후 Compute 섹션에서 **Lambda**를 선택하십시오.

1. **WildRydesStreamProcessor** 옆에 있는 라디오 버튼을 클릭하십시오.

1. **동작** 및 **삭제**를 클릭하십시오.

#### Amazon DynamoDB

**_UnicornSensorData_ 테이블**

1. **서비스**를 클릭한 다음 데이터베이스 섹션에서* *DynamoDB**를 선택하십시오.

1. 왼쪽 탐색 메뉴에서 **테이블**을 클릭하십시오.

1. **UnicornSensorData** 옆에 있는 라디오 버튼을 클릭하십시오.

1. **테이블 삭제**를 클릭하고 **삭제**를 클릭하여 삭제를 확인하십시오.

#### AWS IAM

**_WildRydesDynamoDBWritePolicy_ 정책**

1. **서비스**를 클릭한 다음  Security, Identity & Compliance에서 **IAM**을 선택하십시오.

1. 왼쪽 탐색 메뉴에서 **정책**을 클릭합니다.

1. **필터**에서 **Customer Managed**를 선택합니다.

1. **WildRydesDynamoDBWritePolicy** 옆에 있는 확인란을 클릭합니다.

1. **정책 작업** 및 **삭제**를 클릭하십시오. **삭제** 버튼을 클릭하여 삭제를 확인하십시오.

**_WildRydesStreamProcessor_ 역할**

1. 왼쪽 탐색 메뉴에서 **역할**을 클릭하십시오.

1. **WildRydesStreamProcessor** 옆에 있는 확인란을 클릭하십시오.

1. **역할 삭제**를 클릭하고 **예, 삭제**를 클릭하여 삭제를 확인하십시오.

#### Amazon Kinesis Data Analytics

**_wildrydes_ 응용 프로그램**

1. **서비스**를 클릭한 다음 분석 섹션에서 **Kinesis**를 선택하십시오.

1. **Kinesis Analytics 응용 프로그램**에서 **모두보기**를 클릭합니다.

1. **wildrydes**를 클릭하여 라디오 버튼을 선택하십시오.

1. **동작** 및 **응용 프로그램 삭제**를 클릭하십시오.**응용 프로그램 삭제**를 클릭하여
   삭제를 확인하십시오.

#### Amazon Kinesis 데이터 스트림

**_wildrydes_ 및 _wildrydes-summary_ 스트림**

1. **서비스**를 클릭한 다음 분석 섹션에서 **Kinesis**를 선택하십시오.

1. **Kinesis 데이터 스트림**에서 **모두보기**를 클릭합니다.

1. **wildrydes** 및 **wildrydes-summary** 옆에 있는 확인란을 클릭하십시오.

1. **동작** 및 **삭제**를 클릭하십시오.