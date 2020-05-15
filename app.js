const jparser = require("./json-parser");
const moment  = require("moment");
const fs = require("fs");

const fileName = "data.json";
const fileExt = "utf8";

// 프로젝트 순환주기 1번에 4주씩
const PERIOD = 4;

// 멤버 리스트를 가져온다.
const getMemberList = function(){
    const members = getJsonParse("members.json");

    return members;
};

const getLastDataList = function(){
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
    const datas = getLastDataList();

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

const setMatchData = function(){
    const matchDataList = getMatchDataList();

    const match_data_array = [];

    let week = 0;
    let no = 0;
    
    // 정해진 주기 보다 크면
    if(getCurrentWeek() > PERIOD){
        week = "1";
        no = String(getCurrentNo());
    }else{
        no = String(getLastNo());
        week = String(getCurrentWeek());
    }
    
    const matchData = {
        NO : no,
        WEEK : week,
        DATE : getToday(),
        DATA : matchDataList
    };
    
    match_data_array.push(matchData);
    match_data_array.push(matchData);

    const lastData = getLastDataList();
    lastData.push(matchData);

    return lastData;
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


let LAST_DATA = [];
const getLastData = function(){
    if(LAST_DATA.length == 0){
        LAST_DATA = getLastDataList();
    }

    const length = LAST_DATA.length;
    const currentLen = length - 1;
    const lastDate = LAST_DATA[currentLen].DATE;

    const lastData = {
        currentLen : currentLen,
        week : LAST_DATA[currentLen].WEEK,
        no : LAST_DATA[currentLen].NO,
        date : LAST_DATA[currentLen].DATE,
        checkDate : addDate(7, lastDate),
        today : getToday(),
    }

    return lastData;
}

const getLastWeek = function(){
    const lastData = getLastData();
    return Number(lastData.week);
}

const getCurrentWeek = function(){
    return getLastWeek() + 1;
}

const getLastNo = function(){
    const lastData = getLastData();
    return Number(lastData.no);        
}

const getCurrentNo = function(){
    return getLastNo() + 1;
}

// 오늘이 마지막 데이터의 날짜보다 7일이상 지났는지 체크
const checkMatchDate = function(){

    const lastData = getLastData();

    const result = lastData.checkDate <= lastData.today;

    return result;
}

const getMatchDataList = function(){
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
            data.NO = String(i+1);
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

    return dataList;
}

const init = function(){

    if(checkMatchDate()){
        console.log("기록 해야 됨");
    }else{
        console.log("기록 안해도 됨");
        return;
    }

    const matchData = setMatchData();
    fileWrite(JSON.stringify(matchData));
};

init();



