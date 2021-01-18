import axios from "axios"

import Head from "next/head"
import { useEffect } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home({ bloeh }: { bloeh: any }) {
  // useEffect(() => {
  //   const bla = async () => {
  //     const result = await axios.get("/hello")
  //     console.log(result)
  //   }
  // }, [])

  useEffect(() => {
    const bla = async () => {
      const result = await axios.get("/api").catch((err) => console.error(err))
      console.log(result && result.data)
    }
    bla()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{bloeh}</main>
      <Link href="/order">
        <a>Home</a>
      </Link>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export async function getStaticProps() {
  const url = process.env.API_ROOT || "http://localhost:5000"
  const result = await axios.get(url).catch((err) => console.error(err))
  console.log("result", result && result.data)
  return { props: { bloeh: "blah" } }
}
