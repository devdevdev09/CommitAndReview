# CommitAndReview
 
### 커밋하는 사람과 리뷰어를 매칭 시키는 프로그램

#### 프로그램 요약
- Ver.1
    - N명의 그룹에서 각자 M명의 리뷰어를 매칭하는 프로그램.
    - 리뷰어 수만큼 각자 M명의 리뷰를 담당해야 함.
        - ex). 10명의 그룹에서 각자 2명의 코드리뷰를 담당하고 2명으로 부터 리뷰를 받는다.

- Ver.2
    - TODO....

--- 

- 2020-04-16
    - Update README.md

- 2020-04-17
    - 프로그램 요약 추가(Ver.1)

- 2020-04-22
    - 데이터 구조 정의(대강...)

- 2020-04-25
    - 데이터 구조 수정
        - 매칭정보 데이터 수정 : 회차별 데이터로 수정
            ```
                [
                    {
                        "NO" : "1" ,               -- 회차
                        "WEEK" : "1" ,             -- 주차
                        "DATE" : "2020-04-20" ,    -- 날짜
                        "DATA" : [
                            {
                                "USER_ID" : "1",           -- 유저(나)
                                "COMMITS" : [              -- 내가 리뷰해야할 사람들
                                    {
                                        "NO" : "1",        -- 순번
                                        "USER_ID" : "2"    -- 아이디 
                                    },
                                ]
                            }
                        ]
                    },
                ]
            ```


- 2020-04-30
    - 파일에 새로운 데이터 넣는 코드 추가

- 2020-05-03
    - moment.js 추가
    - 오늘날짜, 기록할 날(1주일마다) 체크 하는것 추가

- 2020-05-14
    - 데이터 구조 수정
        - "DATA.COMMITS"를 "DATA.REVIEWS"로 수정
    - 실제 랜덤 유저 매칭
    
- 2020-05-15
    - 매칭 일자 체크 추가
        - 오늘이 마지막 매칭일로부터 7일이상 지났는지 체크
    - 회차, 주차 체크 추가
        - 정해진 기간(4주)을 넘기면 새로운 회차로 체크
    - 실제 파일에 데이터 추가
---

### TODO
- 매칭할때 자신 제외 하기


