export function shortcutHelp(){
 return[
  {keys:"/",label:"Focus Earth search"},
  {keys:"R",label:"Surprise me"},
  {keys:"← / →",label:"Previous / next window while viewer is open"},
  {keys:"Esc",label:"Close viewer or leave a text field"},
  {keys:"Tab",label:"Move through controls"}
 ];
}
export function shortcutHelpText(){return shortcutHelp().map(x=>x.keys+" — "+x.label).join("\n")}
