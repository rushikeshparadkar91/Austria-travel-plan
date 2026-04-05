import { useState } from "react";

const DAYS = [
  {
    id: 1, label: "Day 1", title: "Fly SFO → Prague",
    sub: "Arrival day — settle in gently", country: "🇨🇿 Czech Republic",
    hotel: "NYX Hotel Prague", hotelNote: "4.5★ · Pánská 9, Praha 1 · 8 min walk to Old Town · 10 min walk to Praha hl.n. train station",
    accentColor: "#c0392b", bgLight: "#fdf2f2",
    events: [
      { time:"varies", icon:"✈️", type:"flight",   title:"Depart SFO — overnight flight to Prague (PRG)", dur:null,      transit:null, tip:"SFO→PRG typically routes via Frankfurt (LH) or London (BA). ~14–16h total. Book a direct connection with <4h layover. Bring toddler carrier, snacks, favourite tablet shows. Request a bassinet seat (row 1) at booking — free for infants, check with airline for toddler on own seat row assignment." },
      { time:"08:30", icon:"🛬", type:"flight",   title:"Land at Václav Havel Airport (PRG)",              dur:"60 min",   transit:null, tip:"Allow 60 min for EU Entry/Exit System (EES) biometric registration (new since Oct 2025 — fingerprints + photo at border), baggage, and clearing customs. Prague airport is small and efficient but the EES queue adds time on first Schengen entry." },
      { time:"09:30", icon:"🚌", type:"transit",  title:"Airport → Hotel (Praha 1)",                       dur:"45 min",   transit:"Bus 119 → Metro A to Muzeum (35 min, CZK 40/person) OR taxi/Bolt (~€18–22, 30 min, strongly recommended with toddler + luggage)", tip:"Bolt app works great in Prague. Set up before landing. With a toddler and luggage, the taxi is worth every crown on arrival day." },
      { time:"10:30", icon:"🏨", type:"hotel",    title:"Check in — NYX Hotel Prague",                     dur:"20 min",   transit:null, tip:"Request a family room or connecting room. Hotel is on Pánská street — quiet, central, walkable to everything. If room not ready, store luggage and head out." },
      { time:"11:00", icon:"☕", type:"food",     title:"Late breakfast / early lunch — Café Louvre",      dur:"60 min",   transit:"5 min walk from hotel · Národní 22", tip:"Prague's most beloved grand café, open since 1902. Enormous portions of eggs, pastries, svíčková (beef in cream sauce). Toddler-friendly and unhurried. This is your first real Czech meal — savour it." },
      { time:"12:10", icon:"🚶", type:"walk",     title:"Wenceslas Square stroll",                         dur:"40 min",   transit:"5 min walk from café", tip:"Prague's grand boulevard. Statue of St Wenceslas at the top, Art Nouveau buildings all around. Flat, stroller-perfect. Don't buy anything here — tourist prices. Just walk and absorb arrival day energy." },
      { time:"12:50", icon:"😴", type:"rest",     title:"Hotel — toddler nap (MANDATORY)",                 dur:"90 min",   transit:"10 min walk back to hotel", tip:"SFO→Prague is +9 hours. A toddler who skips the first-day nap will melt down at dinner and ruin Day 2. Non-negotiable. Parents nap too if possible." },
      { time:"14:20", icon:"🚶", type:"walk",     title:"Old Town Square — first look",                    dur:"50 min",   transit:"8 min walk from hotel", tip:"Just wander the square. The Tyn Church towers, the Baroque facades, the ambient noise of a medieval city coming alive — this is why you came. Don't rush. Let the toddler point at pigeons." },
      { time:"15:10", icon:"🕰️", type:"sight",   title:"Astronomical Clock (Orloj) — hourly show",        dur:"20 min",   transit:"On Old Town Square", tip:"The mechanical apostle parade happens on the hour. Position yourself directly in front by :50 to get a clear sightline. Toddlers love the moving figures. The show itself is 60 seconds. Skip the paid clock tower (€9) — views are better from Petřín tomorrow." },
      { time:"15:30", icon:"🧇", type:"food",     title:"Trdelník snack stop",                             dur:"15 min",   transit:"Any stall on Old Town Square", tip:"The spiral chimney cake — warm dough rolled in cinnamon sugar. Every toddler's dream snack. Don't bother with the Nutella-filled version. Plain with cinnamon is better." },
      { time:"15:50", icon:"🏘️", type:"sight",   title:"Josefov — Jewish Quarter walk",                   dur:"45 min",   transit:"5 min walk north of Old Town Square", tip:"Skip the paid synagogues today (better for Day 2). Just walk the beautiful Art Nouveau streets of Pařížská — Prague's most elegant boulevard. Window-shop, grab a gelato, admire the architecture." },
      { time:"16:40", icon:"😴", type:"rest",     title:"Rest at hotel before dinner",                     dur:"50 min",   transit:"10 min walk", tip:"Second wind rest before dinner. Toddler in quiet time, parents freshen up." },
      { time:"17:50", icon:"🚶", type:"transit",  title:"Walk to dinner restaurant",                       dur:"12 min",   transit:"Hotel → U Kroka (Vratislavova 12, Praha 2 — 12 min walk south)", tip:null },
      { time:"18:00", icon:"🍽️", type:"food",    title:"Dinner — U Kroka",                                dur:"90 min",   transit:null, tip:"4.7★ Czech classic, beloved by locals. Order: kulajda soup (cream + dill + egg — unique), beef goulash + bread dumplings, svíčková for the adults. Portions are enormous — share with toddler. Book ahead, fills up fast even mid-week." },
      { time:"19:30", icon:"🌙", type:"rest",     title:"Back to hotel — early night",                     dur:null,       transit:"12 min walk", tip:"Target 8PM toddler bedtime. Tomorrow starts at 8AM sharp and covers Prague Castle — the best site of the whole Prague leg." },
    ]
  },
  {
    id: 2, label: "Day 2", title: "Prague Castle + Malá Strana",
    sub: "The left bank — castles, gardens, views", country: "🇨🇿 Czech Republic",
    hotel: "NYX Hotel Prague", hotelNote: "4.5★ · Pánská 9, Praha 1",
    accentColor: "#c0392b", bgLight: "#fdf2f2",
    events: [
      { time:"07:45", icon:"☕", type:"food",     title:"Breakfast at hotel or nearby bakery",              dur:"30 min",   transit:null, tip:"Light breakfast — you'll eat a big lunch near the castle. Czech supermarkets (Albert, Billa) near hotel have excellent pastries for €0.50 each. Pick up toddler snacks for the morning." },
      { time:"08:15", icon:"🚇", type:"transit",  title:"Hotel → Prague Castle by tram",                   dur:"25 min",   transit:"Walk 8 min to Náměstí Republiky tram stop → Tram 17 north to Malostranské náměstí → 10 min uphill walk to castle gates. OR: Metro A to Malostranská + 15 min uphill walk.", tip:"The uphill walk to the castle is steep — 15 min but doable with a lightweight stroller. Carrier recommended for toddler on the steps inside the castle complex." },
      { time:"08:40", icon:"🏰", type:"sight",    title:"Prague Castle — Grounds + St Vitus Cathedral",    dur:"120 min",  transit:null, tip:"Largest castle complex in the world by area. BUY TICKET B (CZK 250/adult, toddler free) — includes St Vitus Cathedral, Old Royal Palace, and Golden Lane. Cathedral stained glass by Alfons Mucha is otherworldly. Arrive before 9AM to beat tour groups. Castle grounds (outer courtyards) are free and stunning. The view over Prague from the castle terrace is the best in the city." },
      { time:"10:40", icon:"🏘️", type:"sight",   title:"Golden Lane (Zlatá ulička)",                      dur:"30 min",   transit:"Inside castle complex — included in ticket", tip:"Tiny medieval street of colourful cottages built into the castle walls. Kafka lived at No. 22. Toddlers love the miniature scale of the houses. Very picturesque." },
      { time:"11:10", icon:"🚶", type:"walk",     title:"Castle → Malá Strana (downhill walk)",            dur:"20 min",   transit:"Nerudova Street — steep cobblestone descent, 15 min to Malostranské náměstí", tip:"Nerudova Street has the best souvenir shops in Prague (actually hand-crafted items, not mass produced). The descent gives spectacular views back up to the castle. Carrier for toddler recommended on the cobblestones." },
      { time:"11:30", icon:"🍽️", type:"food",    title:"Lunch — Restaurace U Mlynáře",                    dur:"75 min",   transit:"Nerudova 18 — right on the descent from castle", tip:"4.5★ · Cosy Czech tavern on the castle street. Beef goulash, roast duck, bread dumplings. Very affordable for the location. Staff speak excellent English. Toddler-friendly portions." },
      { time:"12:45", icon:"🌸", type:"sight",    title:"Wallenstein Garden (free baroque garden)",         dur:"45 min",   transit:"5 min walk from restaurant — Letenská 4", tip:"Hidden baroque garden behind a palace wall — free entry, toddler paradise. Peacocks roam freely (toddler will completely lose their mind). Ornamental pond, statues, flat gravel paths. Open 7AM–7PM in fall." },
      { time:"13:30", icon:"🌉", type:"sight",    title:"Charles Bridge",                                  dur:"40 min",   transit:"10 min walk east from Wallenstein Garden", tip:"Post-lunch timing means fewer crowds than morning. 30 baroque statues line both sides. Let the toddler count them. Views of Prague Castle behind you, Old Town ahead. Street musicians add to the atmosphere. Avoid the bridge 10AM–3PM in peak season — wall-to-wall tourists." },
      { time:"14:15", icon:"😴", type:"rest",     title:"Back to hotel — toddler nap",                     dur:"90 min",   transit:"20 min: tram 17 or 22 south from Malostranské náměstí back toward city centre", tip:"Essential mid-trip rest. Day 3 is a long transit day to Vienna." },
      { time:"15:50", icon:"🚡", type:"sight",    title:"Petřín Hill + Funicular",                         dur:"90 min",   transit:"20 min by Metro A to Malostranská then 10 min walk to funicular base. OR tram 9/12/20 to Újezd stop.", tip:"The funicular (CZK 40, same ticket as metro) saves the steep 300m climb. Petřín Tower at the top has 360° Prague panorama — better views than the Astronomical Clock tower for 1/3 the price. Toddlers love the funicular ride up and the park at the top has open grassy space to run." },
      { time:"17:20", icon:"🚡", type:"transit",  title:"Funicular back down",                             dur:"10 min",   transit:"Same funicular, runs until 11:30PM", tip:null },
      { time:"17:40", icon:"🚶", type:"walk",     title:"Evening stroll back through Malá Strana",         dur:"20 min",   transit:"Walking south along the river Vltava embankment", tip:"The late afternoon light on the river and castle is magical in fall. Take your time." },
      { time:"18:15", icon:"🍽️", type:"food",    title:"Dinner — Restaurace Mincovna",                    dur:"90 min",   transit:"20 min: tram to Old Town Square · Staroměstské náměstí 7", tip:"4.5★ Right on Old Town Square. Pork knuckle (koleno) + Czech dark beer. Book ahead — always full. Request an outdoor table facing the square if weather permits (heated in fall). The square at dusk with the Tyn Church lit up is one of Europe's great dinner settings." },
      { time:"20:00", icon:"🏨", type:"hotel",   title:"Evening walk home + pack for Vienna",              dur:"30 min",   transit:"8 min walk to hotel", tip:"Pack tonight — Vienna train departs 9AM tomorrow. Leave bags by the door." },
    ]
  },
  {
    id: 3, label: "Day 3", title: "Prague Morning + Train to Vienna",
    sub: "One last morning, then the Railjet south", country: "🇨🇿→🇦🇹",
    hotel: "Novotel Wien Hauptbahnhof", hotelNote: "4.5★ · Canettistraße 6, 1100 Wien · Attached directly to Wien Hauptbahnhof",
    accentColor: "#8e44ad", bgLight: "#f5f0fc",
    events: [
      { time:"07:30", icon:"☕", type:"food",     title:"Breakfast + check out",                           dur:"45 min",   transit:null, tip:"Quick hotel breakfast. Check out and leave bags at reception — you'll collect them en route to the station." },
      { time:"08:15", icon:"🚶", type:"walk",     title:"Final Old Town walk — Josefov + Pařížská",        dur:"45 min",   transit:"8 min walk from hotel", tip:"The Jewish Quarter at 8AM is almost empty. The Art Nouveau architecture of Pařížská Avenue is breathtaking in morning light. Pick up any last souvenirs — better prices than Old Town Square stalls." },
      { time:"09:00", icon:"🏨", type:"hotel",   title:"Collect bags from hotel",                         dur:"10 min",   transit:"8 min walk back to hotel", tip:null },
      { time:"09:15", icon:"🚇", type:"transit",  title:"Hotel → Praha hl.n. (main train station)",        dur:"15 min",   transit:"10 min walk east OR Metro C from Muzeum one stop to Hlavní nádraží", tip:"Praha hl.n. is a beautiful Art Nouveau building. Platforms are downstairs. Check the board for your Railjet platform — usually Track 1–4 for Vienna trains." },
      { time:"09:45", icon:"🚆", type:"transit",  title:"Board Railjet: Praha hl.n. → Wien Hbf",           dur:"4h",       transit:"ÖBB/CD Railjet — DIRECT, no changes. Book on obb.at. Departs ~9:45–10:00AM daily. Child ticket needed for toddler.", tip:"4-hour journey through Bohemian countryside → Moravia → Austrian vineyards. Dining car serves hot food. Family compartments available — book in advance. The toddler nap often happens naturally around hour 2. Bring entertainment for hours 3–4." },
      { time:"13:45", icon:"🏨", type:"hotel",   title:"Arrive Wien Hbf + check in",                      dur:"25 min",   transit:"Hotel is a 2-minute walk from the platform — cross the station concourse and exit left", tip:"Novotel Wien Hauptbahnhof. Family rooms have a pull-out sofa. The Hauptbahnhof has a huge shopping mall attached — pick up groceries/snacks for the room." },
      { time:"14:15", icon:"😴", type:"rest",     title:"Toddler nap at hotel",                            dur:"90 min",   transit:null, tip:"Long travel day. Non-negotiable rest. Parents recharge too." },
      { time:"15:50", icon:"🚇", type:"transit",  title:"Hotel → Belvedere Gardens",                       dur:"20 min",   transit:"U1 from Hauptbahnhof → Südtiroler Platz → tram D north to Schwarzenbergplatz (3 stops)", tip:null },
      { time:"16:10", icon:"🌸", type:"sight",    title:"Upper Belvedere Gardens (free)",                  dur:"60 min",   transit:null, tip:"Baroque formal gardens are free. Wide gravel paths, fountains, manicured hedges. Toddler can run freely. The Upper Belvedere palace facade makes a breathtaking backdrop. Fall light turns the gardens golden. Skip the museum interior (Klimt's Kiss) today — save time." },
      { time:"17:15", icon:"🚇", type:"transit",  title:"Belvedere → Naschmarkt",                          dur:"15 min",   transit:"Tram D south to Kettenbrückengasse", tip:null },
      { time:"17:30", icon:"🛒", type:"sight",    title:"Naschmarkt evening browse",                       dur:"45 min",   transit:null, tip:"Vienna's famous open market. Closes 6:30PM weekdays. Cheese, meats, pastries, hot snacks. Pick up provisions for the room or a light early dinner. Halloumi stands, Turkish pastries, Austrian Liptauer cheese." },
      { time:"18:30", icon:"🍽️", type:"food",    title:"Dinner — Bauernbräu",                             dur:"90 min",   transit:"15 min by U4 → U1 to Taubstummengasse area · Gumpendorfer Str 134", tip:"4.8★ Traditional Viennese brewery. Wild boar ragout, Wiener Schnitzel, house-brewed dark beer. Mozart chocolates gifted at the end of every meal. Warm, cosy, family-welcoming. Opens 5PM Mon–Thu, 4PM Fri–Sat, 12PM Sun." },
      { time:"20:15", icon:"🏨", type:"hotel",   title:"Return to hotel",                                  dur:null,       transit:"20 min by U1 back to Hauptbahnhof", tip:"Early night — Vienna Day 1 tomorrow is a full walking day." },
    ]
  },
  {
    id: 4, label: "Day 4", title: "Vienna — Palaces, Parks & Schnitzel",
    sub: "Imperial grandeur at toddler pace", country: "🇦🇹 Austria",
    hotel: "Novotel Wien Hauptbahnhof", hotelNote: "4.5★ · Attached to Wien Hauptbahnhof",
    accentColor: "#2980b9", bgLight: "#eef6fe",
    events: [
      { time:"08:00", icon:"☕", type:"food",     title:"Breakfast at hotel",                              dur:"45 min",   transit:null, tip:"Novotel buffet is solid. Load up — Schönbrunn requires 2+ hours of walking. Pack a water bottle and toddler snacks." },
      { time:"08:50", icon:"🚇", type:"transit",  title:"Hotel → Schönbrunn Palace",                       dur:"25 min",   transit:"U1 from Hauptbahnhof → Schwedenplatz → U4 (change) → Schönbrunn stop (7 stops total). Exit at palace gates.", tip:"The U4 Schönbrunn exit opens directly into the palace forecourt — no walking needed." },
      { time:"09:15", icon:"🏰", type:"sight",    title:"Schönbrunn Palace Gardens (FREE)",                dur:"150 min",  transit:null, tip:"Gardens are entirely free. Skip the palace interior tour with a toddler — 90 min with no prams allowed in some state rooms. Instead: walk up to the Gloriette hilltop (15 min climb, worth it — panoramic Vienna views), explore the Neptune Fountain, visit the free orangery promenade. Fall foliage turns the 1.2km garden axis golden. The palace maze (€5) is a toddler highlight." },
      { time:"11:45", icon:"☕", type:"food",     title:"Café at Schönbrunn or packed lunch in gardens",   dur:"35 min",   transit:"Café Residenz is inside the palace complex", tip:"The palace café is pricey but convenient. Alternative: grab pastries from the Hauptbahnhof bakeries before leaving and picnic in the gardens — a genuinely lovely experience in fall." },
      { time:"12:25", icon:"🚇", type:"transit",  title:"Schönbrunn → Prater",                             dur:"35 min",   transit:"U4 east → Landstraße → U3 east → U1 north to Praterstern (2 changes, ~35 min total). OR U4 → Schwedenplatz → U1 → Praterstern.", tip:null },
      { time:"13:00", icon:"🎡", type:"sight",    title:"Riesenrad Ferris Wheel",                          dur:"60 min",   transit:"5 min walk from Praterstern U-Bahn · €14.50/adult, free under 3", tip:"Vienna's 125-year-old giant Ferris wheel. Slow, gentle 30-min rotation — no fear factor for toddlers. Each gondola is an enclosed wooden cabin. Book online to skip the queue. Views of the Danube canal, the Prater forest, and central Vienna are spectacular." },
      { time:"14:05", icon:"🌳", type:"sight",    title:"Prater Free Playground",                          dur:"50 min",   transit:"Adjacent to Ferris Wheel — free", tip:"One of Vienna's largest playgrounds, right next to the Riesenrad. Climbing frames, swings, sandpit. Essential toddler energy release before the afternoon rest." },
      { time:"14:55", icon:"😴", type:"rest",     title:"Rest at hotel",                                   dur:"90 min",   transit:"U1 from Praterstern → Hauptbahnhof (direct, 5 stops, 12 min)", tip:"Mid-afternoon rest protects the evening. Toddler sleep = peaceful dinner." },
      { time:"16:30", icon:"🚇", type:"transit",  title:"Hotel → Stephansdom area",                        dur:"15 min",   transit:"U1 to Stephansplatz (3 stops)", tip:null },
      { time:"16:45", icon:"⛪", type:"sight",    title:"St. Stephen's Cathedral (Stephansdom)",            dur:"30 min",   transit:"Free entry to nave · Am Stephansplatz", tip:"Vienna's Gothic masterpiece. The mosaic tile roof visible from outside is extraordinary. Free entry to the main nave — walk the full length and look up at the vaulted ceiling. The South Tower climb (300 steps) is skip-worthy with a toddler. The catacombs tour (€7) is fascinating for adults but not with young children." },
      { time:"17:20", icon:"🚶", type:"walk",     title:"Graben pedestrian street + Kohlmarkt",            dur:"35 min",   transit:"2 min walk from cathedral", tip:"Vienna's most elegant pedestrian zone. Plague Column (Pestsäule) in the middle of Graben is a baroque masterpiece — toddlers will stare at the swirling figures. Window shopping on Kohlmarkt (Demel Konditorei for a legendary hot chocolate)." },
      { time:"18:00", icon:"🍽️", type:"food",    title:"Dinner — Figlmüller Bäckerstraße",                dur:"90 min",   transit:"5 min walk from Stephansdom · Bäckerstraße 6 · BOOK AHEAD", tip:"Vienna's most iconic schnitzel — plate-sized, impossibly crispy, hangs off the edges. Potato salad is mandatory. Opens 11:30AM, book the 6PM sitting online (fills within hours of opening). Share one schnitzel between two adults — genuinely enormous. The toddler will eat the potato salad and be delighted." },
      { time:"19:35", icon:"🚇", type:"transit",  title:"Return to hotel",                                 dur:"15 min",   transit:"U1 from Stephansplatz to Hauptbahnhof", tip:null },
    ]
  },
  {
    id: 5, label: "Day 5", title: "Vienna Old Town + Hofburg",
    sub: "Habsburg history through stroller-friendly streets", country: "🇦🇹 Austria",
    hotel: "Novotel Wien Hauptbahnhof", hotelNote: "4.5★ · Attached to Wien Hauptbahnhof",
    accentColor: "#2980b9", bgLight: "#eef6fe",
    events: [
      { time:"08:30", icon:"☕", type:"food",     title:"Breakfast at hotel",                              dur:"40 min",   transit:null, tip:"Slightly later start — today is walking-focused with no major transit. Pack the room tonight for Salzburg tomorrow." },
      { time:"09:15", icon:"🚇", type:"transit",  title:"Hotel → Karlsplatz",                              dur:"15 min",   transit:"U1 from Hauptbahnhof → Schwedenplatz → U4 to Karlsplatz (1 change)", tip:null },
      { time:"09:30", icon:"🏛️", type:"sight",    title:"Karlsplatz + Vienna Secession Building",          dur:"30 min",   transit:"Exterior viewing — free · Friedrichstraße 12", tip:"Otto Wagner's Jugendstil underground station pavilions at Karlsplatz are architectural gems. The Secession building nearby (the golden cabbage dome) is one of Vienna's most distinctive. Both are exterior only — save money and keep moving." },
      { time:"10:05", icon:"🚶", type:"walk",     title:"Ringstrasse walking tour",                        dur:"60 min",   transit:"Self-guided walk north from Karlsplatz", tip:"Vienna's 4km imperial boulevard. Walk past the State Opera, the Kunsthistorisches Museum (exterior), the Natural History Museum (exterior), the Parliament, City Hall, and the Burgtheater. The scale of 19th-century imperial ambition is staggering. All exterior — free. Stroller-perfect, flat wide pavements." },
      { time:"11:05", icon:"🏰", type:"sight",    title:"Hofburg Palace — Spanish Riding School exterior + Burggarten", dur:"60 min", transit:"On the Ringstrasse route", tip:"The Hofburg is the former imperial palace — a city within a city. Walk through the public courtyards for free (Michaelerplatz → In der Burg → Heldenplatz). The Spanish Riding School exterior and the equestrian statues are dramatic. Then cut through to the Burggarten — beautiful park with Mozart statue. Toddlers love the open lawn." },
      { time:"12:10", icon:"☕", type:"food",     title:"Coffee + Strudel — Café Central",                 dur:"50 min",   transit:"8 min walk from Burggarten · Herrengasse 14", tip:"Vienna's grandest historic café, open since 1876. Towering vaulted ceilings, marble tables, live piano. Melange coffee (half espresso, half steamed milk) + Apfelstrudel with vanilla sauce. Worth the slight premium. Toddlers charmed by the grandeur." },
      { time:"13:05", icon:"🚶", type:"walk",     title:"Am Hof Square + Freyung",                         dur:"40 min",   transit:"5 min walk from Café Central", tip:"Two beautiful baroque squares largely missed by tourists. Am Hof has a stunning Jesuit church facade. Freyung has an antiques/arts market on weekends. Peaceful, very little tourist pressure." },
      { time:"13:50", icon:"😴", type:"rest",     title:"Rest at hotel + pack for Salzburg",               dur:"100 min",  transit:"20 min by U3 → U1 back to Hauptbahnhof", tip:"PACK TONIGHT. Train to Salzburg departs at 9AM tomorrow. Layout tomorrow's clothes. This is your last Vienna evening so make the dinner count." },
      { time:"15:45", icon:"🚇", type:"transit",  title:"Hotel → Naschmarkt area for final evening",       dur:"15 min",   transit:"U4 from Kettenbrückengasse (2 stops from Karlsplatz)", tip:null },
      { time:"16:00", icon:"🛒", type:"sight",    title:"Naschmarkt final browse + picnic provisions",      dur:"60 min",   transit:"Closes 6:30PM weekdays · Free to browse", tip:"Pick up Austrian wine, cheese, paprika-spiced meats, and pastries. Great gifts to pack. Try the fresh-squeezed juice stands." },
      { time:"17:10", icon:"🍽️", type:"food",    title:"Dinner — Gasthaus Pöschl or Zum Wohl",            dur:"90 min",   transit:"15 min walk from Naschmarkt toward 1st district", tip:"For a final Vienna dinner, Gasthaus Pöschl (Weihburggasse 17) is a classic Viennese Beisl — Tafelspitz (boiled beef with horseradish), local wine, warm service. Unpretentious and excellent. Book ahead." },
      { time:"19:00", icon:"🏨", type:"hotel",   title:"Return to hotel — final Vienna night",             dur:null,       transit:"20 min by U1 or tram", tip:"Set alarm for 7:15AM. Train to Salzburg at 9AM. Bags by the door." },
    ]
  },
  {
    id: 6, label: "Day 6", title: "Train to Salzburg + Old Town",
    sub: "Mozart's city arrives by Railjet", country: "🇦🇹 Austria",
    hotel: "Wyndham Grand Salzburg", hotelNote: "4.3★ · Fanny-von-Lehnert-Str. 7, 5020 Salzburg · Directly opposite Salzburg Hauptbahnhof",
    accentColor: "#16a085", bgLight: "#e8f8f4",
    events: [
      { time:"07:15", icon:"☕", type:"food",     title:"Quick breakfast + check out",                     dur:"45 min",   transit:null, tip:"Hotel is attached to the station — zero transit time to platform. Check out, leave bags, eat, collect bags, walk to platform in under 10 min." },
      { time:"08:00", icon:"🚂", type:"transit",  title:"Walk to platform + board",                        dur:"45 min buffer", transit:"Wien Hbf is directly connected to hotel — platform in 2 minutes", tip:"Find your reserved seats, settle the toddler, locate the dining car." },
      { time:"09:00", icon:"🚆", type:"transit",  title:"Railjet: Wien Hbf → Salzburg Hbf",                dur:"2h 30min", transit:"Direct Railjet · ÖBB · Departs on the hour. Book on obb.at — reserve seats.", tip:"Stunning alpine foliage approaching Salzburg through the Salzkammergut valleys. Dining car available. Toddlers often nap in hour 2. Bring entertainment for the full journey." },
      { time:"11:30", icon:"🏨", type:"hotel",   title:"Arrive Salzburg Hbf + check in",                  dur:"20 min",   transit:"Wyndham Grand is directly opposite the station exit — 60-second walk", tip:"Buy the Salzburg Card at check-in: 48h card covers fortress funicular, Mirabell, public transit, and 30+ attractions. ~€35/adult, children under 6 FREE." },
      { time:"11:55", icon:"🍽️", type:"food",    title:"Lunch — Wirtshaus zum Zirkelwirt",                dur:"75 min",   transit:"15 min walk through Old Town from hotel · Pfeifergasse 14", tip:"4.5★ Old Town tavern. Kaiserschmarrn (torn pancake with sugar + raisins) — toddler absolutely obsessed. Pork schnitzel enormous. The goulash soup is legendary. Book for lunch — fills up." },
      { time:"13:15", icon:"🚶", type:"transit",  title:"Walk to Festungsbahn funicular base",             dur:"10 min walk", transit:"From Old Town restaurant, follow signs to Festungsgasse", tip:null },
      { time:"13:25", icon:"🚡", type:"sight",    title:"Festungsbahn Funicular up to Fortress",           dur:"3 min ride", transit:"Covered by Salzburg Card · Departs every 10 minutes", tip:"The funicular ride up the cliff face is a toddler set-piece moment — the Salzburg valley appears below as you ascend. Short and gentle." },
      { time:"13:30", icon:"🏰", type:"sight",    title:"Fortress Hohensalzburg",                          dur:"2h",       transit:"Covered by Salzburg Card", tip:"Europe's largest fully-preserved medieval castle. The battlements are toddler-safe (walled perimeter). 360° views: city rooftops, Alps, the Salzach river valley. Explore the Romanesque state rooms, the Rainer Museum, and the puppet museum. Open until 5PM in fall." },
      { time:"15:30", icon:"🚡", type:"transit",  title:"Funicular back down",                             dur:"10 min",   transit:"Included in Salzburg Card", tip:null },
      { time:"15:45", icon:"🚶", type:"sight",    title:"Getreidegasse — Old Town stroll",                 dur:"60 min",   transit:"5 min walk from funicular base", tip:"Salzburg's famous medieval high street. Mozart was born at No. 9 (Mozarts Geburtshaus — skip the queue, admire the exterior). The wrought-iron guild signs above each shop are extraordinary. Toddler can spot animals in the ironwork. Mozartplatz and Residenzplatz are just off the street." },
      { time:"17:00", icon:"😴", type:"rest",     title:"Hotel rest — toddler nap",                        dur:"90 min",   transit:"15 min walk back to hotel", tip:"Big day tomorrow (Hallstatt). Early rest is essential." },
      { time:"18:45", icon:"🍽️", type:"food",    title:"Dinner — Bärenwirt",                              dur:"90 min",   transit:"20 min walk from hotel toward Mülln district · Müllner Hauptstraße 8", tip:"4.5★ Salzburg's oldest tavern with bear decor — toddlers love spotting the carved bears in every corner. Goulash is the standout dish. Apple strudel for dessert. Reservations essential." },
      { time:"20:15", icon:"🏨", type:"hotel",   title:"Return to hotel — prep for Hallstatt",             dur:"20 min",   transit:"20 min walk or short taxi", tip:"Set alarm for 6:45AM. Hallstatt bus departs 8AM. Pack a day bag — camera, toddler carrier (essential for cobblestones), snacks, and waterproof layer." },
    ]
  },
  {
    id: 7, label: "Day 7", title: "Hallstatt Loop — Rental Car",
    sub: "Hallstatt → Gosau → Wolfgangsee → Salzburg", country: "🇦🇹 Austria · 🚗 Driving Day",
    hotel: "Wyndham Grand Salzburg", hotelNote: "4.3★ · Back to Salzburg by 5PM",
    accentColor: "#16a085", bgLight: "#e8f8f4",
    events: [
      { time:"06:30", icon:"☕", type:"food",     title:"Early breakfast + pack day bag",                  dur:"45 min",   transit:null, tip:"Full hotel breakfast — eat well before you go. Hallstatt village has limited budget dining. Pack toddler snacks, a carrier (essential for cobblestones), water, and a windproof layer. The lake basin can be cooler than Salzburg in fall." },
      { time:"07:15", icon:"🚶", type:"transit",  title:"Walk to Hertz Salzburg",                          dur:"8 min walk", transit:"Ferdinand-Porsche-Str. 7 — 8 min walk from Wyndham Grand · Opens 8AM (Tue–Sat)", tip:"Book the car in advance on hertz.at. Request an automatic (not manual — alpine roads with a toddler in back deserve every convenience). A compact SUV or estate wagon is ideal — good visibility on narrow mountain roads and space for the pram." },
      { time:"07:20", icon:"🚗", type:"transit",  title:"Pick up rental car",                              dur:"20 min",   transit:"Hertz Salzburg · Ferdinand-Porsche-Str. 7 · +43 662 876674", tip:"Inspect the car carefully before leaving — photograph any existing marks. Take the full insurance (CDW + theft). Input 'Hallstatt Parking P1' into Google Maps before leaving the lot. The route is: Salzburg → B158 Salzkammergut road → Ischgl → Bad Ischl → B166 into Hallstatt valley." },
      { time:"07:40", icon:"🚗", type:"transit",  title:"Drive: Salzburg → Hallstatt",                     dur:"75 min",   transit:"~75 km via B158 → B145 → B166. Use Google Maps — do not use shortcuts through Gosau Pass before visiting Hallstatt first.", tip:"Beautiful alpine valley drive. The road narrows significantly on the final 5km into Hallstatt — single lane tunnels cut through the cliff. Drive slowly and use passing bays when oncoming traffic appears. The first glimpse of the lake from the road is jaw-dropping." },
      { time:"09:00", icon:"🅿️", type:"transit",  title:"Park at Hallstatt P1 Underground Garage",         dur:"10 min",   transit:"P1 Salinenplatz — underground garage · €20/day · Cash preferred · Opens 9AM · Non-residents CANNOT drive into the village", tip:"P1 is your best bet — underground, secure, closest to the market square (5 min walk). In fall it still fills by 10:30AM — arriving at 9AM is perfect timing. Have €20 cash ready. The above-ground section fills first; go straight to the underground level if you arrive early." },
      { time:"09:15", icon:"🚡", type:"sight",    title:"Hallstatt Skywalk Funicular",                     dur:"15 min incl. ride", transit:"5 min walk from P1 · €10 return/adult · Toddler free · Open 9AM–6PM", tip:"With a car you have the luxury of arriving right at 9AM when the funicular opens and before the first tour buses arrive. The upward ride opens up the full lake panorama in under 3 minutes — toddlers are completely transfixed by the ascent." },
      { time:"09:30", icon:"📸", type:"sight",    title:"Hallstatt Skywalk Viewpoint",                     dur:"45 min",   transit:null, tip:"THE defining image of the trip. Turquoise lake, wooden village houses clinging to the cliff, Dachstein glacier in the background, amber fall foliage all around. At 9:30AM you'll have the platform nearly to yourselves. Walk the short loop trail around the viewpoint. Bring a windproof layer — it's cooler up here. Walk back down the forest trail (20 min) or funicular back." },
      { time:"10:20", icon:"🚶", type:"sight",    title:"Hallstatt Village Walk",                          dur:"75 min",   transit:"Forest trail down (20 min) or funicular back to village (5 min)", tip:"Put toddler in the carrier — the cobblestone lanes are beautiful but stroller-hostile. The market square, the lakeside boat docks, the Gothic Pfarrkirche with its hillside bone house — every corner is a postcard. Let the toddler splash at the dock edge. The wooden boathouses reflected in the still water are iconic." },
      { time:"11:40", icon:"⛵", type:"sight",    title:"Lake Boat Hire",                                  dur:"25 min",   transit:"Dock on the main square waterfront · €15 for 30 min", tip:"Electric rowing boats. The village seen from the water — wooden houses on the cliff face, reflections in the lake — is even more beautiful than the viewpoint. Toddlers are captivated. Keep it to 25 min to stay on schedule for Gosau." },
      { time:"12:05", icon:"🅿️", type:"transit",  title:"Return to car at P1",                             dur:"10 min walk", transit:"5 min back to P1 garage from the market square", tip:null },
      { time:"12:15", icon:"🚗", type:"transit",  title:"Drive: Hallstatt → Vorderer Gosausee",            dur:"25 min",   transit:"~18 km via B166 west → Gosau village → follow signs to Gosausee. The final 3km is a narrow road up a gentle valley.", tip:"This short drive is one of Austria's most scenic — the B166 winds through the Dachstein massif with glacier views opening up as you enter the Gosau valley. Take it slowly and enjoy it." },
      { time:"12:40", icon:"🅿️", type:"transit",  title:"Park at Gosausee",                               dur:"5 min",    transit:"Gosausee car park · €6/day · Small and fills up — 9AM–11AM is the tricky window, but 12:30PM is usually fine in fall", tip:"Pay at the machine on arrival. The lake is a 5 min walk uphill from the car park on a well-maintained gravel path — stroller-manageable with effort, or use the carrier." },
      { time:"12:45", icon:"🏔️", type:"sight",    title:"Vorderer Gosausee (Gosau Lake)",                  dur:"70 min",   transit:null, tip:"4.9★ · One of Austria's most spectacular and least-crowded alpine lakes. The Dachstein glacier hangs directly above the water at the far end. The flat 2.5km circular trail around the lake takes ~50 min at toddler pace on a well-graded gravel path — stroller can manage. Fall colours reflect in the perfectly still water. This is the hidden gem of the whole trip — Hallstatt gets all the fame, Gosau gets the serenity." },
      { time:"14:05", icon:"🚗", type:"transit",  title:"Drive: Gosau → St. Wolfgang (Wolfgangsee)",       dur:"40 min",   transit:"~35 km via Gosau → B158 north → Strobl → B158 west into St. Wolfgang. Signposted throughout.", tip:"The B158 winds north through the Salzkammergut lake district. You'll pass the Mondsee and get glimpses of the Wolfgangsee before descending into St. Wolfgang. The alpine scenery is continuous — keep the windows cracked for the crisp air." },
      { time:"14:45", icon:"🍽️", type:"food",    title:"Lunch — PAUL der Wirt, St. Wolfgang",             dur:"75 min",   transit:"Markt 54, St. Wolfgang · Lakeside terrace · Park on the village main street (free short-stay)", tip:"4.4★ Lakeside Austrian restaurant right on the Wolfgangsee waterfront. Excellent veal schnitzel (Kalbsschnitzel), grilled fish from the lake, hearty goulash. The lakeside terrace has uninterrupted views across the Wolfgangsee. Book a terrace table online. CLOSED MONDAYS — check your day is Tue–Sun. Backup next door: Dorf-Alm zu St. Wolfgang (4.5★, same square)." },
      { time:"16:00", icon:"🌊", type:"sight",    title:"Wolfgangsee lakeside stroll",                     dur:"25 min",   transit:"Flat waterfront promenade from the restaurant", tip:"A short post-lunch walk along Austria's most classically beautiful lake. The Wolfgangsee is wider and calmer than Hallstatt — toddler can paddle at the gentle shingle shore. The famous Weisses Rössl (White Horse Inn) is on the waterfront if you want a final Kaffee und Kuchen before the drive back." },
      { time:"16:30", icon:"🚗", type:"transit",  title:"Drive: St. Wolfgang → Salzburg",                  dur:"50 min",   transit:"~50 km via B158 → Hof bei Salzburg → Salzburg ring road → city centre. Google Maps recommended for final approach.", tip:"A straightforward return drive. The B158 is well-signed back to Salzburg. Traffic can build on the ring road after 5PM — leave St. Wolfgang by 4:30PM to be comfortable. Hertz closes at 6PM (1PM Saturday)." },
      { time:"17:20", icon:"🚗", type:"transit",  title:"Return car to Hertz Salzburg",                    dur:"15 min",   transit:"Ferdinand-Porsche-Str. 7 · Return by 5:30PM to be safe · Hertz closes 6PM (1PM Sat)", tip:"Do a walk-around with the agent before handing back the keys. Keep your fuel receipt — top up at the Salzburg ring road petrol station (OMV or BP) before returning, not at the city centre prices." },
      { time:"17:40", icon:"🚶", type:"transit",  title:"Walk back to Wyndham Grand",                      dur:"8 min walk", transit:"Hotel is 8 min from Hertz on foot", tip:null },
      { time:"18:00", icon:"😴", type:"rest",     title:"Hotel rest — toddler unwinding time",             dur:"60 min",   transit:null, tip:"A full, beautiful driving day. The toddler will be tired but happy. Quick rest before the final Salzburg dinner." },
      { time:"19:15", icon:"🍽️", type:"food",    title:"Dinner — Zwettlers Wirtshaus",                    dur:"90 min",   transit:"15 min walk into Old Town · Kaigasse 3", tip:"4.5★ Traditional Salzburg pub. Kaiser Karl beer goulash is exceptional. Buzzing local atmosphere, shared tables, toddler-welcoming. Book ahead — always full in the evening. This is your last proper Austrian dinner." },
      { time:"20:50", icon:"🏨", type:"hotel",   title:"Return + pack everything for airport",             dur:"30 min",   transit:"15 min walk back to hotel", tip:"Final night. Lay out airport clothes. Book the taxi to SZG tonight through hotel reception — it's a 15-min ride, ~€20. Set alarm for 7AM." },
    ]
  },
  {
    id: 8, label: "Day 8", title: "Salzburg Morning + Fly Home",
    sub: "Final stroll, then SZG → SFO", country: "🇦🇹 → 🇺🇸",
    hotel: "Fly home from SZG", hotelNote: "Salzburg Airport · 10 min taxi from Wyndham Grand",
    accentColor: "#e67e22", bgLight: "#fdf5ec",
    events: [
      { time:"07:30", icon:"☕", type:"food",     title:"Breakfast + check out",                           dur:"45 min",   transit:null, tip:"Full hotel breakfast — airport food is limited and overpriced. Check out and leave bags with reception for collection later." },
      { time:"08:20", icon:"🌸", type:"sight",    title:"Mirabell Gardens morning walk",                   dur:"50 min",   transit:"20 min walk from hotel", tip:"The gardens at 8:30AM are almost empty. One last stroll through the baroque fountains and hedges. The castle hill across the river glows in the morning light. A peaceful end to the trip." },
      { time:"09:15", icon:"🚶", type:"sight",    title:"Salzach River Embankment stroll",                 dur:"30 min",   transit:"5 min walk south from Mirabell", tip:"Walk south along the river back toward Old Town. The reflection of the Fortress and the old city rooftops in the river is one of Salzburg's most beautiful sights." },
      { time:"09:50", icon:"🛍️", type:"sight",   title:"Final souvenir stop — Getreidegasse",             dur:"30 min",   transit:"10 min walk from river", tip:"Last chance for Mozart Kugeln (the original Fürst brand, not the mass-produced ones), Salzburg salt products, and Austrian honey. Fürst Konditorei on Brodgasse is the original Mozart truffle shop." },
      { time:"10:25", icon:"🏨", type:"hotel",   title:"Collect bags from hotel",                         dur:"10 min",   transit:"15 min walk back to Wyndham Grand", tip:null },
      { time:"10:45", icon:"🍽️", type:"food",    title:"Early lunch near station",                        dur:"40 min",   transit:"Restaurant or bakery adjacent to Hauptbahnhof", tip:"Don't leave hungry — SZG airport has one café and a small sandwich shop. Eat a real meal now." },
      { time:"11:30", icon:"🚕", type:"transit",  title:"Taxi: Hotel → Salzburg Airport (SZG)",            dur:"15 min",   transit:"Pre-book through hotel or use mytaxi app · ~€20", tip:"Salzburg Airport is genuinely tiny and stress-free — the easiest airport departure of the entire trip. Security takes under 10 minutes. Family lanes available." },
      { time:"11:45", icon:"✈️", type:"flight",   title:"SZG check-in + security",                         dur:"75 min",   transit:"Arrive 2 hours before departure", tip:"SZG is so small that 90 min is more than enough, but with a toddler, extra time = calm departure. Duty free is small but stocks good Austrian wine and chocolate." },
      { time:"13:15", icon:"✈️", type:"flight",   title:"Depart Salzburg (SZG) → connection → SFO",        dur:null,       transit:"SZG routes via Frankfurt (LH), Munich (LH/OS), or Vienna (OS) to SFO", tip:"Salzburg has limited direct connections — most route via Vienna (45 min) or Munich (45 min) for the transatlantic leg. Book as a single itinerary on ÖBB or Lufthansa to protect the connection. The toddler will sleep on the long haul." },
      { time:"🎉",   icon:"🏠", type:"rest",     title:"Arrive home — 8 incredible days done",            dur:null,       transit:null, tip:"Prague castles and medieval squares → Viennese imperial grandeur → Salzburg baroque and Alpine villages → the world's most beautiful lake village. The toddler will talk about the funiculars, the falconry at Hohenwerfen, and the Hallstatt boat ride for years. Safe travels." },
    ]
  }
];

const TYPE_STYLES = {
  flight:  { bg:"#eef6fe", border:"#b5d4f4", text:"#185fa5" },
  transit: { bg:"#f5f4f1", border:"#c8c5bb", text:"#5f5e5a" },
  hotel:   { bg:"#f2f0fe", border:"#c5c1f0", text:"#534ab7" },
  food:    { bg:"#fdf0eb", border:"#f5c4b3", text:"#993c1d" },
  sight:   { bg:"#e8f8f3", border:"#9fe1cb", text:"#0f6e56" },
  rest:    { bg:"#fdf6e8", border:"#f8d48a", text:"#854f0b" },
  walk:    { bg:"#f5f4f1", border:"#c8c5bb", text:"#5f5e5a" },
};

const LEGEND = [
  ["sight", "Sightseeing"],
  ["food", "Food & Drink"],
  ["transit", "Transport"],
  ["hotel", "Hotel"],
  ["flight", "Flight"],
  ["rest", "Rest / Hotel time"]
];

function ItineraryTimeline() {
  const [dayIdx, setDayIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);
  const day = DAYS[dayIdx];

  return (
    <div style={{ fontFamily: "'Georgia', Georgia, serif", color: "#2c2c2a", background: "transparent" }}>
      <div style={{ overflowX: "auto", display: "flex", gap: 6, paddingBottom: 10, marginBottom: 18, scrollbarWidth: "none" }}>
        {DAYS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => {
              setDayIdx(i);
              setOpenIdx(null);
            }}
            style={{
              flexShrink: 0,
              padding: "7px 13px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Georgia', Georgia, serif",
              fontSize: 12,
              background: dayIdx === i ? d.accentColor : "#f1efe8",
              color: dayIdx === i ? "#fff" : "#5f5e5a",
              fontWeight: dayIdx === i ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            Day {d.id}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${day.accentColor}22` }}>
        <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888780", marginBottom: 3 }}>{day.country}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 2px", color: day.accentColor, lineHeight: 1.2 }}>{day.title}</h2>
            <p style={{ fontSize: 12, color: "#888780", margin: 0, fontStyle: "italic" }}>{day.sub}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, maxWidth: 220 }}>
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>Sleeping at</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.4 }}>{day.hotelNote}</div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", paddingLeft: 64 }}>
        <div style={{ position: "absolute", left: 48, top: 8, bottom: 8, width: 2, background: `${day.accentColor}25` }} />

        {day.events.map((ev, i) => {
          const s = TYPE_STYLES[ev.type] || TYPE_STYLES.walk;
          const isOpen = openIdx === i;

          return (
            <div key={i} style={{ position: "relative", marginBottom: 6 }}>
              <div
                style={{
                  position: "absolute",
                  left: -64,
                  top: 14,
                  fontSize: 11,
                  color: "#888780",
                  fontFamily: "monospace",
                  width: 44,
                  textAlign: "right",
                  lineHeight: 1.2,
                }}
              >
                {ev.time}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: -18,
                  top: 16,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: day.accentColor,
                  border: "2px solid white",
                  zIndex: 1,
                  boxShadow: `0 0 0 2px ${day.accentColor}30`,
                }}
              />

              <div
                onClick={() => ev.tip && setOpenIdx(isOpen ? null : i)}
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  cursor: ev.tip ? "pointer" : "default",
                  transition: "box-shadow 0.15s",
                  boxShadow: isOpen ? `0 2px 12px ${day.accentColor}20` : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: ev.dur || ev.transit ? 4 : 0 }}>
                      <span style={{ fontSize: 15, flexShrink: 0 }}>{ev.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.text, lineHeight: 1.3 }}>{ev.title}</span>
                    </div>
                    {(ev.dur || ev.transit) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {ev.dur && <span style={{ fontSize: 11, color: s.text, opacity: 0.75 }}>⏱ {ev.dur}</span>}
                        {ev.transit && <span style={{ fontSize: 11, color: s.text, opacity: 0.75, flex: 1, minWidth: 0 }}>📍 {ev.transit}</span>}
                      </div>
                    )}
                  </div>
                  {ev.tip && (
                    <span style={{ fontSize: 12, color: s.text, opacity: 0.5, flexShrink: 0, marginTop: 2 }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>

                {isOpen && ev.tip && (
                  <div
                    style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: `1px solid ${s.border}`,
                      fontSize: 12,
                      color: "#3a3a38",
                      lineHeight: 1.75,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {ev.tip}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, padding: "10px 14px", background: "#f9f7f2", borderRadius: 10, border: "1px solid #e8e4dc" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          {LEGEND.map(([k, label]) => {
            const s = TYPE_STYLES[k];
            return (
              <span key={k} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: s.text }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.border, display: "inline-block" }} />
                {label}
              </span>
            );
          })}
          <span style={{ marginLeft: "auto", fontSize: 10, color: "#aaa", fontStyle: "italic" }}>Tap any card for insider tips</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 16px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "grid",
          gap: 24,
        }}
      >
        <section
          style={{
            background: "rgba(255, 252, 246, 0.92)",
            border: "1px solid rgba(126, 103, 71, 0.14)",
            borderRadius: 28,
            boxShadow: "0 24px 60px rgba(89, 62, 25, 0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "32px 24px 20px",
              background:
                "linear-gradient(135deg, rgba(138, 74, 56, 0.12), rgba(231, 181, 102, 0.08))",
              borderBottom: "1px solid rgba(126, 103, 71, 0.1)",
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8a6542", marginBottom: 10 }}>
              Family Europe Journey
            </div>
            <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.08, color: "#3b2d22" }}>
              Prague, Vienna, Salzburg
            </h1>
            <p style={{ margin: "12px 0 0", maxWidth: 720, fontSize: 15, lineHeight: 1.7, color: "#645548" }}>
              An interactive day-by-day itinerary in the same detailed style as your Claude version, with timing,
              transit, food stops, and expandable insider tips all in one place.
            </p>
          </div>

          <div style={{ padding: 24 }}>
            <ItineraryTimeline />
          </div>
        </section>
      </div>
    </main>
  );
}
