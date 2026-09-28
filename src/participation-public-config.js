export async function loadParticipationPublicConfig({
  earthSignalsUrl="./data/earth-signal-deployment.json",
  submissionsUrl="./data/submission-transport.json"
}={}){
  const [earthSignals,submissions]=await Promise.all([
    fetch(earthSignalsUrl,{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null),
    fetch(submissionsUrl,{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null)
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
  return{
    earthSignals:{...(earthSignals||{}),publicActive:earthSignalsActive},
    submissions:{...(submissions||{}),publicActive:submissionsActive},
    anyPublicActive:earthSignalsActive||submissionsActive
  };
}
