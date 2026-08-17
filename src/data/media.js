const u = (id, width = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`

// Temporary editorial photography. Replace each path with /mirissa-assets/... when real imagery is supplied.
export const media = {
  hero: u('photo-1544551763-77ef2d0cfc6c', 2200),
  whale: u('photo-1568430462989-44163eb1752f'),
  whaleSnorkel: u('photo-1530053969600-caed2596d242'),
  diving: u('photo-1544550285-f813152fb2fd'),
  turtle: u('photo-1507525428034-b723cf961d3e'),
  reef: u('photo-1583212292454-1fe6229603b7'),
  kayak: u('photo-1542259009477-d625272157b7'),
  sunsetKayak: u('photo-1500530855697-b586d89ba3ee'),
  surf: u('photo-1502680390469-be75c86b636f'),
  coastline: u('photo-1500534623283-312aade485b7'),
  boat: u('photo-1500375592092-40eb2168fd21'),
  crew1: u('photo-1500648767791-00dcc994a43e', 900),
  crew2: u('photo-1494790108377-be9c29b29330', 900),
  crew3: u('photo-1507003211169-0a1dd7228f2d', 900),
  crew4: u('photo-1534528741775-53994a69daeb', 900),
}
