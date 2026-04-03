import Image from "next/image";
import styles from "./page.module.css";
import Here from "../sections/Here";
import Posts from "../sections/Posts";

export default function Home() {
  return (
    <main id="main">
      <Here />
      <Posts />
    </main>
  )
}
