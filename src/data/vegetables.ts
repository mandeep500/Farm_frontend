export interface VegetableCategory {
  id: string;
  name: string;
  hindiName?: string;
  shortDesc: string;
  iconImage: string;
  emoji: string;
  tag: string;
  color: string;
}

export interface ProduceItem {
  id: string;
  categoryId: string;
  name: string;
  hindiName?: string;
  variety: string;
  price: string;
  unit: string;
  harvestTime: string;
  farmLocation: string;
  badge: string;
  rating: number;
  inStock: boolean;
  image: string;
  description: string;
  benefits: string[];
}

export const VEGETABLE_CATEGORIES: VegetableCategory[] = [
  {
    id: "all",
    name: "For You",
    hindiName: "सभी फसलें",
    shortDesc: "Today's fresh daily harvest across all organic blocks",
    iconImage:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=95",
    emoji: "🧺",
    tag: "Daily Harvest",
    color: "emerald",
  },
  {
    id: "onion",
    name: "Onion",
    hindiName: "प्याज",
    shortDesc: "Pungent, sun-cured red & yellow heirloom onions",
    iconImage:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=95",
    emoji: "🧅",
    tag: "Aromatic & Sweet",
    color: "rose",
  },
  {
    id: "potato",
    name: "Potato",
    hindiName: "आलू",
    shortDesc: "Firm, buttery living-soil golden and red potatoes",
    iconImage:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=95",
    emoji: "🥔",
    tag: "Living Soil",
    color: "amber",
  },
  {
    id: "carrot",
    name: "Carrot",
    hindiName: "गाजर",
    shortDesc: "Crisp, sweet, antioxidant-packed heirloom carrots",
    iconImage:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=95",
    emoji: "🥕",
    tag: "High Carotene",
    color: "orange",
  },
  {
    id: "lady-finger",
    name: "Lady Finger",
    hindiName: "भिंडी",
    shortDesc: "Tender, slender okra harvested fresh before dawn",
    iconImage:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=800&q=95",
    emoji: "🌿",
    tag: "Tender & Crisp",
    color: "green",
  },
  {
    id: "tomato",
    name: "Tomato",
    hindiName: "टमाटर",
    shortDesc: "Juicy, vine-ripened red heirloom tomatoes",
    iconImage:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=95",
    emoji: "🍅",
    tag: "Vine Ripened",
    color: "red",
  },
  {
    id: "cauliflower",
    name: "Cauliflower",
    hindiName: "फूलगोभी",
    shortDesc: "Snow-white, dense heads grown with cold-spring water",
    iconImage:
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=95",
    emoji: "🥦",
    tag: "Snow White",
    color: "stone",
  },
  {
    id: "spinach",
    name: "Spinach",
    hindiName: "पालक",
    shortDesc: "Tender dark green leafy greens full of iron and vitality",
    iconImage:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=95",
    emoji: "🥬",
    tag: "Iron Packed",
    color: "emerald",
  },
  {
    id: "garlic",
    name: "Garlic",
    hindiName: "लहसुन",
    shortDesc: "Aromatic native cloves with medicinal allicin potency",
    iconImage:
      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=95",
    emoji: "🧄",
    tag: "High Allicin",
    color: "stone",
  },
  {
    id: "capsicum",
    name: "Capsicum",
    hindiName: "शिमला मिर्च",
    shortDesc: "Thick-walled, crisp green and sweet bell peppers",
    iconImage:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=95",
    emoji: "🫑",
    tag: "Crisp & Juicy",
    color: "emerald",
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    hindiName: "हरी मिर्च",
    shortDesc: "Fiery, aromatic fresh Indian chillies hand-picked daily",
    iconImage:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=95",
    emoji: "🌶️",
    tag: "Fresh Zest",
    color: "green",
  },
  {
    id: "peas-corn",
    name: "Sweet Corn",
    hindiName: "मक्का / मटर",
    shortDesc: "Naturally sweet golden cobs and tender green pod peas",
    iconImage:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=95",
    emoji: "🌽",
    tag: "Naturally Sweet",
    color: "amber",
  },
];

export const PRODUCE_ITEMS: ProduceItem[] = [
  // Onion items
  {
    id: "prod-onion-1",
    categoryId: "onion",
    name: "Heritage Red Onion",
    hindiName: "देसी लाल प्याज",
    variety: "Nasik Heirloom Red",
    price: "₹38",
    unit: "per kg",
    harvestTime: "Today at 06:15 AM",
    farmLocation: "Sekhon Organic Block B2",
    badge: "100% Pesticide Free",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1600&q=95",
    description:
      "Naturally cured in ambient shade for maximum shelf life. Crisp layers with high quercetin and balanced pungency.",
    benefits: ["Rich in Quercetin Antioxidants", "Natural Immunity Booster", "Living Soil Micro-Nutrients"],
  },
  {
    id: "prod-onion-2",
    categoryId: "onion",
    name: "Sweet Golden Spring Onion",
    hindiName: "हरा प्याज (स्प्रिंग अनियन)",
    variety: "Sweet White & Green Shoots",
    price: "₹30",
    unit: "per bunch",
    harvestTime: "Today at 06:45 AM",
    farmLocation: "Sekhon Raised Bed 14",
    badge: "Morning Fresh",
    rating: 4.8,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1600&q=95",
    description:
      "Crisp green stalks and delicate white bulbs. Perfect for fresh salads, wok stir-fries, and garnishes.",
    benefits: ["High Vitamin K", "Crisp Texture", "Delicate Sweet Aroma"],
  },

  // Potato items
  {
    id: "prod-potato-1",
    categoryId: "potato",
    name: "Native Living-Soil Potatoes",
    hindiName: "देसी पहाड़ी आलू",
    variety: "Kufri Jyoti Heirloom",
    price: "₹32",
    unit: "per kg",
    harvestTime: "Harvested Yesterday Evening",
    farmLocation: "Sekhon Riverbed Sector A",
    badge: "Unpolished & Natural",
    rating: 5.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1600&q=95",
    description:
      "Dug fresh from rich composted earth. Unwashed with soil dust preserving natural freshness and buttery flavor.",
    benefits: ["Complex Carbohydrates", "High Potassium & Vitamin B6", "Rich Velvety Texture"],
  },
  {
    id: "prod-potato-2",
    categoryId: "potato",
    name: "Organic Baby Gold Potatoes",
    hindiName: "बेबी आलू (दम आलू स्पेशल)",
    variety: "Baby Gold Nugget",
    price: "₹45",
    unit: "per kg",
    harvestTime: "Today at 07:00 AM",
    farmLocation: "Sekhon Organic Block B1",
    badge: "Chef's Favorite",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1508313880080-c4bef0730395?auto=format&fit=crop&w=1600&q=95",
    description:
      "Tender, thin-skinned baby potatoes that roast to a melt-in-the-mouth perfection with rosemary or Indian spices.",
    benefits: ["Thin Edible Skin", "Sweet Earthy Flavor", "Ideal for Dum Aloo"],
  },

  // Carrot items
  {
    id: "prod-carrot-1",
    categoryId: "carrot",
    name: "Heirloom Red Winter Carrots",
    hindiName: "देसी लाल मीठी गाजर",
    variety: "Pusa Rudhira (Pure Red)",
    price: "₹42",
    unit: "per kg",
    harvestTime: "Today at 06:30 AM",
    farmLocation: "Sekhon Alluvial Loam Plot",
    badge: "Naturally Sweet",
    rating: 5.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1600&q=95",
    description:
      "Crunchy, deeply red heirloom carrots renowned for their extraordinary natural sweetness and high lycopene.",
    benefits: ["Immense Beta-Carotene", "Rich in Lycopene", "Perfect for Gajar Halwa & Juices"],
  },

  // Lady Finger items
  {
    id: "prod-lady-finger-1",
    categoryId: "lady-finger",
    name: "Tender Green Lady Finger (Bhindi)",
    hindiName: "ताज़ी हरी भिंडी",
    variety: "Pusa Sawani Tender Okra",
    price: "₹48",
    unit: "per kg",
    harvestTime: "Today at 05:45 AM",
    farmLocation: "Sekhon Sunny Terraces Block D",
    badge: "Snap-Tender Fresh",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=1600&q=95",
    description:
      "Every single okra is hand-checked for the signature snap at the tip. Slender, zero fibrous toughness, cooks crisp without excess slime.",
    benefits: ["Abundant Dietary Soluble Fiber", "Blood Sugar Regulation Support", "Zero Bitter Chemicals"],
  },
  {
    id: "prod-lady-finger-2",
    categoryId: "lady-finger",
    name: "Mini Velvet Okra Pods",
    hindiName: "छोटी कोमल भिंडी",
    variety: "Emerald Baby Okra",
    price: "₹55",
    unit: "per kg",
    harvestTime: "Today at 06:10 AM",
    farmLocation: "Sekhon Greenhouse Zone 2",
    badge: "Extra Tender",
    rating: 4.8,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1600&q=95",
    description:
      "Small 3-inch tender okra pods ideal for crispy Kurkuri Bhindi or mild tomato-curry preparation.",
    benefits: ["Rich in Folate & Vitamin C", "Super Easy Cooking", "Natural Mucilage for Digestion"],
  },

  // Tomato items
  {
    id: "prod-tomato-1",
    categoryId: "tomato",
    name: "Sun-Ripened Vine Tomatoes",
    hindiName: "बेल पके देसी टमाटर",
    variety: "Heritage San Marzano & Desi Hybrid",
    price: "₹35",
    unit: "per kg",
    harvestTime: "Today at 06:00 AM",
    farmLocation: "Sekhon Solar Trellis Sector C",
    badge: "Naturally Vine-Ripened",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1600&q=95",
    description:
      "Never artificially ripened with carbide or ethylene gas. Left on the vine until bursting with rich umami and gentle tang.",
    benefits: ["High Lycopene & Vitamin C", "Pure Sweet-Tart Balanced Acid", "Dense Meaty Flesh"],
  },

  // Cauliflower items
  {
    id: "prod-cauliflower-1",
    categoryId: "cauliflower",
    name: "Crisp Snowball Cauliflower",
    hindiName: "ताज़ी देसी फूलगोभी",
    variety: "Snowball Early Organic",
    price: "₹40",
    unit: "per piece",
    harvestTime: "Today at 06:20 AM",
    farmLocation: "Sekhon Valley Bed 7",
    badge: "Dew-Crisp Curd",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=1600&q=95",
    description:
      "Tightly packed creamy-white florets shielded from sunlight by their own leaves for pure purity and crisp crunch.",
    benefits: ["High Glucosinolates", "Great Low-Carb Alternative", "Rich in Choline"],
  },

  // Spinach & Greens items
  {
    id: "prod-spinach-1",
    categoryId: "spinach",
    name: "Organic Broadleaf Spinach (Palak)",
    hindiName: "देसी चौड़ी पत्ती पालक",
    variety: "All-Green Organic Heirloom",
    price: "₹25",
    unit: "per bunch",
    harvestTime: "Today at 05:30 AM",
    farmLocation: "Sekhon Cold Micro-Mist Polyhouse",
    badge: "100% Unsprayed",
    rating: 5.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1600&q=95",
    description:
      "Deep jade green leaves hand-cut at daybreak with dew still intact. Mild, sweet, with none of the harsh metallic spray residue.",
    benefits: ["Packed with Bioavailable Iron", "High Lutein & Zeaxanthin", "Nourishes Living Gut Flora"],
  },

  // Garlic items
  {
    id: "prod-garlic-1",
    categoryId: "garlic",
    name: "Aromatic Native Mountain Garlic",
    hindiName: "देसी पहाड़ी लहसुन",
    variety: "Purple-Striped Hill Garlic",
    price: "₹180",
    unit: "per kg",
    harvestTime: "Sun-Cured 10 Days",
    farmLocation: "Sekhon Elevated Terrace E",
    badge: "High Allicin Pungency",
    rating: 5.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=1600&q=95",
    description:
      "Small tight cloves with intense aromatic oils. Just 2 cloves deliver the flavor and active allicin of 5 standard supermarket cloves.",
    benefits: ["Immense Antibacterial Allicin", "Cardiovascular Support", "Extended Kitchen Shelf Life"],
  },

  // Capsicum items
  {
    id: "prod-capsicum-1",
    categoryId: "capsicum",
    name: "Crisp Green Bell Pepper",
    hindiName: "हरी शिमला मिर्च",
    variety: "California Wonder Heirloom",
    price: "₹60",
    unit: "per kg",
    harvestTime: "Today at 07:15 AM",
    farmLocation: "Sekhon Polyhouse Sector 3",
    badge: "Juicy & Crisp",
    rating: 4.8,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1600&q=95",
    description:
      "Thick, crunchy succulent walls that snap with juice. Sweet with mild earthy spice, perfect for sauteing, roasting, and salads.",
    benefits: ["Rich in Vitamin C & A", "Low Calorie Crunch", "Living Soil Minerals"],
  },

  // Green Chilli items
  {
    id: "prod-chilli-1",
    categoryId: "green-chilli",
    name: "Fresh Indian Green Chillies",
    hindiName: "देसी तीखी हरी मिर्च",
    variety: "Jwala Heirloom Hot",
    price: "₹20",
    unit: "per 250g",
    harvestTime: "Today at 06:10 AM",
    farmLocation: "Sekhon South Ridge Row 8",
    badge: "Hand-Picked Daily",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1600&q=95",
    description:
      "Vibrant slender green peppers loaded with natural capsaicin and spicy fragrant oils. Harvested while still glossy and firm.",
    benefits: ["High Capsaicin Metabolism Boost", "Fresh Vitamin C", "Zero Artificial Ripening"],
  },

  // Sweet Corn & Peas
  {
    id: "prod-corn-1",
    categoryId: "peas-corn",
    name: "Golden Sun Sweet Corn Cobs",
    hindiName: "देसी मीठा भुट्टा",
    variety: "Golden Bantam Organic",
    price: "₹25",
    unit: "per piece",
    harvestTime: "Today at 06:00 AM",
    farmLocation: "Sekhon East Field 5",
    badge: "Milky Sweet Kernels",
    rating: 4.9,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1600&q=95",
    description:
      "Plump, juicy golden kernels wrapped in moist fresh green husks. Boils or roasts to fragrant, buttery perfection.",
    benefits: ["Natural Zeaxanthin for Vision", "Dietary Fiber", "Sweet Natural Sucrose"],
  },
];
