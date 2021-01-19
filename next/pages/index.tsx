import axios from "axios"

import Head from "next/head"
import { useEffect } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import serverUrl from "../utils/serverUrl"
import { HerdResponse } from "../types"
import { useRouter } from "next/router"
import { NextPageContext } from "next"
import Wrapper from "../components/Wrapper"
import { Button } from "@material-ui/core"
import useWebsockets from "../hooks/useWebsocket"

export default function Home({
  herd,
  day,
}: {
  herd: HerdResponse[]
  day: number
}) {
  const { updatedHerd, updatedStock } = useWebsockets(herd)

  return (
    <Wrapper>
      <h3>Current herd</h3>
      {updatedHerd!.map((yak, index) => (
        <div key={index}>
          <b>{yak.name}</b> {`${yak.age} years`}
        </div>
      ))}
      <Link href={{ pathname: "/order", query: { day } }}>
        <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
          Go to checkout
        </Button>
      </Link>
    </Wrapper>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let herd: HerdResponse[] = []
  const day = context.query.day || 1 //default day is one
  try {
    const response = await axios.get(`${serverUrl()}/yak-shop/herd/${day}`)
    herd = response.data.herd
    console.log(herd)
  } catch (err) {
    console.error(err)
  }

  return { props: { herd, day } }
}
