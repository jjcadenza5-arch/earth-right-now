export function releaseEvidencePlan(){
 return[
  {key:"browser",title:"Desktop browser",steps:["Open ERN in a current desktop browser.","Verify Home, Explore, My Earth, Moments and Living Atlas navigation.","Open and close the immersive viewer; verify Previous/Next and source links.","Confirm no unexpected horizontal page scrolling or trapped controls."],pass:"Core journeys work without broken layout, blocked controls or console-visible user failure."},
  {key:"mobile",title:"Mobile viewport/device",steps:["Open ERN on a phone or narrow mobile viewport.","Verify Hero actions remain reachable and Choose a Window browses horizontally.","Open a destination drawer and select more than one window.","Open/close viewer and verify controls remain reachable above the safe area."],pass:"Primary journeys remain usable without desktop-only assumptions."},
  {key:"providerPlayback",title:"Provider playback",steps:["Test every current inside-ERN provider family on the deployed origin.","Confirm the provider actually renders media, not merely an iframe load event.","Verify attribution is visible and external fallback/source link works.","Sample current external sources and confirm official-provider navigation."],pass:"Real media/provider behavior matches ERN labels and permissions."},
  {key:"accessibility",title:"Accessibility",steps:["Navigate primary surfaces and viewer using keyboard only.","Verify visible focus, sensible focus restoration and dialog focus containment.","Check form/input labels or accessible names and meaningful button names.","Check reduced-motion behavior and basic contrast/readability."],pass:"Primary journeys are operable and understandable without pointer-only interaction."},
  {key:"performance",title:"Performance",steps:["Load Home on a normal network with browser developer tools or equivalent measurement.","Verify ERN does not eagerly create multiple active media players.","Exercise Hero, Watch Earth, Atlas and viewer transitions while watching responsiveness.","Record the environment and any measured regressions in the evidence note."],pass:"The one-player architecture holds and interaction remains acceptably responsive."},
  {key:"rollback",title:"Rollback",steps:["Identify the exact candidate commit SHA before publication.","Confirm the previous known-good commit or deployment is identifiable.","Document the concrete rollback/redeploy procedure for the chosen host.","Verify the procedure can restore the prior build without changing source truth data accidentally."],pass:"A specific tested or operationally verified rollback path exists for this candidate."}
 ];
}
export function releaseEvidenceMarkdown({candidateCommit=""}={}){
 const candidate=String(candidateCommit||"").trim().toLowerCase();
 const valid=/^[0-9a-f]{40}$/.test(candidate);
 const candidateLine=valid?"**Candidate commit:** "+candidate:"**Candidate commit:** record the exact 40-character SHA before passing evidence";
 const command=valid?"npm run release:record -- <key> <pass|fail> "+candidate+" <evidence note>":"npm run release:record -- <key> <pass|fail> <40-char candidate commit> <evidence note>";
 const lines=["# ERN real-world release check","",candidateLine,"","> CI does not complete these checks. Record evidence only after the described real-world validation.","Record each result with: "+command,""];
 for(const x of releaseEvidencePlan()){
  lines.push("## "+x.title+" ("+x.key+")","",...x.steps.map(s=>"- [ ] "+s),"","**Pass condition:** "+x.pass,"","**Evidence note:**","","**Checked at:**","");
 }
 return lines.join("\n");
}
