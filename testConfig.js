const vecMatData = {
    vec: [[0,1],[1,2],[2,3],[3,4]],

    mat:[   [0,0,1],[0,1,1],[0,2,1],[0,3,1],
            [1,0,1],[1,1,1],[1,2,1],[1,3,1],
            [2,0,1],[2,1,1],[2,2,1],[2,3,1],
            [3,0,1],[3,1,1],[3,2,1],[3,3,1],
        ]
}

const testConfig = {
    mapperCode: "hello",
    reducerCode: "hello",
    numWorker: 4,
    data: vecMatData,
    mode: 0
}

const mapperResults = [ {Id:0,result:[[1,2]]}, 
                        {Id:1,result:[[1,2]]},
                        {Id:2,result:[[2,2]]},
                        {Id:3,result:[[3,2]]}
                        ]

module.exports = {testConfig, mapperResults}