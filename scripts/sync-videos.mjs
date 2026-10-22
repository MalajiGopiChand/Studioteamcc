import { readdirSync, writeFileSync } from 'node:fs';
import { resolve, extname, basename } from 'node:path';
const ids=['DUa78s1jIjX','DJBYEYpPuSo','DFsqP-evqMD','DdoyFLSTjnr','DdW2kuCzXMG','DY4nA1EtYNS','DYKKFL9vFT6','DVSO3edkk0T','DUn8GiPE1nJ'];
const files=readdirSync(resolve('public/videos')).filter(name=>['.mp4','.webm','.m4v'].includes(extname(name).toLowerCase())).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
const sources={};
const remaining=[];
for(const name of files){const id=basename(name,extname(name));if(ids.includes(id))sources[id]=`/videos/${encodeURIComponent(name)}`;else remaining.push(name);}
for(const id of ids){if(!sources[id]&&remaining.length)sources[id]=`/videos/${encodeURIComponent(remaining.shift())}`;}
writeFileSync(resolve('src/data/local-films.json'),JSON.stringify(sources,null,2)+'\n');
console.log(`Configured ${Object.keys(sources).length} local films.`);
