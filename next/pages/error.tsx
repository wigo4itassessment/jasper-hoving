import { Button, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import Wrapper from "../components/Wrapper"

const useStyles = makeStyles({
  textInput: { width: "350px" },
})

const error = () => {
  const router = useRouter()
  return (
    <Wrapper style={{ backgroundColor: "red" }}>
      <h2 style={{ color: "white" }}>Your order failed</h2>

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

export default error
