export interface ItemMenu {
  id: number;
  title: string;
  icon: string;
  component: string;
  isChecked: boolean;
  secure?: boolean;
  url?: string;
  name?: string;
  deepLink?: boolean;
  package?: string;
  uriScheme?: string;
}
