import { Injectable } from '@angular/core';
import {
  Subject,
  fromEvent,
  map,
  merge,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

export type Themes = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private preferenceThemeQuery = window.matchMedia(
    '(prefers-color-scheme: light)'
  );

  private themeSwitcher = new Subject<Themes>();
  private userEnvThemePreference$ = fromEvent<MediaQueryList>(
    this.preferenceThemeQuery,
    'change'
  ).pipe(startWith(this.preferenceThemeQuery), map(resolvePreferredTheme));

  public theme$ = merge(this.themeSwitcher, this.userEnvThemePreference$).pipe(
    tap((theme) => loadTheme(getOrCreateThemeLinkEl(), theme)),
    shareReplay()
  );

  switchTheme(theme: Themes): void {
    localStorage.setItem('preferredTheme', theme);
    this.themeSwitcher.next(theme);
  }
}

function resolvePreferredTheme(query: MediaQueryList): Themes {
  const theme = localStorage.getItem('preferredTheme');
  if (theme) return theme as Themes;
  return query.matches ? 'light' : 'dark';
}

function getOrCreateThemeLinkEl(): HTMLLinkElement {
  const linkId = 'app-theme';

  let linkEl = document.head.querySelector<HTMLLinkElement>(`#${linkId}`);
  if (linkEl) {
    return linkEl;
  } else {
    linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.setAttribute('id', linkId);
    document.head
      .querySelector('link[rel=stylesheet]:last-of-type')
      ?.after(linkEl);
    return linkEl;
  }
}

function loadTheme(linkEl: HTMLLinkElement, theme: Themes): void {
  linkEl.setAttribute('href', `${theme}-theme.css`);
}
