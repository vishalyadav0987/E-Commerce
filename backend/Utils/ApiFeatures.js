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

    filter() {
        // const queryCopy = this.queryStr;  
        // this is not take because if change in queryCopy strin git also effect in queryStr variable 
        const queryCopy = { ...this.queryStr }; // it is object


        // Removing some field for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter for price and rating


        console.log(queryCopy);


        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        console.log(queryStr);

        return this;
        
    }
}

module.exports = ApiFeatures;