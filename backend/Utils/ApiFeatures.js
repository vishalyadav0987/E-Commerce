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

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)||1;

        const skip = resultPerPage * (currentPage - 1);
        // it means [5 * (1 - 1)] it means 0 items skip karne hai it [page == 1]
        // it means [5 * (2 - 1)] it means 10 items skip karne hai it [page == 2]
        // it means [5 * (3 - 1)] it means 10 items skip karne hai it [page == 3]
        // it means [5 * (4 - 1)] it means 10 items skip karne hai it [page == 4]

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;