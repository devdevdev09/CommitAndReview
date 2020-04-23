const jparser = require("./json-parser");

// 멤버 리스트를 가져온다.
const getMemberList = function(){
    const members = getJsonParse("members.json");

    return members;
};

// json 파일 파싱
const getJsonParse = function(fileName){
    const data = jparser.getJsonData(fileName, "utf8");
    return data;
}

// 이전에 매칭이 되었는지 체크
const checkLastWeek = function(member){

}

// 개인이 커밋확인할 사람 매칭
const setCommitMember = function(list){
    
};

const init = function(){
    const members = getMemberList();

    for(index in members){
        console.log(members[index]);
    }
};

init();


