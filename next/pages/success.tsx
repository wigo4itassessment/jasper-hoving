import { Button, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import Wrapper from "../components/Wrapper"

const useStyles = makeStyles({
  textInput: { width: "350px" },
})

const Success = () => {
  const router = useRouter()
  const milk = router.query.milk || "0"
  const skins = router.query.skins || 0

  return (
    <Wrapper style={{ backgroundColor: "green" }}>
      <h2 style={{ color: "white" }}>Your order was succesful</h2>
      <div style={{ display: "flex", color: "white" }}>
        <h4>You ordered</h4>
        <div style={{ marginLeft: 30 }}>
          <p>🥛 {milk} milk </p>
          <p>🐄 {skins} skins</p>
        </div>
      </div>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => router.back()}
      >
        Go back
      </Button>
    </Wrapper>
  )
}

export default Success
