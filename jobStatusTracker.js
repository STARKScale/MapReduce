const mapDataManager = require('./mapDataManager');
const reduceDataManager = require('./reduceDataManager');


class statusTracker{
    constructor(config){
        this.mapperCode = config.mapperCode;
        this.reducerCode = config.reducerCode;
        this.numWorker = config.numWorker;
        this.mapperResult = [];
        this.reducerResult = [];
        this.mapDataManager = new mapDataManager(config.data,config.mode,config.numWorker);
        this.reduceDataManager = null;
        this.mapperQueue = [];
        this.reducerQueue = []; //need smarter way to track job status.
    }

    init() {
        this.mapDataManager.partition();
        
        for (let i = 0; i < this.numWorker; i++){
            this.mapperQueue.push(i); // to be changed. 
        }
    }
    
    takeMapperJob(){
        //this is bad. but it works for now.
        const randomId = this.mapperQueue[Math.floor(Math.random() * this.mapperQueue.length)];
        return {Id:randomId, job:this.mapDataManager.jobs[randomId]};
    }

    takeReducerJob(){
        if (this.reduceDataManager == null){
            throw new Error("Mapper Jobs not Finished");
        }
        const randomId = this.reducerQueue[Math.floor(Math.random() * this.reducerQueue.length)];
        return {Id:randomId, job:this.reduceDataManager.jobs[randomId]};
    }

    postMapperJob(result){ //proof to be added 
        // format : {Id: int, result: [[key,val]...]}

        if (this.mapperQueue.indexOf(result.Id) === -1){
            return
        }
        this.mapperQueue.splice(this.mapperQueue.indexOf(result.Id),1);

        this.mapperResult.push(result.result);
        if (this.mapperResult.length == this.mapDataManager.numWorker){
            const res = [];
            this.mapperResult.forEach((x) => {
                x.forEach((y) => {
                    res.push(y);
                    if (this.reducerQueue.indexOf(y[0]) === -1) {
                        this.reducerQueue.push(y[0]);
                    }
                });
            });
            console.log(this.reducerQueue);
            this.reduceDataManager = new reduceDataManager(res);
            this.reduceDataManager.group();
        }
    }

    postReducerJob(result){ //proof to be added
        if (this.reduceDataManager == null){
            throw new Error("Mapper Jobs not Finished");
        }
        if (this.reducerQueue.indexOf(result.Id) === -1){
            return;
        }
        this.reducerQueue.splice(this.reducerQueue.indexOf(result.Id),1);

        this.reducerResult.push(result);
    }

    aggregate(){
        console.log(this.reducerResult);
    }

}

module.exports = statusTracker;