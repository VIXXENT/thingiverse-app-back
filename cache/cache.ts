import Cache from "node-cache"

const cache = new Cache();
cache.set("test1", "value assigned in the Cache declaration file", 0);
export default cache;