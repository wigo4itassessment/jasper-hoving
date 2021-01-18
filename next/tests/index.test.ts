import { getStaticProps } from "../pages/index"
import axios from "axios"
jest.mock("axios")
describe("do something", () => {
  it("tests", async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a",
          },
          {
            objectID: "2",
            title: "b",
          },
        ],
      },
    }
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve(data))

    const props = await getStaticProps()
  })
})
