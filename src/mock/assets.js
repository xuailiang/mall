const seed = (name, w = 800, h = 600) => `https://picsum.photos/seed/${name}/${w}/${h}`

export const imagePool = {
  bookshelf: seed('order1'),
  deskShelf: seed('order2'),
  strainer: seed('order3'),
  organizer: seed('order4'),
  lamp: seed('order5'),
  cleaning: seed('order6'),
  detail1: seed('detail1'),
  detail2: seed('detail2'),
  detail3: seed('detail3')
}
