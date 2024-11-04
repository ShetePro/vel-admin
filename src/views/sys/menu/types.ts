export type MenuDataItemProps = {
  id: string
  children: MenuDataItemProps[]
  menuName: string
  path: string
  type: number
  permissions?: string
}