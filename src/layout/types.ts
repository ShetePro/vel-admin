
export type TabsItemProps = {
  path: string;
  name: string;
}

export type NavContextMethods = {
  open: (data: NavContextOpenProps) => void;
  close: () => void;
}
export type NavContextOpenProps = {
  x: number;
  y: number;
  tab: TabsItemProps;
  index: number
}

