const jparser = require("./json-parser");
const moment  = require("moment");
const fs = require("fs");

const fileName = "data.json";
const fileExt = "utf8";

// 멤버 리스트를 가져온다.
const getMemberList = function(){
    const members = getJsonParse("members.json");

    return members;
};

const getDataList = function(){
    const datas = getJsonParse("data.json");

    return datas;
}

// json 파일 파싱
const getJsonParse = function(fileName){
    const fileExt = "UTF8";

    const data = jparser.getJsonData(fileName, fileExt);

    return data;
}

const getToday = function(){
    const today = moment().format("YYYY-MM-DD");
    return today;
}

const addDate = function(add, _date){
    const last = moment(_date);
    const date = last.add(add,'days').format("YYYY-MM-DD");
    return date;
}

// 이전에 매칭이 되었는지 체크
const checkLastWeek = function(member){
    const datas = getDataList();

    const len = datas.length;
    const currentLen = len - 1;
    const currentWeek = datas[currentLen].WEEK;
    const currentNo = datas[currentLen].NO;
    const currentDate = datas[currentLen].DATE;
    const checkDate = addDate(7, currentDate);
    const lastWeekMembers = [];

    if(checkDate == getToday()){
        console.log("기록할날");
    }else{
        console.log("기록 안해도 됨");
    }

    for(index in datas){
        // 이번주만 체크
        if(datas[index].NO == currentNo){
            if(currentWeek == 1){
                // 1회차 일경우
            }else{
                // 1회차 이상일 경우
                for(i in datas){
                    
                }
            }    
        }
    }
    // 
    // data.push(setJsonData(
    // {
    //     NO : "1",
    //     WEEK : "2",
    //     DATE : "2020-04-27"
    // }));

    // fileWrite(JSON.stringify(data));
}

// 개인이 커밋확인할 사람 매칭
const setCommitMember = function(list){
    
};

const setJsonData = function(data){
    const json = {
        NO : data.NO,
        WEEK : data.WEEK,
        DATE : data.DATE,
    }

    // TODO::유저 데이터 설정하기
    const users = [
            {
                "USER_ID" : "1",
                "COMMITS" : [
                    {
                        "NO" : "1",
                        "USER_ID" : "2"
                    },
                    {
                        "NO" : "2",
                        "USER_ID" : "3"
                    }
                ]
            },
            {
                "USER_ID" : "2",
                "COMMITS" : [
                    {
                        "NO" : "1",
                        "USER_ID" : "1"
                    },
                    {
                        "NO" : "2",
                        "USER_ID" : "3"
                    }
                ]
            },
            {
                "USER_ID" : "3",
                "COMMITS" : [
                    {
                        "NO" : "1",
                        "USER_ID" : "2"
                    },
                    {
                        "NO" : "2",
                        "USER_ID" : "1"
                    }
                ]
            }
        ];

    json.DATA = users;

    return json;
}

// file update
const fileWrite = function(data){
    fs.writeFileSync(fileName, data, fileExt);
}


const REVIEW_COUNT_PER_USER = 2;

const getReviewObj = function(user){
    const obj = {
        "USER" : user,
        "REVIEW_COUNT" : REVIEW_COUNT_PER_USER
    }

    return obj;
}

const getRandomInt = function(max = 10, min = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initReviewList = function(memberList){
    const reviewList = [];

    for(index in memberList){
        reviewList.push(getReviewObj(memberList[index].USER_ID));
    }

    return reviewList;
}

const removeExceptList = function(reviewList, memberList, index){
    const list = reviewList.splice(index, 1);
    const result = {
        "REVIEW_LIST" : list,
        "EXCEPT_LIST" : memberList[index]
    }
    return result;
}

const addExceptList = function(list, exept){
    
}

const init = function(){
    const memberList = getMemberList();

    let memberCount = memberList.length;
    let reviewList = initReviewList(memberList);
    const exReviewList = [];
    
    const dataList = [];
    
    for(index in memberList){
        const match_users = [];
        let reviewData = {
            "USER_ID" : memberList[index].USER_ID
        };
    
        let reviews = [];
        for(let i = 0 ; i < REVIEW_COUNT_PER_USER; i++){
            let data = {};
            data.NO = i+1;
            let random = getRandomInt(memberCount,1);
    
            reviewList[random - 1].REVIEW_COUNT -= 1;
            match_users.push(reviewList[random - 1]);
            
            data.USER_ID = reviewList[random - 1].USER;
        
            reviewList.splice(random - 1, 1);
            memberCount -= 1;
            reviews.push(data);
        }
    
        reviewData.REVIEWS = reviews;
        
        dataList.push(reviewData);
    
        for(index in match_users){
            memberCount += 1;
            if(match_users[index].REVIEW_COUNT == 0){
                match_users.splice(index,1);
                memberCount -= 1;
            }
        }
    
        reviewList.push.apply(reviewList, match_users);
    }
    
    for(i in dataList){
        console.log(dataList[i]);
    }
    
};

init();





