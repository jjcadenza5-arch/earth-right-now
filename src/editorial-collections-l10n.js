export const DISCOVERY_LOCALES=Object.freeze(["en","th","de","fr","ja","zh","es"]);

export const DISCOVERY_LOCALE_COPY=Object.freeze({
 en:{languageName:"English",discoverTitle:"Discover Earth Right Now",discoverDescription:"Browse truthful current Earth views by place type and mood.",discoverIntro:"Choose a type of place or mood, then move into current ERN destination pages. Collections are editorial discovery paths; they never change source truth or paid ranking.",share:"Share this collection",copied:"Copied",browsePlaces:"Browse all places →",current:"Current verified view available",scheduled:"Verified source, outside published live hours"},
 th:{languageName:"ไทย",discoverTitle:"สำรวจ Earth Right Now",discoverDescription:"สำรวจมุมมองโลกปัจจุบันที่ตรงตามความจริง แยกตามประเภทสถานที่และบรรยากาศ",discoverIntro:"เลือกประเภทสถานที่หรือบรรยากาศ แล้วไปยังหน้าจุดหมายที่ ERN ตรวจสอบความเป็นปัจจุบัน คอลเลกชันเป็นเพียงเส้นทางสำรวจและไม่เปลี่ยนความจริงของแหล่งข้อมูลหรืออันดับแบบจ่ายเงิน",share:"แชร์คอลเลกชันนี้",copied:"คัดลอกแล้ว",browsePlaces:"ดูสถานที่ทั้งหมด →",current:"มีมุมมองปัจจุบันที่ตรวจสอบแล้ว",scheduled:"แหล่งข้อมูลตรวจสอบแล้ว แต่อยู่นอกเวลาถ่ายทอดสดที่ประกาศ"},
 de:{languageName:"Deutsch",discoverTitle:"Earth Right Now entdecken",discoverDescription:"Verlässliche aktuelle Erdansichten nach Ortstyp und Stimmung entdecken.",discoverIntro:"Wähle einen Ortstyp oder eine Stimmung und öffne aktuelle ERN-Zielseiten. Sammlungen sind redaktionelle Entdeckungswege; sie verändern niemals Quellenwahrheit oder bezahltes Ranking.",share:"Diese Sammlung teilen",copied:"Kopiert",browsePlaces:"Alle Orte ansehen →",current:"Aktuell verifizierte Ansicht verfügbar",scheduled:"Verifizierte Quelle, außerhalb der veröffentlichten Live-Zeiten"},
 fr:{languageName:"Français",discoverTitle:"Découvrir Earth Right Now",discoverDescription:"Parcourez des vues actuelles et fiables de la Terre par type de lieu et ambiance.",discoverIntro:"Choisissez un type de lieu ou une ambiance, puis ouvrez les pages de destination ERN actuelles. Les collections sont des chemins éditoriaux et ne modifient jamais la vérité des sources ni le classement payant.",share:"Partager cette collection",copied:"Copié",browsePlaces:"Voir tous les lieux →",current:"Vue actuelle vérifiée disponible",scheduled:"Source vérifiée, hors des horaires de direct publiés"},
 ja:{languageName:"日本語",discoverTitle:"Earth Right Now を探索",discoverDescription:"場所の種類や雰囲気から、確認済みの現在の地球ビューを探せます。",discoverIntro:"場所の種類や雰囲気を選び、現在性が確認された ERN の目的地ページへ進みます。コレクションは編集上の探索経路であり、情報源の真実性や有料順位を変えることはありません。",share:"このコレクションを共有",copied:"コピーしました",browsePlaces:"すべての場所を見る →",current:"確認済みの現在ビューがあります",scheduled:"確認済み情報源・公開ライブ時間外"},
 zh:{languageName:"中文",discoverTitle:"探索 Earth Right Now",discoverDescription:"按地点类型和氛围浏览真实可靠的当前地球视图。",discoverIntro:"选择一种地点或氛围，然后进入 ERN 当前目的地页面。合集只是编辑式探索路径，绝不会改变来源真实性或付费排名。",share:"分享此合集",copied:"已复制",browsePlaces:"浏览全部地点 →",current:"有已验证的当前视图",scheduled:"来源已验证，但当前不在公布的直播时间内"},
 es:{languageName:"Español",discoverTitle:"Descubrir Earth Right Now",discoverDescription:"Explora vistas actuales y fiables de la Tierra por tipo de lugar y ambiente.",discoverIntro:"Elige un tipo de lugar o ambiente y entra en páginas de destino actuales de ERN. Las colecciones son rutas editoriales de descubrimiento; nunca cambian la verdad de la fuente ni el ranking de pago.",share:"Compartir esta colección",copied:"Copiado",browsePlaces:"Ver todos los lugares →",current:"Vista actual verificada disponible",scheduled:"Fuente verificada, fuera del horario de directo publicado"}
});

export const EDITORIAL_COLLECTION_LOCALES=Object.freeze({
 "lakes-waterfalls-fjords":{"en": {"title": "Lakes, Waterfalls & Fjords", "description": "Current lake, waterfall and fjord views. Check local access before going."}, "th": {"title": "ทะเลสาบ น้ำตก และฟยอร์ด", "description": "มุมมองปัจจุบันของทะเลสาบ น้ำตก และฟยอร์ด ตรวจสอบการเข้าถึงพื้นที่ก่อนเดินทาง"}, "de": {"title": "Seen, Wasserfälle & Fjorde", "description": "Aktuelle Ansichten von Seen, Wasserfällen und Fjorden. Zugang vor dem Besuch prüfen."}, "fr": {"title": "Lacs, cascades & fjords", "description": "Vues actuelles de lacs, cascades et fjords. Vérifiez les accès avant de partir."}, "ja": {"title": "湖・滝・フィヨルド", "description": "湖、滝、フィヨルドの現在の景色。訪問前に現地へのアクセスを確認しましょう。"}, "zh": {"title": "湖泊、瀑布与峡湾", "description": "湖泊、瀑布和峡湾的当前视图。出发前请确认当地通行情况。"}, "es": {"title": "Lagos, cascadas y fiordos", "description": "Vistas actuales de lagos, cascadas y fiordos. Comprueba el acceso antes de viajar."}},
 "beaches-water":{
  en:{title:"Beaches & Water",description:"Coasts, seas, harbours, islands and surf."},
  th:{title:"ชายหาดและสายน้ำ",description:"ชายฝั่ง ทะเล ท่าเรือ เกาะ และคลื่น"},
  de:{title:"Strände & Wasser",description:"Küsten, Meere, Häfen, Inseln und Brandung."},
  fr:{title:"Plages & eau",description:"Côtes, mers, ports, îles et vagues."},
  ja:{title:"ビーチと水辺",description:"海岸、海、港、島、波。"},
  zh:{title:"海滩与水域",description:"海岸、海洋、港口、岛屿与海浪。"},
  es:{title:"Playas y agua",description:"Costas, mares, puertos, islas y oleaje."}
 },
 "mountains-snow":{
  en:{title:"Mountains & Snow",description:"Alpine views, snow, ski areas and volcanoes."},
  th:{title:"ภูเขาและหิมะ",description:"วิวภูเขา หิมะ พื้นที่สกี และภูเขาไฟ"},
  de:{title:"Berge & Schnee",description:"Alpenblicke, Schnee, Skigebiete und Vulkane."},
  fr:{title:"Montagnes & neige",description:"Paysages alpins, neige, domaines skiables et volcans."},
  ja:{title:"山と雪",description:"山岳風景、雪、スキーエリア、火山。"},
  zh:{title:"山脉与雪景",description:"高山景色、雪地、滑雪区与火山。"},
  es:{title:"Montañas y nieve",description:"Vistas alpinas, nieve, zonas de esquí y volcanes."}
 },
 "cities-streets":{
  en:{title:"Cities & Streets",description:"Urban movement, streets, skylines and squares."},
  th:{title:"เมืองและถนน",description:"ความเคลื่อนไหวในเมือง ถนน เส้นขอบฟ้า และจัตุรัส"},
  de:{title:"Städte & Straßen",description:"Stadtleben, Straßen, Skylines und Plätze."},
  fr:{title:"Villes & rues",description:"Mouvement urbain, rues, horizons et places."},
  ja:{title:"都市とストリート",description:"都市の動き、通り、スカイライン、広場。"},
  zh:{title:"城市与街道",description:"城市流动、街道、天际线与广场。"},
  es:{title:"Ciudades y calles",description:"Movimiento urbano, calles, horizontes y plazas."}
 },
 "wildlife-nature":{
  en:{title:"Wildlife & Nature",description:"Animals, parks, forests and natural places."},
  th:{title:"สัตว์ป่าและธรรมชาติ",description:"สัตว์ สวน ป่า และพื้นที่ธรรมชาติ"},
  de:{title:"Tierwelt & Natur",description:"Tiere, Parks, Wälder und Naturräume."},
  fr:{title:"Faune & nature",description:"Animaux, parcs, forêts et espaces naturels."},
  ja:{title:"野生動物と自然",description:"動物、公園、森、自然の場所。"},
  zh:{title:"野生动物与自然",description:"动物、公园、森林与自然地点。"},
  es:{title:"Fauna y naturaleza",description:"Animales, parques, bosques y lugares naturales."}
 },
 "calm-scenic":{
  en:{title:"Calm & Scenic Earth",description:"Quiet, beautiful windows worth lingering with."},
  th:{title:"โลกที่สงบและงดงาม",description:"มุมมองเงียบสงบและสวยงามที่ชวนให้มองนานขึ้น"},
  de:{title:"Ruhige & schöne Erde",description:"Stille, schöne Fenster zum Verweilen."},
  fr:{title:"Terre calme & pittoresque",description:"Des fenêtres calmes et belles où s’attarder."},
  ja:{title:"静かで美しい地球",description:"ゆっくり眺めたくなる穏やかで美しい窓。"},
  zh:{title:"宁静与风景地球",description:"值得停留片刻的安静、美丽窗口。"},
  es:{title:"Tierra tranquila y escénica",description:"Ventanas serenas y hermosas para mirar un poco más."}
 },
 "volcanoes-earth-science":{
  en:{title:"Volcanoes & Earth Science",description:"Volcanoes, craters, geothermal places and Earth-science monitoring."},
  th:{title:"ภูเขาไฟและวิทยาศาสตร์โลก",description:"ภูเขาไฟ ปล่องภูเขาไฟ พื้นที่ความร้อนใต้พิภพ และการติดตามทางวิทยาศาสตร์โลก"},
  de:{title:"Vulkane & Geowissenschaften",description:"Vulkane, Krater, Geothermalgebiete und geowissenschaftliche Beobachtung."},
  fr:{title:"Volcans & sciences de la Terre",description:"Volcans, cratères, sites géothermiques et suivi scientifique de la Terre."},
  ja:{title:"火山と地球科学",description:"火山、火口、地熱地帯、地球科学の観測。"},
  zh:{title:"火山与地球科学",description:"火山、火山口、地热区域与地球科学监测。"},
  es:{title:"Volcanes y ciencias de la Tierra",description:"Volcanes, cráteres, zonas geotérmicas y observación científica de la Tierra."}
 },
 "thailand-live-now":{
  en:{title:"Thailand Live & Current Views",description:"Current and schedule-verified ERN views across Thailand."},
  th:{title:"มุมมองสดและปัจจุบันในประเทศไทย",description:"มุมมอง ERN ที่เป็นปัจจุบันและตรวจสอบแล้วทั่วประเทศไทย"},
  de:{title:"Thailand live & aktuell",description:"Aktuelle und verifizierte ERN-Ansichten aus Thailand."},
  fr:{title:"Thaïlande en direct & maintenant",description:"Vues ERN actuelles et vérifiées en Thaïlande."},
  ja:{title:"タイのライブ・現在映像",description:"タイ各地の確認済み現在映像を ERN で探索。"},
  zh:{title:"泰国实时与当前视图",description:"浏览泰国各地经 ERN 验证的当前视图。"},
  es:{title:"Tailandia en directo y ahora",description:"Vistas ERN actuales y verificadas en Tailandia."}
 },
 "tokyo-islands-live":{
  en:{title:"Tokyo Islands Live",description:"Official live harbor windows across the Izu and Ogasawara islands."},
  th:{title:"หมู่เกาะโตเกียวแบบสด",description:"ชมภาพท่าเรือสดอย่างเป็นทางการจากหมู่เกาะอิซุและโอกาซาวาระ"},
  de:{title:"Tokios Inseln live",description:"Offizielle Live-Hafenansichten von den Izu- und Ogasawara-Inseln."},
  fr:{title:"Îles de Tokyo en direct",description:"Vues officielles en direct des ports des îles Izu et Ogasawara."},
  ja:{title:"東京の島々ライブ",description:"伊豆諸島・小笠原諸島の公式港湾ライブ映像。"},
  zh:{title:"东京群岛直播",description:"来自伊豆群岛与小笠原群岛的官方港口直播视图。"},
  es:{title:"Islas de Tokio en directo",description:"Vistas oficiales en directo de puertos en las islas Izu y Ogasawara."}
 },
 "parks-protected-places":{
  en:{title:"Parks & Protected Places",description:"National parks, scenic areas, geoparks, reserves and protected landscapes."},
  th:{title:"อุทยานและพื้นที่คุ้มครอง",description:"อุทยานแห่งชาติ เขตทัศนียภาพ อุทยานธรณี เขตสงวน และภูมิประเทศที่ได้รับการคุ้มครอง"},
  de:{title:"Parks & Schutzgebiete",description:"Nationalparks, Landschaftsgebiete, Geoparks, Reservate und geschützte Landschaften."},
  fr:{title:"Parcs & espaces protégés",description:"Parcs nationaux, sites paysagers, géoparcs, réserves et paysages protégés."},
  ja:{title:"公園と保護地域",description:"国立公園、景勝地、ジオパーク、保護区、保護された景観。"},
  zh:{title:"公园与保护地",description:"国家公园、风景区、地质公园、保护区与受保护景观。"},
  es:{title:"Parques y espacios protegidos",description:"Parques nacionales, áreas escénicas, geoparques, reservas y paisajes protegidos."}
 }
});

export function discoveryLocale(locale="en"){
 const key=DISCOVERY_LOCALES.includes(String(locale))?String(locale):"en";
 return DISCOVERY_LOCALE_COPY[key];
}
export function localizedCollection(id,locale="en"){
 const key=DISCOVERY_LOCALES.includes(String(locale))?String(locale):"en";
 const row=EDITORIAL_COLLECTION_LOCALES[String(id)]||null;
 return row?.[key]||row?.en||null;
}
export const LOCALIZED_DISCOVERY_SAFETY=Object.freeze({
 changesSourceTruth:false,
 changesCollectionMembership:false,
 automaticTranslationAllowed:false,
 paidRankingAllowed:false,
 requiresAnalytics:false
});
