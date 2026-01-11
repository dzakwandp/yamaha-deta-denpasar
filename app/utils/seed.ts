import { collection, doc, setDoc, getFirestore } from "firebase/firestore";

export const seedDatabase = async (dbRef: any) => {
  // Static data from previous useProducts
  const products = [
    {
      id: 1,
      name: 'NMAX "TURBO"',
      category: "MAXi",
      price: "32.175.000",
      description:
        'Rasakan sensasi berkendara dengan teknologi "Turbo" yang memberikan akselerasi maksimal. Dilengkapi dengan Y-Connect dan desain premium yang gagah.',
      specs: [
        { label: "Mesin", value: "155cc Liquid Cooled" },
        { label: "Power", value: "11.3 kW / 8000 rpm" },
        { label: "Torque", value: "14.2 Nm / 6500 rpm" },
        { label: "Berat", value: "130-132 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=NMAX+TURBO",
      tag: "NEW",
    },
    {
      id: 2,
      name: "XMAX Connected",
      category: "MAXi",
      price: "66.900.000",
      description:
        "Skutik premium 250cc dengan fitur navigasi Garmin dan Y-Connect. Kenyamanan touring maksimal dengan bagasi luas.",
      specs: [
        { label: "Mesin", value: "250cc Liquid Cooled" },
        { label: "Power", value: "16.8 kW / 7000 rpm" },
        { label: "Torque", value: "24.3 Nm / 5500 rpm" },
        { label: "Berat", value: "181 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=XMAX",
      tag: "PREMIUM",
    },
    {
      id: 3,
      name: "Grand Filano",
      category: "Classy",
      price: "27.300.000",
      description:
        "Skutik Classy dengan desain fashionable dan fitur modern hybrid. Cocok untuk gaya hidup urban yang stylish.",
      specs: [
        { label: "Mesin", value: "125cc Air Cooled Hybrid" },
        { label: "Power", value: "6.1 kW / 6500 rpm" },
        { label: "Torque", value: "10.4 Nm / 5000 rpm" },
        { label: "Berat", value: "100 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=Grand+Filano",
    },
    {
      id: 4,
      name: "Fazzio Hybrid",
      category: "Classy",
      price: "23.050.000",
      description:
        "Motor hybrid pertama di kelas 125cc. Desain unik, ringkas, dan irit bahan bakar. Pilihan warna cerah dan menarik.",
      specs: [
        { label: "Mesin", value: "125cc Air Cooled Hybrid" },
        { label: "Power", value: "6.2 kW / 6500 rpm" },
        { label: "Torque", value: "10.6 Nm / 4500 rpm" },
        { label: "Berat", value: "95 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=Fazzio",
      tag: "BEST SELLER",
    },
    {
      id: 5,
      name: "Aerox 155",
      category: "MAXi",
      price: "27.775.000",
      description:
        "Sport Scooter dengan Power Weight Ratio terbaik di kelasnya. Desain aerodinamis dan sporty.",
      specs: [
        { label: "Mesin", value: "155cc Liquid Cooled" },
        { label: "Power", value: "11.3 kW / 8000 rpm" },
        { label: "Torque", value: "13.9 Nm / 6500 rpm" },
        { label: "Berat", value: "122-125 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=Aerox+155",
    },
    {
      id: 6,
      name: "Fino 125",
      category: "Matic",
      price: "20.400.000",
      description:
        "Matic retro stylish dengan mesin Blue Core 125cc yang irit, halus, dan nyaman.",
      specs: [
        { label: "Mesin", value: "125cc Air Cooled" },
        { label: "Power", value: "7.0 kW / 8000 rpm" },
        { label: "Torque", value: "9.6 Nm / 5500 rpm" },
        { label: "Berat", value: "98 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=Fino+125",
    },
    {
      id: 7,
      name: "WR 155 R",
      category: "Off Road",
      price: "38.900.000",
      description:
        "The Real Adventure Partner. Mesin 155cc VVA bertenaga, suspensi nyaman, siap libas segala medan.",
      specs: [
        { label: "Mesin", value: "155cc Liquid Cooled VVA" },
        { label: "Power", value: "12.3 kW / 10000 rpm" },
        { label: "Torque", value: "14.3 Nm / 6500 rpm" },
        { label: "Berat", value: "134 kg" },
      ],
      image: "https://placehold.co/800x600/e0e0e0/333333.png?text=WR+155+R",
    },
    {
      id: 8,
      name: "All New R15",
      category: "Sport",
      price: "40.300.000",
      description:
        "Born from R-DNA. Motor sport fairing 155cc dengan fitur Quick Shifter dan TCS (pada tipe tertinggi).",
      specs: [
        { label: "Mesin", value: "155cc Liquid Cooled VVA" },
        { label: "Power", value: "14.2 kW / 10000 rpm" },
        { label: "Torque", value: "14.7 Nm / 8500 rpm" },
        { label: "Berat", value: "137-140 kg" },
      ],
      image:
        "https://placehold.co/800x600/e0e0e0/333333.png?text=R15+Connected",
    },
  ];

  try {
    if (!dbRef) throw new Error("Firestore instance not provided");
    const db = dbRef;

    console.log(
      "Debug: Firebase Project ID:",
      db.app.options.projectId || "undefined"
    );
    console.log("Starting seed...");
    for (const product of products) {
      // Use ID as document ID for easier retrieval
      await setDoc(doc(db, "products", product.id.toString()), product);
      console.log(`Seeded product ${product.id}`);
    }
    console.log("Seeding complete!");
    alert("Database seeded successfully!");
  } catch (e) {
    console.error("Error seeding database:", e);
    alert("Error seeding database. Check console.");
  }
};
