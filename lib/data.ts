import { Profile, MeetupItem, TribeNode, ChatSession } from "./types";

export const INITIAL_USER_PROFILE: Profile = {
  id: "user_voyager",
  moniker: "Aria Sterling",
  age: 24,
  location: "Axiom District, New-Berlin",
  bio: "Curating the intersection of algorithmic art and underground techno. Seeking high-vibe meetups and late-night gallery crawls. 🔋",
  compatibility: 100,
  tags: ["Techno", "Art Galleries", "AI Ethics", "Neo-Tokyo", "Brutalism"],
  relationshipGoals: "Deep connections & spontaneity",
  matchMode: "dating",
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAZAZa6FDpDNQB9aXMqeDUMtHRxd_t0NIaaNA0VMEG3Y7s_M1ttIq8y9IYvJ2VEtTYmPbRLcNRdepumLV7tXzZN7ekW3kXuLdub3diCvLGQ2Ejio4TYP0lBpDMhLEwtyqZtHrDmdwZh-TB9Y3lgL0OVvVGUufmsQVqdQlLwjvhYyyu7NuStwIn-gnfKq7lKCfoaFeE33zIFiHsXHVIBQUIOpA8jhOtNTy92Q3kzjryWr8hPjeeHjcxF7Z9M4wO0SSyZ3FW9ZTDxOhU",
  currentMusicName: "Model 500 - Retroactive",
  currentMusicArtist: "Juan Atkins",
  mood: "Resonating deep synth loop",
  nearbyDistance: "0.2 km",
  favoriteHangouts: [
    "The Brutalist Gate",
    "Glow-box Arcade",
    "Cybernetic Botanical",
  ],
  isVerified: true,
  tribeCount: "1.2k",
  meetupsCount: 42,
  isFakeCheckOk: true,
};

export const MOCK_PROFILES: Profile[] = [
  {
    id: "maya_24",
    moniker: "Maya",
    age: 24,
    location: "Arts District, London",
    bio: "Digital architect exploring the intersection of light and space. Building worlds in 3D and seeking connections in the physical realm. 💫",
    compatibility: 94,
    tags: ["Techno", "Art Galleries", "AI Ethics", "Brutalism"],
    relationshipGoals: "Creative collaborations",
    matchMode: "dating",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDS_V9znW_6if8sr7ejUz3MUlFGn-4LGYieNc-hnN20ryrwFFGsGr6fyoGSq8KQzIuHPorfESxxJp0bCFOyfMeitkwK6XZs2f2qLs9TFUJ1-wOTcXnITQzRL67zl911gkgelcdqbM2wIovfEjz1e0TeXrNue8RkUk3CjvBWE9QXer6ESDjQ_2Ns4ts6V6vyC0lXMpLgF-0pYPFY5cyvmb5dKbVCsFp6-IxxxjVCdgwGyWApyMBct_y2C-MJBDeAg3tStBQDc5X25k",
    currentMusicName: "Stellar Wind",
    currentMusicArtist: "Ethereal Echoes",
    mood: "Ambient focus",
    nearbyDistance: "1.4 miles",
    favoriteHangouts: ["Tate Modern", "Decentralized Cafes", "Neon Rooftops"],
    isVerified: true,
    tribeCount: "1.2k",
    meetupsCount: 42,
    isFakeCheckOk: true,
  },
  {
    id: "aria_vance_24",
    moniker: "Aria Vance",
    age: 24,
    location: "Berlin, DE",
    bio: "Curating cyber-photographics. Seeking deep conversations under dark atmospheric lights followed by subterranean club crawls. Let's trade frequencies.",
    compatibility: 98,
    tags: ["Techno", "Cyberpunk", "Archery", "AI Ethics"],
    relationshipGoals: "Spontaneous chemistry",
    matchMode: "dating",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6eln0h-xWD-z1vdMEQ4nV5oNKYrR_Nuwin4q12tpKMf1FChgFnA-JLWrU5K8MDaugrByJJAzWRQFrx5tvQHMZd74gPAsd8gih8HKcoxLfR4OYOzpv--VpVRyr3NHoPkHiqeYWWSNQN9nXYHd_U7NuEd0EMuFWEByzlKFQqzachWFriaMciTQcckWtJpTco9ErgiPfiRBuVdMFY1ycZzjThcObd_35TyrKnHkX6gLNeeYQyJiVNNsItKhSVDyRdGgaz_FflCVJ3ps",
    currentMusicName: "Vibe Transmission",
    currentMusicArtist: "Subterranean Node",
    mood: "Adrenaline & strobe triggers",
    nearbyDistance: "0.8 km",
    favoriteHangouts: ["Tresor Warehouse", "RAW-Gelände", "Analog Synth Cave"],
    isVerified: true,
    tribeCount: "2.4k",
    meetupsCount: 19,
    isFakeCheckOk: true,
  },
  {
    id: "julian_thorne_27",
    moniker: "Julian Thorne",
    age: 27,
    location: "London, UK",
    bio: "Speculative tech architect. Restoring vintage 70s modular synthesizers. Seeking low-vibe late-night cafes and brutalist architectures.",
    compatibility: 94,
    tags: ["Architecture", "Modular Synths", "Vinyl Labs", "Brutalism"],
    relationshipGoals: "Philosophical banter",
    matchMode: "friendship",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzNFuv6odESbcJLLki2dKT-5VXQYQTFpBpoGfftV1Q3wkN09HXxJ4MAgZIAznGBD42JWKTWnW5nDPFlUl4HTu4v5qtYjVX-C0dOa1mFl_o7KLNOItsYSU_UV1ewNzSoqW3pOsCOQ_BTTPTymZMPd9pbj_BeTKB-yJpfOumWSBXTguhNW9lQqNItKVwo-BC7iMkeBEbk3tEoOXfUz21KmHEu0099qc5LKNZat5eMs9Pj8ZMsmpKzzzdTupdIyGdh39Vlv0tAVXuUUE",
    currentMusicName: "Breathe Echoes",
    currentMusicArtist: "Synthesizer Oracle",
    mood: "Grounded mono frequency",
    nearbyDistance: "3.2 miles",
    favoriteHangouts: [
      "Barbican Center",
      "Third-Wave Coffee Shop",
      "Hackney Record Lab",
    ],
    isVerified: true,
    tribeCount: "890",
    meetupsCount: 15,
    isFakeCheckOk: true,
  },
  {
    id: "kira_moon_22",
    moniker: "Kira Moon",
    age: 22,
    location: "Tokyo, JP",
    bio: "Cyber-botanist capturing bioluminescent flora and organic tech overlaps. Always equipped with a wide lens and high-fidelity curiosity. Looking for neo-tribe explorers. 🔋",
    compatibility: 92,
    tags: ["Tokyo Nights", "Organic Tech", "Archery", "AI Ethics"],
    relationshipGoals: "Deep companion loops",
    matchMode: "friendship",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqoPMmYCbRj8Oz4dUJU03Mn8U6_M-BRpDYVoAvwGRW65AoPGUe-KuECvYxJ1Q3WvEOUZUAdvvS6MVkGOYoAeO2N_mzYBr6JqF4oxZHYEaVcZgKPjrNTh4fnOCfBz3I7Kcp0eM8rRqotZsa79vNKLQzNc9iE_RO3rEDQ0DinkKfTUV4GSfnBdw0W6Ch4szMsBKL-tXSSZrX7lkPJp5vZtNZprnypaFPCH_YTTxpfQ-S8CYVnZVuGnSCBVIlNc8EdB5u4X4mlKGukaI",
    currentMusicName: "Shibuya Drift Echo",
    currentMusicArtist: "Biolume Beats",
    mood: "Neon euphoria",
    nearbyDistance: "12.4 km",
    favoriteHangouts: [
      "Akihabara Server Bar",
      "Shinjuku Green Dome",
      "Odaiba Neon Bay",
    ],
    isVerified: true,
    tribeCount: "1.1k",
    meetupsCount: 8,
    isFakeCheckOk: true,
  },
  {
    id: "elias_thorne_29",
    moniker: "Elias Thorne",
    age: 29,
    location: "Berlin, DE",
    bio: "Systems architect & quantum physics minimalist. Fascinated by non-linear digital storytelling and sub-bass ambient fields. Verified to the void.",
    compatibility: 99,
    tags: [
      "Quantum",
      "Minimalist",
      "Underground Tech",
      "Late-Night Philosophy",
    ],
    relationshipGoals: "Soul-resonant sync",
    matchMode: "networking",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANeH3d8oKZj6D5IdXnthgiEVB5DPTM58NZ_Y-x5zwnL8cvIMSDI7z3J3MvRHYEEDxtIZTC2tj5KXuMsadXhei0pWZ_o6NQ5xNRC53VNX5GLzTI9a7gQItxWiPYP995pYhbIZ9AsoRIbXHPfTKSTF0P7UKslBH0Wm2KmCxKHmEM46bUvxg3oRgNxAMpwmJmxDulYA60AAtcfo9vzgU2OVXrtLzsR-CKQoXswN36Pahn-7qSq4hhJck3nsrHYbGYmj_0xl5CXO0K8bs",
    currentMusicName: "Thermodynamics of Vibe",
    currentMusicArtist: "Elias & Co.",
    mood: "Hyper-focused logic",
    nearbyDistance: "2.1 km",
    favoriteHangouts: [
      "Quantum Coffeehouse",
      "Brutalist Node 4",
      "Experimental Acoustics Center",
    ],
    isVerified: true,
    tribeCount: "740",
    meetupsCount: 31,
    isFakeCheckOk: true,
  },
];

export const MOCK_TRIBES: TribeNode[] = [
  {
    id: "tribe_techno",
    name: "Underground Techno",
    description:
      "Deep rhythms for the night-dwelling digital elite. Exclusive sets and secret warehouse coordinates.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB92j2yEMRlGatDKTRcO-SNUkLJ_Q6Sr1dyjUPvvBRJsIvuj8JFV347dkK6B7P4teZvj1C0RMJtDLbxVyESDdvoGdLlroSx0-xLQqY3Gmxw78juB7MpN25D-FpwFLrCZT5LWBGs4dQYn6Mmenphfov9cKDh2Gp3k3ArH7CWGo0RQnYOjWKeewrBO09Uzr2dfcIKp543yqp31QX7oUAQeJJJFh1rLHAFYi6FFuij8mUqFXZHDAQ93xJ0yKVqXhpF0Gdn4RfqdDzVshE",
    activeNodesCount: "4.2k Active Nodes",
    membersCount: "22k Members",
    category: "Techno",
    memberPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC84CWhJwBA_oOPwR1qbM654ItFm6orh9CFizyKu2d8lvVLBCQmC9M7gu0RhXuoNTQDJpF24hN_dgbCzbUd8bMgaKDexnxR2TKh_WcZ8MsWPd3CY4461FQhBEM0fYJZlbnSLu8ARmmwXTdwekDgHzPRsrsKe5Go6PWpaoRcd6dFUUoS22giiqyr9uJFx0T8RhX6BvzuCAQmu-xJSB_GpJziuv_esyp3DmGTaBFkD4Qn9Pb8DtoLGKYAUTZLd7teug6ybgwHbPnz6U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAE7IMRt5UAWlhv8eZfWmxZGMGc6IY7GfmrBAvFKSZClxKK_580-mTWl78rV3qCXdxDWe3HmnNKkWYAZjPefMqdFp6l5Y0RcFSLHFzETkAVtxkumm7RLsa9MVgrQfEgrqIbMsb5NdJ5ilnBfF-5W-_OLziI4iucPMrrK1y7LOEFoXEZqD2IFQoEYh4hG-r2k5qu9ONpeClaJWdakB7sigAhlYJ4BViDQbnaxjuEqEtfUF6kN_NB3t1mbznz90_ATzmeZF33iKk8XNc",
    ],
  },
  {
    id: "tribe_neon_photo",
    name: "Neon Photographers",
    description:
      "Capturing the electric pulse of the future city through a cyber-lens and long-exposures.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk4t39wwXE1VfJXAsjAS6S2pYX0o8gd-fuYE-o4hxYtVnDWUVq1ly3nljDPphdxYJPY3bsqedu2TFYMzFHz9YspwI0INbh_shS22I_Ne97hU6fV4oLI3_OlO3_tvMY3PkGwX4A7a2p_CjE5pq1hytR9TYss5HXtP7VTe-woecw8gpBIYVLtARc2aD6jqQtOoyO7vQk58dK_XdPtdwBDmCs42rdlCmPwcs2AJQ4NC2lsjRv3DkZTx2XOGcy2dqB2dXs1EQ752gFuNY",
    activeNodesCount: "1.8k Active",
    membersCount: "12k Members",
    category: "Digital Art",
    memberPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDFkyTQhuQZRtq0izdcQJQyVL4UHmA5ICbcCE_7Ch8FowcKBRTlEIt0nLwYYxw_EiUbvDeTHRch9M3zSWKNIGgp0y0XHMuqCrFbds6vOmlrDTLf4zIRWS2iRILf6Eu3_tZoaO6gdSTP-FzkoDkF4RG7YFbxK4UMdtkD7JFut5MOJS-AYtxch4wVs1gqa57CbHCVB6nxyw5XTr6Hp2OaAL3_yaCwx98gSYPkE8XExBYh-XjoXkPqJ6hngMjUVwpAeYZGHMDqI6McoY",
    ],
  },
  {
    id: "tribe_philosophers",
    name: "Digital Philosophers",
    description:
      "Discussing the ethics of AI, transhumanism, simulation theories, and future ethics.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCL_tw8xbCHu1tKwwFfktuHn3Vm8vA4nE7D8Uq552UjTQt3GySKcuMSbS8kOF7loU0QckpKT8I69_k9vWGiKmMbgrSkuolNJetfEOTxGM-4DR_h1SbitkzzOvgL2pTGlcE0MMqmbA_zlactQ7chQlhbr4TRxwA2ZPhWKeXMewCZJ578xpKl55OANJhfI2M1G1jmT6AykiRnPEemmsOAUScQbqoWcJwlUAKbbuQrT6weITJKUQSc0LzLNMM3zrW3Sca1kuLWAPv9xeU",
    activeNodesCount: "840 Thinkers",
    membersCount: "5k Members",
    category: "Philosophy",
    memberPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAh-gq9MdIvSb0cRFFQNHLQyVMAD5h6uQsJsXeN_4iOoUlSNodUG00k-p9OKT5VYPqTdnEiKERRW1-b8Hx416Bj5jQPq2Suf8mTf25rsqKQ572mvQZNwCjmjxG5nIp7-ELIcXmu0wy9SXViEc3H6z8-A6SOg0n-gL-HnYbtKhzJvQ1EhwSRAw-lCuihNM4un52BbkBwPlMnYp0rd0WzKQRewOENEW7ozdapwbRJDZEt83X8ubZWaxY-gRJ06fWbAUqhhDh1UZBuGo",
    ],
  },
  {
    id: "tribe_architects",
    name: "Cyber Architects",
    description:
      "Designing the virtual coordinates and spatial layout fields of future hyper-cities.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyAloIjUCW_KMcPZamCZuj7fqq1D-vzkAtbfjlRda5fXA3_sL2-4NXz4PyP6R8rzVXG4f1FsjLAnpFU8dM0mr_aMCCVsRMi3hKhquISJjNfGXpSCxImcOnu1_rPpPKpmBEKgP3op67paVa-QGsdkcm-vz7XgTMZYd6NCPIL2e1po8jgZoY-5TfC_vaRAleuRuRzPLKFbYRepiIeRgO6jX-eO3LgBs4s6tBuf7UVIvu4SHhU_3RdTNPqU-xTfWMpiK39yBLQgaxqyQ",
    activeNodesCount: "2.3k Active",
    membersCount: "11k Members",
    category: "Nearby",
    memberPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-7y3ujYwVTEomHXCVuMHHayTU9eWZxIngDTA8rSN2j8hV-gNJC6Olez0n9Y1mKzx-EpHaD3KYeF8JlMHLQy1SYgribcXXnkbl6h9Zvfwm1yDiimmtZsSF_potTBERZWl7eP8_urNq_hKstI5LHqJsq3DU4wqkZ8ckswCpbGOMjbqXtmRYAn17QII6f2bnApVejWgHNnSn2qMOfOACZciZqW_vtPc8S9igB1ryyKlpoVPSuAwqllanZsSVy222o8FLphMvM0ICnM",
    ],
  },
  {
    id: "tribe_fusion",
    name: "Bio-Digital Fusion",
    description:
      "Where neural connectivity meets organic biological intelligence. Blooming floral bio-arrays.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg0QllLZF4QVlqx3vMVHT4Z4t2rrLUdQ72dlTPsrM_gCvYrWhbfaAT1DeSHfykDZmuxipZ6pJaYO-x8p_CAsi2MLBhy6p27WB4aOenhBRfGYq54J8hlatcZhU111GTCTO4aOVOI1KhHnj9N0OyHAVBK-qDcRlc_AA3Tc5KqJozIkkwMQviQrC3cipmwug3Pugk1pMpkRg-4FBBc3KXSqTc8qo7NQhtGvmoxOrJCSKTS6_G09hTPljJw23ss4lV-n0GwlCe_oi6n4c",
    activeNodesCount: "1.4k Active",
    membersCount: "8k Members",
    category: "Trending",
    memberPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDS_V9znW_6if8sr7ejUz3MUlFGn-4LGYieNc-hnN20ryrwFFGsGr6fyoGSq8KQzIuHPorfESxxJp0bCFOyfMeitkwK6XZs2f2qLs9TFUJ1-wOTcXnITQzRL67zl911gkgelcdqbM2wIovfEjz1e0TeXrNue8RkUk3CjvBWE9QXer6ESDjQ_2Ns4ts6V6vyC0lXMpLgF-0pYPFY5cyvmb5dKbVCsFp6-IxxxjVCdgwGyWApyMBct_y2C-MJBDeAg3tStBQDc5X25k",
    ],
  },
];

export const MOCK_MEETUPS: MeetupItem[] = [
  {
    id: "meetup_1",
    title: "Berlin Modular Synth Gathering",
    description:
      "Bring your modular cases, patch cables, and analog processors. Overlaps with sub-frequency drones and micro-tuned acoustic filters.",
    attendeesCount: 18,
    attendeesPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC84CWhJwBA_oOPwR1qbM654ItFm6orh9CFizyKu2d8lvVLBCQmC9M7gu0RhXuoNTQDJpF24hN_dgbCzbUd8bMgaKDexnxR2TKh_WcZ8MsWPd3CY4461FQhBEM0fYJZlbnSLu8ARmmwXTdwekDgHzPRsrsKe5Go6PWpaoRcd6dFUUoS22giiqyr9uJFx0T8RhX6BvzuCAQmu-xJSB_GpJziuv_esyp3DmGTaBFkD4Qn9Pb8DtoLGKYAUTZLd7teug6ybgwHbPnz6U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAE7IMRt5UAWlhv8eZfWmxZGMGc6IY7GfmrBAvFKSZClxKK_580-mTWl78rV3qCXdxDWe3HmnNKkWYAZjPefMqdFp6l5Y0RcFSLHFzETkAVtxkumm7RLsa9MVgrQfEgrqIbMsb5NdJ5ilnBfF-5W-_OLziI4iucPMrrK1y7LOEFoXEZqD2IFQoEYh4hG-r2k5qu9ONpeClaJWdakB7sigAhlYJ4BViDQbnaxjuEqEtfUF6kN_NB3t1mbznz90_ATzmeZF33iKk8XNc",
    ],
    vibe: "Analog Warmth",
    distance: "1.2 km away",
    costLevel: "$",
    safetyVerification: true,
    music: "Drone, Ambient Synth, Industrial",
    category: "Gaming & Synths",
  },
  {
    id: "meetup_2",
    title: "Brutalist Walk & Urban Exposure",
    description:
      "Camera meetup starting at the concrete columns of Node 4. Exploring reflections of early twilight on high-contrast surfaces.",
    attendeesCount: 24,
    attendeesPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDFkyTQhuQZRtq0izdcQJQyVL4UHmA5ICbcCE_7Ch8FowcKBRTlEIt0nLwYYxw_EiUbvDeTHRch9M3zSWKNIGgp0y0XHMuqCrFbds6vOmlrDTLf4zIRWS2iRILf6Eu3_tZoaO6gdSTP-FzkoDkF4RG7YFbxK4UMdtkD7JFut5MOJS-AYtxch4wVs1gqa57CbHCVB6nxyw5XTr6Hp2OaAL3_yaCwx98gSYPkE8XExBYh-XjoXkPqJ6hngMjUVwpAeYZGHMDqI6McoY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-7y3ujYwVTEomHXCVuMHHayTU9eWZxIngDTA8rSN2j8hV-gNJC6Olez0n9Y1mKzx-EpHaD3KYeF8JlMHLQy1SYgribcXXnkbl6h9Zvfwm1yDiimmtZsSF_potTBERZWl7eP8_urNq_hKstI5LHqJsq3DU4wqkZ8ckswCpbGOMjbqXtmRYAn17QII6f2bnApVejWgHNnSn2qMOfOACZciZqW_vtPc8S9igB1ryyKlpoVPSuAwqllanZsSVy222o8FLphMvM0ICnM",
    ],
    vibe: "Crisp Monotonal",
    distance: "3.5 km away",
    costLevel: "$$",
    safetyVerification: true,
    music: "None (Ambient Echoes)",
    category: "Art & Design",
  },
  {
    id: "meetup_3",
    title: "Late-Night Subterranean Session",
    description:
      "Private circle entry to the Vault Room. Strict nophone policy on the dancefloor. Sub-bass focused. Biometric link required for ticket matching.",
    attendeesCount: 45,
    attendeesPics: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDS_V9znW_6if8sr7ejUz3MUlFGn-4LGYieNc-hnN20ryrwFFGsGr6fyoGSq8KQzIuHPorfESxxJp0bCFOyfMeitkwK6XZs2f2qLs9TFUJ1-wOTcXnITQzRL67zl911gkgelcdqbM2wIovfEjz1e0TeXrNue8RkUk3CjvBWE9QXer6ESDjQ_2Ns4ts6V6vyC0lXMpLgF-0pYPFY5cyvmb5dKbVCsFp6-IxxxjVCdgwGyWApyMBct_y2C-MJBDeAg3tStBQDc5X25k",
    ],
    vibe: "Dark Industrial",
    distance: "0.4 km away",
    costLevel: "$$$",
    safetyVerification: true,
    music: "Sub-harmonic Techno",
    category: "Clubbing & Nightlife",
  },
];

export const MOCK_CHATS: ChatSession[] = [
  {
    partnerId: "aria_vance_24",
    partnerName: "Aria Vance",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqK6NTRY3tHqjQgWjVxWCpXAxifY2vdYRLb2mwOaXdIP-6brUGKnnCZtmXBjIC5N5M1dwu-Or0xeQA1ejP2IyVpSRyua123_zo114J0V6lVT_A8ukd0yZsEe-c2N1Qq8qrxcLMlf-cVktVVRrvUsFmfod5enHPKpSRx9fb_bq9zQOraZ85EeVtwQxzYgxY7hJFnfqcGjkq0mCgSsUmbysUds09NqH3xyPmSDqJn-t-Ilk6kf-jHkOCQExFup8a3EYGiiL1l7U1nbs",
    lastActive: "2m ago",
    messages: [
      {
        id: "msg_1",
        senderId: "aria_vance_24",
        text: "Hey! I saw your profile on the Tribby explore page. Love the creative energy you're putting out. 🎨",
        timestamp: "10:42 PM",
        read: true,
      },
      {
        id: "msg_2",
        senderId: "user",
        text: "Thanks Aria! I've been experimenting with some new digital aesthetics lately. Your photography is stunning by the way.",
        timestamp: "10:44 PM",
        read: true,
      },
      {
        id: "msg_3",
        senderId: "aria_vance_24",
        text: "I appreciate that! Are you going to the digital art meetup tomorrow night? I'm hosting a small session on atmospheric lighting.",
        timestamp: "10:45 PM",
        read: true,
      },
      {
        id: "msg_4",
        senderId: "user",
        text: "I wouldn't miss it. Atmospheric lighting is exactly what I'm trying to master right now. See you there? ✨",
        timestamp: "10:48 PM",
        read: true,
      },
      {
        id: "msg_5",
        senderId: "aria_vance_24",
        text: "Absolutely. I'll save a spot for you near the main display. Looking forward to it!",
        timestamp: "10:50 PM",
        read: true,
      },
    ],
  },
  {
    partnerId: "maya_24",
    partnerName: "Elena",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN_frXNaUvnU38ERHKGJQPNy3GY47Us-IaExZTt6Nz9LN2VYbuv-VG6TNBPEwA5LfsF7xEsVn3lVngu7d_hJZqGGvfeMj7-bEPilZoowwgJqk3npZaTsGYfUb0pFE0UaJEC-x8KE-2qiHfXKKoGIR45Wbc1H7cWQOI1gBRR8ro7_vqzijM3oJ7fbe076lCzjTKi4gms2YUMycYkfF5-RYKIxrxs76AEJIGVbeOtuDrEnzFi3v8pnB2tC4-9TSTm2gQKf92lb6lVww",
    lastActive: "2m ago",
    messages: [
      {
        id: "msg_elena_1",
        senderId: "maya_24",
        text: "That pop-up art gallery was insane! We should check out the synth-wave showcase this weekend.",
        timestamp: "10:02 PM",
        read: false,
      },
    ],
  },
  {
    partnerId: "marcus_avatar",
    partnerName: "Marcus",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN__M4MLjDNxTTs096JwBptGGczd4NRfQw4kY_Cl08hLG4WDIjh4Rr2mUldfobh3dASE1vLDVHy9elVIbvNkg4sNdv69hxFf22DQ1Z5z7UjP_zTtU6R15bEA9__jY6etFkDYliWqMxII1W-wFKWT3yrQbP3siZ7rDv1HlI6TzcQZEFillGlx7wh2Ks5ooOgkaE2UwinJhOQzVfC_dU-3-xnPLp8jOm5Xyz8dml2LRZVlq1GRDbMAZ8MRWJRvzSon-0uev4TzEMc38",
    lastActive: "1h ago",
    messages: [
      {
        id: "msg_marcus_1",
        senderId: "marcus_avatar",
        text: "Found a new underground tech lounge. Interested?",
        timestamp: "9:15 PM",
        read: true,
      },
    ],
  },
  {
    partnerId: "sofia_id",
    partnerName: "Sofia",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDFkyTQhuQZRtq0izdcQJQyVL4UHmA5ICbcCE_7Ch8FowcKBRTlEIt0nLwYYxw_EiUbvDeTHRch9M3zSWKNIGgp0y0XHMuqCrFbds6vOmlrDTLf4zIRWS2iRILf6Eu3_tZoaO6gdSTP-FzkoDkF4RG7YFbxK4UMdtkD7JFut5MOJS-AYtxch4wVs1gqa57CbHCVB6nxyw5XTr6Hp2OaAL3_yaCwx98gSYPkE8XExBYh-XjoXkPqJ6hngMjUVwpAeYZGHMDqI6McoY",
    lastActive: "4h ago",
    messages: [
      {
        id: "msg_sofia_1",
        senderId: "sofia_id",
        text: "The photos from the meet-up are great!",
        timestamp: "6:40 PM",
        read: true,
      },
    ],
  },
  {
    partnerId: "julian_thorne_27",
    partnerName: "Julian",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAh-gq9MdIvSb0cRFFQNHLQyVMAD5h6uQsJsXeN_4iOoUlSNodUG00k-p9OKT5VYPqTdnEiKERRW1-b8Hx416Bj5jQPq2Suf8mTf25rsqKQ572mvQZNwCjmjxG5nIp7-ELIcXmu0wy9SXViEc3H6z8-A6SOg0n-gL-HnYbtKhzJvQ1EhwSRAw-lCuihNM4un52BbkBwPlMnYp0rd0WzKQRewOENEW7ozdapwbRJDZEt83X8ubZWaxY-gRJ06fWbAUqhhDh1UZBuGo",
    lastActive: "8h ago",
    messages: [
      {
        id: "msg_julian_1",
        senderId: "julian_thorne_27",
        text: "Let's check out that new exhibit next Tuesday.",
        timestamp: "2:10 PM",
        read: true,
      },
    ],
  },
  {
    partnerId: "zoe_id",
    partnerName: "Zoe",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-7y3ujYwVTEomHXCVuMHHayTU9eWZxIngDTA8rSN2j8hV-gNJC6Olez0n9Y1mKzx-EpHaD3KYeF8JlMHLQy1SYgribcXXnkbl6h9Zvfwm1yDiimmtZsSF_potTBERZWl7eP8_urNq_hKstI5LHqJsq3DU4wqkZ8ckswCpbGOMjbqXtmRYAn17QII6f2bnApVejWgHNnSn2qMOfOACZciZqW_vtPc8S9igB1ryyKlpoVPSuAwqllanZsSVy222o8FLphMvM0ICnM",
    lastActive: "Yesterday",
    messages: [
      {
        id: "msg_zoe_1",
        senderId: "zoe_id",
        text: "Was so good meeting you at the Tribby event!",
        timestamp: "Yesterday",
        read: true,
      },
    ],
  },
];

export const MOCK_STORIES = [
  {
    id: "story_1",
    userMoniker: "Amara K.",
    bgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS-w0zQi3xd9heZZuOb94zYC9jlJPfo6f8HBaqPeqCPtiSyDFhfYLYnPcGCaa70M7XD-n9CvCFMIhC2smacS7Lbzrr6kbPgMAhHyE1s6nqDcWxGx4Nm-SoS1TEchXoCE4dJhS8kuF7oOlTYvhgw4vduHTfdvwuNN3HGdgqvYL_qMRbgYafOkV95LaIwqVTXYgXCGQOHYaCeM-pXfQH4duX5Hbt0F58w89mpoPpBiDJb_494yNpA-v7trACv3fazUW_Hk-Nq4mwdwc",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdqMVJaIulK61CQqU606WWrtUDC7-88ycRZD7bXR39rMZV4RsAZcBC92QXLG-tNSnX8o3FWOG7v2Q_C13alEVRRyyG9IbNBu-OiCfhDsk4METTXUqt5fmZCkfwxe7xahcvHKQF5DxLKaZ4UA04o-71Cu3tQ6laqqb8b2j_ctU_1H_-Rl9rlA0v4HRpM-_xHlRBUQN5058hqkpHIhUvAbYnC3zwSFssqaqbPzlVQ67zBP3NK5Db08PYZwNnJCXkV0YpnbnLTknkW4",
    text: "Exploring the new digital synth-wave gallery. The vibes here are unmatched. 🌌⚡️",
    tags: ["#FutureArt", "#SynthWave"],
    likes: "2.4k",
    comments: "182",
    badge: "NEO-TRIBE",
  },
  {
    id: "story_2",
    userMoniker: "Leo Vanguard",
    bgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG63t7gm5JGVqORrzKZ16o-XU1NneuuWOwCZ3sAN987PT6fkDmEShaw2Q1ouQ5w_pbTVAX2S6Dkv8VYPd1Jk9AQZ7dgBPrwcPrBBOlPGsA37fIBrw7K3Ygvj8TVPXzCD9SY9XVheVSNdamJ4fyUdajMp3YXcVry48A9X7iJBkxpBX8PlPuiwI52TqBiuB3Ke1EZ48ywn0_eSZlhy3DWPNxL7JmAgFJE0Kl-2dTREZ6sGsAjtOCu1TS8vDE989j08EPrr9xath4e1g",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJxdTA4Z5-DD0lUKiqOu9aHv3pdAvC4n1MqZob9JHoh_c8Dwjd0r-dhVb2gmaAgXHnYzRGLClXyvDT57Lomwf8LUwS0uOLqt-ewqTczmCuBarniZ8G3-LOUCaa_RIZ-SbfLHpXG6X9w3xXQjJNANIRwFNX2Z8fm6Ou7xzfyuFpniiGEVSES6l4lxtiNQ_5z2RNncQNJhFFQqeQnTTry3AAG8gDs1UHNTe-74t5c42w_Y7CGHSXrb-v_kCvnj7dgXuD6fGm4-MLxLQ",
    text: "Late night sessions in the void. Who's matching these vibes tonight? 🎹🧪",
    tags: ["#StudioFlow", "#Midnight"],
    likes: "1.2k",
    comments: "49",
    badge: "ELITE TRIBBY",
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "not_1",
    type: "like",
    userMoniker: "Luna",
    message: "Liked your digital profile",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7-02Zc6Us8lWGdq8ZoAtWNRXrj5N83FP0H8xHs_KpnzcwHHJudaA-0pF0XP_hix10A4aAaVVzRlqbyyQtocDawIHqnHCiwjEe8UPD8DZ5U6XxMzsbXmW42VxzL5f78YVlfcAQBms6wUwINo2GV2uOWVBW5-lzxFqtshVhT11M629h3S7LErHbDIOMVEhGDRK35MvQAOzETEJe4YDAZBeZQiETDnf-vBDIfcsgiv28PR4CyTHasBvEvCrl5hdZWaYtQPeM4Gcdg4",
    time: "2m ago",
    extra: "AI Match: 94%",
  },
  {
    id: "not_2",
    type: "wave",
    userMoniker: "Marcus",
    message: "sent you a wave",
    partnerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZADUp3MFEoi0aH0lalOqB3bVLN384ocik1G3ZbWmfn9XFcEhL-ezWKMFIncdTnzeuQWr7W53yXajgoFM6yLtvNlgSUL5JZovbDMf2DjFn8wsstf9mr_nl649w0kVSBR5brLHyyVaOG20szIl1HPXtXMNYGXlBK7lKuJKlSmsXzN-JsTs54JGSAy2VgLn1woCdBjhNsbVzz0gk86mHyPL6f-hDn1U3XTkmv5JZU-wpF5bXTte-OCYMa5Wj-amaZawaOMkqcHS4u0U",
    time: "1h ago",
    extra: "San Francisco",
  },
];
