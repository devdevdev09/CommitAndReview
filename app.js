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
    const datas = getJsonParse("data.json");

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

const init = function(){
    const members = getMemberList();

    // for(index in members){
    //     console.log(members[index].USER_ID);
    // }

    checkLastWeek();
};

init();

//멤버별 멤버 리스트 => 멤버배열


