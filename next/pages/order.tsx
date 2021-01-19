import axios from "axios"
import { NextPageContext } from "next"
import { StockResponse } from "../types"
import serverUrl from "../utils/serverUrl"

export default ({ stock }: { stock: StockResponse }) => {
  return (
    <div>
      milk {stock.milk} skins: {stock.skins}
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let stock: StockResponse[] = []
  const day = context.query.day || 1 //default day is one
  try {
    const result = await axios.get(`${serverUrl()}/yak-shop/stock/${day}`)
    stock = result.data
    console.log(stock)
  } catch (err) {
    console.error(err)
  }

  return { props: { stock, day } }
}
