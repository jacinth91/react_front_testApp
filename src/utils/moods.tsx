import { createContext } from "react"

export const moods = {
  'happy':" i am happy",
  'sad':'i am sad'

}

export const moodContext = createContext(moods)


