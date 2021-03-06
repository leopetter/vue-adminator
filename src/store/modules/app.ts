import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import Vue from "vue";
import { COOKIE_THEME } from "../../constants";

const getThemeClass = (availableThemes: string[], theme: number): string => {
  return "theme-" + availableThemes[theme];
};

export interface IAppState {
  appName: string;
  isCollapsed: boolean;
  isLoading: boolean;
  availableThemes: string[];
  theme: number;
  themeClass: string;
}

const internalSetTheme = (themeIndex: number, themeClass: string) => {
  // Save a cookie
  Vue.cookies.set(COOKIE_THEME, themeIndex, { expires: Infinity });
  // Remove all classes first
  document.body.classList.forEach(currentIndex => {
    document.body.classList.remove(currentIndex);
  });
  document.body.classList.add(themeClass);
};

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public appName = "Upbound Admin Dashboard";
  public isCollapsed = false;
  public isLoading = false;
  public availableThemes: string[] = ["light", "dark"];
  public theme = 0;
  public themeClass: string = getThemeClass(this.availableThemes, this.theme);

  @Mutation
  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  @Mutation
  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @Mutation
  public toggleTheme() {
    this.theme = (this.theme + 1) % this.availableThemes.length;
    this.themeClass = getThemeClass(this.availableThemes, this.theme);
    internalSetTheme(this.theme, this.themeClass);
  }

  @Mutation
  public setTheme(theme: number) {
    if (theme >= 0 && this.availableThemes.length > theme) {
      this.theme = theme;
      this.themeClass = getThemeClass(this.availableThemes, theme);
      internalSetTheme(this.theme, this.themeClass);
    }
  }
}

export const AppModule = getModule(App);
