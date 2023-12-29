const statusTracker = require('./jobStatusTracker');


const vecMatData = require('./matVecData')

const mapper = (data) => {
    const vec = data.vec;
    const mat = data.mat;
    let result = [];
    mat.forEach((x) => {
        result.push([x[0], x[2]*vec[x[1]]][1])
    });
    return result 
};

const reducer =  (data) => {
    return [data[0], data[1].reduce((partialSum, a) => partialSum + a, 0)]
};

console.log(vecMatData)

const test = new statusTracker(mapper,reducer,vecMatData,0)
test.init();
console.log(mapper(test.takeMapperJob(0)))