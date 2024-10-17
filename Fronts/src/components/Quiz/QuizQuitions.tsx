 const questions = [
    {
      id: "skinType",
      theQuestion: "How does your skin feel when you wake up in the morning?",
      options: [
        { id: "dry", label: "Dry: can be tight" },
        { id: "oily", label: "Oily: can be shiny" },
        { id: "normal", label: "Balanced: not dry not oily" },
        { id: "combination", label: "Combination: half oily half normal or dry" },
        { id: "sensitive", label: "Sensitive: can be red or irritated" },
      ],
    },
    {
      id: "skinConcern",
      theQuestion: "What is your main skin concern?",
      options: [
        { id: "acne", label: "Acne" },
        { id: "aging", label: "Aging" },
        { id: "darkSpots", label: "Dark Spots" },
        { id: "dryness", label: "Dryness" },
        { id: "oiliness", label: "Oiliness" },
        { id: "pores", label: "Pores" },
        { id: "redness", label: "Redness" },
        { id: "sensitivity", label: "Sensitivity" },
      ],
    },
    {
      id: "criteria",
      theQuestion: "Do you have any product preferences?",
      options: [
        { id: "vegan", label: "Vegan" },
        { id: "cruelty-free", label: "Cruelty-Free" },
        { id: "clean", label: "Clean" },
        { id: "BDS-approved", label: "BDS Approved" },
      ],
    },
  ];

  export default questions;