class reduceDataManager{
    constructor(mapperResult){ // mapperResult = [(key,value),....]
        this.jobs = {};
        this.mapperResult = mapperResult;
    }

    group(){
        this.mapperResult.forEach(element => {
            const key = element[0];
            const val = element[1];
            if (key in this.jobs){
                this.jobs[key].push(val);
            }
            else{
                this.jobs[key] = [val];
            }

        });
    }
}

module.exports = reduceDataManager;