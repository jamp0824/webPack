module.exports = function myloader(content) {
    console.log("myloader�� ������")
    return content.replace("console.log(", "alert(") // console.log( -> alert( �� ġȯ
}