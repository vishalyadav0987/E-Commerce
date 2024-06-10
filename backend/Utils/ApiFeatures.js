class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;  // &keyword=mobiles  "queryStr" = ["mobiles"]
        this.queryStr = queryStr;
    }
    search() { // only name search
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i" // this condition resolve the isues of case sensetive
                },
            } : {}; // agar query hogi toh 1st codn if not query return whole product jabi khali {} hai
        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }
}

module.exports = ApiFeatures;