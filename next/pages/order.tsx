import axios from "axios"
import { NextPageContext } from "next"
import { StockResponse } from "../types"
import serverUrl from "../utils/serverUrl"

import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import { Button, Card } from "@material-ui/core"
import { useRouter } from "next/router"
import Wrapper from "../components/Wrapper"

const useStyles = makeStyles({
  textInput: { width: "350px" },
})

const Order = ({ day, stock }: { day: number; stock: StockResponse }) => {
  const router = useRouter()
  const classes = useStyles()
  const [milk, setMilk] = useState<number>()
  const [skins, setSkins] = useState<number>()

  const onChangeInput = (setter: Function, event: any) => {
    setter(event.currentTarget.value || 0)
  }

  const placeOrder = async () => {
    let result
    if (!milk && !skins) {
      router.push("/error")
      return
    }

    try {
      const response = await axios.post(`/yak-shop/order/${day}`, {
        customer: "jasper",
        order: { milk, skins },
      })
      const result = response.data
      router.push({
        pathname: "/success",
        query: { milk: result.milk, skins: result.skins },
      })
    } catch (err) {
      router.push("/error")
    }
  }

  return (
    <Wrapper>
      <h2> Place an order</h2>
      <div style={{ display: "flex" }}>
        <h4>Currently in stock:</h4>
        <div style={{ marginLeft: 30 }}>
          <p>🥛 {stock.milk} milk </p>
          <p>🐄 {stock.skins} skins</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          className={classes.textInput}
          fullWidth
          id="standard-error-helper-text"
          label="Milk"
          onChange={(event) => onChangeInput(setMilk, event)}
        />
        <TextField
          className={classes.textInput}
          fullWidth
          id="standard-error-helper-text"
          label="Skins"
          onChange={(event) => onChangeInput(setSkins, event)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={placeOrder}
      >
        Submit order
      </Button>
    </Wrapper>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let stock: StockResponse[] = []
  const day = context.query.day || 1 //default day is one
  try {
    const response = await axios.get(`${serverUrl()}/yak-shop/stock/${day}`)
    stock = response.data
    console.log(stock)
  } catch (err) {
    console.error(err)
  }

  return { props: { stock, day } }
}

export default Order
