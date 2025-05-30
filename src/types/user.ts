export type FirestoreUser = {
  displayName: string
  email: string
  photoURL: string
  uid: string
  username: string
  links: {
    id: `${string}-${string}-${string}-${string}-${string}`
    title: string
    url: string
  }[]
}

export type Link = {
  title: string
  url: string
  id: `${string}-${string}-${string}-${string}-${string}`
}

export type DataUser = {
  username?: string
  photoURL?: string
  links?: Link[]
}