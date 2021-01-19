import { Card, CardMedia, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    display: "flex",

    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    minWidth: 850,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  content: {
    padding: "32px",
  },
})

const Wrapper = ({ children, style }: { children?: any; style?: any }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Card className={classes.root} elevation={15} style={style}>
        <CardMedia
          className={classes.media}
          image="https://www.treehugger.com/thmb/9yKLBp67cBXt-1F20XTh9ddxzTc=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__01__BlackAndWhiteYakStandingInFrontOfMountainVista-f0e87cab9e11494492d2c12ad2b6e3a3.jpg"
          title="YakShop"
        />

        <div className={classes.content}>{children}</div>
      </Card>
    </div>
  )
}

export default Wrapper
