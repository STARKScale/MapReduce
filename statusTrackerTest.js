const statusTracker = require('./jobStatusTracker');


const {testConfig, mapperResults} = require('./testConfig');


const mapper = (data) => {
    const vec = data.vec;
    const mat = data.mat;
    let result = [];
    mat.forEach((x) => {
        result.push([x[0], x[2] * vec[x[1]]][1])
    });
    return result 
};

const reducer =  (data) => {
    return [data[0], data[1].reduce((partialSum, a) => partialSum + a, 0)]
};



let test = new statusTracker(testConfig);
test.init();
console.log(test.takeMapperJob())
console.log(test.mapperQueue)
test.postMapperJob(mapperResults[0])
console.log(test.mapperQueue)
test.postMapperJob(mapperResults[1])
console.log(test.mapperQueue)
test.postMapperJob(mapperResults[2])
console.log(test.mapperQueue)
test.postMapperJob(mapperResults[3])
console.log(test.takeReducerJob())
