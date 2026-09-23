export function atlasCoordinateLabel(source={}){
 const basis=source.coordinateBasis;
 if(basis==="CAMERA_EXACT")return"Camera position";
 if(basis==="PLACE_REFERENCE")return"Place reference point";
 if(basis==="REGION_REFERENCE")return"Region reference point";
 return"Map position";
}
export function atlasCoordinateDisclosure(source={}){
 const label=atlasCoordinateLabel(source);
 return source.coordinateBasis?label+" · not necessarily the exact camera position":label;
}
