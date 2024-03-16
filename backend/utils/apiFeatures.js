class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  // search product feature
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    console.log(keyword);
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.querystr };
    const removeItems = ["page", "keyword", "limit"];
    removeItems.forEach((item) => delete queryStrCopy[item]);

    //price filter
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    // this.query = this.query.find(queryStrCopy);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
