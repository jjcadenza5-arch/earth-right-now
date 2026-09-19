import { myEarthHygiene } from "../src/my-earth-hygiene.js";
const x=myEarthHygiene({favoritePlaceIds:["a","gone","a"],favoriteWindowIds:["w","dead"],recentPlaceIds:["gone","a"],recentWindowIds:["dead","w"]},{validPlaceIds:["a"],validWindowIds:["w"]});
console.assert(x.data.favoritePlaceIds.join()==="a"&&x.data.favoriteWindowIds.join()==="w"&&x.data.recentPlaceIds.join()==="a"&&x.data.recentWindowIds.join()==="w");
console.assert(x.removed===4&&x.retired===3&&x.duplicates===1&&x.truncated===0);
const many=Array.from({length:55},(_,i)=>"p"+i),limited=myEarthHygiene({recentPlaceIds:many},{validPlaceIds:many,validWindowIds:[]});console.assert(limited.data.recentPlaceIds.length===50&&limited.truncated===5);
console.log("ERN My Earth hygiene smoke checks passed");
