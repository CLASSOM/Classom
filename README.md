# 📢 2020 OSS CLASS 팀프로젝트 📢

### `팀명`: 클라썸 

### `멤버`:
> * 2019037129 신민경 - 백엔드
> * 2019046371 이승훈 - 프론트엔드
> * 2019042351 김동우 - 데이터베이스

<br><br>

### 프로젝트 소개
___________
사용자의 소비 패턴에 맞게 신용카드를 추천해주는 웹을 만드는 프로젝트입니다.


<br><br>

### 🚩 사용법
------------

1. Classom 리포지터리를 Clone 한다.

```bash
$ git clone git@github.com:CLASSOM/Classom.git
```
<br>

2. nodejs와 mysql을 설치한다.
<br>

3. CLASSOM/DB/cardDB.sql 파일을 복사하여 mysql/bin 폴더에 붙여넣는다.
<br>

4. 터미널(cmd)을 켜고 mysql/bin 폴더의 경로로 들어간다.
<br>

5. 데이터베이스를 생성한다.

```bash
$ mysql -uroot -p[mysql 설치할 때 만든 비밀번호]
mysql> create database cardDB;
mysql> exit
```
```bash
$ mysql -uroot -p cardDB < cardDB.sql
```
<br>

6. CLASSOM/Backend/db.js 에서 password 부분을 mysql 설치 할 때 설정한 비밀번호로 바꾼다.
<br><br>

7. CLASSOM/Backend/main.js 를 실행한다.

```bash
$ node main.js
```
<br>

8. 웹 브라우저를 켜고 `http://localhost:3000/` 로 들어간다.
<br>

9. 나만의 카드 찾기를 클릭한 후 질문지의 모든 답을 체크한다.
<br>

10. 제출 버튼을 눌렀을 때 나오는 링크를 클릭하면 나에게 맞는 카드를 볼 수 있는 사이트로 이동한다.
<br><br>



### `리포지터리 소개`
____________

* Backend : 
> - `node_modules` : 파일 실행에 필요한 모듈들이 저장된 폴더입니다.
> - `db.js` : 사용자의 정보를 바탕으로 데이터베이스에 있는 카드들 중 가장 적합한 카드를 찾아내는 파일입니다.
> - `main.js` : 서버를 생성하고 클라이언트로부터 오는 요청들을 처리하는 메인 파일입니다.

* DB : 
> - `card_data.xlsx` : 각 카드의 카테고리별 혜택을 정리해놓은 엑셀 문서입니다.
> - `cardDB.sql` : 데이터베이스의 dump 파일로, 데이터베이스를 import할 때 필요한 파일입니다.

* Frontend : 
> - `mainIndex.html` : localhost:3000으로 접속하면 가장 먼저 나오는 페이지입니다.
> - `mycard.html` : 내 카드 찾기를 누르면 나오는 페이지로 사용자의 소비 패턴을 조사하는데 필요한 질문 항목이 있습니다.

<br><br>

### `프로젝트에 기여`
______

1. Backend와 관련된 내용은 backend branch에 pull request를 보내주세요!
<br>

2. Database와 관련된 내용은 database branch에 pull request를 보내주세요!
<br>

3. Frontend와 관련된 내용은 frontend branch에 pull request를 보내주세요!
<br>

4. 코드가 복잡한 경우에는 각 기능을 구현하는 코드에 간단한 주석을 달아주세요!
<br>

5. 기여하려는 내용을 issue에 올려주세요!
<br>

6. 줄바꿈을 아끼지 말아주세요!
<br>
