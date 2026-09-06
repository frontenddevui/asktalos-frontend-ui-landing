import peopleProfile1 from "@/assets/people-profile-01.webp";
import peopleProfile2 from "@/assets/people-profile-02.webp";
import ankitRoy from "@/assets/ankit-roy-cofounder.webp";
import maheshPardeshi from "@/assets/about-maheshpardeshi.webp";
import swikritiPandey from "@/assets/curstomer/Swikriti_Pandey.webp";
import reviewer1 from "@/assets/new-customer/reviewer-1.png";
import reviewer2 from "@/assets/new-customer/reviewer-2.png";
import reviewer3 from "@/assets/new-customer/reviewer-3.png";

export type PartnerAvatar = {
  src: string;
  alt: string;
};

export const partnerAvatars: PartnerAvatar[] = [
  { src: reviewer1, alt: "Reviewer" },
  { src: reviewer2, alt: "Reviewer" },
  { src: reviewer3, alt: "Reviewer" },
  { src: ankitRoy, alt: "Leadership profile 1" },
  { src: maheshPardeshi, alt: "Leadership profile 2" },
  { src: swikritiPandey, alt: "Leadership profile 3" },
  { src: peopleProfile1, alt: "Leadership profile 4" },
  { src: peopleProfile2, alt: "Leadership profile 5" },
];
