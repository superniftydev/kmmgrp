const AnalysisWebWorker = require('yoastseo/build/index.js');


// import { AnalysisWebWorker } from "yoastseo";
const worker = new AnalysisWebWorker(self);
worker.register();
