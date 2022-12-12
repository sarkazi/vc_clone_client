export interface IMainWrapper {
  sizePage:
    | "newsPage"
    | "profilePage"
    | "ratingPage"
    | "profileSettingsPage"
    | "messagePage";
  width: boolean;
  children: React.ReactNode;
}
