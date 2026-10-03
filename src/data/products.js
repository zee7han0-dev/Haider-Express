// EDIT THIS FILE to manage your store. Put product photos in /public/images and use image: '/images/name.jpg'
export const STORE = {
  name: 'Haider Express',
  whatsapp: '923000000000', // <- your number: country code + number, no + or spaces
  phoneDisplay: '0300 0000000',
}

export const categories = [
  { slug: 'kitchen-appliances', name: 'Kitchen Appliances', icon: '🍳' },
  { slug: 'hand-blenders', name: 'Blenders & Choppers', icon: '🥤' },
  { slug: 'beauty-tools', name: 'Beauty & Hair Tools', icon: '💇' },
  { slug: 'irons-steamers', name: 'Irons & Steamers', icon: '👕' },
  { slug: 'storage', name: 'Storage & Containers', icon: '🧺' },
  { slug: 'bottles', name: 'Water Bottles', icon: '🧴' },
]

export const products = [
  { id: 1, name: 'GPOWER Digital Air Fryer GP-888', price: 17500, oldPrice: 19500, category: 'kitchen-appliances', image: '', badge: 'New', desc: 'Oil-free fry, roast and bake with a digital touch panel.' },
  { id: 2, name: 'Master Chef 1500W Blender & Grinder', price: 9900, category: 'hand-blenders', image: '', badge: 'New', desc: 'High-performance digital blender with a 2L food-grade jar.' },
  { id: 3, name: 'SilverCrest Chopper 3L, 1000W', price: 4250, oldPrice: 4800, category: 'hand-blenders', image: '', badge: 'Best seller', desc: 'Meat and vegetable chopper with 4 stainless steel blades.' },
  { id: 4, name: 'RAF 5-in-1 Hand Blender Set 900W', price: 6500, category: 'hand-blenders', image: '', desc: 'Blender jar, chopper and whisk in one set.' },
  { id: 5, name: 'G.POWER Heavy Dry Iron 1200W', price: 5500, category: 'irons-steamers', image: '', desc: 'Gold ceramic soleplate for smooth, even pressing.' },
  { id: 6, name: 'RAF Handheld Garment Steamer', price: 6750, category: 'irons-steamers', image: '', desc: 'Portable steam iron that removes wrinkles in minutes.' },
  { id: 7, name: 'Professional Hair Dryer 5000W', price: 3850, category: 'beauty-tools', image: '', desc: 'Fast drying with a concentrator nozzle.' },
  { id: 8, name: 'Professional Hair Straightener', price: 3200, category: 'beauty-tools', image: '', desc: 'Wide ceramic plates for a smooth finish.' },
  { id: 9, name: 'Instant Hot Water Tap', price: 3500, category: 'kitchen-appliances', image: '', badge: 'Winter pick', desc: 'Hot water in 2 seconds. Easy to fit on a standard sink.' },
  { id: 10, name: '6-in-1 Spice Rack Organizer', price: 3250, category: 'storage', image: '', desc: 'Six jars with a storage box to keep your counter tidy.' },
  { id: 11, name: 'Stanley Steel Tumbler 1.18L', price: 3250, category: 'bottles', image: '', desc: 'Vacuum insulated. Keeps drinks hot or cold for hours.' },
  { id: 12, name: 'MPM Sandwich Toaster 900W', price: 6000, category: 'kitchen-appliances', image: '', desc: 'Large size sandwich maker, easy to clean.' },
]

export const rs = (n) => 'Rs. ' + n.toLocaleString('en-PK')
