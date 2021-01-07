import { createRef } from "react"
import { Vector3 } from "three"
import img1 from "./img/img3.jpg";
import img2 from "./img/img6.jpg";
import img3 from "./img/img3.jpg";
const state = {
  sections: 4,
  pages: 4,
  zoom: 75,
  paragraphs: [
    {
      offset: 1.1,
      factor: 1.0,
      header: "Millenium Project",
      image: img1,
      aspect: 3,
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
    },
    {
      offset: 2,
      factor: 1.1,
      header: "Diamond Road",
      image: img2,
      aspect: 3,
      text:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
  
    
  ],

  top: createRef()
}

export default state
