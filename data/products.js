const PRODUCTS = [
  {
    id: "prod-001",
    name: "Bump and Go Monkey Icecream Toy",
    description:
      "Looking for the perfect birthday gift for toddlers? This battery-operated Bump and Go Monkey Ice Cream Toy is an interactive musical toy featuring a cute cartoon animal driving an ice cream cart trolley. Equipped with smart omnidirectional steering, this electric toy car automatically changes direction upon hitting obstacles, keeping your baby engaged for hours. With vibrant flashing LED lights and catchy melodies, this durable plastic pretend play set stimulates sensory development, hand-eye coordination, and gross motor skills. Ideal baby toy for 1, 2, and 3-year-old boys and girls.",
    price: 1999,
    color: "Colorful",
    images: [
      "/data/img/bump-and-go-monkey-icecream-toy.jpeg",
      "/data/img/bump-and-go-monkey-icecream-toy-2.jpeg", // Placeholder secondary image
      "/data/img/bump-and-go-monkey-icecream-toy-3.jpeg", // Placeholder tertiary image
    ],
  },
  {
    id: "prod-002",
    name: "Intex Wetset Baby Pool (61cm x 22cm)",
    description:
      "Beat the heat with the Intex Wetset Baby Pool (61cm x 22cm), the ultimate 3-ring inflatable paddling pool and toddler swimming pool for your backyard. Made from durable PVC vinyl, this compact kiddie pool features a soft inflatable floor and cushioned bottom to ensure a safe, comfortable wading pool experience for your little one. This lightweight portable pool is quick to inflate, making it perfect for outdoor summer water play, a travel baby bathtub, or an indoor baby ball pit.",
    price: 2199,
    color: "Colorful",
    images: [
      "/data/img/intex-wetset-babypool.jpg",
      "/data/img/intex-wetset-babypool-2.jpg",
    ],
  },
  {
    id: "prod-003",
    name: "Intex Wetset Pool for Teens (2.03m x 1.52m x 48cm)",
    description:
      "Beat the heat with the Intex Wet Set Pool for Teens (2.03m x 1.52m x 48cm) from the Intex Swimming Pools Pakistan collection. This durable inflatable family pool doubles as a roomy rectangular paddling pool and portable above-ground swimming pool. Perfect as a summer outdoor toy or teen outdoor pool, its space-saving rectangular inflatable pool design fits easily as a patio and balcony pool.This deep blue rectangle pool offers premium backyard water play and functions as a relaxing sunbathing lounge pool. Setup is fast, and the handy drain plug makes this portable swimming pool incredibly easy to pack away after your inflatable water sport fun.",
    price: 7299,
    color: "Sky Blue",
    images: [
      "/data/img/intex-wetset-pool.jpg",
      "/data/img/intex-wetset-pool-2.jpg",
    ],
  },
  {
    id: "prod-004",
    name: "Bubble Water Gun",
    description:
      "A bright and cheerful water gun designed for summer play, easy grip, and splash-filled adventures with family and friends.",
    price: 1099,
    color: "Blue",
    images: ["/data/img/bubble-water-gun-toy.jpeg"],
  },
  {
    id: "prod-005",
    name: "Combat Aircraft Toy",
    description:
      "A finely detailed combat aircraft toy that sparks imaginative missions and offers exciting display appeal for young aviation fans.",
    price: 1899,
    color: "Camouflage",
    images: ["/data/img/combat-aircraft-toy.jpeg"],
  },
  {
    id: "prod-006",
    name: "Cow Piano Musical Toy",
    description:
      "This cheerful cow piano toy blends sound, movement, and color to create a delightful sensory play experience for toddlers.",
    price: 1999,
    color: "Multicolor",
    images: ["/data/img/cow-piano-toy.jpeg"],
  },
  {
    id: "prod-007",
    name: "Dancing Cactus Toy",
    description:
      "A quirky dancing cactus toy with lively motion and bright energy that makes playtime extra fun and memorable.",
    price: 1099,
    color: "Green",
    images: ["/data/img/dancing-cactus-toy.jpeg"],
  },
  {
    id: "prod-008",
    name: "Dancing Duck Toy",
    description:
      "A bouncy duck toy that sings, wiggles, and dances to keep little ones smiling with every interaction.",
    price: 1499,
    color: "Yellow",
    images: ["/data/img/dancing-duck-toy.jpeg"],
  },
  {
    id: "prod-009",
    name: "Defender Remote Control Car",
    description:
      "A sturdy remote-control car packed with smooth steering and bold styling for exciting races around the room or garden.",
    price: 3299,
    color: "Black",
    images: ["/data/img/defender-remote-control-car-toy.jpeg"],
  },
  {
    id: "prod-010",
    name: "Defender Toy Car",
    description:
      "A durable tiny car designed for energetic play and creative road adventures that encourage hand-eye coordination.",
    price: 1699,
    color: "Red",
    images: ["/data/img/defender-toy-car-toy.jpeg"],
  },
  {
    id: "prod-011",
    name: "Drift Racing Car Toy",
    description:
      "A sleek racing car toy with premium finish and dynamic design that gives aspiring racers a polished playtime experience.",
    price: 2499,
    color: "Silver",
    images: ["/data/img/drift-racing-car-toy.jpeg"],
  },
  {
    id: "prod-012",
    name: "Electric Princess Doll",
    description:
      "A beautifully styled princess doll with elegant details and a charming look that inspires imaginative role-play and storytelling.",
    price: 2999,
    color: "Pink",
    images: ["/data/img/electric-princess-doll.jpeg"],
  },
  {
    id: "prod-013",
    name: "Express Train Set",
    description:
      "A detailed train playset complete with rail pieces and vibrant characters for creative transportation adventures.",
    price: 1999,
    color: "Blue",
    images: ["/data/img/express-train-set-toy.jpeg"],
  },
  {
    id: "prod-014",
    name: "Express Train Toy",
    description:
      "A bright toy train that captures the excitement of travel and makes early pretend-play feel magical and interactive.",
    price: 1199,
    color: "Red",
    images: ["/data/img/express-train-toy.jpeg"],
  },
  {
    id: "prod-015",
    name: "Fighter Plane Toy",
    description:
      "A bold fighter plane with a polished look and durable build that brings high-flying action to everyday playtime.",
    price: 2999,
    color: "Grey",
    images: ["/data/img/fighter-plane-toy.jpeg"],
  },
  {
    id: "prod-016",
    name: "Five Toy Cars Set",
    description:
      "A complete set of five mini vehicles that helps kids build imaginative roads, races, and collections with easy storage.",
    price: 1499,
    color: "Multicolor",
    images: ["/data/img/five-toy-cars-set.jpeg"],
  },
  {
    id: "prod-017",
    name: "Flash Drum Musical Toy",
    description:
      "A vibrant drum toy that adds rhythm, movement, and sound to keep children engaged and entertained for hours.",
    price: 1499,
    color: "Colorful",
    images: ["/data/img/flash-drum-toy.jpeg"],
  },
  {
    id: "prod-018",
    name: "Fortuner Alloy Model Toy",
    description:
      "A premium alloy model toy that offers a realistic finish and collectible charm for young car enthusiasts.",
    price: 2799,
    color: "White",
    images: ["/data/img/fortuner-alloy-model-toy.jpeg"],
  },
  {
    id: "prod-019",
    name: "Harmonious Music Toy",
    description:
      "A delightful musical toy designed to introduce rhythm and melody through colorful lights and cheerful sound effects.",
    price: 1899,
    color: "Colorful",
    images: ["/data/img/harmonious-music-toy.jpeg"],
  },
  {
    id: "prod-020",
    name: "Heavy Truck Playset",
    description:
      "A rugged heavy truck playset with realistic details that invites hands-on construction play and imaginative hauling adventures.",
    price: 3699,
    color: "Yellow",
    images: ["/data/img/heavy-truck-playset.jpeg"],
  },
  {
    id: "prod-021",
    name: "Hello Kitty Piano Toy",
    description:
      "A sweet and stylish piano toy with playful sound effects that makes music time fun for little ones.",
    price: 1999,
    color: "Pink",
    images: ["/data/img/hello-kitty-piano-toy.jpeg"],
  },
  {
    id: "prod-022",
    name: "Kids ATM Toy",
    description:
      "A mini ATM playset that turns everyday pretend-play into a fun learning experience about money and shopping.",
    price: 2099,
    color: "White",
    images: ["/data/img/kids-atm-toy.jpeg"],
  },
  {
    id: "prod-023",
    name: "Kids Doll Toy",
    description:
      "A lovable doll designed for nurturing play, imaginative stories, and cozy pretend moments with friends and family.",
    price: 2399,
    color: "Pink",
    images: ["/data/img/kids-doll-toy.jpeg"],
  },
  {
    id: "prod-024",
    name: "Kids Urdu Story Book",
    description:
      "A colorful storybook for young readers that blends family values, fun stories, and early learning in Urdu.",
    price: 999,
    color: "Multicolor",
    images: ["/data/img/kids-urdu-story-book.jpeg"],
  },
  {
    id: "prod-025",
    name: "Magnetic Building Toys",
    description:
      "A creative magnetic toy set that lets children build shapes, vehicles, and imaginative designs with ease.",
    price: 2599,
    color: "Colorful",
    images: ["/data/img/magnetic-toys-set.jpeg"],
  },
  {
    id: "prod-026",
    name: "Makeup Toy Set",
    description:
      "A playful cosmetic toy set that inspires pretend salon and beauty role-play with safe, colorful accessories.",
    price: 1099,
    color: "Pink",
    images: ["/data/img/makeup-toy-set.jpeg"],
  },
  {
    id: "prod-027",
    name: "Mario Toy Car",
    description:
      "A fun and collectible toy car inspired by a favorite character, crafted for exciting mini-races and imaginative play.",
    price: 3499,
    color: "Red",
    images: ["/data/img/mario-toy-car-toy.jpeg"],
  },
  {
    id: "prod-028",
    name: "McQueen Racing Car Toy",
    description:
      "A dynamic racing car toy with vivid colors and a polished look that appeals to young speed lovers and collectors alike.",
    price: 2499,
    color: "Red",
    images: ["/data/img/mcqueen-racing-car-toy.jpeg"],
  },
  {
    id: "prod-029",
    name: "Mini Home Appliances Set",
    description:
      "A charming miniature playset that lets children pretend to run a home kitchen or living space with realistic accessories.",
    price: 2799,
    color: "White",
    images: ["/data/img/mini-home-appliances-set.jpeg"],
  },
  {
    id: "prod-030",
    name: "Mom and Kid Doll Set",
    description:
      "A sweet doll set that encourages nurturing play and warm storytelling scenes for little caregivers.",
    price: 1399,
    color: "Pink",
    images: ["/data/img/mom-kid-doll-set.jpeg"],
  },
  {
    id: "prod-031",
    name: "Money Box Toy",
    description:
      "A cute savings toy that teaches children the habit of saving while bringing cheerful color to playtime.",
    price: 1199,
    color: "Blue",
    images: ["/data/img/money-box-toy.jpeg"],
  },
  {
    id: "prod-032",
    name: "Piano Cow Toy",
    description:
      "A fun musical cow toy that gives little ones a playful introduction to rhythm and sound through gentle tunes.",
    price: 1799,
    color: "Cream",
    images: ["/data/img/piano-cow-toy.jpeg"],
  },
  {
    id: "prod-033",
    name: "Projection Painting Kit",
    description:
      "A creative art kit that transforms simple surfaces into colorful masterpieces with light-guided painting fun.",
    price: 1999,
    color: "Multicolor",
    images: ["/data/img/projection-painting-kit.jpeg"],
  },
  {
    id: "prod-034",
    name: "Racing Smoke Toy Car",
    description:
      "A fast-looking toy car with a bold finish and exciting visual effect that adds flair to every play session.",
    price: 2299,
    color: "Black",
    images: ["/data/img/racing-smoke-toy-car.jpeg"],
  },
  {
    id: "prod-035",
    name: "Red Fortuner Toy",
    description:
      "A premium red toy vehicle with a polished appearance that stands out as a collectible and a playtime favorite.",
    price: 2999,
    color: "Red",
    images: ["/data/img/red-fortuner-toy.jpeg"],
  },
  {
    id: "prod-036",
    name: "Remote Control Car",
    description:
      "A responsive remote-control car built for exciting movement, steering control, and endless play on smooth floors or outdoor surfaces.",
    price: 5499,
    color: "Blue",
    images: ["/data/img/remote-control-car-toy.jpeg"],
  },
  {
    id: "prod-037",
    name: "Remote Control Plane",
    description:
      "A lightweight remote-control plane designed for beginner-friendly flight fun and imaginative outdoor adventures.",
    price: 1599,
    color: "White",
    images: ["/data/img/remote-control-plane-toy.jpeg"],
  },
  {
    id: "prod-038",
    name: "Rock Crawler Toy",
    description:
      "A sturdy off-road toy with bold detailing and rugged style that encourages adventurous play and collecting.",
    price: 2899,
    color: "Green",
    images: ["/data/img/rock-crawler-toy.jpeg"],
  },
  {
    id: "prod-039",
    name: "Six Fighter Jets Set",
    description:
      "A thrilling set of six mini fighter jets that helps children create exciting air battles and display collections.",
    price: 999,
    color: "Blue",
    images: ["/data/img/six-fighter-jets-set.jpeg"],
  },
  {
    id: "prod-040",
    name: "Sport Girl Doll",
    description:
      "A sporty doll with upbeat styling and movement-friendly design that inspires active imagination and role-play.",
    price: 2299,
    color: "Purple",
    images: ["/data/img/sport-girl-doll-toy.jpeg"],
  },
  {
    id: "prod-041",
    name: "Twelve Toy Cars Set",
    description:
      "A generous set of twelve miniature cars perfect for building a vivid play scene, collection, or race day setup.",
    price: 1599,
    color: "Multicolor",
    images: ["/data/img/twelve-toy-cars-set.jpeg"],
  },
  {
    id: "prod-042",
    name: "Xylo Phone Toy",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 1599,
    color: "Rainbow",
    images: ["/data/img/xylo-phone-toy.jpeg"],
  },
  {
    id: "prod-043",
    name: "Airline Flash Electric 380 Toy",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 1699,
    color: "Rainbow",
    images: ["/data/img/airline-flash-electric-380.jpeg"],
  },
  {
    id: "prod-044",
    name: "Avengers Age of Altron Toy",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 1099,
    color: "Rainbow",
    images: ["/data/img/avengers-age-of-altron.jpeg"],
  },
  {
    id: "prod-045",
    name: "Avengers Toy Set",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 1399,
    color: "Rainbow",
    images: ["/data/img/avengers-toy-set.jpeg"],
  },
  {
    id: "prod-046",
    name: "Blow Gun Toy",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 1449,
    color: "Rainbow",
    images: ["/data/img/blow-gun-toy.jpeg"],
  },
  {
    id: "prod-047",
    name: "Children Paddle Piano Toy",
    description:
      "A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.",
    price: 2499,
    color: "Rainbow",
    images: ["/data/img/children-paddle-piano.jpeg"],
  },
  {
    id: "prod-048",
    name: "Small Duck Toy",
    description:
      "A cute and soft small duck toy that provides comfort and entertainment for young children.",
    price: 1249,
    color: "Yellow",
    images: ["/data/img/small-duck-toy.jpeg"],
  },
];
