export function adaptiveWatchEarthLimit({insideCount=0,externalCount=0,target=20,preferredInside=5,externalSoftCap=12}={}){
  const inside=Math.max(0,Number(insideCount)||0),external=Math.max(0,Number(externalCount)||0);
  const ceiling=Math.max(0,Number(target)||0),total=inside+external;
  if(!ceiling||!total)return 0;
  if(inside<preferredInside)return Math.min(ceiling,total,inside+Math.min(external,externalSoftCap));
  return Math.min(ceiling,total);
}
