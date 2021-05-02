function formatMessage(username , text , id){
    return{
        username,
        text,
        time:new Date().getHours() + " : " + new Date().getMinutes() + " : " + new Date().getSeconds(),
        id
    }
}

module.exports = formatMessage