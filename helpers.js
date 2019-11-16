module.exports = {
    buildDateTimeFromString: function (dateString) {
        var date = new Date(dateString);

        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} um ${(date.getHours() + "").length == 1 ? "0" + date.getHours() : date.getHours() + ""}:${(date.getMinutes() + "").length == 1 ? "0" + date.getMinutes() : date.getMinutes() + ""}`;
    }
}