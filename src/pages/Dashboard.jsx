import useAuth from "../hooks/useAuth"

export default function Dashboard() {
  const { currentUser } = useAuth()

  return <div>Dashboard de { currentUser.displayName }</div>
}
