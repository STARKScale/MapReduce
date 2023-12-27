class mapDataManager{
    constructor(data,mode,numWorker){
        this.data = data;
        this.mode = mode;
        this.jobs = {};
        this.numWorker = numWorker;
    }

    partition(){
        if (this.mode == 0){
            const spacing = this.data.mat.length/this.numWorker;
            for (let i = 0; i < this.numWorker; i++){
                this.jobs[i] = {
                    vec: this.data.vec,
                    mat: this.data.mat.slice(i*spacing,(i+1)*spacing),
                }
            }
        }
    }
}



module.exports = mapDataManager;