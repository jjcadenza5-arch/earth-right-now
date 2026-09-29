export async function loadParticipationPublicConfig({
  earthSignalsUrl="./data/earth-signal-deployment.json",
  submissionsUrl="./data/submission-transport.json",
  mediaUrl="./data/now-moment-media-deployment.json"
}={}){
  const [earthSignals,submissions,media]=await Promise.all([
    fetch(earthSignalsUrl,{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null),
    fetch(submissionsUrl,{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null),
    fetch(mediaUrl,{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null)
  ]);
  const earthSignalsActive=Boolean(
    earthSignals?.status==="DEPLOYED" &&
    earthSignals?.publicActivationAllowed===true &&
    /^https:\/\//.test(String(earthSignals?.endpointUrl||""))
  );
  const submissionsActive=Boolean(
    submissions?.enabled===true &&
    /^https:\/\//.test(String(submissions?.endpoint||""))
  );
  const mediaActive=Boolean(
    media?.status==="DEPLOYED" &&
    media?.publicActivationAllowed===true &&
    media?.videoEnabled===false &&
    /^https:\/\//.test(String(media?.endpointUrl||""))
  );
  return{
    earthSignals:{...(earthSignals||{}),publicActive:earthSignalsActive},
    submissions:{...(submissions||{}),publicActive:submissionsActive},
    nowMomentMedia:{...(media||{}),publicActive:mediaActive},
    anyPublicActive:earthSignalsActive||submissionsActive||mediaActive
  };
}
