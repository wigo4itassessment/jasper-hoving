import axios from "axios"

import Head from "next/head"
import { useEffect } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import serverUrl from "../utils/serverUrl"
import { HerdResponse } from "../types"
import { useRouter } from "next/router"
import { NextPageContext } from "next"

export default function Home({
  herd,
  day,
}: {
  herd: HerdResponse[]
  day: number
}) {
  useEffect(() => {
    // const bla = async () => {
    //   const result = await axios.get("/api").catch((err) => console.error(err))
    //   console.log(result && result.data)
    // }
    // bla()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Yakshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        day:
        <div>{day}</div>
        <h2>Current herd:</h2>
        {herd.map((yak, index) => (
          <div key={index}>
            {yak.name} {yak.age} {yak["age-last-shaved"]}
          </div>
        ))}
        <Link href={{ pathname: "/order", query: { day } }}>
          <a>Order</a>
        </Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let herd: HerdResponse[] = []
  const day = context.query.day || 1 //default day is one
  try {
    const result = await axios.get(`${serverUrl()}/yak-shop/herd/${day}`)
    herd = result.data.herd
    console.log(herd)
  } catch (err) {
    console.error(err)
  }

  return { props: { herd, day } }
}
