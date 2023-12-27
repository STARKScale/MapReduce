const mapDataManager = require('./mapDataManager');
const reduceDataManager = require('./reduceDataManager');


class statusTracker{
    constructor(mapperCode,reducerCode,data,mode,numWorker=4){
        this.mapperCode = mapperCode;
        this.reducerCode = reducerCode;
        this.mapperResult = [];
        this.reducerResult = [];
        this.mapDataManager = new mapDataManager(data,mode,numWorker);
        this.reduceDataManager = null;
    }

    init() {
        this.mapDataManager.partition();
    }
    
    takeMapperJob(Id){
        return this.mapDataManager.jobs[Id];
    }

    takeReducerJob(Id){
        if (this.reduceDataManager == null){
            throw new Error("Mapper Jobs not Finished")
        }
        return [Id,this.reduceDataManager.jobs[Id]];
    }

    postMapperJob(result){ //proof to be added 
        this.mapperResult.push(result);
        if (this.mapperResult.length == this.mapDataManager.numWorker){
            const result = [];

            this.mapperResult.forEach((x) => {
                x.forEach( (y) => result.push(y))
            });

            this.reduceDataManager = new reduceDataManager(result);
            this.reduceDataManager.group();
        }
    }

    postReducerJob(result){ //proof to be added
        if (this.reduceDataManager == null){
            throw new Error("Mapper Jobs not Finished")
        }
        this.reducerResult.push(result)
    }

    aggregate(){
        console.log(this.reducerResult);
    }

}

module.exports = statusTracker;