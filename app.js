const jparser = require("./json-parser");

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

// 이전에 매칭이 되었는지 체크
const checkLastWeek = function(member){
    const data = getJsonParse("data.json");

    const lastWeek = data.length;
    const currentNo = data[lastWeek - 1].WEEK;

    if(currentNo == 1){
        // 1회차 일경우
    }else{
        // 1회차 이상일 경우
    }

    for(i in data){
        console.log(data[0].DATA[i]);
    }
}

// 개인이 커밋확인할 사람 매칭
const setCommitMember = function(list){
    
};

const init = function(){
    const members = getMemberList();

    for(index in members){
        console.log(members[index].USER_ID);
    }

    checkLastWeek();
};

init();


