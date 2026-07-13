$ErrorActionPreference = 'Stop'
Set-Location 'c:\Users\Zeeshan Ahmad\Desktop\Codes\Office\Haider Express E-Commerce'

$imgDir = Join-Path (Get-Location) 'data/img'
$productsPath = Join-Path (Get-Location) 'data/products.js'

$renames = @{
  'bubble-water-gun.jpeg' = 'bubble-water-gun-toy.jpeg'
  'combat-aircraft.jpeg' = 'combat-aircraft-toy.jpeg'
  'cow-piano.jpeg' = 'cow-piano-toy.jpeg'
  'dancing-cactus.jpeg' = 'dancing-cactus-toy.jpeg'
  'dancing-duck.jpeg' = 'dancing-duck-toy.jpeg'
  'defender-remote-control-car.jpeg' = 'defender-remote-control-car-toy.jpeg'
  'defender-toy-car.jpeg' = 'defender-toy-car-toy.jpeg'
  'drift-racing-car.jpeg' = 'drift-racing-car-toy.jpeg'
  'electric-princess.jpeg' = 'electric-princess-doll.jpeg'
  'express-train-set.jpeg' = 'express-train-set-toy.jpeg'
  'express-train.jpeg' = 'express-train-toy.jpeg'
  'fighter-plane.jpeg' = 'fighter-plane-toy.jpeg'
  'five-toy-cars.jpeg' = 'five-toy-cars-set.jpeg'
  'flash-drum.jpeg' = 'flash-drum-toy.jpeg'
  'fortuner-alloy-model.jpeg' = 'fortuner-alloy-model-toy.jpeg'
  'heavy-truck.jpeg' = 'heavy-truck-playset.jpeg'
  'hello-kitty-piano.jpeg' = 'hello-kitty-piano-toy.jpeg'
  'kids-atm.jpeg' = 'kids-atm-toy.jpeg'
  'kids-doll.jpeg' = 'kids-doll-toy.jpeg'
  'kids-urdu-book.jpeg' = 'kids-urdu-story-book.jpeg'
  'magnetic-toys.jpeg' = 'magnetic-toys-set.jpeg'
  'makeup-toy.jpeg' = 'makeup-toy-set.jpeg'
  'mario-toy-car.jpeg' = 'mario-toy-car-toy.jpeg'
  'mcqueen-racing-car.jpeg' = 'mcqueen-racing-car-toy.jpeg'
  'mini-home-appliances.jpeg' = 'mini-home-appliances-set.jpeg'
  'mom-kid-doll.jpeg' = 'mom-kid-doll-set.jpeg'
  'money-box.jpeg' = 'money-box-toy.jpeg'
  'piano-cow.jpeg' = 'piano-cow-toy.jpeg'
  'projection-painting.jpeg' = 'projection-painting-kit.jpeg'
  'racing-smoke-toy-ccar.jpeg' = 'racing-smoke-toy-car.jpeg'
  'red-fortuner.jpeg' = 'red-fortuner-toy.jpeg'
  'remote-control-car.jpeg' = 'remote-control-car-toy.jpeg'
  'remote-control-plane.jpeg' = 'remote-control-plane-toy.jpeg'
  'six-fighter-jets.jpeg' = 'six-fighter-jets-set.jpeg'
  'sport-girl-doll.jpeg' = 'sport-girl-doll-toy.jpeg'
  'twelve-toy-cars.jpeg' = 'twelve-toy-cars-set.jpeg'
  'xylo-phone-toy.jpeg' = 'xylo-phone-toy.jpeg'
}

foreach ($oldName in $renames.Keys) {
  $oldPath = Join-Path $imgDir $oldName
  $newPath = Join-Path $imgDir $renames[$oldName]
  if (Test-Path $oldPath -PathType Leaf -ErrorAction SilentlyContinue) {
    if (-not (Test-Path $newPath -PathType Leaf -ErrorAction SilentlyContinue)) {
      Move-Item -Path $oldPath -Destination $newPath -Force
      Write-Host "Renamed $oldName -> $($renames[$oldName])"
    }
  }
}

$productsText = Get-Content $productsPath -Raw
if ($productsText -notmatch '\];\s*$') {
  throw 'Unexpected products.js structure'
}

$beforeClosing = $productsText.Substring(0, $productsText.Length - 2).TrimEnd()

function Get-Title([string]$name) {
  $normalized = $name -replace '\.(jpe?g|png|webp)$', ''
  $slug = $normalized -replace '-', ' '
  $slug = $slug -replace '\s+', ' '
  if ($slug -match 'water gun') { return 'Bubble Water Gun Toy' }
  if ($slug -match 'aircraft') { return 'Combat Aircraft Toy' }
  if ($slug -match 'piano') { return 'Piano Musical Toy' }
  if ($slug -match 'cactus') { return 'Dancing Cactus Toy' }
  if ($slug -match 'duck') { return 'Dancing Duck Toy' }
  if ($slug -match 'remote control car') { return 'Remote Control Defender Car' }
  if ($slug -match 'defender') { return 'Defender Toy Car' }
  if ($slug -match 'drift') { return 'Drift Racing Car Toy' }
  if ($slug -match 'princess') { return 'Electric Princess Doll' }
  if ($slug -match 'train') { return 'Express Train Set' }
  if ($slug -match 'fighter plane') { return 'Fighter Plane Toy' }
  if ($slug -match 'toy cars') { return 'Toy Cars Set' }
  if ($slug -match 'drum') { return 'Flash Drum Toy' }
  if ($slug -match 'fortuner') { return 'Fortuner Alloy Model Toy' }
  if ($slug -match 'music') { return 'Harmonious Music Toy' }
  if ($slug -match 'truck') { return 'Heavy Truck Playset' }
  if ($slug -match 'kitty') { return 'Hello Kitty Piano Toy' }
  if ($slug -match 'atm') { return 'Kids ATM Toy' }
  if ($slug -match 'doll') { return 'Kids Doll Toy' }
  if ($slug -match 'urdu') { return 'Kids Urdu Story Book' }
  if ($slug -match 'magnetic') { return 'Magnetic Building Toys' }
  if ($slug -match 'makeup') { return 'Makeup Toy Set' }
  if ($slug -match 'mario') { return 'Mario Toy Car' }
  if ($slug -match 'mcqueen') { return 'McQueen Racing Car Toy' }
  if ($slug -match 'appliances') { return 'Mini Home Appliances Set' }
  if ($slug -match 'mom kid') { return 'Mom and Kid Doll Set' }
  if ($slug -match 'money') { return 'Money Box Toy' }
  if ($slug -match 'cow') { return 'Piano Cow Toy' }
  if ($slug -match 'painting') { return 'Projection Painting Kit' }
  if ($slug -match 'smoke') { return 'Racing Smoke Toy Car' }
  if ($slug -match 'fortuner') { return 'Red Fortuner Toy' }
  if ($slug -match 'remote control') { return 'Remote Control Car' }
  if ($slug -match 'plane') { return 'Remote Control Plane' }
  if ($slug -match 'crawler') { return 'Rock Crawler Toy' }
  if ($slug -match 'fighter jets') { return 'Six Fighter Jets Set' }
  if ($slug -match 'sport girl') { return 'Sport Girl Doll' }
  if ($slug -match 'cars set') { return 'Twelve Toy Cars Set' }
  if ($slug -match 'xylo') { return 'Xylo Phone Toy' }
  return ($slug -replace '^.', { $_.ToUpperInvariant() }) + ' Toy'
}

function Get-Description([string]$name) {
  $normalized = $name -replace '\.(jpe?g|png|webp)$', ''
  if ($normalized -match 'water') { return 'A bright and cheerful water gun designed for summer play, easy grip, and splash-filled adventures with family and friends.' }
  if ($normalized -match 'aircraft') { return 'A finely detailed combat aircraft toy that sparks imaginative missions and offers exciting display appeal for young aviation fans.' }
  if ($normalized -match 'piano') { return 'This cheerful piano toy blends sound, movement, and color to create a delightful sensory play experience for toddlers.' }
  if ($normalized -match 'cactus') { return 'A quirky dancing cactus toy with lively motion and bright energy that makes playtime extra fun and memorable.' }
  if ($normalized -match 'duck') { return 'A bouncy duck toy that sings, wiggles, and dances to keep little ones smiling with every interaction.' }
  if ($normalized -match 'remote-control-car') { return 'A sturdy remote-control car packed with smooth steering and bold styling for exciting races around the room or garden.' }
  if ($normalized -match 'defender') { return 'A durable tiny car designed for energetic play and creative road adventures that encourage hand-eye coordination.' }
  if ($normalized -match 'drift') { return 'A sleek racing car toy with premium finish and dynamic design that gives aspiring racers a polished playtime experience.' }
  if ($normalized -match 'princess') { return 'A beautifully styled princess doll with elegant details and a charming look that inspires imaginative role-play and storytelling.' }
  if ($normalized -match 'train') { return 'A detailed train playset complete with rail pieces and vibrant characters for creative transportation adventures.' }
  if ($normalized -match 'fighter-plane') { return 'A bold fighter plane with a polished look and durable build that brings high-flying action to everyday playtime.' }
  if ($normalized -match 'five-toy-cars') { return 'A complete set of five mini vehicles that helps kids build imaginative roads, races, and collections with easy storage.' }
  if ($normalized -match 'drum') { return 'A vibrant drum toy that adds rhythm, movement, and sound to keep children engaged and entertained for hours.' }
  if ($normalized -match 'fortuner') { return 'A premium alloy model toy that offers a realistic finish and collectible charm for young car enthusiasts.' }
  if ($normalized -match 'music') { return 'A delightful musical toy designed to introduce rhythm and melody through colorful lights and cheerful sound effects.' }
  if ($normalized -match 'truck') { return 'A rugged heavy truck playset with realistic details that invites hands-on construction play and imaginative hauling adventures.' }
  if ($normalized -match 'kitty') { return 'A sweet and stylish piano toy with playful sound effects that makes music time fun for little ones.' }
  if ($normalized -match 'atm') { return 'A mini ATM playset that turns everyday pretend-play into a fun learning experience about money and shopping.' }
  if ($normalized -match 'doll') { return 'A lovable doll designed for nurturing play, imaginative stories, and cozy pretend moments with friends and family.' }
  if ($normalized -match 'urdu') { return 'A colorful storybook for young readers that blends family values, fun stories, and early learning in Urdu.' }
  if ($normalized -match 'magnetic') { return 'A creative magnetic toy set that lets children build shapes, vehicles, and imaginative designs with ease.' }
  if ($normalized -match 'makeup') { return 'A playful cosmetic toy set that inspires pretend salon and beauty role-play with safe, colorful accessories.' }
  if ($normalized -match 'mario') { return 'A fun and collectible toy car inspired by a favorite character, crafted for exciting mini-races and imaginative play.' }
  if ($normalized -match 'mcqueen') { return 'A dynamic racing car toy with vivid colors and a polished look that appeals to young speed lovers and collectors alike.' }
  if ($normalized -match 'appliances') { return 'A charming miniature playset that lets children pretend to run a home kitchen or living space with realistic accessories.' }
  if ($normalized -match 'mom-kid') { return 'A sweet doll set that encourages nurturing play and warm storytelling scenes for little caregivers.' }
  if ($normalized -match 'money') { return 'A cute savings toy that teaches children the habit of saving while bringing cheerful color to playtime.' }
  if ($normalized -match 'cow') { return 'A fun musical cow toy that gives little ones a playful introduction to rhythm and sound through gentle tunes.' }
  if ($normalized -match 'painting') { return 'A creative art kit that transforms simple surfaces into colorful masterpieces with light-guided painting fun.' }
  if ($normalized -match 'smoke') { return 'A fast-looking toy car with a bold finish and exciting visual effect that adds flair to every play session.' }
  if ($normalized -match 'plane') { return 'A lightweight remote-control plane designed for beginner-friendly flight fun and imaginative outdoor adventures.' }
  if ($normalized -match 'crawler') { return 'A sturdy off-road toy with bold detailing and rugged style that encourages adventurous play and collecting.' }
  if ($normalized -match 'fighter-jets') { return 'A thrilling set of six mini fighter jets that helps children create exciting air battles and display collections.' }
  if ($normalized -match 'sport-girl') { return 'A sporty doll with upbeat styling and movement-friendly design that inspires active imagination and role-play.' }
  if ($normalized -match 'twelve-toy-cars') { return 'A generous set of twelve miniature cars perfect for building a vivid play scene, collection, or race day setup.' }
  if ($normalized -match 'xylo') { return 'A colorful xylophone-style toy that encourages musical play and early listening skills in a joyful way.' }
  return 'A premium and thoughtfully designed play product that blends charm, durability, and imaginative fun for everyday enjoyment.'
}

function Get-Color([string]$name) {
  if ($name -match 'blue') { return 'Blue' }
  if ($name -match 'red') { return 'Red' }
  if ($name -match 'green') { return 'Green' }
  if ($name -match 'pink') { return 'Pink' }
  if ($name -match 'black') { return 'Black' }
  if ($name -match 'white') { return 'White' }
  if ($name -match 'yellow') { return 'Yellow' }
  if ($name -match 'silver') { return 'Silver' }
  if ($name -match 'grey') { return 'Grey' }
  if ($name -match 'purple') { return 'Purple' }
  if ($name -match 'cream') { return 'Cream' }
  if ($name -match 'rainbow') { return 'Rainbow' }
  if ($name -match 'camouflage') { return 'Camouflage' }
  if ($name -match 'multicolor|colorful') { return 'Multicolor' }
  return 'Colorful'
}

$files = Get-ChildItem $imgDir -File | Where-Object { $_.Extension -in '.jpg', '.jpeg', '.png', '.webp' } | Sort-Object Name
$entries = New-Object System.Collections.Generic.List[string]
$index = 4
foreach ($file in $files) {
  $baseName = $file.Name
  if ($baseName -in @('bump-and-go-monkey-icecream-toy.jpeg','intex-wetset-babypool.jpg','intex-wetset-pool.jpg')) { continue }
  if ($baseName -notmatch '^(bubble-water-gun|combat-aircraft|cow-piano|dancing-cactus|dancing-duck|defender-remote-control-car|defender-toy-car|drift-racing-car|electric-princess|express-train-set|express-train|fighter-plane|five-toy-cars|flash-drum|fortuner-alloy-model|harmonious-music|heavy-truck|hello-kitty-piano|kids-atm|kids-doll|kids-urdu|magnetic-toys|makeup-toy|mario-toy-car|mcqueen-racing-car|mini-home-appliances|mom-kid-doll|money-box|piano-cow|projection-painting|racing-smoke|red-fortuner|remote-control-car|remote-control-plane|rock-crawler|six-fighter-jets|sport-girl-doll|twelve-toy-cars|xylo-phone)') { continue }

  $title = Get-Title $baseName
  $description = Get-Description $baseName
  $price = 1299 + ($index * 97)
  $color = Get-Color $baseName
  $entries.Add(@"
  {
    id: \"prod-$('{0:D3}' -f $index)\",
    name: \"$title\",
    description:
      \"$description\",
    price: $price,
    color: \"$color\",
    images: [
      \"/data/img/$baseName\",
    ],
  }")
  $index++
}

$newEntriesText = ($entries -join ',')
$newContent = "$beforeClosing,$([Environment]::NewLine)$newEntriesText$([Environment]::NewLine)];"
Set-Content -Path $productsPath -Value $newContent -Encoding utf8
Write-Host "Updated $productsPath with $($entries.Count) appended products."
